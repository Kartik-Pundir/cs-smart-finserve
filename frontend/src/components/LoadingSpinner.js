const LoadingSpinner = ({ size = 'md', color = '#c0392b' }) => {
  const sizes = {
    sm: '20px',
    md: '40px',
    lg: '60px'
  };

  return (
    <div style={{
      display: 'inline-block',
      width: sizes[size],
      height: sizes[size],
      border: `3px solid rgba(192, 57, 43, 0.1)`,
      borderTop: `3px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
