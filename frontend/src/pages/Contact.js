import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import CallbackForm from '../components/CallbackForm';

const Contact = () => {
  const info = [
    {
      icon: <FaPhone className="text-white text-lg" />,
      bg: 'bg-accent',
      label: 'Call Us',
      value: '+91 92679 53513',
      href: 'tel:+919267953513',
    },
    {
      icon: <FaWhatsapp className="text-white text-lg" />,
      bg: 'bg-green-500',
      label: 'WhatsApp',
      value: '+91 92679 53513',
      href: 'https://wa.me/919267953513',
    },
    {
      icon: <FaEnvelope className="text-white text-lg" />,
      bg: 'bg-accent',
      label: 'Email Us',
      value: 'Krishan.pal1986@gmail.com',
      href: 'mailto:Krishan.pal1986@gmail.com',
    },
    {
      icon: <FaClock className="text-white text-lg" />,
      bg: 'bg-gray-700',
      label: 'Working Hours',
      value: 'Mon – Sat, 9 AM – 7 PM',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#faf8ff' }}>

      {/* Hero Banner */}
      <section
        className="relative pt-40 pb-24 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(26,26,46,0.92) 0%, rgba(192,57,43,0.85) 100%), url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              We'd love to hear from you
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Have a question about a loan or insurance? Our team is ready to help you find the right solution.
            </p>
          </motion.div>
        </div>

        {/* Info Cards — overlapping the banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {info.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-xl text-center"
              >
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  {item.icon}
                </div>
                <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-sm font-semibold text-gray-800 hover:text-accent transition-colors break-all">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20" style={{ background: '#faf8ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left — Location + Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">
                  Our Office
                </span>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Find Us Here</h2>
                <p className="text-gray-500 text-sm">Visit us at our Gurugram office for a face-to-face consultation.</p>
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-accent">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Gurugram</h4>
                    <p className="text-gray-500 text-sm">102, Lala Ram Market, Sector 17</p>
                    <p className="text-gray-500 text-sm">Sukhrali, Gurgaon, Haryana 122001</p>
                    <p className="text-gray-500 text-sm mt-1">+91 92679 53513</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-gray-100 flex items-center justify-center border border-gray-200">
                <div className="text-center text-gray-400">
                  <FaMapMarkerAlt className="text-4xl mx-auto mb-2 text-accent" />
                  <p className="text-sm font-medium">102, Lala Ram Market, Sector 17, Sukhrali</p>
                  <a
                    href="https://maps.google.com/?q=102+Lala+Ram+Market+Sector+17+Sukhrali+Gurgaon+Haryana+122001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-accent underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/919267953513"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <FaWhatsapp className="text-green-500 text-xl" />
                    <span className="text-sm font-semibold text-gray-700">Chat on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+919267953513"
                    className="flex items-center gap-3 p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <FaPhone className="text-accent text-lg" />
                    <span className="text-sm font-semibold text-gray-700">Call Now</span>
                  </a>
                  <a
                    href="mailto:Krishan.pal1986@gmail.com"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <FaEnvelope className="text-gray-500 text-lg" />
                    <span className="text-sm font-semibold text-gray-700">Send an Email</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-md p-8">
                <span className="inline-block px-4 py-1 bg-red-100 text-accent rounded-full text-sm font-semibold mb-3">
                  Send a Message
                </span>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">We'll get back to you</h2>
                <p className="text-gray-500 text-sm mb-6">Fill in the form and our team will reach out within 24 hours.</p>
                <CallbackForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
