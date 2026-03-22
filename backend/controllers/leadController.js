const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');
const { callbackConfirmation } = require('../utils/emailTemplates');

// @desc    Create new lead (callback request)
// @route   POST /api/leads
exports.createLead = async (req, res) => {
  try {
    const { fullName, phone, email, serviceInterested, message } = req.body;

    // Basic validation
    if (!fullName || !phone || !email || !serviceInterested) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields: name, phone, email, and service.'
      });
    }

    const lead = await Lead.create({
      fullName,
      phone,
      email,
      serviceInterested,
      message
    });

    // Send confirmation email to customer
    try {
      await sendEmail({
        email: email,
        subject: 'Thank you for contacting CS Smart Finserve',
        html: callbackConfirmation(fullName)
      });
    } catch (emailError) {
      console.error('Auto-reply email failed (non-critical):', emailError.message);
    }

    // Send notification email to admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${fullName} — ${serviceInterested}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e,#c0392b);padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New Lead Received</h2>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">CS Smart Finserve — Admin Alert</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${fullName}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;font-weight:600;color:#111827;"><a href="tel:${phone}" style="color:#c0392b;">${phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;color:#111827;"><a href="mailto:${email}" style="color:#c0392b;">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:8px 0;font-weight:600;color:#111827;">${serviceInterested}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Message</td><td style="padding:8px 0;color:#374151;">${message || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Time</td><td style="padding:8px 0;color:#374151;">${new Date().toLocaleString('en-IN')}</td></tr>
              </table>
              <div style="margin-top:24px;">
                <a href="http://localhost:8000/admin" style="display:inline-block;padding:12px 28px;background:#c0392b;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View in Admin Dashboard →</a>
              </div>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Admin notification email failed (non-critical):', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will contact you within 2–4 hours.',
      data: lead
    });
  } catch (error) {
    console.error('Lead creation error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong. Please try again.'
    });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update lead status
// @route   PUT /api/leads/:id
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
