import React from 'react';

const logos = [
  { name: 'HDFC Bank',            color: '#004C8F' },
  { name: 'ICICI Bank',           color: '#F58220' },
  { name: 'Axis Bank',            color: '#97144D' },
  { name: 'State Bank of India',  color: '#22409A' },
  { name: 'Kotak Mahindra',       color: '#ED1C24' },
  { name: 'Bajaj Finserv',        color: '#003399' },
  { name: 'Yes Bank',             color: '#00529B' },
  { name: 'IDFC First Bank',      color: '#9B1B30' },
  { name: 'Bank of Baroda',       color: '#F7941D' },
  { name: 'Punjab National Bank', color: '#1a3c6e' },
  { name: 'LIC Housing Finance',  color: '#006400' },
  { name: 'Tata Capital',         color: '#1D3557' },
  { name: 'Poonawalla Fincorp',   color: '#0057a8' },
  { name: 'Cholamandalam',        color: '#e63329' },
  { name: 'Indian Bank',          color: '#1a5490' },
];

const BankCard = ({ bank }) => {
  const initials = bank.name.split(' ').slice(0, 2).map(w => w[0]).join('');

  return (
    <div
      className="flex-shrink-0 mx-4 flex flex-col items-center justify-center group"
      style={{ minWidth: '160px' }}
    >
      <div
        className="flex items-center justify-center px-5 py-4 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300"
        style={{ minHeight: '76px', width: '150px' }}
      >
        <div
          className="flex items-center justify-center rounded-xl font-black text-white text-lg transition-all duration-300 group-hover:scale-110"
          style={{ width: '56px', height: '56px', background: bank.color, letterSpacing: '-1px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          {initials}
        </div>
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
