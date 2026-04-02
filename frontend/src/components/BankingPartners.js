import React from 'react';

const logos = [
  { name: 'HDFC Bank', logo: '/assets/hdfc-logo.svg' },
  { name: 'ICICI Bank', logo: '/assets/icici-logo.svg' },
  { name: 'Axis Bank', logo: '/assets/axis-logo.svg' },
  { name: 'State Bank of India', logo: '/assets/sbi-logo.svg' },
  { name: 'Bajaj Finserv', logo: '/assets/bajaj-logo.svg' },
  { name: 'Yes Bank', logo: '/assets/yesbank-logo.svg' },
  { name: 'IDFC First Bank', logo: '/assets/idfc-logo.svg' },
  { name: 'Bank of Baroda', logo: '/assets/bob-logo.svg' },
  { name: 'LIC Housing Finance', logo: '/assets/lic-logo.svg' },
  { name: 'Tata Capital', logo: '/assets/tata-logo.svg' },
  { name: 'Cholamandalam', logo: '/assets/chola-logo.svg' },
  { name: 'Indian Bank', logo: '/assets/indianbank-logo.svg' },
];

const BankCard = ({ bank }) => {
  return (
    <div
      className="flex-shrink-0 mx-4 flex flex-col items-center justify-center group"
      style={{ minWidth: '160px' }}
    >
      <div
        className="flex items-center justify-center px-5 py-4 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300"
        style={{ minHeight: '76px', width: '150px' }}
      >
        <img
          src={bank.logo}
          alt={`${bank.name} logo`}
          className="max-w-full max-h-12 object-contain transition-all duration-300 group-hover:scale-110"
          style={{ filter: 'brightness(0.95)' }}
        />
      </div>
      <span className="text-xs mt-2 font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-300 text-center leading-tight" style={{ maxWidth: '140px' }}>
        {bank.name}
      </span>
    </div>
  );
};

const BankingPartners = () => (
  <section style={{ background: 'linear-gradient(135deg, #faf8ff 0%, #f0eeff 50%, #f5f0ff 100%)' }} className="py-16 border-y border-purple-100">
    <div className="text-center mb-12">
      <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{ background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)' }}>
        Our Trusted Lending Partners
      </span>
      <h2 className="text-gray-900 text-3xl font-heading font-bold mt-4">
        Backed by India's Leading Banks & NBFCs
      </h2>
    </div>

    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #faf8ff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f5f0ff, transparent)' }} />

      <div className="marquee-track flex items-center" style={{ willChange: 'transform' }}>
        {[...logos, ...logos].map((bank, i) => (
          <BankCard key={i} bank={bank} />
        ))}
      </div>
    </div>

    <style>{`
      .marquee-track {
        animation: seamless-marquee 14s linear infinite;
      }
      @keyframes seamless-marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </section>
);

export default BankingPartners;
