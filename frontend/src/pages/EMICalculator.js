import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaHome, FaCar, FaUser, FaBriefcase, FaCoffee, FaCalendarAlt, FaCalendar, FaUniversity } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const fmt  = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const ACCENT = '#a8823a';

/* ── Animated counter ── */
function AnimatedNumber({ value, prefix = '₹' }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) cancelAnimationFrame(ref.current);
    const start = display, end = value, dur = 500, startTime = performance.now();
    const step = (now) => {
      const p = Math.min((now - startTime) / dur, 1);
      setDisplay(Math.round(start + (end - start) * p));
      if (p < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  return <span>{prefix}{Number(display).toLocaleString('en-IN')}</span>;
}

/* ── Slider ── */
function Slider({ label, value, min, max, step, onChange, display, lo, hi }) {
  const pct = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>{display}</span>
      </div>
      <div style={{ position: 'relative', height: 6, borderRadius: 99 }}>
        <div style={{ position: 'absolute', inset: 0, background: '#e2e8f0', borderRadius: 99 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${ACCENT}aa,${ACCENT})`, borderRadius: 99 }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: `calc(${pct}% - 11px)`, width: 22, height: 22, borderRadius: '50%', background: 'white', border: `3px solid ${ACCENT}`, boxShadow: '0 2px 8px rgba(168,130,58,0.25)', pointerEvents: 'none' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: '#cbd5e1' }}>{lo}</span>
        <span style={{ fontSize: 11, color: '#cbd5e1' }}>{hi}</span>
      </div>
    </div>
  );
}

const PRESETS = [
  { label: 'Home Loan',     icon: <FaHome />, amount: 3000000, rate: 8.5,  tenure: 240 },
  { label: 'Car Loan',      icon: <FaCar />, amount: 800000,  rate: 9.0,  tenure: 84  },
  { label: 'Personal Loan', icon: <FaUser />, amount: 500000,  rate: 12.0, tenure: 36  },
  { label: 'Business Loan', icon: <FaBriefcase />, amount: 2000000, rate: 11.0, tenure: 60  },
];

export default function EMICalculator() {
  const [amount,  setAmount]  = useState(2000000);
  const [rate,    setRate]    = useState(8.5);
  const [tenure,  setTenure]  = useState(240);
  const [emi,     setEmi]     = useState(0);
  const [totInt,  setTotInt]  = useState(0);
  const [totPay,  setTotPay]  = useState(0);
  const [active,  setActive]  = useState(0);

  const calc = useCallback(() => {
    const r = rate / 12 / 100, n = tenure;
    if (!amount || !r || !n) return;
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tp = e * n;
    setEmi(Math.round(e)); setTotPay(Math.round(tp)); setTotInt(Math.round(tp - amount));
  }, [amount, rate, tenure]);

  useEffect(() => { calc(); }, [calc]);

  const applyPreset = (p, i) => { setAmount(p.amount); setRate(p.rate); setTenure(p.tenure); setActive(i); };

  const principalPct = totPay > 0 ? Math.round((amount / totPay) * 100) : 0;

  /* year-by-year bar data */
  const yearLabels = [], principalArr = [], interestArr = [];
  if (emi > 0) {
    let bal = amount, r = rate / 12 / 100;
    const years = Math.ceil(tenure / 12);
    for (let y = 1; y <= Math.min(years, 10); y++) {
      let yPrin = 0, yInt = 0;
      const months = y === years ? (tenure % 12 || 12) : 12;
      for (let m = 0; m < months && bal > 0; m++) {
        const int = Math.round(bal * r), prin = Math.min(Math.round(emi - int), bal);
        yInt += int; yPrin += prin; bal = Math.max(0, bal - prin);
      }
      yearLabels.push(`Yr ${y}`); principalArr.push(yPrin); interestArr.push(yInt);
    }
  }

  const amort = [];
  if (emi > 0) {
    let bal = amount, r = rate / 12 / 100;
    for (let m = 1; m <= Math.min(tenure, 12); m++) {
      const int = Math.round(bal * r), prin = Math.round(emi - int);
      bal = Math.max(0, Math.round(bal - prin));
      amort.push({ m, int, prin, bal });
    }
  }

  return (
    <div className="theme-bg" style={{minHeight: '100vh', paddingTop: 80}}>

      {/* ── HERO with house photo ── */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
        <img
          src="/assets/premium_property.png"
          alt="Dream home"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.75) 50%, rgba(15,23,42,0.4) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 980, margin: '0 auto', padding: '52px 28px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            <h1 style={{ fontSize: 42, fontWeight: 900, color: 'white', margin: 0, letterSpacing: -1.5, lineHeight: 1.15 }}>
              Know Your EMI<br />Before You Apply
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, marginTop: 12, maxWidth: 400, lineHeight: 1.65 }}>
              Adjust loan amount, interest rate and tenure — your EMI updates live. No sign-up needed.
            </p>

            {/* Live stats in hero */}
            <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap' }}>
              {[
                { label: 'Monthly EMI', val: fmt(emi) },
                { label: 'Total Interest', val: fmt(totInt) },
                { label: 'Daily Cost', val: `₹${Math.round(emi / 30).toLocaleString('en-IN')}` },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '14px 20px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: '0 0 4px', fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: 'white', margin: 0 }}>{s.val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '28px 28px 72px' }}>

        {/* ── Presets ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          {PRESETS.map((p, i) => (
            <button key={i} onClick={() => applyPreset(p, i)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 100,
              border: active === i ? `1.5px solid ${ACCENT}` : '1.5px solid #e2e8f0',
              background: active === i ? '#fff1f0' : 'white',
              color: active === i ? ACCENT : '#64748b',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .18s',
              boxShadow: active === i ? `0 0 0 3px rgba(168,130,58,0.08)` : 'none',
            }}>
              <span>{p.icon}</span>{p.label}
            </button>
          ))}
        </div>

        {/* ── Main card ── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'white', borderRadius: 24, boxShadow: '0 4px 32px rgba(15,23,42,0.08)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 340px' }}>

          {/* Inputs */}
          <div style={{ padding: '40px 44px', borderRight: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 32 }}>Adjust Your Loan</p>
            <Slider label="Loan Amount" value={amount} min={100000} max={10000000} step={50000} onChange={setAmount} display={fmt(amount)} lo="₹1 L" hi="₹1 Cr" />
            <Slider label="Interest Rate (% p.a.)" value={rate} min={5} max={24} step={0.1} onChange={setRate} display={`${Number(rate).toFixed(1)}%`} lo="5%" hi="24%" />
            <Slider label="Loan Tenure" value={tenure} min={6} max={360} step={6} onChange={setTenure}
              display={`${tenure} mo${tenure >= 12 ? ` · ${Math.floor(tenure / 12)} yr${Math.floor(tenure / 12) > 1 ? 's' : ''}` : ''}`} lo="6 mo" hi="30 yr" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 4, paddingTop: 24, borderTop: '1px dashed #e2e8f0' }}>
              {[
                { label: 'Amount (₹)', val: amount, set: setAmount, min: 100000, max: 10000000 },
                { label: 'Rate (%)',   val: rate,   set: setRate,   min: 5, max: 24, step: 0.1 },
                { label: 'Months',    val: tenure,  set: setTenure, min: 6, max: 360 },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 5 }}>{f.label}</label>
                  <input type="number" value={f.val} min={f.min} max={f.max} step={f.step || 1}
                    onChange={e => f.set(Math.min(f.max, Math.max(f.min, Number(e.target.value))))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 10, boxSizing: 'border-box', border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#0f172a', background: '#f8f7f4', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = ACCENT}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '40px 32px 32px', background: ACCENT, flex: '0 0 auto' }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 8 }}>Monthly EMI</p>
              <p style={{ fontSize: 44, fontWeight: 900, color: 'white', margin: '0 0 20px', letterSpacing: -2, lineHeight: 1 }}>
                <AnimatedNumber value={emi} />
              </p>
              <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.2)', overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', width: `${principalPct}%`, background: 'white', borderRadius: 99, transition: 'width .4s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>Principal {principalPct}%</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>Interest {100 - principalPct}%</span>
              </div>
              {[
                { label: 'Principal',      val: fmt(amount) },
                { label: 'Total Interest', val: fmt(totInt) },
                { label: 'Total Payment',  val: fmt(totPay) },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 2 ? 10 : 0, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none', marginBottom: i < 2 ? 10 : 0 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{row.label}</span>
                  <span style={{ fontSize: i === 2 ? 15 : 13, fontWeight: 700, color: 'white' }}>{row.val}</span>
                </div>
              ))}
            </div>

            {/* Donut */}
            <div style={{ padding: '24px 32px', flex: 1, background: 'white' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 16 }}>Split</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ position: 'relative', width: 90, flexShrink: 0 }}>
                  <Doughnut data={{ labels: ['Principal', 'Interest'], datasets: [{ data: [amount, totInt], backgroundColor: [ACCENT, '#fbbf24'], borderColor: ['white','white'], borderWidth: 3 }] }}
                    options={{ responsive: true, cutout: '70%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.label}: ${fmt(c.raw)}` } } } }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <p style={{ fontSize: 8, color: '#94a3b8', margin: 0 }}>PRIN</p>
                    <p style={{ fontSize: 15, fontWeight: 900, color: ACCENT, margin: 0 }}>{principalPct}%</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[{ color: ACCENT, label: 'Principal', val: fmt(amount) }, { color: '#fbbf24', label: 'Interest', val: fmt(totInt) }].map((r, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: r.color }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>{r.label}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', margin: 0, paddingLeft: 14 }}>{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/book-appointment" style={{ display: 'block', marginTop: 20, padding: '12px 0', background: '#0f172a', borderRadius: 12, textAlign: 'center', color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = ACCENT}
                onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}>
                Get This Loan →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── "What your EMI means" cards ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 14 }}>What your EMI means</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              { icon: <FaCoffee />, label: 'Per Day', val: `₹${Math.round(emi / 30).toLocaleString('en-IN')}`, sub: 'Daily outflow' },
              { icon: <FaCalendarAlt />, label: 'Per Week', val: `₹${Math.round(emi / 4.3).toLocaleString('en-IN')}`, sub: 'Weekly cost' },
              { icon: <FaCalendar />, label: 'Per Year', val: `₹${Math.round(emi * 12).toLocaleString('en-IN')}`, sub: 'Annual outflow' },
              { icon: <FaUniversity />, label: 'Total Tenure', val: `${Math.round(tenure / 12)} yrs`, sub: `${totPay > 0 ? Math.round(totInt / totPay * 100) : 0}% goes to interest` },
            ].map((card, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 18, padding: '20px 18px', boxShadow: '0 2px 12px rgba(15,23,42,0.06)', border: '1px solid #f1f5f9' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--badge-bg)', color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, fontSize: 16 }}>{card.icon}</div>
                <p style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, margin: '0 0 5px', letterSpacing: 0.3 }}>{card.label}</p>
                <p style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: '0 0 4px', letterSpacing: -0.5 }}>{card.val}</p>
                <p style={{ fontSize: 11, color: '#cbd5e1', margin: 0 }}>{card.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Year-by-year bar chart ── */}
        {yearLabels.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: 20, background: 'white', borderRadius: 24, padding: '32px 36px', boxShadow: '0 2px 16px rgba(15,23,42,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: -0.3 }}>Year-by-Year Breakdown</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>How your payments split over time</p>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ color: ACCENT, label: 'Principal' }, { color: '#fbbf24', label: 'Interest' }].map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: l.color }} />
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <Bar
              data={{ labels: yearLabels, datasets: [{ label: 'Principal', data: principalArr, backgroundColor: ACCENT, borderRadius: 6, borderSkipped: false }, { label: 'Interest', data: interestArr, backgroundColor: '#fbbf24', borderRadius: 6, borderSkipped: false }] }}
              options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.dataset.label}: ${fmt(c.raw)}` } } }, scales: { x: { stacked: true, grid: { display: false }, ticks: { font: { size: 12, weight: '600' } } }, y: { stacked: true, grid: { color: '#f1f5f9' }, ticks: { callback: v => `₹${(v / 100000).toFixed(0)}L`, font: { size: 11 } } } } }}
            />
          </motion.div>
        )}

        {/* ── Amortisation table ── */}
        {amort.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: 20, background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 16px rgba(15,23,42,0.05)' }}>
            <div style={{ padding: '24px 32px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a' }}>Payment Schedule</h3>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: '#94a3b8' }}>First 12 months · Full tenure: {tenure} months</p>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr className="theme-bg" style={{ borderTop: '1px solid #f1f5f9'}}>
                    {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                      <th key={h} style={{ padding: '11px 24px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: '#94a3b8', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {amort.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f8f7f4' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafaf9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '12px 24px', fontWeight: 700, color: '#475569' }}>{row.m}</td>
                      <td style={{ padding: '12px 24px', fontWeight: 700, color: ACCENT }}>{fmt(emi)}</td>
                      <td style={{ padding: '12px 24px', fontWeight: 600, color: '#059669' }}>{fmt(row.prin)}</td>
                      <td style={{ padding: '12px 24px', fontWeight: 600, color: '#d97706' }}>{fmt(row.int)}</td>
                      <td style={{ padding: '12px 24px', color: '#94a3b8' }}>{fmt(row.bal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <p style={{ marginTop: 16, fontSize: 12, color: '#cbd5e1', textAlign: 'center' }}>
          * Rates are indicative. Actual EMI may vary based on lender terms and credit profile.
        </p>
      </div>
    </div>
  );
}
