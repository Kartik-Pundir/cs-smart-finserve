import { useState, useEffect } from 'react';
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
  const [showPassword, setShowPassword] = useState(false);

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
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex" style={{ background: isDark ? '#111111' : '#f8f9fa', paddingTop: '80px' }}>
      
      {/* Left Side - Dark with gradient background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 1) 0%, rgba(45, 27, 46, 1) 35%, rgba(61, 26, 26, 1) 70%, rgba(192, 57, 43, 0.8) 100%)'
        }}>
        
        <div className="relative z-10 flex flex-col justify-center items-center p-10 text-white w-full">
          
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold bg-white text-gray-900">
              CS
            </div>
            <span className="text-base font-semibold">CS Smart Finserve</span>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 leading-tight">
              Welcome Back!
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Sign in to access your dashboard, track applications, and manage your loans.
            </p>
          </div>

          {/* Illustration or decorative element */}
          <div className="mt-8">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
              <circle cx="100" cy="100" r="60" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              <circle cx="100" cy="100" r="40" fill="rgba(192, 57, 43, 0.3)"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Right Side - White with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8" style={{ background: isDark ? '#1a1a1a' : 'white' }}>
        <div className="w-full max-w-md">
          
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                CS
              </div>
              <span className="text-xl font-bold" style={{ color: isDark ? 'white' : '#1a1a1a' }}>CS Smart Finserve</span>
            </Link>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2" style={{ color: isDark ? 'white' : '#1a1a1a' }}>
              Login with
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Google Login Button - Top */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-3 border-2 hover:bg-gray-50"
              style={{
                background: 'white',
                borderColor: '#dadce0',
                color: '#3c4043'
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

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                style={{
                  background: isDark ? '#111111' : '#f9fafb',
                  borderColor: isDark ? '#3a3a3a' : '#e5e7eb',
                  color: isDark ? 'white' : '#1a1a1a'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                  style={{
                    background: isDark ? '#111111' : '#f9fafb',
                    borderColor: isDark ? '#3a3a3a' : '#e5e7eb',
                    color: isDark ? 'white' : '#1a1a1a'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg hover:opacity-70 transition-opacity"
                  style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link 
                  to="/forgot-password" 
                  className="text-sm hover:underline"
                  style={{ color: '#4285F4' }}
                >
                  Forget password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              style={{
                background: '#4285F4',
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold hover:underline" style={{ color: '#4285F4' }}>
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
