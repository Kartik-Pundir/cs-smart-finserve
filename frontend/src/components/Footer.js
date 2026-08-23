import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'linear-gradient(135deg, #12203a 0%, #1a2f52 100%)' }} className="text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="bg-white rounded-xl p-3 inline-block mb-4">
              <Logo size="sm" showText={false} linkTo="/" />
            </div>
            <p className="mb-4 font-heading font-semibold text-lg mt-2" style={{ color: '#e8d9b8' }}>
              Smart Finance. Trusted Partners.
            </p>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Your trusted partner for all financial needs. We provide customized loan and insurance solutions.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4" style={{ color: '#e8d9b8' }}>Our Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home Loan', path: '/home-loan' },
                { label: 'Auto Loan', path: '/auto-loan' },
                { label: 'Personal Loan', path: '/personal-loan' },
                { label: 'Business Loan', path: '/business-loan' },
                { label: 'General Insurance', path: '/insurance' },
                { label: 'Used Car Loan', path: '/used-car-loan' },
                { label: 'Loan Against Property', path: '/loan-against-property' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => e.target.style.color = '#a8823a'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4" style={{ color: '#e8d9b8' }}>Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact Us', path: '/contact' },
                { label: 'EMI Calculator', path: '/emi-calculator' },
                { label: 'CIBIL Check', path: '/cibil-check' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                    onMouseEnter={e => e.target.style.color = '#a8823a'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button className="text-sm text-left transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => e.target.style.color = '#a8823a'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-sm text-left transition-colors duration-200" style={{ color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => e.target.style.color = '#a8823a'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4" style={{ color: '#e8d9b8' }}>Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 flex-shrink-0" style={{ color: '#a8823a' }} />
                <div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Email</p>
                  <a href="mailto:krishan.pal1986@gmail.com" className="text-white text-sm transition-colors"
                    onMouseEnter={e => e.target.style.color = '#a8823a'}
                    onMouseLeave={e => e.target.style.color = '#ffffff'}>
                    krishan.pal1986@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 flex-shrink-0" style={{ color: '#a8823a' }} />
                <div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Phone / WhatsApp</p>
                  <a href="https://wa.me/917838825521" className="text-white text-sm transition-colors"
                    onMouseEnter={e => e.target.style.color = '#a8823a'}
                    onMouseLeave={e => e.target.style.color = '#ffffff'}>
                    +91 78388 25521
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0" style={{ color: '#a8823a' }} />
                <div>
                  <p className="font-semibold mb-1 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Gurugram</p>
                  <p className="text-white text-sm mb-3">Sco 45, 2nd Floor, Vyapar Sadan<br/>Sector 14, Gurgaon, Haryana 122001</p>

                  <p className="font-semibold mb-1 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Faridabad Branch</p>
                  <p className="text-white text-sm mb-3">2546, 2nd Floor, Opp: Sagar Cinema<br/>Main Road, Sector-16, Faridabad, HR - 121002</p>

                  <p className="font-semibold mb-1 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>Delhi Branch</p>
                  <p className="text-white text-sm">
                    3A, 3B, 2nd Floor, 5/34, Pusa Road,<br/>
                    Karol Bagh, New Delhi - 110005
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              &copy; {currentYear} CS Smart Finserve Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
