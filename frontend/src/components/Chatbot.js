import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaUser, FaHeadset, FaComments } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hello! 👋 I'm your CS Smart Finserve assistant. How can I help you today?", [
          'Home Loan',
          'Car Loan',
          'Personal Loan',
          'Business Loan',
          'Check CIBIL Score',
          'EMI Calculator'
        ]);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text, quickReplies = []) => {
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text, 
      quickReplies,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { 
      type: 'user', 
      text,
      timestamp: new Date()
    }]);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Callback Request
    if (input.includes('request callback') || input.includes('callback') || input === 'get callback') {
      return {
        text: "📞 Request a Callback\n\nI'll connect you with our loan expert. Please share your details:\n\n• Name\n• Phone Number\n• Preferred Time\n• Loan Type\n\nOr you can directly call us at +91 92679 53513\n\nWould you like to:",
        quickReplies: ['Book Appointment', 'Call Now', 'Send WhatsApp', 'Back to Menu']
      };
    }

    // Book Appointment
    if (input.includes('book appointment') || input.includes('schedule') || input.includes('appointment')) {
      return {
        text: "📅 Book an Appointment\n\nGreat! You can book a free consultation with our experts.\n\nVisit our Book Appointment page or call us directly at +91 92679 53513\n\nOffice Hours: Mon-Sat, 9 AM - 6 PM",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Call Instead']
      };
    }

    // Send WhatsApp
    if (input.includes('whatsapp') || input.includes('send whatsapp')) {
      return {
        text: "💬 WhatsApp Us!\n\nChat with us on WhatsApp for instant support:\n\n📱 +91 92679 53513\n\nClick below to start chatting:\nwa.me/919267953513\n\nOur team will respond within minutes during business hours (Mon-Sat, 9 AM - 6 PM)",
        quickReplies: ['Call Instead', 'Send Email', 'Back to Menu']
      };
    }

    // Send Email
    if (input.includes('email') || input.includes('send email') || input.includes('mail')) {
      return {
        text: "📧 Email Us\n\nSend your queries to:\nkartikpundir231@gmail.com\n\nWe typically respond within 24 hours.\n\nFor urgent matters, please call us at +91 92679 53513\n\nWhat would you like to do?",
        quickReplies: ['Call Now', 'WhatsApp', 'Book Appointment', 'Back to Menu']
      };
    }

    // Home Loan
    if (input.includes('home loan') || input.includes('house loan') || input.includes('property loan')) {
      return {
        text: "🏠 Home Loan - Great choice!\n\n✓ Loan up to ₹5 Crore\n✓ Interest rates starting from 8.5%\n✓ Tenure up to 30 years\n✓ Minimal documentation\n\nWould you like to:",
        quickReplies: ['Apply for Home Loan', 'Check Eligibility', 'Calculate EMI', 'Talk to Expert']
      };
    }

    // Car Loan
    if (input.includes('car loan') || input.includes('auto loan') || input.includes('vehicle loan')) {
      return {
        text: "🚗 Car Loan - Drive your dream!\n\n✓ New & Used cars\n✓ Interest rates from 8.7%\n✓ Up to 100% on-road price\n✓ Quick approval in 24 hours\n\nWhat would you like to do?",
        quickReplies: ['Apply for Car Loan', 'Check Interest Rates', 'Calculate EMI', 'Contact Us']
      };
    }

    // Personal Loan
    if (input.includes('personal loan') || input.includes('instant loan')) {
      return {
        text: "💰 Personal Loan - Quick & Easy!\n\n✓ Up to ₹40 Lakhs\n✓ Interest from 10.5%\n✓ No collateral needed\n✓ Instant approval\n\nHow can I assist you?",
        quickReplies: ['Apply Now', 'Check Eligibility', 'EMI Calculator', 'Speak to Agent']
      };
    }

    // Business Loan
    if (input.includes('business loan') || input.includes('msme') || input.includes('working capital')) {
      return {
        text: "🏢 Business Loan - Grow Your Business!\n\n✓ Up to ₹50 Lakhs\n✓ Competitive rates from 11%\n✓ Flexible repayment\n✓ Quick processing\n\nWhat would you like to know?",
        quickReplies: ['Apply for Business Loan', 'Eligibility Criteria', 'Documents Required', 'Get Callback']
      };
    }

    // CIBIL Score
    if (input.includes('cibil') || input.includes('credit score') || input.includes('credit report')) {
      return {
        text: "📊 CIBIL Score Check\n\nCheck your credit score instantly! A good CIBIL score (750+) increases your loan approval chances.\n\nWould you like to:",
        quickReplies: ['Check CIBIL Score', 'Improve Credit Score', 'Why CIBIL Matters', 'Back to Main Menu']
      };
    }

    // EMI Calculator
    if (input.includes('emi') || input.includes('calculator') || input.includes('calculate')) {
      return {
        text: "🧮 EMI Calculator\n\nCalculate your monthly EMI for any loan amount. Plan your finances better!\n\nSelect loan type:",
        quickReplies: ['Home Loan EMI', 'Car Loan EMI', 'Personal Loan EMI', 'Business Loan EMI']
      };
    }

    // Interest Rates
    if (input.includes('interest') || input.includes('rate') || input.includes('roi')) {
      return {
        text: "💹 Our Interest Rates:\n\n🏠 Home Loan: 8.5% onwards\n🚗 Car Loan: 8.7% onwards\n💰 Personal Loan: 10.5% onwards\n🏢 Business Loan: 11% onwards\n\n*Rates subject to eligibility\n\nWhich loan interests you?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
      };
    }

    // Eligibility
    if (input.includes('eligib') || input.includes('qualify') || input.includes('criteria')) {
      return {
        text: "✅ Basic Eligibility:\n\n• Age: 21-65 years\n• Income: Minimum ₹25,000/month\n• Employment: Salaried/Self-employed\n• CIBIL: 650+ preferred\n\nWhich loan are you interested in?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
      };
    }

    // Documents
    if (input.includes('document') || input.includes('papers') || input.includes('required')) {
      return {
        text: "📄 Documents Required:\n\n• Identity Proof (Aadhar/PAN)\n• Address Proof\n• Income Proof (Salary slips/ITR)\n• Bank Statements (6 months)\n• Passport size photos\n\nNeed help with application?",
        quickReplies: ['Apply Now', 'Upload Documents', 'Talk to Expert', 'Back']
      };
    }

    // Contact/Support
    if (input.includes('contact') || input.includes('phone') || input.includes('talk') || input.includes('speak') || input.includes('agent') || input.includes('expert')) {
      return {
        text: "📞 Contact Us:\n\n📱 Phone: +91 92679 53513\n📧 Email: kartikpundir231@gmail.com\n📍 Office: Sector 17, Sukhrali, Gurgaon\n\nOur team is available Mon-Sat, 9 AM - 6 PM\n\nWould you like to:",
        quickReplies: ['Request Callback', 'Book Appointment', 'Send Email', 'Back to Menu']
      };
    }

    // Call/Phone specific
    if (input.includes('call now') || input.includes('phone number')) {
      return {
        text: "📱 Call Us Now!\n\n+91 92679 53513\n\nOur loan experts are ready to assist you.\n\nOffice Hours:\nMon-Sat: 9 AM - 6 PM\n\nPrefer a callback instead?",
        quickReplies: ['Request Callback', 'Send WhatsApp', 'Back to Menu']
      };
    }

    // Apply/Application
    if (input.includes('apply') || input.includes('application') || input.includes('start')) {
      return {
        text: "🎯 Ready to Apply?\n\nGreat! Let me help you get started. Which loan would you like to apply for?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Talk to Expert']
      };
    }

    // Back to menu
    if (input.includes('back') || input.includes('menu') || input.includes('main menu')) {
      return {
        text: "🏠 Main Menu\n\nHow can I help you today?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'CIBIL Score', 'Contact Us']
      };
    }

    // Greetings
    if (input.includes('hi') || input.includes('hello') || input.includes('hey') || input.includes('namaste')) {
      return {
        text: "Hello! 😊 Welcome to CS Smart Finserve. I'm here to help you with all your loan needs. What are you looking for today?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'CIBIL Score', 'EMI Calculator']
      };
    }

    // Thanks
    if (input.includes('thank') || input.includes('thanks')) {
      return {
        text: "You're welcome! 😊 Is there anything else I can help you with?",
        quickReplies: ['Yes, I have more questions', 'No, that\'s all', 'Talk to Agent']
      };
    }

    // Default response
    return {
      text: "I'm here to help! I can assist you with:\n\n🏠 Home Loans\n🚗 Car Loans\n💰 Personal Loans\n🏢 Business Loans\n📊 CIBIL Score Check\n🧮 EMI Calculator\n\nWhat would you like to know more about?",
      quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'CIBIL Score', 'Contact Us']
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addUserMessage(input);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(input);
      setIsTyping(false);
      addBotMessage(response.text, response.quickReplies);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    addUserMessage(reply);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(reply);
      setIsTyping(false);
      addBotMessage(response.text, response.quickReplies);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl group"
            style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}
          >
            <FaHeadset className="group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxWidth: 'calc(100vw - 3rem)' }}
          >
            {/* Header */}
            <div className="p-4 text-white flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <FaHeadset className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">CS Smart Support</h3>
                  <p className="text-xs opacity-90">Online • Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-white flex-shrink-0">
                        <FaComments size={14} />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-br from-accent to-orange-500 text-white rounded-br-sm' 
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    </div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                        <FaUser size={14} />
                      </div>
                    )}
                  </motion.div>

                  {/* Quick Replies */}
                  {msg.type === 'bot' && msg.quickReplies && msg.quickReplies.length > 0 && idx === messages.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-3 ml-10"
                    >
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 text-xs font-medium rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all"
                        >
                          {reply}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-white">
                    <FaComments size={14} />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}
                >
                  <FaPaperPlane size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
