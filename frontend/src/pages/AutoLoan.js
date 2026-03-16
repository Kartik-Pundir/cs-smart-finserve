import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCarSide } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import DocumentUpload from '../components/DocumentUpload';
import LoanCTABanner from '../components/LoanCTABanner';

const steps = [
  { n: '01', title: 'Fill the Application',      desc: 'Complete the simple online form with your basic details and loan requirement.' },
  { n: '02', title: 'Get a Personalised Offer',  desc: 'Receive a customised car loan offer based on your income, credit profile, and chosen vehicle.' },
  { n: '03', title: 'Upload Documents',          desc: 'Submit your ID, income proof, and bank statements digitally — no physical visits needed.' },
  { n: '04', title: 'Expert Review',             desc: 'Our team reviews your file and coordinates with the lender on your behalf.' },
  { n: '05', title: 'Get Instant Approval',      desc: 'Receive your sanction letter within 24 hours — one of the fastest in the industry.' },
  { n: '06', title: 'Dealer Payment',            desc: 'Funds are transferred directly to the dealer — no cash handling, fully secure.' },
  { n: '07', title: 'Drive Home Your Car',       desc: 'Collect your keys and hit the road. Your dream car is now yours.' },
];

const AutoLoan = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', serviceType: 'Auto Loan',
    loanAmount: '', employmentType: 'salaried', monthlyIncome: '', city: ''
  });
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);
  const sectionRef = useRef(null);
  const isVisible = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isVisible.current && !pausedRef.current) setActiveStep(prev => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (stepRefs.current[activeStep]) {
      stepRefs.current[activeStep].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeStep]);

  const handleStepClick = (i) => {
    setActiveStep(i);
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/applications', formData);
      toast.success(response.data.message);
      setFormData({ fullName: '', email: '', phone: '', serviceType: 'Auto Loan', loanAmount: '', employmentType: 'salaried', monthlyIncome: '', city: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>

      {/* Hero */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(192,57,43,0.88) 100%), url(https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1400&q=80)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">Auto Loan</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Zero to Keys in 24 Hours.</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">Drive your dream car today. We compare 50+ lenders to get you the lowest EMI with zero hidden charges.</p>
            <a href="#apply" className="inline-block px-8 py-4 bg-white text-accent rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Apply Now →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: '#f0eeff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">Why Choose Us</span>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Why Choose Our Auto Loan?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Lowest Interest Rates Starting from 7.5%',
              'Quick Approval in 24 Hours',
              'Up to 100% On-Road Financing',
              'Flexible Tenure up to 7 Years',
              'Minimal Documentation',
              'No Hidden Charges',
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-xl p-5 border border-gray-100" style={{ background: '#faf8ff' }}>
                <FaCheckCircle className="text-accent text-xl flex-shrink-0" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-20" style={{ background: '#faf8ff' }}>
        <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">Simple Process</span>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Applying for a Car Loan was never this easy</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Steps */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-hide">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={el => stepRefs.current[i] = el}
                  onClick={() => handleStepClick(i)}
                  className={`flex gap-4 items-start p-4 rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeStep === i ? 'bg-accent text-white shadow-lg scale-[1.02]' : 'bg-white border border-gray-100 hover:border-accent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors duration-500 ${
                    activeStep === i ? 'bg-white text-accent' : 'bg-red-100 text-accent'
                  }`}>{step.n}</div>
                  <div>
                    <h4 className={`font-bold mb-1 transition-colors duration-500 ${activeStep === i ? 'text-white' : 'text-gray-900'}`}>{step.title}</h4>
                    <p className={`text-sm transition-colors duration-500 ${activeStep === i ? 'text-white/85' : 'text-gray-500'}`}>{step.desc}</p>
                  </div>
                </div>
              ))}
              <a href="#apply" className="inline-block mt-2 px-8 py-3 bg-accent text-white rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105">Apply Now →</a>
            </motion.div>

            {/* Visual card */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-accent to-red-800 rounded-3xl p-10 text-white shadow-2xl">
                <FaCarSide className="text-6xl mb-6 opacity-80" />
                <h3 className="text-2xl font-heading font-bold mb-3">Get an instant loan sanction</h3>
                <p className="text-white/80 mb-6">Fast, digital, and completely hassle-free. Our team handles everything from comparison to disbursement.</p>
                <div className="space-y-3">
                  {['No branch visit required', 'Paperless process', 'Real-time status updates'].map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20" style={{ background: '#f0eeff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">Eligibility</span>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Who Can Apply?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { type: 'Salaried', items: ['Age: 21 to 65 years', 'Minimum Income: ₹25,000/month', 'Employment: Minimum 2 years', 'CIBIL Score: 650+'] },
              { type: 'Self-Employed', items: ['Age: 21 to 65 years', 'Minimum Income: ₹50,000/month', 'Business Vintage: 3 years', 'CIBIL Score: 650+'] },
            ].map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 border-l-4 border-accent shadow-md" style={{ background: '#faf8ff' }}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{cat.type}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Upload */}
      <DocumentUpload loanType="Auto Loan" />

      {/* Application Form */}
      <section id="apply" className="py-20" style={{ background: '#f0eeff' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">Apply Now</span>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Apply for Auto Loan</h2>
          </motion.div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', key: 'fullName', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'tel' },
                { label: 'Loan Amount (₹)', key: 'loanAmount', type: 'number' },
                { label: 'Monthly Income (₹)', key: 'monthlyIncome', type: 'number' },
                { label: 'City', key: 'city', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-gray-700 mb-2 font-medium text-sm">{label} *</label>
                  <input type={type} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    required className="input-field" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2 font-medium text-sm">Employment Type *</label>
                <select value={formData.employmentType} onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })} className="input-field">
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full mt-6 py-3 bg-accent text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Application →'}
            </button>
          </form>
        </div>
      </section>

      <LoanCTABanner loanType="Auto Loan" />
    </div>
  );
};

export default AutoLoan;
