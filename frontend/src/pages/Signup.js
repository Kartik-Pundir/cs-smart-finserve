import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaShieldAlt, FaBell, FaFileAlt, FaCalculator, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const benefits = [
  { icon: <FaFileAlt />, title: 'Track Applications', desc: 'Real-time status of every loan you apply for.' },
  { icon: <FaCalculator />, title: 'Saved EMI Calculations', desc: 'Compare multiple EMI scenarios side by side.' },
  { icon: <FaBell />, title: 'Personalised Offers', desc: 'Loan offers matched to your profile and needs.' },
  { icon: <FaShieldAlt />, title: 'Secure Document Vault', desc: 'Upload once, reuse across all applications.' },
  { icon: <FaStar />, title: 'Priority Support', desc: 'Faster response from our relationship managers.' },
  { icon: <FaCheckCircle />, title: 'CIBIL Score History', desc: 'Track your credit score and get tips to improve.' },
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

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
      toast.success('Welcome to CS Smart Finserve!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: '#faf8ff' }}>

      {/* Full-page two-column layout */}
      <div className="min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT — Brand panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #1a1a2e 0%, #2d1b1b 50%, #c0392b 100%)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: '#e74c3c' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: '#c0392b' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: '#ff6b6b' }} />

          {/* Top — Logo area */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">CS</span>
              </div>
              <span className="text-white font-bold text-lg">CS Smart Finserve</span>
            </div>

            <h2 className="text-4xl font-heading font-bold text-white leading-tight mb-4">
              Your financial journey<br />starts here.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Join thousands of customers who trust us for home loans, car loans, business loans and more — all in one place.
            </p>
          </div>

          {/* Middle — Benefits */}
          <div className="relative z-10 space-y-4 my-8">
            {benefits.map((b, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-accent text-sm"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  {b.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{b.title}</p>
                  <p className="text-white/50 text-xs">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom — Trust badge */}
          <div className="relative z-10 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10">
            <div className="flex -space-x-2">
              {['👨‍💼','👩‍💼','👨‍🔧','👩‍💻'].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm border-2 border-white/10">{e}</div>
              ))}
            </div>
            <div>
              <p className="text-white text-xs font-semibold">10,000+ happy customers</p>
              <div className="flex gap-0.5 mt-0.5">
                {[1,2,3,4,5].map(s => <FaStar key={s} size={10} className="text-yellow-400" />)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center p-6 lg:p-12"
        >
          <div className="w-full max-w-md">

            {/* Mobile header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-2xl font-heading font-bold text-gray-900">Create Free Account</h1>
              <p className="text-gray-500 text-sm mt-1">Join CS Smart Finserve today</p>
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900">Create your account</h2>
              <p className="text-gray-500 text-sm mt-1">Free forever. No credit card required.</p>
            </div>

            {/* Google Button — top */}
            <a href="http://localhost:5001/api/auth/google"
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all mb-5">
              <GoogleIcon />
              Continue with Google
            </a>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">Full Name *</label>
                  <input type="text" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required placeholder="Rahul Sharma" className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">Email Address *</label>
                  <input type="email" value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required placeholder="you@example.com" className="input-field" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">Phone Number *</label>
                  <input type="tel" value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required pattern="[0-9]{10}" placeholder="10-digit mobile number" className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">Password *</label>
                  <input type="password" value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required minLength="6" placeholder="Min. 6 characters" className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">Confirm Password *</label>
                  <input type="password" value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required placeholder="Re-enter password" className="input-field" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.01] mt-2"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                {loading ? 'Creating Account...' : 'Create Free Account →'}
              </button>
            </form>

            <p className="text-center mt-5 text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline font-semibold">Log in</Link>
            </p>

            <p className="text-center mt-4 text-xs text-gray-400">
              🔒 Your data is encrypted and never shared with third parties.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
