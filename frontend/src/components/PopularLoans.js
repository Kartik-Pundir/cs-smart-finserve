import { Link } from 'react-router-dom';
import { FaHome, FaCar, FaBriefcase, FaArrowRight } from 'react-icons/fa';

const GOLD_1 = '#a8823a';
const GOLD_2 = '#8d6b2c';
const GOLD_3 = '#c9a55a';

const popularLoans = [
  {
    icon: <FaHome />,
    title: 'Home Loan',
    rate: '8.5%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/home-loan',
    color: GOLD_1,
    gradient: `linear-gradient(135deg, ${GOLD_1}, ${GOLD_2})`
  },
  {
    icon: <FaCar />,
    title: 'Car Loan',
    rate: '8.7%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/auto-loan',
    color: GOLD_2,
    gradient: `linear-gradient(135deg, ${GOLD_2}, ${GOLD_1})`
  },
  {
    icon: <FaBriefcase />,
    title: 'Business Loan',
    rate: '11%',
    amount: 'Flexible',
    tenure: 'Customised',
    link: '/business-loan',
    color: GOLD_3,
    gradient: `linear-gradient(135deg, ${GOLD_3}, ${GOLD_1})`
  }
];

const PopularLoans = () => {
  return (
    <section style={{ background: 'var(--bg-base)', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
                border: '1px solid var(--border)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(168,130,58,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
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
                  borderBottom: '1px solid var(--border)'
                }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Interest Rate</span>
                  <span style={{ color: loan.color, fontWeight: '700', fontSize: '18px' }}>{loan.rate}*</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--border)'
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
              border: '2px solid #a8823a',
              color: '#a8823a',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#a8823a';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#a8823a';
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
