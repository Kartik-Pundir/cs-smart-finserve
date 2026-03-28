import { FaPhone } from 'react-icons/fa';

const StickyCallButton = () => {
  return (
    <a
      href="tel:+919267953513"
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '24px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        zIndex: 9998,
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        animation: 'pulse 2s infinite'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
      }}
      aria-label="Call us now"
    >
      <FaPhone style={{ animation: 'ring 1.5s infinite' }} />
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          50% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4), 0 0 0 15px rgba(37, 211, 102, 0);
          }
        }
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(-15deg); }
          20%, 40% { transform: rotate(15deg); }
        }
      `}</style>
    </a>
  );
};

export default StickyCallButton;
