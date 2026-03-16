import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const moodLabels = ['😞 Very Unhappy', '😕 Unhappy', '😐 Neutral', '😊 Happy', '😄 Very Happy'];

const exportCSV = (data, filename) => {
  if (!data.length) return toast.error('No data to export');
  const keys = Object.keys(data[0]).filter(k => k !== '__v' && k !== '_id');
  const csv = [keys.join(','), ...data.map(row =>
    keys.map(k => `"${(row[k] ?? '').toString().replace(/"/g, '""')}"`).join(',')
  )].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const TabBtn = ({ label, active, onClick }) => (
  <button onClick={onClick}
    className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
      active ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
    }`}
    style={active ? { background: 'linear-gradient(135deg, #c0392b, #e74c3c)' } : {}}>
    {label}
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
  const [editingScore, setEditingScore] = useState({});
  const [activeTab, setActiveTab] = useState('leads');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) { toast.error('Please login first.'); navigate('/login'); return; }
    if (user.role !== 'admin') { toast.error('Access denied. Admin only.'); navigate('/'); return; }
    fetchData();
  }, [user, authLoading]);

  const fetchData = async () => {
    try {
      const [statsRes, leadsRes, aptsRes, appsRes, usersRes, fbRes, cibilRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/leads'),
        api.get('/appointments'),
        api.get('/applications'),
        api.get('/admin/users'),
        api.get('/admin/feedback'),
        api.get('/cibil'),
      ]);
      setStats(statsRes.data.data);
      setLeads(leadsRes.data.data || []);
      setAppointments(aptsRes.data.data || []);
      setApplications(appsRes.data.data || []);
      setUsers(usersRes.data.data || []);
      setFeedback(fbRes.data.data || []);
      setCibilChecks(cibilRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const promoteToAdmin = async (id, name) => {
    if (!window.confirm(`Promote ${name} to admin?`)) return;
    try {
      await api.put(`/admin/users/${id}/promote`);
      toast.success(`${name} is now an admin`);
      fetchData();
    } catch { toast.error('Failed to promote user'); }
  };

  const confirmAppointment = async (id, name) => {
    try {
      await api.put(`/appointments/${id}/confirm`);
      toast.success(`Appointment confirmed — email sent to ${name}`);
      fetchData();
    } catch { toast.error('Failed to confirm appointment'); }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      toast.success('Status updated');
      fetchData();
    } catch { toast.error('Failed to update status'); }
  };

  const updateCibilScore = async (id) => {
    const score = editingScore[id];
    if (!score || score < 300 || score > 900) {
      toast.error('Enter a valid score between 300 and 900');
      return;
    }
    try {
      await api.put(`/cibil/${id}`, { score: Number(score), status: 'completed' });
      toast.success('CIBIL score updated');
      setEditingScore(prev => { const n = { ...prev }; delete n[id]; return n; });
      fetchData();
    } catch { toast.error('Failed to update score'); }
  };

  if (authLoading || loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 font-semibold mb-2">Error loading dashboard</p>
        <p className="text-gray-500 text-sm">{error}</p>
        <button onClick={fetchData} className="mt-4 px-6 py-2 bg-accent text-white rounded-lg text-sm">Retry</button>
      </div>
    </div>
  );

  const statCards = [
    { label: 'Total Leads', value: stats?.totalLeads ?? 0, sub: `${stats?.newLeads ?? 0} new`, color: 'from-blue-500 to-blue-600' },
    { label: 'Appointments', value: stats?.totalAppointments ?? 0, sub: `${stats?.pendingAppointments ?? 0} pending`, color: 'from-green-500 to-green-600' },
    { label: 'Applications', value: stats?.totalApplications ?? 0, sub: `${stats?.submittedApplications ?? 0} submitted`, color: 'from-purple-500 to-purple-600' },
    { label: 'CIBIL Checks', value: stats?.totalCibilChecks ?? 0, sub: 'total checks', color: 'from-orange-500 to-orange-600' },
    { label: 'Registered Users', value: users.length, sub: 'signed up', color: 'from-pink-500 to-rose-500' },
    { label: 'Feedback', value: feedback.length, sub: feedback.length ? `avg ${(feedback.reduce((a,f)=>a+f.rating,0)/feedback.length).toFixed(1)}★` : 'none yet', color: 'from-yellow-500 to-amber-500' },
  ];

  const tabs = ['leads', 'appointments', 'applications', 'cibil', 'users', 'feedback'];

  const exportMap = {
    leads: () => exportCSV(leads.map(l => ({ Name: l.fullName, Phone: l.phone, Email: l.email, Service: l.serviceInterested, Status: l.status, Date: new Date(l.createdAt).toLocaleDateString() })), 'leads.csv'),
    users: () => exportCSV(users.map(u => ({ Name: u.name, Email: u.email, Phone: u.phone || '', Role: u.role, Joined: new Date(u.createdAt).toLocaleDateString() })), 'users.csv'),
    feedback: () => exportCSV(feedback.map(f => ({ Name: f.name, Email: f.email || '', Service: f.service || '', Rating: f.rating, Mood: moodLabels[f.mood], Message: f.message, Date: new Date(f.createdAt).toLocaleDateString() })), 'feedback.csv'),
    appointments: () => exportCSV(appointments.map(a => ({ Name: a.fullName, Phone: a.phone, Date: new Date(a.preferredDate).toLocaleDateString(), Time: a.preferredTime, Status: a.status })), 'appointments.csv'),
    applications: () => exportCSV(applications.map(a => ({ Name: a.fullName, Phone: a.phone, Email: a.email, Service: a.serviceType, 'Loan Amount': a.loanAmount || '', 'Monthly Income': a.monthlyIncome || '', Employment: a.employmentType || '', City: a.city || '', Status: a.status, Date: new Date(a.createdAt).toLocaleDateString() })), 'applications.csv'),
    cibil: () => exportCSV(cibilChecks.map(c => ({ Name: c.name, PAN: c.pan, DOB: new Date(c.dob).toLocaleDateString(), Mobile: c.mobile, Email: c.email, Score: c.score ?? 'Pending', Status: c.status, Date: new Date(c.createdAt).toLocaleDateString() })), 'cibil_checks.csv'),
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#faf8ff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage leads, users, appointments, applications and feedback</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`bg-gradient-to-br ${s.color} text-white rounded-xl p-4 shadow-sm`}>
              <p className="text-xs opacity-80 mb-1">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
              <p className="text-xs opacity-70 mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs + Export */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map(t => <TabBtn key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} active={activeTab === t} onClick={() => setActiveTab(t)} />)}
          </div>
          <button onClick={exportMap[activeTab]}
            className="px-4 py-2 text-sm font-semibold border border-accent text-accent rounded-lg hover:bg-red-50 transition-colors">
            ⬇ Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-x-auto">
          {activeTab === 'leads' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Service','Status','Date'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody>
                {leads.length === 0 ? <tr><td colSpan={6} className="text-center py-10 text-gray-400">No leads yet</td></tr> :
                leads.map(l => (
                  <tr key={l._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{l.fullName}</td>
                    <td className="px-4 py-3">{l.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{l.email}</td>
                    <td className="px-4 py-3">{l.serviceInterested}</td>
                    <td className="px-4 py-3">
                      <select value={l.status} onChange={e => updateLeadStatus(l._id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-accent">
                        {['new','contacted','qualified','converted','closed'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(l.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'appointments' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Service','Date','Time','Status','Action'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? <tr><td colSpan={8} className="text-center py-10 text-gray-400">No appointments yet</td></tr> :
                appointments.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{a.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{a.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.service}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(a.preferredDate).toLocaleDateString('en-IN', { timeZone: 'UTC' })}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.preferredTime}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        a.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        a.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        a.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {a.status === 'pending' && (
                        <button onClick={() => confirmAppointment(a._id, a.fullName)}
                          className="px-3 py-1 text-xs font-semibold rounded-lg text-white transition-all hover:shadow-sm whitespace-nowrap"
                          style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                          ✓ Confirm & Email
                        </button>
                      )}
                      {a.status === 'confirmed' && (
                        <span className="text-xs text-green-600 font-medium">✓ Email sent</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'applications' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Phone','Email','Service','Loan Amt','Income','Employment','City','Status','Date'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {applications.length === 0 ? <tr><td colSpan={10} className="text-center py-10 text-gray-400">No applications yet</td></tr> :
                applications.map(a => (
                  <tr key={a._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{a.fullName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.phone}</td>
                    <td className="px-4 py-3 text-gray-500">{a.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.serviceType}</td>
                    <td className="px-4 py-3 whitespace-nowrap">₹{a.loanAmount?.toLocaleString() || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">₹{a.monthlyIncome?.toLocaleString() || '—'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{a.employmentType || '—'}</td>
                    <td className="px-4 py-3">{a.city || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        a.status === 'approved' ? 'bg-green-100 text-green-700' :
                        a.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                        a.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        a.status === 'disbursed' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-600'}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'users' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Email','Phone','Role','Joined','Action'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody>
                {users.length === 0 ? <tr><td colSpan={6} className="text-center py-10 text-gray-400">No users yet</td></tr> :
                users.map(u => (
                  <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">{u.phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {u.role !== 'admin' && (
                        <button onClick={() => promoteToAdmin(u._id, u.name)}
                          className="px-3 py-1 text-xs font-semibold rounded-lg border transition-all hover:shadow-sm"
                          style={{ color: '#c0392b', borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.05)' }}>
                          Promote to Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'feedback' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','Service','Rating','Mood','Message','Date'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>)}</tr>
              </thead>
              <tbody>
                {feedback.length === 0 ? <tr><td colSpan={6} className="text-center py-10 text-gray-400">No feedback yet</td></tr> :
                feedback.map(f => (
                  <tr key={f._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{f.name || 'Anonymous'}</td>
                    <td className="px-4 py-3">{f.service || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <FaStar key={s} size={12} color={s <= f.rating ? '#c0392b' : '#e5e7eb'} />)}
                      </div>
                    </td>
                    <td className="px-4 py-3">{moodLabels[f.mood] || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{f.message || '—'}</td>
                    <td className="px-4 py-3 text-gray-400">{new Date(f.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'cibil' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Name','PAN','DOB','Mobile','Email','Score','Status','Date','Update Score'].map(h => <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">{h}</th>)}</tr>
              </thead>
              <tbody>
                {cibilChecks.length === 0 ? <tr><td colSpan={9} className="text-center py-10 text-gray-400">No CIBIL check requests yet</td></tr> :
                cibilChecks.map(c => (
                  <tr key={c._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-3 font-mono text-xs">{c.pan}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(c.dob).toLocaleDateString('en-IN', { timeZone: 'UTC' })}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{c.mobile}</td>
                    <td className="px-4 py-3 text-gray-500">{c.email}</td>
                    <td className="px-4 py-3">
                      {c.score ? (
                        <span className={`font-bold text-base ${c.score >= 750 ? 'text-green-600' : c.score >= 650 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {c.score}
                        </span>
                      ) : <span className="text-gray-400 text-xs">Pending</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        c.status === 'completed' ? 'bg-green-100 text-green-700' :
                        c.status === 'processed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="300" max="900"
                          placeholder="300–900"
                          value={editingScore[c._id] ?? ''}
                          onChange={e => setEditingScore(prev => ({ ...prev, [c._id]: e.target.value }))}
                          className="w-20 px-2 py-1 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                        <button onClick={() => updateCibilScore(c._id)}
                          className="px-3 py-1 text-xs font-semibold rounded-lg text-white whitespace-nowrap"
                          style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                          Save
                        </button>
                      </div>
                    </td>
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
