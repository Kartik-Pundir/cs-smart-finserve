const express = require('express');
const router = express.Router();
const { getDashboardStats, search, getUsers, getFeedback, promoteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/search', protect, admin, search);
router.get('/users', protect, admin, getUsers);
router.get('/feedback', protect, admin, getFeedback);
router.put('/users/:id/promote', protect, admin, promoteUser);

module.exports = router;
