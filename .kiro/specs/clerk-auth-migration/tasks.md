# Implementation Plan: Clerk Authentication Migration

## Overview

This implementation plan migrates CS Smart Finserve from custom authentication (Google OAuth + Passport.js + JWT + MongoDB) to Clerk's managed authentication service. The migration maintains all existing functionality including role-based access control, protected routes, and user profile management while simplifying the codebase and improving security.

The implementation follows a phased approach: install dependencies, configure environment, migrate frontend components, migrate backend middleware, implement webhooks, migrate user data, and clean up legacy code.

## Tasks

- [x] 1. Install Clerk dependencies and configure environment
  - [x] 1.1 Install Clerk packages in frontend and backend
    - Install @clerk/clerk-react in frontend
    - Install @clerk/clerk-sdk-node and svix in backend
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Configure environment variables
    - Add REACT_APP_CLERK_PUBLISHABLE_KEY to frontend/.env
    - Add CLERK_SECRET_KEY to backend/.env
    - Add CLERK_WEBHOOK_SECRET to backend/.env
    - Update .env.example files with new variables
    - _Requirements: 1.3, 1.4, 1.5_

  - [x] 1.3 Configure Vercel environment variables
    - Add REACT_APP_CLERK_PUBLISHABLE_KEY to Vercel frontend settings
    - Add CLERK_SECRET_KEY to Vercel backend settings
    - Add CLERK_WEBHOOK_SECRET to Vercel backend settings
    - _Requirements: 12.1, 12.2, 12.3_

- [x] 2. Initialize Clerk in frontend application
  - [x] 2.1 Wrap application with ClerkProvider
    - Update frontend/src/index.js to import ClerkProvider
    - Wrap root component with ClerkProvider using REACT_APP_CLERK_PUBLISHABLE_KEY
    - Configure appearance settings to match existing design
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]* 2.2 Write property test for ClerkProvider initialization
    - **Property 13: Authentication State Changes Update UI**
    - **Validates: Requirements 14.2**

- [x] 3. Replace authentication UI components
  - [x] 3.1 Create new SignIn page with Clerk component
    - Create frontend/src/pages/SignIn.js using Clerk's SignIn component
    - Configure routing path, signUpUrl, and redirectUrl
    - Apply existing styling to match design
    - _Requirements: 3.1, 3.4_

  - [x] 3.2 Create new SignUp page with Clerk component
    - Create frontend/src/pages/SignUp.js using Clerk's SignUp component
    - Configure routing path, signInUrl, and redirectUrl
    - Apply existing styling to match design
    - _Requirements: 3.2, 3.4_

  - [x] 3.3 Update App.js routing
    - Replace /login route with /sign-in pointing to new SignIn component
    - Replace /signup route with /sign-up pointing to new SignUp component
    - Remove /google-auth-success route
    - Remove /forgot-password route
    - Remove /reset-password route
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 3.4 Write property test for authentication redirect
    - **Property 1: Successful Authentication Redirects to Home**
    - **Validates: Requirements 3.6**

- [x] 4. Update protected routes in frontend
  - [x] 4.1 Create ProtectedRoute component
    - Create frontend/src/components/ProtectedRoute.js
    - Use useAuth hook to check authentication state
    - Implement loading state with LoadingSpinner
    - Implement RedirectToSignIn for unauthenticated users
    - Implement role-based access control with requiredRole prop
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 4.2 Wrap protected routes with ProtectedRoute component
    - Wrap /dashboard route with ProtectedRoute
    - Wrap /admin route with ProtectedRoute (requiredRole="admin")
    - Wrap /profile route with ProtectedRoute
    - Wrap /appointments route with ProtectedRoute
    - Wrap /documents route with ProtectedRoute
    - _Requirements: 4.4, 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 4.3 Write property test for unauthenticated redirect
    - **Property 2: Unauthenticated Access to Protected Routes Redirects**
    - **Validates: Requirements 4.4**

  - [ ]* 4.4 Write property test for role-based access control
    - **Property 4: Role-Based Access Control Enforcement**
    - **Validates: Requirements 5.4, 5.5**

- [x] 5. Update Navbar component
  - [x] 5.1 Replace authentication logic with Clerk components
    - Import SignedIn, SignedOut, UserButton, useUser from @clerk/clerk-react
    - Replace login/signup links with SignedOut wrapper
    - Replace user menu with SignedIn wrapper and UserButton
    - Add role-based admin link visibility using user.publicMetadata.role
    - Remove all AuthContext imports and usage
    - _Requirements: 2.4, 5.3, 5.6_

  - [ ]* 5.2 Write property test for navigation role display
    - **Property 5: Navigation Displays Role-Appropriate Elements**
    - **Validates: Requirements 5.6**

