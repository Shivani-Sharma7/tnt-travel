'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import LoginPopup from '@/components/LoginPopup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mockCabs = [
  {
    id: 'swift-dzire',
    name: 'Swift Dzire',
    type: 'Sedan',
    price: 18,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Comfortable and reliable Swift Dzire sedan perfect for city travel and airport transfers.',
    specifications: ['Engine: 1.2L Petrol', 'Mileage: 22 km/l', 'Seating: 4 Passengers', 'Luggage: 2 Bags'],
    amenities: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available'],
    rating: 4.6,
  },
  {
    id: 'toyota-innova',
    name: 'Toyota Innova',
    type: 'SUV',
    price: 28,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Premium Toyota Innova SUV offering luxury and comfort for group travel.',
    specifications: ['Engine: 2.4L Diesel', 'Mileage: 18 km/l', 'Seating: 6 Passengers', 'Luggage: 4 Bags'],
    amenities: ['Air Conditioning', 'Premium Music System', 'GPS Navigation', 'Child Seat Available', 'Leather Seats'],
    rating: 4.8,
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    type: 'Van',
    price: 40,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Spacious Tempo Traveller van ideal for large groups, corporate events, and family gatherings.',
    specifications: ['Engine: 2.5L Diesel', 'Mileage: 15 km/l', 'Seating: 12 Passengers', 'Luggage: 8 Bags'],
    amenities: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'Spacious Interior'],
    rating: 4.4,
  },
];

function StarBlock({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <span style={{display:'flex',alignItems:'center',gap:2}}>
      {Array(fullStars).fill(0).map((_,i) => <span key={'f'+i} style={{color:'#FFD700',fontSize:'1.1rem'}}>★</span>)}
      {halfStar && <span style={{color:'#FFD700',fontSize:'1.1rem'}}>☆</span>}
      {Array(emptyStars).fill(0).map((_,i) => <span key={'e'+i} style={{color:'#e0c97c',fontSize:'1.1rem'}}>★</span>)}
    </span>
  );
}

