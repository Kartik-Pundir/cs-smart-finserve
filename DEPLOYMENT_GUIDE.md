# Complete Deployment Guide
## CS Smart Finserve - Render (Backend) + Vercel (Frontend)

---

## 📋 Prerequisites

1. GitHub account with your repository
2. Render account (https://render.com)
3. Vercel account (https://vercel.com)
4. MongoDB Atlas database
5. Gmail account for email service
6. Google OAuth credentials

---

## 🚀 PART 1: Deploy Backend on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `cs-smart-finserve`
3. Configure the service:

**Basic Settings:**
- **Name:** `cs-smart-finserve-backend` (or your choice)
- **Region:** Singapore (or closest to your users)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

**Instance Type:**
- Free (for testing)
- Starter ($7/month) - Recommended for production

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these **16 variables**:

```bash
# 1. Node Environment
NODE_ENV=production

# 2. Server Port
PORT=5001

# 3. Database Connection
MONGODB_URI=mongodb+srv://kartikpundir231_db_user:321%40Kartik@cssmartfinserve.saki0i0.mongodb.net/cssmartfinserve?retryWrites=true&w=majority&appName=CsSmartFinServe

# 4. JWT Configuration
JWT_SECRET=cs-smart-finserve-super-secret-key-2024-change-in-production
JWT_EXPIRES_IN=7d

# 5. Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=kartikpundir231@gmail.com
EMAIL_PASS=nesyidojhwbafzmb
ADMIN_EMAIL=kartikpundir231@gmail.com

# 6. Client URL (Update after Vercel deployment)
CLIENT_URL=https://cs-smart-finserve.vercel.app

# 7. Google OAuth Credentials
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# 8. Google OAuth Callback (Update after deployment)
GOOGLE_CALLBACK_URL=https://your-render-app.onrender.com/api/auth/google/callback

# 9. Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 4: Deploy Backend
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Once deployed, copy your Render URL (e.g., `https://cs-smart-finserve-backend.onrender.com`)

### Step 5: Update Environment Variables
1. Go to **Environment** tab in Render
2. Update these variables with your actual URLs:
   - `GOOGLE_CALLBACK_URL` = `https://YOUR-RENDER-URL.onrender.com/api/auth/google/callback`
   - `CLIENT_URL` = `https://cs-smart-finserve.vercel.app` (update after Vercel deployment)
3. Click **"Save Changes"** (will auto-redeploy)

---

## 🌐 PART 2: Deploy Frontend on Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import `cs-smart-finserve` repository
3. Configure project:

**Framework Preset:** Create React App
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `build`
**Install Command:** `npm install`

### Step 3: Add Environment Variables

Click **"Environment Variables"** and add:

```bash
# 1. Backend API URL (Use your Render URL)
REACT_APP_API_URL=https://YOUR-RENDER-URL.onrender.com/api

# 2. Build Configuration
CI=false
GENERATE_SOURCEMAP=false
DISABLE_ESLINT_PLUGIN=true
```

**IMPORTANT:** Replace `YOUR-RENDER-URL` with your actual Render backend URL from Part 1, Step 4.

### Step 4: Deploy Frontend
1. Click **"Deploy"**
2. Wait 2-3 minutes for build and deployment
3. Once deployed, copy your Vercel URL (e.g., `https://cs-smart-finserve.vercel.app`)

### Step 5: Update Backend Environment Variables
1. Go back to **Render Dashboard**
2. Navigate to your backend service → **Environment** tab
3. Update `CLIENT_URL` with your Vercel URL:
   ```
   CLIENT_URL=https://YOUR-VERCEL-URL.vercel.app
   ```
4. Save (will auto-redeploy)

---

## 🔐 PART 3: Configure Google OAuth

### Step 1: Update Google Cloud Console
1. Go to https://console.cloud.google.com
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID

### Step 2: Add Authorized Redirect URIs
Add these URIs:

```
https://YOUR-RENDER-URL.onrender.com/api/auth/google/callback
https://YOUR-VERCEL-URL.vercel.app/auth/google/success
```

### Step 3: Add Authorized JavaScript Origins
Add these origins:

```
https://YOUR-RENDER-URL.onrender.com
https://YOUR-VERCEL-URL.vercel.app
```

Click **"Save"**

---

## ✅ PART 4: Verify Deployment

### Test Backend
1. Open: `https://YOUR-RENDER-URL.onrender.com/api/health`
2. Should return: `{"status":"ok","message":"Server is running"}`

### Test Frontend
1. Open: `https://YOUR-VERCEL-URL.vercel.app`
2. Homepage should load properly
3. Test navigation to different pages

### Test Authentication
1. Click **"Login"** on your frontend
2. Try **"Continue with Google"**
3. Should redirect to Google login
4. After login, should redirect back to your app

### Test API Connection
1. Try creating a callback request from Contact page
2. Check if email is sent
3. Verify data is saved in MongoDB

---

## 🔧 PART 5: Update Production Environment Files

Update your local `.env.production` file for future reference:

```bash
# Frontend Production Environment
REACT_APP_API_URL=https://YOUR-RENDER-URL.onrender.com/api
GENERATE_SOURCEMAP=false
DISABLE_ESLINT_PLUGIN=true
```

---

## 📊 Environment Variables Summary

### Backend (Render) - 16 Variables
| Variable | Value | Description |
|----------|-------|-------------|
| NODE_ENV | production | Environment mode |
| PORT | 5001 | Server port |
| MONGODB_URI | mongodb+srv://... | Database connection |
| JWT_SECRET | cs-smart-finserve-super-secret-key-2024-change-in-production | JWT signing key |
| JWT_EXPIRES_IN | 7d | Token expiry |
| EMAIL_HOST | smtp.gmail.com | SMTP host |
| EMAIL_PORT | 587 | SMTP port |
| EMAIL_USER | kartikpundir231@gmail.com | Email sender |
| EMAIL_PASS | nesyidojhwbafzmb | App password |
| ADMIN_EMAIL | kartikpundir231@gmail.com | Admin email |
| CLIENT_URL | https://YOUR-VERCEL-URL.vercel.app | Frontend URL |
| GOOGLE_CLIENT_ID | YOUR_GOOGLE_CLIENT_ID | OAuth client ID |
| GOOGLE_CLIENT_SECRET | YOUR_GOOGLE_CLIENT_SECRET | OAuth secret |
| GOOGLE_CALLBACK_URL | https://YOUR-RENDER-URL.onrender.com/api/auth/google/callback | OAuth callback |
| ADMIN_USERNAME | admin | Admin username |
| ADMIN_PASSWORD | admin123 | Admin password |

### Frontend (Vercel) - 4 Variables
| Variable | Value | Description |
|----------|-------|-------------|
| REACT_APP_API_URL | https://YOUR-RENDER-URL.onrender.com/api | Backend API URL |
| CI | false | Disable CI checks |
| GENERATE_SOURCEMAP | false | Disable sourcemaps |
| DISABLE_ESLINT_PLUGIN | true | Disable ESLint |

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** "Cannot find module '/opt/render/project/src/backend/backend/server.js'"
- **Solution:** Make sure Start Command is `node server.js` (NOT `node backend/server.js`)

**Problem:** MongoDB connection fails
- **Solution:** Check MONGODB_URI is correct and IP whitelist in MongoDB Atlas includes `0.0.0.0/0`

**Problem:** Email not sending
- **Solution:** Verify EMAIL_PASS is the Gmail App Password (not regular password)

### Frontend Issues

**Problem:** "Failed to fetch" or CORS errors
- **Solution:** Verify REACT_APP_API_URL is correct and includes `/api` at the end

**Problem:** Google OAuth not working
- **Solution:** Check Google Cloud Console has correct redirect URIs

**Problem:** 404 on page refresh
- **Solution:** Verify `frontend/vercel.json` has rewrites configuration

### General Issues

**Problem:** Changes not reflecting
- **Solution:** 
  - Render: Go to service → Click "Manual Deploy" → "Deploy latest commit"
  - Vercel: Go to project → Deployments → Click "Redeploy"

**Problem:** Environment variables not working
- **Solution:** After updating env vars, both platforms auto-redeploy. Wait 2-3 minutes.

---

## 🔄 Redeployment Process

### Update Code
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Both Render and Vercel will automatically detect the push and redeploy.

### Manual Redeploy
- **Render:** Dashboard → Service → "Manual Deploy" → "Deploy latest commit"
- **Vercel:** Dashboard → Project → Deployments → "Redeploy"

---

## 📝 Post-Deployment Checklist

- [ ] Backend health check returns OK
- [ ] Frontend loads without errors
- [ ] Google OAuth login works
- [ ] Email sending works (test callback form)
- [ ] Admin dashboard accessible
- [ ] Customer dashboard accessible
- [ ] File uploads work
- [ ] All loan pages load correctly
- [ ] Mobile responsive design works
- [ ] WhatsApp button works
- [ ] Smooth scroll animations work

---

## 🎉 Your URLs

After deployment, save these URLs:

**Frontend (Vercel):** `https://cs-smart-finserve.vercel.app`
**Backend (Render):** `https://cs-smart-finserve-backend.onrender.com`
**Admin Dashboard:** `https://cs-smart-finserve.vercel.app/admin`
**Customer Dashboard:** `https://cs-smart-finserve.vercel.app/dashboard`

---

## 💡 Important Notes

1. **Free Tier Limitations:**
   - Render free tier: Server spins down after 15 min inactivity (first request takes 30-60 seconds)
   - Consider upgrading to Starter ($7/month) for production

2. **Security:**
   - Change JWT_SECRET to a strong random string
   - Change ADMIN_PASSWORD to a strong password
   - Never commit `.env` files to Git

3. **Monitoring:**
   - Render: Check logs in Dashboard → Logs tab
   - Vercel: Check logs in Dashboard → Deployments → View Function Logs

4. **Custom Domain (Optional):**
   - Render: Settings → Custom Domain
   - Vercel: Settings → Domains

---

## 📞 Support

If you encounter issues:
1. Check deployment logs in Render/Vercel dashboard
2. Verify all environment variables are correct
3. Test backend health endpoint
4. Check browser console for frontend errors

---

**Deployment Date:** April 27, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
