import React from 'react';
import { motion } from 'framer-motion';
import StatsCounter from '../components/StatsCounter';
import BankingPartners from '../components/BankingPartners';

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: '#f0eeff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{ background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)' }}>
              Who We Are
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              About <span className="text-accent">CS Smart Finserve</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Your trusted partner in financial excellence — making loans and insurance simple, fast, and fair.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20" style={{ background: '#faf8ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Sushil Singh */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-purple-100 bg-white">
              <div className="w-full h-80 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a1a2e, #2d1b1b)' }}>
                <div className="text-9xl">👨‍💼</div>
              </div>
              <div className="px-6 py-5 text-center">
                <p className="text-xl font-heading font-bold text-gray-900">Sushil Singh</p>
                <p className="text-sm font-semibold mt-1" style={{ color: '#c0392b' }}>MD & Founder</p>
              </div>
            </div>
            <div className="pt-4">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Sushil Singh</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Sushil Singh is the Managing Director and Founder of CS Smart Finserve Private Limited. With a deep understanding of the financial services industry, he laid the foundation of the company with a vision to make loans and insurance accessible to every Indian household.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                His leadership and strategic thinking have been instrumental in building strong partnerships with 50+ banks and NBFCs, enabling the company to serve thousands of customers across Faridabad and the NCR region.
              </p>
            </div>
          </motion.div>

          {/* Krishan Pal Singh */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-purple-100 bg-white lg:order-2">
              <div className="w-full h-80 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                <div className="text-9xl">👨‍💼</div>
              </div>
              <div className="px-6 py-5 text-center">
                <p className="text-xl font-heading font-bold text-gray-900">Krishan Pal Singh</p>
                <p className="text-sm font-semibold mt-1" style={{ color: '#c0392b' }}>Director & Co-Founder</p>
              </div>
            </div>
            <div className="lg:order-1 pt-4">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Krishan Pal Singh</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Krishan Pal Singh is the Director and Co-Founder of CS Smart Finserve Private Limited. Based in Gurugram, he brings years of expertise in financial consulting and customer relationship management to the company.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                His commitment to transparency and customer-first approach has helped CS Smart Finserve build a reputation of trust across the NCR. He oversees day-to-day operations and ensures every client receives personalised, honest financial guidance.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsCounter />
        </div>
      </section>

      {/* Banking Partners Marquee */}
      <BankingPartners />

      {/* Why Choose Us */}
      <section className="py-20" style={{ background: '#f0eeff' }}>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-3">
              Why Choose Us?
            </h2>
            <p className="text-gray-500 text-lg">Six reasons our customers keep coming back.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Expert Guidance',       desc: '60+ financial experts to guide you through every step' },
              { icon: '⚡', title: 'Quick Processing',      desc: 'Fast approval and disbursement within 24–48 hours' },
              { icon: '💰', title: 'Best Rates',            desc: 'Competitive interest rates from top banks and NBFCs' },
              { icon: '🔍', title: 'Transparent Dealings',  desc: 'No hidden charges. Complete transparency in all transactions' },
              { icon: '🏦', title: 'Wide Network',          desc: 'Partnerships with 50+ banks and insurance companies' },
              { icon: '🤝', title: 'Customer First',        desc: 'Dedicated support team available for all your queries' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-accent text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-8 h-1 bg-accent rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
