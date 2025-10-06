import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #7A6B57 0%, #8B5C3C 50%, #A67B5B 100%)',
      padding: '4rem 2vw 2rem 2vw',
      marginTop: '6rem',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        .footer-social {
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 0.8rem 1.2rem;
          display: inline-flex;
          align-items: center;
          font-size: 1.1rem;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          margin-right: 0.8rem;
          margin-bottom: 0.8rem;
          backdrop-filter: blur(10px);
          color: #fff;
          text-decoration: none;
        }
        .footer-social:hover {
          background: #f29927;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(242, 153, 39, 0.4);
          border-color: #f29927;
        }
        .footer-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s ease;
        }
        .footer-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .footer-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 0.5rem 0;
          transition: color 0.3s;
          border-bottom: 1px solid transparent;
          font-family: 'serif';
        }
        .footer-link:hover {
          color: #f29927 !important;
          border-bottom-color: #f29927 !important;
        }
        .footer-button:hover {
          transform: translateY(-2px) !important;
        }
        .footer-legal-link {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.9rem;
          font-family: serif;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .footer-legal-link:hover {
          color: #f29927 !important;
          border-color: rgba(242, 153, 39, 0.3) !important;
          background: rgba(242, 153, 39, 0.1) !important;
        }
      `}</style>
      
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(242, 153, 39, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0
      }}></div>
      
      <div style={{
        maxWidth:'calc(100% - 20px)',
        margin:'0 10px',
        position:'relative',
        zIndex:1
      }}>
        {/* Main Footer Content */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'2rem',marginBottom:'3rem'}}>
          
          {/* Company Info */}
          <div className="footer-card">
            <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'2rem'}}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f29927, #f7b84b)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(242, 153, 39, 0.3)'
              }}>
                TnT
              </div>
              <div>
                <h3 style={{fontWeight:900,fontSize:'1.8rem',fontFamily:'serif',letterSpacing:'-1px',margin:0,color:'#fff'}}>
                  TnT<span style={{color:'#f29927'}}>Travel</span>
                </h3>
                <p style={{margin:0,fontSize:'0.9rem',color:'rgba(255,255,255,0.7)',fontFamily:'serif'}}>Divine Journeys</p>
              </div>
            </div>
            <p style={{fontSize:'1.1rem',color:'rgba(255,255,255,0.8)',lineHeight:'1.6',marginBottom:'2rem',fontFamily:'serif'}}>
              Embark on spiritual journeys that connect you with the divine roots of India. 
              Experience authentic travel with personalized tours and temple stays.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-card">
            <h4 style={{fontWeight:800,fontSize:'1.4rem',fontFamily:'serif',marginBottom:'1.5rem',color:'#f29927'}}>
              Quick Links
            </h4>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'1rem'}}>
              <a href="/" className="footer-link">Home</a>
              <a href="/hotels" className="footer-link">Hotels</a>
              <a href="/taxi" className="footer-link">Taxi</a>
              <a href="/activities" className="footer-link">Activities</a>
              <a href="/gallery" className="footer-link">Gallery</a>
              <a href="/about" className="footer-link">About</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-card">
            <h4 style={{fontWeight:800,fontSize:'1.4rem',fontFamily:'serif',marginBottom:'1.5rem',color:'#f29927'}}>
              Contact Us
            </h4>
            <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',padding:'0.8rem',background:'rgba(255,255,255,0.08)',borderRadius:'10px'}}>
                <div>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.6)',fontFamily:'serif'}}>Email</div>
                  <div style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>devyanshbu12@gmail.com</div>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',padding:'0.8rem',background:'rgba(255,255,255,0.08)',borderRadius:'10px'}}>
                <div>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.6)',fontFamily:'serif'}}>Phone</div>
                  <div style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>+91 7037753106</div>
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',padding:'0.8rem',background:'rgba(255,255,255,0.08)',borderRadius:'10px'}}>
                <div>
                  <div style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.6)',fontFamily:'serif'}}>Location</div>
                  <div style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>Mathura, Uttar Pradesh</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="footer-card">
            <h4 style={{fontWeight:800,fontSize:'1.4rem',fontFamily:'serif',marginBottom:'1.5rem',color:'#f29927'}}>
              Our Services
            </h4>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <div style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.6rem',background:'rgba(242, 153, 39, 0.15)',borderRadius:'8px',border:'1px solid rgba(242, 153, 39, 0.3)'}}>
                <span style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>Taxi Services</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.6rem',background:'rgba(242, 153, 39, 0.15)',borderRadius:'8px',border:'1px solid rgba(242, 153, 39, 0.3)'}}>
                <span style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>Trip Booking</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.6rem',background:'rgba(242, 153, 39, 0.15)',borderRadius:'8px',border:'1px solid rgba(242, 153, 39, 0.3)'}}>
                <span style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>Hotel Booking</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'0.8rem',padding:'0.6rem',background:'rgba(242, 153, 39, 0.15)',borderRadius:'8px',border:'1px solid rgba(242, 153, 39, 0.3)'}}>
                <span style={{color:'#fff',fontWeight:500,fontFamily:'serif'}}>Custom Tours</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Copyright Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(122, 107, 87, 0.2))',
        padding: '2rem 2vw',
        textAlign: 'center',
        borderTop: '2px solid rgba(242, 153, 39, 0.3)',
        borderRadius: '25px 25px 0 0',
        backdropFilter: 'blur(15px)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 'calc(100% - 20px)',
        margin: '0 10px',
        width: 'calc(100% - 20px)'
      }}>
        {/* Decorative line */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #f29927, transparent)',
          borderRadius: '2px'
        }}></div>
        
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          {/* Main copyright info */}
          <div style={{marginBottom:'1.5rem'}}>
            <p style={{
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '0.95rem', 
              fontWeight: 400, 
              fontFamily: 'serif',
              margin: '0 0 1rem 0',
              lineHeight: '1.5'
            }}>
              © 2025 TnT Travels. All rights reserved. | Crafting divine spiritual journeys across India.
            </p>
          </div>
          
          {/* Links and additional info */}
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            flexWrap:'wrap',
            gap:'1.5rem',
            paddingTop:'1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Legal links */}
            <div style={{display:'flex',gap:'2rem',flexWrap:'wrap',justifyContent:'center'}}>
              <a href="#" className="footer-legal-link">Privacy Policy</a>
              <a href="#" className="footer-legal-link">Terms of Service</a>
              <a href="#" className="footer-legal-link">Cookie Policy</a>
            </div>
            
            {/* Additional info */}
            <div style={{
              display:'flex',
              alignItems:'center',
              gap:'1rem',
              color:'rgba(255,255,255,0.5)',
              fontSize:'0.85rem',
              fontFamily:'serif'
            }}>
              <span>Made with ❤️ in India</span>
              <span>•</span>
              <span>Spiritual Tourism</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 