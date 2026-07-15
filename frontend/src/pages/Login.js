import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaFileAlt, FaCheckCircle, FaChartLine, FaShieldAlt } from 'react-icons/fa';

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
    const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001/api').trim();
    const baseApiUrl = apiUrl.replace(/\/+$/, ''); // remove trailing slash
    const cleanApiUrl = baseApiUrl.endsWith('/api') ? baseApiUrl : `${baseApiUrl}/api`;
    const finalApiUrl = cleanApiUrl.replace(/\/api\/api$/, '/api'); // avoid duplicate /api/api
    window.location.href = `${finalApiUrl}/auth/google`;
  };


  return (
    <div className="min-h-screen flex" style={{ background: isDark ? '#111111' : '#f8f9fa', paddingTop: '80px' }}>
      
      {/* Left Side - Dark with gradient background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 text-white"
        style={{ 
          background: 'linear-gradient(135deg, rgba(17, 17, 28, 1) 0%, rgba(28, 17, 28, 1) 35%, rgba(46, 20, 20, 1) 70%, rgba(192, 57, 43, 0.95) 100%)'
        }}>
        
        {/* Animated background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full filter blur-[120px] opacity-30 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(192, 57, 43, 0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full filter blur-[120px] opacity-40 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(26, 26, 46, 1) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full filter blur-[100px] opacity-20 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(192, 57, 43, 0.5) 0%, transparent 70%)' }} />

        {/* Logo and Company Name */}
        <div className="relative z-10 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold bg-white text-gray-900 shadow-lg shadow-black/10 transition-transform duration-300 group-hover:scale-105">
              CS
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight block">CS Smart Finserve</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Smart Finance Solutions</span>
            </div>
          </Link>
        </div>

        {/* Center Content: Main Heading & Features Mock */}
        <div className="relative z-10 my-auto flex flex-col items-center w-full">
          {/* Main Heading */}
          <div className="text-center mb-10 max-w-md">
            <h1 className="text-4xl font-extrabold mb-4 leading-tight tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sign in to access your dashboard, track applications, and manage your loans with smart, real-time analytics.
            </p>
          </div>

          {/* Premium Glassmorphic Mock Card */}
          <div className="w-full max-w-sm p-6 transition-all duration-500 hover:scale-[1.02] border"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              borderImage: 'linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.02)) 1',
              borderRadius: '24px',
              borderStyle: 'solid',
              borderWidth: '1px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}>
            
            {/* Mock Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Tracker
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Verified
              </span>
            </div>

            {/* Application Mock */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="flex items-center gap-2 text-white">
                    <FaFileAlt className="text-red-400" /> Home Loan Status
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <FaCheckCircle /> 80%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2">
                  <span>ID: #CS-89240</span>
                  <span>Est. Approval: 24h</span>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                  <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <FaChartLine className="text-emerald-400" /> Best Rate
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    8.40% <span className="text-[10px] font-normal text-emerald-400">p.a.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                  <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <FaShieldAlt className="text-red-400" /> Security
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    AES-256
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info/details */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-gray-400 border-t border-white/10 pt-6">
          <span>© 2026 CS Smart Finserve</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Support</span>
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
