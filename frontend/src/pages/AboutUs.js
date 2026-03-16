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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-purple-100 bg-white">
                {/* Photo area */}
                <div className="w-full h-80 bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-8xl mb-2">👨‍💼</div>
                  </div>
                </div>
                {/* Caption below photo */}
                <div className="px-6 py-5 text-center border-t border-gray-100">
                  <p className="text-xl font-heading font-bold text-gray-900">Krishan Pal Singh</p>
                  <p className="text-sm font-semibold mt-1" style={{ color: '#c0392b' }}>Director & Co-Founder</p>
                  <p className="text-xs text-gray-400 mt-0.5 tracking-wide uppercase">CS Smart Finserve Private Limited</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                style={{ background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)' }}>
                Our Story
              </span>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Built on Trust. Driven by Results.
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                CS Smart Finserve Private Limited was founded with a vision to make financial services
                accessible, transparent, and customer-centric. We believe everyone deserves quality
                financial products without complex procedures.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Based in Gurugram, we've built a strong network of satisfied customers and banking
                partners. Our team of 60+ financial experts works tirelessly to find you the best
                loan and insurance solutions.
              </p>
              <p className="text-gray-600 text-lg">
                We've disbursed over ₹500 Crores in loans, helping 10,000+ customers achieve their
                financial goals. Transparency, speed, and customer satisfaction define everything we do.
              </p>
            </motion.div>
          </div>
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
