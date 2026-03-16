const CibilCheck = require('../models/CibilCheck');

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

    const cibilCheck = await CibilCheck.create({
      name,
      pan,
      dob,
      mobile,
      email,
      consent
    });

    res.status(201).json({
      success: true,
      message: 'CIBIL check request submitted successfully. We will contact you soon.',
      data: cibilCheck
    });
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
