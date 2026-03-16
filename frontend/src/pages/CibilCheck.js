import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
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
      setFormData({
        name: '',
        pan: '',
        dob: '',
        mobile: '',
        email: '',
        consent: false
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: '#faf8ff' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            CIBIL <span className="gradient-text">Score Check</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Check your credit score and get personalized loan offers
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Email *
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
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                  className="mt-1"
                />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  I hereby authorize CS Smart Finserve to check my CIBIL score and credit report. 
                  I understand that this information will be used to provide me with personalized 
                  loan offers and financial advice.
                </span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 btn-primary disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Check CIBIL Score'}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 card"
          style={{ background: '#f0eeff' }}
        >
          <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">
            Why Check Your CIBIL Score?
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>✓ Know your creditworthiness before applying for loans</li>
            <li>✓ Get better interest rates with a good credit score</li>
            <li>✓ Identify and correct errors in your credit report</li>
            <li>✓ Improve your chances of loan approval</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default CibilCheck;
