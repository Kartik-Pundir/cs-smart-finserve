import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaFileAlt, FaCalendarAlt, FaChartBar, FaArrowRight,
  FaHome, FaCar, FaUserTie, FaBriefcase, FaCheckCircle,
  FaClock, FaTimesCircle, FaRupeeSign
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

/* ── status pill config ── */
const STATUS = {
  submitted:    { bg: 'bg-blue-50',   text: 'text-blue-600',   dot: 'bg-blue-500',   label: 'Submitted' },
  processing:   { bg: 'bg-amber-50',  text: 'text-amber-600',  dot: 'bg-amber-500',  label: 'Processing' },
  'under-review':{ bg: 'bg-amber-50', text: 'text-amber-600',  dot: 'bg-amber-500',  label: 'Under Review' },
  approved:     { bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-500',  label: 'Approved' },
  disbursed:    { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-500', label: 'Disbursed' },
  rejected:     { bg: 'bg-red-50',    text: 'text-red-600',    dot: 'bg-red-500',    label: 'Rejected' },
  pending:      { bg: 'bg-amber-50',  text: 'text-amber-600',  dot: 'bg-amber-500',  label: 'Pending' },
  confirmed:    { bg: 'bg-green-50',  text: 'text-green-600',  dot: 'bg-green-500',  label: 'Confirmed' },
  completed:    { bg: 'bg-blue-50',   text: 'text-blue-600',   dot: 'bg-blue-500',   label: 'Completed' },
  cancelled:    { bg: 'bg-red-50',    text: 'text-red-600',    dot: 'bg-red-500',    label: 'Cancelled' },
};

const StatusPill = ({ status }) => {
  const s = STATUS[status] || { bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-400', label: status };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
};

/* ── CIBIL score arc ── */
const ScoreArc = ({ score }) => {
  if (!score) return <span className="text-gray-400 text-sm italic">Pending</span>;
  const pct = Math.min(Math.max((score - 300) / 600, 0), 1);
  const color = score >= 750 ? '#16a34a' : score >= 650 ? '#2563eb' : score >= 550 ? '#d97706' : '#dc2626';
  const label = score >= 750 ? 'Excellent' : score >= 650 ? 'Good' : score >= 550 ? 'Fair' : 'Poor';
  const r = 28, cx = 36, cy = 36, stroke = 6;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ * 0.75;
  return (
    <div className="flex items-center gap-3">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke}
          strokeDasharray={`${circ * 0.75} ${circ}`} strokeDashoffset={0}
          strokeLinecap="round" transform="rotate(135 36 36)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeDashoffset={0}
          strokeLinecap="round" transform="rotate(135 36 36)"
          style={{ transition: 'stroke-dasharray 1s ease' }} />
        <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{score}</text>
      </svg>
      <div>
        <p className="font-bold text-sm" style={{ color }}>{label}</p>
        <p className="text-xs text-gray-400">CIBIL Score</p>
      </div>
    </div>
  );
};

/* ── empty state ── */
const Empty = ({ emoji, title, desc, link, linkLabel }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className="py-20 flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
      style={{ background: 'rgba(192,57,43,0.07)' }}>{emoji}</div>
    <p className="font-semibold text-gray-800 mb-1">{title}</p>
    <p className="text-gray-400 text-sm mb-6 max-w-xs">{desc}</p>
    <Link to={link}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
      style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
      {linkLabel} <FaArrowRight size={11} />
    </Link>
  </motion.div>
);

/* ── main component ── */
const CustomerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) { toast.error('Please login first'); navigate('/login'); return; }
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/user/dashboard');
      setData(res.data.data);
    } catch {
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#faf8ff' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  const { applications = [], appointments = [], cibilChecks = [] } = data || {};
  const latestScore = cibilChecks.find(c => c.score)?.score;
  const activeApps = applications.filter(a => !['rejected', 'disbursed'].includes(a.status)).length;
  const upcomingApts = appointments.filter(a => a.status === 'confirmed' || a.status === 'pending').length;

  const tabs = [
    { key: 'applications', label: 'Loan Applications', icon: <FaFileAlt size={13} />, count: applications.length },
    { key: 'appointments', label: 'Appointments',      icon: <FaCalendarAlt size={13} />, count: appointments.length },
    { key: 'cibil',        label: 'CIBIL History',     icon: <FaChartBar size={13} />,  count: cibilChecks.length },
  ];

  const quickActions = [
    { label: 'Home Loan',     icon: <FaHome />,     link: '/home-loan',         color: 'from-blue-500 to-blue-600' },
    { label: 'Auto Loan',     icon: <FaCar />,      link: '/auto-loan',         color: 'from-green-500 to-green-600' },
    { label: 'Personal Loan', icon: <FaUserTie />,  link: '/personal-loan',     color: 'from-purple-500 to-purple-600' },
    { label: 'Business Loan', icon: <FaBriefcase />,link: '/business-loan',     color: 'from-orange-500 to-orange-600' },
    { label: 'Book Consult',  icon: <FaCalendarAlt />, link: '/book-appointment', color: 'from-pink-500 to-rose-500' },
    { label: 'CIBIL Check',   icon: <FaChartBar />, link: '/cibil-check',       color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden pt-20"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #c0392b 100%)' }}>
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* User info */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-white/70 text-sm mb-0.5">Welcome back</p>
                <h1 className="text-2xl font-heading font-bold text-white">{user?.name || 'User'}</h1>
                <p className="text-white/60 text-xs mt-0.5">{user?.email}</p>
              </div>
            </motion.div>

            {/* Mini stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="flex gap-4 sm:gap-6">
              {[
                { label: 'Active Applications', value: activeApps, icon: <FaFileAlt size={14} /> },
                { label: 'Upcoming Appointments', value: upcomingApts, icon: <FaCalendarAlt size={14} /> },
                { label: 'CIBIL Score', value: latestScore || '—', icon: <FaChartBar size={14} /> },
              ].map((s, i) => (
                <div key={i} className="text-center px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                  <div className="text-white/60 flex justify-center mb-1">{s.icon}</div>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-white/60 text-xs mt-0.5 whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* wave divider */}
        <svg viewBox="0 0 1440 40" className="w-full block" style={{ marginBottom: '-2px' }}>
          <path fill="#faf8ff" d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-2">

        {/* ── Quick Actions ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickActions.map((q, i) => (
              <Link key={i} to={q.link}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-accent hover:shadow-md transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${q.color} flex items-center justify-center text-white text-sm shadow-sm group-hover:scale-110 transition-transform`}>
                  {q.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 text-center leading-tight">{q.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-100 shadow-sm mb-5 w-fit">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === t.key
                    ? 'text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={activeTab === t.key ? { background: 'linear-gradient(135deg, #c0392b, #e74c3c)' } : {}}>
                {t.icon}
                {t.label}
                {t.count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === t.key ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{t.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* ── Table Panel ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <AnimatePresence mode="wait">

              {/* APPLICATIONS */}
              {activeTab === 'applications' && (
                <motion.div key="apps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {applications.length === 0 ? (
                    <Empty emoji="📋" title="No applications yet"
                      desc="Submit a loan application and track every update right here."
                      link="/home-loan" linkLabel="Apply for a Loan" />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            {['Service', 'Loan Amount', 'Monthly Income', 'Employment', 'City', 'Status', 'Applied On'].map(h => (
                              <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map((a, i) => (
                            <motion.tr key={a._id}
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                              className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-accent text-xs">
                                    <FaFileAlt />
                                  </div>
                                  <span className="font-semibold text-gray-800 whitespace-nowrap">{a.serviceType}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 font-semibold text-gray-700 whitespace-nowrap">
                                {a.loanAmount ? <span className="flex items-center gap-0.5"><FaRupeeSign size={10} />{a.loanAmount.toLocaleString()}</span> : '—'}
                              </td>
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                {a.monthlyIncome ? <span className="flex items-center gap-0.5"><FaRupeeSign size={10} />{a.monthlyIncome.toLocaleString()}</span> : '—'}
                              </td>
                              <td className="px-5 py-4 text-gray-500 capitalize whitespace-nowrap">{a.employmentType || '—'}</td>
                              <td className="px-5 py-4 text-gray-500">{a.city || '—'}</td>
                              <td className="px-5 py-4"><StatusPill status={a.status} /></td>
                              <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {/* APPOINTMENTS */}
              {activeTab === 'appointments' && (
                <motion.div key="apts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {appointments.length === 0 ? (
                    <Empty emoji="📅" title="No appointments booked"
                      desc="Book a free consultation with our financial experts."
                      link="/book-appointment" linkLabel="Book Appointment" />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            {['Service', 'Date', 'Time', 'Status', 'Booked On'].map(h => (
                              <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((a, i) => (
                            <motion.tr key={a._id}
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                              className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-green-600 text-xs">
                                    <FaCalendarAlt />
                                  </div>
                                  <span className="font-semibold text-gray-800 whitespace-nowrap">{a.service}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 font-medium text-gray-700 whitespace-nowrap">
                                {new Date(a.preferredDate).toLocaleDateString('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{a.preferredTime}</td>
                              <td className="px-5 py-4"><StatusPill status={a.status} /></td>
                              <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">{new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

              {/* CIBIL */}
              {activeTab === 'cibil' && (
                <motion.div key="cibil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {cibilChecks.length === 0 ? (
                    <Empty emoji="📊" title="No CIBIL checks yet"
                      desc="Check your credit score for free — takes less than a minute."
                      link="/cibil-check" linkLabel="Check CIBIL Score" />
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100">
                            {['Score', 'Name', 'PAN', 'Status', 'Checked On'].map(h => (
                              <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cibilChecks.map((c, i) => (
                            <motion.tr key={c._id}
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                              className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                              <td className="px-5 py-4"><ScoreArc score={c.score} /></td>
                              <td className="px-5 py-4 font-semibold text-gray-800">{c.name}</td>
                              <td className="px-5 py-4 font-mono text-gray-400 text-xs tracking-widest">{c.pan}</td>
                              <td className="px-5 py-4"><StatusPill status={c.status} /></td>
                              <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Bottom info strip ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <FaCheckCircle className="text-green-500" />, title: 'Secure & Encrypted', desc: 'Your data is protected with bank-grade security.' },
            { icon: <FaClock className="text-blue-500" />, title: '24-hr Processing', desc: 'Most applications are reviewed within one business day.' },
            { icon: <FaTimesCircle className="text-accent" />, title: 'Need Help?', desc: <a href="https://wa.me/919267953513" className="text-accent hover:underline font-medium">Chat with us on WhatsApp</a> },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className="text-lg mt-0.5 flex-shrink-0">{item.icon}</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default CustomerDashboard;
