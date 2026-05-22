import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div>
            <div className="bg-white rounded-xl p-3 inline-block mb-4">
              <Logo size="sm" showText={false} linkTo="/" />
            </div>
            <p className="text-gray-300 mb-4 font-heading font-semibold text-lg mt-2">
              Smart Finance. Trusted Partners.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted partner for all financial needs. We provide customized loan and insurance solutions.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/home-loan" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Home Loan
                </Link>
              </li>
              <li>
                <Link to="/auto-loan" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Auto Loan
                </Link>
              </li>
              <li>
                <Link to="/personal-loan" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Personal Loan
                </Link>
              </li>
              <li>
                <Link to="/business-loan" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Business Loan
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-gray-400 hover:text-sky-400 transition-colors">
                  General Insurance
                </Link>
              </li>
              <li>
                <Link to="/used-car-loan" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Used Car Loan
                </Link>
              </li>
              <li>
                <Link to="/loan-against-property" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Loan Against Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-sky-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-sky-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/emi-calculator" className="text-gray-400 hover:text-sky-400 transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/cibil-check" className="text-gray-400 hover:text-sky-400 transition-colors">
                  CIBIL Check
                </Link>
              </li>
              <li>
                <button className="text-gray-400 hover:text-sky-400 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-sky-400 transition-colors text-left">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-sky-400" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:kartikpundir231@gmail.com" className="text-white hover:text-sky-400">
                    kartikpundir231@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-3 text-sky-400" />
                <div>
                  <p className="text-gray-400">Phone / WhatsApp</p>
                  <a href="https://wa.me/919267953513" className="text-white hover:text-sky-400">
                    +91 92679 53513
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-sky-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 font-semibold mb-1">Gurugram (Head Office)</p>
                  <p className="text-white text-sm mb-3">Sco- 45, 2nd Floor, Vyapar Sadan<br/>Sector-14, Gurgaon-122001</p>
                  
                  <p className="text-gray-400 font-semibold mb-1">Faridabad Branch</p>
                  <p className="text-white text-sm mb-3">2546, 2nd Floor, Opp: Sagar Cinema<br/>Main Road, Sector-16, Faridabad, HR - 121002</p>

                  <p className="text-gray-400 font-semibold mb-1">Delhi Branch</p>
                  <p className="text-white text-sm">Karol Bagh, New Delhi</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} CS Smart Finserve Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
