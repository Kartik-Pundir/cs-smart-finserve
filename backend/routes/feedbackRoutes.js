const express = require('express');
const router = express.Router();
const { createFeedback, getFeedback, deleteFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createFeedback);
router.get('/', protect, getFeedback);
router.delete('/:id', protect, authorize('admin'), deleteFeedback);

module.exports = router;
