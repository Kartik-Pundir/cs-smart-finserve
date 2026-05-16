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

// @desc    Update user profile
// @route   PUT /api/user/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, removeAvatar } = req.body;
    const user = req.user;

    // Check if email is being updated and already in use by another user
    if (email && email !== user.email) {
      const emailExists = await require('../models/User').findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email already in use by another account' });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;

    // Handle avatar
    if (removeAvatar === 'true' || removeAvatar === true) {
      user.avatar = null;
    } else if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        recentlyViewed: user.recentlyViewed || []
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
