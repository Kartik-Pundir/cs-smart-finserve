exports.callbackConfirmation = (name) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Thank You — CS Smart Finserve</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f1ff;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ff;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1a1a2e 0%,#c0392b 100%);padding:36px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">CS Smart Finserve</h1>
                  <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Smart Finance. Trusted Partners.</p>
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td style="background:#faf8ff;padding:32px 40px 0;text-align:center;">
                  <h2 style="margin:0 0 6px;color:#1a1a2e;font-size:22px;font-weight:700;">Message Received!</h2>
                  <p style="margin:0;color:#6b7280;font-size:14px;">We'll get back to you within a few hours.</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="background:#faf8ff;padding:28px 40px 36px;">
                  <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
                  <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">
                    Thank you for reaching out to <strong>CS Smart Finserve Private Limited</strong>. We have successfully received your message and our team is already on it.
                  </p>
                  <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
                    One of our financial experts will contact you shortly — typically within <strong>2–4 business hours</strong> — to understand your requirements and guide you toward the best solution.
                  </p>

                  <!-- What to expect box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeff;border-radius:12px;margin-bottom:24px;">
                    <tr>
                      <td style="padding:20px 24px;">
                        <p style="margin:0 0 12px;color:#1a1a2e;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">What happens next?</p>
                        <table cellpadding="0" cellspacing="0">
                          <tr><td style="padding:5px 0;color:#374151;font-size:14px;">📞 &nbsp;Our advisor will call you to understand your needs</td></tr>
                          <tr><td style="padding:5px 0;color:#374151;font-size:14px;">🏦 &nbsp;We compare offers from 50+ banks &amp; NBFCs for you</td></tr>
                          <tr><td style="padding:5px 0;color:#374151;font-size:14px;">📄 &nbsp;Minimal paperwork — fully digital process</td></tr>
                          <tr><td style="padding:5px 0;color:#374151;font-size:14px;">✅ &nbsp;Loan sanctioned &amp; disbursed within 24–48 hours</td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
                    In the meantime, feel free to explore our services or use our free EMI Calculator to plan your finances.
                  </p>


                  <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px;" />

                  <!-- Contact info -->
                  <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Need immediate help?</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📱 &nbsp;<a href="https://wa.me/919267953513" style="color:#c0392b;text-decoration:none;">WhatsApp: +91 92679 53513</a></td></tr>
                    <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📧 &nbsp;<a href="mailto:kartikpundir231@gmail.com" style="color:#c0392b;text-decoration:none;">kartikpundir231@gmail.com</a></td></tr>
                    <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📍 &nbsp;102, Lala Ram Market, Sector 17, Sukhrali, Gurgaon 122001</td></tr>
                    <tr><td style="padding:4px 0;color:#374151;font-size:14px;">🕐 &nbsp;Mon – Sat, 9 AM – 7 PM</td></tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#1a1a2e;padding:20px 40px;text-align:center;">
                  <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">
                    &copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited. All rights reserved.<br/>
                    This is an automated confirmation email. Please do not reply to this email.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

exports.appointmentConfirmation = (name, date, time) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .appointment-box { background: white; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Appointment Confirmed!</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Your appointment with CS Smart Finserve has been successfully scheduled.</p>
          <div class="appointment-box">
            <h3>Appointment Details:</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>
          <p>Our financial advisor will be ready to assist you. Please bring any relevant documents for a smooth consultation.</p>
          <p>Looking forward to meeting you!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

exports.applicationReceived = (name, serviceType) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
    <body style="margin:0;padding:0;background:#f4f1ff;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ff;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#1a1a2e 0%,#c0392b 100%);padding:36px 40px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">CS Smart Finserve</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Smart Finance. Trusted Partners.</p>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="background:#faf8ff;padding:32px 40px 0;text-align:center;">
                <h2 style="margin:0 0 6px;color:#1a1a2e;font-size:22px;font-weight:700;">Application Received!</h2>
                <p style="margin:0;color:#6b7280;font-size:14px;">We'll review your application and get back to you within 24–48 hours.</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="background:#faf8ff;padding:28px 40px 36px;">
                <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
                <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 20px;">
                  We have successfully received your application for <strong>${serviceType}</strong>. Our team is already on it.
                </p>

                <!-- Status badge -->
                <div style="margin-bottom:24px;">
                  <span style="display:inline-block;padding:8px 20px;background:linear-gradient(135deg,#1a1a2e,#c0392b);color:#fff;border-radius:20px;font-size:13px;font-weight:600;letter-spacing:0.3px;">Under Review</span>
                </div>

                <!-- What happens next box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeff;border-radius:12px;margin-bottom:24px;">
                  <tr><td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;color:#1a1a2e;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">What happens next?</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr><td style="padding:5px 0;color:#374151;font-size:14px;">📋 &nbsp;Document verification</td></tr>
                      <tr><td style="padding:5px 0;color:#374151;font-size:14px;">✅ &nbsp;Eligibility assessment</td></tr>
                      <tr><td style="padding:5px 0;color:#374151;font-size:14px;">🏦 &nbsp;Approval process</td></tr>
                      <tr><td style="padding:5px 0;color:#374151;font-size:14px;">💰 &nbsp;Disbursement</td></tr>
                    </table>
                  </td></tr>
                </table>

                <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 20px;"/>

                <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Need help?</p>
                <table cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📱 &nbsp;<a href="https://wa.me/919267953513" style="color:#c0392b;text-decoration:none;">WhatsApp: +91 92679 53513</a></td></tr>
                  <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📧 &nbsp;<a href="mailto:kartikpundir231@gmail.com" style="color:#c0392b;text-decoration:none;">kartikpundir231@gmail.com</a></td></tr>
                  <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📍 &nbsp;102, Lala Ram Market, Sector 17, Sukhrali, Gurgaon 122001</td></tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#1a1a2e;padding:20px 40px;text-align:center;">
                <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">
                  &copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited. All rights reserved.<br/>
                  This is an automated confirmation email. Please do not reply.
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};

