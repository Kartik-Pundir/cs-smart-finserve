import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  // Pre-filled message with all loan options
  const message = encodeURIComponent(
    `Hello CS Smart Finserve! 👋

I'm interested in learning more about your loan services.

Please help me with information about:

🏠 Home Loan - Up to ₹5 Cr, 30 years tenure
🚗 Car Loan - New & Used, 100% financing
💼 Business Loan - Working capital & term loans
💰 Personal Loan - No collateral, instant approval
🏢 Loan Against Property - High-value loans
🚙 Used Car Loan - Pre-owned vehicles
🏦 Insurance - Car, Health, Home coverage

I would like to discuss my requirements.

Thank you!`
  );

  // Detect if user is on mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Use api.whatsapp.com for desktop (opens WhatsApp Web)
  // Use wa.me for mobile (opens WhatsApp App)
  const whatsappUrl = isMobile 
    ? `https://wa.me/919267953513?text=${message}`
    : `https://web.whatsapp.com/send?phone=919267953513&text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
    >
      <FaWhatsapp className="text-white text-3xl" />
    </motion.a>
  );
};

export default WhatsAppButton;
