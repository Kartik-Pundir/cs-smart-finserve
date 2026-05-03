const axios = require('axios');

const sendEmail = async (options) => {
  try {
    // If we're in development, use the local frontend server
    // If in production, use the live frontend URL
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://cssfinserve.com' 
      : (process.env.CLIENT_URL || 'http://localhost:8000');
    
    const apiUrl = `${baseUrl.replace(/\/$/, '')}/api/sendEmail`;

    console.log(`Sending email via Vercel API: ${apiUrl}`);

    const response = await axios.post(apiUrl, {
      to: options.email,
      subject: options.subject,
      html: options.html
    });

    if (response.data && response.data.success) {
      console.log('✅ Email successfully sent via Vercel API');
    } else {
      console.error('❌ Vercel API returned an error:', response.data);
    }
  } catch (error) {
    console.error('❌ Failed to send email via Vercel API:', error.response?.data || error.message);
    throw new Error('Email sending failed');
  }
};

module.exports = sendEmail;
