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

              <!-- Green tick banner -->
              <tr>
                <td style="background:#faf8ff;padding:28px 40px 0;text-align:center;">
                  <div style="width:60px;height:60px;background:#c0392b;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                    <span style="color:#fff;font-size:28px;line-height:1;">✓</span>
                  </div>
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

                  <!-- CTA Button -->
                  <div style="text-align:center;margin-bottom:28px;">
                    <a href="https://cssmartfinserve.com" style="display:inline-block;padding:13px 32px;background:#c0392b;color:#ffffff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;">
                      Visit Our Website →
                    </a>
                  </div>

                  <!-- Divider -->
                  <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px;" />

                  <!-- Contact info -->
                  <p style="color:#6b7280;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Need immediate help?</p>
                  <table cellpadding="0" cellspacing="0">
                    <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📱 &nbsp;<a href="https://wa.me/919267953513" style="color:#c0392b;text-decoration:none;">WhatsApp: +91 92679 53513</a></td></tr>
                    <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📧 &nbsp;<a href="mailto:Krishan.pal1986@gmail.com" style="color:#c0392b;text-decoration:none;">Krishan.pal1986@gmail.com</a></td></tr>
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
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-badge { display: inline-block; padding: 8px 16px; background: #10b981; color: white; border-radius: 20px; font-size: 14px; }
        .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Application Received!</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>We have successfully received your application for <strong>${serviceType}</strong>.</p>
          <p><span class="status-badge">Under Review</span></p>
          <p>Our team is currently reviewing your application. We will contact you within 24-48 hours with the next steps.</p>
          <h3>What happens next?</h3>
          <ol>
            <li>Document verification</li>
            <li>Eligibility assessment</li>
            <li>Approval process</li>
            <li>Disbursement</li>
          </ol>
          <p>Thank you for choosing CS Smart Finserve!</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} CS Smart Finserve Private Limited</p>
        </div>
      </div>
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
                <div style="width:64px;height:64px;background:#c0392b;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="color:#fff;font-size:30px;">✓</span>
                </div>
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
                  <tr><td style="padding:4px 0;color:#374151;font-size:14px;">📧 &nbsp;<a href="mailto:Krishan.pal1986@gmail.com" style="color:#c0392b;text-decoration:none;">Krishan.pal1986@gmail.com</a></td></tr>
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
