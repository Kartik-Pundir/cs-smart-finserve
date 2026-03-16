const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  email: { type: String, default: null },
  service: { type: String, default: null },
  rating: { type: Number, required: true, min: 1, max: 5 },
  mood: { type: Number, required: true, min: 0, max: 4 },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
