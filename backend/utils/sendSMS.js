const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send SMS notification
 * @param {string} to - Phone number (with country code, e.g., +919267953513)
 * @param {string} message - SMS message text
 */
const sendSMS = async (to, message) => {
  try {
    // Skip if Twilio credentials not configured
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.log('⚠️  Twilio not configured. SMS skipped:', message);
      return { success: false, message: 'Twilio not configured' };
    }

    // Ensure phone number has country code
    let phoneNumber = to.trim();
    if (!phoneNumber.startsWith('+')) {
      // Assume India (+91) if no country code
      phoneNumber = '+91' + phoneNumber.replace(/^0+/, '');
    }

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    console.log('✅ SMS sent successfully:', result.sid);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('❌ SMS sending failed:', error.message);
    return { success: false, message: error.message };
  }
};

/**
 * SMS Templates for different loan application statuses
 */
const smsTemplates = {
  applicationSubmitted: (name, loanType) => 
    `Hi ${name}, we received your ${loanType} application. Our team will review and contact you within 24 hours. - CS Smart Finserve`,
  
  applicationProcessing: (name, loanType) => 
    `Hi ${name}, your ${loanType} application is now being processed. We'll update you on the progress soon. - CS Smart Finserve`,
  
  applicationApproved: (name, loanType, amount) => 
    `Congratulations ${name}! Your ${loanType} application for ${amount ? '₹' + amount.toLocaleString() : ''} has been approved. We'll contact you for next steps. - CS Smart Finserve`,
  
  applicationRejected: (name, loanType) => 
    `Hi ${name}, unfortunately your ${loanType} application could not be approved at this time. Please contact us for more details. - CS Smart Finserve`,
  
  applicationDisbursed: (name, loanType, amount) => 
    `Great news ${name}! Your ${loanType} of ${amount ? '₹' + amount.toLocaleString() : ''} has been disbursed. Thank you for choosing CS Smart Finserve!`,
  
  appointmentConfirmed: (name, date, time) => 
    `Hi ${name}, your appointment is confirmed for ${date} at ${time}. We look forward to meeting you! - CS Smart Finserve`,
  
  cibilScoreReady: (name, score) => 
    `Hi ${name}, your CIBIL score is ${score}. Login to your dashboard to view details. - CS Smart Finserve`,
  
  documentsReceived: (name, loanType) => 
    `Hi ${name}, we received your documents for ${loanType}. Our team will review them within 24 hours. - CS Smart Finserve`,
};

module.exports = { sendSMS, smsTemplates };