- [x] 6. Create authenticated API client utility
  - [x] 6.1 Create useAuthenticatedAPI hook
    - Create frontend/src/utils/useAuthenticatedAPI.js
    - Use useAuth hook to get getToken function
    - Create axios instance with baseURL from environment
    - Add request interceptor to attach Authorization header with Clerk token
    - Add response interceptor to handle 401 errors and redirect to sign-in
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [x] 6.2 Update all API calls to use authenticated client
    - Update CustomerDashboard to use useAuthenticatedAPI
    - Update AdminDashboard to use useAuthenticatedAPI
    - Update all loan application pages to use useAuthenticatedAPI
    - Update BookAppointment to use useAuthenticatedAPI
    - Update DocumentUpload to use useAuthenticatedAPI
    - Update NotificationBell to use useAuthenticatedAPI
    - Remove direct axios imports and replace with useAuthenticatedAPI
    - _Requirements: 13.3, 13.4, 13.5, 13.6, 15.2_

  - [ ]* 6.3 Write property test for authorization headers
    - **Property 15: Protected Endpoints Receive Authorization Headers**
    - **Validates: Requirements 15.2**

- [x] 7. Checkpoint - Verify frontend authentication works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Create Clerk authentication middleware for backend
  - [x] 8.1 Create new auth middleware file
    - Create backend/middleware/clerkAuth.js
    - Implement protect middleware function using clerkClient.verifyToken
    - Extract session token from Authorization header
    - Verify token with Clerk and get user data
    - Attach user data to req.user (id, email, name, role)
    - Return 401 for missing or invalid tokens
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 8.2 Implement role-based authorization middleware
    - Add authorize(...roles) middleware function to clerkAuth.js
    - Check req.user.role against required roles
    - Return 403 for insufficient permissions
    - _Requirements: 6.6, 5.1_

  - [ ]* 8.3 Write property test for valid token verification
    - **Property 6: Valid Session Tokens Attach User Data**
    - **Validates: Requirements 6.3**

  - [ ]* 8.4 Write property test for invalid token rejection
    - **Property 7: Invalid Session Tokens Return 401**
    - **Validates: Requirements 6.4**

  - [ ]* 8.5 Write property test for role-based endpoint protection
    - **Property 8: Role-Based Endpoint Protection**
    - **Validates: Requirements 6.6**

- [ ] 9. Update backend routes to use Clerk middleware
  - [ ] 9.1 Update protected routes to use clerkAuth middleware
    - Replace auth.protect with clerkAuth.protect in all route files
    - Replace auth.authorize with clerkAuth.authorize in admin routes
    - Update backend/routes/userRoutes.js
    - Update backend/routes/applicationRoutes.js
    - Update backend/routes/appointmentRoutes.js
    - Update backend/routes/documentRoutes.js
    - Update backend/routes/notificationRoutes.js
    - Update backend/routes/adminRoutes.js
    - _Requirements: 6.1, 6.6, 13.3, 13.4, 13.5, 13.6_

  - [ ]* 9.2 Write unit tests for middleware integration
    - Test missing token returns 401
    - Test invalid token returns 401
    - Test valid token attaches user data
    - Test role-based access control
    - _Requirements: 6.4, 6.5, 6.6_

- [ ] 10. Implement Clerk webhook endpoint
  - [ ] 10.1 Create webhook controller
    - Create backend/controllers/webhookController.js
    - Implement handleClerkWebhook function
    - Verify webhook signature using svix Webhook class
    - Handle user.created event: create user in MongoDB
    - Handle user.updated event: update user in MongoDB
    - Handle user.deleted event: delete user from MongoDB
    - Return 400 for invalid signatures
    - Return 200 for successful processing
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ] 10.2 Create webhook route
    - Create backend/routes/webhookRoutes.js
    - Add POST /api/webhooks/clerk route
    - Use express.raw middleware for webhook body
    - Wire to handleClerkWebhook controller
    - _Requirements: 7.1_

  - [ ] 10.3 Register webhook route in server.js
    - Import webhookRoutes
    - Mount at /api/webhooks before JSON body parser
    - _Requirements: 7.1_

  - [ ]* 10.4 Write property test for webhook signature verification
    - **Property 9: Webhook Signature Verification**
    - **Validates: Requirements 7.2, 7.6**

  - [ ]* 10.5 Write unit tests for webhook events
    - Test user.created creates MongoDB record
    - Test user.updated updates MongoDB record
    - Test user.deleted deletes MongoDB record
    - Test invalid signature returns 400
    - _Requirements: 7.3, 7.4, 7.5, 7.6_

- [ ] 11. Configure Clerk webhook in dashboard
  - Add webhook endpoint URL in Clerk dashboard: https://your-api.vercel.app/api/webhooks/clerk
  - Enable user.created, user.updated, user.deleted events
  - Copy webhook secret to CLERK_WEBHOOK_SECRET environment variable
  - _Requirements: 12.4_

