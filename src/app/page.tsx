import Image from "next/image";
import ServiceCards from "../components/ServiceCards";
import CancellationInfo from "../components/CancellationInfo";
import SupportCall from "../components/SupportCall";
import DestinationsSection from "../components/DestinationsSection";
import GallerySection from "../components/GallerySection";
import Footer from "../components/Footer";





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
        padding:'12rem 5rem 4rem 8rem',
        maxWidth:'calc(100% - 20px)',
        margin:'0 10px 2rem 10px',
        borderRadius:'2rem',
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
      
      {/* About Us Section (redesigned) */}
      <section id="about-us" style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'3rem',
        padding:'4rem 2rem 7rem 2rem',
        maxWidth:'calc(100% - 20px)',
        margin:'0 10px',
        background:'#fdf6f3',
        borderRadius:'2rem',
        boxShadow:'0 2px 24px rgba(0,0,0,0.07)'
      }}>
        {/* Left: Illustration with circle */}
        <div style={{flex:'auto',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',height:'400px'}}>
          <div style={{position:'absolute',width:'420px',height:'420px',borderRadius:'50%',background:'#f8e9d2',zIndex:0,left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}></div>
          <img src="/activity/about us.png" alt="Traveler" style={{width:'380px',height:'400px',objectFit:'contain',zIndex:4,position:'relative'}} />
        </div>
        {/* Right: Text and Stats */}
        <div style={{flex:'1 1 600px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2.2rem',textAlign:'center'}}>
          <h2 style={{fontSize:'2.5rem',fontWeight:800,color:'#7A6B57',marginBottom:'0.5rem',lineHeight:1.1}}>We&apos;re here to take you to your<br/>dream places</h2>
          <div style={{fontSize:'1rem',color:'#6d5b45',fontWeight:500,maxWidth:'700px',margin:'0 auto 1.5rem auto'}}>We offer personalized spiritual trips with fully customized activities, stays, cabs with unique experiences like traditional activity & stays. Our mission is to provide authentic travel experiences that connect you with the divine roots of India.</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'2rem',width:'100%',maxWidth:'700px',position:'relative'}}>
            <div style={{background:'linear-gradient(90deg,#e2b86b,#a98a5c)',borderRadius:'1.2rem',padding:'1rem 0',boxShadow:'0 2px 8px #f2992712',fontWeight:800,color:'#fff',fontSize:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              18<br/><span style={{fontSize:'1rem',fontWeight:600,marginTop:'0.3rem'}}>Tours Packs</span>
            </div>
            <div style={{background:'linear-gradient(90deg,#e2b86b,#a98a5c)',borderRadius:'1.2rem',padding:'1rem 0',boxShadow:'0 2px 8px #f2992712',fontWeight:800,color:'#fff',fontSize:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              2<br/><span style={{fontSize:'1rem',fontWeight:600,marginTop:'0.3rem'}}>Locations</span>
            </div>
            <div style={{background:'linear-gradient(90deg,#e2b86b,#a98a5c)',borderRadius:'1.2rem',padding:'1rem 0',boxShadow:'0 2px 8px #f2992712',fontWeight:800,color:'#fff',fontSize:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              21<br/><span style={{fontSize:'1rem',fontWeight:600,marginTop:'0.3rem'}}>Hotels</span>
            </div>
            <div style={{background:'linear-gradient(90deg,#e2b86b,#a98a5c)',borderRadius:'1.2rem',padding:'1rem 0',boxShadow:'0 2px 8px #f2992712',fontWeight:800,color:'#fff',fontSize:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              7<br/><span style={{fontSize:'1rem',fontWeight:600,marginTop:'0.3rem'}}>Activities</span>
            </div>
            <div style={{background:'linear-gradient(90deg,#e2b86b,#a98a5c)',borderRadius:'1.2rem',padding:'1rem 0',boxShadow:'0 2px 8px #f2992712',fontWeight:800,color:'#fff',fontSize:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative'}}>
              100%<br/><span style={{fontSize:'1rem',fontWeight:600,marginTop:'0.3rem'}}>Free Cancellation</span>
              <CancellationInfo />
            </div>
            <div style={{background:'linear-gradient(90deg,#e2b86b,#a98a5c)',borderRadius:'1.2rem',padding:'1rem 0',boxShadow:'0 2px 8px #f2992712',fontWeight:800,color:'#fff',fontSize:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative'}}>
              24/7<br/><span style={{fontSize:'1rem',fontWeight:600,marginTop:'0.3rem'}}>Support</span>
              <SupportCall />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <h2 style={{textAlign:'center',fontSize:'2.5rem',fontWeight:800,color:'#8B5C3C',margin:'1rem 0 0 0',marginTop:'80px'}}>Our Services</h2>
      <div style={{
          width:'120px',
          height:'5px',
          background:'#E2C9A7',
          margin:'1rem auto',
          borderRadius:'3px',
          marginBottom:'1.5rem',
        }} />
      <section id="our-services" style={{
        background:'#fdf6f1',
        padding:'0',
        maxWidth:'calc(100% - 20px)',
        margin:'0 10px',
        border:'none',
        marginBottom:'4rem',
        borderRadius:'2rem',
        overflow:'hidden'
      }}>
        
        <div style={{
          maxWidth:'calc(100% - 20px)',
          margin:'0 10px',
          background:'#7A6B57',
          display:'flex',
          flexDirection:'row',
          alignItems:'stretch',
          overflow:'hidden',
          boxShadow:'0 0 0 rgba(0,0,0,0.4)',
          borderRadius:'2rem'
        }}>
          {/* Left: Text */}
          <div style={{flex:'1 1 33%',minWidth:'340px',maxWidth:'600px',background:'#7A6B57',borderRadius:'48px 0 0 48px',display:'flex',alignItems:'center',justifyContent:'flex-start',padding:'2rem 1.5rem'}}>
            
            <div>
              {/* <h2 style={{textAlign:'left',fontSize:'3.5rem',fontWeight:800,color:'#D8CAB8',marginBottom:'50px',fontFamily:'inherit'}}>Our Services</h2> */}
              
              <div style={{fontSize:'2.7rem',fontWeight:800,color:'#fff',marginBottom:'0.7rem',lineHeight:1.1}}>
                It's Time To <span style={{color:'#f7b84b'}}>Travel</span><br/>With
              </div>
              <div style={{fontWeight:900,fontSize:'3rem',color:'#000',fontFamily:'inherit',letterSpacing:'0.01em',marginTop:'0.5rem'}}>DIVINE YATRA</div>
            </div>
          </div>
          {/* Right: Service Cards */}
          <div style={{flex:'2 1 67%',display:'flex',alignItems:'center',justifyContent:'center',background:'#fff',borderRadius:'58px 0 0 0',padding:'1rem 2rem 1rem 1rem'}}>
            <ServiceCards />
          </div>
        </div>
      </section>

      <DestinationsSection />

      <GallerySection />
      <Footer />
    </main>
  );
}
