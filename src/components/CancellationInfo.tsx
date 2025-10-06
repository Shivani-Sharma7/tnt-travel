'use client';
import React, { useState } from 'react';

export default function CancellationInfo({ positionStyles }: { positionStyles?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="cancellation-info"
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
          color: '#a67b5b',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          cursor: 'pointer',
          fontWeight: 800,
          transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease',
          ...positionStyles,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 22px rgba(0,0,0,0.18)';
          (e.currentTarget as HTMLButtonElement).style.background = '#f7f3ee';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
          (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
        }}
      >
        i
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
              padding: '1rem 1.2rem',
              boxShadow: '0 14px 40px rgba(0,0,0,0.18)',
              minWidth: 280,
              color: '#1a2a3a',
              transform: 'translateY(0)',
              animation: 'ci-fade-in 220ms ease',
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Free Cancellation Policy</div>
            <div style={{ color: '#444', lineHeight: 1.6 }}>Cancellation before 24 hours</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  marginTop: '0.8rem',
                  background: '#1e6f5c',
                  color: '#fff',
                  border: 'none',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(30,111,92,0.25)',
                  transition: 'transform 160ms ease, box-shadow 160ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 18px rgba(30,111,92,0.32)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(30,111,92,0.25)';
                }}
              >
                Close
              </button>
            </div>
            <style>{`
              @keyframes ci-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
}


