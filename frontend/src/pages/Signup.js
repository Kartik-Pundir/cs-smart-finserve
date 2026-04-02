import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaFileAlt, FaCalculator, FaGift, FaLock, FaHeadset, FaChartLine, FaStar } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const benefits = [
    { icon: <FaFileAlt />, title: 'Track Applications', desc: 'Real-time status of every loan you apply for' },
    { icon: <FaCalculator />, title: 'Saved EMI Calculations', desc: 'Compare multiple EMI scenarios side by side' },
    { icon: <FaGift />, title: 'Personalised Offers', desc: 'Loan offers matched to your profile and needs' },
    { icon: <FaLock />, title: 'Secure Document Vault', desc: 'Upload once, reuse across all applications' },
    { icon: <FaHeadset />, title: 'Priority Support', desc: 'Direct access to our relationship managers' },
    { icon: <FaChartLine />, title: 'CIBIL Score History', desc: 'Track your credit score and get tips to improve' },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await register(formData.fullName, formData.email, formData.password, formData.phone);
    
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Sign up failed');
    }
    
    setLoading(false);
  };

  const handleGoogleSignUp = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex" style={{ background: isDark ? '#111111' : '#f8f9fa', paddingTop: '80px' }}>
      
      {/* Left Side - Dark with gradient background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ 
          background: isDark 
            ? 'linear-gradient(135deg, rgba(26, 26, 46, 1) 0%, rgba(45, 27, 46, 1) 35%, rgba(61, 26, 26, 1) 70%, rgba(192, 57, 43, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(26, 26, 46, 1) 0%, rgba(45, 27, 46, 1) 35%, rgba(61, 26, 26, 1) 70%, rgba(192, 57, 43, 0.8) 100%)'
        }}>
        
        <div className="relative z-10 flex flex-col p-10 text-white w-full">
          
          {/* Logo and Company Name */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold bg-white text-gray-900">
              CS
            </div>
            <span className="text-base font-semibold">CS Smart Finserve</span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              Your financial journey<br />starts here.
            </h1>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
              Join thousands of customers who trust us for home loans, car loans, business loans and more — all in one place.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(192, 57, 43, 0.25)' }}>
                  <span className="text-red-400 text-sm">{benefit.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-xs mb-0.5">{benefit.title}</h3>
                  <p className="text-gray-400 text-xs leading-snug">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Testimonial at Bottom */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} 
                  className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center text-xs font-bold"
                  style={{ background: `hsl(${i * 60}, 70%, 60%)` }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={10} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-gray-300">10,000+ happy customers</p>
            </div>
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
            <h2 className="text-2xl font-bold mb-1" style={{ color: isDark ? 'white' : '#1a1a1a' }}>
              Create your account
            </h2>
            <p className="text-sm" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              Free forever. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg transition-all font-medium text-sm"
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
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: isDark ? '#3a3a3a' : '#d1d5db' }}></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 text-xs" style={{ 
                  background: isDark ? '#1a1a1a' : 'white',
                  color: isDark ? '#6b7280' : '#9ca3af'
                }}>or sign up with email</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Rahul Sharma"
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                style={{
                  background: isDark ? '#111111' : 'white',
                  borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                  color: isDark ? 'white' : '#1a1a1a'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                style={{
                  background: isDark ? '#111111' : 'white',
                  borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                  color: isDark ? 'white' : '#1a1a1a'
                }}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                style={{
                  background: isDark ? '#111111' : 'white',
                  borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                  color: isDark ? 'white' : '#1a1a1a'
                }}
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  style={{
                    background: isDark ? '#111111' : 'white',
                    borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                    color: isDark ? 'white' : '#1a1a1a'
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  style={{
                    background: isDark ? '#111111' : 'white',
                    borderColor: isDark ? '#3a3a3a' : '#d1d5db',
                    color: isDark ? 'white' : '#1a1a1a'
                  }}
                />
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold text-white text-sm transition-all hover:shadow-lg disabled:opacity-50"
              style={{ background: 'linear-gradient(to right, #c0392b, #e74c3c)' }}
            >
              {loading ? 'Creating Account...' : 'Create Free Account →'}
            </button>

            {/* Login Link */}
            <p className="text-center text-xs" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: '#c0392b' }}>
                Log in
              </Link>
            </p>
          </form>

          {/* Security Note */}
          <p className="text-center text-xs mt-4" style={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
            🔒 Your data is encrypted and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
