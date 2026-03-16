# 🚀 Quick Start Guide - CS Smart Finserve

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (2 min)
```bash
# Install all dependencies (root + frontend)
npm run install-all
```

### Step 2: Environment Setup (1 min)
```bash
# Copy environment template
cp .env.example .env

# Edit with your credentials (use nano, vim, or any editor)
nano .env
```

**Minimum required variables:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cssmartfinserve
JWT_SECRET=your-random-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### Step 3: Add Logo (1 min)
```bash
# Place your logo file
cp /path/to/your/logo.jpeg frontend/public/assets/cslogo.jpeg
```

### Step 4: Start Development (1 min)
```bash
# Start both backend and frontend
npm run dev
```

**That's it! 🎉**

Access your application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

### Required:
- [ ] MongoDB Atlas cluster created
- [ ] Gmail SMTP configured (App Password)
- [ ] Logo file added (`frontend/public/assets/cslogo.jpeg`)
- [ ] Environment variables configured
- [ ] All dependencies installed

### Recommended:
- [ ] Favicon created and added
- [ ] Test all forms locally
- [ ] Verify email sending works
- [ ] Test authentication flow
- [ ] Check mobile responsiveness
- [ ] Test dark mode

---

## 🔧 Common Setup Issues

### Issue: MongoDB Connection Failed
**Solution**: 
1. Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)
2. Verify connection string format
3. Ensure database user has read/write permissions

### Issue: Emails Not Sending
**Solution**:
1. Enable 2FA on Gmail
2. Generate App Password (not regular password)
3. Use App Password in EMAIL_PASS variable

### Issue: Logo Not Showing
**Solution**:
1. Verify file path: `frontend/public/assets/cslogo.jpeg`
2. Check file name spelling (case-sensitive)
3. Ensure file format is JPEG or PNG

### Issue: Port Already in Use
**Solution**:
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

---

## 🎯 What's Included

### ✅ Frontend (React)
- 15+ pages (Home, Services, About, Contact, etc.)
- Dark/Light mode toggle
- Responsive design
- Animated hero carousel
- EMI Calculator with charts
- CIBIL Check form
- Authentication (Login/Signup)
- Admin Dashboard

### ✅ Backend (Node.js)
- RESTful API
- JWT Authentication
- Email notifications
- MongoDB integration
- Rate limiting
- Security headers
- Input validation

### ✅ Features
- Lead management
- Appointment booking
- Loan applications
- CIBIL score checks
- Admin dashboard
- Email confirmations
- WhatsApp integration

---

## 📚 Next Steps

1. **Test Locally**: 
   - Visit http://localhost:3000
   - Test all forms
   - Check email notifications

2. **Create Admin User**:
   ```javascript
   // In MongoDB, update a user to admin
   db.users.updateOne(
     { email: "admin@cssmartfinserve.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Deploy to Production**:
   - See `DEPLOYMENT.md` for detailed instructions
   - Deploy backend to Railway/Render
   - Deploy frontend to Vercel/Netlify

4. **Configure Domain**:
   - Point domain to hosting provider
   - Update CLIENT_URL in backend .env
   - Update API URL in frontend

---

## 🆘 Need Help?

### Documentation:
- `README.md` - Project overview
- `DEPLOYMENT.md` - Deployment guide
- `PROJECT_STRUCTURE.md` - Complete file structure
- `LOGO_INSTRUCTIONS.md` - Logo setup

### Support:
- Email: info@cssmartfinserve.com
- Check issues in project repository

---

## 🎨 Customization

### Change Colors:
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#0f172a',  // Change this
  accent: '#0ea5e9',   // Change this
  secondary: '#6366f1', // Change this
}
```

### Change Company Info:
Edit these files:
- `frontend/src/components/Footer.js` - Contact details
- `frontend/src/pages/AboutUs.js` - Company description
- `frontend/src/pages/Contact.js` - Locations

### Add/Remove Services:
Edit:
- `frontend/src/components/Navbar.js` - Services dropdown
- `frontend/src/pages/Home.js` - Services section
- Create new page in `frontend/src/pages/`

---

**Happy Coding! 🚀**
