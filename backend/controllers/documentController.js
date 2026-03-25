const Document = require('../models/Document');
const sendEmail = require('../utils/sendEmail');
const { sendSMS, smsTemplates } = require('../utils/sendSMS');

const labelMap = {
  id_proof: 'ID Proof', address_proof: 'Address Proof',
  income_proof: 'Income Proof', bank_statement: 'Bank Statement',
  photo: 'Passport Photo', other: 'Other Documents',
};

// @desc    Submit documents
// @route   POST /api/documents
exports.submitDocuments = async (req, res) => {
  try {
    const { name, phone, email, loanType } = req.body;
    const uploadedFiles = req.files || {};

    if (!Object.keys(uploadedFiles).length) {
      return res.status(400).json({ success: false, message: 'Please upload at least one document.' });
    }

    const files = Object.entries(uploadedFiles).map(([fieldName, fileArr]) => {
      const f = fileArr[0];
      return {
        fieldName,
        label: labelMap[fieldName] || fieldName,
        originalName: f.originalname,
        filename: f.filename,
        size: f.size,
        mimetype: f.mimetype,
      };
    });

    const doc = await Document.create({ name, phone, email, loanType, files });

    // Send SMS notification
    if (phone) {
      try {
        await sendSMS(phone, smsTemplates.documentsReceived(name, loanType || 'Loan'));
      } catch (smsErr) {
        console.error('SMS notification failed:', smsErr);
      }
    }

    // Notify admin
    try {
      const fileList = files.map(f => `<li>${f.label}: ${f.originalName} (${(f.size/1024).toFixed(0)} KB)</li>`).join('');
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Document Submission — ${loanType || 'Loan'} — ${name}`,
        html: `
          <h2>New Document Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone || '—'}</p>
          <p><strong>Email:</strong> ${email || '—'}</p>
          <p><strong>Loan Type:</strong> ${loanType || '—'}</p>
          <p><strong>Documents Uploaded:</strong></p>
          <ul>${fileList}</ul>
          <p>Login to the Admin Dashboard to review.</p>
        `,
      });
    } catch (e) {
      console.error('Admin notification email failed:', e.message);
    }

    res.status(201).json({ success: true, message: 'Documents submitted successfully! We will review and contact you within 24 hours.', data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all document submissions
// @route   GET /api/documents
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Download a specific document file
// @route   GET /api/documents/:id/download/:filename
exports.downloadDocument = async (req, res) => {
  try {
    const { id, filename } = req.params;
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

    const file = doc.files.find(f => f.filename === filename);
    if (!file) return res.status(404).json({ success: false, message: 'File not found' });

    const path = require('path');
    const filePath = path.join(__dirname, '../uploads', filename);
    const fs = require('fs');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found on server' });
    }

    res.download(filePath, file.originalName);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete document submission
// @route   DELETE /api/documents/:id
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
