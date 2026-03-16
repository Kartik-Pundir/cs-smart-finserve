/* ─── Inline SVG logos for each bank — larger size ─── */
const logos = [
  {
    name: 'HDFC Bank', color: '#004C8F',
    svg: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="180" height="60">
        <rect x="2" y="8" width="6" height="24" fill="currentColor"/>
        <rect x="2" y="18" width="16" height="4" fill="currentColor"/>
        <rect x="12" y="8" width="6" height="24" fill="currentColor"/>
        <text x="26" y="28" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="currentColor">HDFC</text>
        <text x="26" y="38" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text>
      </svg>
    ),
  },
  {
    name: 'ICICI Bank', color: '#F58220',
    svg: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="180" height="60">
        <circle cx="12" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="12" cy="20" r="4" fill="currentColor"/>
        <text x="28" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="currentColor">ICICI</text>
        <text x="28" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text>
      </svg>
    ),
  },
  {
    name: 'Axis Bank', color: '#97144D',
    svg: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="180" height="60">
        <polygon points="12,8 22,32 2,32" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <text x="28" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="currentColor">AXIS</text>
        <text x="28" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text>
      </svg>
    ),
  },
  {
    name: 'SBI', color: '#22409A',
    svg: (
      <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" width="160" height="60">
        <path d="M8 28 Q4 20 8 14 Q14 6 22 10 Q28 14 22 20 Q16 26 22 30 Q28 34 34 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <text x="42" y="26" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="18" fill="currentColor">SBI</text>
      </svg>
    ),
  },
  {
    name: 'Bajaj Finserv', color: '#003399',
    svg: (
      <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="200" height="60">
        <rect x="2" y="10" width="18" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="6" y="14" width="10" height="5" rx="1" fill="currentColor"/>
        <text x="26" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="12" fill="currentColor">BAJAJ</text>
        <text x="26" y="35" fontFamily="Arial,sans-serif" fontSize="9" fill="currentColor" opacity="0.8">FINSERV</text>
      </svg>
    ),
  },
  {
    name: 'IDFC First Bank', color: '#9B1B30',
    svg: (
      <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="200" height="60">
        <rect x="2" y="8" width="5" height="24" fill="currentColor"/>
        <text x="14" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="13" fill="currentColor">IDFC</text>
        <text x="14" y="36" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">FIRST BANK</text>
      </svg>
    ),
  },
  {
    name: 'Yes Bank', color: '#00529B',
    svg: (
      <svg viewBox="0 0 110 40" xmlns="http://www.w3.org/2000/svg" width="170" height="60">
        <path d="M4 8 L14 22 L14 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M24 8 L14 22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <text x="32" y="25" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="14" fill="currentColor">YES</text>
        <text x="32" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text>
      </svg>
    ),
  },
  {
    name: 'LIC', color: '#006400',
    svg: (
      <svg viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg" width="150" height="60">
        <path d="M4 8 L4 28 L16 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="22" y="8" width="5" height="20" fill="currentColor"/>
        <path d="M34 8 Q46 8 46 18 Q46 28 34 28 L32 28 L32 8 Z" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <text x="4" y="38" fontFamily="Arial,sans-serif" fontSize="7" fill="currentColor" opacity="0.7">LIFE INSURANCE CORP.</text>
      </svg>
    ),
  },
  {
    name: 'Indian Bank', color: '#1a3c6e',
    svg: (
      <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" width="200" height="60">
        <polygon points="14,6 26,6 28,12 12,12" fill="currentColor" opacity="0.9"/>
        <rect x="14" y="12" width="12" height="16" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="10" y="28" width="20" height="3" fill="currentColor"/>
        <text x="36" y="24" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">INDIAN</text>
        <text x="36" y="35" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK</text>
      </svg>
    ),
  },
  {
    name: 'Bank of Baroda', color: '#F7941D',
    svg: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="190" height="60">
        <circle cx="14" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="14" cy="20" r="5" fill="currentColor"/>
        <text x="32" y="22" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">BANK OF</text>
        <text x="32" y="33" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">BARODA</text>
      </svg>
    ),
  },
  {
    name: 'Union Bank', color: '#003087',
    svg: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="190" height="60">
        <path d="M6 8 L6 24 Q6 32 14 32 Q22 32 22 24 L22 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <text x="30" y="22" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="11" fill="currentColor">UNION</text>
        <text x="30" y="33" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">BANK OF INDIA</text>
      </svg>
    ),
  },
  {
    name: 'Poonawalla Fincorp', color: '#0057a8',
    svg: (
      <svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" width="210" height="60">
        <circle cx="12" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="12" cy="16" r="3" fill="currentColor"/>
        <text x="26" y="20" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="10" fill="currentColor">POONAWALLA</text>
        <text x="26" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">FINCORP</text>
      </svg>
    ),
  },
  {
    name: 'Chola Finance', color: '#e63329',
    svg: (
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" width="190" height="60">
        <path d="M20 10 Q6 10 6 20 Q6 30 20 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <text x="28" y="22" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="12" fill="currentColor">CHOLA</text>
        <text x="28" y="33" fontFamily="Arial,sans-serif" fontSize="8" fill="currentColor" opacity="0.8">FINANCE</text>
      </svg>
    ),
  },
];

const allLogos = [...logos, ...logos];

const BankingPartners = () => (
  <section style={{ background: 'linear-gradient(135deg, #faf8ff 0%, #f0eeff 50%, #f5f0ff 100%)' }} className="py-16 overflow-hidden border-y border-purple-100">
    {/* Header */}
    <div className="text-center mb-12">
      <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{ background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)' }}>
        Our Trusted Lending Partners
      </span>
      <h2 className="text-gray-900 text-3xl font-heading font-bold mt-4">
        Backed by India's Leading Banks & NBFCs
      </h2>
    </div>

    {/* Fade edges */}
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #faf8ff, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f5f0ff, transparent)' }} />

      {/* Marquee track */}
      <div className="flex items-center" style={{ animation: 'marquee 8s linear infinite' }}>
        {allLogos.map((bank, i) => (
          <div
            key={i}
            title={bank.name}
            className="flex-shrink-0 mx-5 flex flex-col items-center justify-center group"
            style={{ minWidth: '200px' }}
          >
            <div
              className="flex items-center justify-center px-7 py-6 rounded-2xl bg-white shadow border border-gray-100"
              style={{
                filter: 'grayscale(100%)',
                opacity: 0.65,
                color: bank.color,
                transition: 'filter 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease, transform 0.3s ease',
                minHeight: '90px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'grayscale(0%)';
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.boxShadow = `0 6px 28px ${bank.color}40`;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'grayscale(100%)';
                e.currentTarget.style.opacity = '0.65';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {bank.svg}
            </div>
            <span className="text-sm mt-3 font-semibold text-gray-400 group-hover:text-gray-800 transition-colors duration-500 text-center">
              {bank.name}
            </span>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </section>
);

export default BankingPartners;
