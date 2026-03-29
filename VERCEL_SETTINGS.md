# Vercel Project Settings - IMPORTANT

## The 404 error is happening because Vercel needs specific settings

Follow these steps EXACTLY in your Vercel dashboard:

---

## Step 1: Go to Project Settings

1. Open your Vercel dashboard
2. Click on your project: `cs-smart-finserve`
3. Go to **Settings** tab

---

## Step 2: Configure Build & Development Settings

Go to **Settings** → **General** → **Build & Development Settings**

Set these values:

### Framework Preset
```
Other
```

### Root Directory
```
./
```
(Leave as root - just a dot and slash, or leave blank)

### Build Command
```
npm run vercel-build
```

### Output Directory
```
frontend/build
```

### Install Command
```
npm install
```

---

## Step 3: Add Environment Variables

Go to **Settings** → **Environment Variables**

Add these (for Production, Preview, and Development):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
EMAIL_USER=kartikpundir231@gmail.com
EMAIL_PASS=nesyidojhwbafzmb
NODE_ENV=production
FRONTEND_URL=https://your-vercel-url.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-vercel-url.vercel.app/api/auth/google/callback
REACT_APP_API_URL=/api
```

---

## Step 4: Redeploy

1. Go to **Deployments** tab
2. Click on the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait for build to complete (2-3 minutes)

---

## Step 5: Check Build Logs

If it still fails:

1. Go to the deployment
2. Click **View Build Logs**
3. Look for errors in:
   - Installing dependencies
   - Building frontend
   - Any red error messages

**Send me a screenshot of the build logs if it fails**

---

## What Should Happen

After redeploying with correct settings:

1. ✅ Vercel installs all dependencies
2. ✅ Vercel builds the React frontend
3. ✅ Vercel creates serverless function for backend
4. ✅ Homepage loads at your Vercel URL
5. ✅ API works at `/api/*` routes

---

## If Still Getting 404

The issue might be:

1. **Build didn't complete** - Check build logs
2. **Output directory wrong** - Make sure it's `frontend/build`
3. **Build command failed** - Check if `npm run vercel-build` works locally
4. **Missing dependencies** - Check if all packages installed

---

## Test Locally First

Before deploying, test the build locally:

```bash
cd ~/Desktop/CSSMART
npm run vercel-build
```

This should create `frontend/build` folder with:
- index.html
- static/ folder
- assets/ folder

If this works locally, it should work on Vercel.

---

## Alternative: Deploy Frontend and Backend Separately

If monorepo keeps failing, we can deploy them separately:

1. **Frontend**: Deploy from `frontend` folder as a separate project
2. **Backend**: Deploy from `backend` folder as a separate project
3. Update API URL in frontend to point to backend URL

Let me know if you want to try this approach instead.
