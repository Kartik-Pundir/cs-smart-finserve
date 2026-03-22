import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (password !== confirm) { toast.error('Passwords do not match'); return; }

    setLoading(true);
    try {
      const res = await api.put(`/auth/reset-password/${token}`, { password });
      loginWithToken(res.data.token);
      setDone(true);
      toast.success('Password reset successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset link is invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500'];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: '#1a1a2e' }}>

      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c0392b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #e74c3c 0%, transparent 40%)' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-4 border border-white/20">

        {!done ? (
          <>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(192,57,43,0.08)' }}>
              <FaLock className="text-accent text-2xl" />
            </div>

            <h2 className="text-2xl font-heading font-bold text-center text-gray-900 mb-1">Set New Password</h2>
            <p className="text-center text-gray-500 text-sm mb-8">Choose a strong password for your account.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1.5 font-medium text-sm">New Password *</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="input-field pr-10"
                    placeholder="Min. 6 characters"
                  />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : 'text-green-600'}`}>
                      {strengthLabel[strength]}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1.5 font-medium text-sm">Confirm Password *</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  className={`input-field ${confirm && confirm !== password ? 'border-red-300 focus:ring-red-200' : ''}`}
                  placeholder="Re-enter your password"
                />
                {confirm && confirm !== password && (
                  <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 bg-accent text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.02]">
                {loading ? 'Resetting...' : 'Reset Password →'}
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl"
              style={{ background: 'rgba(22,163,74,0.1)' }}>✅</div>
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Password Reset!</h3>
            <p className="text-gray-500 text-sm">Redirecting you to your dashboard...</p>
          </motion.div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <FaArrowLeft size={11} /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
