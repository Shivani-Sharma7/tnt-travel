"use client";

import React, { useState } from "react";

const galleryItems = [
  { type: "image", src: "/gallary/b737b9a5be89153ff2ba00b41529b007.jpg", shape: "landscape", title: "Manila City", place: "30 Place" },
  { type: "image", src: "/gallary/e6e9b9fdfeff9f7df592ca9e6536c21b.jpg", shape: "portrait", title: "Turkey", place: "10 Place" },
  { type: "image", src: "/gallary/ed970f7997ffab10b0b96cfb6b1e6bd9.jpg", shape: "landscape", title: "Los Angeles", place: "14 Place" },
  { type: "image", src: "/gallary/ff62c4c95619babf96083fd0448a3f11.jpg", shape: "portrait", title: "Vietnam", place: "8 Place" },
  { type: "image", src: "/gallary/87a6b9326df49157d500f18933bcc6ae.jpg", shape: "landscape", title: "China Tours", place: "12 Place" },
  { type: "image", src: "/gallary/3ca59bddd9d0ec09d34355767fd73056.jpg", shape: "portrait", title: "Germany", place: "9 Place" },
  { type: "image", src: "/gallary/DSC_0809.JPG", shape: "landscape", title: "Thailand", place: "16 Place" },
  { type: "video", src: "/gallary/c01dd2c36e88bbe3f75855930126b1ba.mp4", shape: "portrait", title: "Adventure", place: "5 Place" },
  { type: "video", src: "/gallary/8fd6ece89fcd44078ba3df0fcfa0f4d9.mp4", shape: "landscape", title: "Safari", place: "7 Place" },
  { type: "video", src: "/gallary/767f11e02b2e6787809c473b2b30fd51.mp4", shape: "portrait", title: "Beach", place: "6 Place" },
  { type: "video", src: "/gallary/6f4489eb8a925c8d33e12b824bbe2a67_720w.mp4", shape: "landscape", title: "Mountains", place: "11 Place" },
  { type: "video", src: "/gallary/3ca0536d08eb76aaf2de48cf8b6b40c2_720w.mp4", shape: "portrait", title: "City Life", place: "13 Place" },
  { type: "video", src: "/gallary/a0feb3fe182875ac3b916bbcb88ebd44_720w.mp4", shape: "landscape", title: "Desert", place: "4 Place" },
];

function getTitleFromFilename(filename: string) {
  // Remove extension and underscores, capitalize words
  return filename
    .replace(/^.*[\\\/]/, "")
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function GalleryPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main style={{ padding: 0, margin: 0 }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100vw',
        minHeight: '300px',
        background: 'url(/elements/gallarybg.jpg) center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
        borderRadius: '0 0 10rem 0rem',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(35, 48, 60, 0.55)',
          zIndex: 1
        }} />
        {/* Decorative orange accent */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '75%',
          height: '35px',
          background: '#f29927',
          clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)',
          zIndex: 2
        }} />
        <div style={{
          position: 'relative',
          zIndex: 3,
          color: '#fff',
          textAlign: 'center',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.2rem', fontFamily: 'serif' }}>Gallery</h1>
          <div style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            <span style={{ color: '#fff' }}>Home</span>
            <span style={{ color: '#f29927', margin: '0 0.7em' }}> // </span>
            <span style={{ color: '#f29927' }}>Gallery</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        padding: '3rem 2vw',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {galleryItems.map((item, idx) => {
          const aspectRatio = item.shape === 'portrait' ? '3/4' : '4/3';
          return (
            <div
              key={item.src}
              style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
                minHeight: 240,
                minWidth: 0,
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
                transform: hovered === idx ? 'scale(1.07)' : hovered === null ? 'scale(1)' : 'scale(0.95)',
                zIndex: hovered === idx ? 2 : 1,
                aspectRatio,
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    aspectRatio,
                    transition: 'filter 0.3s',
                    filter: hovered === idx ? 'brightness(1.05)' : 'brightness(0.95)',
                  }}
                />
              ) : (
                <video
                  src={item.src}
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    aspectRatio,
                    transition: 'filter 0.3s',
                    filter: hovered === idx ? 'brightness(1.05)' : 'brightness(0.95)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLVideoElement).play(); }}
                  onMouseLeave={e => { (e.currentTarget as HTMLVideoElement).pause(); e.currentTarget.currentTime = 0; }}
                  controls={false}
                />
              )}
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                padding: '1.2rem 1.2rem 1.1rem 1.2rem',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.1) 100%)',
                color: '#fff',
                fontWeight: 700,
                fontFamily: 'serif',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                minHeight: '5.5rem',
              }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.3rem', lineHeight: 1 }}>{item.title}</span>
                <span style={{ color: '#f29927', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.5px' }}>{item.place}</span>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
} 