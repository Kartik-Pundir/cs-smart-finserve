import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { FaCar, FaHeartbeat, FaHome, FaPlane, FaBriefcase, FaBuilding } from 'react-icons/fa';

const CheckIcon = () => (
  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#a8823a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
  </div>
);

const plans = [
  { icon: <FaCar />, title: 'Motor Insurance', desc: 'Car, bike & commercial vehicle. Third-party & comprehensive plans with instant issuance.', tags: ['Cars & Bikes', 'Commercial', 'Third-Party'] },
  { icon: <FaHeartbeat />, title: 'Health Insurance', desc: 'Individual, family floater & senior citizen plans. Cashless hospitalisation at 10,000+ hospitals.', tags: ['Individual', 'Family Floater', 'Senior Citizen'] },
  { icon: <FaHome />, title: 'Home Insurance', desc: 'Protect your home and contents against fire, flood, theft and natural calamities.', tags: ['Fire & Flood', 'Theft Cover', 'Contents'] },
  { icon: <FaPlane />, title: 'Travel Insurance', desc: 'Single trip & annual multi-trip plans. Medical emergency, trip cancellation, and baggage loss.', tags: ['Medical Cover', 'Trip Cancel', 'Baggage'] },
  { icon: <FaBriefcase />, title: 'Life Insurance', desc: "Term plans to secure your family's future at the most affordable premiums.", tags: ['Term Plans', 'High Cover', 'Tax Benefit'] },
  { icon: <FaBuilding />, title: 'Business Insurance', desc: 'Liability, fire, and burglary cover for shops, offices and commercial establishments.', tags: ['Liability', 'Fire Cover', 'Burglary'] },
];

const Insurance = () => {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', city: '', insuranceType: 'Motor Insurance', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/applications', { ...form, serviceType: 'General Insurance' });
      toast.success('Request submitted! Our team will contact you within 24 hours.');
      setForm({ fullName: '', email: '', phone: '', city: '', insuranceType: 'Motor Insurance', message: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="theme-bg" style={{minHeight: '100vh', paddingTop: 80, fontFamily: "'Inter', sans-serif"}}>

      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 420 }}>
        <img src="https://images.unsplash.com/photo-1585421514738-01798e348b17?w=1400&q=85" alt="Insurance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,20,0.95) 0%, rgba(168,130,58,0.75) 60%, rgba(10,10,20,0.5) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 980, margin: '0 auto', padding: '80px 28px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            <h1 style={{ fontSize: 40, fontWeight: 900, color: 'white', margin: 0, letterSpacing: -1.2, lineHeight: 1.15 }}>
              Protect What You've Built.<br />Insure What You Love.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginTop: 12, maxWidth: 440, lineHeight: 1.65 }}>
              From health to motor to home — we connect you with India's top insurers at the best premiums. Instant policy issuance.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="#get-quote" style={{ padding: '13px 28px', background: '#a8823a', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 20px rgba(168,130,58,0.35)' }}>Get a Quote →</a>
              <Link to="/contact" style={{ padding: '13px 28px', background: 'rgba(255,255,255,0.12)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}>Talk to an Expert</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '40px 28px 72px' }}>

        {/* Plan cards */}
        <div style={{ marginBottom: 48 }}>

          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 24px', letterSpacing: -0.5 }}>Insurance Plans We Offer</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {plans.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ background: 'linear-gradient(135deg, #a8823a 0%, #8d6b2c 100%)', borderRadius: 18, padding: '28px 22px', boxShadow: '0 8px 32px rgba(168,130,58,0.12)', position: 'relative', overflow: 'hidden', border: 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, fontSize: 20, color: 'white' }}>{p.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: 'white', margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 0 14px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.2)' }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why us */}
        <div style={{ background: 'white', borderRadius: 24, padding: '36px 40px', marginBottom: 28, boxShadow: '0 2px 16px rgba(15,23,42,0.05)' }}>

          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 24px' }}>Why get insurance through us?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {['Compare 20+ insurers instantly', 'Lowest premiums guaranteed', 'Instant policy issuance online', 'Dedicated claim support team', 'Cashless hospitalisation at 10,000+ hospitals', 'Tax benefits under Section 80D'].map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckIcon />
                <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote form */}
        <motion.div id="get-quote" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px rgba(15,23,42,0.08)' }}>
          <div style={{ padding: '32px 40px 24px', borderBottom: '1px solid #f1f5f9' }}>

            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: 0 }}>Get your insurance quote today</h2>
            <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Our team will reach out within 24 hours with the best plan for you.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: '28px 40px 36px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'Full Name *', key: 'fullName', type: 'text' },
                { label: 'Phone Number *', key: 'phone', type: 'tel' },
                { label: 'Email Address *', key: 'email', type: 'email' },
                { label: 'City *', key: 'city', type: 'text' },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} value={form[f.key]} required onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#0f172a', background: '#f8f7f4', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#a8823a'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Insurance Type *</label>
              <select value={form.insuranceType} onChange={e => setForm({ ...form, insuranceType: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#0f172a', background: '#f8f7f4', outline: 'none' }}>
                {plans.map(p => <option key={p.title}>{p.title}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '14px 0', background: loading ? '#e2e8f0' : '#a8823a', color: loading ? '#94a3b8' : 'white', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: 0.3 }}>
              {loading ? 'Submitting...' : 'Request Free Quote →'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Insurance;