export default function TaxiBookingPage() {
  const params = useParams();
  const router = useRouter();
  const cabId = params.id as string;
  
  const [selectedCab, setSelectedCab] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    specialRequests: ''
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<any>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.date-picker-container') && !target.closest('.time-picker-container')) {
        setShowDatePicker(false);
        setShowTimePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { addToCart, checkLoginStatus } = useCart();

  useEffect(() => {
    const cab = mockCabs.find(c => c.id === cabId);
    if (cab) {
      setSelectedCab(cab);
    } else {
      router.push('/taxi');
    }
  }, [cabId, router]);

  if (!selectedCab) {
    return (
      <div style={{ padding: '3rem 2vw', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  const calculateEstimatedPrice = () => {
    // Simple estimation based on typical distances
    const basePrice = selectedCab.price;
    const estimatedKm = 25; // Default estimation
    return basePrice * estimatedKm;
  };

  const handleBooking = () => {
    if (!bookingForm.pickupLocation || !bookingForm.dropLocation || !bookingForm.pickupDate || 
        !bookingForm.pickupTime) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const handleAddToCart = () => {
    if (!bookingForm.pickupLocation || !bookingForm.dropLocation || !bookingForm.pickupDate || !bookingForm.pickupTime) {
      alert('Please fill in all required fields: pickup location, drop location, date, and time');
      return;
    }
    
    const cartItem = {
      id: `${selectedCab.id}-${bookingForm.pickupDate}-${bookingForm.pickupTime}`,
      type: 'taxi' as const,
      name: selectedCab.name,
      price: calculateEstimatedPrice(),
      image: selectedCab.images[0],
      details: {
        pickupLocation: bookingForm.pickupLocation,
        dropLocation: bookingForm.dropLocation,
        pickupDate: bookingForm.pickupDate,
        pickupTime: bookingForm.pickupTime,
        passengers: bookingForm.passengers
      }
    };
    
    if (!checkLoginStatus()) {
      setPendingCartItem(cartItem);
      setShowLoginPopup(true);
    } else {
      addToCart(cartItem);
      alert('Added to cart! You can view your cart to proceed with checkout.');
    }
  };

  const handleLoginSuccess = () => {
    if (pendingCartItem) {
      addToCart(pendingCartItem);
      setPendingCartItem(null);
      alert('Added to cart! You can view your cart to proceed with checkout.');
    }
  };

  return (
    <main style={{ padding: '2rem 2vw', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            color: '#A67B5B',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          ← Back to Taxis
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#A67B5B', margin: 0 }}>
          Book {selectedCab.name}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left: Cab Details */}
        <div>
          <div style={{ 
            background: '#fff', 
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: '0 2px 16px rgba(166,123,91,0.13)',
            marginBottom: '2rem'
          }}>
            {/* Image Carousel */}
            <div style={{ position: 'relative', height: '300px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img
                src={selectedCab.images[currentImageIndex]}
                alt={selectedCab.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
                {selectedCab.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      background: currentImageIndex === index ? '#A67B5B' : 'rgba(255, 255, 255, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#A67B5B', marginBottom: '0.5rem' }}>
              {selectedCab.name}
            </h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{selectedCab.description}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <StarBlock rating={selectedCab.rating} />
              <span style={{ fontWeight: 700, color: '#222', fontSize: '1.1rem' }}>{selectedCab.rating}</span>
              <span style={{ color: '#666' }}>•</span>
              <span style={{ color: '#666' }}>{selectedCab.type} Class</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {selectedCab.amenities.slice(0, 4).map((amenity: string, index: number) => (
                <span
                  key={index}
                  style={{
                    background: '#f9e6d1',
                    color: '#A67B5B',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '1rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div style={{ background: '#f9f6f2', padding: '1rem', borderRadius: '0.8rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#333', marginBottom: '0.5rem' }}>Specifications:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                {selectedCab.specifications.map((spec: string, index: number) => (
                  <div key={index}>• {spec}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div>
          <div style={{ 
            background: '#fff', 
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: '0 2px 16px rgba(166,123,91,0.13)',
            position: 'sticky',
            top: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#A67B5B', marginBottom: '1.5rem' }}>
              Book Your Ride
            </h2>

            {/* Trip Details */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Trip Details</h3>
              <input
                type="text"
                placeholder="Pickup Location *"
                value={bookingForm.pickupLocation}
                onChange={(e) => setBookingForm(prev => ({ ...prev, pickupLocation: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              <input
                type="text"
                placeholder="Drop Location *"
                value={bookingForm.dropLocation}
                onChange={(e) => setBookingForm(prev => ({ ...prev, dropLocation: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="date-picker-container" style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Pickup Date *</label>
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #A67B5B',
                      borderRadius: '0.5rem',
                      background: '#fff',
                      color: bookingForm.pickupDate ? '#A67B5B' : '#999',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {bookingForm.pickupDate 
                      ? new Date(bookingForm.pickupDate).toLocaleDateString()
                      : 'Select pickup date'
                    }
                  </button>
                  {showDatePicker && (
                    <div style={{ 
                      position: 'absolute', 
                      zIndex: 1000, 
                      background: '#fff', 
                      borderRadius: '0.5rem', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      marginTop: '0.5rem',
                      border: '2px solid #A67B5B'
                    }}>
                      <DatePicker
                        selected={bookingForm.pickupDate ? new Date(bookingForm.pickupDate) : null}
                        onChange={(date) => {
                          setBookingForm(prev => ({ 
                            ...prev, 
                            pickupDate: date ? date.toISOString().split('T')[0] : '' 
                          }));
                          setShowDatePicker(false);
                        }}
                        minDate={new Date()}
                        inline
                        dateFormat="MMM dd, yyyy"
                      />
                    </div>
                  )}
                </div>
                <div className="time-picker-container" style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Pickup Time *</label>
                  <button
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #A67B5B',
                      borderRadius: '0.5rem',
                      background: '#fff',
                      color: bookingForm.pickupTime ? '#A67B5B' : '#999',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {bookingForm.pickupTime || 'Select pickup time'}
                  </button>
                  {showTimePicker && (
                    <div style={{ 
                      position: 'absolute', 
                      zIndex: 1000, 
                      background: '#fff', 
                      borderRadius: '0.5rem', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      marginTop: '0.5rem',
                      border: '2px solid #A67B5B',
                      padding: '1rem'
                    }}>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(4, 1fr)', 
                        gap: '0.5rem',
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return [
                            `${hour}:00`,
                            `${hour}:15`,
                            `${hour}:30`,
                            `${hour}:45`
                          ];
                        }).flat().map(time => (
                          <button
                            key={time}
                            onClick={() => {
                              setBookingForm(prev => ({ ...prev, pickupTime: time }));
                              setShowTimePicker(false);
                            }}
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #ddd',
                              borderRadius: '0.3rem',
                              background: bookingForm.pickupTime === time ? '#A67B5B' : '#fff',
                              color: bookingForm.pickupTime === time ? '#fff' : '#333',
                              cursor: 'pointer',
                              fontSize: '0.9rem'
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ 
                background: '#f9f6f2', 
                padding: '0.8rem', 
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                color: '#A67B5B',
                textAlign: 'center'
              }}>
                {bookingForm.pickupDate && bookingForm.pickupTime 
                  ? `Pickup on ${new Date(bookingForm.pickupDate).toLocaleDateString()} at ${bookingForm.pickupTime}`
                  : 'Please select your pickup date and time'
                }
              </div>
              <select
                value={bookingForm.passengers}
                onChange={(e) => setBookingForm(prev => ({ ...prev, passengers: Number(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Special Requests (Optional)</h3>
              <textarea
                placeholder="Any special requests or preferences..."
                value={bookingForm.specialRequests}
                onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ddd',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Price Summary */}
            <div style={{ 
              background: '#f9f6f2', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              marginBottom: '1.5rem',
              border: '2px solid #A67B5B'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Rate per km:</span>
                <span>₹{selectedCab.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Estimated distance:</span>
                <span>~25 km</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>Estimated Total:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#A67B5B' }}>
                  ₹{calculateEstimatedPrice().toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                *Final price will be calculated based on actual distance
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: '#fff',
                  color: '#A67B5B',
                  fontWeight: 700,
                  border: '2px solid #A67B5B',
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
                Add to Cart
              </button>
              <button
                onClick={handleBooking}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(90deg,#A67B5B 60%,#d48166 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 8px #A67B5B22',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </main>
  );
} 