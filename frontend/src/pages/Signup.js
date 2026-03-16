import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaShieldAlt, FaBell, FaFileAlt, FaCalculator, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const benefits = [
  { icon: <FaFileAlt className="text-accent text-xl" />, title: 'Track Your Applications', desc: 'See real-time status of every loan application you submit.' },
  { icon: <FaCalculator className="text-accent text-xl" />, title: 'Saved EMI Calculations', desc: 'Save and compare multiple EMI scenarios for different loan types.' },
  { icon: <FaBell className="text-accent text-xl" />, title: 'Personalised Offers', desc: 'Get loan and insurance offers matched to your profile and needs.' },
  { icon: <FaShieldAlt className="text-accent text-xl" />, title: 'Secure Document Vault', desc: 'Upload documents once and reuse them across multiple applications.' },
  { icon: <FaStar className="text-accent text-xl" />, title: 'Priority Support', desc: 'Registered users get faster response from our relationship managers.' },
  { icon: <FaCheckCircle className="text-accent text-xl" />, title: 'CIBIL Score History', desc: 'Track your credit score over time and get tips to improve it.' },
];

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signup(formData);
      toast.success('Account created successfully! Welcome to CS Smart Finserve.');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: '#faf8ff' }}>

      {/* Hero strip */}
      <div className="py-10 text-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #c0392b 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Create Your Free Account</h1>
          <p className="text-white/80 text-base">Join 10,000+ customers who trust CS Smart Finserve for their financial needs.</p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — Benefits */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">What you get with a free account</h2>
          <p className="text-gray-500 text-sm mb-8">Sign up once. Access everything — for free, forever.</p>
          <div className="space-y-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
                className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(192,57,43,0.08)' }}>
                  {b.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Create Account — It's Free</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Rahul Sharma' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '10-digit mobile number', pattern: '[0-9]{10}' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Minimum 6 characters', minLength: '6' },
                { label: 'Confirm Password', key: 'confirmPassword', type: 'password', placeholder: 'Re-enter password' },
              ].map(({ label, key, type, placeholder, pattern, minLength }) => (
                <div key={key}>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">{label} *</label>
                  <input
                    type={type}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    required
                    placeholder={placeholder}
                    pattern={pattern}
                    minLength={minLength}
                    className="input-field"
                  />
                </div>
              ))}

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-accent text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.02]">
                {loading ? 'Creating Account...' : 'Create Free Account →'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Button */}
            <a
              href="http://localhost:5001/api/auth/google"
              className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Continue with Google
            </a>

            <p className="text-center mt-5 text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline font-semibold">Login here</Link>
            </p>

            <p className="text-center mt-4 text-xs text-gray-400">
              By signing up, you agree to our Terms & Conditions and Privacy Policy. Your data is 100% secure.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Signup;
