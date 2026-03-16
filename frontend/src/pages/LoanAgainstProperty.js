import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBuilding } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../utils/api';
import DocumentUpload from '../components/DocumentUpload';
import LoanCTABanner from '../components/LoanCTABanner';

const steps = [
  { n: '01', title: 'Property Assessment',        desc: 'Share your property details — type, location, and estimated value — in under 2 minutes.' },
  { n: '02', title: 'Eligibility Check',          desc: 'We instantly calculate your eligible loan amount based on property value and income.' },
  { n: '03', title: 'Upload Documents',           desc: 'Submit property papers, KYC, and income proof digitally — no branch visit needed.' },
  { n: '04', title: 'Legal & Technical Check',    desc: 'We coordinate the property legal and technical verification on your behalf.' },
  { n: '05', title: 'Get a Personalised Offer',   desc: 'Receive a tailored LAP offer with the best rate, tenure, and zero hidden charges.' },
  { n: '06', title: 'Loan Sanctioned',            desc: 'Receive your sanction letter within 5–7 working days of document submission.' },
  { n: '07', title: 'Funds Disbursed',            desc: 'Amount credited to your account. Use it for business, education, or any purpose.' },
];

const LoanAgainstProperty = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', serviceType: 'Loan Against Property',
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
      await api.post('/applications', formData);
      toast.success('Application submitted successfully!');
      setFormData({ fullName: '', email: '', phone: '', serviceType: 'Loan Against Property', loanAmount: '', employmentType: 'salaried', monthlyIncome: '', city: '' });
    } catch { toast.error('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(192,57,43,0.88) 100%), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">Loan Against Property</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Don't Sell It. Leverage It.</h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">Unlock the value of your property. Get up to 70% of property value at rates starting from 8.5%.</p>
            <a href="#apply" className="inline-block px-8 py-4 bg-white text-accent rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">Apply Now →</a>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: '#f0eeff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">Why Choose Us</span>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Why Choose Our LAP?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Loan up to 70% of Property Value', 'Rates Starting from 8.5%', 'Tenure up to 15 Years', 'Residential & Commercial Property', 'Balance Transfer Available', 'Minimal Documentation'].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-xl p-5 border border-gray-100" style={{ background: '#faf8ff' }}>
                <FaCheckCircle className="text-accent text-xl flex-shrink-0" />
                <p className="text-gray-700 font-medium">{f}</p>
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
            <h2 className="text-3xl font-heading font-bold text-gray-900">Applying for a Loan Against Property was never this easy</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-hide">
              {steps.map((step, i) => (
                <div key={i} ref={el => stepRefs.current[i] = el} onClick={() => handleStepClick(i)}
                  className={`flex gap-4 items-start p-4 rounded-2xl cursor-pointer transition-all duration-500 ${
                    activeStep === i ? 'bg-accent text-white shadow-lg scale-[1.02]' : 'bg-white border border-gray-100 hover:border-accent'
                  }`}>
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
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-gradient-to-br from-accent to-red-800 rounded-3xl p-10 text-white shadow-2xl">
                <FaBuilding className="text-6xl mb-6 opacity-80" />
                <h3 className="text-2xl font-heading font-bold mb-3">Your property is your biggest asset. Use it.</h3>
                <p className="text-white/80 mb-6">Fund your business expansion, child's education, or medical needs — without selling your property.</p>
                <div className="space-y-3">
                  {['Property stays in your name', 'No end-use restriction', 'Dedicated relationship manager'].map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
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

      <DocumentUpload loanType="Loan Against Property" />

      {/* Form */}
      <section id="apply" className="py-20" style={{ background: '#f0eeff' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">Apply Now</span>
            <h2 className="text-3xl font-heading font-bold text-gray-900">Apply for Loan Against Property</h2>
          </motion.div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{ label: 'Full Name', key: 'fullName', type: 'text' }, { label: 'Email', key: 'email', type: 'email' }, { label: 'Phone', key: 'phone', type: 'tel' }, { label: 'Loan Amount (₹)', key: 'loanAmount', type: 'number' }, { label: 'Monthly Income (₹)', key: 'monthlyIncome', type: 'number' }, { label: 'City', key: 'city', type: 'text' }].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-gray-700 mb-2 font-medium text-sm">{label} *</label>
                  <input type={type} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} required className="input-field" />
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
            <button type="submit" disabled={loading} className="w-full mt-6 py-3 bg-accent text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Application →'}
            </button>
          </form>
        </div>
      </section>
      <LoanCTABanner loanType="Loan Against Property" />
    </div>
  );
};

export default LoanAgainstProperty;