exports.appointmentConfirmed = (name, date, time, service) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"/></head>
    <body style="margin:0;padding:0;background:#f4f1ff;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ff;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#1a1a2e 0%,#c0392b 100%);padding:36px 40px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">CS Smart Finserve</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;text-transform:uppercase;letter-spacing:1px;">Smart Finance. Trusted Partners.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#faf8ff;padding:32px 40px;text-align:center;">
                <h2 style="margin:0 0 6px;color:#1a1a2e;font-size:22px;font-weight:700;">Appointment Confirmed!</h2>
                <p style="margin:0;color:#6b7280;font-size:14px;">Your slot has been reserved. We look forward to meeting you.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#faf8ff;padding:0 40px 36px;">
                <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 20px;">Dear <strong>${name}</strong>,</p>
                <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
                  Your appointment with <strong>CS Smart Finserve</strong> has been <strong style="color:#c0392b;">confirmed</strong>. Here are your appointment details:
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0eeff;border-radius:12px;margin-bottom:24px;">
                  <tr><td style="padding:20px 24px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr><td style="padding:6px 0;color:#374151;font-size:14px;">📅 &nbsp;<strong>Date:</strong> &nbsp;${date}</td></tr>
                      <tr><td style="padding:6px 0;color:#374151;font-size:14px;">🕐 &nbsp;<strong>Time:</strong> &nbsp;${time}</td></tr>
                      <tr><td style="padding:6px 0;color:#374151;font-size:14px;">🏦 &nbsp;<strong>Service:</strong> &nbsp;${service}</td></tr>
                      <tr><td style="padding:6px 0;color:#374151;font-size:14px;">📍 &nbsp;<strong>Location:</strong> &nbsp;102, Lala Ram Market, Sector 17, Sukhrali, Gurgaon 122001</td></tr>
                    </table>
                  </td></tr>
                </table>
                <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 24px;">
                  Please carry any relevant documents (ID proof, salary slips, bank statements) for a smooth consultation.
                </p>
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 20px;"/>
                <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Need to reschedule?</p>
                <table cellpadding="0" cellspacing="0">
                  <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📱 &nbsp;<a href="https://wa.me/919267953513" style="color:#c0392b;text-decoration:none;">WhatsApp: +91 92679 53513</a></td></tr>
                  <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📧 &nbsp;<a href="mailto:kartikpundir231@gmail.com" style="color:#c0392b;text-decoration:none;">kartikpundir231@gmail.com</a></td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#1a1a2e;padding:20px 40px;text-align:center;">
                <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">
                  &copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};

exports.resetPasswordEmail = (name, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
    <body style="margin:0;padding:0;background:#f4f1ff;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ff;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,#1a1a2e 0%,#c0392b 100%);padding:36px 40px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">CS Smart Finserve</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:1px;text-transform:uppercase;">Smart Finance. Trusted Partners.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#faf8ff;padding:32px 40px;text-align:center;">
                <div style="width:64px;height:64px;background:rgba(192,57,43,0.1);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="font-size:30px;">🔐</span>
                </div>
                <h2 style="margin:0 0 6px;color:#1a1a2e;font-size:22px;font-weight:700;">Reset Your Password</h2>
                <p style="margin:0;color:#6b7280;font-size:14px;">We received a request to reset your password.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#faf8ff;padding:0 40px 36px;">
                <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear <strong>${name}</strong>,</p>
                <p style="color:#374151;font-size:15px;line-height:1.7;margin:0 0 24px;">
                  Click the button below to reset your password. This link is valid for <strong>1 hour</strong>.
                </p>
                <div style="text-align:center;margin-bottom:28px;">
                  <a href="${resetUrl}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#c0392b,#e74c3c);color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:700;letter-spacing:0.3px;">
                    Reset My Password →
                  </a>
                </div>
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff8f8;border:1px solid #fecaca;border-radius:10px;margin-bottom:24px;">
                  <tr><td style="padding:16px 20px;">
                    <p style="margin:0;color:#991b1b;font-size:13px;line-height:1.6;">
                      ⚠️ If you did not request a password reset, please ignore this email. Your account remains secure.
                    </p>
                  </td></tr>
                </table>
                <p style="color:#9ca3af;font-size:12px;margin:0;">
                  If the button doesn't work, copy and paste this link into your browser:<br/>
                  <a href="${resetUrl}" style="color:#c0392b;word-break:break-all;">${resetUrl}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#1a1a2e;padding:20px 40px;text-align:center;">
                <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">
                  &copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;
};
