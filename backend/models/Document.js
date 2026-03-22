const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  loanType: { type: String },
  files: [{
    fieldName: String,   // e.g. 'id_proof'
    label: String,       // e.g. 'ID Proof'
    originalName: String,
    filename: String,    // stored filename
    size: Number,
    mimetype: String,
  }],
  status: { type: String, enum: ['received', 'reviewed', 'approved', 'rejected'], default: 'received' },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
