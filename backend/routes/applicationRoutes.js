const express = require('express');
const router = express.Router();
const { createApplication, getApplications, getApplication, updateApplication, deleteApplication } = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/auth');

router.post('/', createApplication);
router.get('/', protect, admin, getApplications);
router.get('/:id', protect, admin, getApplication);
router.put('/:id', protect, admin, updateApplication);
router.delete('/:id', protect, admin, deleteApplication);

module.exports = router;
