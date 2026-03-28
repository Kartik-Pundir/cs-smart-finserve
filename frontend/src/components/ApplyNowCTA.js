import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ApplyNowCTA = ({ loanType = 'Loan' }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9997,
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      padding: '16px 32px',
      background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
      borderRadius: '50px',
      boxShadow: '0 8px 30px rgba(192, 57, 43, 0.4)',
      animation: 'slideUp 0.5s ease-out'
    }}>
      <div style={{ color: 'white' }}>
        <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '2px' }}>
          Ready to apply for {loanType}?
        </div>
        <div style={{ fontSize: '16px', fontWeight: '700' }}>
          Get Instant Approval
        </div>
      </div>
      <Link
        to="/contact"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'white',
          color: '#c0392b',
          borderRadius: '30px',
          fontWeight: '700',
          textDecoration: 'none',
          transition: 'transform 0.2s',
          fontSize: '14px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Apply Now
        <FaArrowRight />
      </Link>
      <style>{`
        @keyframes slideUp {
          from {
            bottom: -100px;
            opacity: 0;
          }
          to {
            bottom: 24px;
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          div[style*="position: fixed"] {
            left: 16px;
            right: 16px;
            transform: none;
            padding: 12px 20px;
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplyNowCTA;
