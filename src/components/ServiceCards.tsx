"use client";
import { useState } from "react";

export default function ServiceCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const router = (typeof window !== 'undefined') ? { push: (url:string) => (window.location.href = url) } as any : ({ push: () => {} } as any);
  return (
    <div style={{
      flex:'2 1 400px',
      display:'grid',
      gridTemplateColumns:'repeat(2, 1fr)',
      gap:'1rem',
      margin:'1rem 0 0 0',
      justifyContent:'center',
      position:'relative',
      maxWidth:'600px'
    }}>

      {/* Card 1: Customize Trip (first) */}
      <button
        onClick={() => router.push('/customize-trip')}
        onMouseEnter={() => setHovered(0)}
        onMouseLeave={() => setHovered(null)}
        style={{
          background:'#fff',
          color:'#222',
          borderRadius:'1.2rem',
          boxShadow: hovered === 0 ? '0 6px 24px rgba(0,0,0,0.16)' : '0 4px 20px rgba(0,0,0,0.08)',
          transform: hovered === 0 ? 'translateY(-4px)' : 'none',
          padding:'0.8rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
          justifySelf:'center'
        }}
      >
        <img src="/elements/vrindavan.jpg" alt="Customize Trip" style={{width:'100%',height:'100px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',marginBottom:'1rem'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">⚙️</span>
        </div>
        <h3 style={{fontWeight:700,color:'#8B5C3C',fontSize:'1.2rem',margin:'1.2rem 0 0.5rem 0'}}>Customize Trip</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center'}}>Plan your own itinerary with preferred transport, hotels and meals.</p>
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
          padding:'0.8rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
          justifySelf:'center'
        }}
      >
        <img src="/activity/taxi.jpg" alt="Taxi" style={{width:'100%',height:'100px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',marginBottom:'1rem'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,color:'#8B5C3C',fontSize:'1.3rem',margin:'1.2rem 0 0.5rem 0'}}>Taxi</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center'}}>Reliable taxi services for comfortable and safe travel to your destination.</p>
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
          padding:'0.8rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
          justifySelf:'center'
        }}
      >
        <img src="/activity/hotels.jpg" alt="Hotels" style={{width:'100%',height:'100px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',marginBottom:'1rem'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,fontSize:'1.2rem',color:'#8B5C3C',margin:'1.2rem 0 0.5rem 0'}}>Hotels</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center'}}>Book the best hotels at great prices for a comfortable stay during your trip.</p>
      </button>

      {/* Card 4: Rental Bike, Car */}
      <button
        onClick={() => router.push('/rental-bike-car')}
        onMouseEnter={() => setHovered(3)}
        onMouseLeave={() => setHovered(null)}
        style={{
          background:'#fff',
          color:'#222',
          borderRadius:'1.2rem',
          boxShadow: hovered === 3 ? '0 4px 24px rgba(0,0,0,0.16)' : '0 2px 12px rgba(0,0,0,0.08)',
          transform: hovered === 3 ? 'translateY(-4px)' : 'none',
          padding:'0.8rem',
          width:'260px',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          position:'relative',
          border:'none',
          cursor:'pointer',
          transition:'box-shadow 0.2s, transform 0.2s',
          marginBottom:'1rem',
          justifySelf:'center'
        }}
      >
        <img src="/activity/rental.jpg" alt="Rental Bike, Car" style={{width:'100%',height:'100px',objectFit:'cover',borderRadius:'1rem 1rem 0 0',marginBottom:'1rem'}} />
        <div style={{position:'absolute',top:120,left:20,background:'#fff',borderRadius:'50%',padding:'0.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
          <span role="img" aria-label="badge">🏅</span>
        </div>
        <h3 style={{fontWeight:700,fontSize:'1.2rem',color:'#8B5C3C',margin:'1.2rem 0 0.5rem 0'}}>Rental Bike, Car</h3>
        <p style={{color:'#A66A43',fontSize:'1rem',textAlign:'center'}}>Easy and affordable rental options for bikes and cars to explore at your own space.</p>
      </button>

      {/* Boat Icon at bottom right */}
      <img 
        src="/elements/boaticon.webp" 
        alt="Boat Icon" 
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '90px',
          height: '90px',
          zIndex: 5,
          transition: 'transform 0.3s',
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
  );
}
