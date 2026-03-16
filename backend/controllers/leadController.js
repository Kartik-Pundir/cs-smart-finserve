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

    // Send confirmation email — failure here does NOT block the response
    try {
      await sendEmail({
        email: email,
        subject: 'Thank you for contacting CS Smart Finserve',
        html: callbackConfirmation(fullName)
      });
    } catch (emailError) {
      console.error('Auto-reply email failed (non-critical):', emailError.message);
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
