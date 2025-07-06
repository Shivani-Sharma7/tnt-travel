"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// List your gallery items (images and videos)
const galleryItems = [
  { type: "image", src: "/gallary/1.jpg", alt: "Gallery 1" },
  { type: "image", src: "/gallary/2.jpg", alt: "Gallery 2" },
  { type: "image", src: "/gallary/3.jpg", alt: "Gallery 3" },
  { type: "image", src: "/gallary/4.jpg", alt: "Gallery 4" },
  { type: "image", src: "/gallary/5.jpg", alt: "Gallery 5" },
  { type: "image", src: "/gallary/6.jpg", alt: "Gallery 6" },
  { type: "video", src: "/gallary/1.mp4", poster: "/gallary/1.jpg", alt: "Video 1" },
  { type: "video", src: "/gallary/2.mp4", poster: "/gallary/2.jpg", alt: "Video 2" },
  { type: "video", src: "/gallary/3.mp4", poster: "/gallary/3.jpg", alt: "Video 3" },
  { type: "video", src: "/gallary/4.mp4", poster: "/gallary/4.jpg", alt: "Video 4" },
  { type: "video", src: "/gallary/5.mp4", poster: "/gallary/5.jpg", alt: "Video 5" },
  { type: "video", src: "/gallary/6.mp4", poster: "/gallary/6.jpg", alt: "Video 6" },
];

export default function GallerySection() {
  const [mounted, setMounted] = useState(false);
  // Render a deterministic set for SSR
  const [items, setItems] = useState(galleryItems.slice(0, 7));
  const [hoveredIdx, setHoveredIdx] = useState<number|null>(null);
  const mainRef = useRef<HTMLVideoElement|null>(null);
  const gridRefs = useRef<(HTMLVideoElement|null)[]>([]);
  const router = useRouter();
  const [planeHovered, setPlaneHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    function getRandomItems(arr: any[], n: number) {
      const shuffled = arr.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    }
    setItems(getRandomItems(galleryItems, 7));
  }, [mounted]);

  // Handle video play/pause on hover
  useEffect(() => {
    if (!mounted) return;
    
    if (hoveredIdx === null) {
      if (mainRef.current) mainRef.current.pause();
      gridRefs.current.forEach(v => v && v.pause());
    } else {
      if (hoveredIdx === 0 && mainRef.current) {
        mainRef.current.muted = true;
        mainRef.current.play();
      } else if (hoveredIdx > 0 && gridRefs.current[hoveredIdx-1]) {
        gridRefs.current[hoveredIdx-1]!.muted = true;
        gridRefs.current[hoveredIdx-1]!.play();
      }
    }
  }, [hoveredIdx, mounted]);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <section style={{maxWidth:'1400px',margin:'0 auto 2rem auto',padding:'0 3vw',display:'flex',gap:'2rem',minHeight:480,position:'relative'}}>
        <div style={{flex:'1 1 55%',minWidth:320,display:'flex',alignItems:'stretch'}}>
          <div style={{width:'95%',height:'405px',overflow:'hidden',borderRadius:'2rem',boxShadow:'0 2px 16px rgba(0,0,0,0.08)',background:'#f0f0f0'}} />
        </div>
        <div style={{flex:'1 1 50%',display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'repeat(3, 1fr)',gap:'1.5rem',minWidth:320}}>
          {Array(6).fill(0).map((_, i) => (
            <div key={i} style={{width:'100%',height:'195px',overflow:'hidden',borderRadius:'1.5rem',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',background:'#f0f0f0'}} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{maxWidth:'1400px',margin:'0 auto 2rem auto',padding:'0 3vw',display:'flex',gap:'2rem',minHeight:480,position:'relative'}}>
      {/* Airplane image at top left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
          transform: planeHovered ? 'scale(1.2)' : 'scale(1)',
        }}
        onMouseEnter={() => setPlaneHovered(true)}
        onMouseLeave={() => setPlaneHovered(false)}
      >
        <Image src="/elements/airplain.png" alt="Airplane" width={90} height={90} style={{display:'block',width:'90px',height:'90px'}} />
      </div>
      {/* Left: Main Item (landscape) */}
      <div style={{flex:'1 1 55%',minWidth:320,display:'flex',alignItems:'stretch'}}>
        <div
          style={{
            width:'95%',
            height:'405px',
            overflow:'hidden',
            borderRadius:'2rem',
            boxShadow:'0 2px 16px rgba(0,0,0,0.08)',
            transition:'transform 0.3s',
            transform: hoveredIdx === 0 ? 'scale(1.2)' : hoveredIdx !== null ? 'scale(0.85)' : 'scale(1)'
          }}
          onMouseEnter={() => setHoveredIdx(0)}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {items[0].type === 'image' ? (
            <img src={items[0].src} alt={items[0].alt} style={{width:'100%',height:'100%',objectFit:'cover'}} />
          ) : (
            <video
              ref={mainRef}
              src={items[0].src}
              poster={items[0].poster}
              muted
              style={{width:'100%',height:'100%',objectFit:'cover',background:'#000',borderRadius:'2rem'}}
            />
          )}
        </div>
      </div>
      {/* Right: Grid with portrait and landscape */}
      <div style={{flex:'1 1 50%',display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'repeat(3, 1fr)',gap:'1.5rem',minWidth:320}}>
        {items.slice(1).map((item, idx) => (
          <div
            key={item.src}
            style={{
              position:'relative',
              width:'100%',
              height:'195px',
              overflow:'hidden',
              borderRadius:'1.5rem',
              boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
              transition:'transform 0.3s',
              transform: hoveredIdx === idx+1 ? 'scale(1.2)' : hoveredIdx !== null ? 'scale(0.85)' : 'scale(1)',
              zIndex: hoveredIdx === idx+1 ? 2 : 1
            }}
            onMouseEnter={() => setHoveredIdx(idx+1)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            ) : (
              <video
                ref={el => { gridRefs.current[idx] = el; }}
                src={item.src}
                poster={item.poster}
                muted
                style={{width:'100%',height:'100%',objectFit:'cover',background:'#000',borderRadius:'1.5rem'}}
              />
            )}
            {/* Example overlay for the third item */}
            {idx === 2 && (
              <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'rgba(255,255,255,0.25)',borderRadius:'1.5rem',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1.2rem'}}>
                <button onClick={() => router.push('/gallery')} style={{background:'rgba(255,255,255,0.50)',color:'#fff',fontWeight:700,fontSize:'1.1rem',padding:'0.7rem 2.2rem',borderRadius:'0.7rem',border:'none',cursor:'pointer'}}>Watch More</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 