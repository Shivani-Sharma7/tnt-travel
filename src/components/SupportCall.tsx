'use client';
import React, { useState } from 'react';

export default function SupportCall({ phone = '+917037753106' }: { phone?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="support-call-info"
        onClick={() => setOpen(true)}
        style={{
          position: 'absolute',
          right: '-10px',
          top: '-10px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: 'none',
          background: '#ffffff',
          color: '#1e6f5c',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          fontWeight: 800,
          transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 22px rgba(0,0,0,0.18)';
          (e.currentTarget as HTMLButtonElement).style.background = '#f2fbf8';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
          (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
        }}
      >
        📞
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4000,
            transition: 'background 200ms ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '0.9rem',
              padding: '1.2rem 1.4rem',
              boxShadow: '0 14px 40px rgba(0,0,0,0.18)',
              minWidth: 300,
              color: '#1a2a3a',
              transform: 'translateY(0)',
              animation: 'sc-fade-in 220ms ease',
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 6, display:'flex', alignItems:'center', gap:8 }}>
              <span>Need Help?</span>
            </div>
            <div style={{ color: '#444', lineHeight: 1.6, marginBottom: '0.8rem' }}>Our support team is available 24/7.</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
              <a
                href={`tel:${phone}`}
                onClick={() => setOpen(false)}
                style={{
                  background: '#1e6f5c',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  borderRadius: 8,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(30,111,92,0.25)',
                  textDecoration: 'none',
                }}
              >
                Call Now
              </a>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: '#eaeaea',
                  color: '#1a2a3a',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
            <style>{`
              @keyframes sc-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
}


