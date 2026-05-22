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

      {/* Our Team */}
      <section className="py-20" style={{ background: '#faf8ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">Meet Our Leadership & Team</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              The dedicated experts working behind the scenes to get you the best financial solutions.
            </p>
          </motion.div>

          {/* Leadership */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* MD Placeholder */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-6 shadow-xl border border-purple-50 text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                <div className="text-5xl">👨‍💼</div>
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-900">Sushil Singh</h3>
              <p className="text-accent font-semibold mb-4">Managing Director & Founder</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                With a deep understanding of the financial services industry, he laid the foundation of the company with a vision to make loans and insurance accessible to every Indian household.
              </p>
            </motion.div>

            {/* Director */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 shadow-xl border border-purple-50 text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                <img src="/assets/director.jpg" alt="Krishan Pal Singh" className="w-full h-full object-cover" 
                     onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="text-5xl hidden">👨‍💼</div>
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-900">Krishan Pal Singh</h3>
              <p className="text-accent font-semibold mb-4">Director & Co-Founder</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Based in Gurugram, he brings years of expertise in financial consulting. His commitment to transparency and a customer-first approach has helped build a reputation of trust across the NCR.
              </p>
            </motion.div>
          </div>

          {/* Team Members */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-heading font-bold text-gray-900 text-center mb-10">Our Team & Office</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-50 group">
                  <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                    <span className="text-gray-400 text-sm font-medium">Image Placeholder</span>
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Team Member</h4>
                    <p className="text-sm text-gray-500">Financial Advisor</p>
                  </div>
                </div>
              ))}
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
