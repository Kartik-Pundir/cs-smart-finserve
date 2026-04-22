# Deploy Backend to Render - Step by Step Guide

## 🚀 Why Render for Backend?

- ✅ Always-on server (no cold starts)
- ✅ No timeout limits
- ✅ Perfect for Node.js/Express
- ✅ Free tier available
- ✅ Easy MongoDB integration
- ✅ Simple deployment process

## 📋 Prerequisites

- GitHub account with your code pushed
- Render account (sign up at https://render.com)
- MongoDB Atlas connection string
- Google OAuth credentials

## 🎯 Step-by-Step Deployment

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository: `cs-smart-finserve`
4. Click "Connect"

### Step 3: Configure Service

**Basic Settings:**
- **Name:** `cs-smart-finserve-backend`
- **Region:** Choose closest to your users (e.g., Singapore, Mumbai)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **Free** (for testing)
- Or **Starter** ($7/month for production - no sleep, better performance)

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these variables (copy from your `backend/.env`):

```
NODE_ENV=production
PORT=5001

# MongoDB
MONGODB_URI=mongodb+srv://kartikpundir231_db_user:321@Kartik@cssmartfinserve.saki0i0.mongodb.net/cssmartfinserve?retryWrites=true&w=majority&appName=CsSmartFinServe

# JWT
JWT_SECRET=your_jwt_secret_here_change_in_production
JWT_EXPIRE=30d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://cs-smart-finserve-backend.onrender.com/api/auth/google/callback

# Frontend URL (Update after deploying)
CLIENT_URL=https://cs-smart-finserve.vercel.app
FRONTEND_URL=https://cs-smart-finserve.vercel.app

# Email (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=CS Smart Finserve <noreply@cssmartfinserve.com>

# Admin
ADMIN_EMAIL=kartikpundir231@gmail.com
```

**Important Notes:**
- Replace `your_jwt_secret_here` with a strong random string
- Update `GOOGLE_CALLBACK_URL` with your actual Render URL
- Update `CLIENT_URL` with your Vercel frontend URL

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes first time)
3. Watch the logs for any errors
4. Once deployed, you'll get a URL like: `https://cs-smart-finserve-backend.onrender.com`

### Step 6: Test Backend

Open in browser:
```
https://cs-smart-finserve-backend.onrender.com/api/auth/me
```

You should see:
```json
{"success":false,"message":"Not authorized to access this route"}
```

This means it's working! ✅

### Step 7: Update Google OAuth Redirect URI

1. Go to Google Cloud Console
2. Navigate to your OAuth credentials
3. Add authorized redirect URI:
   ```
   https://cs-smart-finserve-backend.onrender.com/api/auth/google/callback
   ```
4. Save

### Step 8: Update Frontend to Use Render Backend

#### Option A: Update Vercel Environment Variables

1. Go to Vercel Dashboard
2. Select your frontend project
3. Go to Settings → Environment Variables
4. Update or add:
   ```
   REACT_APP_API_URL=https://cs-smart-finserve-backend.onrender.com
   ```
5. Redeploy frontend

#### Option B: Update Code (if needed)

Update `frontend/src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  // ... rest of config
});
```

### Step 9: Create Production Environment File

Create `frontend/.env.production`:
```
REACT_APP_API_URL=https://cs-smart-finserve-backend.onrender.com
```

## 🔧 Troubleshooting

### Issue: "Application failed to respond"
**Solution:** Check Render logs, ensure MongoDB connection string is correct

### Issue: CORS errors
**Solution:** Verify `CLIENT_URL` in Render environment variables matches your frontend URL

### Issue: Google OAuth not working
**Solution:** 
1. Check `GOOGLE_CALLBACK_URL` in Render
2. Verify redirect URI in Google Console
3. Ensure both URLs match exactly

### Issue: Slow first request (Free tier)
**Solution:** 
- Free tier sleeps after 15 min inactivity
- Upgrade to Starter plan ($7/month) for always-on
- Or use a service like UptimeRobot to ping every 14 minutes

## 📊 Monitoring

### View Logs
1. Go to Render Dashboard
2. Click your service
3. Click "Logs" tab
4. Monitor real-time logs

### Check Metrics
- CPU usage
- Memory usage
- Request count
- Response times

## 🔄 Auto-Deploy

Render automatically deploys when you push to GitHub:
1. Make changes locally
2. Commit and push to GitHub
3. Render detects changes
4. Automatically rebuilds and deploys

## 💰 Pricing

**Free Tier:**
- 750 hours/month
- Sleeps after 15 min inactivity
- Shared CPU/RAM
- Good for testing

**Starter ($7/month):**
- Always on (no sleep)
- Dedicated resources
- Better performance
- Recommended for production

## ✅ Final Checklist

- [ ] Backend deployed on Render
- [ ] All environment variables added
- [ ] Backend URL tested and working
- [ ] Google OAuth redirect URI updated
- [ ] Frontend updated with new backend URL
- [ ] Frontend redeployed on Vercel
- [ ] Test login/signup flow
- [ ] Test Google OAuth
- [ ] Monitor logs for errors

## 🎉 Success!

Your backend is now running on Render with:
- ✅ Always-on server (if using Starter plan)
- ✅ Automatic deployments from GitHub
- ✅ Better performance than Vercel serverless
- ✅ No timeout issues
- ✅ Proper MongoDB connection

## 📞 Need Help?

If you encounter issues:
1. Check Render logs first
2. Verify all environment variables
3. Test backend URL directly
4. Check CORS configuration
5. Verify MongoDB connection

---

**Your Backend URL:** `https://cs-smart-finserve-backend.onrender.com`
**Your Frontend URL:** `https://cs-smart-finserve.vercel.app`

Good luck! 🚀
