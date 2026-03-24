import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Zero to Keys in 24 Hours',
      subtitle: 'Drive Your Dream Car Today.',
      service: 'Auto Loan',
      gradient: 'from-blue-600 to-cyan-500',
      link: '#auto-loan'
    },
    {
      title: 'Smarter Finance',
      subtitle: 'Best Rates on Pre-Owned Cars.',
      service: 'Used Car Loan',
      gradient: 'from-purple-600 to-pink-500',
      link: '#used-car-loan'
    },
    {
      title: 'Cash Against Car',
      subtitle: "Don't Sell It. Leverage It.",
      service: 'Loan Against Car',
      gradient: 'from-orange-600 to-red-500',
      link: '#loan-against-property'
    },
    {
      title: 'Your Dream Home Is One Approval Away',
      subtitle: 'Lowest Interest Rates. Quick Processing.',
      service: 'Home Loan',
      gradient: 'from-green-600 to-teal-500',
      link: '#home-loan'
    },
    {
      title: 'Money When You Need It Most',
      subtitle: 'Instant Personal Loans. No Collateral.',
      service: 'Personal Loan',
      gradient: 'from-indigo-600 to-blue-500',
      link: '#personal-loan'
    },
    {
      title: 'Fuel Your Ambition',
      subtitle: 'Business Loans for Growth.',
      service: 'Business Loan',
      gradient: 'from-yellow-600 to-orange-500',
      link: '#business-loan'
    },
    {
      title: 'Protect What Matters Most',
      subtitle: 'Comprehensive Insurance Solutions.',
      service: 'General Insurance',
      gradient: 'from-red-600 to-pink-500',
      link: '#insurance'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-l ${slides[currentSlide].gradient} flex items-center justify-center`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="text-xl md:text-2xl mb-4 font-medium opacity-90">{slides[currentSlide].service}</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">{slides[currentSlide].title}</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">{slides[currentSlide].subtitle}</p>
              <a href={slides[currentSlide].link}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl">
                Apply Now
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10">
        <FiChevronLeft className="text-white text-2xl" />
      </button>
      <button onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10">
        <FiChevronRight className="text-white text-2xl" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