- [ ] 12. Update User model for Clerk integration
  - [ ] 12.1 Modify User schema
    - Add clerkId field (String, required, unique, indexed)
    - Remove password field
    - Remove googleId field
    - Remove resetPasswordToken field
    - Remove resetPasswordExpire field
    - Remove password hashing middleware
    - Remove comparePassword method
    - Keep application-specific fields (preferences, etc.)
    - _Requirements: 11.5, 11.6_

  - [ ] 12.2 Update user queries to use clerkId
    - Update all User.findById calls to use clerkId from req.user
    - Update userController.js methods
    - _Requirements: 13.7_

- [ ] 13. Checkpoint - Verify backend authentication works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Create user data migration script
  - [ ] 14.1 Create migration script file
    - Create backend/scripts/migrateToClerk.js
    - Connect to MongoDB
    - Fetch all users from User collection
    - For each user, check if already exists in Clerk by email
    - Create Clerk user with email, name, phone
    - Set publicMetadata.role from MongoDB role
    - Generate temporary password for non-Google users
    - Update MongoDB user with clerkId
    - Log success/failure for each user
    - Generate migration summary report
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_

  - [ ] 14.2 Test migration script on staging
    - Create MongoDB backup
    - Run migration script on staging environment
    - Verify users created in Clerk
    - Verify MongoDB records updated with clerkId
    - Test authentication with migrated users
    - _Requirements: 8.1, 8.8_

- [ ] 15. Remove legacy authentication code
  - [ ] 15.1 Remove backend authentication files
    - Delete backend/controllers/authController.js
    - Delete backend/config/passport.js
    - Delete backend/routes/authRoutes.js (login, signup, Google OAuth)
    - Remove authRoutes from server.js
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ] 15.2 Remove frontend authentication files
    - Delete frontend/src/context/AuthContext.js
    - Delete frontend/src/pages/Login.js
    - Delete frontend/src/pages/Signup.js
    - Delete frontend/src/pages/GoogleAuthSuccess.js
    - Delete frontend/src/pages/ForgotPassword.js
    - Delete frontend/src/pages/ResetPassword.js
    - _Requirements: 2.4, 3.1, 3.2, 3.3, 9.1, 9.2, 11.8, 11.9_

  - [ ] 15.3 Remove unused npm packages
    - Uninstall passport, passport-google-oauth20 from backend
    - Uninstall bcryptjs, jsonwebtoken from backend
    - Update package.json files
    - _Requirements: 11.4_

  - [ ] 15.4 Remove legacy environment variables
    - Remove GOOGLE_CLIENT_ID from .env files
    - Remove GOOGLE_CLIENT_SECRET from .env files
    - Remove JWT_SECRET from .env files
    - Update .env.example files
    - Remove from Vercel environment variables
    - _Requirements: 11.4_

- [ ] 16. Update user profile components
  - [ ] 16.1 Update profile display to use Clerk data
    - Use useUser hook to get user data
    - Display name, email, phone from Clerk user object
    - Remove custom profile API calls
    - _Requirements: 10.1, 10.2, 10.5_

  - [ ] 16.2 Integrate Clerk UserProfile component
    - Add UserProfile component for profile editing
    - Configure appearance to match design
    - _Requirements: 10.3, 10.4_

  - [ ]* 16.3 Write property test for user profile display
    - **Property 10: User Profile Data Display**
    - **Validates: Requirements 10.2**

- [ ] 17. Verify existing features work with Clerk
  - [ ]* 17.1 Write property test for authenticated feature access
    - **Property 11: Authenticated Feature Access Maintained**
    - **Validates: Requirements 13.3, 13.4, 13.5, 13.6**

  - [ ]* 17.2 Write property test for user-specific data display
    - **Property 12: User-Specific Data Display**
    - **Validates: Requirements 13.7**

  - [ ]* 17.3 Write property test for logout behavior
    - **Property 14: Logout Clears User Data**
    - **Validates: Requirements 14.3**

  - [ ] 17.4 Manual testing of all features
    - Test loan application submission
    - Test appointment booking
    - Test document upload
    - Test notifications
    - Test admin dashboard
    - Test customer dashboard
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [ ] 18. Final checkpoint and deployment
  - [ ] 18.1 Run all tests
    - Run frontend unit tests
    - Run frontend property tests
    - Run backend unit tests
    - Run backend property tests
    - Verify all tests pass

  - [ ] 18.2 Deploy to Vercel
    - Deploy frontend to Vercel
    - Deploy backend to Vercel
    - Verify environment variables configured
    - Verify webhook endpoint accessible
    - _Requirements: 12.5, 12.6_

  - [ ] 18.3 Run production migration
    - Create production MongoDB backup
    - Run migration script on production
    - Monitor for errors
    - Verify users can authenticate
    - _Requirements: 8.1, 8.8_

  - [ ] 18.4 Monitor and verify
    - Monitor authentication logs
    - Monitor webhook events
    - Verify no authentication errors
    - Test all critical user flows
    - _Requirements: 12.5, 12.6, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples and edge cases
- The migration maintains all existing functionality while simplifying authentication
- Rollback plan: revert deployment and restore MongoDB backup if critical issues arise
