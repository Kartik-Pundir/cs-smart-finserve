const mongoose = require('mongoose');
const path = require('path');
const Document = require('./models/Document');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const sampleDocuments = [
  {
    name: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'rajesh.kumar@example.com',
    loanType: 'Home Loan',
    files: [
      {
        fieldName: 'id_proof',
        label: 'ID Proof',
        originalName: 'aadhar_card.pdf',
        filename: 'sample-aadhar.pdf',
        size: 245678,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'address_proof',
        label: 'Address Proof',
        originalName: 'electricity_bill.pdf',
        filename: 'sample-address.pdf',
        size: 189234,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'income_proof',
        label: 'Income Proof',
        originalName: 'salary_slip.pdf',
        filename: 'sample-income.pdf',
        size: 156789,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'bank_statement',
        label: 'Bank Statement',
        originalName: 'bank_statement_6months.pdf',
        filename: 'sample-bank.pdf',
        size: 567890,
        mimetype: 'application/pdf'
      }
    ],
    status: 'received'
  },
  {
    name: 'Priya Sharma',
    phone: '9123456789',
    email: 'priya.sharma@example.com',
    loanType: 'Home Loan',
    files: [
      {
        fieldName: 'id_proof',
        label: 'ID Proof',
        originalName: 'pan_card.jpg',
        filename: 'sample-pan.jpg',
        size: 123456,
        mimetype: 'image/jpeg'
      },
      {
        fieldName: 'address_proof',
        label: 'Address Proof',
        originalName: 'rental_agreement.pdf',
        filename: 'sample-rental.pdf',
        size: 234567,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'income_proof',
        label: 'Income Proof',
        originalName: 'itr_returns.pdf',
        filename: 'sample-itr.pdf',
        size: 345678,
        mimetype: 'application/pdf'
      }
    ],
    status: 'received'
  },
  {
    name: 'Amit Patel',
    phone: '9988776655',
    email: 'amit.patel@example.com',
    loanType: 'Home Loan',
    files: [
      {
        fieldName: 'id_proof',
        label: 'ID Proof',
        originalName: 'driving_license.pdf',
        filename: 'sample-dl.pdf',
        size: 198765,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'address_proof',
        label: 'Address Proof',
        originalName: 'property_papers.pdf',
        filename: 'sample-property.pdf',
        size: 456789,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'bank_statement',
        label: 'Bank Statement',
        originalName: 'hdfc_statement.pdf',
        filename: 'sample-hdfc.pdf',
        size: 389012,
        mimetype: 'application/pdf'
      },
      {
        fieldName: 'photo',
        label: 'Passport Photo',
        originalName: 'passport_photo.jpg',
        filename: 'sample-photo.jpg',
        size: 87654,
        mimetype: 'image/jpeg'
      }
    ],
    status: 'received'
  }
];

const seedDocuments = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI not found in .env file');
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing sample documents
    await Document.deleteMany({ loanType: 'Home Loan', email: { $in: ['rajesh.kumar@example.com', 'priya.sharma@example.com', 'amit.patel@example.com'] } });
    console.log('🗑️  Cleared old sample documents');

    // Insert sample documents
    const docs = await Document.insertMany(sampleDocuments);
    console.log(`✅ Added ${docs.length} sample Home Loan document submissions`);

    console.log('\n📋 Sample Documents Created:');
    docs.forEach((doc, i) => {
      console.log(`\n${i + 1}. ${doc.name}`);
      console.log(`   Email: ${doc.email}`);
      console.log(`   Phone: ${doc.phone}`);
      console.log(`   Loan Type: ${doc.loanType}`);
      console.log(`   Files: ${doc.files.length} documents`);
    });

    console.log('\n✅ Seeding complete! Check your Admin Dashboard → Documents tab');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding documents:', error);
    process.exit(1);
  }
};

seedDocuments();
