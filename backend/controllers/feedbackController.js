const Feedback = require('../models/Feedback');

// @desc    Submit feedback
// @route   POST /api/feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, service, rating, mood, message } = req.body;

    if (!rating || mood === undefined || mood === null) {
      return res.status(400).json({ success: false, message: 'Rating and mood are required.' });
    }

    const feedback = await Feedback.create({ name, email, service, rating, mood, message });

    res.status(201).json({ success: true, message: 'Feedback submitted successfully.', data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
