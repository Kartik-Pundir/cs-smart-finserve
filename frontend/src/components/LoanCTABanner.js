import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

/* Sticky bottom CTA bar — appears after user scrolls 400px on loan pages */
const LoanCTABanner = ({ loanType = 'Loan' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-0 left-0 right-0 z-40 shadow-2xl"
          style={{ background: 'linear-gradient(90deg, #1a1a2e 0%, #c0392b 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
              🎯 Ready to apply for a <span className="text-yellow-300">{loanType}</span>? Get the best rate in 60 seconds.
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://wa.me/919267953513?text=Hi%2C%20I%20want%20to%20apply%20for%20a%20loan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-all"
              >
                <FaWhatsapp className="text-lg" /> WhatsApp Us
              </a>
              <a
                href="#apply"
                className="flex items-center gap-2 px-4 py-2 bg-white text-accent rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              >
                Apply Now →
              </a>
              <a
                href="tel:+919267953513"
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-all"
              >
                <FaPhone />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoanCTABanner;
