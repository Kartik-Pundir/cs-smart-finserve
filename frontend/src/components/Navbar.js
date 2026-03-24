import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Home Loan', path: '/home-loan' },
    { name: 'Auto Loan', path: '/auto-loan' },
    { name: 'Personal Loan', path: '/personal-loan' },
    { name: 'Business Loan', path: '/business-loan' },
    { name: 'General Insurance', path: '/insurance' },
    { name: 'Used Car Loan', path: '/used-car-loan' },
    { name: 'Loan Against Property', path: '/loan-against-property' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLink = 'hover:text-accent transition-colors font-medium text-sm';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
      style={{ background: 'var(--nav-bg)', borderBottom: '1px solid var(--nav-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-18 py-3">

          {/* LEFT — Logo */}
          <div className="flex-shrink-0 mr-10">
            <Logo size="nav" showText={false} />
          </div>

          {/* CENTER — Nav links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            <Link to="/" className={navLink} style={{ color: 'var(--nav-text)' }}>Home</Link>

            {/* Services Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}>
              <button className={`flex items-center gap-1 ${navLink}`} style={{ color: 'var(--nav-text)' }}>
                Services <FiChevronDown size={14} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-xl shadow-xl py-2"
                    style={{ background: 'var(--dropdown-bg)', border: '1px solid var(--dropdown-border)' }}>
                    {services.map((s) => (
                      <Link key={s.path} to={s.path}
                        className="block px-4 py-2.5 text-sm transition-colors hover:text-accent"
                        style={{ color: 'var(--dropdown-text)' }}>
                        {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className={navLink} style={{ color: 'var(--nav-text)' }}>About Us</Link>
            <Link to="/contact" className={navLink} style={{ color: 'var(--nav-text)' }}>Contact</Link>
            <Link to="/book-appointment" className={navLink} style={{ color: 'var(--nav-text)' }}>Book Appointment</Link>
            <Link to="/feedback" className={navLink} style={{ color: 'var(--nav-text)' }}>Feedback</Link>
          </div>

          {/* RIGHT — Theme toggle + Auth */}
          <div className="hidden lg:flex items-center gap-3 ml-8 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'var(--bg-alt)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin"
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
                    style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.08)' }}>
                    ⚙ Admin Panel
                  </Link>
                )}
                <Link to="/dashboard"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:text-accent"
                  style={{ color: 'var(--nav-text)', borderColor: 'var(--border)' }}>
                  My Dashboard
                </Link>
                <span className="text-sm font-medium" style={{ color: 'var(--nav-text)' }}>{user.name}</span>
                <button onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium border rounded-lg transition-all hover:text-accent"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg border transition-all hover:text-accent"
                  style={{ color: 'var(--nav-text)', borderColor: 'var(--border)' }}>
                  Log in
                </Link>
                <Link to="/signup"
                  className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden ml-auto flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg" style={{ color: 'var(--nav-text)' }}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t"
            style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}>
            <div className="px-4 py-4 space-y-2">
              <Link to="/" className="block py-2 text-sm font-medium" style={{ color: 'var(--nav-text)' }} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <div>
                <button onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-sm font-medium" style={{ color: 'var(--nav-text)' }}>
                  Services <FiChevronDown size={14} />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {services.map((s) => (
                      <Link key={s.path} to={s.path}
                        className="block py-1.5 text-sm hover:text-accent"
                        style={{ color: 'var(--dropdown-text)' }}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/about" className="block py-2 text-sm font-medium" style={{ color: 'var(--nav-text)' }} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="block py-2 text-sm font-medium" style={{ color: 'var(--nav-text)' }} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/book-appointment" className="block py-2 text-sm font-medium" style={{ color: 'var(--nav-text)' }} onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</Link>
              <Link to="/feedback" className="block py-2 text-sm font-medium" style={{ color: 'var(--nav-text)' }} onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link>

              <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin"
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg"
                        style={{ color: '#c0392b', background: 'rgba(192,57,43,0.1)' }}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        ⚙ Admin Panel
                      </Link>
                    )}
                    <Link to="/dashboard"
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border"
                      style={{ color: 'var(--nav-text)', borderColor: 'var(--border)' }}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      My Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="px-4 py-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login"
                      className="px-4 py-2 text-sm font-medium rounded-lg border"
                      style={{ color: 'var(--nav-text)', borderColor: 'var(--border)' }}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Log in
                    </Link>
                    <Link to="/signup"
                      className="px-4 py-2 text-sm font-semibold text-white rounded-lg"
                      style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
