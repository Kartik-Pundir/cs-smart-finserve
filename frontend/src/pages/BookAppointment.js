import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import api from '../utils/api';

const services = [
  'Home Loan', 'Auto Loan', 'Personal Loan', 'Business Loan',
  'Used Car Loan', 'Loan Against Property', 'General Insurance', 'CIBIL Check', 'Other'
];

const timeSlots = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', service: '', preferredDate: '', preferredTime: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/appointments', formData);
      setSubmitted(true);
      toast.success('Appointment booked successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  if (submitted) return (
    <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: '#faf8ff' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-4">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">Appointment Booked!</h2>
        <p className="text-gray-500 mb-2">We've received your appointment request.</p>
        <p className="text-gray-500 text-sm">Our team will confirm your slot within <strong>2–4 hours</strong>.</p>
        <button onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-2 text-sm border border-accent text-accent rounded-lg hover:bg-red-50 transition-colors">
          Book another appointment
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20" style={{ background: '#faf8ff' }}>
      {/* Hero */}
      <div className="py-12 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #c0392b 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Book an Appointment</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            Schedule a free consultation with our financial experts at your convenience.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left — Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-4">Why meet us?</h2>
            {[
              { icon: '🎯', title: 'Personalised Advice', desc: 'Get loan recommendations tailored to your profile and needs.' },
              { icon: '⚡', title: 'Fast Processing', desc: 'Our experts help you get approvals faster with the right documents.' },
              { icon: '🔒', title: 'Completely Free', desc: 'No charges for consultation.' },
              { icon: '🏦', title: '20+ Bank Partners', desc: 'We compare across banks to get you the best rate.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 mb-4">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-3">Office Hours</p>
            <p className="text-xs text-gray-500">Mon – Sat: 10:00 AM – 6:00 PM</p>
            <p className="text-xs text-gray-500 mt-1">Sunday: Closed</p>
            <p className="text-xs text-gray-400 mt-3">102, Lala Ram Market, Sector 17, Sukhrali, Gurgaon, Haryana 122001</p>
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
            <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Schedule Your Visit</h3>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm flex items-center gap-1.5">
                    <FaUser className="text-accent text-xs" /> Full Name *
                  </label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    required className="input-field" placeholder="Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm flex items-center gap-1.5">
                    <FaPhone className="text-accent text-xs" /> Phone Number *
                  </label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    required pattern="[0-9]{10}" className="input-field" placeholder="10-digit mobile number" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm flex items-center gap-1.5">
                    <FaEnvelope className="text-accent text-xs" /> Email Address *
                  </label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    required className="input-field" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm">Service *</label>
                  <select name="service" value={formData.service} onChange={handleChange}
                    required className="input-field">
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm flex items-center gap-1.5">
                    <FaCalendarAlt className="text-accent text-xs" /> Preferred Date *
                  </label>
                  <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange}
                    required min={today} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1.5 font-medium text-sm flex items-center gap-1.5">
                    <FaClock className="text-accent text-xs" /> Preferred Time *
                  </label>
                  <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}
                    required className="input-field">
                    <option value="">Select a time slot</option>
                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1.5 font-medium text-sm">Message (Optional)</label>
                <textarea name="message" value={formData.message} onChange={handleChange}
                  rows={3} className="input-field resize-none"
                  placeholder="Any specific questions or requirements..." />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                {loading ? 'Booking...' : 'Book Appointment →'}
              </button>

              <p className="text-center text-xs text-gray-400">
                📞 We'll call you to confirm your appointment slot.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;
