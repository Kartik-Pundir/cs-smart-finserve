const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, updateAppointment, deleteAppointment, confirmAppointment } = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/auth');

router.post('/', createAppointment);
router.get('/', protect, admin, getAppointments);
router.put('/:id/confirm', protect, admin, confirmAppointment);
router.put('/:id', protect, admin, updateAppointment);
router.delete('/:id', protect, admin, deleteAppointment);

module.exports = router;
