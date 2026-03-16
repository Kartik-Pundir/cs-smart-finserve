const Lead = require('../models/Lead');
const Appointment = require('../models/Appointment');
const Application = require('../models/Application');
const CibilCheck = require('../models/CibilCheck');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalCibilChecks = await CibilCheck.countDocuments();

    const newLeads = await Lead.countDocuments({ status: 'new' });
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const submittedApplications = await Application.countDocuments({ status: 'submitted' });

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalAppointments,
        totalApplications,
        totalCibilChecks,
        newLeads,
        pendingAppointments,
        submittedApplications
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Search across all collections
// @route   GET /api/admin/search
exports.search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchRegex = new RegExp(query, 'i');

    const leads = await Lead.find({
      $or: [
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ]
    }).limit(10);

    const appointments = await Appointment.find({
      $or: [
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ]
    }).limit(10);

    const applications = await Application.find({
      $or: [
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ]
    }).limit(10);

    res.status(200).json({
      success: true,
      data: {
        leads,
        appointments,
        applications
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/admin/feedback
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedback.length, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Promote user to admin
// @route   PUT /api/admin/users/:id/promote
exports.promoteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: `${user.name} is now an admin`, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
