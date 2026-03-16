import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import api from '../utils/api';

const services = [
  'Home Loan',
  'Auto Loan',
  'Personal Loan',
  'Business Loan',
  'Used Car Loan',
  'Loan Against Property',
  'General Insurance',
  'CIBIL Check',
  'Other',
];

const emojis = [
  { icon: '😞', label: 'Very Unhappy' },
  { icon: '😕', label: 'Unhappy' },
  { icon: '😐', label: 'Neutral' },
  { icon: '😊', label: 'Happy' },
  { icon: '😄', label: 'Very Happy' },
];

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [mood, setMood] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.error('Please give a star rating.');
    if (mood === null) return toast.error('Please select your mood.');
    setLoading(true);
    try {
      await api.post('/feedback', { ...form, rating, mood });
      setSubmitted(true);
      toast.success('Thank you for your feedback!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>
      {/* Hero */}
      <section
        className="pt-32 pb-20 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #8b0000 0%, #c0392b 50%, #e74c3c 100%)' }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
            Share Your Experience
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">We'd Love Your Feedback</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Your experience helps us serve you better. Tell us how we did.
          </p>
        </motion.div>
      </section>

      {/* Form Card */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-12 text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-3">Thank You!</h2>
              <p className="text-gray-600">Your feedback has been submitted. We appreciate you taking the time.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-4xl transition-transform hover:scale-110 focus:outline-none"
                      >
                        <FaStar
                          color={(hoverRating || rating) >= star ? '#c0392b' : '#e5e7eb'}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-accent mt-1 font-medium">
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                    </p>
                  )}
                </div>

                {/* Mood Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">How do you feel?</label>
                  <div className="flex gap-3 flex-wrap">
                    {emojis.map((e, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setMood(i)}
                        className={`flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all text-2xl ${
                          mood === i
                            ? 'border-accent bg-red-50 scale-105'
                            : 'border-gray-200 hover:border-accent'
                        }`}
                      >
                        <span>{e.icon}</span>
                        <span className="text-xs text-gray-500 mt-1">{e.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Used</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-gray-700"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email (optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your experience..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-accent text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
