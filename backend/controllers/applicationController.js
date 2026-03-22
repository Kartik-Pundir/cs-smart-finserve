const Application = require('../models/Application');
const sendEmail = require('../utils/sendEmail');
const { applicationReceived } = require('../utils/emailTemplates');

// @desc    Create new application
// @route   POST /api/applications
exports.createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);

    // Send confirmation email to customer
    try {
      await sendEmail({
        email: req.body.email,
        subject: 'Application Received — CS Smart Finserve',
        html: applicationReceived(req.body.fullName, req.body.serviceType)
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    // Notify admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Loan Application: ${req.body.fullName} — ${req.body.serviceType}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e,#c0392b);padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New Loan Application</h2>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">CS Smart Finserve — Admin Alert</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:160px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${req.body.fullName}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;font-weight:600;"><a href="tel:${req.body.phone}" style="color:#c0392b;">${req.body.phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${req.body.email}" style="color:#c0392b;">${req.body.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:8px 0;font-weight:600;color:#111827;">${req.body.serviceType}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Loan Amount</td><td style="padding:8px 0;color:#374151;">₹${req.body.loanAmount?.toLocaleString() || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Monthly Income</td><td style="padding:8px 0;color:#374151;">₹${req.body.monthlyIncome?.toLocaleString() || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Employment</td><td style="padding:8px 0;color:#374151;">${req.body.employmentType || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">City</td><td style="padding:8px 0;color:#374151;">${req.body.city || '—'}</td></tr>
              </table>
              <div style="margin-top:24px;">
                <a href="http://localhost:8000/admin" style="display:inline-block;padding:12px 28px;background:#c0392b;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View in Admin Dashboard →</a>
              </div>
            </div>
          </div>
        `
      });
    } catch (e) { console.error('Admin notification failed:', e.message); }

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all applications
// @route   GET /api/applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
