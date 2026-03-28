import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaBriefcase, FaArrowRight, FaFire } from 'react-icons/fa';

const PopularLoans = () => {
  const popularLoans = [
    {
      icon: <FaHome />,
      title: 'Home Loan',
      rate: '8.5%',
      amount: 'Up to ₹5 Cr',
      tenure: '30 Years',
      badge: 'Most Popular',
      link: '/home-loan',
      color: '#c0392b',
      gradient: 'linear-gradient(135deg, #c0392b, #e74c3c)'
    },
    {
      icon: <FaCar />,
      title: 'Car Loan',
      rate: '8.7%',
      amount: 'Up to ₹50 L',
      tenure: '7 Years',
      badge: 'Quick Approval',
      link: '/auto-loan',
      color: '#2980b9',
      gradient: 'linear-gradient(135deg, #2980b9, #3498db)'
    },
    {
      icon: <FaBriefcase />,
      title: 'Business Loan',
      rate: '11%',
      amount: 'Up to ₹50 L',
      tenure: '5 Years',
      badge: 'Trending',
      link: '/business-loan',
      color: '#27ae60',
      gradient: 'linear-gradient(135deg, #27ae60, #2ecc71)'
    }
  ];

  return (
    <section style={{ background: 'var(--bg-base)', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '30px',
            background: 'rgba(192, 57, 43, 0.08)',
            border: '1px solid rgba(192, 57, 43, 0.2)',
            marginBottom: '16px'
          }}>
            <FaFire style={{ color: '#c0392b' }} />
            <span style={{ color: '#c0392b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Popular Loans
            </span>
          </div>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Most Chosen Loan Products
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Join thousands of satisfied customers who chose these loans
          </p>
        </div>

        {/* Loan Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {popularLoans.map((loan, index) => (
            <div
              key={index}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px 12px',
                borderRadius: '20px',
                background: loan.gradient,
                color: 'white',
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {loan.badge}
              </div>

              {/* Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                background: loan.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '32px',
                marginBottom: '24px',
                boxShadow: `0 8px 20px ${loan.color}40`
              }}>
                {loan.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '20px'
              }}>
                {loan.title}
              </h3>

              {/* Details */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Interest Rate</span>
                  <span style={{ color: loan.color, fontWeight: '700', fontSize: '18px' }}>{loan.rate}*</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loan Amount</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{loan.amount}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Max Tenure</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{loan.tenure}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to={loan.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '12px',
                  background: loan.gradient,
                  color: 'white',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Apply Now
                <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              border: '2px solid #c0392b',
              color: '#c0392b',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c0392b';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#c0392b';
            }}
          >
            View All Loan Products
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularLoans;
