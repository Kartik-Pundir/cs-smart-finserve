# Quick Deploy Reference Card

## 🎯 Deploy in 10 Minutes

### 1️⃣ Backend on Render (3 min)
```
Service: Web Service
Repository: cs-smart-finserve
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

**16 Environment Variables:**
```bash
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://kartikpundir231_db_user:321%40Kartik@cssmartfinserve.saki0i0.mongodb.net/cssmartfinserve?retryWrites=true&w=majority&appName=CsSmartFinServe
JWT_SECRET=cs-smart-finserve-super-secret-key-2024-change-in-production
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=kartikpundir231@gmail.com
EMAIL_PASS=nesyidojhwbafzmb
ADMIN_EMAIL=kartikpundir231@gmail.com
CLIENT_URL=https://cs-smart-finserve.vercel.app
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=https://YOUR-RENDER-URL.onrender.com/api/auth/google/callback
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### 2️⃣ Frontend on Vercel (2 min)
```
Framework: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
```

**4 Environment Variables:**
```bash
REACT_APP_API_URL=https://YOUR-RENDER-URL.onrender.com/api
CI=false
GENERATE_SOURCEMAP=false
DISABLE_ESLINT_PLUGIN=true
```

### 3️⃣ Update URLs (2 min)
1. Copy Render URL → Update `REACT_APP_API_URL` in Vercel
2. Copy Vercel URL → Update `CLIENT_URL` in Render
3. Update `GOOGLE_CALLBACK_URL` in Render with actual Render URL

### 4️⃣ Google OAuth (3 min)
**Authorized Redirect URIs:**
```
https://YOUR-RENDER-URL.onrender.com/api/auth/google/callback
https://YOUR-VERCEL-URL.vercel.app/auth/google/success
```

**Authorized JavaScript Origins:**
```
https://YOUR-RENDER-URL.onrender.com
https://YOUR-VERCEL-URL.vercel.app
```

---

## ✅ Test Checklist
- [ ] Backend health: `https://YOUR-RENDER-URL.onrender.com/api/health`
- [ ] Frontend loads: `https://YOUR-VERCEL-URL.vercel.app`
- [ ] Google login works
- [ ] Email sending works

---

**Full Guide:** See `DEPLOYMENT_GUIDE.md`
