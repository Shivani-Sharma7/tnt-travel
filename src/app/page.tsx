import Image from "next/image";
import ServiceCards from "../components/ServiceCards";
import DestinationsSection from "../components/DestinationsSection";
import GallerySection from "../components/GallerySection";
import BoatIcon from "../components/BoatIcon";
import HeroCarousel from "../components/HeroCarousel";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedImage from "../components/AnimatedImage";

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
    <main style={{padding:0,margin:0,fontFamily:'Poppins, sans-serif'}}>
      {/* Hero Section */}
      <section style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        gap:'2rem',
        background:'transparent',
        padding:'8rem 3rem 4rem 3rem',
        maxWidth:'1400px',
        margin:'0 auto',
        position:'relative',
        overflow:'hidden',
        minHeight:'100vh',
        borderRadius:'2rem',
      }}>
        {/* Carousel Background */}
        <HeroCarousel />
        {/* Left: Text */}
        <div style={{flex:'1 1 50%',minWidth:320,position:'relative',zIndex:1}}>
          <h1 style={{fontSize:'2.8rem',fontWeight:800,marginBottom:'1.5rem',color:'#fff',lineHeight:1.1,fontFamily:'Poppins, sans-serif',textShadow:'2px 2px 4px rgba(0,0,0,0.5)'}}>Your Spiritual Journey, Perfectly Customized</h1>
          <p style={{fontSize:'1.25rem',color:'#fff',marginBottom:'2.5rem',fontFamily:'Poppins, sans-serif',maxWidth:475,textShadow:'1px 1px 2px rgba(0,0,0,0.5)'}}>Explore the divine roots with personalized tours, temple stays, and seamless travel — all in one app. </p>
          {/* Google Review Card + Verified Card Row */}
          {/* <div style={{display:'flex',alignItems:'stretch',gap:'1.2rem',marginBottom:'1.5rem'}}>
            {/* Google Review Card */}
            {/* <div style={{display:'flex',width:'320px',height:'110px',borderRadius:'18px',boxShadow:'0 2px 16px rgba(0,0,0,0.15)',overflow:'hidden',background:'#fff'}}>
              {/* Left: Google logo and text */}
              {/* <div style={{flex:'1 1 50%',background:'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'1.1rem 0'}}>
                <div style={{width:40,height:50,background:'#E2B89B',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'0.3rem'}}>
                  <Image src="/elements/googlelogo.png" alt="Google Logo" width={40} height={40} style={{width:40,height:40,objectFit:'contain'}} />
                </div>
                <div style={{fontWeight:700,fontSize:'1.1rem',color:'#7A6B57',fontFamily:'Poppins, sans-serif'}}>Google</div>
                <div style={{fontSize:'0.8rem',color:'#7A6B57',fontWeight:600,letterSpacing:'0.4px',fontFamily:'Poppins, sans-serif'}}>REVIEWED BY</div>
              </div>
              {/* Right: Rating and stars */}
              {/* <div style={{flex:'1 1 50%',background:'#7A6B57',display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',padding:'1.1rem 1.1rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.1rem'}}>
                  <span style={{fontWeight:800,fontSize:'2.2rem',color:'#fff'}}>4.5</span>
                  <span style={{color:'#E2B89B',fontSize:'1.3rem',marginLeft:'0.2rem'}}>
                    {Array.from({length: 5}).map((_,i) => <span key={i} style={{marginRight:2}}>&#9733;</span>)}
                  </span>
                </div>
                <span style={{color:'#E2B89B',fontWeight:600,bottom:'10px',left:'10px',fontSize:'1rem',fontFamily:'Poppins, sans-serif'}}>8.5k reviews</span>
              </div>
            </div>
            {/* Verified Card */}
            {/* <div style={{background:'#fff',borderRadius:'1rem',padding:'1.2rem 2.2rem',boxShadow:'0 2px 12px rgba(0,0,0,.15)',display:'flex',flexDirection:'column',alignItems:'center',fontWeight:600,height:'110px',justifyContent:'center'}}>
              <Image src="/globe.svg" alt="Verified" width={32} height={32} style={{marginBottom:'0.5rem'}} />
              <span style={{fontSize:'1.3rem',color:'#18122B',fontFamily:'Poppins, sans-serif'}}>100%</span>
              <span style={{fontSize:'1rem',color:'#6c6c6c',fontFamily:'Poppins, sans-serif'}}>Verified</span>
            </div>
          </div> */}
        </div>
        {/* Right: Image */}
        {/* (Images removed as requested) */}
      </section>

      {/* About Us Section */}
      <section style={{
        padding:'4rem 2rem',
        maxWidth:'1400px',
        margin:'0 auto 1rem auto',
        position:'relative',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        textAlign:'center'
      }}>
        {/* Main About Us Content */}
        <div style={{
          display:'flex',
          gap:'3rem',
          alignItems:'center',
          marginBottom:'3rem',
          justifyContent:'center',
          maxWidth:'1200px'
        }}>
                  {/* Left: Image */}
        <AnimatedImage />
          
          {/* Right: Content */}
          <div style={{flex:'1 1 500px',display:'flex',flexDirection:'column',gap:'1.5rem',position:'relative'}}>
            <h2 style={{fontSize:'2.7rem',fontWeight:800,lineHeight:'1.1',color:'#7A6B57',fontFamily:'Poppins, sans-serif'}}>
              We&apos;re here to take you to your dream places
            </h2>
            <p style={{color:'#333',fontWeight:500,fontSize:'1.1rem',lineHeight:'1.6',fontFamily:'Poppins, sans-serif'}}>
              We offer personalized spiritual trips with fully customized activities, stays, cabs with unique experiences like traditional activity & stays. Our mission is to provide authentic travel experiences that connect you with the divine roots of India.
            </p>
            
            {/* Features */}
            
            
            {/* Highlights Cards */}
            <div style={{
              display:'flex',
              gap:'1.2rem',
              marginTop:'1.5rem',
              flexWrap:'wrap',
              justifyContent:'center',
              alignItems:'center',
              maxWidth:'1200px',
              margin:'1.5rem auto 0 auto'
            }}>
              <AnimatedCard number="18" label="Tours Packs" />
              <AnimatedCard number="2" label="Locations" />
              <AnimatedCard number="21" label="Hotels" />
              <AnimatedCard number="7" label="Activities" />
              <AnimatedCard number="100%" label="Free Cancellation" />
              <AnimatedCard number="24/7" label="Support" />
            </div>
            
            
            {/* Boat Icon */}
            <BoatIcon />
          </div>
        </div>


      </section>

      {/* Discover Activities Heading */}
      <div style={{textAlign:'center',margin:'0.2rem auto',maxWidth:'1400px'}}>
        <h2 style={{fontSize:'2.5rem',fontWeight:800,color:'#7A6B57',fontFamily:'Poppins, sans-serif',marginBottom:'0.2rem'}}>Our Services</h2>
        {/* <div style={{width:'80px',height:'4px',background:'#E2B89B',margin:'0 auto'}}></div> */}
      </div>

      {/* Our Services Section */}
      <section id="our-services" style={{background:'#7A6B57',color:'#fff',padding:'2.4rem 2rem',maxWidth:'1400px',margin:'0.2rem auto 2rem auto',borderRadius:'2rem',display:'flex',gap:'2.5rem',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
        {/* Left: Text and Button */}
        <div style={{flex:'1 1 340px',minWidth:'300px',maxWidth:'420px',position:'relative'}}>
          {/* <div style={{color:'#E2B89B',fontWeight:700,marginBottom:'0.5rem',letterSpacing:'1px'}}>OUR SERVICES</div> */}
          <h2 style={{fontSize:'2.2rem',fontWeight:800,marginBottom:'1.2rem',lineHeight:1.2}}>
            It&apos;s Time To <span style={{color:'#eba646'}}>Travel</span> With<br/><span style={{color:'black',fontSize:'2.8rem',fontFamily:'fantasy',letterSpacing:'0.05em'}}>DIVINE YATRA</span>
          </h2>
          {/* Boat Icon below DIVINE YATRA text */}
          <BoatIcon />
        </div>
        {/* Right: Service Cards */}
        <ServiceCards />
      </section>

      <DestinationsSection />



      {/* Clients Journey Heading */}
      <div style={{textAlign:'center',margin:'2rem auto',maxWidth:'1400px'}}>
        <h2 style={{fontSize:'2.5rem',fontWeight:800,color:'#7A6B57',fontFamily:'Poppins, sans-serif',marginBottom:'0.5rem'}}>Clients Journey</h2>
        <div style={{width:'80px',height:'4px',background:'#E2B89B',margin:'0 auto'}}></div>
      </div>

      <GallerySection />

      {/* Footer Section */}
      <footer style={{
        background: '#7A6B57',
        padding: '3rem 2rem 2rem 2rem',
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
                <span style={{fontWeight:900,fontSize:'2.2rem',fontFamily:'Poppins, sans-serif',letterSpacing:'-1px'}}>TnT<span style={{color:'#f29927'}}>Travel</span></span>
              </div>
              <div style={{marginBlock:'2rem',fontSize:'22px',color:'#bfcdb2'}}>Stay connected for future Trips.</div>
            </div>

            {/* Contact Info */}
            <div>
              <div style={{fontWeight:800,fontSize:'1.5rem',fontFamily:'Poppins, sans-serif',marginBottom:'1rem',letterSpacing:'-1px',color:'#E2B89B'}}>Contact Us</div>
              <div style={{height:'3px',width:'60px',background:'#E2B89B',marginBottom:'1.5rem'}}></div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.8rem',marginBottom:'1.5rem'}}>
                <span style={{color:'#fff',fontSize:'1.1rem'}}> devyanshbu12@gmail.com</span>
                <span style={{color:'#fff',fontSize:'1.1rem'}}> +91 7037753106</span>
                <span style={{color:'#fff',fontSize:'1.1rem'}}>Mathura,Uttar Pradesh, India</span>
              </div>
              
            </div>

            {/* Services */}
            <div>
              <div style={{fontWeight:800,fontSize:'1.5rem',fontFamily:'Poppins, sans-serif',marginBottom:'1rem',letterSpacing:'-1px',color:'#E2B89B'}}>Our Services</div>
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
          padding: '1rem 2rem',
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
