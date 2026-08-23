import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaBolt, FaCoins, FaSearchDollar, FaUniversity, FaHandshake } from 'react-icons/fa';
import StatsCounter from '../components/StatsCounter';
import BankingPartners from '../components/BankingPartners';

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>

      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: '#f0eeff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-20">
            {/* MD */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-[2rem] p-4 shadow-xl border border-purple-50 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-2xl transition-shadow">
              <div className="w-full sm:w-1/2 h-72 rounded-[1.5rem] overflow-hidden relative shadow-inner">
                <img src="/assets/director.jpg" alt="Sushil Singh" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="w-full sm:w-1/2 pr-4 pb-4 sm:pb-0 text-center sm:text-left">
                <h3 className="text-3xl font-heading font-bold text-gray-900 mb-1">Sushil Singh</h3>
                <p className="text-accent font-bold tracking-wide text-sm uppercase mb-4">Managing Director & Founder</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  With a deep understanding of the financial services industry, he laid the foundation of the company with a vision to make loans and insurance accessible to every Indian household.
                </p>
              </div>
            </motion.div>

            {/* Director */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white rounded-[2rem] p-4 shadow-xl border border-purple-50 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-2xl transition-shadow">
              <div className="w-full sm:w-1/2 h-72 rounded-[1.5rem] overflow-hidden relative shadow-inner">
                <img src="/assets/md.jpg" alt="Krishan Pal Singh" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="w-full sm:w-1/2 pr-4 pb-4 sm:pb-0 text-center sm:text-left">
                <h3 className="text-3xl font-heading font-bold text-gray-900 mb-1">Krishan Pal Singh</h3>
                <p className="text-accent font-bold tracking-wide text-sm uppercase mb-4">Director & Co-Founder</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Based in Gurugram, he brings years of expertise in financial consulting. His commitment to transparency and a customer-first approach has helped build a reputation of trust across the NCR.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Team Members */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-heading font-bold text-gray-900 text-center mb-10">Our Team & Office</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { img: '/assets/team1.jpg', title: 'Customer Support Team' },
                { img: '/assets/team2.jpg', title: 'Loan Processing Operations' },
                { img: '/assets/team3.jpg', title: 'Financial Advisory Desk' }
              ].map((team, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-50 group">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img src={team.img} alt={team.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{team.title}</h4>
                    <p className="text-sm text-gray-500">CS Smart Finserve</p>
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
              { icon: <FaBullseye />, title: 'Expert Guidance',       desc: '60+ financial experts to guide you through every step' },
              { icon: <FaBolt />, title: 'Quick Processing',      desc: 'Fast approval and disbursement within 24–48 hours' },
              { icon: <FaCoins />, title: 'Best Rates',            desc: 'Competitive interest rates from top banks and NBFCs' },
              { icon: <FaSearchDollar />, title: 'Transparent Dealings',  desc: 'No hidden charges. Complete transparency in all transactions' },
              { icon: <FaUniversity />, title: 'Wide Network',          desc: 'Partnerships with 50+ banks and insurance companies' },
              { icon: <FaHandshake />, title: 'Customer First',        desc: 'Dedicated support team available for all your queries' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-accent text-center"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 mx-auto"
                  style={{ background: 'var(--badge-bg)', color: 'var(--accent)' }}>
                  {item.icon}
                </div>
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
