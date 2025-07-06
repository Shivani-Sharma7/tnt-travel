"use client";
import { useState } from 'react';

interface AnimatedCardProps {
  number: string;
  label: string;
}

export default function AnimatedCard({ number, label }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:'0.7rem',
        background: 'linear-gradient(135deg, #eba646 0%, #7A6B57 100%)',
        padding:'1rem 1.5rem',
        borderRadius:'1rem',
        fontWeight:700,
        color:'#fff',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 6px rgba(0,0,0,0.08)',
        fontFamily:'Poppins, sans-serif',
        width:'220px',
        textAlign:'center',
        transition:'all 0.3s ease',
        cursor:'pointer',
        transform: isHovered ? 'scale(1.02) translateY(-2px)' : 'scale(1) translateY(0)',
        transformOrigin: 'center center',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255,255,255,0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{textAlign:'center'}}>
        <div style={{fontWeight:800,fontSize:'1.2rem',color:'#fff',fontFamily:'Poppins, sans-serif',textShadow:'0 1px 1px rgba(0,0,0,0.2)'}}>{number}</div>
        <div style={{color:'rgba(255,255,255,0.95)',fontWeight:600,fontSize:'0.9rem',fontFamily:'Poppins, sans-serif'}}>{label}</div>
      </div>
    </div>
  );
} 