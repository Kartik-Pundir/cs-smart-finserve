import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaArrowLeft, FaShieldAlt, FaChartLine, FaHistory } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const CibilCheck = () => {
  const [formData, setFormData] = useState({
    name: '',
    pan: '',
    dob: '',
    mobile: '',
    email: '',
    consent: false
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error('Please provide consent to proceed');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/cibil', formData);
      toast.success(response.data.message);
      setResult(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setFormData({
      name: '',
      pan: '',
      dob: '',
      mobile: '',
      email: '',
      consent: false
    });
  };

  const getScoreDetails = (score) => {
    if (score >= 750) {
      return {
        label: 'Excellent',
        color: 'text-green-500',
        stroke: '#10b981',
        desc: 'Outstanding credit profile! You qualify for our lowest interest rates and premium pre-approved offers.',
        factors: { history: 'Excellent', mix: 'Excellent', queries: 'Zero/Low' }
      };
    }
    if (score >= 700) {
      return {
        label: 'Good',
        color: 'text-lime-500',
        stroke: '#84cc16',
        desc: 'Very strong credit profile. You will get easy approvals and competitive rate offers.',
        factors: { history: 'Good', mix: 'Good', queries: 'Low' }
      };
    }
    if (score >= 650) {
      return {
        label: 'Fair',
        color: 'text-amber-500',
        stroke: '#f59e0b',
        desc: 'Average credit history. You qualify for loans but lenders may request extra income validation.',
        factors: { history: 'Fair', mix: 'Average', queries: 'Moderate' }
      };
    }
    return {
      label: 'Needs Attention',
      color: 'text-red-500',
      stroke: '#ef4444',
      desc: 'Below average credit standing. We recommend stabilizing payments to boost your rating before applying.',
      factors: { history: 'Needs Work', mix: 'Limited', queries: 'High' }
    };
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#faf8ff' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-3">
            CIBIL <span className="gradient-text">Score Check</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {!result 
              ? "Verify your credit standing instantly and discover personalized loan offers tailored for your credit tier." 
              : "Review your detailed credit report snapshot and recommendations below."}
          </p>
        </motion.div>

        {!result ? (
          /* Check Form */
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="card p-8 border border-purple-50 shadow-xl bg-white rounded-3xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="input-field"
                  placeholder="As per PAN card"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-semibold">
                  PAN Number *
                </label>
                <input
                  type="text"
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                  required
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  maxLength="10"
                  className="input-field"
                  placeholder="ABCDE1234F"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-semibold">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-semibold">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  pattern="[0-9]{10}"
                  className="input-field"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm mb-2 font-semibold">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-start space-x-3 p-3 bg-red-50/40 rounded-xl border border-red-50">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    required
                    className="mt-1 accent-accent"
                  />
                  <span className="text-gray-500 text-xs leading-relaxed">
                    I hereby authorize CS Smart Finserve to fetch my credit bureau score and report details. 
                    I understand this inquiry is processed securely and is used to match me with suitable 
                    lenders and optimized interest rate quotes.
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3.5 bg-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Fetching Credit Profile...' : 'Check CIBIL Score'}
            </button>
          </motion.form>
        ) : (
          /* Results View */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Main Score Card */}
            <div className="card p-8 border border-purple-50 shadow-xl bg-white rounded-3xl text-center relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <button
                  onClick={resetForm}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent font-semibold transition-colors"
                >
                  <FaArrowLeft className="text-[10px]" /> Check Another
                </button>
              </div>

              {/* Gauge */}
              {(() => {
                const details = getScoreDetails(result.score);
                const pct = Math.min(Math.max((result.score - 300) / 600, 0), 1);
                const strokeDash = 251.3;
                const offset = strokeDash - strokeDash * pct;

                return (
                  <div className="pt-4">
                    <div className="relative w-64 h-36 mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 200 110">
                        {/* Background track */}
                        <path
                          d="M 20 100 A 80 80 0 0 1 180 100"
                          fill="none"
                          stroke="rgba(0,0,0,0.06)"
                          strokeWidth="14"
                          strokeLinecap="round"
                        />
                        {/* Fill track */}
                        <motion.path
                          d="M 20 100 A 80 80 0 0 1 180 100"
                          fill="none"
                          stroke={details.stroke}
                          strokeWidth="14"
                          strokeLinecap="round"
                          strokeDasharray={strokeDash}
                          initial={{ strokeDashoffset: strokeDash }}
                          animate={{ strokeDashoffset: offset }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        <text x="22" y="112" fontSize="7" fontWeight="bold" fill="#9ca3af" textAnchor="middle">300</text>
                        <text x="178" y="112" fontSize="7" fontWeight="bold" fill="#9ca3af" textAnchor="middle">900</text>
                      </svg>
                      {/* Label overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                        <span className="text-5xl font-black text-gray-800 tracking-tight">{result.score}</span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${details.color} mt-1`}>
                          {details.label}
                        </span>
                      </div>
                    </div>

                    <div className="max-w-md mx-auto mt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Hello, {result.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{details.desc}</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Credit Factors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const details = getScoreDetails(result.score);
                return [
                  { 
                    icon: <FaHistory className="text-blue-500 text-lg" />, 
                    title: 'Repayment History', 
                    value: details.factors.history, 
                    desc: 'Timely payments on loans & cards.' 
                  },
                  { 
                    icon: <FaShieldAlt className="text-green-500 text-lg" />, 
                    title: 'Credit Mix & Age', 
                    value: details.factors.mix, 
                    desc: 'Ratio of secured & unsecured debt.' 
                  },
                  { 
                    icon: <FaChartLine className="text-purple-500 text-lg" />, 
                    title: 'Recent Inquiries', 
                    value: details.factors.queries, 
                    desc: 'Credit check requests in past 180 days.' 
                  }
                ].map((factor, i) => (
                  <div key={i} className="card p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 bg-gray-50 rounded-xl">{factor.icon}</div>
                      <h4 className="font-bold text-sm text-gray-800">{factor.title}</h4>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{factor.desc}</p>
                      <span className="text-sm font-bold text-gray-900">{factor.value}</span>
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Curated Loan Advice / Next Step */}
            <div className="card p-6 border border-purple-50 shadow-md bg-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(168,130,58,0.1)", color: "#a8823a" }}>★</div>
                <div>
                  <h4 className="font-bold text-gray-800">Ready to unlock your customized rates?</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Let our experts help you secure pre-approved home, auto, or personal loan sanctions.</p>
                </div>
              </div>
              <Link
                to="/book-appointment"
                className="w-full sm:w-auto px-6 py-2.5 bg-accent text-white text-sm font-bold rounded-xl text-center shadow hover:bg-red-700 transition-all flex-shrink-0"
              >
                Apply for Loan
              </Link>
            </div>
          </motion.div>
        )}

        {/* Why CIBIL matters FAQ info */}
        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 card p-6 border border-gray-100 shadow-sm bg-white rounded-2xl"
          >
            <h3 className="text-lg font-heading font-semibold mb-4 text-gray-900">
              Why Check Your CIBIL Score?
            </h3>
            <ul className="space-y-3.5 text-gray-500 text-xs">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong>Know Your Terms:</strong> Understanding your score before speaking with lenders sets expectations for available interest rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong>Get Pre-Approved Rates:</strong> A score above 750 immediately flags you for lower interest rate processing and lower processing fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <span><strong>Completely Safe:</strong> Soft inquiries checked through our portal do not negatively impact your credit profile.</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CibilCheck;
