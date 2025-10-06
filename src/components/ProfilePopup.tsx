"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/ProfileContext';

export default function ProfilePopup() {
  const { getItemCount } = useCart();
  const { user, showProfilePopup, setShowProfilePopup } = useProfile();
  const router = useRouter();

  if (!showProfilePopup || !user) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={() => setShowProfilePopup(false)}
    >
      <div
        className="profile-popup"
        style={{
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '2rem',
          padding: '3rem',
          maxWidth: '450px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowProfilePopup(false)}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: '#ffffff',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {user.icon ? (
            <Image src={user.icon} alt="Profile Icon" width={100} height={100} style={{ 
              borderRadius: '50%', 
              background: 'rgba(255,255,255,0.1)', 
              border: '3px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              margin: '0 auto 1.5rem auto'
            }} />
          ) : (
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '3px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              fontSize: '2.5rem',
              color: '#ffffff',
              fontWeight: 700,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : ''}
            </div>
          )}
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '0.8rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {user.name}
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            {user.role ? (
              <span style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                padding: '0.4rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {user.role}
              </span>
            ) : (
              <>
                <span style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  padding: '0.4rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Traveler
                </span>
                <span style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  padding: '0.4rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Explorer
                </span>
                <span style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  padding: '0.4rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  Devotee
                </span>
              </>
            )}
          </div>
        </div>

        {/* User Details */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#7A6B57',
            marginBottom: '1rem',
            borderBottom: '2px solid #E2B89B',
            paddingBottom: '0.5rem'
          }}>
            Account Details
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.8rem',
              border: '1px solid #E2B89B'
            }}>
              <span style={{ fontWeight: 600, color: '#7A6B57' }}>Full Name:</span>
              <span style={{ color: '#666' }}>{user.name}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.8rem',
              border: '1px solid #E2B89B'
            }}>
              <span style={{ fontWeight: 600, color: '#7A6B57' }}>Email:</span>
              <span style={{ color: '#666' }}>{user.email || 'user@example.com'}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.8rem',
              border: '1px solid #E2B89B'
            }}>
              <span style={{ fontWeight: 600, color: '#7A6B57' }}>Phone:</span>
              <span style={{ color: '#666' }}>{user.mobile || '+91 98765 43210'}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '0.8rem',
              border: '1px solid #E2B89B'
            }}>
              <span style={{ fontWeight: 600, color: '#7A6B57' }}>Member Since:</span>
              <span style={{ color: '#666' }}>2024</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1.5rem',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            Stats
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{
              textAlign: 'center',
              padding: '1.2rem 0.8rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>25</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.9 }}>Age</div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.2rem 0.8rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>{getItemCount()}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.9 }}>Bookings</div>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '1.2rem 0.8rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>{getItemCount()}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.9 }}>Cards</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => {
              setShowProfilePopup(false);
              router.push('/edit-profile');
            }}
            style={{
              flex: 1,
              padding: '1.2rem',
              borderRadius: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("tnt_user");
              window.location.reload();
              setShowProfilePopup(false);
            }}
            style={{
              flex: 1,
              padding: '1.2rem',
              borderRadius: '1.5rem',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .profile-popup::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
