"use client";

import React, { useState } from "react";

const galleryItems = [
  { type: "image", src: "/gallary/b737b9a5be89153ff2ba00b41529b007.jpg", title: "Wedding Couple" },
  { type: "image", src: "/gallary/e6e9b9fdfeff9f7df592ca9e6536c21b.jpg", title: "Floral Bride" },
  { type: "image", src: "/gallary/ed970f7997ffab10b0b96cfb6b1e6bd9.jpg", title: "Night Bride" },
  { type: "image", src: "/gallary/ff62c4c95619babf96083fd0448a3f11.jpg", title: "Bridal Portrait" },
  { type: "image", src: "/gallary/87a6b9326df49157d500f18933bcc6ae.jpg", title: "Wedding Lights" },
  { type: "image", src: "/gallary/3ca59bddd9d0ec09d34355767fd73056.jpg", title: "Bride Closeup" },
  { type: "image", src: "/gallary/DSC_0809.JPG", title: "Outdoor Bride" },
  { type: "video", src: "/gallary/6f4489eb8a925c8d33e12b824bbe2a67_720w.mp4", title: "Wedding Video" },
];

export default function GalleryPage() {
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  return (
    <main style={{ background: '#f5f5f7', minHeight: '100vh', padding: 0, margin: 0 }}>
      {/* Heading */}
      <div style={{
        width: '100%',
        background: 'linear-gradient(90deg, #f8e7d2 0%, #e0c3fc 100%)',
        padding: '6rem 0 1.5rem 0',
        textAlign: 'center',
        boxShadow: '0 4px 24px rgba(160, 120, 200, 0.10)',
        borderBottomLeftRadius: '3rem',
        borderBottomRightRadius: '3rem',
      }}>
        <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 700, fontSize: '4rem', letterSpacing: '2px', color: '#222' }}>Photography</span>
        <div style={{ color: '#888', fontSize: '1.2rem', marginTop: 8 }}>A collection of our most beautiful moments</div>
      </div>
      {/* Masonry Grid */}
      <div style={{
        columnCount: 4,
        columnGap: '1rem',
        maxWidth: 1100,
        margin: '1.5rem auto',
        padding: '0 0.5rem',
      }}>
        {galleryItems.map((item, idx) => (
          <div
            key={item.src}
            style={{
              breakInside: 'avoid',
              marginBottom: '1.5rem',
              borderRadius: '1.2rem',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              position: 'relative',
              cursor: 'pointer',
              background: '#fff',
              transition: 'box-shadow 0.2s',
            }}
            onClick={() => setModalIdx(idx)}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.title}
                style={{ width: '100%', display: 'block', transition: 'transform 0.3s', objectFit: 'cover' }}
              />
            ) : (
              <video
                src={item.src}
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                muted
                loop
                playsInline
                onMouseOver={e => (e.currentTarget as HTMLVideoElement).play()}
                onMouseOut={e => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
              />
            )}
            {/* Floating Caption */}
            <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(0deg,rgba(0,0,0,0.65) 80%,rgba(0,0,0,0.0) 100%)',
              color: '#fff',
              padding: '1.1rem 1.2rem 0.7rem 1.2rem',
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '0.5px',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span>{item.title}</span>
              {item.type === 'video' && <span style={{ fontSize: 22, marginLeft: 8 }}>▶️</span>}
            </div>
          </div>
        ))}
      </div>
      {/* Lightbox Modal */}
      {modalIdx !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setModalIdx(null)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              maxWidth: 500,
              width: '90vw',
              boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
              position: 'relative',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalIdx(null)}
              style={{
                position: 'absolute',
                top: 12,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: 32,
                color: '#888',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ×
            </button>
            {galleryItems[modalIdx].type === 'image' ? (
              <img src={galleryItems[modalIdx].src} alt={galleryItems[modalIdx].title} style={{ width: '100%', borderRadius: '1rem', marginBottom: '1rem' }} />
            ) : (
              <video src={galleryItems[modalIdx].src} style={{ width: '100%', borderRadius: '1rem', marginBottom: '1rem' }} controls autoPlay />
            )}
            <div style={{ fontWeight: 700, fontSize: '1.3rem', color: '#7A6B57', marginTop: 8 }}>{galleryItems[modalIdx].title}</div>
          </div>
        </div>
      )}
    </main>
  );
} 