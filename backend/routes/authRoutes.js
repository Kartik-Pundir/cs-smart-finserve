const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  register,
  login,
  getMe,
  googleAuthSuccess,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Regular auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    session: false 
  }),
  googleAuthSuccess
);

module.exports = router;
