const express = require('express');
const router = express.Router();
const { createFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect } = require('../middleware/auth');

router.post('/', createFeedback);
router.get('/', protect, getFeedback); // admin only

module.exports = router;
