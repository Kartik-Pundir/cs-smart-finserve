import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock } from 'react-icons/fa';

const RecentlyViewedLoans = () => {
  const [recentLoans, setRecentLoans] = useState([]);

  useEffect(() => {
    // Get recently viewed loans from localStorage
    const viewed = JSON.parse(localStorage.getItem('recentlyViewedLoans') || '[]');
    setRecentLoans(viewed.slice(0, 3)); // Show only last 3
  }, []);

  if (recentLoans.length === 0) return null;

  return (
    <section style={{ background: 'var(--bg-alt)', padding: '60px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '30px',
            background: 'rgba(192, 57, 43, 0.08)',
            border: '1px solid rgba(192, 57, 43, 0.2)',
            marginBottom: '12px'
          }}>
            <FaClock style={{ color: '#c0392b' }} />
            <span style={{ color: '#c0392b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Recently Viewed
            </span>
          </div>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--text-primary)'
          }}>
            Continue Where You Left Off
          </h3>
        </div>

        {/* Loan Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {recentLoans.map((loan, index) => (
            <Link
              key={index}
              to={loan.link}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: loan.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '16px'
              }}>
                {loan.icon}
              </div>

              {/* Title */}
              <h4 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                {loan.title}
              </h4>

              {/* Rate */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  Interest from
                </span>
                <span style={{ color: loan.color, fontWeight: '700', fontSize: '18px' }}>
                  {loan.rate}*
                </span>
              </div>

              {/* CTA */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: loan.color,
                fontWeight: '600',
                fontSize: '14px'
              }}>
                View Details
                <FaArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to track viewed loans (call this from loan pages)
export const trackLoanView = (loanData) => {
  const viewed = JSON.parse(localStorage.getItem('recentlyViewedLoans') || '[]');
  
  // Remove if already exists
  const filtered = viewed.filter(item => item.title !== loanData.title);
  
  // Add to beginning
  filtered.unshift(loanData);
  
  // Keep only last 5
  const updated = filtered.slice(0, 5);
  
  localStorage.setItem('recentlyViewedLoans', JSON.stringify(updated));
};

export default RecentlyViewedLoans;
