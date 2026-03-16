# CS Smart Finserve - Complete FinTech Platform

**Smart Finance. Trusted Partners.**

A modern, production-ready full-stack fintech website for CS Smart Finserve Private Limited.

## 🚀 Features

- **Loan Services**: Home, Auto, Personal, Business, Used Car, Loan Against Property
- **Insurance**: General Insurance services
- **EMI Calculator**: Real-time loan calculation with charts
- **CIBIL Check**: Credit score inquiry system
- **Authentication**: Secure JWT-based user authentication
- **Admin Dashboard**: Complete lead and application management
- **Responsive Design**: Mobile-first approach with dark mode
- **Email Notifications**: Automated email confirmations

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Framer Motion (animations)
- Chart.js (visualizations)
- Tailwind CSS
- Axios

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer
- Helmet (security)
- Rate Limiting

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Gmail account for SMTP

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd cs-smart-finserve
```

### Step 2: Install Dependencies
```bash
npm run install-all
```

### Step 3: Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- MongoDB connection string
- JWT secret key
- Email SMTP credentials
- Admin credentials

### Step 4: Start Development Servers
```bash
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 🏗️ Project Structure

```
cs-smart-finserve/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── package.json
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Build
npm install

# Start
npm run server
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Environment Variables
Set all variables from `.env.example` in your hosting platform.

## 🔐 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT httpOnly cookies
- Helmet security headers
- Rate limiting on APIs
- CORS configuration
- Input validation
- XSS protection

## 📧 Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in EMAIL_PASS

## 🎨 Branding

- **Colors**: Primary #0f172a, Accent #0ea5e9, Secondary #6366f1
- **Fonts**: Poppins (headings), Inter (body)
- **Logo**: Located at `/public/assets/cslogo.jpeg`

## 📍 Locations

- Gurugram
- Karol Bagh (Delhi)
- Faridabad

## 📞 Contact

- **Email**: info@cssmartfinserve.com
- **WhatsApp**: +91-XXXXXXXXXX

## 📄 License

MIT License - CS Smart Finserve Private Limited

## 🤝 Support

For support, email info@cssmartfinserve.com
