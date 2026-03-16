const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');
const { appointmentConfirmation } = require('../utils/emailTemplates');

// @desc    Create new appointment
// @route   POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const { fullName, phone, email, preferredDate, preferredTime, service, message } = req.body;

    const appointment = await Appointment.create({
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      service,
      message
    });

    // Send confirmation email
    try {
      const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      await sendEmail({
        email: email,
        subject: 'Appointment Confirmed - CS Smart Finserve',
        html: appointmentConfirmation(fullName, formattedDate, preferredTime)
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ preferredDate: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Confirm appointment and send email to customer
// @route   PUT /api/appointments/:id/confirm
exports.confirmAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Send confirmation email to customer
    try {
      const { appointmentConfirmed } = require('../utils/emailTemplates');
      const formattedDate = new Date(appointment.preferredDate).toLocaleDateString('en-IN', {
        timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      await sendEmail({
        email: appointment.email,
        subject: 'Appointment Confirmed — CS Smart Finserve',
        html: appointmentConfirmed(appointment.fullName, formattedDate, appointment.preferredTime, appointment.service)
      });
    } catch (emailErr) {
      console.error('Confirmation email failed (non-critical):', emailErr.message);
    }

    res.status(200).json({ success: true, message: 'Appointment confirmed and email sent', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
