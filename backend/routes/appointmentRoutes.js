const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment, confirmAppointment } = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createAppointment);
router.get('/', protect, authorize('admin'), getAppointments);
router.put('/:id/confirm', protect, authorize('admin'), confirmAppointment);
router.put('/:id', protect, authorize('admin'), updateAppointment);
router.delete('/:id', protect, authorize('admin'), deleteAppointment);

module.exports = router;
