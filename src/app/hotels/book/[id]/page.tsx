'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useCart } from '@/context/CartContext';
import LoginPopup from '@/components/LoginPopup';

const mockHotels = [
  {
    id: 'grand-palace',
    name: 'The Grand Palace',
    location: 'Jaipur, India',
    price: 120,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Experience luxury and comfort at The Grand Palace, located in the heart of Jaipur.',
    amenities: ['Free WiFi', 'Breakfast Included', 'Swimming Pool', 'Spa & Wellness', 'Restaurant', 'Room Service'],
    roomTypes: [
      { name: 'Deluxe Room', price: 120, capacity: 2 },
      { name: 'Suite', price: 200, capacity: 3 },
      { name: 'Family Room', price: 180, capacity: 4 },
      { name: 'Executive Room', price: 250, capacity: 2 }
    ],
    rating: 4.7,
  },
  {
    id: 'seaside-resort',
    name: 'Seaside Resort',
    location: 'Goa, India',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Escape to paradise at Seaside Resort, where pristine beaches meet luxury accommodation.',
    amenities: ['Beach Access', 'Swimming Pool', 'Beach Bar', 'Water Sports', 'Spa', 'Restaurant'],
    roomTypes: [
      { name: 'Beach View Room', price: 95, capacity: 2 },
      { name: 'Garden Villa', price: 150, capacity: 3 },
      { name: 'Pool Suite', price: 220, capacity: 4 },
      { name: 'Standard Room', price: 80, capacity: 2 }
    ],
    rating: 4.5,
  },
  {
    id: 'mountain-view-inn',
    name: 'Mountain View Inn',
    location: 'Manali, India',
    price: 80,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Nestled in the Himalayas, Mountain View Inn offers breathtaking views and cozy accommodations.',
    amenities: ['Mountain View', 'Free Parking', 'Bonfire', 'Adventure Tours', 'Restaurant', 'Free WiFi'],
    roomTypes: [
      { name: 'Mountain View Room', price: 80, capacity: 2 },
      { name: 'Cottage', price: 120, capacity: 3 },
      { name: 'Deluxe Room', price: 100, capacity: 2 },
      { name: 'Family Suite', price: 160, capacity: 4 }
    ],
    rating: 4.2,
  },
  {
    id: 'city-lights-hotel',
    name: 'City Lights Hotel',
    location: 'Mumbai, India',
    price: 150,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Experience the vibrant energy of Mumbai from the comfort of City Lights Hotel.',
    amenities: ['Rooftop Bar', 'Gym Access', 'Business Center', 'Restaurant', 'Free WiFi', 'Air Conditioning'],
    roomTypes: [
      { name: 'City View Room', price: 150, capacity: 2 },
      { name: 'Executive Suite', price: 280, capacity: 3 },
      { name: 'Business Room', price: 180, capacity: 2 },
      { name: 'Deluxe Room', price: 200, capacity: 2 }
    ],
    rating: 4.9,
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

export default function HotelBookingPage() {
  const params = useParams();
  const router = useRouter();
  const hotelId = params.id as string;
  const { addToCart, checkLoginStatus, updateUser } = useCart();
  
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoomType, setSelectedRoomType] = useState(0);
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    specialRequests: ''
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<any>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hotel = mockHotels.find(h => h.id === hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
    } else {
      router.push('/hotels');
    }
  }, [hotelId, router]);

  // Click outside handler for date picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  if (!selectedHotel) {
    return (
      <div style={{ padding: '3rem 2vw', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  const calculateNights = () => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    if (!start || !end) return 0;
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    const roomPrice = selectedHotel.roomTypes[selectedRoomType].price;
    return nights * roomPrice;
  };

  const handleBooking = () => {
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const handleAddToCart = () => {
    if (!dateRange[0].startDate || !dateRange[0].endDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    const cartItem = {
      id: `${selectedHotel.id}-${selectedRoomType}-${dateRange[0].startDate?.toISOString()}`,
      type: 'hotel' as const,
      name: selectedHotel.name,
      price: calculateTotalPrice(),
      image: selectedHotel.images[0],
      details: {
        checkIn: dateRange[0].startDate?.toLocaleDateString(),
        checkOut: dateRange[0].endDate?.toLocaleDateString(),
        guests: guests
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
            color: '#7A6B57',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          ← Back to Hotels
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#7A6B57', margin: 0 }}>
          Book {selectedHotel.name}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left: Hotel Details */}
        <div>
          <div style={{ 
            background: '#fff', 
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: '0 2px 16px rgba(122,107,87,0.13)',
            marginBottom: '2rem'
          }}>
            {/* Image Carousel */}
            <div style={{ position: 'relative', height: '300px', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img
                src={selectedHotel.images[currentImageIndex]}
                alt={selectedHotel.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
                {selectedHotel.images.map((_: string, index: number) => (
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

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7A6B57', marginBottom: '0.5rem' }}>
              {selectedHotel.name}
            </h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{selectedHotel.description}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <StarBlock rating={selectedHotel.rating} />
              <span style={{ fontWeight: 700, color: '#222', fontSize: '1.1rem' }}>{selectedHotel.rating}</span>
              <span style={{ color: '#666' }}>•</span>
              <span style={{ color: '#666' }}>{selectedHotel.location}</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {selectedHotel.amenities.slice(0, 4).map((amenity: string, index: number) => (
                <span
                  key={index}
                  style={{
                    background: '#E2B89B',
                    color: '#7A6B57',
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
          </div>
        </div>

        {/* Right: Booking Form */}
        <div>
          <div style={{ 
            background: '#fff', 
            borderRadius: '1.5rem', 
            padding: '2rem', 
            boxShadow: '0 2px 16px rgba(122,107,87,0.13)',
            position: 'sticky',
            top: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1.5rem' }}>
              Book Your Stay
            </h2>

            {/* Date Selection */}
            <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Check-in & Check-out</h3>
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #7A6B57',
                  borderRadius: '0.8rem',
                  background: '#fff',
                  color: '#7A6B57',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '1rem'
                }}
              >
                {dateRange[0].startDate && dateRange[0].endDate
                  ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
                  : 'Select check-in and check-out dates'
                }
              </button>
              
              {showDatePicker && (
                <div ref={datePickerRef} style={{ 
                  position: 'absolute', 
                  top: '100%',
                  left: '0',
                  zIndex: 1000, 
                  background: '#fff', 
                  borderRadius: '1rem', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)', 
                  border: '2px solid #7A6B57',
                  width: '100%'
                }}>
                  <DateRange
                    ranges={dateRange}
                    onChange={(item) => {
                      if (item.selection.startDate && item.selection.endDate) {
                        setDateRange([{
                          startDate: item.selection.startDate,
                          endDate: item.selection.endDate,
                          key: 'selection'
                        }]);
                      }
                    }}
                    minDate={new Date()}
                    rangeColors={['#7A6B57']}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"
                  />
                </div>
              )}
              
              <div style={{ 
                background: '#fdf6f3', 
                padding: '0.8rem', 
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                color: '#7A6B57',
                textAlign: 'center'
              }}>
                {dateRange[0].startDate && dateRange[0].endDate 
                  ? `${calculateNights()} night${calculateNights() !== 1 ? 's' : ''} stay`
                  : 'Click to select your check-in and check-out dates'
                }
              </div>
            </div>

            {/* Room Type Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Room Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedHotel.roomTypes.map((room: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="roomType"
                      checked={selectedRoomType === index}
                      onChange={() => setSelectedRoomType(index)}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{room.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>Up to {room.capacity} guests</div>
                    </div>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>₹{room.price}/night</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of Guests */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Number of Guests</h3>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #7A6B57',
                  borderRadius: '0.8rem',
                  background: '#fff',
                  color: '#7A6B57',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
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
              background: '#fdf6f3', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              marginBottom: '1.5rem',
              border: '2px solid #7A6B57'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Room Rate:</span>
                <span>₹{selectedHotel.roomTypes[selectedRoomType].price} × {calculateNights()} nights</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>Total:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7A6B57' }}>
                  ₹{calculateTotalPrice().toLocaleString()}
                </span>
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
                Add to Cart
              </button>
              <button
                onClick={handleBooking}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(90deg,#7A6B57 60%,#f29927 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  boxShadow: '0 2px 8px #7A6B5722',
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