# Requirements Document

## Introduction

This document specifies the requirements for migrating the CS Smart Finserve application from a custom authentication system (Google OAuth, JWT tokens, MongoDB user storage, Passport.js) to Clerk authentication. The migration will replace all custom authentication logic while maintaining existing functionality including user roles, protected routes, and user profile management. The application uses React 18 with Create React App (not Vite) for the frontend and Node.js/Express for the backend, both deployed on Vercel.

## Glossary

- **Clerk**: Third-party authentication service providing user management, authentication, and authorization
- **Frontend_App**: React 18 single-page application built with Create React App
- **Backend_API**: Node.js/Express REST API server
- **AuthContext**: React Context providing authentication state and methods (to be replaced)
- **Auth_Middleware**: Backend middleware validating authentication tokens
- **Protected_Route**: Frontend route requiring authentication
- **Protected_Endpoint**: Backend API endpoint requiring authentication
- **User_Role**: User permission level (customer or admin)
- **ClerkProvider**: React component wrapping the application to provide Clerk context
- **Clerk_Webhook**: Backend endpoint receiving user events from Clerk
- **User_Metadata**: Additional user data stored in Clerk (roles, preferences)
- **Session_Token**: Clerk-issued JWT token for authenticated requests
- **Migration_Script**: Tool for transferring user data from MongoDB to Clerk

## Requirements

### Requirement 1: Install and Configure Clerk

**User Story:** As a developer, I want to install Clerk SDK packages, so that I can integrate Clerk authentication into the application.

#### Acceptance Criteria

1. THE Frontend_App SHALL install @clerk/clerk-react package
2. THE Backend_API SHALL install @clerk/clerk-sdk-node package
3. THE Frontend_App SHALL configure REACT_APP_CLERK_PUBLISHABLE_KEY environment variable
4. THE Backend_API SHALL configure CLERK_SECRET_KEY environment variable
5. THE Backend_API SHALL configure CLERK_WEBHOOK_SECRET environment variable for webhook verification

### Requirement 2: Initialize Clerk in Frontend

**User Story:** As a developer, I want to wrap the React application with ClerkProvider, so that Clerk authentication is available throughout the app.

#### Acceptance Criteria

1. THE Frontend_App SHALL wrap the root component with ClerkProvider in index.js
2. THE ClerkProvider SHALL use REACT_APP_CLERK_PUBLISHABLE_KEY for initialization
3. WHEN ClerkProvider is mounted, THE Frontend_App SHALL load Clerk authentication state
4. THE Frontend_App SHALL remove the custom AuthContext provider
5. THE Frontend_App SHALL remove all AuthContext imports from components

### Requirement 3: Replace Authentication UI Components

**User Story:** As a user, I want to use Clerk's authentication UI, so that I can log in and sign up securely.

#### Acceptance Criteria

1. THE Frontend_App SHALL replace Login.js with Clerk's SignIn component
2. THE Frontend_App SHALL replace Signup.js with Clerk's SignUp component
3. THE Frontend_App SHALL remove GoogleAuthSuccess.js page
4. THE Frontend_App SHALL configure Clerk sign-in and sign-up paths in ClerkProvider
5. THE Frontend_App SHALL maintain the existing visual styling around authentication components
6. WHEN a user completes authentication, THE Frontend_App SHALL redirect to the home page

### Requirement 4: Update Protected Routes

**User Story:** As a developer, I want to protect frontend routes using Clerk, so that only authenticated users can access restricted pages.

#### Acceptance Criteria

1. THE Frontend_App SHALL replace custom authentication checks with Clerk's useAuth hook
2. THE Frontend_App SHALL use SignedIn and SignedOut components for conditional rendering
3. THE Frontend_App SHALL use RedirectToSignIn component for unauthenticated access attempts
4. WHEN an unauthenticated user accesses a Protected_Route, THE Frontend_App SHALL redirect to sign-in page
5. THE Frontend_App SHALL remove all localStorage token management code

