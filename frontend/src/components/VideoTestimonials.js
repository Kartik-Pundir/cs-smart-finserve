import { useState } from 'react';
import { FaPlay, FaStar, FaQuoteLeft } from 'react-icons/fa';

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Gurgaon',
      loanType: 'Home Loan',
      amount: '₹45 Lakhs',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      quote: 'CS Smart Finserve made my dream home a reality. The process was smooth and transparent.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Delhi',
      loanType: 'Car Loan',
      amount: '₹8 Lakhs',
      thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      quote: 'Got my car loan approved in just 24 hours! Highly recommend their services.',
      rating: 5
    },
    {
      id: 3,
      name: 'Amit Patel',
      location: 'Noida',
      loanType: 'Business Loan',
      amount: '₹25 Lakhs',
      thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
      quote: 'They helped me expand my business with minimal documentation and great rates.',
      rating: 5
    }
  ];

  return (
    <section style={{ background: 'var(--bg-alt)', padding: '80px 0' }}>
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
            <FaQuoteLeft style={{ color: '#c0392b' }} />
            <span style={{ color: '#c0392b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Customer Stories
            </span>
          </div>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            Hear From Our Happy Customers
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Real stories from real people who achieved their financial goals with us
          </p>
        </div>

        {/* Video Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
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
              {/* Video Thumbnail */}
              <div
                style={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  background: `url(${testimonial.thumbnail}) center/cover`,
                  cursor: 'pointer'
                }}
                onClick={() => setActiveVideo(testimonial.id)}
              >
                {activeVideo === testimonial.id ? (
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    src={`${testimonial.videoUrl}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${testimonial.name} testimonial`}
                  />
                ) : (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.95)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <FaPlay style={{ color: '#c0392b', fontSize: '24px', marginLeft: '4px' }} />
                      </div>
                    </div>
                    {/* Loan Type Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      background: 'rgba(192, 57, 43, 0.95)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {testimonial.loanType}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                {/* Rating */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} style={{ color: '#f39c12', fontSize: '16px' }} />
                  ))}
                </div>

                {/* Quote */}
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>

                {/* Customer Info */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'var(--text-tertiary)'
                    }}>
                      {testimonial.location}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#c0392b'
                  }}>
                    {testimonial.amount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          borderRadius: '12px',
          background: 'rgba(192, 57, 43, 0.05)',
          border: '1px solid rgba(192, 57, 43, 0.1)'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            📹 Want to share your success story? <a href="/contact" style={{ color: '#c0392b', fontWeight: '600', textDecoration: 'none' }}>Contact us</a> to record your testimonial
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
