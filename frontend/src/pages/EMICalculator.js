import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const loanTypes = [
  { label: 'Home Loan',     emoji: '🏠', amount: 3000000, rate: 8.5,  tenure: 240 },
  { label: 'Car Loan',      emoji: '🚗', amount: 800000,  rate: 9.0,  tenure: 84  },
  { label: 'Personal Loan', emoji: '👤', amount: 500000,  rate: 12.0, tenure: 36  },
  { label: 'Business Loan', emoji: '💼', amount: 2000000, rate: 11.0, tenure: 60  },
];

const ACCENT = '#c0392b';

const Slider = ({ label, value, min, max, step, onChange, displayVal, leftTick, rightTick }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-7">
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-gray-500 text-sm">{label}</span>
        <span className="text-lg font-bold text-gray-900">{displayVal}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="w-full h-1 rounded-full bg-gray-200 absolute" />
        <div
          className="h-1 rounded-full absolute"
          style={{ width: `${pct}%`, background: ACCENT }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full absolute cursor-pointer"
          style={{ opacity: 0, height: '20px', zIndex: 2 }}
        />
        <div
          className="w-5 h-5 rounded-full bg-white border-2 shadow-md absolute pointer-events-none transition-all"
          style={{ left: `calc(${pct}% - 10px)`, borderColor: ACCENT, boxShadow: `0 0 0 3px rgba(192,57,43,0.12)` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{leftTick}</span>
        <span>{rightTick}</span>
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const [loanAmount,   setLoanAmount]   = useState(1500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure,       setTenure]       = useState(120);
  const [emi,          setEmi]          = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment,  setTotalPayment]  = useState(0);
  const [activeType,    setActiveType]    = useState(null);

  const calculate = useCallback(() => {
    const p = loanAmount, r = interestRate / 12 / 100, n = tenure;
    if (!p || !r || !n) return;
    const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const tp = e * n;
    setEmi(Math.round(e));
    setTotalPayment(Math.round(tp));
    setTotalInterest(Math.round(tp - p));
  }, [loanAmount, interestRate, tenure]);

  useEffect(() => { calculate(); }, [calculate]);

  const applyType = (lt, i) => {
    setLoanAmount(lt.amount);
    setInterestRate(lt.rate);
    setTenure(lt.tenure);
    setActiveType(i);
  };

  const principalPct  = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;
  const interestPct   = 100 - principalPct;

  const amort = [];
  if (emi > 0) {
    let bal = loanAmount;
    const r = interestRate / 12 / 100;
    for (let m = 1; m <= Math.min(tenure, 12); m++) {
      const int = Math.round(bal * r);
      const prin = Math.round(emi - int);
      bal = Math.max(0, Math.round(bal - prin));
      amort.push({ m, emi: Math.round(emi), int, prin, bal });
    }
  }

  return (
    <div style={{ background: '#f7f8fa', minHeight: '100vh', paddingTop: '80px' }}>

      {/* ── Page Header ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #eaecf0', padding: '36px 0 28px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <p style={{ color: ACCENT, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Tools</p>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111', margin: 0, lineHeight: 1.2 }}>EMI Calculator</h1>
          <p style={{ color: '#6b7280', marginTop: 8, fontSize: 15 }}>
            Find out your monthly instalment amount before you apply.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* ── Loan Type Quick-select ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
          {loanTypes.map((lt, i) => (
            <button
              key={i}
              onClick={() => applyType(lt, i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                border: activeType === i ? `2px solid ${ACCENT}` : '2px solid #e5e7eb',
                background: activeType === i ? '#fff5f5' : 'white',
                fontWeight: 600, fontSize: 13, color: activeType === i ? ACCENT : '#374151',
                transition: 'all .2s',
              }}
            >
              <span style={{ fontSize: 20 }}>{lt.emoji}</span>
              {lt.label}
            </button>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

          {/* Left — Inputs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: 'white', borderRadius: 20, padding: '32px 36px', border: '1px solid #eaecf0' }}>

            <Slider
              label="Loan Amount"
              value={loanAmount} min={100000} max={10000000} step={50000}
              onChange={setLoanAmount}
              displayVal={fmt(loanAmount)}
              leftTick="₹1 L" rightTick="₹1 Cr"
            />
            <Slider
              label="Interest Rate (% p.a.)"
              value={interestRate} min={5} max={24} step={0.1}
              onChange={setInterestRate}
              displayVal={`${Number(interestRate).toFixed(1)}%`}
              leftTick="5%" rightTick="24%"
            />
            <Slider
              label="Loan Tenure"
              value={tenure} min={6} max={360} step={6}
              onChange={setTenure}
              displayVal={`${tenure} months${tenure >= 12 ? ` · ${Math.floor(tenure/12)} yr${Math.floor(tenure/12)>1?'s':''}` : ''}`}
              leftTick="6 months" rightTick="30 years"
            />

            {/* Fine-tune inputs */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24, marginTop: 4, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {[
                { label: 'Amount (₹)', val: loanAmount, set: setLoanAmount, min: 100000, max: 10000000 },
                { label: 'Rate (%)',   val: interestRate, set: setInterestRate, min: 5, max: 24, decimal: true },
                { label: 'Months',    val: tenure, set: setTenure, min: 6, max: 360 },
              ].map((f, i) => (
                <div key={i}>
                  <label style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 5 }}>
                    {f.label}
                  </label>
                  <input
                    type="number" value={f.val} min={f.min} max={f.max} step={f.decimal ? 0.1 : 1}
                    onChange={e => f.set(Math.min(f.max, Math.max(f.min, Number(e.target.value))))}
                    style={{
                      width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 10,
                      fontSize: 14, fontWeight: 600, color: '#111', outline: 'none', background: '#fafafa', boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = ACCENT}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Results */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* EMI card */}
            <div style={{ background: ACCENT, borderRadius: 20, padding: '28px 28px 24px', color: 'white' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7, marginBottom: 6 }}>Monthly EMI</p>
              <p style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>{fmt(emi)}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Principal', val: fmt(loanAmount) },
                  { label: 'Total Interest', val: fmt(totalInterest) },
                  { label: 'Total Payment', val: fmt(totalPayment), bold: true },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, opacity: 0.75 }}>{row.label}</span>
                    <span style={{ fontSize: row.bold ? 15 : 13, fontWeight: row.bold ? 800 : 600 }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut */}
            <div style={{ background: 'white', borderRadius: 20, padding: '24px', border: '1px solid #eaecf0' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 16 }}>Payment Split</p>
              <div style={{ position: 'relative', width: 150, margin: '0 auto 16px' }}>
                <Doughnut
                  data={{
                    labels: ['Principal', 'Interest'],
                    datasets: [{ data: [loanAmount, totalInterest], backgroundColor: [ACCENT, '#fbbf24'], borderColor: ['white','white'], borderWidth: 3, hoverOffset: 5 }]
                  }}
                  options={{ responsive: true, cutout: '68%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${fmt(ctx.raw)}` } } } }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <p style={{ fontSize: 10, color: '#9ca3af', margin: 0 }}>Principal</p>
                  <p style={{ fontSize: 18, fontWeight: 800, color: ACCENT, margin: 0 }}>{principalPct}%</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Principal', pct: principalPct, color: ACCENT },
                  { label: 'Interest',  pct: interestPct,  color: '#fbbf24' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: r.color, display: 'inline-block' }} />
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{r.label}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link to="/book-appointment" style={{
              display: 'block', padding: '14px', background: '#111', borderRadius: 14, textAlign: 'center',
              color: 'white', fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'background .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = ACCENT}
              onMouseLeave={e => e.currentTarget.style.background = '#111'}
            >
              Apply for this Loan →
            </Link>
          </motion.div>
        </div>

        {/* ── Amortization Table ── */}
        {amort.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'white', borderRadius: 20, border: '1px solid #eaecf0', marginTop: 20, overflow: 'hidden' }}>
            <div style={{ padding: '22px 28px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: '#111', margin: 0 }}>Monthly Breakdown</p>
                <p style={{ fontSize: 12, color: '#9ca3af', margin: '3px 0 0' }}>First 12 months</p>
              </div>
              <span style={{ background: '#f3f4f6', padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: '#6b7280' }}>
                {tenure} months total
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                      <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#9ca3af', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {amort.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                      <td style={{ padding: '13px 24px', fontWeight: 700, color: '#374151' }}>{row.m}</td>
                      <td style={{ padding: '13px 24px', fontWeight: 600, color: ACCENT }}>{fmt(row.emi)}</td>
                      <td style={{ padding: '13px 24px', color: '#059669', fontWeight: 500 }}>{fmt(row.prin)}</td>
                      <td style={{ padding: '13px 24px', color: '#d97706', fontWeight: 500 }}>{fmt(row.int)}</td>
                      <td style={{ padding: '13px 24px', color: '#6b7280' }}>{fmt(row.bal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ── Info chips ── */}
        <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Rates shown are indicative. Actual rates vary by lender and profile.', '₹0 fee to use this calculator.'].map((t, i) => (
            <span key={i} style={{ fontSize: 12, color: '#9ca3af', background: 'white', border: '1px solid #e5e7eb', padding: '6px 14px', borderRadius: 20 }}>
              ℹ️ {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
