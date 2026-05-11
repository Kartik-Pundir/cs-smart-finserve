import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { FaCalculator, FaHome, FaCar, FaUserTie, FaBriefcase, FaArrowRight, FaInfoCircle } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const loanPresets = [
  { label: 'Home Loan',     icon: <FaHome />,     amount: 3000000, rate: 8.5,  tenure: 240, color: '#c0392b', gradient: 'linear-gradient(135deg,#c0392b,#e74c3c)' },
  { label: 'Car Loan',      icon: <FaCar />,      amount: 700000,  rate: 9.0,  tenure: 60,  color: '#2980b9', gradient: 'linear-gradient(135deg,#2980b9,#3498db)' },
  { label: 'Personal Loan', icon: <FaUserTie />,  amount: 500000,  rate: 12.0, tenure: 36,  color: '#8e44ad', gradient: 'linear-gradient(135deg,#8e44ad,#9b59b6)' },
  { label: 'Business Loan', icon: <FaBriefcase />,amount: 2000000, rate: 11.0, tenure: 60,  color: '#27ae60', gradient: 'linear-gradient(135deg,#27ae60,#2ecc71)' },
];

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const SliderField = ({ label, value, min, max, step, onChange, display, leftLabel, rightLabel, accentColor }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-gray-700 font-semibold text-sm">{label}</label>
        <span className="text-sm font-bold px-3 py-1 rounded-full text-white" style={{ background: accentColor }}>{display}</span>
      </div>
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
            WebkitAppearance: 'none',
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const [loanAmount, setLoanAmount]   = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure]           = useState(60);
  const [emi, setEmi]                 = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment]   = useState(0);
  const [activePreset, setActivePreset]   = useState(null);
  const [accentColor, setAccentColor] = useState('#c0392b');
  const [accentGradient, setAccentGradient] = useState('linear-gradient(135deg,#c0392b,#e74c3c)');

  const calculateEMI = useCallback(() => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure);
    if (p && r && n) {
      const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const tp = e * n;
      setEmi(Math.round(e));
      setTotalInterest(Math.round(tp - p));
      setTotalPayment(Math.round(tp));
    }
  }, [loanAmount, interestRate, tenure]);

  useEffect(() => { calculateEMI(); }, [calculateEMI]);

  const applyPreset = (preset, idx) => {
    setLoanAmount(preset.amount);
    setInterestRate(preset.rate);
    setTenure(preset.tenure);
    setActivePreset(idx);
    setAccentColor(preset.color);
    setAccentGradient(preset.gradient);
  };

  const principalPct = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;
  const interestPct  = 100 - principalPct;

  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [{
      data: [loanAmount, totalInterest],
      backgroundColor: [accentColor, '#f1c40f'],
      borderColor: ['white', 'white'],
      borderWidth: 4,
      hoverOffset: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${fmt(ctx.raw)}`
        }
      }
    }
  };

  const amortization = [];
  if (emi > 0) {
    let bal = loanAmount;
    const r = interestRate / 12 / 100;
    for (let i = 1; i <= Math.min(tenure, 12); i++) {
      const int = Math.round(bal * r);
      const prin = Math.round(emi - int);
      bal = Math.max(0, Math.round(bal - prin));
      amortization.push({ month: i, emi: Math.round(emi), interest: int, principal: prin, balance: bal });
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0eeff', paddingTop: '80px' }}>
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${accentColor};
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s;
        }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
      `}</style>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden" style={{ background: `linear-gradient(135deg, #1a1a2e 0%, #2d1b2e 40%, rgba(192,57,43,0.9) 100%)` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #f39c12, transparent)' }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold mb-5">
              <FaCalculator /> Smart EMI Calculator
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Plan Your Loan <span style={{ color: '#ffd700' }}>Smartly</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Instantly calculate your monthly EMI, total interest payable, and complete amortization schedule. No guesswork — just clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Loan Presets */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-20 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {loanPresets.map((p, i) => (
            <motion.button
              key={i} onClick={() => applyPreset(p, i)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl font-semibold text-sm transition-all shadow-md"
              style={{
                background: activePreset === i ? p.gradient : 'white',
                color: activePreset === i ? 'white' : '#374151',
                border: activePreset === i ? 'none' : '2px solid #e5e7eb',
              }}>
              <span className="text-xl">{p.icon}</span>
              {p.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Calculator */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Left: Inputs */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-7 flex items-center gap-2">
              <FaCalculator style={{ color: accentColor }} /> Loan Details
            </h2>
            <div className="space-y-8">
              <SliderField
                label="Loan Amount"
                value={loanAmount} min={100000} max={10000000} step={50000}
                onChange={setLoanAmount}
                display={fmt(loanAmount)}
                leftLabel="₹1 L" rightLabel="₹1 Cr"
                accentColor={accentColor}
              />
              <SliderField
                label="Interest Rate (% p.a.)"
                value={interestRate} min={5} max={24} step={0.1}
                onChange={setInterestRate}
                display={`${interestRate}%`}
                leftLabel="5%" rightLabel="24%"
                accentColor={accentColor}
              />
              <SliderField
                label="Loan Tenure"
                value={tenure} min={6} max={360} step={6}
                onChange={setTenure}
                display={`${tenure} months (${(tenure / 12).toFixed(1).replace('.0','')} yrs)`}
                leftLabel="6 months" rightLabel="30 years"
                accentColor={accentColor}
              />
            </div>

            {/* Direct Inputs */}
            <div className="mt-8 pt-7 border-t border-gray-100 grid grid-cols-3 gap-3">
              {[
                { label: 'Amount (₹)', val: loanAmount, set: setLoanAmount, min: 100000, max: 10000000 },
                { label: 'Rate (%)',   val: interestRate, set: setInterestRate, min: 5, max: 24, step: 0.1 },
                { label: 'Months',    val: tenure, set: setTenure, min: 6, max: 360 },
              ].map((f, i) => (
                <div key={i}>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">{f.label}</label>
                  <input
                    type="number" value={f.val} min={f.min} max={f.max} step={f.step || 1}
                    onChange={e => f.set(Math.min(f.max, Math.max(f.min, Number(e.target.value))))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-red-400 text-gray-800 bg-gray-50"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Results */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 flex flex-col gap-5">

            {/* EMI Highlight */}
            <div className="rounded-3xl p-7 text-white relative overflow-hidden shadow-xl" style={{ background: accentGradient }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
              <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">Monthly EMI</p>
              <AnimatePresence mode="wait">
                <motion.p key={emi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-5xl font-heading font-bold mb-4">
                  {fmt(emi)}
                </motion.p>
              </AnimatePresence>
              <div className="h-1 rounded-full bg-white/20 mb-4" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
                  <p className="opacity-70 text-xs mb-1">Principal</p>
                  <p className="font-bold">{fmt(loanAmount)}</p>
                </div>
                <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
                  <p className="opacity-70 text-xs mb-1">Total Interest</p>
                  <p className="font-bold">{fmt(totalInterest)}</p>
                </div>
                <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm col-span-2">
                  <p className="opacity-70 text-xs mb-1">Total Payment</p>
                  <p className="font-bold text-lg">{fmt(totalPayment)}</p>
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-5">Payment Breakdown</h3>
              <div className="relative max-w-[180px] mx-auto">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-gray-400">Principal</p>
                  <p className="text-xl font-bold" style={{ color: accentColor }}>{principalPct}%</p>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full" style={{ background: accentColor }} />
                  <span className="text-gray-500">Principal <strong className="text-gray-800">{principalPct}%</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-gray-500">Interest <strong className="text-gray-800">{interestPct}%</strong></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Amortization Table */}
        {amortization.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
                <FaInfoCircle style={{ color: accentColor }} /> First 12 Months — Payment Schedule
              </h3>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Monthly breakdown</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead style={{ background: '#faf8ff' }}>
                  <tr>
                    {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-gray-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {amortization.map((row, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800">{row.month}</td>
                      <td className="px-6 py-4 font-semibold" style={{ color: accentColor }}>{fmt(row.emi)}</td>
                      <td className="px-6 py-4 text-green-600 font-medium">{fmt(row.principal)}</td>
                      <td className="px-6 py-4 text-yellow-600 font-medium">{fmt(row.interest)}</td>
                      <td className="px-6 py-4 text-gray-500">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden"
          style={{ background: accentGradient }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-heading font-bold mb-2">Ready to Apply?</h3>
            <p className="text-white/80 mb-6">Get your loan sanctioned in 48 hours. Our experts will find you the best deal.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-appointment"
                className="px-7 py-3 bg-white rounded-xl font-bold text-gray-900 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                style={{ textDecoration: 'none' }}>
                Book Free Consultation <FaArrowRight />
              </Link>
              <Link to="/services"
                className="px-7 py-3 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all flex items-center gap-2"
                style={{ textDecoration: 'none' }}>
                View All Loan Products <FaArrowRight />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EMICalculator;
