const express = require('express');
const router = express.Router();
const { createApplication, getApplications, getApplication, updateApplication, deleteApplication } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createApplication);
router.get('/', protect, authorize('admin'), getApplications);
router.get('/:id', protect, authorize('admin'), getApplication);
router.put('/:id', protect, authorize('admin'), updateApplication);
router.delete('/:id', protect, authorize('admin'), deleteApplication);

module.exports = router;
