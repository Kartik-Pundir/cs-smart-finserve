# SMS Notification Setup Guide

## Overview
This project now includes SMS notifications for loan application status updates using Twilio.

## Features
Customers receive SMS notifications on their phone for:
- ✅ Application submitted
- ✅ Application processing
- ✅ Application approved
- ✅ Application rejected
- ✅ Application disbursed

## Setup Instructions

### Step 1: Create Twilio Account
1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email and phone number

### Step 2: Get Twilio Credentials
1. Login to [Twilio Console](https://console.twilio.com/)
2. From the dashboard, copy:
   - **Account SID** (starts with AC...)
   - **Auth Token** (click to reveal)

### Step 3: Get a Phone Number
1. In Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
2. For FREE trial:
   - Select your country (India: +91)
   - Choose a number with SMS capability
   - Click "Buy" (free for trial)
3. Copy your Twilio phone number (e.g., +1234567890)

### Step 4: Configure Environment Variables
Add these to your `.env` file:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### Step 5: Verify Phone Numbers (Trial Account)
⚠️ **Important for Trial Accounts:**
- Twilio trial accounts can only send SMS to verified phone numbers
- To verify a number:
  1. Go to **Phone Numbers** → **Manage** → **Verified Caller IDs**
  2. Click **Add a new number**
  3. Enter the phone number and verify via SMS code

### Step 6: Restart Server
```bash
cd backend
npm start
```

## Testing

### Test SMS Notification
1. Submit a loan application with a verified phone number
2. You should receive: "Hi [Name], we received your [Loan Type] application..."
3. In Admin Dashboard, change application status to "processing"
4. Customer receives: "Your loan application is in process"

## SMS Templates

### Application Submitted
```
Hi [Name], we received your [Loan Type] application. Our team will review and contact you within 24 hours. - CS Smart Finserve
```

### Application Processing
```
Hi [Name], your [Loan Type] application is now being processed. We'll update you on the progress soon. - CS Smart Finserve
```

### Application Approved
```
Congratulations [Name]! Your [Loan Type] application for ₹[Amount] has been approved. We'll contact you for next steps. - CS Smart Finserve
```

### Application Rejected
```
Hi [Name], unfortunately your [Loan Type] application could not be approved at this time. Please contact us for more details. - CS Smart Finserve
```

### Application Disbursed
```
Great news [Name]! Your [Loan Type] of ₹[Amount] has been disbursed. Thank you for choosing CS Smart Finserve!
```

## Pricing

### Free Trial
- $15.50 USD credit
- ~500 SMS messages (India: ₹0.60/SMS)
- Can only send to verified numbers

### Paid Plan
- Pay as you go
- India SMS: ~₹0.60 per message
- No verified number restriction
- [View Pricing](https://www.twilio.com/sms/pricing/in)

## Troubleshooting

### SMS Not Sending
1. Check Twilio credentials in `.env`
2. Verify phone number format: `+919876543210` (with country code)
3. For trial accounts, ensure recipient number is verified
4. Check Twilio Console → Logs for error messages

### Phone Number Format
- ✅ Correct: `+919876543210`
- ✅ Correct: `9876543210` (auto-adds +91)
- ❌ Wrong: `09876543210`
- ❌ Wrong: `919876543210` (missing +)

### Trial Account Limitations
- Can only send to verified numbers
- Twilio branding in messages
- Limited to $15.50 credit
- Upgrade to remove restrictions

## Production Deployment

### Before Going Live
1. Upgrade Twilio account (remove trial restrictions)
2. Purchase a dedicated phone number
3. Set up proper error logging
4. Monitor SMS delivery rates
5. Consider SMS cost in budget

### Alternative SMS Providers
If Twilio doesn't work for you:
- **MSG91** (India-focused, cheaper)
- **Kaleyra** (India-based)
- **AWS SNS** (Amazon)
- **Vonage** (formerly Nexmo)

## Support
- Twilio Docs: https://www.twilio.com/docs/sms
- Twilio Support: https://support.twilio.com/
- Project Issues: Contact kartikpundir231@gmail.com
