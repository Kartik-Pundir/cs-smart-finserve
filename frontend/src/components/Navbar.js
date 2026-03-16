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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
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
    { name: 'Loan Against Property', path: '/loan-against-property' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo size="nav" showText={false} />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-accent transition-colors font-medium"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-accent transition-colors font-medium">
                Services <FiChevronDown className="ml-1" />
              </button>
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 border border-gray-100"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-cream hover:text-accent transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/about"
              className="text-gray-700 hover:text-accent transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-accent transition-colors font-medium"
            >
              Contact
            </Link>
            <Link to="/feedback" className="text-gray-700 hover:text-accent transition-colors font-medium">
              Feedback
            </Link>
            <Link to="/book-appointment"
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white transition-all hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
              Book Appointment
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin"
                    className="px-4 py-2 text-sm font-semibold rounded-lg border transition-all"
                    style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.05)' }}>
                    ⚙ Admin Panel
                  </Link>
                )}
                <span className="text-gray-700 font-medium">{user.name}</span>
                <button onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-accent transition-colors font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-accent transition-colors font-medium flex items-center gap-1"
                >
                  🔒 Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-1"
                >
                  👤 Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700"
          >
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
            className="lg:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                className="block py-2 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-gray-700 dark:text-gray-300"
                >
                  Services <FiChevronDown />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block py-1 text-gray-600 dark:text-gray-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/about"
                className="block py-2 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link to="/feedback" className="block py-2 text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link>
              <Link to="/book-appointment"
                className="block py-2 px-4 text-white text-center rounded-lg font-semibold"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}
                onClick={() => setIsMobileMenuOpen(false)}>
                Book Appointment
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin"
                        className="px-4 py-2 text-sm font-semibold rounded-lg"
                        style={{ color: '#c0392b', background: 'rgba(192,57,43,0.08)' }}
                        onClick={() => setIsMobileMenuOpen(false)}>
                        ⚙ Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      className="px-4 py-2 text-gray-700 font-medium">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-accent font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-accent text-white rounded-lg font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
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
