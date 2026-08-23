import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome, FaCar, FaUserTie, FaBriefcase, FaCarSide,
  FaBuilding, FaShieldAlt, FaArrowRight, FaChartLine,
  FaCheckCircle, FaPhoneAlt, FaUniversity, FaBolt, FaBullseye, FaFileAlt, FaHandshake, FaLock
} from 'react-icons/fa';

const services = [
  {
    icon: <FaHome />,
    title: 'Home Loan',
    desc: 'Turn your dream home into reality with competitive rates starting from 8.5% p.a., with flexible financing based on your requirements.',
    rate: '8.5%',
    amount: 'Flexible',
    tenure: 'Customised',
    badge: 'Most Popular',
    link: '/home-loan',
    color: '#a8823a',
    gradient: 'linear-gradient(135deg, #a8823a, #8d6b2c)',
    features: ['Zero prepayment charges', 'Balance transfer facility', 'Tax benefits u/s 80C'],
    bgLight: '#fff5f5',
  },
  {
    icon: <FaCar />,
    title: 'Auto Loan',
    desc: 'Drive home your new car today. Quick approval, minimal paperwork, and customized loan solutions for all vehicle types.',
    rate: '8.7%',
    amount: 'Flexible',
    tenure: 'Customised',
    badge: 'Quick Approval',
    link: '/auto-loan',
    color: '#a8823a',
    gradient: 'linear-gradient(135deg, #a8823a, #8d6b2c)',
    features: ['New & used vehicles', '24-hour approval', 'Doorstep delivery'],
    bgLight: '#fdf6e8',
  },
  {
    icon: <FaUserTie />,
    title: 'Personal Loan',
    desc: 'Meet your personal goals — weddings, travel, medical emergencies — with premium loans without fixed limits.',
    rate: '10.5%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/personal-loan',
    color: '#8d6b2c',
    gradient: 'linear-gradient(135deg, #8d6b2c, #a8823a)',
    features: ['No collateral needed', 'Disbursal in 48 hrs', 'Minimal documentation'],
    bgLight: '#fdf6e8',
  },
  {
    icon: <FaBriefcase />,
    title: 'Business Loan',
    desc: 'Fuel your business growth with customized business loans for working capital, expansion, and equipment purchase.',
    rate: '11%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/business-loan',
    color: '#c9a55a',
    gradient: 'linear-gradient(135deg, #c9a55a, #a8823a)',
    features: ['Collateral-free options', 'Flexi repayment', 'For all business types'],
    bgLight: '#fdf6e8',
  },
  {
    icon: <FaCarSide />,
    title: 'Used Car Loan',
    desc: 'Buy a pre-owned vehicle with ease. We finance all certified used cars with transparent pricing and flexible amounts.',
    rate: '9.5%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/used-car-loan',
    color: '#a8823a',
    gradient: 'linear-gradient(135deg, #a8823a, #c9a55a)',
    features: ['All brands covered', 'Free RC transfer help', 'Up to 100% financing'],
    bgLight: '#fdf6e8',
  },
  {
    icon: <FaBuilding />,
    title: 'Loan Against Property',
    desc: 'Unlock the value in your property for business expansion or personal needs at the best rates with flexible limits.',
    rate: '9%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/loan-against-property',
    color: '#8d6b2c',
    gradient: 'linear-gradient(135deg, #8d6b2c, #c9a55a)',
    features: ['Residential & commercial', 'Overdraft facility', 'High LTV ratio'],
    bgLight: '#fdf6e8',
  },
  {
    icon: <FaShieldAlt />,
    title: 'General Insurance',
    desc: 'Protect what matters most. Comprehensive insurance plans for your health, vehicle, home, and business at the best premiums.',
    rate: 'Best Rates',
    amount: 'Customised Plans',
    tenure: 'Flexible',
    link: '/insurance',
    color: '#a8823a',
    gradient: 'linear-gradient(135deg, #a8823a, #8d6b2c)',
    features: ['Health & life cover', 'Vehicle insurance', 'Property protection'],
    bgLight: '#fdf6e8',
  },
];

