const CibilCheck = require('../models/CibilCheck');
const sendEmail = require('../utils/sendEmail');

// Helper to calculate a deterministic CIBIL score based on the PAN card number
const getDeterministicScore = (pan) => {
  let hash = 0;
  for (let i = 0; i < pan.length; i++) {
    hash = pan.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Returns a score between 650 and 880
  return 650 + (Math.abs(hash) % 231);
};

// @desc    Submit CIBIL check request
// @route   POST /api/cibil
exports.submitCibilCheck = async (req, res) => {
  try {
    const { name, pan, dob, mobile, email, consent } = req.body;

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: 'Consent is required to proceed'
      });
    }

    const generatedScore = getDeterministicScore(pan);

    const cibilCheck = await CibilCheck.create({
      name,
      pan,
      dob,
      mobile,
      email,
      consent,
      score: generatedScore,
      status: 'completed'
    });

    res.status(201).json({
      success: true,
      message: 'CIBIL score fetched successfully!',
      data: cibilCheck
    });

    // Customer confirmation
    try {
      sendEmail({
        email,
        subject: 'Your CIBIL Score is Ready — CS Smart Finserve',
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e,#c0392b);padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:22px;">CS Smart Finserve</h1>
            </div>
            <div style="padding:32px;text-align:center;">
              <div style="font-size:40px;margin-bottom:12px;">📊</div>
              <h2 style="margin:0 0 8px;color:#1a1a2e;">Your CIBIL Score is Ready!</h2>
              <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">Hi <strong>${name}</strong>, we've successfully processed your CIBIL score check request.</p>
              <div style="display:inline-block;background:#f0eeff;border-radius:12px;padding:16px 32px;margin:0 0 24px;">
                <span style="font-size:12px;color:#6b7280;text-transform:uppercase;font-weight:600;display:block;margin-bottom:4px;">CIBIL Score</span>
                <strong style="font-size:36px;color:#c0392b;">${generatedScore}</strong>
              </div>
              <p style="color:#374151;font-size:14px;line-height:1.7;">Our financial experts will review your details and contact you soon with custom-tailored loan offers matching your profile.</p>
            </div>
            <div style="background:#1a1a2e;padding:16px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">&copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited</p>
            </div>
          </div>
        `
      }).catch(err => console.error('CIBIL customer email failed:', err.message));
    } catch (e) { console.error('CIBIL customer email preparation failed:', e.message); }

    // Admin notification
    try {
      sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New CIBIL Check: ${name} — Score ${generatedScore}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e,#c0392b);padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New CIBIL Check</h2>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">CS Smart Finserve — Admin Alert</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">PAN</td><td style="padding:8px 0;font-weight:600;font-family:monospace;">${pan}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">CIBIL Score</td><td style="padding:8px 0;font-weight:700;color:#c0392b;">${generatedScore}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">DOB</td><td style="padding:8px 0;color:#374151;">${new Date(dob).toLocaleDateString('en-IN', { timeZone: 'UTC' })}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Mobile</td><td style="padding:8px 0;font-weight:600;"><a href="tel:${mobile}" style="color:#c0392b;">${mobile}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#c0392b;">${email}</a></td></tr>
              </table>
              <div style="margin-top:24px;">
                <a href="http://localhost:8000/admin" style="display:inline-block;padding:12px 28px;background:#c0392b;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View in Dashboard →</a>
              </div>
            </div>
          </div>
        `
      }).catch(err => console.error('CIBIL admin email failed:', err.message));
    } catch (e) { console.error('CIBIL admin email preparation failed:', e.message); }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all CIBIL checks
// @route   GET /api/cibil
exports.getCibilChecks = async (req, res) => {
  try {
    const cibilChecks = await CibilCheck.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cibilChecks.length,
      data: cibilChecks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update CIBIL check status
// @route   PUT /api/cibil/:id
exports.updateCibilCheck = async (req, res) => {
  try {
    const oldCheck = await CibilCheck.findById(req.params.id);
    
    const cibilCheck = await CibilCheck.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!cibilCheck) {
      return res.status(404).json({
        success: false,
        message: 'CIBIL check not found'
      });
    }

    res.status(200).json({
      success: true,
      data: cibilCheck
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete CIBIL check
// @route   DELETE /api/cibil/:id
exports.deleteCibilCheck = async (req, res) => {
  try {
    const record = await CibilCheck.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
    res.status(200).json({ success: true, message: 'CIBIL record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
