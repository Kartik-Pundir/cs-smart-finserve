const mongoose = require('mongoose');

const cibilCheckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  pan: {
    type: String,
    required: true,
    uppercase: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please provide a valid PAN number']
  },
  dob: {
    type: Date,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number']
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  consent: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'Consent is required'
    }
  },
  score: {
    type: Number,
    min: 300,
    max: 900,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'processed', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CibilCheck', cibilCheckSchema);
