"use client";
import React, { useState, useEffect } from 'react';

export default function CabImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i+1)%images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div
      style={{position:'relative',width:'100%',height:150,display:'flex',alignItems:'center',justifyContent:'center',background:'#f9f6f2'}}
      onMouseEnter={() => setIdx(i => (i+1)%images.length)}
    >
      <img src={images[idx]} alt="Cab" style={{width:'90%',height:140,objectFit:'cover',borderRadius:'1rem',marginBlock:'1rem',marginInline:'auto',transition:'transform 0.35s cubic-bezier(1,5,1,1)',boxShadow:'0 2px 12px #7A6B5722'}} />
      <div style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
        {images.map((_,i) => (
          <span
            key={i}
            onClick={e => {e.stopPropagation(); setIdx(i);}}
            style={{width:7,height:7,borderRadius:'50%',background:idx===i?'#7A6B57':'#e0c97c',display:'inline-block',cursor:'pointer',transition:'background 0.2s'}}
          />
        ))}
      </div>
    </div>
  );
} 