### Requirement 5: Implement Role-Based Access Control

**User Story:** As an administrator, I want user roles to be enforced, so that only authorized users can access admin features.

#### Acceptance Criteria

1. THE Backend_API SHALL store User_Role in Clerk user metadata (publicMetadata.role)
2. WHEN a new user signs up, THE Backend_API SHALL assign "customer" as default User_Role
3. THE Frontend_App SHALL read User_Role from Clerk user metadata
4. WHEN a user with role "customer" attempts to access admin routes, THE Frontend_App SHALL deny access
5. WHEN a user with role "admin" accesses admin routes, THE Frontend_App SHALL grant access
6. THE Frontend_App SHALL display role-appropriate navigation and UI elements

### Requirement 6: Replace Backend Authentication Middleware

**User Story:** As a developer, I want to validate Clerk session tokens in the backend, so that API endpoints are protected.

#### Acceptance Criteria

1. THE Backend_API SHALL replace JWT verification with Clerk session token verification
2. THE Auth_Middleware SHALL extract session token from Authorization header
3. WHEN a valid session token is provided, THE Auth_Middleware SHALL attach user data to request object
4. WHEN an invalid session token is provided, THE Auth_Middleware SHALL return 401 Unauthorized
5. WHEN no session token is provided, THE Auth_Middleware SHALL return 401 Unauthorized
6. THE Auth_Middleware SHALL verify User_Role from Clerk metadata for role-based endpoints

### Requirement 7: Implement Clerk Webhooks

**User Story:** As a developer, I want to receive user events from Clerk, so that I can synchronize user data with the application database.

#### Acceptance Criteria

1. THE Backend_API SHALL create a Clerk_Webhook endpoint at /api/webhooks/clerk
2. THE Clerk_Webhook SHALL verify webhook signatures using CLERK_WEBHOOK_SECRET
3. WHEN a user.created event is received, THE Clerk_Webhook SHALL create corresponding user record in MongoDB
4. WHEN a user.updated event is received, THE Clerk_Webhook SHALL update corresponding user record in MongoDB
5. WHEN a user.deleted event is received, THE Clerk_Webhook SHALL delete corresponding user record in MongoDB
6. WHEN webhook signature verification fails, THE Clerk_Webhook SHALL return 400 Bad Request

### Requirement 8: Migrate Existing User Data

**User Story:** As a developer, I want to migrate existing users to Clerk, so that users can continue accessing their accounts without re-registering.

#### Acceptance Criteria

1. THE Migration_Script SHALL read all users from MongoDB User collection
2. FOR EACH user with email and password, THE Migration_Script SHALL create Clerk user with same email
3. FOR EACH user with googleId, THE Migration_Script SHALL create Clerk user with Google OAuth connection
4. THE Migration_Script SHALL transfer User_Role to Clerk publicMetadata
5. THE Migration_Script SHALL transfer user name and phone to Clerk user profile
6. WHEN a user already exists in Clerk, THE Migration_Script SHALL skip that user
7. THE Migration_Script SHALL log successful and failed migrations
8. THE Migration_Script SHALL generate a migration report with statistics

### Requirement 9: Update Password Reset Flow

**User Story:** As a user, I want to reset my password using Clerk, so that I can recover my account if I forget my password.

#### Acceptance Criteria

1. THE Frontend_App SHALL remove ForgotPassword.js page
2. THE Frontend_App SHALL remove ResetPassword.js page
3. THE Frontend_App SHALL configure Clerk's password reset flow
4. WHEN a user clicks "Forgot Password", THE Frontend_App SHALL display Clerk's password reset UI
5. THE Backend_API SHALL remove forgotPassword and resetPassword controller methods
6. THE Backend_API SHALL remove password reset email sending logic

### Requirement 10: Update User Profile Management

**User Story:** As a user, I want to view and update my profile using Clerk, so that I can manage my account information.

#### Acceptance Criteria