const stats = [
  { value: '₹500 Cr+', label: 'Loans Disbursed' },
  { value: '10,000+', label: 'Happy Customers' },
  { value: '30+', label: 'Banking Partners' },
  { value: '48 Hrs', label: 'Avg. Approval Time' },
];

const Services = () => {
  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/premium-bg.png)' }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8d6b2c, transparent)' }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #a8823a, transparent)' }} />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>

            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-5 leading-tight">
              Every Loan You Need,<br />
              <span style={{ color: '#a8823a' }}>All in One Place</span>
            </h1>
            <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10">
              From home loans to business finance — we offer the complete range of loan products and insurance solutions tailored to your needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-appointment"
                className="px-8 py-4 rounded-xl font-bold text-gray-900 bg-white hover:scale-105 transition-all shadow-lg"
                style={{ textDecoration: 'none' }}>
                Book Free Consultation →
              </Link>
              <Link to="/emi-calculator"
                className="px-8 py-4 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all"
                style={{ textDecoration: 'none' }}>
                Calculate EMI
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-b border-gray-100" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <p className="text-3xl font-heading font-bold" style={{ color: '#a8823a' }}>{s.value}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">

            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-3">All Loan Products & Services</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Explore our complete range of financial products designed to meet every life stage and business need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">

                {/* Card Top Accent */}
                <div style={{ height: '4px', background: s.gradient }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon Row */}
                  <div className="mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-md"
                      style={{ background: s.gradient }}>
                      {s.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>

                  {/* Key Numbers */}
                  <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl" style={{ background: s.bgLight }}>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Rate</p>
                      <p className="font-bold text-sm" style={{ color: s.color }}>{s.rate}*</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-xs text-gray-400 mb-1">Amount</p>
                      <p className="font-bold text-sm text-gray-800">{s.amount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 mb-1">Tenure</p>
                      <p className="font-bold text-sm text-gray-800">{s.tenure}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle style={{ color: s.color, flexShrink: 0, fontSize: '12px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to={s.link}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
                    style={{ background: s.gradient, textDecoration: 'none' }}>
                    Apply Now
                    <FaArrowRight style={{ fontSize: '12px' }} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CS Smart Finserve */}
      <section className="py-20" style={{ background: '#f0eeff' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">

            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-3">Why Choose CS Smart Finserve?</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We're more than a loan aggregator — we're your personal finance partner.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaUniversity />, title: '30+ Banking Partners', desc: 'Access to the best rates from leading banks and NBFCs across India.' },
              { icon: <FaBolt />, title: 'Fast 48-Hour Approval', desc: 'Get your loan sanctioned within 48 hours with our streamlined process.' },
              { icon: <FaBullseye />, title: 'Personalised Matching', desc: 'We match you with the right lender based on your profile and requirements.' },
              { icon: <FaFileAlt />, title: 'Zero Paperwork Hassle', desc: 'Upload documents digitally. No branch visits, no running around.' },
              { icon: <FaHandshake />, title: 'Dedicated Manager', desc: 'A dedicated relationship manager handles your case from start to finish.' },
              { icon: <FaLock />, title: '100% Secure & Confidential', desc: 'Your data is encrypted and never shared without your consent.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-4"
                  style={{ background: 'var(--badge-bg)', color: 'var(--accent)' }}>{item.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #fdf6e8 0%, #a8823a 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <FaChartLine className="text-5xl mx-auto mb-5 opacity-80" />
            <h2 className="text-4xl font-heading font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/75 text-lg mb-10">Talk to our experts for free. Get the best loan deal tailored to your needs — no commitment, no fees.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/book-appointment"
                className="px-8 py-4 bg-white rounded-xl font-bold text-gray-900 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                style={{ textDecoration: 'none' }}>
                <FaPhoneAlt /> Book Free Consultation
              </Link>
              <Link to="/emi-calculator"
                className="px-8 py-4 rounded-xl font-bold text-white border-2 border-white/40 hover:bg-white/10 transition-all"
                style={{ textDecoration: 'none' }}>
                Calculate Your EMI →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
