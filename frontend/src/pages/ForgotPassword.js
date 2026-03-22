import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import api from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: '#1a1a2e' }}>

      {/* subtle bg pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c0392b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #e74c3c 0%, transparent 40%)' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-4 border border-white/20">

        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(192,57,43,0.08)' }}>
              <FaEnvelope className="text-accent text-2xl" />
            </div>

            <h2 className="text-2xl font-heading font-bold text-center text-gray-900 mb-1">Forgot Password?</h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              No worries. Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1.5 font-medium text-sm">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-accent text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.02]">
                {loading ? 'Sending...' : 'Send Reset Link →'}
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl"
              style={{ background: 'rgba(192,57,43,0.08)' }}>📧</div>
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Check your inbox</h3>
            <p className="text-gray-500 text-sm mb-1">We've sent a password reset link to</p>
            <p className="font-semibold text-gray-800 mb-5">{email}</p>
            <p className="text-gray-400 text-xs mb-6">
              The link expires in 1 hour. Check your spam folder if you don't see it.
            </p>
            <button onClick={() => setSent(false)}
              className="text-sm text-accent hover:underline font-medium">
              Try a different email
            </button>
          </motion.div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <FaArrowLeft size={11} /> Back to Login
          </Link>
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="relative z-10 mt-6 text-xs text-white/40 text-center max-w-sm mx-4">
        🔒 Reset links are single-use and expire after 1 hour.
      </motion.p>
    </div>
  );
};

export default ForgotPassword;
