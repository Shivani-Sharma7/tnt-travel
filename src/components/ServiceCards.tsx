"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ServiceCards() {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{flex:'2 1 400px',display:'flex',gap:'2rem',flexWrap:'wrap',justifyContent:'center',position:'relative',marginTop:'20px'}}>
      {/* Card 1: Customize Trip */}
      <button
        onClick={() => router.push('/customize-trip')}
        onMouseEnter={() => setHovered(0)}
        onMouseLeave={() => setHovered(null)}
        style={{
          background:'#fff',
          color:'#222',
          borderRadius:'1.2rem',
          boxShadow: hovered === 0 ? '0 4px 24px rgba(0,0,0,0.16)' : '0 2px 12px rgba(0,0,0,0.08)',
          transform: hovered === 0 ? 'translateY(-4px)' : 'none',
          padding:'1.2rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
        }}
      >
        <img src="/activity/custimizelist.png" alt="Customize Trip" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',margin:'1rem 0'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,fontSize:'1.2rem',color:'#8B5C3C',margin:'1.2rem 0 0.5rem 0',fontFamily:'Poppins, sans-serif'}}>Customize Trip</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center',fontFamily:'Poppins, sans-serif'}}>Customize your own activities, hotels, cabs, and more for a truly personalized experience.</p>
      </button>
      {/* Card 2: Taxi */}
      <button
        onClick={() => router.push('/taxi')}
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(null)}
        style={{
          background:'#fff',
          color:'#222',
          borderRadius:'1.2rem',
          boxShadow: hovered === 1 ? '0 4px 24px rgba(0,0,0,0.16)' : '0 2px 12px rgba(0,0,0,0.08)',
          transform: hovered === 1 ? 'translateY(-4px)' : 'none',
          padding:'1.2rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
        }}
      >
        <img src="/activity/taxi.jpg" alt="Taxi" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',margin:'1rem 0'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,color:'#8B5C3C',fontSize:'1.3rem',margin:'1.2rem 0 0.5rem 0',fontFamily:'Poppins, sans-serif'}}>Taxi</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center',fontFamily:'Poppins, sans-serif'}}>Reliable taxi services for comfortable and safe travel to your destination.</p>
      </button>
      {/* Card 3: Hotels */}
      <button
        onClick={() => router.push('/hotels')}
        onMouseEnter={() => setHovered(2)}
        onMouseLeave={() => setHovered(null)}
        style={{
          background:'#fff',
          color:'#222',
          borderRadius:'1.2rem',
          boxShadow: hovered === 2 ? '0 4px 24px rgba(0,0,0,0.16)' : '0 2px 12px rgba(0,0,0,0.08)',
          transform: hovered === 2 ? 'translateY(-4px)' : 'none',
          padding:'1.2rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
        }}
      >
        <img src="/activity/hotels.jpg" alt="Hotels" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',margin:'1rem 0'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,fontSize:'1.2rem',color:'#8B5C3C',margin:'1.2rem 0 0.5rem 0',fontFamily:'Poppins, sans-serif'}}>Hotels</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center',fontFamily:'Poppins, sans-serif'}}>Book the best hotels at great prices for a comfortable stay during your trip.</p>
      </button>
      {/* Card 4: Rental Bike, Car */}
      {/* <button
        onClick={() => router.push('/rental-bike-car')}
        onMouseEnter={() => setHovered(3)}
        onMouseLeave={() => setHovered(null)}
        style={{
          background:'#fff',
          color:'#222',
          borderRadius:'1.2rem',
          boxShadow: hovered === 3 ? '0 4px 24px rgba(0,0,0,0.16)' : '0 2px 12px rgba(0,0,0,0.08)',
          transform: hovered === 3 ? 'translateY(-4px)' : 'none',
          padding:'1.2rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
        }}
      >
        <img src="/activity/rental.jpg" alt="Rental Bike, Car" style={{width:'100%',height:'140px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',marginBottom:'1rem'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,fontSize:'1.2rem',color:'#8B5C3C',margin:'1.2rem 0 0.5rem 0',fontFamily:'Poppins, sans-serif'}}>Rental Bike, Car</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center',fontFamily:'Poppins, sans-serif'}}>Easy and affordable rental options for bikes and cars to explore at your own space.</p>
      </button> */}
    </div>
  );
}
