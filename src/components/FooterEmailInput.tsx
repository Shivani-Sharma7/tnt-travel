'use client';
import React, { useState, useEffect } from 'react';

export default function FooterEmailInput() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        background:'#46622a',
        borderRadius:'12px',
        padding:'1rem 1.2rem',
        width:'100%',
        maxWidth:'340px',
        fontSize:'1.1rem',
        marginBottom:'1.2rem',
        boxShadow:'0 2px 8px #46622a40',
        height:'3.5rem'
      }} />
    );
  }

  return (
    <input 
      type="email" 
      placeholder="Enter Email Address" 
      style={{
        background:'#46622a',
        border:'none',
        borderRadius:'12px',
        padding:'1rem 1.2rem',
        color:'#fff',
        width:'100%',
        maxWidth:'340px',
        fontSize:'1.1rem',
        marginBottom:'1.2rem',
        boxShadow:'0 2px 8px #46622a40'
      }} 
    />
  );
} 