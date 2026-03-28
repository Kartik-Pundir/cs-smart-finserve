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

    // Send confirmation email to customer
    try {
      const formattedDate = new Date(preferredDate).toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      await sendEmail({
        email: email,
        subject: 'Appointment Booked — CS Smart Finserve',
        html: appointmentConfirmation(fullName, formattedDate, preferredTime)
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    // Notify admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Appointment: ${fullName} — ${service}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e,#c0392b);padding:24px 32px;">
              <h2 style="margin:0;color:#fff;font-size:20px;">New Appointment Booked</h2>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">CS Smart Finserve — Admin Alert</p>
            </div>
            <div style="padding:28px 32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${fullName}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;font-weight:600;"><a href="tel:${phone}" style="color:#c0392b;">${phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${email}" style="color:#c0392b;">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:8px 0;font-weight:600;color:#111827;">${service}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Date</td><td style="padding:8px 0;color:#374151;">${new Date(preferredDate).toLocaleDateString('en-IN', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Time</td><td style="padding:8px 0;color:#374151;">${preferredTime}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Message</td><td style="padding:8px 0;color:#374151;">${message || '—'}</td></tr>
              </table>
              <div style="margin-top:24px;">
                <a href="http://localhost:8000/admin" style="display:inline-block;padding:12px 28px;background:#c0392b;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View in Admin Dashboard →</a>
              </div>
            </div>
          </div>
        `
      });
    } catch (e) { console.error('Admin notification failed:', e.message); }

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
    let emailSent = false;
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
      emailSent = true;
      console.log('✅ Confirmation email sent to:', appointment.email);
    } catch (emailErr) {
      console.error('❌ Confirmation email FAILED:', emailErr.message);
    }

    res.status(200).json({
      success: true,
      message: emailSent
        ? 'Appointment confirmed and email sent to customer'
        : 'Appointment confirmed but email failed — check EMAIL_PASS in .env',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
