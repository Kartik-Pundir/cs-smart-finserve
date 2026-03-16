import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../utils/api';

const services = [
  'Home Loan', 'Auto Loan', 'Personal Loan', 'Business Loan',
  'General Insurance', 'Used Car Loan', 'Loan Against Property',
];

const CallbackForm = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', serviceInterested: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/leads', formData);
      toast.success('Message sent! Check your email for confirmation.');
      setSent(true);
      setFormData({ fullName: '', phone: '', email: '', serviceInterested: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
          style={{ background: 'rgba(192,57,43,0.08)' }}>✅</div>
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm mb-1">We've received your message and sent a confirmation to your email.</p>
        <p className="text-gray-500 text-sm">Our team will reach out within <strong>2–4 hours</strong>.</p>
        <button onClick={() => setSent(false)}
          className="mt-6 px-6 py-2 text-sm text-accent border border-accent rounded-lg hover:bg-red-50 transition-colors">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-gray-700 mb-1.5 font-medium text-sm">Full Name *</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
            required className="input-field" placeholder="Rahul Sharma" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1.5 font-medium text-sm">Phone Number *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
            required pattern="[0-9]{10}" className="input-field" placeholder="10-digit mobile number" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1.5 font-medium text-sm">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            required className="input-field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1.5 font-medium text-sm">Service Interested *</label>
          <select name="serviceInterested" value={formData.serviceInterested} onChange={handleChange}
            required className="input-field">
            <option value="">Select a service</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 mb-1.5 font-medium text-sm">Message (Optional)</label>
          <textarea name="message" value={formData.message} onChange={handleChange}
            rows={4} className="input-field resize-none"
            placeholder="Tell us about your requirements..." />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full mt-6 py-3 bg-accent text-white rounded-xl font-bold text-base hover:shadow-lg transition-all disabled:opacity-50 hover:scale-[1.01]">
        {loading ? 'Sending...' : 'Send Message →'}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        📧 You'll receive an instant confirmation email once submitted.
      </p>
    </motion.form>
  );
};

export default CallbackForm;
