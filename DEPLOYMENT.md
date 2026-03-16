# Deployment Guide - CS Smart Finserve

## Prerequisites
- Node.js v16+ installed
- MongoDB Atlas account
- Gmail account for SMTP
- Domain name (optional)

## Local Development Setup

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Configuration
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Required environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Random secret key (generate using: `openssl rand -base64 32`)
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Gmail App Password (not regular password)
- `CLIENT_URL`: Frontend URL (http://localhost:3000 for development)

### 3. Start Development Servers
```bash
# Start both backend and frontend
npm run dev

# Or start separately:
# Backend only
npm run server

# Frontend only (in another terminal)
cd frontend && npm start
```

## Production Deployment

### Backend Deployment (Railway/Render/Heroku)

#### Railway:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables in Railway dashboard
# Deploy
railway up
```

#### Render:
1. Connect your GitHub repository
2. Create new Web Service
3. Build Command: `npm install`
4. Start Command: `npm run server`
5. Add environment variables in dashboard

### Frontend Deployment (Vercel/Netlify)

#### Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Add environment variable in Vercel dashboard:
# REACT_APP_API_URL=your-backend-url
```

#### Netlify:
```bash
# Build frontend
cd frontend
npm run build

# Deploy build folder
# Or connect GitHub repo in Netlify dashboard
```

### Database Setup (MongoDB Atlas)

1. Create account at mongodb.com/cloud/atlas
2. Create new cluster (Free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string
6. Replace `<password>` and `<dbname>` in connection string

### Email Setup (Gmail SMTP)

1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account > Security > App Passwords
3. Generate new app password
4. Use this password in `EMAIL_PASS` environment variable

## Environment Variables for Production

### Backend (.env):
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cssmartfinserve
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=info@cssmartfinserve.com
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend:
```
REACT_APP_API_URL=https://your-backend-domain.com
```

## Post-Deployment Checklist

- [ ] Test all forms (callback, appointment, application)
- [ ] Verify email notifications are working
- [ ] Test authentication (signup, login, logout)
- [ ] Check admin dashboard access
- [ ] Test EMI calculator
- [ ] Verify CIBIL check form
- [ ] Test all service pages
- [ ] Check mobile responsiveness
- [ ] Test dark mode toggle
- [ ] Verify WhatsApp button functionality
- [ ] Test all navigation links
- [ ] Check logo display in light/dark modes

## Custom Domain Setup

### Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS records

## SSL Certificate
Both Vercel and Netlify provide free SSL certificates automatically.

## Monitoring & Maintenance

### Recommended Tools:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible

### Regular Maintenance:
- Update dependencies monthly
- Monitor database size
- Check email delivery rates
- Review application logs
- Backup database regularly

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure `CLIENT_URL` in backend .env matches frontend URL
2. **Email Not Sending**: Verify Gmail app password and SMTP settings
3. **Database Connection Failed**: Check MongoDB Atlas IP whitelist
4. **Build Failures**: Clear node_modules and reinstall dependencies

## Support
For issues, contact: info@cssmartfinserve.com
