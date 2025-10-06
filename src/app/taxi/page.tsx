'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCarSide, FaSuitcaseRolling, FaClock, FaDotCircle, FaSyncAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { mockCabs, cardStyle } from './cabData';
import CabImageCarousel from './CabImageCarousel';
import TripCards from '../../components/TripCards';
import Footer from '../../components/Footer';

export default function TaxiPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'Trip'|'Ride'>('Trip');
  const [mounted, setMounted] = useState(false);

  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <>
        <main style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e9e4df 0%, #f5f3ef 100%)',
          padding: '3vw 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            maxWidth: 1200,
            width: '95%',
            background: '#fff',
            borderRadius: '2.5rem',
            boxShadow: '0 8px 32px rgba(60,40,20,0.10)',
            padding: '3rem 2rem 2rem 2rem',
            margin: '2rem 0 0 0',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{textAlign: 'center', padding: '2rem'}}>
              <div style={{fontSize: '1.2rem', color: '#666'}}>Loading...</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e9e4df 0%, #f5f3ef 100%)',
        padding: '3vw 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 'calc(100% - 20px)',
          width: 'calc(100% - 20px)',
          margin: '0 10px',
          background: '#fff',
          boxShadow: '0 8px 32px rgba(60,40,20,0.10)',
          padding: '3rem 2rem 0.5rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}>

          {/* Tabs */}
            <div style={{
              display: 'flex',
            gap: '1.5rem',
            fontWeight: 700,
            fontSize: '1.15rem',
            padding: '1rem 0 0 3rem',
            justifyContent: 'center'
          }}>
            {(['Trip', 'Ride'] as const).map(t => (
              <div
                key={t}
                onClick={() => setTab(t)}
                style={{
                  cursor: 'pointer',
                  borderBottom: tab === t ? '3px solid #111' : 'none',
                  color: tab === t ? '#111' : '#888',
                  paddingBottom: 6,
                  transition: 'color 0.2s, border 0.2s',
                  minWidth: 110,
                  textAlign: 'center',
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Content Section */}
          <section style={{padding: '0.5rem 0'}}>
            {/* Trip Section */}
            {tab === 'Trip' && (
              <div style={{
                background: '#1a2a3a',
                margin: '0 -2rem',
                padding: '2rem 2rem',
                borderRadius: '2rem',
                marginTop: '0.5rem'
              }}>
                <TripCards />
              </div>
            )}

            {/* Ride Section */}
            {tab === 'Ride' && (
                <div style={{
                  textAlign: 'center',
                padding: '4rem 2rem'
                }}>
                  <h3 style={{
                  fontSize: '1.5rem',
                    fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#1a2a3a'
                  }}>
                �� Daily Cab Service
                </h3>
                <p style={{
                  fontSize: '1rem',
                color: '#666',
                marginBottom: '2rem',
                maxWidth: '500px',
                margin: '0 auto 2rem auto'
              }}>
                Book a cab for your daily transportation needs. Coming soon with advanced booking features!
              </p>
                <div style={{
                background: '#f8f9fa',
                padding: '2rem',
                borderRadius: '1rem',
                border: '2px dashed #ddd'
              }}>
                        <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  🚧
                        </div>
                        <div style={{
                              fontSize: '1.1rem',
                              fontWeight: 600,
                                               color: '#666'
                                             }}>
                  Advanced booking features coming soon!
                                             </div>
                                           </div>
                                         </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}