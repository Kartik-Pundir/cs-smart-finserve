const express = require('express');
const router = express.Router();
const { submitCibilCheck, getCibilChecks, updateCibilCheck } = require('../controllers/cibilController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitCibilCheck);
router.get('/', protect, authorize('admin'), getCibilChecks);
router.put('/:id', protect, authorize('admin'), updateCibilCheck);

module.exports = router;
