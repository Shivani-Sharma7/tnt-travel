"use client";

export default function TripCTA() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #1a2a3a 0%, #2d4a5f 100%)',
      padding: '4rem 2rem',
      textAlign: 'center',
      margin: '4rem auto',
      maxWidth: '1400px',
      borderRadius: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url(/activity/mathura.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1,
        zIndex: 1
      }}></div>
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 300,
          color: '#ffffff',
          fontFamily: 'serif',
          marginBottom: '1.5rem'
        }}>
          Ready to Explore Our
          <br />
          <span style={{ color: '#f29927', fontWeight: 400 }}>Curated Trip Experiences?</span>
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#8ba3b3',
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          Discover spiritual heritage tours, cultural workshops, adventure activities, and more. 
          Each experience is carefully crafted to connect you with the divine roots of India.
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            fontSize: '1rem'
          }}>
            🏛️ Heritage Tours
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            fontSize: '1rem'
          }}>
            🎨 Cultural Workshops
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem 2rem',
            borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            fontSize: '1rem'
          }}>
            🌊 River Adventures
          </div>
        </div>
        
                  <a
            href="/taxi"
          style={{
            background: 'linear-gradient(135deg, #f29927, #e67e22)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'inline-block',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(242,153,39,0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(242,153,39,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(242,153,39,0.3)';
          }}
        >
          Explore Trip Experiences →
        </a>
      </div>
    </section>
  );
} 