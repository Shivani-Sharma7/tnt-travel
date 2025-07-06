"use client";
import React, { useState } from "react";

const destinations = [
  {
    title: "Pottery",
    image: "/activity/pottery.jpg",
    location : "Gokul",
  },
  {
    title: "Boating",
    image: "/activity/boating1.jpg",
    location: "Mathura & Vrindavan",
  },
  {
    title: "Hut Stay",
    image: "/activity/hutstay.jpg",
    location: "Barsana",
  },
  {
    title: "Fun Ride",
    image: "/activity/gaintwheel.jpg",
    location: "Vrindavan",
  },
];

export default function DestinationsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{background:'#faf7f2',padding:'3rem 3vw',maxWidth:'1500px',margin:'0 auto 2rem auto',borderRadius:'2rem'}}>
      <h2 style={{textAlign:'center',fontSize:'2.5rem',fontWeight:800,color:'#8B5C3C',marginBottom:'2.5rem',fontFamily:'serif'}}>Discover Activities</h2>
      <div style={{display:'flex',gap:'2rem',justifyContent:'center'}}>
        {destinations.map((dest, idx) => (
          <div
            key={dest.title + idx}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:'relative',
              width: hovered === idx ? 400 : 240,
              height: 380,
              borderRadius:'2rem',
              overflow:'hidden',
              boxShadow:'0 2px 16px rgba(0,0,0,0.08)',
              background:'#eee',
              transition:'width 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.3s',
              cursor:'pointer',
              flexShrink: 0,
              zIndex: hovered === idx ? 2 : 1,
            }}
          >
            <img src={dest.image} alt={dest.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'filter 0.3s',filter: hovered === idx ? 'brightness(1)' : 'brightness(0.85)'}} />
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem 1rem 1rem 1rem',background:'linear-gradient(0deg,rgba(0,0,0,0.7) 60%,rgba(0,0,0,0.0) 100%)'}}>
              <div style={{fontWeight:700,fontSize:'1.4rem',color:'#fff',fontFamily:'serif'}}>{dest.title}</div>
              <div style={{color:'#D6A17E ',fontWeight:700,fontSize:'1.1rem'}}>{dest.location}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 