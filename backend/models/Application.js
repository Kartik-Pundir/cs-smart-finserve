const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  loanAmount: {
    type: Number
  },
  employmentType: {
    type: String,
    enum: ['salaried', 'self-employed', 'business']
  },
  monthlyIncome: {
    type: Number
  },
  panNumber: {
    type: String,
    uppercase: true
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  pincode: {
    type: String
  },
  status: {
    type: String,
    enum: ['submitted', 'under-review', 'processing', 'approved', 'rejected', 'disbursed'],
    default: 'submitted'
  },
  remarks: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);
