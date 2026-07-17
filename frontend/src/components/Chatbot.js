import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaHeadset, FaComments, FaChevronDown, FaFileAlt, FaCheckCircle, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ACCENT = '#c0392b';

/* ── Extended Intent Knowledge Base ── */
const INTENTS = [
  {
    id: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'namaste', 'morning', 'afternoon', 'evening', 'yo', 'halo', 'hlo'],
    phrases: ['good morning', 'good afternoon', 'good evening', 'howdy'],
    response: {
      text: "Hello! 😊 Welcome to *CS Smart Finserve*.\n\nI am your AI financial assistant. How can I help you with your loans, insurance, or interest rates today?",
      quickReplies: ['Home Loan', 'Car Loan', 'Check Rates', 'Contact Us']
    }
  },
  {
    id: 'goodbyes',
    keywords: ['bye', 'goodbye', 'seeya', 'exit', 'quit', 'stop', 'bye-bye', 'tata', 'close'],
    phrases: ['see you later', 'have a good day', 'talk to you later'],
    response: {
      text: "Goodbye! 👋 Thank you for chatting with CS Smart Finserve. Have a wonderful day, and feel free to reach back out if you need anything else!",
      quickReplies: ['Back to Menu']
    }
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'thx', 'grateful', 'appreciate', 'helpful', 'thankyou'],
    phrases: ['thank you', 'thank you so much', 'thanks a lot'],
    response: {
      text: "You're very welcome! 😊 It is my pleasure to assist you. Let me know if you have any other questions about our loan services or interest rates.",
      quickReplies: ['Check Rates', 'Eligibility', 'Back to Menu']
    }
  },
  {
    id: 'welcome',
    keywords: ['welcome', 'mention', 'pleasure', 'problem', 'no worries', 'anytime'],
    phrases: ['you\'re welcome', 'my pleasure', 'no problem', 'no worries', 'don\'t mention it'],
    response: {
      text: "Indeed! 😊 We strive to provide the best financial guidance. What can we look into next?",
      quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
    }
  },
  {
    id: 'how_are_you',
    keywords: ['how', 'doing', 'going', 'up', 'status', 'fine', 'good', 'well'],
    phrases: ['how are you', 'how is it going', 'how are you doing', 'what is up', 'whats up'],
    response: {
      text: "I'm doing great, thank you for asking! 🤖 Ready to help you calculate your EMI, check loan interest rates, or find the best insurance coverage. How are you doing today?",
      quickReplies: ['Home Loan', 'Check Rates', 'Calculate EMI']
    }
  },
  {
    id: 'sorry_apology',
    keywords: ['sorry', 'apologize', 'apologies', 'bad', 'oops', 'mistake'],
    phrases: ['my bad', 'i am sorry'],
    response: {
      text: "No need to apologize at all! 😊 I am here to help you. Let's start fresh. What financial services are you interested in?",
      quickReplies: ['Home Loan', 'Check Rates', 'Contact Us']
    }
  },
  {
    id: 'home_loan',
    keywords: ['home', 'house', 'property', 'flat', 'construction', 'plot', 'housing', 'mortgage', 'villa', 'apartments', 'homes', 'houses'],
    phrases: ['home loan', 'house loan', 'property loan', 'buy house', 'buy home'],
    response: {
      text: "🏠 *Home Loan*\n\nDreaming of your own home? We make it easy:\n\n• *Interest Rates*: From 8.5% p.a. onwards\n• *Flexible Tenure*: Up to 30 years\n• *Loan limits*: Based on eligibility & property value\n• *Processing*: Quick sanction in 48 hours\n• *Minimal Documentation*: Simple and hassle-free",
      quickReplies: ['Apply Now', 'Calculate EMI', 'Check Eligibility', 'Contact Us']
    }
  },
  {
    id: 'car_loan',
    keywords: ['car', 'auto', 'vehicle', 'four-wheeler', 'sedan', 'suv', 'new car', 'cars', 'vehicles'],
    phrases: ['car loan', 'auto loan', 'vehicle loan', 'new car loan', 'buy car'],
    response: {
      text: "🚗 *Car Loan*\n\nGet behind the wheel of your dream car:\n\n• *Interest Rates*: From 8.7% p.a. onwards\n• *Finance*: Up to 100% on-road price\n• *Tenure*: Flexible options up to 7 years\n• *Processing*: Approval in 24 hours\n• *Prepayment*: Zero foreclosure options available",
      quickReplies: ['Apply Now', 'Used Car Loan', 'Calculate EMI', 'Contact Us']
    }
  },
  {
    id: 'used_car_loan',
    keywords: ['used', 'pre-owned', 'second-hand', 'preowned', 'secondhand', 'old car'],
    phrases: ['used car loan', 'second hand car', 'pre owned car'],
    response: {
      text: "🚙 *Used Car Loan*\n\nFinance a pre-owned car with ease:\n\n• *Interest Rates*: From 9.5% p.a. onwards\n• *Finance Limit*: Up to 80% of the car's current valuation\n• *Repayment*: Tenures up to 5 years\n• *Processing*: Swift valuation and disbursal",
      quickReplies: ['Apply Now', 'Car Loan', 'Check Eligibility', 'Contact Us']
    }
  },
  {
    id: 'personal_loan',
    keywords: ['personal', 'private', 'cash', 'emergency', 'unsecured', 'travel', 'wedding', 'medical', 'personel'],
    phrases: ['personal loan', 'cash loan', 'instant loan', 'need money'],
    response: {
      text: "💰 *Personal Loan*\n\nQuick cash for any personal requirement:\n\n• *Interest Rates*: From 10.5% p.a. onwards\n• *Collateral*: No security or collateral needed\n• *Disbursal*: Instant approval and fast payout\n• *Tenure*: Flexible repayment options (1 to 5 years)\n• *Purpose*: Medical emergencies, travel, weddings, education, etc.",
      quickReplies: ['Apply Now', 'Check Eligibility', 'Calculate EMI', 'Contact Us']
    }
  },
  {
    id: 'business_loan',
    keywords: ['business', 'company', 'startup', 'shop', 'msme', 'commercial', 'machinery', 'working capital', 'firm', 'businesses', 'companies'],
    phrases: ['business loan', 'startup loan', 'company loan', 'grow business'],
    response: {
      text: "🏢 *Business Loan*\n\nFuel the growth of your enterprise:\n\n• *Interest Rates*: From 11.0% p.a. onwards\n• *Collateral*: Options for collateral-free MSME loans\n• *Usage*: Working capital, expansion, equipment purchase\n• *Repayment*: Flexible structured repayments\n• *Processing*: Fast track reviews for running businesses",
      quickReplies: ['Apply Now', 'Documents Required', 'Calculate EMI', 'Contact Us']
    }
  },
  {
    id: 'loan_against_property',
    keywords: ['lap', 'against', 'residential', 'commercial property', 'land'],
    phrases: ['loan against property', 'property loan', 'mortgage loan'],
    response: {
      text: "🏡 *Loan Against Property (LAP)*\n\nUnlock the value of your property for major expenses:\n\n• *Interest Rates*: From 9.0% p.a. onwards\n• *High Loan Limit*: Get up to 60-70% of property market value\n• *Usage*: Higher education, business expansion, debt consolidation\n• *Tenure*: Repayment periods up to 15 years",
      quickReplies: ['Apply Now', 'Check Eligibility', 'Contact Us']
    }
  },
  {
    id: 'insurance',
    keywords: ['insurance', 'insure', 'policy', 'premium', 'health', 'life', 'medical insurance', 'term life', 'motor insurance', 'insurances', 'policies'],
    phrases: ['get insurance', 'life insurance', 'health insurance', 'car insurance', 'policy quote'],
    response: {
      text: "🛡️ *General & Life Insurance*\n\nProtect what matters most. We match you with leading insurance policies:\n\n• *Health Insurance*: Cashless hospitalisation, critical illness riders\n• *Life & Term Insurance*: Secure your family's financial future\n• *Motor Insurance*: Third-party and comprehensive covers for cars/bikes\n• *Home & Travel Insurance*: Secure your home or hassle-free international travel",
      quickReplies: ['Get Quote', 'Contact Us', 'Back to Menu']
    }
  },
  {
    id: 'check_rates',
    keywords: ['rate', 'rates', 'interest', 'percentage', 'charges', 'roi', 'percent', 'cost', 'fee', 'fees'],
    phrases: ['interest rates', 'current rates', 'rate sheet', 'loan cost', 'how much interest'],
    response: {
      text: "💹 *Current Loan Interest Rates*\n\nHere are our starting interest rates:\n\n🏠 *Home Loan* — 8.50% p.a. onwards\n🚗 *Car Loan* — 8.70% p.a. onwards\n🚙 *Used Car Loan* — 9.50% p.a. onwards\n💰 *Personal Loan* — 10.50% p.a. onwards\n🏢 *Business Loan* — 11.00% p.a. onwards\n🏡 *Loan Against Property* — 9.00% p.a. onwards\n\n*Note: Final rates depend on your CIBIL score, income, and overall profile.*",
      quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan']
    }
  },
  {
    id: 'check_eligibility',
    keywords: ['eligibility', 'eligible', 'qualify', 'qualified', 'salary', 'income', 'age', 'criteria'],
    phrases: ['am i eligible', 'check eligibility', 'minimum salary', 'age limit'],
    response: {
      text: "✅ *Basic Eligibility Criteria*\n\nTo qualify for a loan, you must generally meet the following:\n\n• *Age*: 21 to 65 years\n• *Income*: Min monthly net salary of ₹25,000 (varies by city & loan type)\n• *Employment*: Salaried (min 1 yr experience) or Self-Employed (min 2 yrs business continuity)\n• *CIBIL Credit Score*: 650+ preferred (750+ gets the best rates)\n• *Citizenship*: Resident Indian citizen",
      quickReplies: ['Check Rates', 'CIBIL Score', 'Documents Required', 'Contact Us']
    }
  },
  {
    id: 'documents_required',
    keywords: ['document', 'documents', 'required', 'papers', 'proof', 'aadhaar', 'pan', 'itr', 'salary slip', 'bank statement', 'photos', 'proofs'],
    phrases: ['documents required', 'papers needed', 'what documents', 'what papers'],
    response: {
      text: "📄 *Required Documents Checklist*\n\nKeep these documents ready for a fast-track application:\n\n• *KYC Proofs*: Aadhaar Card, PAN Card, and Voter ID / Passport\n• *Income Proof (Salaried)*: Last 3 months' salary slips, Form 16, and 6 months' bank statements\n• *Income Proof (Self-Employed)*: Last 2-3 years' IT Returns with Balance Sheet, and 6-12 months' business bank statements\n• *Address Proof*: Utility bills, rent agreement, or passport\n• *Photos*: 2 passport-size photographs",
      quickReplies: ['Apply Now', 'Contact Us', 'Back to Menu']
    }
  },
  {
    id: 'calculate_emi',
    keywords: ['emi', 'calculator', 'calculate', 'monthly', 'installment', 'payment', 'emis', 'calculation'],
    phrases: ['calculate emi', 'emi calculator', 'monthly payment', 'how much emi'],
    response: {
      text: "🧮 *EMI Calculation & Planning*\n\nWe recommend using our online *EMI Calculator* to plan your finances:\n\n1. Go to the *EMI Calculator* page in the menu.\n2. Input your desired Loan Amount, Interest Rate, and Tenure.\n3. View your instant monthly breakups, interest splits, and amortization schedule.",
      quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Check Rates']
    }
  },
  {
    id: 'apply_now',
    keywords: ['apply', 'applying', 'online application', 'start application', 'process', 'submit', 'applies'],
    phrases: ['apply now', 'how to apply', 'start loan', 'apply loan'],
    response: {
      text: "🎯 *Ready to Start Your Application?*\n\nYou can easily apply through our platform:\n\n1. Register or Log in to your *CS Smart Finserve* account.\n2. Go to the dashboard and click *New Application*.\n3. Choose your loan type, fill details, and upload your documents.\n\n*Need live assistance?* Call our loan expert: *+91 78388 25521*",
      quickReplies: ['Login / Signup', 'Home Loan', 'Personal Loan', 'Contact Us']
    }
  },
  {
    id: 'contact_us',
    keywords: ['contact', 'call', 'phone', 'mobile', 'email', 'support', 'helpdesk', 'office', 'gurgaon', 'gurugram', 'address', 'location', 'number', 'mail'],
    phrases: ['contact us', 'phone number', 'email address', 'where are you located', 'call support'],
    response: {
      text: "📞 *Contact Support & Location Details*\n\nWe are here to assist you!\n\n• *Phone Support*: +91 78388 25521\n• *Email*: krishan.pal1986@gmail.com\n• *Head Office*: Sco 45, 2nd Floor, Vyapar Sadan, Sector 14, Gurgaon, Haryana 122001\n• *Working Hours*: Monday to Saturday: 9:00 AM – 6:00 PM (Sunday Closed)",
      quickReplies: ['Book Appointment', 'Back to Menu']
    }
  },
  {
    id: 'timings_working_hours',
    keywords: ['hours', 'timings', 'timing', 'time', 'open', 'schedule', 'sunday', 'saturday', 'close', 'days'],
    phrases: ['working hours', 'office timings', 'are you open', 'when do you close'],
    response: {
      text: "⏰ *Office & Support Timings*\n\n• *Monday to Saturday*: 9:00 AM – 6:00 PM\n• *Sunday*: Closed\n\nFor urgent loan assistance during off-hours, you can leave a request on our contact page, and we will get back to you first thing on Monday morning!",
      quickReplies: ['Contact Us', 'Book Appointment', 'Back to Menu']
    }
  },
  {
    id: 'book_appointment',
    keywords: ['appointment', 'consultation', 'consult', 'meet', 'schedule', 'book', 'slot', 'appointments'],
    phrases: ['book appointment', 'schedule call', 'meet manager'],
    response: {
      text: "📅 *Book a Free Consultation*\n\nGet a 1-on-1 session with our loan advisor:\n\n1. Visit the *Book Appointment* tab in our menu.\n2. Choose your preferred date, time slot, and loan category.\n3. Our executive will call you to confirm your schedule.\n\n*Or call immediately*: +91 78388 25521",
      quickReplies: ['Contact Us', 'Back to Menu']
    }
  },
  {
    id: 'cibil_score',
    keywords: ['cibil', 'credit', 'score', 'report', 'history', 'scores', 'cibils'],
    phrases: ['cibil score', 'check cibil', 'credit score rating', 'what is cibil'],
    response: {
      text: "📊 *CIBIL / Credit Score Check*\n\nYour credit score represents your creditworthiness:\n\n• *Excellent*: 750+ (Fast approval & lowest interest rates)\n• *Good*: 650–749 (Smooth approvals, standard rates)\n• *Fair*: 550–649 (May require collateral or co-applicant)\n\nYou can perform a CIBIL check on our *Cibil Check* page!",
      quickReplies: ['Check Eligibility', 'Check Rates', 'Back to Menu']
    }
  },
  {
    id: 'track_application',
    keywords: ['track', 'status', 'progress', 'tracking', 'applications'],
    phrases: ['track application', 'check loan status', 'where is my application'],
    response: {
      text: "🔍 *Track Application Status*\n\nTo view the real-time progress of your applications:\n\n1. Log in to your account.\n2. Access the *Dashboard*.\n3. Under \"My Applications\", you'll see steps (Documents Uploaded $\rightarrow$ Verification $\rightarrow$ Approved $\rightarrow$ Disbursed) and live updates.",
      quickReplies: ['Login / Signup', 'Contact Us', 'Back to Menu']
    }
  },
  {
    id: 'login_signup_help',
    keywords: ['login', 'signup', 'register', 'sign-in', 'signin', 'sign-up', 'password', 'reset', 'account', 'accounts'],
    phrases: ['how to login', 'cannot login', 'sign up account', 'create account'],
    response: {
      text: "🔐 *Account & Access Support*\n\n• *Login / Sign Up*: Go to the *Log In* or *Sign Up* links in the top header.\n• *Errors*: If you encounter a login issue, clear browser cache or try private mode.\n• *Forgotten Passwords*: Click \"Forgot Password?\" on the login page to send a reset link to your registered email.",
      quickReplies: ['Login / Signup', 'Contact Us', 'Back to Menu']
    }
  },
  {
    id: 'fallback_menu',
    keywords: ['menu', 'back to menu', 'back', 'help', 'options', 'start over'],
    phrases: ['go back', 'main menu', 'show options'],
    response: {
      text: "What would you like help with today?",
      quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Insurance', 'Contact Us']
    }
  }
];

