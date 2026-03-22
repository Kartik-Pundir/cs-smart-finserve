import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { user, logout } = useAuth();
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

  const navLink = 'text-gray-600 hover:text-accent transition-colors font-medium text-sm';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-md' : 'border-b border-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-18 py-3">

          {/* LEFT — Logo */}
          <div className="flex-shrink-0 mr-10">
            <Logo size="nav" showText={false} />
          </div>

          {/* CENTER — Nav links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            <Link to="/" className={navLink}>Home</Link>

            {/* Services Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}>
              <button className={`flex items-center gap-1 ${navLink}`}>
                Services <FiChevronDown size={14} />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
                    {services.map((s) => (
                      <Link key={s.path} to={s.path}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-accent transition-colors">
                        {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className={navLink}>About Us</Link>
            <Link to="/contact" className={navLink}>Contact</Link>
            <Link to="/book-appointment" className={navLink}>Book Appointment</Link>
            <Link to="/feedback" className={navLink}>Feedback</Link>
          </div>

          {/* RIGHT — Auth */}
          <div className="hidden lg:flex items-center gap-3 ml-8 flex-shrink-0">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin"
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all"
                    style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.05)' }}>
                    ⚙ Admin Panel
                  </Link>
                )}
                <Link to="/dashboard"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-700 hover:border-accent hover:text-accent transition-all">
                  My Dashboard
                </Link>
                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                <button onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-accent transition-colors font-medium border border-gray-200 rounded-lg hover:border-accent">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:border-accent hover:text-accent transition-all">
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
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden ml-auto p-2 rounded-lg text-gray-700">
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-2">
              <Link to="/" className="block py-2 text-sm text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <div>
                <button onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-sm text-gray-700 font-medium">
                  Services <FiChevronDown size={14} />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {services.map((s) => (
                      <Link key={s.path} to={s.path}
                        className="block py-1.5 text-sm text-gray-500 hover:text-accent"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/about" className="block py-2 text-sm text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="block py-2 text-sm text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/book-appointment" className="block py-2 text-sm text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Book Appointment</Link>
              <Link to="/feedback" className="block py-2 text-sm text-gray-700 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin"
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg"
                        style={{ color: '#c0392b', background: 'rgba(192,57,43,0.08)' }}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        ⚙ Admin Panel
                      </Link>
                    )}
                    <Link to="/dashboard"
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 text-gray-700"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      My Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="px-4 py-2 text-sm text-gray-700 font-medium">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg"
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
