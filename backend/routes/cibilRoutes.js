const express = require('express');
const router = express.Router();
const { submitCibilCheck, getCibilChecks, updateCibilCheck, deleteCibilCheck } = require('../controllers/cibilController');
const { protect, admin } = require('../middleware/auth');

router.post('/', submitCibilCheck);
router.get('/', protect, admin, getCibilChecks);
router.put('/:id', protect, admin, updateCibilCheck);
router.delete('/:id', protect, admin, deleteCibilCheck);

module.exports = router;
