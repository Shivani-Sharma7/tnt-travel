"use client";
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
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

  if (items.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(120deg,#7A6B57 60%,#f29927 100%)',
        padding: '2rem'
      }}>
        <div style={{ 
          background: '#fff', 
          padding: '3rem 2rem', 
          borderRadius: '1.5rem', 
          boxShadow: '0 4px 32px rgba(122,107,87,0.13)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            color: '#f29927'
          }}>
            🛒
          </div>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: '#7A6B57', 
            marginBottom: '1rem' 
          }}>
            Your Cart is Empty
          </h1>
          <p style={{ 
            color: '#666', 
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Start exploring our amazing hotels, taxis, and trips!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/hotels" style={{
              padding: '0.8rem 1.5rem',
              background: '#f29927',
              color: '#fff',
              borderRadius: '0.8rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'transform 0.2s'
            }}>
              Browse Hotels
            </Link>
            <Link href="/taxi" style={{
              padding: '0.8rem 1.5rem',
              background: '#7A6B57',
              color: '#fff',
              borderRadius: '0.8rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'transform 0.2s'
            }}>
              Book Taxi
            </Link>
            <Link href="/customize-trip" style={{
              padding: '0.8rem 1.5rem',
              background: '#E2B89B',
              color: '#7A6B57',
              borderRadius: '0.8rem',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'transform 0.2s'
            }}>
              Customize Trip
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(120deg,#7A6B57 60%,#f29927 100%)',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: '#fff',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 32px rgba(34,49,63,0.13)'
      }}>
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(90deg,#7A6B57 60%,#f29927 100%)',
          padding: '2rem',
          color: '#fff'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            marginBottom: '0.5rem' 
          }}>
            Shopping Cart
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Cart Items */}
          <div style={{ flex: 1, padding: '2rem' }}>
            {items.map((item) => (
              <div key={item.id} style={{
                border: '2px solid #f0f0f0',
                borderRadius: '1rem',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                background: '#fafafa'
              }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  {/* Item Image */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '0.8rem',
                    overflow: 'hidden',
                    flexShrink: 0
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

                  {/* Item Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{
                          background: item.type === 'hotel' ? '#f29927' : 
                                     item.type === 'taxi' ? '#7A6B57' : '#E2B89B',
                          color: item.type === 'trip' ? '#7A6B57' : '#fff',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          marginBottom: '0.5rem',
                          display: 'inline-block'
                        }}>
                          {getItemTypeLabel(item.type)}
                        </span>
                        <h3 style={{ 
                          fontSize: '1.3rem', 
                          fontWeight: 700, 
                          color: '#7A6B57',
                          marginBottom: '0.5rem'
                        }}>
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.5rem',
                          cursor: 'pointer',
                          color: '#d32f2f',
                          padding: '0.5rem',
                          borderRadius: '50%',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#ffebee';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        ×
                      </button>
                    </div>

                    {/* Item Details */}
                    <div style={{ color: '#666', fontSize: '0.95rem' }}>
                      {item.type === 'hotel' && (
                        <div>
                          {item.details.checkIn && item.details.checkOut && (
                            <p>Check-in: {item.details.checkIn} | Check-out: {item.details.checkOut}</p>
                          )}
                          {item.details.guests && <p>Guests: {item.details.guests}</p>}
                        </div>
                      )}
                      
                      {item.type === 'taxi' && (
                        <div>
                          {item.details.pickupLocation && <p>From: {item.details.pickupLocation}</p>}
                          {item.details.dropLocation && <p>To: {item.details.dropLocation}</p>}
                          {item.details.pickupDate && <p>Date: {item.details.pickupDate}</p>}
                          {item.details.pickupTime && <p>Time: {item.details.pickupTime}</p>}
                          {item.details.passengers && <p>Passengers: {item.details.passengers}</p>}
                        </div>
                      )}
                      
                      {item.type === 'trip' && (
                        <div>
                          {item.details.tripDate && <p>Trip Date: {item.details.tripDate}</p>}
                          {item.details.duration && <p>Duration: {item.details.duration}</p>}
                          {item.details.accommodation && <p>Accommodation: {item.details.accommodation}</p>}
                          {item.details.hotel && <p>Hotel: {item.details.hotel}</p>}
                          {item.details.transportation && <p>Transportation: {item.details.transportation}</p>}
                          {item.details.meals && <p>Meals: {item.details.meals}</p>}
                          {item.details.activities && <p>Activities: {item.details.activities}</p>}
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      marginTop: '1rem',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#f29927'
                    }}>
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ 
            width: '350px',
            background: '#f9f9f9',
            padding: '2rem',
            borderLeft: '2px solid #f0f0f0'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 700, 
              color: '#22313f',
              marginBottom: '1.5rem'
            }}>
              Order Summary
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.8rem 0',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#333' }}>{item.name}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {getItemTypeLabel(item.type)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#f29927' }}>
                    {formatPrice(item.price)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: '2px solid #e0e0e0',
              paddingTop: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#22313f'
              }}>
                <span>Total:</span>
                <span style={{ color: '#f29927' }}>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(90deg,#f29927 60%,#e67e22 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                opacity: isCheckingOut ? 0.7 : 1,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isCheckingOut) e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <button
              onClick={clearCart}
              style={{
                width: '100%',
                padding: '0.8rem',
                background: 'none',
                color: '#d32f2f',
                border: '2px solid #d32f2f',
                borderRadius: '1rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '1rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#d32f2f';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#d32f2f';
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 