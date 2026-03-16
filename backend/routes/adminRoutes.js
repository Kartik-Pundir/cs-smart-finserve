const express = require('express');
const router = express.Router();
const { getDashboardStats, search, getUsers, getFeedback, promoteUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/stats', protect, authorize('admin'), getDashboardStats);
router.get('/search', protect, authorize('admin'), search);
router.get('/users', protect, authorize('admin'), getUsers);
router.get('/feedback', protect, authorize('admin'), getFeedback);
router.put('/users/:id/promote', protect, authorize('admin'), promoteUser);

module.exports = router;