1. THE Frontend_App SHALL use Clerk's useUser hook to access user profile data
2. THE Frontend_App SHALL display user name, email, and phone from Clerk user object
3. THE Frontend_App SHALL use Clerk's UserProfile component for profile editing
4. WHEN a user updates their profile, THE Clerk SHALL persist changes automatically
5. THE Frontend_App SHALL remove custom profile update API calls to Backend_API

### Requirement 11: Remove Legacy Authentication Code

**User Story:** As a developer, I want to remove all custom authentication code, so that the codebase is clean and maintainable.

#### Acceptance Criteria

1. THE Backend_API SHALL remove authController.js (signup, login, logout methods)
2. THE Backend_API SHALL remove passport.js configuration
3. THE Backend_API SHALL remove Google OAuth routes
4. THE Backend_API SHALL remove JWT token generation and verification code
5. THE Backend_API SHALL remove password hashing from User model
6. THE Backend_API SHALL remove resetPasswordToken and resetPasswordExpire fields from User model
7. THE Backend_API SHALL remove email sending for password reset
8. THE Frontend_App SHALL remove AuthContext.js file
9. THE Frontend_App SHALL remove custom login and signup API calls

### Requirement 12: Configure Vercel Deployment

**User Story:** As a developer, I want to deploy the Clerk-integrated application to Vercel, so that users can access the updated authentication system.

#### Acceptance Criteria

1. THE Frontend_App SHALL configure REACT_APP_CLERK_PUBLISHABLE_KEY in Vercel environment variables
2. THE Backend_API SHALL configure CLERK_SECRET_KEY in Vercel environment variables
3. THE Backend_API SHALL configure CLERK_WEBHOOK_SECRET in Vercel environment variables
4. THE Backend_API SHALL configure Clerk webhook URL in Clerk dashboard pointing to Vercel deployment
5. WHEN deployed to Vercel, THE Frontend_App SHALL successfully authenticate users with Clerk
6. WHEN deployed to Vercel, THE Backend_API SHALL successfully validate Clerk session tokens

### Requirement 13: Maintain Existing Application Features

**User Story:** As a user, I want all existing features to work after migration, so that my experience is not disrupted.

#### Acceptance Criteria

1. THE Frontend_App SHALL maintain CustomerDashboard functionality with Clerk authentication
2. THE Frontend_App SHALL maintain AdminDashboard functionality with Clerk authentication
3. THE Frontend_App SHALL maintain all loan application pages with Clerk authentication
4. THE Frontend_App SHALL maintain appointment booking with Clerk authentication
5. THE Frontend_App SHALL maintain document upload with Clerk authentication
6. THE Frontend_App SHALL maintain notification system with Clerk authentication
7. WHEN a user logs in, THE Frontend_App SHALL display user-specific data correctly

### Requirement 14: Handle Authentication State

**User Story:** As a user, I want the application to handle loading states properly, so that I see appropriate feedback during authentication.

#### Acceptance Criteria

1. WHEN Clerk is initializing, THE Frontend_App SHALL display a loading indicator
2. WHEN authentication state changes, THE Frontend_App SHALL update UI immediately
3. WHEN a user logs out, THE Frontend_App SHALL clear all user-specific data
4. WHEN a user logs out, THE Frontend_App SHALL redirect to home page
5. THE Frontend_App SHALL use Clerk's isLoaded property to determine initialization state

### Requirement 15: Update API Request Headers

**User Story:** As a developer, I want API requests to include Clerk session tokens, so that backend endpoints can authenticate requests.

#### Acceptance Criteria

1. THE Frontend_App SHALL use Clerk's getToken method to retrieve session tokens
2. THE Frontend_App SHALL include session token in Authorization header for all Protected_Endpoint requests
3. THE Frontend_App SHALL update axios configuration to automatically include Clerk tokens
4. WHEN a session token expires, THE Frontend_App SHALL request a new token from Clerk
5. WHEN token refresh fails, THE Frontend_App SHALL redirect user to sign-in page
