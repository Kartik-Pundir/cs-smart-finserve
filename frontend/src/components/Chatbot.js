import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaHeadset, FaComments, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT = '#c0392b';

/* ── Bot knowledge base (unchanged logic) ── */
const getBotResponse = (userInput) => {
  const inp = userInput.toLowerCase().trim();

  if (inp === 'home loan' || (inp.includes('home') && inp.includes('loan')))
    return { text: "🏠 *Home Loan*\n\n• Loan up to ₹5 Crore\n• Interest from 8.5% p.a.\n• Tenure up to 30 years\n• Minimal documentation\n• Quick sanction in 48 hrs", quickReplies: ['Apply Now', 'Calculate EMI', 'Check Eligibility', 'Contact Us'] };

  if (inp === 'car loan' || inp === 'auto loan' || ((inp.includes('car') || inp.includes('auto')) && inp.includes('loan') && !inp.includes('used')))
    return { text: "🚗 *Car Loan*\n\n• New & used cars\n• Interest from 8.7% p.a.\n• Up to 100% on-road price\n• Approval in 24 hours\n• Flexible tenure", quickReplies: ['Apply Now', 'Check Rates', 'Calculate EMI', 'Contact Us'] };

  if (inp === 'used car loan' || (inp.includes('used') && inp.includes('car')))
    return { text: "🚙 *Used Car Loan*\n\n• Finance pre-owned cars\n• Interest from 9.5% p.a.\n• Up to 80% of car value\n• Quick processing", quickReplies: ['Apply Now', 'Check Eligibility', 'Contact Us'] };

  if (inp === 'personal loan' || (inp.includes('personal') && inp.includes('loan')))
    return { text: "💰 *Personal Loan*\n\n• Up to ₹40 Lakhs\n• Interest from 10.5% p.a.\n• No collateral needed\n• Instant approval\n• Flexible tenure", quickReplies: ['Apply Now', 'Check Eligibility', 'Calculate EMI', 'Contact Us'] };

  if (inp === 'business loan' || (inp.includes('business') && inp.includes('loan')))
    return { text: "🏢 *Business Loan*\n\n• Up to ₹50 Lakhs\n• Rates from 11% p.a.\n• Flexible repayment\n• Quick processing\n• Minimal docs", quickReplies: ['Apply Now', 'Documents Required', 'Calculate EMI', 'Contact Us'] };

  if (inp === 'insurance' || inp.includes('insurance'))
    return { text: "🛡️ *General Insurance*\n\n• Health Insurance\n• Life Insurance\n• Vehicle Insurance\n• Home Insurance\n• Travel Insurance", quickReplies: ['Get Quote', 'Contact Us', 'Back to Menu'] };

  if (inp === 'check rates' || inp.includes('rate') || inp.includes('interest'))
    return { text: "💹 *Current Interest Rates*\n\n🏠 Home Loan — 8.5% onwards\n🚗 Car Loan — 8.7% onwards\n🚙 Used Car — 9.5% onwards\n💰 Personal — 10.5% onwards\n🏢 Business — 11% onwards\n\n*Subject to eligibility", quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Contact Us'] };

  if (inp === 'check eligibility' || inp.includes('eligib') || inp.includes('qualify'))
    return { text: "✅ *Basic Eligibility*\n\n• Age: 21–65 years\n• Income: Min ₹25,000/month\n• Employment: Salaried / Self-employed\n• CIBIL: 650+ preferred\n• Indian citizen", quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan'] };

  if (inp === 'documents required' || inp.includes('document') || inp.includes('papers'))
    return { text: "📄 *Documents Required*\n\n• Aadhar / PAN card\n• Address proof\n• Salary slips / ITR (3 yrs)\n• Bank statements (6 months)\n• Passport size photos", quickReplies: ['Apply Now', 'Contact Us', 'Back to Menu'] };

  if (inp === 'calculate emi' || inp === 'emi calculator' || inp.includes('emi'))
    return { text: "🧮 *EMI Calculator*\n\nVisit our EMI Calculator to plan your finances! Calculate monthly EMI for any loan amount, tenure and rate.", quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan'] };

  if (inp === 'apply now' || inp.includes('apply'))
    return { text: "🎯 *Ready to Apply?*\n\nYou can:\n1. Fill our online form\n2. Upload documents\n3. Get instant approval\n\nOr call us: *+91 92679 53513*", quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan'] };

  if (inp === 'contact us' || inp === 'contact' || inp.includes('contact') || inp.includes('call') || inp.includes('phone'))
    return { text: "📞 *Contact Us*\n\n📱 +91 92679 53513\n📧 kartikpundir231@gmail.com\n📍 102, Lala Ram Market, Sector 17, Sukhrali, Gurgaon\n\n⏰ Mon–Sat: 9 AM – 6 PM", quickReplies: ['Book Appointment', 'Back to Menu'] };

  if (inp === 'book appointment' || inp.includes('appointment'))
    return { text: "📅 *Book a Free Consultation*\n\nOur loan experts are available Mon–Sat, 9 AM – 6 PM.\n\nCall: +91 92679 53513\nOr book online from the website.", quickReplies: ['Contact Us', 'Back to Menu'] };

  if (inp === 'cibil score' || inp.includes('cibil') || inp.includes('credit score'))
    return { text: "📊 *CIBIL Score*\n\nA score of 750+ gets you:\n✓ Lower interest rates\n✓ Faster approval\n✓ Higher loan amounts\n\nCheck yours on our website!", quickReplies: ['Check Eligibility', 'Contact Us', 'Back to Menu'] };

  if (inp === 'get quote' || inp === 'compare plans')
    return { text: "📋 *Get an Insurance Quote*\n\nCall us: +91 92679 53513\nOr email: kartikpundir231@gmail.com\n\nOur experts compare plans and get you the best coverage.", quickReplies: ['Contact Us', 'Back to Menu'] };

  if (inp === 'back to menu' || inp === 'menu' || inp === 'back')
    return { text: "What would you like help with today?", quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us'] };

  if (inp.includes('hi') || inp.includes('hello') || inp.includes('hey') || inp.includes('namaste'))
    return { text: "Hello! 😊 Welcome to CS Smart Finserve.\n\nI'm here to help you with all your loan and finance needs. What are you looking for?", quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us'] };

  if (inp.includes('thank'))
    return { text: "You're welcome! 😊\n\nIs there anything else I can help you with?", quickReplies: ['Home Loan', 'Car Loan', 'Contact Us', 'Back to Menu'] };

  return {
    text: "I can help you with:\n\n🏠 Home Loans  🚗 Car Loans\n💰 Personal Loans  🏢 Business Loans\n🛡️ Insurance  📊 CIBIL Check\n🧮 EMI Calculator  📞 Contact\n\nWhat would you like to know?",
    quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us']
  };
};

/* ── Format bot text with *bold* ── */
const formatText = (text) => {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*([^*]+)\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
};

/* ── Typing dots ── */
const TypingDots = () => (
  <div style={{ display: 'flex', gap: 4, padding: '12px 16px', background: 'white', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', width: 'fit-content' }}>
    {[0, 0.25, 0.5].map((delay, i) => (
      <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#c0392b', animation: `chatbotBounce 1s ease-in-out ${delay}s infinite` }} />
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════ */
const Chatbot = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread]     = useState(0);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => addBot("Hi! 👋 Welcome to CS Smart Finserve.\n\nHow can I help you today?",
        ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us']), 400);
    }
    if (isOpen) setUnread(0);
  }, [isOpen]);

  // Proactive bubble after 6s
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setUnread(1), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  const addBot = (text, quickReplies = []) =>
    setMessages(prev => [...prev, { type: 'bot', text, quickReplies, id: Date.now() }]);

  const addUser = (text) =>
    setMessages(prev => [...prev, { type: 'user', text, id: Date.now() }]);

  const respond = (text) => {
    addUser(text);
    setInput('');
    setIsTyping(true);
    const delay = 600 + Math.min(text.length * 15, 800);
    setTimeout(() => {
      const r = getBotResponse(text);
      setIsTyping(false);
      addBot(r.text, r.quickReplies);
    }, delay);
  };

  return (
    <>
      <style>{`
        @keyframes chatbotBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes chatbotPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.35)} }
        @keyframes chatbotRing   { 0%,100%{transform:rotate(0)} 10%,30%,50%,70%{transform:rotate(-8deg)} 20%,40%,60%,80%{transform:rotate(8deg)} }
      `}</style>

      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999 }}>

        {/* ── Floating button ── */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
              {/* Proactive tooltip */}
              {unread > 0 && (
                <motion.div initial={{ opacity: 0, y: 8, x: 10 }} animate={{ opacity: 1, y: 0, x: 0 }}
                  style={{ position: 'absolute', bottom: 76, right: 0, background: 'white', borderRadius: '16px 16px 4px 16px', padding: '10px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600, color: '#0f172a', border: '1px solid #f1f5f9' }}>
                  👋 Need help with a loan?
                  <button onClick={() => setUnread(0)} style={{ marginLeft: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: 12 }}>✕</button>
                </motion.div>
              )}

              <button onClick={() => setIsOpen(true)}
                style={{ position: 'relative', width: 60, height: 60, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT}, #e74c3c)`, border: 'none', boxShadow: '0 8px 32px rgba(192,57,43,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>
                <FaHeadset style={{ animation: unread ? 'chatbotRing 1.2s ease-in-out' : 'none' }} />
                {unread > 0 && (
                  <span style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, background: '#22c55e', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: 'white' }}>1</span>
                )}
                {/* Pulse ring */}
                <span style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid rgba(192,57,43,0.35)', animation: 'chatbotPulse 2s ease-in-out infinite' }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Chat window ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 30 } }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.05 } }}
              style={{ width: 380, height: 600, background: 'white', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              {/* Header */}
              <div style={{ background: `linear-gradient(135deg, #1a0a0a 0%, ${ACCENT} 100%)`, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '2px solid rgba(255,255,255,0.3)' }}>
                      🤖
                    </div>
                    <div style={{ position: 'absolute', bottom: 1, right: 1, width: 11, height: 11, borderRadius: '50%', background: '#22c55e', border: '2px solid white' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: 'white', fontSize: 15, letterSpacing: -0.3 }}>CS Smart Support</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'chatbotPulse 2s infinite' }} />
                      Online · Typically replies instantly
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: 34, height: 34, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  <FaChevronDown />
                </button>
              </div>

              {/* Date stamp */}
              <div style={{ textAlign: 'center', padding: '10px 0 4px', fontSize: 11, color: '#cbd5e1', fontWeight: 600, background: '#f8f7f4', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
              </div>

              {/* Messages area - flex:1 + minHeight:0 ensures scrolling works */}
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 16px 8px', background: '#f8f7f4', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map((msg, idx) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    {/* Bot message */}
                    {msg.type === 'bot' && (
                      <div style={{ display: 'flex', gap: 9, alignItems: 'flex-end' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, #1a0a0a, ${ACCENT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, marginBottom: 2 }}>🤖</div>
                        <div style={{ maxWidth: '78%' }}>
                          <div style={{ background: 'white', padding: '11px 15px', borderRadius: '18px 18px 18px 4px', fontSize: 13.5, lineHeight: 1.6, color: '#1e293b', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', whiteSpace: 'pre-line' }}>
                            {formatText(msg.text)}
                          </div>
                          {/* Quick replies — only show on last bot message */}
                          {msg.quickReplies?.length > 0 && idx === messages.length - 1 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                              {msg.quickReplies.map((r, i) => (
                                <button key={i} onClick={() => respond(r)}
                                  style={{ padding: '6px 13px', fontSize: 12, fontWeight: 600, borderRadius: 20, border: `1.5px solid ${ACCENT}`, background: 'white', color: ACCENT, cursor: 'pointer', transition: 'all .15s' }}
                                  onMouseEnter={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = 'white'; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = ACCENT; }}>
                                  {r}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* User message */}
                    {msg.type === 'user' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ maxWidth: '78%', background: `linear-gradient(135deg, ${ACCENT}, #e74c3c)`, padding: '11px 15px', borderRadius: '18px 18px 4px 18px', fontSize: 13.5, lineHeight: 1.6, color: 'white', boxShadow: '0 2px 10px rgba(192,57,43,0.25)' }}>
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 9, alignItems: 'flex-end' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, #1a0a0a, ${ACCENT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🤖</div>
                    <TypingDots />
                  </motion.div>
                )}
                <div ref={endRef} />
              </div>

              {/* Suggested quick-access bar */}
              <div style={{ background: 'white', borderTop: '1px solid #f1f5f9', padding: '8px 12px', display: 'flex', gap: 6, overflowX: 'auto', flexShrink: 0 }}>
                {['Rates', 'Eligibility', 'Documents', 'Book Call'].map((s, i) => (
                  <button key={i} onClick={() => respond(s === 'Rates' ? 'check rates' : s === 'Book Call' ? 'book appointment' : s)}
                    style={{ flexShrink: 0, padding: '5px 12px', fontSize: 11, fontWeight: 700, borderRadius: 20, border: '1px solid #e2e8f0', background: '#f8f7f4', color: '#475569', cursor: 'pointer' }}>
                    {s}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div style={{ padding: '12px 14px 14px', background: 'white', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#f8f7f4', borderRadius: 999, padding: '6px 6px 6px 16px', border: '1.5px solid #e2e8f0' }}>
                  <input
                    type="text" value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && input.trim() && respond(input)}
                    placeholder="Ask about loans, rates, EMI…"
                    style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: 13.5, color: '#0f172a', fontFamily: 'inherit' }}
                  />
                  <button onClick={() => input.trim() && respond(input)} disabled={!input.trim()}
                    style={{ width: 38, height: 38, borderRadius: '50%', background: input.trim() ? `linear-gradient(135deg, ${ACCENT}, #e74c3c)` : '#e2e8f0', border: 'none', color: input.trim() ? 'white' : '#94a3b8', cursor: input.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, transition: 'all .2s', flexShrink: 0 }}>
                    <FaPaperPlane />
                  </button>
                </div>
                <p style={{ textAlign: 'center', fontSize: 10, color: '#cbd5e1', margin: '7px 0 0', letterSpacing: 0.3 }}>CS Smart Finserve · Powered by AI Support</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Chatbot;
