# 🚀 VERCEL DEPLOYMENT - STEP BY STEP

## ✅ PREPARATION COMPLETE
All configuration files are ready. Just follow these steps:

---

## STEP 1: Deploy Frontend (5 minutes)

1. **Open Vercel**: https://vercel.com/login
   - Sign in with GitHub

2. **Import Project**:
   - Click "Add New" → "Project"
   - Find repository: `Kartik-Pundir/cs-smart-finserve`
   - Click "Import"

3. **Configure**:
   ```
   Project Name: cs-smart-finserve-frontend
   Root Directory: frontend (IMPORTANT!)
   Framework: Create React App (auto-detected)
   ```

4. **Environment Variables** (click "Add"):
   ```
   Name: REACT_APP_API_URL
   Value: https://your-backend-url.vercel.app/api
   ```
   (You'll update this after deploying backend)

5. **Click "Deploy"** → Wait 2-3 minutes

6. **Copy your frontend URL**: 
   Example: `https://cs-smart-finserve-frontend.vercel.app`

---

## STEP 2: Deploy Backend (5 minutes)

1. **Go back to Vercel Dashboard**
   - Click "Add New" → "Project"
   - Select SAME repository: `Kartik-Pundir/cs-smart-finserve`
   - Click "Import"

2. **Configure**:
   ```
   Project Name: cs-smart-finserve-backend
   Root Directory: backend (IMPORTANT!)
   Framework: Other
   ```

3. **Environment Variables** (Add ALL of these):

   ```
   PORT = 5001
   NODE_ENV = production
   
   MONGODB_URI = mongodb+srv://kartikpundir231:YOUR_PASSWORD@cluster.mongodb.net/cssmartfinserve?retryWrites=true&w=majority
   
   JWT_SECRET = your-super-secret-jwt-key-here
   JWT_EXPIRES_IN = 7d
   
   EMAIL_HOST = smtp.gmail.com
   EMAIL_PORT = 587
   EMAIL_USER = kartikpundir231@gmail.com
   EMAIL_PASS = nesyidojhwbafzmb
   ADMIN_EMAIL = kartikpundir231@gmail.com
   
   CLIENT_URL = https://cs-smart-finserve-frontend.vercel.app
   
   GOOGLE_CLIENT_ID = your-google-client-id
   GOOGLE_CLIENT_SECRET = your-google-client-secret
   ```

4. **Click "Deploy"** → Wait 2-3 minutes

5. **Copy your backend URL**: 
   Example: `https://cs-smart-finserve-backend.vercel.app`

---

## STEP 3: Update Frontend Environment Variable (2 minutes)

1. **Go to Frontend Project**:
   - Click on "cs-smart-finserve-frontend" project
   - Go to "Settings" → "Environment Variables"

2. **Edit REACT_APP_API_URL**:
   - Delete the old value
   - Add new value: `https://cs-smart-finserve-backend.vercel.app/api`
   - Click "Save"

3. **Redeploy**:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Wait 2 minutes

---

## STEP 4: Update Google OAuth (3 minutes)

1. **Go to Google Cloud Console**:
   https://console.cloud.google.com/apis/credentials

2. **Click on your OAuth 2.0 Client**

3. **Add Authorized Redirect URIs**:
   ```
   https://cs-smart-finserve-backend.vercel.app/api/auth/google/callback
   https://cs-smart-finserve-frontend.vercel.app/auth/google/success
   ```

4. **Click "Save"**

---

## STEP 5: Test Your Live Site! 🎉

1. **Open your frontend URL**:
   `https://cs-smart-finserve-frontend.vercel.app`

2. **Test these features**:
   - ✅ Homepage loads
   - ✅ Chatbot works
   - ✅ Contact form submits
   - ✅ Login/Signup works
   - ✅ Google OAuth works
   - ✅ Apply for loan works

---

## 🔧 TROUBLESHOOTING

### If frontend shows blank page:
- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct
- Redeploy frontend

### If API calls fail:
- Check backend logs in Vercel dashboard
- Verify all environment variables are set
- Check MongoDB connection string

### If Google OAuth fails:
- Verify redirect URIs in Google Console
- Check `CLIENT_URL` in backend env vars
- Make sure both URLs use HTTPS

---

## 📱 OPTIONAL: Add Custom Domain

1. **Buy domain** (if you don't have): cssfinserve.com

2. **In Vercel Frontend Project**:
   - Settings → Domains
   - Add: `cssfinserve.com` and `www.cssfinserve.com`
   - Follow DNS instructions

3. **Update Backend CLIENT_URL**:
   - Change to: `https://cssfinserve.com`
   - Redeploy backend

4. **Update Google OAuth**:
   - Add: `https://cssfinserve.com/auth/google/success`

---

## 🎯 DEPLOYMENT CHECKLIST

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Vercel
- [ ] Frontend env var updated with backend URL
- [ ] Backend env vars all added
- [ ] Google OAuth redirect URIs updated
- [ ] Test live site
- [ ] Custom domain added (optional)

---

## 💡 TIPS

1. **Free Tier Limits**:
   - Vercel: 100GB bandwidth/month
   - Good for 10,000+ visitors/month

2. **MongoDB Atlas**:
   - Make sure to whitelist all IPs: `0.0.0.0/0`
   - Or add Vercel IPs specifically

3. **Environment Variables**:
   - Never commit `.env` files
   - Always add them in Vercel dashboard

4. **Logs**:
   - Check logs in Vercel dashboard if something breaks
   - Go to project → "Logs" tab

---

## 🆘 NEED HELP?

If you get stuck:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables
4. Make sure MongoDB allows Vercel connections

---

**Your project is ready to deploy! Just follow the steps above.** 🚀
