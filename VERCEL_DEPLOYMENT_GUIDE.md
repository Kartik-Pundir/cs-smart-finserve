# Vercel Deployment Guide

## Complete Monorepo Deployment (Frontend + Backend Together)

This guide will help you deploy the entire CS Smart Finserve project (frontend + backend) on a single Vercel deployment.

### Prerequisites
- GitHub account with your repository
- Vercel account (sign up at vercel.com)
- MongoDB Atlas database URL
- Gmail App Password for email notifications

---

## Step 1: Prepare Your Repository

1. Make sure all changes are committed and pushed to GitHub:
```bash
git add -A
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository: `cs-smart-finserve`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as `.` (root)
   - **Build Command**: Leave default (will use vercel.json)
   - **Output Directory**: Leave default (will use vercel.json)

---

## Step 3: Add Environment Variables

In the Vercel project settings, add these environment variables:

### Backend Environment Variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

EMAIL_USER=kartikpundir231@gmail.com
EMAIL_PASS=nesyidojhwbafzmb

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-domain.vercel.app/api/auth/google/callback

FRONTEND_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Frontend Environment Variables:
```
REACT_APP_API_URL=/api
```

**Important**: Replace `your-domain.vercel.app` with your actual Vercel domain after deployment.

---

## Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a URL like: `https://your-project.vercel.app`

---

## Step 5: Update Google OAuth Callback

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to your OAuth 2.0 Client
3. Add these to "Authorized redirect URIs":
   - `https://your-domain.vercel.app/api/auth/google/callback`
   - `https://your-domain.vercel.app/google-auth-success`

---

## Step 6: Update Environment Variables

1. Go back to Vercel project settings
2. Update these variables with your actual domain:
   - `GOOGLE_CALLBACK_URL=https://your-actual-domain.vercel.app/api/auth/google/callback`
   - `FRONTEND_URL=https://your-actual-domain.vercel.app`
3. Redeploy the project (Vercel will auto-redeploy on env changes)

---

## Step 7: Setup Admin User

1. Go to MongoDB Atlas
2. Open your database → Collections → users
3. Find your user (kartikpundir231@gmail.com)
4. Edit the document and set: `"role": "admin"`
5. Save the changes

---

## Troubleshooting

### 404 Error on Homepage
- Check that `vercel.json` is in the root directory
- Verify the build completed successfully in Vercel logs
- Make sure `frontend/build` directory was created

### API Calls Failing
- Check environment variables are set correctly
- Verify MongoDB connection string is correct
- Check Vercel function logs for backend errors

### Google OAuth Not Working
- Verify callback URLs in Google Console match your Vercel domain
- Check `GOOGLE_CALLBACK_URL` environment variable
- Ensure `FRONTEND_URL` is set correctly

### Build Failures
- Check Vercel build logs for specific errors
- Verify all dependencies are in package.json files
- Make sure Node version is compatible (14.x or higher)

---

## File Structure

Your deployment uses these configuration files:

```
/
├── vercel.json              # Main Vercel config (routes both frontend & backend)
├── package.json             # Root dependencies
├── frontend/
│   ├── vercel.json         # Frontend build config
│   ├── package.json        # Frontend dependencies
│   └── .env.production     # Frontend production env vars
└── backend/
    ├── vercel.json         # Backend serverless config
    ├── package.json        # Backend dependencies
    └── server.js           # Backend entry point
```

---

## How It Works

1. Vercel builds the frontend React app into static files
2. Vercel deploys the backend as serverless functions
3. All `/api/*` requests are routed to the backend
4. All other requests serve the React app
5. Both frontend and backend run on the same domain

---

## Redeployment

To redeploy after making changes:

1. Commit and push to GitHub:
```bash
git add -A
git commit -m "Your changes"
git push origin main
```

2. Vercel will automatically detect the push and redeploy

Or manually redeploy from Vercel dashboard:
- Go to your project → Deployments
- Click "Redeploy" on the latest deployment

---

## Custom Domain (Optional)

To use cssfinserve.com:

1. Go to Vercel project → Settings → Domains
2. Add your domain: `cssfinserve.com`
3. Follow Vercel's DNS configuration instructions
4. Update environment variables with new domain
5. Update Google OAuth callback URLs

---

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Vercel function logs (for backend errors)
3. Verify all environment variables are set
4. Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)

---

## Success Checklist

- [ ] Project deployed successfully
- [ ] Homepage loads without 404 error
- [ ] Can navigate to different pages
- [ ] API calls work (test login/signup)
- [ ] Google OAuth works
- [ ] Admin dashboard accessible
- [ ] Email notifications working
- [ ] File uploads working
- [ ] MongoDB connection stable

---

**Your project is now live! 🎉**
