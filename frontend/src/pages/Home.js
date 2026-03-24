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

// Real bank logos — Wikipedia PNG thumbnails (verified correct filenames)
const partnerLogos = [
  { name: 'HDFC Bank',          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png' },
  { name: 'ICICI Bank',         img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png' },
  { name: 'Axis Bank',          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/AXISBank_Logo.svg/200px-AXISBank_Logo.svg.png' },
  { name: 'Bajaj Finserv',      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bajaj_Finserv_Logo.svg/200px-Bajaj_Finserv_Logo.svg.png' },
  { name: 'IDFC First Bank',    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/IDFC_FIRST_Bank_Logo.svg/200px-IDFC_FIRST_Bank_Logo.svg.png' },
  { name: 'Yes Bank',           img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Yes_Bank_SVG_Logo.svg/200px-Yes_Bank_SVG_Logo.svg.png' },
  { name: 'LIC',                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LIC_India_logo.svg/200px-LIC_India_logo.svg.png' },
  { name: 'Indian Bank',        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Indian_Bank_Logo.svg/200px-Indian_Bank_Logo.svg.png' },
  { name: 'Bank of Baroda',     img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bank_of_Baroda_logo.svg/200px-Bank_of_Baroda_logo.svg.png' },
  { name: 'Tata Capital',       img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png' },
  { name: 'Poonawalla Fincorp', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Poonawalla_Fincorp_Logo.png/200px-Poonawalla_Fincorp_Logo.png' },
  { name: 'Chola Finance',      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Cholamandalam_Investment_and_Finance_Company_Logo.png/200px-Cholamandalam_Investment_and_Finance_Company_Logo.png' },
];

const heroSlides = [
  {
    line2: 'Starts Here.',
    sub: 'From home loans to car loans — we find the best rates, fastest approvals, and simplest process.',
    tag: 'Smart Finance. Trusted Partners.',
    img: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=85',
    label: 'Smart Finance',
    rate: 'Your Trusted Partner',
    link: '/contact',
    cta: 'Get Started Today',
  },
  {
    line2: 'Home Loans.',
    sub: 'Stop paying rent. Loans up to ₹5 Crore at the lowest rates with tenure up to 30 years.',
    tag: 'Lowest Interest Rates',
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=85',
    label: 'Home Loan',
    rate: 'from 8.5% p.a.',
    link: '/home-loan',
    cta: 'Apply for Home Loan',
  },
  {
    line2: 'Car Loans.',
    sub: 'Zero to keys in 24 hours. Finance up to 100% on-road price across 50+ lenders.',
    tag: 'Fastest Approval',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=85',
    label: 'Car Loan',
    rate: 'from 7.5% p.a.',
    link: '/auto-loan',
    cta: 'Apply for Car Loan',
  },
  {
    line2: 'Business Loans.',
    sub: 'Fuel your ambition. Fast working capital and term loans for businesses of every size.',
    tag: 'Quick Disbursal',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=85',
    label: 'Business Loan',
    rate: 'from 12% p.a.',
    link: '/business-loan',
    cta: 'Apply for Business Loan',
  },
  {
    line2: 'Personal Loans.',
    sub: 'Instant funds with no collateral. Get approved in hours for any personal need.',
    tag: 'No Collateral Needed',
    img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=85',
    label: 'Personal Loan',
    rate: 'from 10.5% p.a.',
    link: '/personal-loan',
    cta: 'Apply for Personal Loan',
  },
  {
    line2: 'Used Car Loans.',
    sub: 'Smarter finance on pre-owned cars. Best rates, quick processing, flexible tenure.',
    tag: 'Pre-Owned Cars',
    img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=85',
    label: 'Used Car Loan',
    rate: 'from 9% p.a.',
    link: '/used-car-loan',
    cta: 'Apply for Used Car Loan',
  },
  {
    line2: 'Loan Against Property.',
    sub: "Unlock your property's value. Get high-value loans against residential or commercial property.",
    tag: 'High Value Loans',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=85',
    label: 'Loan Against Property',
    rate: 'from 9.5% p.a.',
    link: '/loan-against-property',
    cta: 'Apply Now',
  },
  {
    line2: 'General Insurance.',
    sub: "Car, health, home — India's top insurers at the best premiums. Instant policy issuance.",
    tag: 'Best Premiums',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=85',
    label: 'Insurance',
    rate: 'Best Rates',
    link: '/insurance',
    cta: 'Explore Insurance',
  },
];

const CheckIcon = () => (
  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroSlides.length), 3800);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[heroIdx];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[600px] mt-20 overflow-hidden">
        {/* Background — always the dark car image */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1600&q=90)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.80) 50%, rgba(10,10,20,0.50) 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">

          {/* LEFT — Text */}
          <div>
            {/* Cycling tag */}
            <AnimatePresence mode="wait">
              <motion.span
                key={heroIdx + '-tag'}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ background: 'rgba(192,57,43,0.25)', color: '#fff', border: '1px solid rgba(192,57,43,0.5)' }}
              >
                {slide.tag}
              </motion.span>
            </AnimatePresence>

            {/* Heading — "Smart Finance" fixed, line 2 cycles */}
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white leading-tight">
              Smart Finance<br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroIdx + '-line2'}
                  initial={{ opacity: 0, y: 24, clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                  exit={{ opacity: 0, y: -20, clipPath: 'inset(100% 0 0% 0)' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="inline-block"
                  style={{ color: heroIdx === 0 ? '#fff' : '#e05c5c' }}
                >
                  {slide.line2}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Cycling subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={heroIdx + '-sub'}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-lg mb-8 text-white/85"
              >
                {slide.sub}
              </motion.p>
            </AnimatePresence>

            {/* CTA buttons */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx + '-cta'}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link to={slide.link}
                  className="inline-block px-8 py-4 bg-accent text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
                  style={{ boxShadow: '0 8px 32px rgba(192,57,43,0.35)' }}>
                  {slide.cta}
                </Link>
                <Link to="/emi-calculator"
                  className="inline-block px-8 py-4 rounded-xl font-semibold text-lg text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">
                  EMI Calculator
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="flex gap-2 mb-8">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setHeroIdx(i)}
                  className="rounded-full transition-all"
                  style={{ height: '6px', width: i === heroIdx ? '24px' : '6px', background: i === heroIdx ? '#c0392b' : 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10">
              {[
                { value: '5,000+', label: 'Happy Customers' },
                { value: '50+', label: 'Banking Partners' },
                { value: '24hrs', label: 'Avg. Approval Time' },
                { value: '₹500Cr+', label: 'Loans Disbursed' },
              ].map((stat, i) => (
                <div key={i} className="text-white">
                  <p className="text-2xl font-black leading-none">{stat.value}</p>
                  <p className="text-white/60 text-xs mt-0.5 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Synced photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col h-[420px]"
          >
            <div className="relative w-full h-full flex flex-col gap-3">
              {/* Main synced image */}
              <div className="relative rounded-2xl overflow-hidden flex-1 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroIdx + '-img'}
                    src={slide.img}
                    alt={slide.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroIdx + '-overlay'}
                    className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">{slide.label}</p>
                      <p className="text-white/70 text-xs mt-0.5">{slide.rate}</p>
                    </div>
                    <Link to={slide.link}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
                      style={{ background: 'rgba(192,57,43,0.85)', backdropFilter: 'blur(4px)' }}>
                      Apply →
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom service pills */}
              <div className="grid grid-cols-4 gap-2">
                {heroSlides.slice(1).map((s, i) => (
                  <button key={i} onClick={() => setHeroIdx(i + 1)}
                    className="rounded-xl p-2 text-center transition-all hover:scale-105"
                    style={{
                      background: heroIdx === i + 1 ? 'rgba(192,57,43,0.7)' : 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: heroIdx === i + 1 ? '1px solid rgba(192,57,43,0.8)' : '1px solid rgba(255,255,255,0.15)'
                    }}>
                    <p className="text-white text-xs font-semibold leading-tight">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Why CS Smart Finserve ────────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: "var(--bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top — heading left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                style={{ background: "var(--badge-bg)", color: "var(--badge-color)", border: "1px solid var(--badge-border)" }}>
                Why Choose Us
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                Why CS Smart<br />Finserve?
              </h2>
            </motion.div>
            <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-lg leading-relaxed lg:pb-2" style={{ color: "var(--text-secondary)" }}>
              CS Smart Finserve that provides simple, affordable, and accessible financial products and services.
            </motion.p>
          </div>

          {/* Feature cards — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '🏦', title: '50+ Banking Partners', desc: 'We work with India\'s top banks and NBFCs to compare hundreds of offers and get you the best rate for your profile.' },
              { icon: '⚡', title: '24-Hour Approvals', desc: 'Our streamlined digital process means most loans get sanctioned within 24 hours — no branch visits, no paperwork piles.' },
              { icon: '🔒', title: 'Zero Hidden Charges', desc: 'Complete transparency from day one. The rate we quote is the rate you get — no processing fee surprises.' },
              { icon: '📊', title: 'Free CIBIL Check', desc: 'Know your credit score before you apply. We help you understand and improve your eligibility at no cost.' },
              { icon: '🤝', title: 'Dedicated Advisor', desc: 'Every customer gets a personal loan advisor who guides you from application to disbursement, step by step.' },
              { icon: '📱', title: 'Fully Digital Process', desc: 'Apply, upload documents, and track your loan status — all from your phone. No office visits required.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "var(--badge-bg)", border: "1px solid var(--badge-border)" }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 group-hover:text-accent transition-colors"
                  style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom stats bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            style={{ background: 'linear-gradient(135deg, #c0392b 0%, #922b21 100%)' }}>
            {[
              { value: '5,000+', label: 'Happy Customers' },
              { value: '50+',    label: 'Banking Partners' },
              { value: '24 hrs', label: 'Avg. Approval Time' },
              { value: '₹500Cr+', label: 'Loans Disbursed' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-black text-white leading-none">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
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
              { title: 'Business Loans', desc: 'Fuel your ambition. Fast working capital and term loans for businesses of every size.', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400', link: '/business-loan' },
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
              {
                name: 'Deepak Chauhan',
                role: 'Home Loan · Gurgaon',
                review: 'Honestly was skeptical at first — my bank had already rejected me once. Kartik bhai helped me understand why and fixed my application. Got ₹42L sanctioned from HDFC at 8.65%. Took about 6 days total.',
                rating: 5,
                date: 'March 2025',
                loan: '₹42L Home Loan',
              },
              {
                name: 'Sunita Rawat',
                role: 'Personal Loan · Delhi NCR',
                review: 'Needed money quickly for my daughter\'s college fees. The team was very helpful and didn\'t make me feel embarrassed about my situation. Got ₹3.5L in 2 days. Interest rate was fair, no hidden fees.',
                rating: 4,
                date: 'January 2025',
                loan: '₹3.5L Personal Loan',
              },
              {
                name: 'Manish Tomar',
                role: 'Car Loan · Faridabad',
                review: 'Bought a pre-owned BMW 3 Series. Wasn\'t sure if I\'d get financing on a used luxury car but CS Smart Finserve got it done through Chola Finance. EMI is comfortable and the whole thing was sorted in 3 days.',
                rating: 5,
                date: 'February 2025',
                loan: 'Used Car Loan',
              },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="rounded-2xl p-7 hover:shadow-xl transition-all flex flex-col"
                style={{ background: "var(--bg-card2)", border: "1px solid var(--border)" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array(5).fill(0).map((_, s) => (
                    <FaStar key={s} className="text-sm" style={{ color: s < t.rating ? '#f59e0b' : 'var(--border)' }} />
                  ))}
                  <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>{t.date}</span>
                </div>
                {/* Loan tag */}
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 w-fit"
                  style={{ background: 'rgba(192,57,43,0.1)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)' }}>
                  {t.loan}
                </span>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  {/* Avatar with initials */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: ['#1a5276','#6c3483','#1e8449'][i] }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                  {/* Verified badge */}
                  <div className="ml-auto flex items-center gap-1 text-xs font-medium" style={{ color: '#16a34a' }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Verified
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
              <motion.div key={index}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className="rounded-2xl flex flex-col items-center justify-center gap-3 py-6 px-4 hover:shadow-md transition-all"
                style={{ minHeight: '120px', background: '#ffffff', border: '1px solid #e5e7eb' }}>
                <div className="flex items-center justify-center" style={{ height: '52px', width: '100%' }}>
                  <img
                    src={bank.img}
                    alt={bank.name}
                    style={{ maxHeight: '52px', maxWidth: '120px', width: 'auto', height: 'auto', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback: name text badge */}
                  <div className="hidden items-center justify-center rounded-lg px-3 py-2 text-white text-xs font-black text-center"
                    style={{ background: '#c0392b', minWidth: '80px' }}>
                    {bank.name}
                  </div>
                </div>
                <span className="text-xs font-medium text-center leading-tight" style={{ color: '#9ca3af' }}>{bank.name}</span>
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
