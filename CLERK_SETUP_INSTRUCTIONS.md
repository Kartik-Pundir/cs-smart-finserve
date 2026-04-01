# Clerk Setup Instructions

## ✅ Issue Resolved

The missing `SignUp.js` file has been created. The compilation error should now be resolved.

## 🚀 Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure Environment Variables

**Frontend (.env):**
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Backend (.env):**
```env
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret_here
MONGODB_URI=your_mongodb_connection_string
```

### 3. Get Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or select existing one
3. Go to **API Keys** section
4. Copy:
   - **Publishable Key** → `REACT_APP_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** → `CLERK_SECRET_KEY`

### 4. Configure Clerk Webhook

1. In Clerk Dashboard, go to **Webhooks**
2. Click **Add Endpoint**
3. Enter endpoint URL: `https://your-backend-url/api/webhooks/clerk`
   - For local testing: `http://localhost:5001/api/webhooks/clerk`
4. Select events:
   - ✅ user.created
   - ✅ user.updated
   - ✅ user.deleted
5. Copy the **Signing Secret** → `CLERK_WEBHOOK_SECRET`

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend will run on http://localhost:8000

## 🧪 Testing the Migration

### Test Authentication Flow

1. **Sign Up:**
   - Go to http://localhost:8000/sign-up
   - Create a new account
   - Verify you're redirected to dashboard

2. **Sign In:**
   - Go to http://localhost:8000/sign-in
   - Sign in with your account
   - Verify you're redirected to dashboard

3. **Protected Routes:**
   - Try accessing `/dashboard` without signing in
   - Should redirect to `/sign-in`

4. **Admin Access:**
   - Sign in as admin user
   - Access `/admin` route
   - Verify admin dashboard loads

### Test API Integration

1. **Customer Dashboard:**
   - Sign in as customer
   - Go to `/dashboard`
   - Verify applications, appointments, and CIBIL checks load

2. **Admin Dashboard:**
   - Sign in as admin
   - Go to `/admin`
   - Verify all admin data loads

3. **Notifications:**
   - Click notification bell in navbar
   - Verify notifications load

## 🔧 Troubleshooting

### Issue: "Module not found: Error: Can't resolve './pages/SignUp'"
**Solution:** The SignUp.js file has been created. Clear cache and restart:
```bash
cd frontend
rm -rf node_modules/.cache
npm start
```

### Issue: "REACT_APP_CLERK_PUBLISHABLE_KEY is not defined"
**Solution:** 
1. Create `frontend/.env` file
2. Add: `REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...`
3. Restart frontend server

### Issue: "CLERK_SECRET_KEY is not set"
**Solution:**
1. Create `backend/.env` file
2. Add: `CLERK_SECRET_KEY=sk_test_...`
3. Restart backend server

### Issue: "Not authorized to access this route"
**Solution:**
1. Check that you're signed in
2. Verify token is being sent in Authorization header (check Network tab)
3. Check backend logs for authentication errors

### Issue: Webhook not creating users in MongoDB
**Solution:**
1. Verify webhook is configured in Clerk dashboard
2. Check `CLERK_WEBHOOK_SECRET` is set correctly
3. Check backend logs for webhook errors
4. Test webhook with Clerk dashboard's "Send Test Event"

### Issue: User role not working
**Solution:**
1. In Clerk Dashboard, go to user's profile
2. Click "Metadata"
3. Add to Public Metadata:
   ```json
   {
     "role": "admin"
   }
   ```
4. Save and test again

## 📊 Migration Status

### ✅ Completed
- Frontend Clerk integration
- Backend Clerk middleware
- Webhook endpoint
- User model updates
- Legacy code removal

### 📋 Pending (Manual Steps)
- [ ] Configure Clerk webhook in dashboard
- [ ] Set environment variables
- [ ] Run user migration script (if you have existing users)
- [ ] Test all features
- [ ] Deploy to production

## 🔄 Migrating Existing Users

If you have existing users in MongoDB, run the migration script:

```bash
cd backend
node scripts/migrateToClerk.js
```

This will:
1. Find all users in MongoDB
2. Create corresponding users in Clerk
3. Update MongoDB records with clerkId
4. Generate migration report

**Important:** 
- Backup your database first!
- Test on staging environment before production
- Users will need to reset their passwords after migration

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [Clerk Node SDK](https://clerk.com/docs/references/nodejs/overview)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks)

## ✅ Next Steps

1. Start both servers (backend and frontend)
2. Configure Clerk webhook
3. Test sign up and sign in
4. Test protected routes
5. Test admin access
6. Verify API calls work
7. Run migration script if needed
8. Deploy to production

Your Clerk migration is complete! 🎉
