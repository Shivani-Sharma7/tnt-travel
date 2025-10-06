"use client";
import React, { useState } from "react";
import { FaInfoCircle } from 'react-icons/fa';
import Footer from '../../components/Footer';

const activities = [
  {
    title: "Pottery",
    image: "/activity/pottery.jpg",
    location: "Gokul",
  },
  {
    title: "Boating",
    image: "/activity/boating1.jpg",
    location: "Mathura & Vrindavan",
  },
  {
    title: "Darshan",
    image: "/activity/premanandji.jpg",
    location: "vrindavan",
  },
  {
    title: "Fun Ride",
    image: "/activity/gaintwheel.jpg",
    location: "Vrindavan",
  },
];

export default function ActivitiesPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [popupActivity, setPopupActivity] = useState<any | null>(null);
  return (
    <>
      <main style={{
        background:'#faf7f2',
        padding:'3rem 3vw',
        maxWidth:'calc(100% - 20px)',
        margin:'0 10px 2rem 10px',
        borderRadius:'2rem'
      }}>
        <h1 style={{textAlign:'center',fontSize:'2.5rem',fontWeight:800,color:'#8B5C3C',marginBottom:'1.2rem',fontFamily:'serif',marginTop:'80px'}}>All Activities</h1>
        <h2 style={{textAlign:'left',fontSize:'1.4rem',fontWeight:600,color:'#7A6B57',marginBottom:'2.5rem',fontFamily:'serif',letterSpacing:'0.01em'}}>Included in all packages</h2>
        <div style={{display:'flex',gap:'2rem',justifyContent:'center',flexWrap:'wrap'}}>
          {activities.map((activity, idx) => (
            <div
              key={activity.title + idx}
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
              {/* Info Button */}
              <button
                onClick={e => { e.stopPropagation(); setPopupActivity(activity); }}
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  fontSize: 22,
                  color: '#7A6B57',
                  transition: 'color 0.2s',
                }}
                title={`More info about ${activity.title}`}
              >
                <FaInfoCircle />
              </button>
              <img src={activity.image} alt={activity.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'filter 0.3s',filter: hovered === idx ? 'brightness(1)' : 'brightness(0.85)'}} />
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem 1rem 1rem 1rem',background:'linear-gradient(0deg,rgba(0,0,0,0.7) 60%,rgba(0,0,0,0.0) 100%)'}}>
                <div style={{fontWeight:700,fontSize:'1.4rem',color:'#fff',fontFamily:'serif'}}>{activity.title}</div>
                <div style={{fontWeight:500,fontSize:'1.1rem',color:'#ffe',fontFamily:'serif',marginTop:'0.5rem'}}>{activity.location}</div>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{textAlign:'left',fontSize:'1.4rem',fontWeight:600,color:'#7A6B57',margin:'2.5rem 0 1.5rem 0',fontFamily:'serif',letterSpacing:'0.01em'}}>Extra Activities</h2>
        <div style={{display:'flex',gap:'2rem',justifyContent:'center',flexWrap:'wrap'}}>
          {[
            { title: "Photoshoot", image: "/activity/yamuna2.jpg", location: "Mathura" },
            { title: "Arti Experience", image: "/activity/arti2 (3).jpg", location: "Mathura" },
            
          ].map((activity, idx) => (
            <div
              key={activity.title + idx}
              onMouseEnter={() => setHovered(100 + idx)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position:'relative',
                width: hovered === 100 + idx ? 400 : 240,
                height: 380,
                borderRadius:'2rem',
                overflow:'hidden',
                boxShadow:'0 2px 16px rgba(0,0,0,0.08)',
                background:'#eee',
                transition:'width 0.4s cubic-bezier(.4,2,.6,1), box-shadow 0.3s',
                cursor:'pointer',
                flexShrink: 0,
                zIndex: hovered === 100 + idx ? 2 : 1,
              }}
            >
              {/* Info Button */}
              <button
                onClick={e => { e.stopPropagation(); setPopupActivity(activity); }}
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 18,
                  background: 'none',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  fontSize: 22,
                  color: '#7A6B57',
                  transition: 'color 0.2s',
                }}
                title={`More info about ${activity.title}`}
              >
                <FaInfoCircle />
              </button>
              <img src={activity.image} alt={activity.title} style={{width:'100%',height:'100%',objectFit:'cover',transition:'filter 0.3s',filter: hovered === 100 + idx ? 'brightness(1)' : 'brightness(0.85)'}} />
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'1.5rem 1rem 1rem 1rem',background:'linear-gradient(0deg,rgba(0,0,0,0.7) 60%,rgba(0,0,0,0.0) 100%)'}}>
                <div style={{fontWeight:700,fontSize:'1.4rem',color:'#fff',fontFamily:'serif'}}>{activity.title}</div>
                <div style={{fontWeight:500,fontSize:'1.1rem',color:'#ffe',fontFamily:'serif',marginTop:'0.5rem'}}>{activity.location}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Popup Modal */}
        {popupActivity && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.35)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setPopupActivity(null)}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                maxWidth: 400,
                width: '90vw',
                boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
                position: 'relative',
                textAlign: 'center',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setPopupActivity(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'none',
                  border: 'none',
                  fontSize: 28,
                  color: '#888',
                  cursor: 'pointer',
                }}
                aria-label="Close"
              >
                ×
              </button>
              <img src={popupActivity.image} alt={popupActivity.title} style={{width:'100%',height:180,objectFit:'cover',borderRadius:'1rem',marginBottom:'1.2rem'}} />
              <h2 style={{fontSize:'2rem',fontWeight:800,color:'#7A6B57',marginBottom:'0.5rem'}}>{popupActivity.title}</h2>
              <div style={{color:'#A67B5B',fontWeight:600,fontSize:'1.1rem',marginBottom:'1.2rem'}}>{popupActivity.location}</div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 