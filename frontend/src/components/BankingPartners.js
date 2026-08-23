import React from 'react';

const logos = [
  { name: 'HDFC Bank', logo: '/assets/hdfc-logo.svg' },
  { name: 'ICICI Bank', logo: '/assets/icici-logo.svg' },
  { name: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'Bajaj Finserv', logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bajaj_Finserv_Logo.svg' },
  { name: 'IDFC First Bank', logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Logo_of_IDFC_First_Bank.svg' },
  { name: 'Yes Bank', logo: '/assets/yesbank-logo.svg' },
  { name: 'LIC', logo: '/assets/lic-logo.png' },
  { name: 'Indian Bank', logo: '/assets/indianbank-logo.png' },
  { name: 'Bank of Baroda', logo: '/assets/bob-logo.svg' },
  { name: 'Tata Capital', logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tata_Capital_Logo-01.jpg' },
  { name: 'Poonawalla Fincorp', logo: '/assets/poonawalla-logo.png' },
  { name: 'Chola Finance', logo: '/assets/chola-logo.png' },
];

const BankCard = ({ bank }) => {
  return (
    <div
      className="flex-shrink-0 mx-4 flex flex-col items-center justify-center group"
      style={{ width: '160px' }}
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
  <section className="py-16 border-y theme-border theme-bg-alt">
    <div className="text-center mb-12">

      <h2 className="text-gray-900 text-3xl font-heading font-bold mt-4">
        Backed by India's Leading Banks & NBFCs
      </h2>
    </div>

    <div className="relative overflow-hidden">


      <div className="marquee-track flex items-center w-max" style={{ willChange: 'transform' }}>
        {[...logos, ...logos, ...logos, ...logos].map((bank, i) => (
          <BankCard key={i} bank={bank} />
        ))}
      </div>
    </div>

    <style>{`
      .marquee-track {
        animation: seamless-marquee 35s linear infinite;
      }
      @keyframes seamless-marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-25%); }
      }
    `}</style>
  </section>
);

export default BankingPartners;
