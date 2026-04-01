const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/auth');

router.post('/', createLead);
router.get('/', protect, admin, getLeads);
router.put('/:id', protect, admin, updateLead);
router.delete('/:id', protect, admin, deleteLead);

module.exports = router;
