import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Insurance = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', serviceType: 'General Insurance', loanAmount: '', employmentType: 'salaried', monthlyIncome: '', city: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/applications', formData);
      toast.success('Application submitted successfully!');
      setFormData({ fullName: '', email: '', phone: '', serviceType: 'General Insurance', loanAmount: '', employmentType: 'salaried', monthlyIncome: '', city: '' });
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="bg-gradient-to-br from-red-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaShieldAlt className="text-6xl mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">General Insurance</h1>
          <p className="text-xl md:text-2xl mb-6">Protect What Matters Most</p>
          <a href="#apply" className="inline-block px-8 py-4 bg-white text-red-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">Get Quote</a>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div id="apply" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-white mb-12">Get Insurance Quote</h2>
          <form onSubmit={handleSubmit} className="card max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Full Name *</label><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required className="input-field" /></div>
              <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email *</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="input-field" /></div>
              <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Phone *</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required pattern="[0-9]{10}" className="input-field" /></div>
              <div><label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">City *</label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required className="input-field" /></div>
            </div>
            <button type="submit" disabled={loading} className="w-full mt-6 btn-primary disabled:opacity-50">{loading ? 'Submitting...' : 'Submit Request'}</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Insurance;
