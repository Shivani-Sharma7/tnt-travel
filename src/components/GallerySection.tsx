"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// List your gallery items (images and videos)
const galleryItems = [
  { type: "image", src: "/gallary/boating2.jpg", alt: "Boating Experience" },
  { type: "image", src: "/gallary/ff62c4c95619babf96083fd0448a3f11.jpg", alt: "Spiritual Journey" },
  { type: "image", src: "/gallary/3ca59bddd9d0ec09d34355767fd73056.jpg", alt: "Temple Visit" },
  { type: "image", src: "/gallary/e6e9b9fdfeff9f7df592ca9e6536c21b.jpg", alt: "Cultural Experience" },
  { type: "image", src: "/gallary/87a6b9326df49157d500f18933bcc6ae.jpg", alt: "Heritage Tour" },
  { type: "image", src: "/gallary/ed970f7997ffab10b0b96cfb6b1e6bd9.jpg", alt: "Sacred Places" },
  { type: "image", src: "/activity/ghat.jpg", alt: "River Ghat" },
  { type: "image", src: "/activity/guru.jpg", alt: "Spiritual Guide" },
  { type: "image", src: "/activity/boating1.jpg", alt: "River Boating" },
  { type: "image", src: "/activity/hutstay.jpg", alt: "Traditional Stay" },
  { type: "image", src: "/activity/mudstay.jpg", alt: "Eco Stay" },
  { type: "image", src: "/activity/pottery.jpg", alt: "Pottery Making" },
  { type: "image", src: "/activity/pottery2.jpg", alt: "Traditional Crafts" },
  { type: "image", src: "/activity/gaintwheel.jpg", alt: "Local Attractions" },
  { type: "image", src: "/activity/hotels.jpg", alt: "Comfortable Stays" },
  { type: "image", src: "/activity/hotel.jpg", alt: "Hotel Experience" },
  { type: "image", src: "/activity/taxi.jpg", alt: "Transportation" },
  { type: "image", src: "/activity/rental.jpg", alt: "Vehicle Rental" },
  { type: "image", src: "/activity/india.jpg", alt: "Indian Culture" },
  { type: "image", src: "/activity/yamuna.jpg", alt: "Yamuna River" },
  { type: "image", src: "/activity/yamuna2.jpg", alt: "River Views" },
  { type: "image", src: "/activity/heroo.jpg", alt: "Hero Experience" },
  { type: "image", src: "/activity/heroo1.jpg", alt: "Adventure Tour" },
  { type: "image", src: "/activity/heroo3.jpg", alt: "Travel Memories" },
  { type: "image", src: "/activity/arti2 (3).jpg", alt: "Aarti Ceremony" },
  { type: "image", src: "/activity/divine_darshan.jpg", alt: "Divine Darshan" },
  { type: "image", src: "/gallary/b737b9a5be89153ff2ba00b41529b007.jpg", alt: "Gallery Experience" },
  { type: "image", src: "/gallary/DSC_0809.JPG", alt: "Photography" },
  { type: "video", src: "/gallary/arti.mp4", poster: "/gallary/arti.jpg", alt: "Aarti Video" },
  { type: "video", src: "/gallary/3ca0536d08eb76aaf2de48cf8b6b40c2_720w.mp4", poster: "/gallary/3ca59bddd9d0ec09d34355767fd73056.jpg", alt: "Temple Video" },
  { type: "video", src: "/gallary/6f4489eb8a925c8d33e12b824bbe2a67_720w.mp4", poster: "/gallary/e6e9b9fdfeff9f7df592ca9e6536c21b.jpg", alt: "Cultural Video" },
  { type: "video", src: "/gallary/a0feb3fe182875ac3b916bbcb88ebd44_720w.mp4", poster: "/gallary/87a6b9326df49157d500f18933bcc6ae.jpg", alt: "Heritage Video" },
  { type: "video", src: "/gallary/c01dd2c36e88bbe3f75855930126b1ba.mp4", poster: "/gallary/ed970f7997ffab10b0b96cfb6b1e6bd9.jpg", alt: "Sacred Video" },
  { type: "video", src: "/gallary/767f11e02b2e6787809c473b2b30fd51.mp4", poster: "/gallary/boating2.jpg", alt: "Boating Video" },
  { type: "video", src: "/gallary/8fd6ece89fcd44078ba3df0fcfa0f4d9.mp4", poster: "/activity/boating1.jpg", alt: "River Video" },
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
      <section style={{maxWidth:'1400px',margin:'0 auto 2rem auto',padding:'0 2rem',display:'flex',gap:'2rem',minHeight:480,position:'relative'}}>
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
    <section style={{maxWidth:'1400px',margin:'0 auto 2rem auto',padding:'0 2rem',display:'flex',gap:'2rem',minHeight:480,position:'relative'}}>
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
                <button onClick={() => router.push('/gallery')} style={{background:'rgba(255,255,255,0.50)',color:'#fff',fontWeight:700,fontSize:'1.1rem',padding:'0.7rem 2.2rem',borderRadius:'0.7rem',border:'none',cursor:'pointer',fontFamily:'Poppins, sans-serif'}}>Watch More</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 