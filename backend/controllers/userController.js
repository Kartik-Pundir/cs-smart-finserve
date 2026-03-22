const Application = require('../models/Application');
const Appointment = require('../models/Appointment');
const CibilCheck = require('../models/CibilCheck');

// @desc    Get logged-in user's dashboard data
// @route   GET /api/user/dashboard
exports.getUserDashboard = async (req, res) => {
  try {
    const email = req.user.email;

    const [applications, appointments, cibilChecks] = await Promise.all([
      Application.find({ email }).sort({ createdAt: -1 }),
      Appointment.find({ email }).sort({ preferredDate: -1 }),
      CibilCheck.find({ email }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      success: true,
      data: { applications, appointments, cibilChecks }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
