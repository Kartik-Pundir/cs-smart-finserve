const express = require('express');
const router = express.Router();
const { submitCibilCheck, getCibilChecks, updateCibilCheck, deleteCibilCheck } = require('../controllers/cibilController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitCibilCheck);
router.get('/', protect, authorize('admin'), getCibilChecks);
router.put('/:id', protect, authorize('admin'), updateCibilCheck);
router.delete('/:id', protect, authorize('admin'), deleteCibilCheck);

module.exports = router;
