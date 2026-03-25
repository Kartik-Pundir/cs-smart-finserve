# Google OAuth "Continue with Google" Not Working - FIX

## Problem
The "Continue with Google" button is not working because the redirect URI needs to be configured in Google Cloud Console.

## Solution - Follow These Steps:

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com/
2. Login with your Google account (kartikpundir231@gmail.com)

### Step 2: Select Your Project
1. Click the project dropdown at the top
2. Select your existing project OR create a new one:
   - Click "NEW PROJECT"
   - Name: "CS Smart Finserve"
   - Click "CREATE"

### Step 3: Enable Google+ API
1. Go to: **APIs & Services** → **Library**
2. Search for: "Google+ API"
3. Click on it and click **ENABLE**

### Step 4: Configure OAuth Consent Screen
1. Go to: **APIs & Services** → **OAuth consent screen**
2. Select: **External** (for public users)
3. Click **CREATE**
4. Fill in:
   - App name: `CS Smart Finserve`
   - User support email: `kartikpundir231@gmail.com`
   - Developer contact: `kartikpundir231@gmail.com`
5. Click **SAVE AND CONTINUE**
6. Skip "Scopes" → Click **SAVE AND CONTINUE**
7. Skip "Test users" → Click **SAVE AND CONTINUE**
8. Click **BACK TO DASHBOARD**

### Step 5: Create OAuth Credentials (If Not Already Created)
1. Go to: **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `CS Smart Finserve Web Client`

### Step 6: Add Authorized Redirect URIs (MOST IMPORTANT!)
In the "Authorized redirect URIs" section, add BOTH:

```
http://localhost:5001/api/auth/google/callback
http://localhost:8000/auth/google/success
```

Click **ADD URI** for each one.

### Step 7: Save and Get Credentials
1. Click **CREATE**
2. Copy the **Client ID** and **Client Secret**
3. Update your `.env` file with YOUR credentials:

```env
GOOGLE_CLIENT_ID=your-actual-client-id-from-google-console
GOOGLE_CLIENT_SECRET=your-actual-client-secret-from-google-console
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback
```

**Note**: Replace `your-actual-client-id-from-google-console` and `your-actual-client-secret-from-google-console` with the values from Google Console.

### Step 8: Restart Your Backend Server
```bash
cd backend
npm start
```

### Step 9: Test It!
1. Go to: http://localhost:8000/login
2. Click "Continue with Google"
3. Select your Google account
4. You should be redirected back and logged in!

---

## Common Issues & Fixes

### Issue 1: "redirect_uri_mismatch" Error
**Fix**: Make sure BOTH URIs are added in Google Console:
- `http://localhost:5001/api/auth/google/callback`
- `http://localhost:8000/auth/google/success`

### Issue 2: "Access blocked: This app's request is invalid"
**Fix**: 
1. Go to OAuth consent screen
2. Make sure app is published or add your email as a test user
3. Under "Test users", click **ADD USERS**
4. Add: `kartikpundir231@gmail.com`

### Issue 3: Button Does Nothing
**Fix**: 
1. Open browser console (F12)
2. Check for errors
3. Make sure backend is running on port 5001
4. Check `.env` has correct credentials

### Issue 4: "Google OAuth not configured" in Backend Logs
**Fix**: 
1. Check `.env` file has valid Google credentials (get from Google Console)
2. Restart backend server

---

## For Production Deployment

When deploying to production (e.g., Vercel, Heroku):

### Update Redirect URIs in Google Console:
```
https://yourdomain.com/api/auth/google/callback
https://yourdomain.com/auth/google/success
```

### Update .env:
```env
GOOGLE_CALLBACK_URL=https://yourdomain.com/api/auth/google/callback
CLIENT_URL=https://yourdomain.com
```

---

## Verify It's Working

### Backend Logs Should Show:
```
✅ Google OAuth configured successfully
```

### NOT:
```
⚠️  Google OAuth not configured — skipping passport setup
```

---

## Need Help?

1. Check backend console for errors
2. Check browser console (F12) for errors
3. Verify all redirect URIs are added in Google Console
4. Make sure OAuth consent screen is configured
5. Try in incognito mode to clear cookies

## Contact
If still not working, contact: kartikpundir231@gmail.com
