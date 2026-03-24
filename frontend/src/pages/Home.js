import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';

/* ── Dark luxury theme ───────────────────────────────────────
   Base:      #111111  (near black)
   Alt:       #1a1a1a  (dark surface)
   Card:      #1e1e1e
   Accent:    #c0392b  (brand red — unchanged)
   Text:      #f5f5f5 / #a0a0a0
──────────────────────────────────────────────────────────── */

const partnerLogos = [
  { name: 'HDFC Bank', color: '#4d9de0', svg: <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><rect x="2" y="8" width="6" height="24" fill="currentColor"/><rect x="2" y="18" width="16" height="4" fill="currentColor"/><rect x="12" y="8" width="6" height="24" fill="currentColor"/><text x="26" y="28" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="currentColor">HDFC</text><text x="26" y="38" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text></svg> },
  { name: 'ICICI Bank', color: '#f5a623', svg: <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><circle cx="12" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3"/><circle cx="12" cy="20" r="4" fill="currentColor"/><text x="28" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="currentColor">ICICI</text><text x="28" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text></svg> },
  { name: 'Axis Bank', color: '#e05c8a', svg: <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><polygon points="12,8 22,32 2,32" fill="none" stroke="currentColor" strokeWidth="2.5"/><text x="28" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="currentColor">AXIS</text><text x="28" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text></svg> },
  { name: 'Bajaj Finserv', color: '#6b8cff', svg: <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><rect x="2" y="10" width="18" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5"/><rect x="6" y="14" width="10" height="5" rx="1" fill="currentColor"/><text x="26" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="12" fill="currentColor">BAJAJ</text><text x="26" y="35" fontFamily="Arial,sans-serif" fontSize="9" fill="currentColor" opacity="0.8">FINSERV</text></svg> },
  { name: 'IDFC First Bank', color: '#e05c5c', svg: <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><rect x="2" y="8" width="5" height="24" fill="currentColor"/><text x="14" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="13" fill="currentColor">IDFC</text><text x="14" y="36" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">FIRST BANK</text></svg> },
  { name: 'Yes Bank', color: '#5bc0eb', svg: <svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><path d="M4 8 L14 22 L14 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M24 8 L14 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><text x="32" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="14" fill="currentColor">YES</text><text x="32" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text></svg> },
  { name: 'LIC', color: '#5cb85c', svg: <svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><path d="M4 8 L4 28 L16 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><rect x="22" y="8" width="5" height="20" fill="currentColor"/><path d="M34 8 Q46 8 46 18 Q46 28 34 28 L32 28 L32 8 Z" fill="none" stroke="currentColor" strokeWidth="2.5"/><text x="4" y="38" fontFamily="Arial,sans-serif" fontSize="7" fill="currentColor" opacity="0.7">LIFE INSURANCE CORP.</text></svg> },
  { name: 'Indian Bank', color: '#7ab8f5', svg: <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><polygon points="14,6 26,6 28,12 12,12" fill="currentColor" opacity="0.9"/><rect x="14" y="12" width="12" height="16" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="10" y="28" width="20" height="3" fill="currentColor"/><text x="36" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">INDIAN</text><text x="36" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text></svg> },
  { name: 'Bank of Baroda', color: '#f5a623', svg: <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><circle cx="14" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="2.5"/><circle cx="14" cy="20" r="5" fill="currentColor"/><text x="32" y="22" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">BANK OF</text><text x="32" y="33" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">BARODA</text></svg> },
  { name: 'Union Bank', color: '#6b8cff', svg: <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><path d="M6 8 L6 24 Q6 32 14 32 Q22 32 22 24 L22 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><text x="30" y="22" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">UNION</text><text x="30" y="33" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK OF INDIA</text></svg> },
  { name: 'Poonawalla Fincorp', color: '#5bc0eb', svg: <svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><circle cx="12" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="2.5"/><circle cx="12" cy="16" r="3" fill="currentColor"/><text x="26" y="20" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="10" fill="currentColor">POONAWALLA</text><text x="26" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">FINCORP</text></svg> },
  { name: 'Chola Finance', color: '#e05c5c', svg: <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="90" height="30"><path d="M20 10 Q6 10 6 20 Q6 30 20 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><text x="28" y="22" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="12" fill="currentColor">CHOLA</text><text x="28" y="33" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">FINANCE</text></svg> },
];

const loanSlides = [
  {
    label: 'Car Loan',
    tag: 'From 7.5% p.a.',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=85',
    link: '/auto-loan',
  },
  {
    label: 'Home Loan',
    tag: 'Up to ₹5 Crore',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=85',
    link: '/home-loan',
  },
  {
    label: 'Business Loan',
    tag: 'Fast Approval',
    img: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=85',
    link: '/business-loan',
  },
  {
    label: 'Personal Loan',
    tag: 'No Collateral',
    img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=85',
    link: '/personal-loan',
  },
  {
    label: 'Insurance',
    tag: 'Best Premiums',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=85',
    link: '/insurance',
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % loanSlides.length), 3500);
    return () => clearInterval(t);
  }, []);
  const slide = loanSlides[current];
  return (
    <div className="relative w-full h-full flex flex-col gap-3">
      {/* Main rotating image */}
      <div className="relative rounded-2xl overflow-hidden flex-1 shadow-2xl" style={{ minHeight: '280px' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slide.img}
            alt={slide.label}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
        {/* Label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current + '-label'}
            className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <p className="text-white font-bold text-lg leading-tight">{slide.label}</p>
              <p className="text-white/70 text-xs mt-0.5">{slide.tag}</p>
            </div>
            <Link to={slide.link}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'rgba(192,57,43,0.85)', backdropFilter: 'blur(4px)' }}>
              Apply →
            </Link>
          </motion.div>
        </AnimatePresence>
        {/* Dot indicators */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {loanSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{ width: i === current ? '20px' : '6px', height: '6px', background: i === current ? '#c0392b' : 'rgba(255,255,255,0.5)' }} />
          ))}
        </div>
      </div>

      {/* Bottom mini-cards row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: '🏠', label: 'Home Loan', rate: '8.5%', link: '/home-loan' },
          { icon: '🚗', label: 'Car Loan', rate: '7.5%', link: '/auto-loan' },
          { icon: '💼', label: 'Business', rate: '12%', link: '/business-loan' },
        ].map((item, i) => (
          <Link key={i} to={item.link}
            className="rounded-xl p-3 text-center hover:scale-105 transition-all cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="text-xl mb-1">{item.icon}</div>
            <p className="text-white text-xs font-semibold leading-tight">{item.label}</p>
            <p className="text-white/60 text-xs mt-0.5">from {item.rate}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[600px] mt-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1600&q=90)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(10,10,20,0.88) 0%, rgba(10,10,20,0.75) 50%, rgba(10,10,20,0.45) 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">

          {/* LEFT — Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
              style={{ background: 'rgba(192,57,43,0.25)', color: '#fff', border: '1px solid rgba(192,57,43,0.5)' }}
            >
              Smart Finance. Trusted Partners.
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white leading-tight"
            >
              Smart Finance<br />Starts Here.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl mb-8 text-white/85"
            >
              From home loans to car loans — we find the best rates, fastest approvals, and simplest process. Your financial goals, our expertise.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/contact"
                className="inline-block px-8 py-4 bg-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
                style={{ boxShadow: '0 8px 32px rgba(192,57,43,0.35)' }}>
                Get Started Today
              </Link>
              <Link to="/emi-calculator"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">
                EMI Calculator
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap gap-6 sm:gap-10"
            >
              {[
                { value: '5,000+', label: 'Happy Customers' },
                { value: '50+', label: 'Banking Partners' },
                { value: '24hrs', label: 'Avg. Approval Time' },
                { value: '₹500Cr+', label: 'Loans Disbursed' },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 + i * 0.1 }} className="text-white">
                  <p className="text-2xl font-black leading-none">{stat.value}</p>
                  <p className="text-white/60 text-xs mt-0.5 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Auto-rotating loan showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col h-[420px]"
          >
            <HeroSlideshow />
          </motion.div>

        </div>
      </section>

      {/* ── Why CS Smart Finserve ────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-heading font-bold mb-4" style={{ color: "var(--text-primary)" }}>Why CS Smart Finserve?</h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              CS Smart Finserve that provides simple, affordable, and accessible financial products and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Car Loan ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>Auto Loan</span>
              <h2 className="text-4xl font-heading font-bold mb-6" style={{ color: "var(--text-primary)" }}>Drive Home Your Dream Car — Today.</h2>
              <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                Why wait? With CS Smart Finserve, getting a car loan is faster than ever. We compare 50+ lenders to get you the lowest EMI with zero hidden charges.
              </p>
              <div className="space-y-4 mb-8">
                {['Finance up to 100% of on-road price','Approval in as little as 2 hours','Flexible tenure from 1 to 7 years','Rates starting at just 7.5% p.a.'].map((point, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckIcon /><p style={{ color: "var(--text-secondary)" }}>{point}</p></div>
                ))}
              </div>
              <Link to="/auto-loan" className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Apply for Car Loan →
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center overflow-hidden rounded-2xl shadow-xl">
              <motion.img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=85" alt="Car Loan"
                className="w-full max-w-md object-cover h-80"
                whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Home Loan ────────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center order-2 lg:order-1 overflow-hidden rounded-2xl shadow-xl">
              <motion.img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=85" alt="Home Loan"
                className="w-full max-w-md object-cover h-80"
                whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>Home Loan</span>
              <h2 className="text-4xl font-heading font-bold mb-6" style={{ color: "var(--text-primary)" }}>Your Dream Home Is One Step Away.</h2>
              <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                Stop paying rent and start building equity. Our home loan experts guide you through every step — from eligibility to disbursement — making the process smooth and stress-free.
              </p>
              <div className="space-y-4 mb-8">
                {['Loans up to ₹5 Crore at lowest rates','Tenure up to 30 years for easy EMIs','Balance transfer with top-up facility','Tax benefits under Section 80C & 24B'].map((point, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckIcon /><p style={{ color: "var(--text-secondary)" }}>{point}</p></div>
                ))}
              </div>
              <Link to="/home-loan" className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Apply for Home Loan →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Insurance ────────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>General Insurance</span>
              <h2 className="text-4xl font-heading font-bold mb-6" style={{ color: "var(--text-primary)" }}>Protect What You've Built. Insure What You Love.</h2>
              <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                Life is unpredictable — your protection shouldn't be. From vehicle insurance to health and property coverage, we connect you with India's top insurers at the best premiums.
              </p>
              <div className="space-y-4 mb-8">
                {['Car, bike & commercial vehicle insurance','Health & family floater plans','Home & property insurance','Instant policy issuance online'].map((point, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckIcon /><p style={{ color: "var(--text-secondary)" }}>{point}</p></div>
                ))}
              </div>
              <Link to="/insurance" className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Explore Insurance Plans →
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center overflow-hidden rounded-2xl shadow-xl">
              <motion.img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=85" alt="Insurance"
                className="w-full max-w-md object-cover h-80"
                whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Services Grid ────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4" style={{ color: "var(--text-primary)" }}>Our Services</h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>One platform. Every financial solution you need — loans, insurance, and credit tools, all in one place.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Car Loans', desc: 'New or used — zero to keys in 24 hours. We compare 50+ lenders for the lowest EMI on any car.', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', link: '/auto-loan' },
              { title: 'Home Loans', desc: 'Stop paying rent. Start building equity. Loans up to ₹5 Cr with tenure up to 30 years.', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', link: '/home-loan' },
              { title: 'Business Loans', desc: 'Fuel your ambition. Fast working capital and term loans for businesses of every size.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', link: '/business-loan' },
              { title: 'Insurance', desc: "Car, health, home — we connect you with India's top insurers at the best premiums, instantly.", img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400', link: '/insurance' },
            ].map((service, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow border-2 border-transparent hover:border-accent group cursor-pointer"
                style={{ background: "var(--bg-card2)", border: "1px solid var(--border)" }}
              >
                <div className="overflow-hidden h-48">
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-accent transition-colors" style={{ color: "var(--text-primary)" }}>{service.title}</h3>
                  <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>{service.desc}</p>
                  <Link to={service.link} className="inline-block px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm hover:scale-105">More →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>Simple Process</span>
            <h2 className="text-4xl font-heading font-bold mb-4" style={{ color: "var(--text-primary)" }}>Get Your Loan in 3 Simple Steps</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>No branch visits. No paperwork piles. Just a fast, digital process from start to finish.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5" style={{ background: 'rgba(192,57,43,0.3)' }} />
            {[
              { step: '01', icon: '📋', title: 'Apply Online', desc: 'Fill a quick form with your basic details and loan requirement — takes under 2 minutes.' },
              { step: '02', icon: '🏦', title: 'Get Matched', desc: 'We compare offers from 50+ banks and NBFCs and present you the best rate for your profile.' },
              { step: '03', icon: '💰', title: 'Get Funded', desc: 'Documents verified, loan sanctioned, and funds disbursed — all within 24–48 hours.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center rounded-2xl p-8 hover:shadow-xl transition-all"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5 shadow-md"
                  style={{ background: "var(--step-bg)", border: "1px solid var(--step-border)" }}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#c0392b' }}>Step {item.step}</span>
                <h3 className="text-xl font-heading font-bold mb-3" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
              Start Your Application →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>Customer Stories</span>
            <h2 className="text-4xl font-heading font-bold mb-4" style={{ color: "var(--text-primary)" }}>What Our Customers Say</h2>
            <p style={{ color: "var(--text-secondary)" }}>Real people. Real loans. Real results.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rahul Sharma', role: 'Home Loan Customer', review: 'CS Smart Finserve made my home loan process incredibly smooth. Got sanctioned in 48 hours with a rate better than what my bank offered. Highly recommend!', rating: 5, avatar: '👨‍💼' },
              { name: 'Priya Mehta', role: 'Business Loan Customer', review: 'I needed working capital urgently for my business. The team found me the best offer within a day. No hidden charges, complete transparency throughout.', rating: 5, avatar: '👩‍💼' },
              { name: 'Amit Verma', role: 'Auto Loan Customer', review: 'Applied for a car loan on Saturday, got keys on Monday. The entire process was digital — no branch visits, no stress. Absolutely brilliant service.', rating: 5, avatar: '👨‍🔧' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col"
                style={{ background: "var(--bg-card2)", border: "1px solid var(--border)" }}>
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, s) => <FaStar key={s} className="text-yellow-400 text-sm" />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--text-secondary)" }}>"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(192,57,43,0.12)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIBIL Score ──────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>Free Credit Check</span>
              <h2 className="text-4xl font-heading font-bold mb-6" style={{ color: "var(--text-primary)" }}>Check Your CIBIL Score Instantly</h2>
              <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>Know your credit score before applying for a loan. A good CIBIL score gets you better interest rates and faster approvals.</p>
              <div className="space-y-4 mb-8">
                {['Free credit score check — no charges','Instant result in seconds','Improve your loan eligibility','Get personalized loan offers'].map((point, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckIcon /><p className="font-medium" style={{ color: "var(--text-secondary)" }}>{point}</p></div>
                ))}
              </div>
              <Link to="/cibil-check" className="inline-block px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Check My CIBIL Score →
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
              <div className="rounded-3xl p-10 w-full max-w-md shadow-xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="text-center mb-8">
                  <p className="text-sm font-medium mb-2 uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Your Credit Score</p>
                  <svg viewBox="0 0 200 120" className="w-64 mx-auto">
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border)" strokeWidth="16" strokeLinecap="round"/>
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#22c55e" strokeWidth="16" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="63"/>
                    <text x="100" y="90" textAnchor="middle" fontSize="32" fill="var(--text-primary)" fontWeight="bold">750</text>
                    <text x="100" y="110" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Excellent</text>
                  </svg>
                </div>
                <div className="space-y-3">
                  {[{ label: 'Poor', range: '300–549', color: 'bg-red-400', width: 'w-1/4' },{ label: 'Fair', range: '550–649', color: 'bg-yellow-400', width: 'w-2/4' },{ label: 'Good', range: '650–749', color: 'bg-blue-400', width: 'w-3/4' },{ label: 'Excellent', range: '750–900', color: 'bg-green-500', width: 'w-full' }].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`h-2 rounded-full ${item.color} ${item.width}`} />
                      <span className="text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{item.label} ({item.range})</span>
                    </div>
                  ))}
                </div>
                <Link to="/cibil-check" className="mt-8 w-full block text-center px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Check Your Score Free
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Partners ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold" style={{ color: "var(--text-primary)" }}>Our Partners from Across the Industry</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {partnerLogos.map((bank, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className="rounded-xl hover:shadow-lg transition-all flex flex-col items-center justify-center py-5 px-3 cursor-default group"
                style={{ minHeight: "110px", background: "var(--bg-card2)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-center" style={{ color: bank.color }}>{bank.svg}</div>
                <span className="text-xs font-semibold text-center leading-tight mt-3 transition-colors" style={{ color: "var(--text-muted)" }}>{bank.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "var(--bg-base)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: 'What documents are required for a loan?', a: 'Basic documents include ID proof, address proof, income proof, and bank statements for the last 6 months.' },
              { q: 'How long does the approval process take?', a: 'Our approval process typically takes 24-48 hours for most loan products.' },
              { q: 'What is the minimum CIBIL score required?', a: 'We recommend a CIBIL score of 650 or above for better approval chances and interest rates.' },
              { q: 'Can I prepay my loan?', a: 'Yes, you can prepay your loan. Terms and conditions apply based on the loan type.' },
            ].map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="rounded-xl overflow-hidden" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors hover:bg-white/5">
                  <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{faq.q}</span>
                  {openFaq === index ? <FaChevronUp className="text-accent" /> : <FaChevronDown style={{ color: '#555' }} />}
                </button>
                {openFaq === index && <div className="px-6 pb-4" style={{ color: "var(--text-secondary)" }}>{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
