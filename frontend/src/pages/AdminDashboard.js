import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar, FaTrash, FaEye, FaTimes, FaSearch, FaDownload } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const moodLabels = ['😞 Very Unhappy', '😕 Unhappy', '😐 Neutral', '😊 Happy', '😄 Very Happy'];

const exportCSV = (data, filename) => {
  if (!data.length) return toast.error('No data to export');
  const keys = Object.keys(data[0]).filter(k => k !== '__v' && k !== '_id');
  const csv = [keys.join(','), ...data.map(row =>
    keys.map(k => `"${(row[k] ?? '').toString().replace(/"/g, '""')}"`).join(',')
  )].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const TabBtn = ({ label, count, active, onClick, highlight }) => (
  <button onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
      active 
        ? 'text-white shadow-md' 
        : highlight 
          ? 'bg-gradient-to-r from-red-50 to-orange-50 text-accent border-2 border-accent/30 hover:border-accent/50 shadow-sm' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
    }`}
    style={active ? { background: 'linear-gradient(135deg, #c0392b, #e74c3c)' } : {}}>
    {label}
    {count > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${active ? 'bg-white/30 text-white' : highlight ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>{count}</span>}
  </button>
);

const Badge = ({ status }) => {
  const map = {
    new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700', converted: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-500', pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700', completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700', submitted: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700',
    disbursed: 'bg-purple-100 text-purple-700', processing: 'bg-yellow-100 text-yellow-700',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
};

const DetailModal = ({ item, onClose }) => {
  if (!item) return null;
  const skip = ['_id', '__v', 'password'];
  const entries = Object.entries(item).filter(([k]) => !skip.includes(k));
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6"
          onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-heading font-bold text-gray-900">Full Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
          </div>
          <div className="space-y-3">
            {entries.map(([k, v]) => (
              <div key={k} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-36 flex-shrink-0 pt-0.5">
                  {k.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm text-gray-800 break-all">
                  {v === null || v === undefined || v === '' ? '—'
                    : typeof v === 'boolean' ? (v ? 'Yes' : 'No')
                    : (k.toLowerCase().includes('date') || k === 'createdAt' || k === 'updatedAt')
                      ? new Date(v).toLocaleString('en-IN') : String(v)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DelBtn = ({ onClick }) => (
  <button onClick={onClick} title="Delete" className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
    <FaTrash size={11} />
  </button>
);

const ViewBtn = ({ onClick }) => (
  <button onClick={onClick} title="View details" className="p-1.5 rounded-lg text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-all">
    <FaEye size={12} />
  </button>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [cibilChecks, setCibilChecks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [editingScore, setEditingScore] = useState({});
  const [activeTab, setActiveTab] = useState('leads');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewItem, setViewItem] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) { toast.error('Please login first.'); navigate('/login'); return; }
    if (user.role !== 'admin') { toast.error('Access denied. Admin only.'); navigate('/'); return; }
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const [s, l, a, ap, u, f, c, d] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/leads'),
        axios.get('/api/appointments'),
        axios.get('/api/applications'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/feedback'),
        axios.get('/api/cibil'),
        axios.get('/api/documents'),
      ]);
      setStats(s.data.data);
      setLeads(l.data.data || []);
      setAppointments(a.data.data || []);
      setApplications(ap.data.data || []);
      setUsers(u.data.data || []);
      setFeedback(f.data.data || []);
      setCibilChecks(c.data.data || []);
      setDocuments(d.data.data || []);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (endpoint, id, label) => {
    if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      toast.success(`${label} deleted`);
      fetchData();
    } catch { toast.error(`Failed to delete ${label}`); }
  };

  const promoteToAdmin = async (id, name) => {
    if (!window.confirm(`Promote ${name} to admin?`)) return;
    try {
      await axios.put(`/api/admin/users/${id}/promote`);
      toast.success(`${name} is now an admin`);
      fetchData();
    } catch { toast.error('Failed to promote user'); }
  };

  const confirmAppointment = async (id, name) => {
    try {
      await axios.put(`/api/appointments/${id}/confirm`);
      toast.success(`Confirmed — email sent to ${name}`);
      fetchData();
    } catch { toast.error('Failed to confirm appointment'); }
  };

  const updateLeadStatus = async (id, status) => {
    try { await axios.put(`/api/leads/${id}`, { status }); fetchData(); }
    catch { toast.error('Failed to update status'); }
  };

  const updateAppStatus = async (id, status) => {
    try { await axios.put(`/api/applications/${id}`, { status }); fetchData(); }
    catch { toast.error('Failed to update status'); }
  };

  const updateCibilScore = async (id) => {
    const score = editingScore[id];
    if (!score || score < 300 || score > 900) { toast.error('Enter a valid score 300-900'); return; }
    try {
      await axios.put(`/api/cibil/${id}`, { score: Number(score), status: 'completed' });
      toast.success('CIBIL score saved');
      setEditingScore(prev => { const n = { ...prev }; delete n[id]; return n; });
      fetchData();
    } catch { toast.error('Failed to save score'); }
  };

  const downloadDocument = async (docId, filename, originalName) => {
    try {
      const response = await axios.get(`/api/documents/${docId}/download/${filename}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', originalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Document downloaded');
    } catch (error) {
      console.error('Download error:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to download document');
    }
  };

  const q = search.toLowerCase();
  const fLeads = leads.filter(l => !q || l.fullName?.toLowerCase().includes(q) || l.phone?.includes(q) || l.email?.toLowerCase().includes(q));
  const fApts  = appointments.filter(a => !q || a.fullName?.toLowerCase().includes(q) || a.phone?.includes(q));
  const fApps  = applications.filter(a => !q || a.fullName?.toLowerCase().includes(q) || a.phone?.includes(q) || a.email?.toLowerCase().includes(q));
  const fUsers = users.filter(u => !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
  const fFb    = feedback.filter(f => !q || f.name?.toLowerCase().includes(q) || f.message?.toLowerCase().includes(q));
  const fCibil = cibilChecks.filter(c => !q || c.name?.toLowerCase().includes(q) || c.pan?.toLowerCase().includes(q) || c.mobile?.includes(q));
  const fDocs  = documents.filter(d => !q || d.name?.toLowerCase().includes(q) || d.phone?.includes(q) || d.email?.toLowerCase().includes(q));

  if (authLoading || loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </div>
    </div>
  );

  const statCards = [
    { label: 'Total Leads',      value: stats?.totalLeads ?? 0,        sub: `${stats?.newLeads ?? 0} new`,                color: 'from-blue-500 to-blue-600',     tab: 'leads' },
    { label: 'Appointments',     value: stats?.totalAppointments ?? 0,  sub: `${stats?.pendingAppointments ?? 0} pending`,  color: 'from-green-500 to-green-600',   tab: 'appointments' },
    { label: 'Applications',     value: stats?.totalApplications ?? 0,  sub: `${stats?.submittedApplications ?? 0} submitted`, color: 'from-purple-500 to-purple-600', tab: 'applications' },
    { label: 'CIBIL Checks',     value: stats?.totalCibilChecks ?? 0,   sub: 'total requests',                             color: 'from-orange-500 to-orange-600', tab: 'cibil' },
    { label: 'Registered Users', value: users.length,                   sub: 'signed up',                                  color: 'from-pink-500 to-rose-500',     tab: 'users' },
    { label: 'Feedback',         value: feedback.length,                sub: feedback.length ? `avg ${(feedback.reduce((a, f) => a + f.rating, 0) / feedback.length).toFixed(1)}\u2605` : 'none yet', color: 'from-yellow-500 to-amber-500', tab: 'feedback' },
  ];

  // Filter today's leads
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLeads = fLeads.filter(l => new Date(l.createdAt) >= today);
  
  // Group today's leads by service
  const todayByService = todayLeads.reduce((acc, lead) => {
    const service = lead.serviceInterested || 'Other';
    if (!acc[service]) acc[service] = [];
    acc[service].push(lead);
    return acc;
  }, {});

  const tabs = [
    { key: 'today',        label: "Today's Leads", count: todayLeads.length, highlight: true },
    { key: 'leads',        label: 'All Leads',     count: fLeads.length },
    { key: 'appointments', label: 'Appointments',  count: fApts.length },
    { key: 'applications', label: 'Applications',  count: fApps.length },
    { key: 'cibil',        label: 'CIBIL Checks',  count: fCibil.length },
    { key: 'documents',    label: 'Documents',     count: fDocs.length },
    { key: 'users',        label: 'Users',         count: fUsers.length },
    { key: 'feedback',     label: 'Feedback',      count: fFb.length },
  ];

  const exportMap = {
    today:        () => exportCSV(todayLeads.map(l => ({ Name: l.fullName, Phone: l.phone, Email: l.email, Service: l.serviceInterested, Message: l.message || '', Status: l.status, Time: new Date(l.createdAt).toLocaleTimeString() })), 'todays-leads.csv'),
    leads:        () => exportCSV(fLeads.map(l => ({ Name: l.fullName, Phone: l.phone, Email: l.email, Service: l.serviceInterested, Message: l.message || '', Status: l.status, Date: new Date(l.createdAt).toLocaleDateString() })), 'leads.csv'),
    appointments: () => exportCSV(fApts.map(a => ({ Name: a.fullName, Phone: a.phone, Email: a.email, Service: a.service, Date: new Date(a.preferredDate).toLocaleDateString(), Time: a.preferredTime, Status: a.status })), 'appointments.csv'),
    applications: () => exportCSV(fApps.map(a => ({ Name: a.fullName, Phone: a.phone, Email: a.email, Service: a.serviceType, LoanAmount: a.loanAmount || '', MonthlyIncome: a.monthlyIncome || '', Employment: a.employmentType || '', City: a.city || '', Status: a.status, Date: new Date(a.createdAt).toLocaleDateString() })), 'applications.csv'),
    cibil:        () => exportCSV(fCibil.map(c => ({ Name: c.name, PAN: c.pan, DOB: new Date(c.dob).toLocaleDateString(), Mobile: c.mobile, Email: c.email, Score: c.score ?? 'Pending', Status: c.status, Date: new Date(c.createdAt).toLocaleDateString() })), 'cibil.csv'),
    documents:    () => exportCSV(fDocs.map(d => ({ Name: d.name, Phone: d.phone || '', Email: d.email || '', LoanType: d.loanType || '', Files: d.files?.map(f => f.label).join(', ') || '', Status: d.status, Date: new Date(d.createdAt).toLocaleDateString() })), 'documents.csv'),
    users:        () => exportCSV(fUsers.map(u => ({ Name: u.name, Email: u.email, Phone: u.phone || '', Role: u.role, Joined: new Date(u.createdAt).toLocaleDateString() })), 'users.csv'),
    feedback:     () => exportCSV(fFb.map(f => ({ Name: f.name, Email: f.email || '', Service: f.service || '', Rating: f.rating, Mood: moodLabels[f.mood], Message: f.message, Date: new Date(f.createdAt).toLocaleDateString() })), 'feedback.csv'),
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#faf8ff' }}>
      <DetailModal item={viewItem} onClose={() => setViewItem(null)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Everything in one place</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setActiveTab(s.tab)}
              className={`bg-gradient-to-br ${s.color} text-white rounded-xl p-4 shadow-sm cursor-pointer hover:scale-105 transition-transform`}>
              <p className="text-xs opacity-80 mb-1">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-xs opacity-70 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, email..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 bg-white" />
          </div>
          <button onClick={exportMap[activeTab]}
            className="px-4 py-2 text-sm font-semibold border border-accent text-accent rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
            Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {tabs.map(t => <TabBtn key={t.key} label={t.label} count={t.count} active={activeTab === t.key} highlight={t.highlight} onClick={() => setActiveTab(t.key)} />)}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-x-auto">

          {activeTab === 'today' && (
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-accent to-orange-500 rounded-full"></div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-gray-900">Today's Leads</h2>
                  <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              {todayLeads.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-400 text-lg font-medium">No leads received today yet</p>
                  <p className="text-gray-400 text-sm mt-1">Check back later or view all leads</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(todayByService).map(([service, serviceLeads]) => (
                    <div key={service} className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="bg-gradient-to-r from-accent/5 to-orange-500/5 px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent"></span>
                            {service}
                          </h3>
                          <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                            {serviceLeads.length} {serviceLeads.length === 1 ? 'lead' : 'leads'}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                              {['Time','Name','Phone','Email','Message','Status','Actions'].map(h => 
                                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {serviceLeads.map(l => (
                              <tr key={l._id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                  {new Date(l.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-4 py-3 font-medium whitespace-nowrap">{l.fullName}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{l.phone}</td>
                                <td className="px-4 py-3 text-gray-500">{l.email}</td>
                                <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{l.message || '—'}</td>
                                <td className="px-4 py-3">
                                  <select value={l.status} onChange={e => updateLeadStatus(l._id, e.target.value)}
                                    className="px-2 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-accent">
                                    {['new','contacted','qualified','converted','closed'].map(s => <option key={s} value={s}>{s}</option>)}
                                  </select>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-1">
                                    <ViewBtn onClick={() => setViewItem(l)} />
                                    <DelBtn onClick={() => deleteItem('/leads', l._id, 'lead')} />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'leads' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Service','Message','Status','Date','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fLeads.length === 0 ? <tr><td colSpan={8} className="text-center py-10 text-gray-400">No leads yet</td></tr> :
                fLeads.map(l => (
                  <tr key={l._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{l.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{l.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{l.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{l.serviceInterested}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{l.message || '—'}</td>
                    <td className="px-4 py-3">
                      <select value={l.status} onChange={e => updateLeadStatus(l._id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-accent">
                        {['new','contacted','qualified','converted','closed'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(l.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><div className="flex gap-1"><ViewBtn onClick={() => setViewItem(l)} /><DelBtn onClick={() => deleteItem('/leads', l._id, 'lead')} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'appointments' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Service','Date','Time','Status','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fApts.length === 0 ? <tr><td colSpan={8} className="text-center py-10 text-gray-400">No appointments yet</td></tr> :
                fApts.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{a.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{a.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.service}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(a.preferredDate).toLocaleDateString('en-IN', { timeZone: 'UTC' })}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.preferredTime}</td>
                    <td className="px-4 py-3"><Badge status={a.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 items-center">
                        <ViewBtn onClick={() => setViewItem(a)} />
                        {a.status === 'pending' && (
                          <button onClick={() => confirmAppointment(a._id, a.fullName)}
                            className="px-2 py-1 text-xs font-semibold rounded-lg text-white whitespace-nowrap"
                            style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                            Confirm
                          </button>
                        )}
                        <DelBtn onClick={() => deleteItem('/appointments', a._id, 'appointment')} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'applications' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Service','Loan Amt','Income','City','Status','Date','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fApps.length === 0 ? <tr><td colSpan={10} className="text-center py-10 text-gray-400">No applications yet</td></tr> :
                fApps.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{a.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{a.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.serviceType}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.loanAmount ? '\u20b9' + a.loanAmount.toLocaleString() : '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.monthlyIncome ? '\u20b9' + a.monthlyIncome.toLocaleString() : '—'}</td>
                    <td className="px-4 py-3">{a.city || '—'}</td>
                    <td className="px-4 py-3">
                      <select value={a.status} onChange={e => updateAppStatus(a._id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-accent">
                        {['submitted','processing','approved','rejected','disbursed'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><div className="flex gap-1"><ViewBtn onClick={() => setViewItem(a)} /><DelBtn onClick={() => deleteItem('/applications', a._id, 'application')} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'cibil' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','PAN','DOB','Mobile','Email','Score','Status','Date','Update Score','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fCibil.length === 0 ? <tr><td colSpan={10} className="text-center py-10 text-gray-400">No CIBIL requests yet</td></tr> :
                fCibil.map(c => (
                  <tr key={c._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.pan}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(c.dob).toLocaleDateString('en-IN', { timeZone: 'UTC' })}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{c.mobile}</td>
                    <td className="px-4 py-3 text-gray-500">{c.email}</td>
                    <td className="px-4 py-3">
                      {c.score
                        ? <span className={`font-bold text-base ${c.score >= 750 ? 'text-green-600' : c.score >= 650 ? 'text-yellow-600' : 'text-red-600'}`}>{c.score}</span>
                        : <span className="text-gray-400 text-xs italic">Pending</span>}
                    </td>
                    <td className="px-4 py-3"><Badge status={c.status || 'pending'} /></td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <input type="number" min="300" max="900" placeholder="300-900"
                          value={editingScore[c._id] ?? ''}
                          onChange={e => setEditingScore(prev => ({ ...prev, [c._id]: e.target.value }))}
                          className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-accent" />
                        <button onClick={() => updateCibilScore(c._id)}
                          className="px-2 py-1 text-xs font-semibold rounded-lg text-white whitespace-nowrap"
                          style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                          Save
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3"><div className="flex gap-1"><ViewBtn onClick={() => setViewItem(c)} /><DelBtn onClick={() => deleteItem('/cibil', c._id, 'CIBIL record')} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'documents' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Loan Type','Documents','Status','Date','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fDocs.length === 0 ? <tr><td colSpan={8} className="text-center py-10 text-gray-400">No document submissions yet</td></tr> :
                fDocs.map(d => (
                  <tr key={d._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{d.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{d.phone || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{d.email || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{d.loanType || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {d.files?.map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">{f.label}</span>
                            <button
                              onClick={() => downloadDocument(d._id, f.filename, f.originalName)}
                              className="p-1 rounded hover:bg-blue-50 text-blue-500 transition-colors"
                              title="Download file"
                            >
                              <FaDownload size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge status={d.status} /></td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(d.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><div className="flex gap-1"><ViewBtn onClick={() => setViewItem(d)} /><DelBtn onClick={() => deleteItem('/documents', d._id, 'document submission')} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'users' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Email','Phone','Role','Joined','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fUsers.length === 0 ? <tr><td colSpan={6} className="text-center py-10 text-gray-400">No users yet</td></tr> :
                fUsers.map(u => (
                  <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">{u.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 items-center">
                        <ViewBtn onClick={() => setViewItem(u)} />
                        {u.role !== 'admin' && (
                          <button onClick={() => promoteToAdmin(u._id, u.name)}
                            className="px-2 py-1 text-xs font-semibold rounded-lg border whitespace-nowrap"
                            style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.05)' }}>
                            Make Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'feedback' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Email','Service','Rating','Mood','Message','Date','Actions'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody>
                {fFb.length === 0 ? <tr><td colSpan={8} className="text-center py-10 text-gray-400">No feedback yet</td></tr> :
                fFb.map(f => (
                  <tr key={f._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{f.name || 'Anonymous'}</td>
                    <td className="px-4 py-3 text-gray-500">{f.email || '—'}</td>
                    <td className="px-4 py-3">{f.service || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <FaStar key={s} size={12} color={s <= f.rating ? '#c0392b' : '#e5e7eb'} />)}</div>
                    </td>
                    <td className="px-4 py-3">{moodLabels[f.mood] || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[180px] truncate">{f.message || '—'}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(f.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><div className="flex gap-1"><ViewBtn onClick={() => setViewItem(f)} /><DelBtn onClick={() => deleteItem('/feedback', f._id, 'feedback')} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
