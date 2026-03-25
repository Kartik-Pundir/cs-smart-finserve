const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Create dummy PDF content (minimal valid PDF)
const dummyPDF = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Sample Document) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000317 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
410
%%EOF`;

// Create dummy image content (1x1 pixel PNG)
const dummyImage = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
  0x89, 0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41,
  0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00,
  0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
  0x42, 0x60, 0x82
]);

// Sample file names that will be used
const sampleFiles = [
  'sample-aadhar.pdf',
  'sample-address.pdf',
  'sample-income.pdf',
  'sample-bank.pdf',
  'sample-pan.jpg',
  'sample-rental.pdf',
  'sample-itr.pdf',
  'sample-dl.pdf',
  'sample-property.pdf',
  'sample-hdfc.pdf',
  'sample-photo.jpg'
];

console.log('📁 Creating dummy files in uploads folder...\n');

sampleFiles.forEach(filename => {
  const filePath = path.join(uploadsDir, filename);
  const content = filename.endsWith('.pdf') ? dummyPDF : dummyImage;
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filename}`);
});

console.log('\n✅ All dummy files created successfully!');
console.log(`📂 Location: ${uploadsDir}`);
