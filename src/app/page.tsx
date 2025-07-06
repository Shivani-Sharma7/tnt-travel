import Image from "next/image";
import ServiceCards from "../components/ServiceCards";
import DestinationsSection from "../components/DestinationsSection";
import GallerySection from "../components/GallerySection";

export const metadata = {
  title: "Divine yatra | Explore the World with Us",
  description: "Divine yatra offers unrivaled expertise for unique travel experiences. We're here to take you to your dream travels.",
  openGraph: {
    title: "Divine yatra | Explore the World with Us",
    description: "Divine yatra offers unrivaled expertise for unique travel experiences. We're here to take you to your dream travels.",
  },
};



export default function Home() {
  return (
    <main style={{padding:0,margin:0,fontFamily:'inherit'}}>
      {/* Hero Section */}
      <section style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:'2rem',
        background:'#fdf6f3',
        padding:'10rem 5rem 4rem 8rem',
        maxWidth:'1600px',
        margin:'-10rem auto 2rem auto',
        borderRadius:'0 0 0 0rem',
        position:'relative',
        overflow:'hidden',
        backgroundImage: 'url(/activity/ghat.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Left: Text */}
        <div style={{flex:'1 1 50%',minWidth:320}}>
          <h1 style={{fontSize:'2.8rem',fontWeight:800,marginBottom:'1.5rem',color:'#5C3D2E',lineHeight:1.1}}>Your Spiritual Journey, Perfectly Customized</h1>
          <p style={{fontSize:'1.25rem',color:'#fff',marginBottom:'2.5rem',fontFamily:'cursive',maxWidth:475}}>Explore the divine roots with personalized tours, temple stays, and seamless travel — all in one app. </p>
          {/* Google Review Card + Verified Card Row */}
          <div style={{display:'flex',alignItems:'stretch',gap:'1.2rem',marginBottom:'1.5rem'}}>
            {/* Google Review Card */}
            <div style={{display:'flex',width:'320px',height:'110px',borderRadius:'18px',boxShadow:'0 2px 16px rgba(0,0,0,0.15)',overflow:'hidden',background:'#fff'}}>
              {/* Left: Google logo and text */}
              <div style={{flex:'1 1 50%',background:'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.1rem 0'}}>
                <div style={{width:40,height:50,background:'#f29927',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'0.3rem'}}>
                  <Image src="/elements/googlelogo.png" alt="Google Logo" width={40} height={40} style={{width:40,height:40,objectFit:'contain'}} />
                </div>
                <div style={{fontWeight:700,fontSize:'1.1rem',color:'#888'}}>Google</div>
                <div style={{fontSize:'0.8rem',color:'#222',fontWeight:600,letterSpacing:'0.4px',fontFamily:'serif'}}>REVIEWED BY</div>
              </div>
              {/* Right: Rating and stars */}
              <div style={{flex:'1 1 50%',background:'#22313f',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',padding:'1.1rem 1.1rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.1rem'}}>
                  <span style={{fontWeight:800,fontSize:'2.2rem',color:'#fff'}}>4.5</span>
                  <span style={{color:'#f29927',fontSize:'1.3rem',marginLeft:'0.2rem'}}>
                    {Array.from({length: 5}).map((_,i) => <span key={i} style={{marginRight:2}}>&#9733;</span>)}
                  </span>
                </div>
                <span style={{color:'#bfcdb2',fontWeight:600,bottom:'10px',left:'10px',fontSize:'1rem'}}>8.5k reviews</span>
              </div>
            </div>
            {/* Verified Card */}
            <div style={{background:'#fff',borderRadius:'1rem',padding:'1.2rem 2.2rem',boxShadow:'0 2px 12px rgba(0,0,0,.15)',display:'flex',flexDirection:'column',alignItems:'center',fontWeight:600,height:'110px',justifyContent:'center'}}>
              <Image src="/globe.svg" alt="Verified" width={32} height={32} style={{marginBottom:'0.5rem'}} />
              <span style={{fontSize:'1.3rem',color:'#18122B'}}>100%</span>
              <span style={{fontSize:'1rem',color:'#6c6c6c'}}>Verified</span>
            </div>
          </div>
        </div>
        {/* Right: Image */}
        {/* (Images removed as requested) */}
      </section>

      {/* Our Services Section */}
      <section id="our-services" style={{background:'#7A6B57',color:'#fff',padding:'2.4rem 3vw',maxWidth:'1400px',margin:'0 auto 2rem auto',borderRadius:'2rem',display:'flex',gap:'2.5rem',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
        {/* Left: Text and Button */}
        <div style={{flex:'1 1 340px',minWidth:'300px',maxWidth:'420px'}}>
          <div style={{color:'#E2B89B',fontWeight:700,marginBottom:'0.5rem',letterSpacing:'1px'}}>OUR SERVICES</div>
          <h2 style={{fontSize:'2.2rem',fontWeight:800,marginBottom:'1.2rem',lineHeight:1.2}}>
            It&apos;s Time To <span style={{color:'#E2B89B'}}>Travel</span> With<br/><span style={{color:'black',fontSize:'2.8rem',fontFamily:'fantasy',letterSpacing:'0.05em'}}>DIVINE YATRA</span>
          </h2>
        </div>
        {/* Right: Service Cards */}
        <ServiceCards />
      </section>

      <DestinationsSection />

      {/* About Us Stats Section (inspired by screenshot) */}
      <section id="about-us" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'3rem',padding:'4rem 2rem',maxWidth:'1400px',margin:'0 auto 2rem auto',background:'#E2B89B',borderRadius:'2rem',boxShadow:'0 2px 24px rgba(0,0,0,0.07)'}}>
        {/* Stats Left */}
        <div style={{display:'flex',flexDirection:'column',gap:'2rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1.2rem',background:'#fff6f1',padding:'1.5rem 2.5rem',borderRadius:'1.2rem',boxShadow:'0 2px 8px #f2992712'}}>
            <span style={{fontSize:'2.5rem',color:'#ff9900'}}>&#128188;</span>
            <div>
              <div style={{fontWeight:800,fontSize:'2rem',color:'#18122B'}}>18</div>
              <div style={{color:'#6c6c6c',fontWeight:600}}>Tours Packs</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'1.2rem',background:'#fff6f1',padding:'1.5rem 2.5rem',borderRadius:'1.2rem',boxShadow:'0 2px 8px #f2992712'}}>
            <span style={{fontSize:'2.5rem',color:'#ff9900'}}>&#127956;</span>
            <div>
              <div style={{fontWeight:800,fontSize:'2rem',color:'#18122B'}}>2</div>
              <div style={{color:'#6c6c6c',fontWeight:600}}>Locations</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'1.2rem',background:'#fff6f1',padding:'1.5rem 2.5rem',borderRadius:'1.2rem',boxShadow:'0 2px 8px #f2992712'}}>
            <span style={{fontSize:'2.5rem',color:'#ff9900'}}>&#128205;</span>
            <div>
              <div style={{fontWeight:800,fontSize:'2rem',color:'#18122B'}}>21</div>
              <div style={{color:'#6c6c6c',fontWeight:600}}>Hotels</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'1.2rem',background:'#fff6f1',padding:'1.5rem 2.5rem',borderRadius:'1.2rem',boxShadow:'0 2px 8px #f2992712'}}>
            <span style={{fontSize:'2.5rem',color:'#ff9900'}}>&#127965;</span>
            <div>
              <div style={{fontWeight:800,fontSize:'2rem',color:'#18122B'}}>7</div>
              <div style={{color:'#6c6c6c',fontWeight:600}}>Activities</div>
            </div>
          </div>
        </div>
        {/* Center Image */}
        <div style={{flex:'0 0 420px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
          <div style={{position:'absolute',width:'420px',height:'420px',borderRadius:'50%',background:'rgba(255,153,0,0.08)',zIndex:0}}></div>
          <img src="/activity/about us.png" alt="Traveler" style={{width:'380px',height:'400px',zIndex:1,position:'relative',shapeOutside:'circle'}} />
        </div>
        {/* Right Text/Features */}
        <div style={{flex:'1 1 400px',display:'flex',flexDirection:'column',gap:'1.5rem',alignItems:'flex-start',maxWidth:'420px'}}>
          <div style={{color:'#fff',fontWeight:700,marginBottom:'0.5rem',fontSize:'1.2rem'}}>About Us</div>
          <h2 style={{fontSize:'2.7rem',fontWeight:800,marginBottom:'1.2rem',lineHeight:'1.1',color:'#7A6B57'}}>We&apos;re here <br/>to take you to your dream places</h2>
          <div style={{display:'flex',gap:'1.2rem',marginBottom:'1.2rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.7rem',background:'#fff6f1',padding:'1.2rem 2rem',borderRadius:'1.2rem',fontWeight:700,color:'#18122B',boxShadow:'0 2px 8px #f2992712'}}>
              <span style={{fontSize:'1.7rem',color:'#ff9900'}}>&#128205;</span>
              Free Cancellation
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'0.7rem',background:'#fff6f1',padding:'1.2rem 2rem',borderRadius:'1.2rem',fontWeight:700,color:'#18122B',boxShadow:'0 2px 8px #f2992712'}}>
              <span style={{fontSize:'1.7rem',color:'#ff9900'}}>&#128222;</span>
              24/7 Support
            </div>
          </div>
          <div style={{color:'#6c6c6c',fontWeight:500,fontSize:'1.1rem',marginBottom:'1.2rem'}}>We offer personalized spiritual trips with fully customized activities, stays, cabs with unique experiences like traditional activity & stays.</div>
          
        </div>
      </section>

      {/* Banner Section: Need tour Expert? */}
      <section style={{position:'relative',background:'#7A6B57',fontFamily:'initial',padding:'3.5rem 0 2.5rem 0',margin:'0 auto 2rem auto',maxWidth:'100vw',height:'17vh',overflow:'hidden'}}>
        {/* Large faded background text */}
        <span style={{
          position:'absolute',
          left:'70%',
          top:'35%',
          transform:'translate(-50%,-50%)',
          fontSize:'7rem',
          color:'rgba(255,255,255,0.25)',
          fontWeight:900,
          letterSpacing:'-0.05em',
          zIndex:0,
          userSelect:'none',
          whiteSpace:'nowrap',
        }}>Gallery</span>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:'1400px',margin:'0 auto',position:'relative',zIndex:1}}>
          {/* Left: Banner text */}
          <div style={{background:'fff',top:'12px',color:'#fff',fontWeight:800,height:'90%',fontSize:'2.5rem',padding:'1rem 4rem 1rem 1.8rem',borderRadius:'0 0 0 0'}}>
            Clients Joureny

          </div>
          {/* Right: Button */}

        </div>
      </section>

      <GallerySection />

      {/* Footer Section */}
      <footer style={{
        background: 'linear-gradient(120deg, #8B5C3C 40%, #7A6B57 100%)',
        padding: '3rem 2vw 2rem 2vw',
        marginTop: '6rem',
        color: '#fff',
        position: 'relative',
        animation: 'fadeInFooter 1.2s cubic-bezier(.4,2,.6,1)',
        boxShadow: '0 -4px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
      }}>
        <style>{`
          @keyframes fadeInFooter {
            from { opacity: 0; transform: translateY(60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .footer-social {
            border: 1.5px solid #6b7c5e;
            border-radius: 8px;
            padding: 0.4rem 0.7rem;
            display: inline-flex;
            align-items: center;
            font-size: 1.3rem;
            cursor: pointer;
            background: #232b2b;
            transition: background 0.3s, color 0.3s, box-shadow 0.3s;
            margin-right: 0.3rem;
          }
          .footer-social:hover {
            background: #f29927;
            color: #fff;
            box-shadow: 0 2px 12px #f2992740;
          }
        `}</style>
        
        <div style={{maxWidth:'1400px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'3rem'}}>
            
            {/* Company Info */}
            <div>
              <div style={{display:'flex',alignItems:'center',gap:'0.7rem',marginBottom:'1.5rem'}}>
                <span style={{fontSize:'2.7rem',color:'#f29927',fontWeight:900,filter:'drop-shadow(0 2px 8px #f2992740)'}}>&#x21bb;</span>
                <span style={{fontWeight:900,fontSize:'2.2rem',fontFamily:'serif',letterSpacing:'-1px'}}>TnT<span style={{color:'#f29927'}}>Travel</span></span>
              </div>
              <div style={{marginBlock:'2rem',fontSize:'22px',color:'#bfcdb2'}}>Stay connected for future Trips.</div>
            </div>

            {/* Contact Info */}
            <div>
              <div style={{fontWeight:800,fontSize:'1.5rem',fontFamily:'serif',marginBottom:'1rem',letterSpacing:'-1px',color:'#E2B89B'}}>Contact Us</div>
              <div style={{height:'3px',width:'60px',background:'#E2B89B',marginBottom:'1.5rem'}}></div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.8rem',marginBottom:'1.5rem'}}>
                <span style={{color:'#fff',fontSize:'1.1rem'}}> devyanshbu12@gmail.com</span>
                <span style={{color:'#fff',fontSize:'1.1rem'}}> +91 7037753106</span>
                <span style={{color:'#fff',fontSize:'1.1rem'}}> mathura,up</span>
              </div>
              <div style={{display:'flex',gap:'0.7rem'}}>
                <span className="footer-social">&#x1F465;</span>
                <span className="footer-social">&#x25B6;</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <div style={{fontWeight:800,fontSize:'1.5rem',fontFamily:'serif',marginBottom:'1rem',letterSpacing:'-1px',color:'#E2B89B'}}>Our Services</div>
              <div style={{height:'3px',width:'60px',background:'#E2B89B',marginBottom:'1.5rem'}}></div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.8rem'}}>
                <span style={{color:'#fff',fontSize:'1.1rem'}}>&#x276F; Guide Of The Year</span>
                <span style={{color:'#fff',fontSize:'1.1rem'}}>&#x276F; Creators</span>
                <span style={{color:'#fff',fontSize:'1.1rem'}}>&#x276F; Travel Agents & Advisors</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div style={{
          background: '#7A6B57',
          padding: '1rem 2vw',
          marginTop: '2rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(226,184,155,0.3)'
        }}>
          <span style={{color: '#fff', fontSize: '1rem'}}>© 2025 TnT Travels. All rights reserved.</span>
        </div>
      </footer>
      </main>
  );
}
