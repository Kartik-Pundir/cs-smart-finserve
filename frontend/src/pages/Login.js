import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/dashboard');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
    } else {
      toast.error(result.message || 'Login failed');
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden" 
      style={{ 
        background: isDark ? '#111111' : '#f8f9fa',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}
    >
      
      {/* Decorative Elements - Left Side */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2" style={{ width: '300px' }}>
        {/* Document illustration */}
        <div className="absolute" style={{ top: '-80px', left: '60px' }}>
          <div className="relative">
            <div 
              className="w-24 h-32 rounded-lg border-4 transform -rotate-12"
              style={{ 
                background: isDark ? '#1e1e1e' : 'white',
                borderColor: '#c0392b',
                boxShadow: '4px 4px 0px rgba(192, 57, 43, 0.2)' 
              }}
            >
              <div className="p-3 space-y-2">
                <div className="h-2 rounded w-3/4" style={{ background: '#e74c3c' }}></div>
                <div className="h-2 rounded w-full" style={{ background: '#e74c3c' }}></div>
                <div className="h-2 rounded w-2/3" style={{ background: '#e74c3c' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract squiggle line */}
        <svg className="absolute" style={{ top: '20px', left: '40px', width: '120px', height: '80px' }}>
          <path d="M10,40 Q30,20 50,40 T90,40" stroke="#c0392b" strokeWidth="2" fill="none" opacity="0.5"/>
        </svg>

        {/* Dotted shape */}
        <div 
          className="absolute rounded-3xl transform rotate-12"
          style={{ 
            top: '100px', 
            left: '80px',
            width: '100px', 
            height: '120px',
            background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
            backgroundImage: isDark 
              ? 'radial-gradient(circle, rgba(0,0,0,0.3) 2px, transparent 2px)'
              : 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
            backgroundSize: '15px 15px'
          }}
        />

        {/* Small circle */}
        <div 
          className="absolute rounded-full border-3"
          style={{ 
            top: '-20px', 
            left: '180px', 
            width: '40px', 
            height: '40px', 
            borderColor: '#c0392b', 
            borderWidth: '3px' 
          }}
        />
      </div>

      {/* Decorative Elements - Right Side */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2" style={{ width: '300px' }}>
        {/* Person illustration */}
        <div className="absolute" style={{ top: '-60px', right: '100px' }}>
          <svg width="100" height="120" viewBox="0 0 100 120">
            {/* Simple person sitting */}
            <ellipse cx="50" cy="30" rx="20" ry="25" fill="#c0392b"/>
            <rect x="35" y="50" width="30" height="40" rx="5" fill="#e74c3c"/>
            <rect x="30" y="85" width="15" height="30" rx="3" fill="#c0392b"/>
            <rect x="55" y="85" width="15" height="30" rx="3" fill="#c0392b"/>
          </svg>
        </div>

        {/* Document with lines */}
        <div className="absolute" style={{ top: '40px', right: '60px' }}>
          <div 
            className="w-20 h-24 rounded-lg border-4 transform rotate-6"
            style={{ 
              background: isDark ? '#1e1e1e' : 'white',
              borderColor: '#e74c3c',
              boxShadow: '4px 4px 0px rgba(231, 76, 60, 0.2)' 
            }}
          >
            <div className="p-2 space-y-1.5">
              <div className="h-1.5 rounded" style={{ background: '#c0392b' }}></div>
              <div className="h-1.5 rounded" style={{ background: '#c0392b' }}></div>
              <div className="h-1.5 rounded w-3/4" style={{ background: '#c0392b' }}></div>
            </div>
          </div>
        </div>

        {/* Dotted shape */}
        <div 
          className="absolute rounded-3xl transform -rotate-12"
          style={{ 
            bottom: '20px', 
            right: '120px',
            width: '90px', 
            height: '110px',
            background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
            backgroundImage: isDark 
              ? 'radial-gradient(circle, rgba(0,0,0,0.3) 2px, transparent 2px)'
              : 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
            backgroundSize: '15px 15px'
          }}
        />

        {/* Abstract squiggle */}
        <svg className="absolute" style={{ bottom: '80px', right: '40px', width: '100px', height: '60px' }}>
          <path d="M10,30 Q30,10 50,30 T90,30" stroke="#e74c3c" strokeWidth="2" fill="none" opacity="0.5"/>
        </svg>

        {/* Small rectangle */}
        <div 
          className="absolute border-3 transform rotate-45"
          style={{ 
            bottom: '10px', 
            right: '200px', 
            width: '35px', 
            height: '35px', 
            borderColor: '#c0392b', 
            borderWidth: '3px' 
          }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div 
          className="rounded-3xl shadow-lg p-10 border-4"
          style={{
            background: isDark ? '#1e1e1e' : 'white',
            borderColor: isDark ? '#3a3a3a' : '#c0392b',
            boxShadow: '8px 8px 0px rgba(192, 57, 43, 0.15)',
          }}
        >
          
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: isDark ? 'white' : '#1a1a1a' }}>
              Login
            </h2>
            <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              Hey, Enter your details to get sign in<br />to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email / Phone No"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-500 transition-all"
                style={{
                  background: isDark ? '#111111' : '#f9fafb',
                  borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                  color: isDark ? 'white' : '#1a1a1a'
                }}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Passcode"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-red-500 transition-all"
                style={{
                  background: isDark ? '#111111' : '#f9fafb',
                  borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                  color: isDark ? 'white' : '#1a1a1a'
                }}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <Link 
                to="/forgot-password" 
                className="text-sm hover:underline"
                style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
              >
                Having trouble in sign in?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: isDark ? '#3a3a3a' : '#d1d5db' }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-4" 
                  style={{ 
                    background: isDark ? '#1e1e1e' : 'white',
                    color: isDark ? '#6b7280' : '#9ca3af'
                  }}
                >
                  Or Sign in with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 border-2"
              style={{
                background: isDark ? '#111111' : 'white',
                borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                color: isDark ? 'white' : '#374151'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4"/>
                <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold hover:underline" style={{ color: '#c0392b' }}>
              Request Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
