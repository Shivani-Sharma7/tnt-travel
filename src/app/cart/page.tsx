"use client";
import { useCart } from '@/context/CartContext';
import { useProfile } from '@/context/ProfileContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useProfile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
      return;
    }
    router.push('/checkout');
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel': return 'Hotel';
      case 'taxi': return 'Taxi';
      case 'trip': return 'Trip';
      default: return type;
    }
  };

  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#fdf6f3',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          marginTop: '4rem',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }} />
        
        <div style={{ 
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '2rem 3rem', 
          borderRadius: '2rem', 
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}>
            🛒
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            color: '#ffffff', 
            marginBottom: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            Your Cart is Empty
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            marginBottom: '3rem',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            Start exploring our amazing hotels, taxis, and trips!
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <Link href="/hotels" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              minWidth: '160px'
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
              Browse Hotels
            </Link>
            <Link href="/taxi" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg,  rgba(242, 93, 93, 0.4) 0%,rgba(6, 7, 6, 0.6)  100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: '1px solid #f45B5B',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              minWidth: '160px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(242, 93, 93, 0.4) 0%, rgba(6, 7, 6, 0.6) 100%)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(242, 93, 93, 0.2) 100%)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
            >
              Book Taxi
            </Link>
            <Link href="/customize-trip" style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg,  #f45B5B 0%, rgba(255, 81, 81, 0.7) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(242,153,39,0.5)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              minWidth: '160px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f45B5B 0%, rgba(255, 81, 81, 0.7) 100%)';
              e.currentTarget.style.boxShadow = ' #f45B5B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f45B5B 0%, rgba(255, 81, 81, 0.7) 100%)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f45B5B 0%, rgba(255, 81, 81, 0.7) 100%)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
            >
             Trip Experience
            </Link>
          </div>
          
          {/* Order History Link */}
          <div style={{ 
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <Link href="/order-history" style={{
              padding: '0.8rem 2rem',
              background: 'linear-gradient(135deg, rgba(30, 111, 92, 0.3) 0%, rgba(30, 111, 92, 0.2) 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              borderRadius: '2rem',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(30, 111, 92, 0.4)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 111, 92, 0.4) 0%, rgba(30, 111, 92, 0.3) 100%)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(30, 111, 92, 0.3) 0%, rgba(30, 111, 92, 0.2) 100%)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
            >
              📋 Order History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#fafafa',
      paddingTop: '100px',
      paddingRight: '2rem',
      paddingBottom: '2rem',
      paddingLeft: '2rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        gap: '3rem'
      }}>
        {/* Left Section - Your Bag */}
        <div style={{ flex: 1 }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 300, 
            color: '#2c2c2c',
            marginBottom: '2rem',
            fontFamily: 'serif'
          }}>
            Your Bag
          </h1>

          {/* Column Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr 1fr',
            gap: '8rem',
            padding: '1rem 1rem',
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '1rem',
            fontWeight: 500,
            color: '#666666',
            fontSize: '1.2rem'
          }}>
            <div>Products</div>
            <div>Description</div>
            <div>Price</div>
            <div>Delete</div>
          </div>

          {/* Items */}
          {items.map((item) => (
            <div key={item.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr',
              gap: '1rem',
              alignItems: 'center',
              padding: '1.2rem 1rem',
              borderBottom: '1px solid #f0f0f0'
            }}>
              {/* Product Image */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '0.3rem',
                overflow: 'hidden',
                background: '#f8f8f8'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  color: '#2c2c2c',
                  margin: '0.2rem 3rem'
                }}>
                  {item.name}
                </h3>
                <div style={{ fontSize: '1rem', color: '#888888', margin: '0.2rem 3rem',width:'88%',lineHeight: '1.4' }}>
                  {item.type === 'hotel' && (
                    <div>
                      {item.details.checkIn && item.details.checkOut && (
                        <div>Check-in: {formatDate(item.details.checkIn)} | Check-out: {formatDate(item.details.checkOut)}</div>
                      )}
                      {item.details.guests && <div>Guests: {item.details.guests}</div>}
                    </div>
                  )}
                  
                  {item.type === 'taxi' && (
                    <div>
                      {item.details.tripDate && item.details.tripEndDate && (
                        <div>Dates: {formatDate(item.details.tripDate)} → {formatDate(item.details.tripEndDate)}</div>
                      )}
                      {!item.details.tripEndDate && item.details.tripDate && (
                        <div>Date: {formatDate(item.details.tripDate)}</div>
                      )}
                      {item.details.pickupLocation && <div>From: {item.details.pickupLocation}</div>}
                      {item.details.dropLocation && <div>To: {item.details.dropLocation}</div>}
                      {item.details.pickupDate && !item.details.tripDate && <div>Date: {formatDate(item.details.pickupDate)}</div>}
                      {item.details.pickupTime && <div>Time: {item.details.pickupTime}</div>}
                      {item.details.passengers && <div>Passengers: {item.details.passengers}</div>}
                    </div>
                  )}
                  
                  {item.type === 'trip' && (
                    <div>
                      {item.details.tripDate && item.details.tripEndDate && (
                        <div>Trip Dates: {formatDate(item.details.tripDate)} → {formatDate(item.details.tripEndDate)}</div>
                      )}
                      {item.details.tripDate && !item.details.tripEndDate && (
                        <div>Trip Date: {formatDate(item.details.tripDate)}</div>
                      )}
                      {item.details.duration && <div>Duration: {item.details.duration}</div>}
                      {item.details.accommodation && <div>Accommodation: {item.details.accommodation}</div>}
                      {item.details.hotel && <div>Hotel: {item.details.hotel}</div>}
                      {item.details.transportation && <div>Transportation: {item.details.transportation}</div>}
                      {item.details.meals && <div>Meals: {item.details.meals}</div>}
                      {item.details.activities && <div>Activities: {item.details.activities}</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div style={{ fontWeight: 500, color: '#2c2c2c', fontSize: '1rem', margin: '0 2rem' }}>
                {formatPrice(item.price)}
              </div>

              {/* Delete Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    color: '#999999',
                    padding: '0.2rem',
                    borderRadius: '0.2rem',
                    transition: 'color 0.2s',
                    fontWeight: 300,
                    lineHeight: 1
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#999999';
                  }}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        

        {/* Right Section - Order Summary */}
        <div style={{ 
          width: '1200px',
          background: '#ffffff',
          padding: '2rem',
          height: 'fit-content'
        }}>
          
          <div style={{
            background: '#f5f5f5',
            padding: '1rem',
            borderRadius: '0.3rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '1rem',
              fontWeight: 1600,
              color: '#2c2c2c'
            }}>
              <span>Total</span>
              <span>{formatPrice(getTotalPrice() +0)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0.3rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#333333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
              }}
            >
              {user ? 'Checkout' : 'Login to Checkout'}
            </button>

            <Link href="/order-history" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#ffffff',
                  color: '#1e6f5c',
                  border: '2px solid #1e6f5c',
                  borderRadius: '0.3rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1e6f5c';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#1e6f5c';
                }}
              >
                📋 View Order History
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
} 