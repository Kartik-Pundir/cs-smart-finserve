import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const fmt  = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const ACCENT = '#c0392b';

/* ─── Custom Slider ─────────────────────────────────────────── */
function Slider({ label, value, min, max, step, onChange, display, lo, hi }) {
  const pct = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', letterSpacing: 0.3 }}>{label}</span>
        <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: -0.5 }}>{display}</span>
      </div>

      {/* Track */}
      <div style={{ position: 'relative', height: 6, borderRadius: 99 }}>
        <div style={{ position: 'absolute', inset: 0, background: '#e2e8f0', borderRadius: 99 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${ACCENT}cc, ${ACCENT})`, borderRadius: 99, transition: 'width .05s' }} />

        {/* Invisible range for interaction */}
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
        />

        {/* Visible thumb */}
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          left: `calc(${pct}% - 11px)`, width: 22, height: 22, borderRadius: '50%',
          background: 'white', border: `3px solid ${ACCENT}`,
          boxShadow: '0 2px 8px rgba(192,57,43,0.25)', pointerEvents: 'none',
          transition: 'left .05s',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: 11, color: '#cbd5e1' }}>{lo}</span>
        <span style={{ fontSize: 11, color: '#cbd5e1' }}>{hi}</span>
      </div>
    </div>
  );
}

/* ─── Loan presets ──────────────────────────────────────────── */
const PRESETS = [
  { label: 'Home Loan',     icon: '🏠', amount: 3000000, rate: 8.5,  tenure: 240 },
  { label: 'Car Loan',      icon: '🚗', amount: 800000,  rate: 9.0,  tenure: 84  },
  { label: 'Personal Loan', icon: '👤', amount: 500000,  rate: 12.0, tenure: 36  },
  { label: 'Business Loan', icon: '💼', amount: 2000000, rate: 11.0, tenure: 60  },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function EMICalculator() {
  const [amount,   setAmount]   = useState(1500000);
  const [rate,     setRate]     = useState(8.5);
  const [tenure,   setTenure]   = useState(120);
  const [emi,      setEmi]      = useState(0);
  const [totInt,   setTotInt]   = useState(0);
  const [totPay,   setTotPay]   = useState(0);
  const [active,   setActive]   = useState(null);

  const calc = useCallback(() => {
    const r = rate / 12 / 100, n = tenure;
    if (!amount || !r || !n) return;
    const e  = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tp = e * n;
    setEmi(Math.round(e));
    setTotPay(Math.round(tp));
    setTotInt(Math.round(tp - amount));
  }, [amount, rate, tenure]);

  useEffect(() => { calc(); }, [calc]);

  const applyPreset = (p, i) => {
    setAmount(p.amount); setRate(p.rate); setTenure(p.tenure); setActive(i);
  };

  const principalPct = totPay > 0 ? Math.round((amount / totPay) * 100) : 0;
  const interestPct  = 100 - principalPct;

  /* first 12 months amortisation */
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
    <div style={{ background: '#f8f7f4', minHeight: '100vh', paddingTop: 80, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero strip ─────────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #ede9e3', padding: '44px 0 36px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 28px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: ACCENT, textTransform: 'uppercase', marginBottom: 10 }}>
            Financial Tools
          </p>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.15, letterSpacing: -1 }}>
            EMI Calculator
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, marginTop: 8, maxWidth: 460, lineHeight: 1.6 }}>
            Know your exact monthly outflow before committing to any loan. Adjust freely.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '32px 28px 72px' }}>

        {/* ── Preset pills ───────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {PRESETS.map((p, i) => (
            <button key={i} onClick={() => applyPreset(p, i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px',
                borderRadius: 100, border: active === i ? `1.5px solid ${ACCENT}` : '1.5px solid #e2e8f0',
                background: active === i ? '#fff1f0' : 'white',
                color: active === i ? ACCENT : '#64748b',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .18s',
                boxShadow: active === i ? '0 0 0 3px rgba(192,57,43,0.08)' : 'none',
              }}>
              <span>{p.icon}</span> {p.label}
            </button>
          ))}
        </div>

        {/* ── Main card ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: 24,
            boxShadow: '0 4px 32px rgba(15,23,42,0.07), 0 1px 4px rgba(15,23,42,0.04)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
          }}>

          {/* Left — Sliders */}
          <div style={{ padding: '44px 48px', borderRight: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 36 }}>
              Loan Details
            </p>

            <Slider label="Loan Amount" value={amount} min={100000} max={10000000} step={50000}
              onChange={setAmount} display={fmt(amount)} lo="₹1 L" hi="₹1 Cr" />
            <Slider label="Interest Rate (% p.a.)" value={rate} min={5} max={24} step={0.1}
              onChange={setRate} display={`${Number(rate).toFixed(1)}%`} lo="5%" hi="24%" />
            <Slider label="Loan Tenure" value={tenure} min={6} max={360} step={6}
              onChange={setTenure}
              display={`${tenure} mo${tenure >= 12 ? ` · ${Math.floor(tenure / 12)} yr${Math.floor(tenure / 12) > 1 ? 's' : ''}` : ''}`}
              lo="6 mo" hi="30 yr" />

            {/* Direct inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 4, paddingTop: 28, borderTop: '1px dashed #e2e8f0' }}>
              {[
                { label: 'Amount (₹)', val: amount, set: setAmount, min: 100000, max: 10000000 },
                { label: 'Rate (%)',   val: rate,   set: setRate,   min: 5,      max: 24, step: 0.1 },
                { label: 'Months',    val: tenure,  set: setTenure, min: 6,      max: 360 },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <input type="number" value={f.val} min={f.min} max={f.max} step={f.step || 1}
                    onChange={e => f.set(Math.min(f.max, Math.max(f.min, Number(e.target.value))))}
                    style={{
                      width: '100%', padding: '10px 13px', borderRadius: 10, boxSizing: 'border-box',
                      border: '1.5px solid #e2e8f0', fontSize: 14, fontWeight: 700, color: '#0f172a',
                      background: '#f8f7f4', outline: 'none', transition: 'border .2s',
                    }}
                    onFocus={e => e.target.style.borderColor = ACCENT}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Results */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* EMI hero */}
            <div style={{ padding: '44px 36px 36px', background: ACCENT, flex: '0 0 auto' }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 10 }}>
                Monthly EMI
              </p>
              <p key={emi} style={{ fontSize: 48, fontWeight: 900, color: 'white', margin: '0 0 28px', letterSpacing: -2, lineHeight: 1 }}>
                {fmt(emi)}
              </p>

              {/* Principal vs Interest bar */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${principalPct}%`, background: 'white', borderRadius: 99, transition: 'width .3s' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7 }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Principal {principalPct}%</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Interest {interestPct}%</span>
                </div>
              </div>

              {/* Row breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Principal',      val: fmt(amount),  muted: true },
                  { label: 'Total Interest', val: fmt(totInt),  muted: true },
                  { label: 'Total Payment',  val: fmt(totPay),  muted: false },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 2 ? 10 : 0, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ fontSize: row.muted ? 13 : 15, fontWeight: 700, color: 'white' }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut */}
            <div style={{ padding: '28px 36px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'white' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#cbd5e1', textTransform: 'uppercase', marginBottom: 20 }}>
                Breakdown
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{ position: 'relative', width: 110, flexShrink: 0 }}>
                  <Doughnut
                    data={{
                      labels: ['Principal', 'Interest'],
                      datasets: [{
                        data: [amount, totInt],
                        backgroundColor: [ACCENT, '#fbbf24'],
                        borderColor: ['white', 'white'],
                        borderWidth: 3,
                        hoverOffset: 4,
                      }]
                    }}
                    options={{ responsive: true, cutout: '72%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.label}: ${fmt(c.raw)}` } } } }}
                  />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <p style={{ fontSize: 9, color: '#94a3b8', margin: 0, letterSpacing: 0.5 }}>PRINCIPAL</p>
                    <p style={{ fontSize: 17, fontWeight: 800, color: ACCENT, margin: 0, lineHeight: 1.2 }}>{principalPct}%</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { color: ACCENT,    label: 'Principal', val: fmt(amount), pct: principalPct },
                    { color: '#fbbf24', label: 'Interest',  val: fmt(totInt), pct: interestPct  },
                  ].map((r, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>{r.label}</span>
                      </div>
                      <p style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', margin: 0, paddingLeft: 15 }}>{r.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply CTA */}
              <Link to="/book-appointment" style={{
                display: 'block', marginTop: 24, padding: '13px 0', background: '#0f172a',
                borderRadius: 12, textAlign: 'center', color: 'white',
                fontWeight: 700, fontSize: 13, textDecoration: 'none', letterSpacing: 0.3,
                transition: 'background .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = ACCENT}
                onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}>
                Get This Loan →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Amortisation table ─────────────────────────────── */}
        {amort.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ marginTop: 20, background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 16px rgba(15,23,42,0.05)' }}>
            <div style={{ padding: '28px 36px 20px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#0f172a', letterSpacing: -0.3 }}>Payment Schedule</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>First 12 months • Full tenure: {tenure} months</p>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', background: '#f8f7f4' }}>
                    {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                      <th key={h} style={{ padding: '12px 28px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: '#94a3b8', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {amort.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f8f7f4' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafaf9'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '13px 28px', fontWeight: 700, color: '#475569' }}>{row.m}</td>
                      <td style={{ padding: '13px 28px', fontWeight: 700, color: ACCENT }}>{fmt(emi)}</td>
                      <td style={{ padding: '13px 28px', fontWeight: 600, color: '#059669' }}>{fmt(row.prin)}</td>
                      <td style={{ padding: '13px 28px', fontWeight: 600, color: '#d97706' }}>{fmt(row.int)}</td>
                      <td style={{ padding: '13px 28px', color: '#94a3b8' }}>{fmt(row.bal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p style={{ marginTop: 18, fontSize: 12, color: '#cbd5e1', textAlign: 'center' }}>
          * Rates are indicative. Actual EMI may vary based on lender terms and credit profile.
        </p>
      </div>
    </div>
  );
}
