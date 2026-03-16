const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createLead);
router.get('/', protect, authorize('admin'), getLeads);
router.put('/:id', protect, authorize('admin'), updateLead);
router.delete('/:id', protect, authorize('admin'), deleteLead);

module.exports = router;
