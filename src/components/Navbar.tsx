"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { name: "Our Service", href: "/#our-services" },
  { name: "About Us", href: "/#about-us" },
  { name: "Gallery", href: "/gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email?: string; mobile?: string } | null>(null);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), null]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { getItemCount } = useCart();

  const dateLabel = dateRange[0] && dateRange[1]
    ? `${dateRange[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${dateRange[1].toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
    : 'Select Dates';

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tnt_user");
      if (stored) setUser(JSON.parse(stored));
      else setUser(null);
    }
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("tnt_user");
    setUser(null);
    window.location.reload();
  }

  // Hotels, Taxi, and Customize Trip page minimal navbar
  if (pathname === "/hotels" || pathname === "/taxi" || pathname === "/customize-trip") {
    return (
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.88rem 2.2rem',
        background: 'linear-gradient(90deg, #A67B5B 70%, #d48166 100%)',
        borderRadius: '1.5rem',
        margin: '1.5rem auto 2.5rem auto',
        maxWidth: '1200px',
        boxShadow: '0 4px 24px rgba(166,123,91,0.10)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(6px)',
        border: '1.5px solid #e6e6e6',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
          <Image src="/elements/logo.png" alt="TnT Logo" width={44} height={44} style={{borderRadius:'1rem',background:'#fff',padding:'0.2rem'}} />
          <span style={{fontWeight:'bold',fontSize:'1.7rem',color:'#fff',letterSpacing:'-1px',fontFamily:'serif'}}>TnT Travels</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'1.5rem'}}>
          <Link href="/" style={{color:'#fff',fontWeight:700,fontSize:'1.1rem'}}>Home</Link>
          <Link href="/cart" style={{position:'relative',color:'#fff',fontSize:'1.2rem'}}>
            <FaShoppingCart />
            {getItemCount() > 0 && (
              <span style={{
                position:'absolute',
                top:'-8px',
                right:'-8px',
                background:'#f29927',
                color:'#fff',
                borderRadius:'50%',
                width:'18px',
                height:'18px',
                fontSize:'0.7rem',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                fontWeight:700
              }}>
                {getItemCount()}
              </span>
            )}
          </Link>
        </div>
      </nav>
    );
  }

  // Conditionally add Home link if not on home page
  const linksToShow = pathname !== "/" ? [{ name: "Home", href: "/" }, ...navLinks] : navLinks;
  return (
    <nav style={{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      padding:'0.96rem 2.2rem',
      background:'linear-gradient(90deg, #5C3D2E 60%, #f29927 100%)',
      borderRadius:'1.5rem',
      margin:'1.5rem auto 2.5rem auto',
      maxWidth:'1200px',
      boxShadow:'0 4px 24px rgba(34,49,63,0.10)',
      position:'sticky',
      top:0,
      zIndex:1000,
      backdropFilter:'brown(5px)'
    }}>
      <div style={{display:'flex',alignItems:'center',gap:'0.7rem'}}>
        <Image src="/elements/logo.png" alt="TnT Logo" width={44} height={44} style={{borderRadius:'1rem',background:'#fff',padding:'0.2rem'}} />
        <span style={{fontWeight:'bold',fontSize:'1.7rem',color:'#fff',letterSpacing:'-1px',fontFamily:'serif'}}>TnT Travels</span>
      </div>
      {/* Hamburger for mobile */}
      <button
        onClick={() => setMenuOpen(v => !v)}
        style={{
          display:'none',
          background:'none',
          border:'none',
          cursor:'pointer',
          padding:8,
          marginLeft:8,
        }}
        aria-label="Open navigation menu"
        className="tnt-hamburger"
      >
        <span style={{display:'block',width:28,height:3,background:'#fff',margin:'6px 0',borderRadius:2}}></span>
        <span style={{display:'block',width:28,height:3,background:'#fff',margin:'6px 0',borderRadius:2}}></span>
        <span style={{display:'block',width:28,height:3,background:'#fff',margin:'6px 0',borderRadius:2}}></span>
      </button>
      {/* Nav links */}
      <div
        style={{
          display:'flex',
          gap:'2.2rem',
          alignItems:'center',
          fontSize:'1.13rem',
        }}
        className="tnt-navlinks"
      >
        {linksToShow.map(link => (
          <Link
            key={link.name}
            href={link.href}
            style={{
              color: pathname === link.href ? '#f29927' : '#fff',
              textDecoration:'none',
              fontWeight: pathname === link.href ? 700 : 500,
              borderBottom: pathname === link.href ? '2.5px solid #f29927' : 'none',
              paddingBottom: '2px',
              transition: 'color 0.2s, border-bottom 0.2s',
              letterSpacing:'0.2px',
              position:'relative',
            }}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Auth/User Buttons */}
      <div style={{display:'flex',alignItems:'center',gap:'1.1rem',marginLeft:'1.5rem'}}>
        <Link href="/cart" style={{position:'relative',color:'#fff',fontSize:'1.2rem'}}>
          <FaShoppingCart />
          {getItemCount() > 0 && (
            <span style={{
              position:'absolute',
              top:'-8px',
              right:'-8px',
              background:'#f29927',
              color:'#fff',
              borderRadius:'50%',
              width:'18px',
              height:'18px',
              fontSize:'0.7rem',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontWeight:700
            }}>
              {getItemCount()}
            </span>
          )}
        </Link>
        {user ? (
          <div style={{display:'flex',flexDirection:'column',gap:'1rem',alignItems:'center'}}>
            <button 
              onClick={() => {
                setShowUserPopup(!showUserPopup);
                setMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#7A6B57',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(122,107,87,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              {user.name}
            </button>
          </div>
        ) : (
          <>
            <Link href="/login" style={{padding:'0.5rem 1.3rem',border:'2px solid #fff',borderRadius:'2rem',fontWeight:600,background:'transparent',color:'#fff',textDecoration:'none',transition:'background 0.2s, color 0.2s'}}>Login</Link>
            <Link href="/signup" style={{padding:'0.5rem 1.3rem',border:'2px solid #f29927',borderRadius:'2rem',fontWeight:600,background:'#f29927',color:'#fff',textDecoration:'none',transition:'background 0.2s, color 0.2s'}}>Sign Up</Link>
          </>
        )}
      </div>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position:'fixed',
            top:0,
            left:0,
            width:'100vw',
            height:'100vh',
            background:'rgba(0,0,0,0.25)',
            zIndex:2000,
            display:'flex',
            flexDirection:'column',
            alignItems:'flex-end',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              background:'#fff',
              minWidth:220,
              borderRadius:'0 0 0 1.5rem',
              boxShadow:'0 2px 16px rgba(0,0,0,0.08)',
              marginTop:0,
              padding:'2rem 1.5rem',
              display:'flex',
              flexDirection:'column',
              gap:'1.5rem',
              alignItems:'flex-start',
            }}
            onClick={e => e.stopPropagation()}
          >
            {linksToShow.map(link => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  color: pathname === link.href ? '#f29927' : '#111',
                  textDecoration:'none',
                  fontWeight: pathname === link.href ? 700 : 500,
                  borderBottom: pathname === link.href ? '2.5px solid #f29927' : 'none',
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-bottom 0.2s',
                  letterSpacing:'0.2px',
                  position:'relative',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              style={{
                color: pathname === '/cart' ? '#f29927' : '#111',
                textDecoration:'none',
                fontWeight: pathname === '/cart' ? 700 : 500,
                borderBottom: pathname === '/cart' ? '2.5px solid #f29927' : 'none',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-bottom 0.2s',
                letterSpacing:'0.2px',
                position:'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart />
              Cart {getItemCount() > 0 && `(${getItemCount()})`}
            </Link>
          </div>
        </div>
      )}
      
      {/* User Profile Popup */}
      {showUserPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setShowUserPopup(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 4px 32px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowUserPopup(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666',
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(90deg,#7A6B57 60%,#f29927 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '2rem',
                color: '#fff',
                fontWeight: 700
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#7A6B57',
                marginBottom: '0.5rem'
              }}>
                {user?.name}
              </h2>
              <p style={{
                color: '#666',
                fontSize: '1rem'
              }}>
                Welcome back to TnT Travels
              </p>
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
                  background: '#fdf6f3',
                  borderRadius: '0.8rem',
                  border: '1px solid #E2B89B'
                }}>
                  <span style={{ fontWeight: 600, color: '#7A6B57' }}>Full Name:</span>
                  <span style={{ color: '#666' }}>{user?.name}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#fdf6f3',
                  borderRadius: '0.8rem',
                  border: '1px solid #E2B89B'
                }}>
                  <span style={{ fontWeight: 600, color: '#7A6B57' }}>Email:</span>
                  <span style={{ color: '#666' }}>{user?.email || 'user@example.com'}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#fdf6f3',
                  borderRadius: '0.8rem',
                  border: '1px solid #E2B89B'
                }}>
                  <span style={{ fontWeight: 600, color: '#7A6B57' }}>Phone:</span>
                  <span style={{ color: '#666' }}>{user?.mobile || '+91 98765 43210'}</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#fdf6f3',
                  borderRadius: '0.8rem',
                  border: '1px solid #E2B89B'
                }}>
                  <span style={{ fontWeight: 600, color: '#7A6B57' }}>Member Since:</span>
                  <span style={{ color: '#666' }}>2024</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#7A6B57',
                marginBottom: '1rem',
                borderBottom: '2px solid #E2B89B',
                paddingBottom: '0.5rem'
              }}>
                Travel Stats
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: '#E2B89B',
                  borderRadius: '0.8rem',
                  color: '#7A6B57'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{getItemCount()}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Cart Items</div>
                </div>
                
                <div style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: '#f29927',
                  borderRadius: '0.8rem',
                  color: '#fff'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>5</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Past Trips</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setShowUserPopup(false);
                  // Add navigation to profile page if needed
                }}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '0.8rem',
                  background: '#fff',
                  color: '#7A6B57',
                  fontWeight: 700,
                  border: '2px solid #7A6B57',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setShowUserPopup(false);
                }}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '0.8rem',
                  background: 'linear-gradient(90deg,#7A6B57 60%,#f29927 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          nav[style] { padding: 1rem 1vw !important; }
        }
        @media (max-width: 768px) {
          .tnt-navlinks { display: none !important; }
          .tnt-hamburger { display: block !important; }
          nav[style] { flex-wrap: wrap !important; }
        }
      `}</style>
    </nav>
  );
} 