const getBotResponse = (userInput) => {
  const inp = userInput.toLowerCase().trim();

  if (!inp) {
    return {
      text: "I didn't catch that. Could you please ask something about loans, interest rates, or insurance?",
      quickReplies: ['Home Loan', 'Check Rates', 'Contact Us', 'Back to Menu']
    };
  }

  // 1. Check for exact phrase matches first
  for (const intent of INTENTS) {
    if (intent.phrases) {
      for (const phrase of intent.phrases) {
        if (inp.includes(phrase)) {
          return intent.response;
        }
      }
    }
  }

  // 2. Score intents based on keyword hits
  let bestIntent = null;
  let highestScore = 0;

  // Split input into words and remove symbols
  const words = inp.replace(/[^\w\s]/g, '').split(/\s+/);

  for (const intent of INTENTS) {
    let score = 0;
    
    // Check keyword hits
    for (const keyword of intent.keywords) {
      if (words.includes(keyword)) {
        score += 2; // Exact word match
      } else if (inp.includes(keyword)) {
        score += 1; // Substring match
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  }

  // 3. Return the best intent if score is high enough
  if (bestIntent && highestScore >= 2) {
    return bestIntent.response;
  }

  // 4. Default fallback: Search for nearby topics based on single keyword matches, or generic menu
  const matches = [];
  for (const intent of INTENTS) {
    // Skip greetings and gestures for matches
    if (['greetings', 'goodbyes', 'thanks', 'welcome', 'how_are_you', 'sorry_apology', 'fallback_menu'].includes(intent.id)) continue;
    
    for (const keyword of intent.keywords) {
      if (inp.includes(keyword)) {
        matches.push(intent);
        break;
      }
    }
  }

  if (matches.length > 0) {
    // Construct response with closest matches
    const topics = matches.map(m => m.id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
    return {
      text: `I noticed you might be asking about *${topics.slice(0, 2).join(' or ')}*.\n\nCould you please clarify your question, or choose one of these options?`,
      quickReplies: matches.slice(0, 3).map(m => m.id.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
    };
  }

  // Generic menu fallback
  return {
    text: "I'm not sure I fully understand that question. 🤖\n\nI can help you with:\n\n🏠 *Home Loans* · 🚗 *Car Loans*\n💰 *Personal Loans* · 🏢 *Business Loans*\n🛡️ *General Insurance* · 💹 *Interest Rates*\n📋 *Basic Eligibility* · 📄 *Required Documents*\n\nWhat would you like to know?",
    quickReplies: ['Home Loan', 'Car Loan', 'Personal Loan', 'Check Rates', 'Contact Us']
  };
};

/* ── Format bot text with bold formatting ── */
const formatText = (text) => {
  return text.split('\n').map((line, i) => {
    // Split by either ** or * to allow formatting
    const parts = line.split(/(\*\*?[^*]+\*\*?)/g);
    return (
      <span key={i}>
        {parts.map((p, j) => {
          if (p.startsWith('**') && p.endsWith('**')) {
            return <strong key={j}>{p.slice(2, -2)}</strong>;
          } else if (p.startsWith('*') && p.endsWith('*')) {
            return <strong key={j}>{p.slice(1, -1)}</strong>;
          }
          return p;
        })}
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
      // Map display name to intent parameter
      let query = text;
      if (text === 'Login / Signup') query = 'login signup help';
      const r = getBotResponse(query);
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
        
        .cs-chatbot-window {
          width: 380px;
          height: 600px;
          max-height: calc(100vh - 100px);
        }
        @media (max-width: 480px) {
          .cs-chatbot-container {
            bottom: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none;
          }
          .cs-chatbot-container > * {
            pointer-events: auto;
          }
          .cs-chatbot-window {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
            bottom: 0 !important;
            right: 0 !important;
            position: fixed !important;
          }
        }
      `}</style>

      <div className="cs-chatbot-container" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999 }}>

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
              className="cs-chatbot-window"
              style={{ background: 'white', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

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
