import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// ── Canvas Boids (flocking birds) ──────────────────────────
const NUM_BIRDS = 120;

function createBird(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.4 + Math.random() * 0.5;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 3 + Math.random() * 3,
  };
}

function BirdsCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const birds = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      birds.current = Array.from({ length: NUM_BIRDS }, () =>
        createBird(canvas.width, canvas.height)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onTouch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse.current = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouch, { passive: true });

    const VISUAL_RANGE = 75;
    const AVOID_RANGE = 25;
    const MOUSE_RANGE = 90;

    const tick = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const bs = birds.current;
      for (let i = 0; i < bs.length; i++) {
        const b = bs[i];
        let avgVx = 0, avgVy = 0, avgX = 0, avgY = 0;
        let avoidX = 0, avoidY = 0, neighbors = 0;

        for (let j = 0; j < bs.length; j++) {
          if (i === j) continue;
          const dx = bs[j].x - b.x, dy = bs[j].y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < VISUAL_RANGE) {
            avgVx += bs[j].vx; avgVy += bs[j].vy;
            avgX += bs[j].x; avgY += bs[j].y;
            neighbors++;
            if (d < AVOID_RANGE) { avoidX -= dx; avoidY -= dy; }
          }
        }

        if (neighbors > 0) {
          b.vx += (avgVx / neighbors - b.vx) * 0.02;
          b.vy += (avgVy / neighbors - b.vy) * 0.02;
          b.vx += (avgX / neighbors - b.x) * 0.005;
          b.vy += (avgY / neighbors - b.y) * 0.005;
        }
        b.vx += avoidX * 0.05;
        b.vy += avoidY * 0.05;

        // Mouse repulsion
        const mdx = b.x - mouse.current.x, mdy = b.y - mouse.current.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_RANGE) {
          b.vx += (mdx / md) * 1.0;
          b.vy += (mdy / md) * 1.0;
        }

        // Speed limit
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (spd > 1.2) { b.vx = (b.vx / spd) * 1.2; b.vy = (b.vy / spd) * 1.2; }
        if (spd < 0.3) { b.vx = (b.vx / spd) * 0.3; b.vy = (b.vy / spd) * 0.3; }

        b.x += b.vx; b.y += b.vy;
        if (b.x < 0) b.x = W; if (b.x > W) b.x = 0;
        if (b.y < 0) b.y = H; if (b.y > H) b.y = 0;

        // Draw bird as small chevron
        const angle = Math.atan2(b.vy, b.vx);
        const s = b.size;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(s * 2, 0);
        ctx.lineTo(-s, -s * 0.8);
        ctx.lineTo(-s * 0.4, 0);
        ctx.lineTo(-s, s * 0.8);
        ctx.closePath();
        // Color gradient from red to pink based on position
        const hue = 0 + (b.x / W) * 20;
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.75)`;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

// ── Login Page ─────────────────────────────────────────────
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: '#1a1a2e' }}>

      {/* Birds canvas background */}
      <BirdsCanvas />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-4 border border-white/20"
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(192,57,43,0.08)' }}>
          <FaLock className="text-accent text-2xl" />
        </div>

        <h2 className="text-2xl font-heading font-bold text-center text-gray-900 mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-8">Log in to track your applications and access your account.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1.5 font-medium text-sm">Email Address *</label>
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required className="input-field" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1.5 font-medium text-sm">Password *</label>
            <input type="password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required className="input-field" placeholder="Enter your password" />
            <div className="text-right mt-1.5">
              <Link to="/forgot-password" className="text-xs text-accent hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-accent text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.02]">
            {loading ? 'Logging in...' : 'Login to My Account →'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <a href="http://localhost:5001/api/auth/google"
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Continue with Google
        </a>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent hover:underline font-semibold">Sign up free</Link>
        </p>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="relative z-10 mt-6 text-xs text-white/40 text-center max-w-sm mx-4">
        🔒 Your data is encrypted and never shared with third parties.
      </motion.p>
    </div>
  );
};

export default Login;
