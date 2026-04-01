const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { submitDocuments, getDocuments, deleteDocument, downloadDocument } = require('../controllers/documentController');
const { protect, admin } = require('../middleware/auth');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|jpg|jpeg|png|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    allowed.test(ext) ? cb(null, true) : cb(new Error('Invalid file type'));
  },
});

const fields = [
  { name: 'id_proof', maxCount: 1 },
  { name: 'address_proof', maxCount: 1 },
  { name: 'income_proof', maxCount: 1 },
  { name: 'bank_statement', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'other', maxCount: 1 },
];

router.post('/', upload.fields(fields), submitDocuments);
router.get('/', protect, admin, getDocuments);
router.get('/:id/download/:filename', protect, admin, downloadDocument);
router.delete('/:id', protect, admin, deleteDocument);

module.exports = router;
