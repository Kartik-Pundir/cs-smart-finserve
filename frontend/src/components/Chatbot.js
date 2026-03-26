import { useState, useEffect, useRef } from 'react';
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
          'Contact Us'
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);

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
    const input = userInput.toLowerCase().trim();

    // Exact matches first (for quick reply buttons)
    // Home Loan
    if (input === 'home loan') {
      return {
        text: "🏠 Home Loan\n\n✓ Loan up to ₹5 Crore\n✓ Interest rates from 8.5%\n✓ Tenure up to 30 years\n✓ Minimal documentation\n✓ Quick approval\n\nWhat would you like to do?",
        quickReplies: ['Apply Now', 'Calculate EMI', 'Check Eligibility', 'Contact Us']
      };
    }

    // Car/Auto Loan
    if (input === 'car loan' || input === 'auto loan') {
      return {
        text: "🚗 Car Loan\n\n✓ New & Used cars\n✓ Interest rates from 8.7%\n✓ Up to 100% on-road price\n✓ Quick approval in 24 hours\n✓ Flexible tenure\n\nHow can I help?",
        quickReplies: ['Apply Now', 'Check Rates', 'Calculate EMI', 'Contact Us']
      };
    }

    // Used Car Loan
    if (input === 'used car loan') {
      return {
        text: "🚙 Used Car Loan\n\n✓ Finance pre-owned cars\n✓ Interest rates from 9.5%\n✓ Up to 80% of car value\n✓ Quick processing\n✓ Flexible repayment\n\nWhat would you like to know?",
        quickReplies: ['Apply Now', 'Check Eligibility', 'Calculate EMI', 'Contact Us']
      };
    }

    // Personal Loan
    if (input === 'personal loan') {
      return {
        text: "💰 Personal Loan\n\n✓ Up to ₹40 Lakhs\n✓ Interest from 10.5%\n✓ No collateral needed\n✓ Instant approval\n✓ Flexible tenure\n\nWhat would you like?",
        quickReplies: ['Apply Now', 'Check Eligibility', 'Calculate EMI', 'Contact Us']
      };
    }

    // Business Loan
    if (input === 'business loan') {
      return {
        text: "🏢 Business Loan\n\n✓ Up to ₹50 Lakhs\n✓ Competitive rates from 11%\n✓ Flexible repayment\n✓ Quick processing\n✓ Minimal documentation\n\nHow can I assist?",
        quickReplies: ['Apply Now', 'Documents Required', 'Calculate EMI', 'Contact Us']
      };
    }

    // Loan Against Property
    if (input === 'loan against property' || input === 'lap') {
      return {
        text: "🏘️ Loan Against Property\n\n✓ Up to ₹10 Crore\n✓ Interest from 9%\n✓ Tenure up to 20 years\n✓ Use for any purpose\n✓ Keep your property\n\nWhat would you like to know?",
        quickReplies: ['Apply Now', 'Check Eligibility', 'Calculate EMI', 'Contact Us']
      };
    }

    // Insurance
    if (input === 'insurance') {
      return {
        text: "🛡️ General Insurance\n\n✓ Health Insurance\n✓ Life Insurance\n✓ Vehicle Insurance\n✓ Home Insurance\n✓ Travel Insurance\n\nProtect what matters most!",
        quickReplies: ['Get Quote', 'Compare Plans', 'Contact Us', 'Back to Menu']
      };
    }

    // CIBIL Score
    if (input === 'cibil score' || input === 'check cibil score') {
      return {
        text: "📊 CIBIL Score Check\n\nCheck your credit score instantly!\n\nA good CIBIL score (750+) increases your loan approval chances and gets you better interest rates.\n\nWould you like to:",
        quickReplies: ['Check CIBIL Score', 'Improve Score Tips', 'Contact Us', 'Back to Menu']
      };
    }

    // EMI Calculator
    if (input === 'calculate emi' || input === 'emi calculator') {
      return {
        text: "🧮 EMI Calculator\n\nCalculate your monthly EMI for any loan amount. Plan your finances better!\n\nSelect loan type:",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
      };
    }

    // Check Rates
    if (input === 'check rates') {
      return {
        text: "💹 Our Interest Rates:\n\n🏠 Home Loan: 8.5% onwards\n🚗 Car Loan: 8.7% onwards\n🚙 Used Car: 9.5% onwards\n💰 Personal: 10.5% onwards\n🏢 Business: 11% onwards\n🏘️ LAP: 9% onwards\n\n*Rates subject to eligibility\n\nWhich loan interests you?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Contact Us']
      };
    }

    // Check Eligibility
    if (input === 'check eligibility') {
      return {
        text: "✅ Basic Eligibility:\n\n• Age: 21-65 years\n• Income: Minimum ₹25,000/month\n• Employment: Salaried/Self-employed\n• CIBIL: 650+ preferred\n• Residence: Indian citizen\n\nWhich loan are you interested in?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
      };
    }

    // Documents Required
    if (input === 'documents required' || input === 'upload documents') {
      return {
        text: "📄 Documents Required:\n\n• Identity Proof (Aadhar/PAN)\n• Address Proof\n• Income Proof (Salary slips/ITR)\n• Bank Statements (6 months)\n• Passport size photos\n\nNeed help with application?",
        quickReplies: ['Apply Now', 'Contact Us', 'Back to Menu']
      };
    }

    // Apply Now
    if (input === 'apply now') {
      return {
        text: "🎯 Ready to Apply?\n\nGreat! To apply for a loan:\n\n1. Visit our website\n2. Fill the application form\n3. Upload required documents\n4. Get instant approval\n\nOr call us at +91 92679 53513 for assistance!\n\nWhich loan would you like to apply for?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
      };
    }

    // Contact Us
    if (input === 'contact us' || input === 'contact') {
      return {
        text: "📞 Contact Us:\n\n📱 Phone: +91 92679 53513\n📧 Email: kartikpundir231@gmail.com\n📍 Office: 102, Lala Ram Market\n   Sector 17, Sukhrali\n   Gurgaon, Haryana 122001\n\n⏰ Mon-Sat: 9 AM - 6 PM\n\nHow can we help you?",
        quickReplies: ['Book Appointment', 'Request Callback', 'Send Email', 'Back to Menu']
      };
    }

    // Book Appointment
    if (input === 'book appointment') {
      return {
        text: "📅 Book an Appointment\n\nGreat! You can book a free consultation with our loan experts.\n\nVisit our Book Appointment page or call us directly at +91 92679 53513\n\nOffice Hours: Mon-Sat, 9 AM - 6 PM",
        quickReplies: ['Contact Us', 'Back to Menu']
      };
    }

    // Request Callback
    if (input === 'request callback') {
      return {
        text: "📞 Request a Callback\n\nOur loan expert will call you back shortly!\n\nPlease share:\n• Your name\n• Phone number\n• Preferred time\n• Loan type\n\nOr call us directly: +91 92679 53513",
        quickReplies: ['Contact Us', 'Back to Menu']
      };
    }

    // Send Email
    if (input === 'send email') {
      return {
        text: "📧 Send us an Email\n\nEmail: kartikpundir231@gmail.com\n\nOr you can:\n• Call us: +91 92679 53513\n• Visit our office in Sector 17, Gurgaon\n• Book an appointment online\n\nWe'll respond within 24 hours!",
        quickReplies: ['Book Appointment', 'Contact Us', 'Back to Menu']
      };
    }

    // Get Quote / Compare Plans
    if (input === 'get quote' || input === 'compare plans') {
      return {
        text: "📋 Get Insurance Quote\n\nTo get the best insurance quote:\n\n1. Call us: +91 92679 53513\n2. Email: kartikpundir231@gmail.com\n3. Visit our office\n\nOur experts will help you compare plans and choose the best coverage!\n\nOffice Hours: Mon-Sat, 9 AM - 6 PM",
        quickReplies: ['Contact Us', 'Back to Menu']
      };
    }

    // Improve Score Tips
    if (input === 'improve score tips') {
      return {
        text: "💡 Tips to Improve CIBIL Score:\n\n✓ Pay bills on time\n✓ Keep credit utilization below 30%\n✓ Don't apply for multiple loans\n✓ Check credit report regularly\n✓ Maintain old credit accounts\n✓ Clear outstanding debts\n\nNeed help? Contact us!",
        quickReplies: ['Check CIBIL Score', 'Contact Us', 'Back to Menu']
      };
    }

    // Yes, I have questions
    if (input === 'yes, i have questions') {
      return {
        text: "Sure! I'm here to help. What would you like to know?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us']
      };
    }

    // Back to Menu
    if (input === 'back to menu' || input === 'menu' || input === 'back' || input === 'main menu') {
      return {
        text: "🏠 Main Menu\n\nHow can I help you today?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'CIBIL Score', 'Contact Us']
      };
    }

    // Partial matches for natural language
    if (input.includes('home') && input.includes('loan')) {
      return getBotResponse('home loan');
    }
    if ((input.includes('car') || input.includes('auto') || input.includes('vehicle')) && input.includes('loan') && !input.includes('used')) {
      return getBotResponse('car loan');
    }
    if (input.includes('used') && input.includes('car')) {
      return getBotResponse('used car loan');
    }
    if (input.includes('personal') && input.includes('loan')) {
      return getBotResponse('personal loan');
    }
    if (input.includes('business') && input.includes('loan')) {
      return getBotResponse('business loan');
    }
    if (input.includes('property') && input.includes('loan')) {
      return getBotResponse('loan against property');
    }
    if (input.includes('insurance')) {
      return getBotResponse('insurance');
    }
    if (input.includes('cibil') || input.includes('credit score')) {
      return getBotResponse('cibil score');
    }
    if (input.includes('emi') || input.includes('calculator')) {
      return getBotResponse('emi calculator');
    }
    if (input.includes('interest') || input.includes('rate')) {
      return getBotResponse('check rates');
    }
    if (input.includes('eligib') || input.includes('qualify')) {
      return getBotResponse('check eligibility');
    }
    if (input.includes('document') || input.includes('papers')) {
      return getBotResponse('documents required');
    }
    if (input.includes('apply')) {
      return getBotResponse('apply now');
    }
    if (input.includes('call') || input.includes('phone') || input.includes('contact')) {
      return getBotResponse('contact us');
    }
    if (input.includes('appointment') || input.includes('schedule')) {
      return getBotResponse('book appointment');
    }
    if (input.includes('callback')) {
      return getBotResponse('request callback');
    }

    // Greetings
    if (input.includes('hi') || input.includes('hello') || input.includes('hey') || input.includes('namaste')) {
      return {
        text: "Hello! 😊 Welcome to CS Smart Finserve.\n\nI'm here to help you with all your loan needs. What are you looking for today?",
        quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us']
      };
    }

    // Thanks
    if (input.includes('thank') || input.includes('thanks')) {
      return {
        text: "You're welcome! 😊\n\nIs there anything else I can help you with?",
        quickReplies: ['Yes, I have questions', 'Contact Us', 'Back to Menu']
      };
    }

    // Default response
    return {
      text: "I can help you with:\n\n🏠 Home Loans\n🚗 Car Loans\n🚙 Used Car Loans\n💰 Personal Loans\n🏢 Business Loans\n🏘️ Loan Against Property\n🛡️ Insurance\n📊 CIBIL Score Check\n🧮 EMI Calculator\n📞 Contact Us\n\nWhat would you like to know more about?",
      quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us']
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
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
            border: 'none',
            boxShadow: '0 10px 40px rgba(192, 57, 43, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '28px',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaHeadset />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '384px',
          height: '600px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '2px solid rgba(192, 57, 43, 0.2)'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                <FaHeadset />
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>CS Smart Support</div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>Online • Ready to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            background: 'linear-gradient(to bottom, #faf8ff, #f0eeff)'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  {msg.type === 'bot' && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      <FaComments />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '75%',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: msg.type === 'user' 
                      ? 'linear-gradient(135deg, #c0392b, #e74c3c)' 
                      : 'white',
                    color: msg.type === 'user' ? 'white' : '#333',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-line',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {msg.text}
                  </div>
                  {msg.type === 'user' && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      flexShrink: 0
                    }}>
                      <FaUser />
                    </div>
                  )}
                </div>

                {/* Quick Replies */}
                {msg.type === 'bot' && msg.quickReplies && msg.quickReplies.length > 0 && idx === messages.length - 1 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginTop: '12px',
                    marginLeft: '40px'
                  }}>
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        style={{
                          padding: '8px 16px',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '20px',
                          border: '2px solid #c0392b',
                          background: 'white',
                          color: '#c0392b',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#c0392b';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#c0392b';
                        }}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px'
                }}>
                  <FaComments />
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c0392b', animation: 'bounce 1s infinite' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c0392b', animation: 'bounce 1s infinite 0.2s' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c0392b', animation: 'bounce 1s infinite 0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '16px', background: 'white', borderTop: '2px solid #f0eeff' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '24px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
                  border: 'none',
                  color: 'white',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  opacity: input.trim() ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
