'use client';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import LoginPopup from '@/components/LoginPopup';

// Custom Calendar Component
const CustomCalendar = React.memo(({ 
  selectedStartDate, 
  selectedEndDate, 
  onDateSelect, 
  onClose 
}: {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const daysInMonth = useMemo(() => (year: number, month: number) => 
    new Date(year, month + 1, 0).getDate(), []);
  
  const getFirstDayOfMonth = useMemo(() => (year: number, month: number) => 
    new Date(year, month, 1).getDay(), []);
  
  const isDateInRange = useCallback((date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  }, [selectedStartDate, selectedEndDate]);
  
  const isDateSelected = useCallback((date: Date) => {
    if (selectedStartDate && date.toDateString() === selectedStartDate.toDateString()) return 'start';
    if (selectedEndDate && date.toDateString() === selectedEndDate.toDateString()) return 'end';
    return null;
  }, [selectedStartDate, selectedEndDate]);
  
  const handleDateClick = useCallback((date: Date) => {
    if (date < minDate) return;
    
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Start new selection
      onDateSelect(date);
    } else if (date > selectedStartDate) {
      // Complete selection
      onDateSelect(date);
    } else {
      // Reset and start new selection
      onDateSelect(date);
    }
  }, [selectedStartDate, selectedEndDate, onDateSelect, minDate]);
  
  const renderCalendar = useMemo(() => {
    const days = [];
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const totalDays = daysInMonth(currentYear, currentMonth);
    
    // Add empty cells for first week padding
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }
    
    // Add date cells
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isDisabled = date < minDate;
      const selectionType = isDateSelected(date);
      const isInRange = isDateInRange(date);
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
          style={{
            width: '100%',
            height: '40px',
            border: selectionType === 'start' || selectionType === 'end' 
              ? '2px solid #1e6f5c' 
              : '1px solid #eee',
            borderRadius: '8px',
            background: selectionType === 'start' || selectionType === 'end' 
              ? '#1e6f5c' 
              : isInRange 
                ? '#e8f5f2' 
                : '#fff',
            color: selectionType === 'start' || selectionType === 'end' 
              ? '#fff' 
              : isDisabled 
                ? '#ccc' 
                : '#333',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            fontWeight: selectionType ? '700' : '500',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            if (!isDisabled) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(30, 111, 92, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {day}
          {selectionType === 'start' && (
            <div style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              border: '2px solid #1e6f5c',
              borderRadius: '10px',
              pointerEvents: 'none'
            }} />
          )}
          {selectionType === 'end' && (
            <div style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              border: '2px solid #1e6f5c',
              borderRadius: '10px',
              pointerEvents: 'none'
            }} />
          )}
        </button>
      );
    }
    
    return days;
  }, [currentYear, currentMonth, daysInMonth, getFirstDayOfMonth, minDate, isDateSelected, isDateInRange, handleDateClick]);
  
  const nextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }, [currentMonth, currentYear]);
  
  const prevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }, [currentMonth, currentYear]);
  
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      minWidth: '320px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <button
          onClick={prevMonth}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#1e6f5c',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0f9f6';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ‹
        </button>
        
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#1a2a3a'
        }}>
          {new Date(currentYear, currentMonth).toLocaleString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
        
        <button
          onClick={nextMonth}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#1e6f5c',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0f9f6';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ›
        </button>
      </div>
      
      {/* Day headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
        marginBottom: '16px'
      }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#666',
            padding: '8px 0'
          }}>
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px'
      }}>
        {renderCalendar}
      </div>
      
      {/* Selection info */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '12px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#495057',
          marginBottom: '8px'
        }}>
          Selected Dates:
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6c757d'
        }}>
          {selectedStartDate ? `Check-in: ${selectedStartDate.toLocaleDateString()}` : 'No check-in date selected'}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6c757d'
        }}>
          {selectedEndDate ? `Check-out: ${selectedEndDate.toLocaleDateString()}` : 'No check-out date selected'}
        </div>
      </div>
      
      {/* Close button */}
      <div style={{
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <button
          onClick={onClose}
          style={{
            background: '#1e6f5c',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2a9d8f';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1e6f5c';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
});

const mockHotels = [
  // Mathura
  {
    id: 'krishna-inn-mathura',
    name: 'Krishna Inn',
    location: 'Mathura, India',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=70',
    ],
    description: 'Comfortable stay near Shri Krishna Janmabhoomi with easy access to local temples and markets.',
    amenities: ['Free WiFi', 'Breakfast Included', 'Air Conditioning', 'Restaurant', 'Free Parking', 'Room Service'],
    roomTypes: [
      { name: 'Standard Room', price: 95, capacity: 2 },
      { name: 'Deluxe Room', price: 120, capacity: 3 },
      { name: 'Family Room', price: 160, capacity: 4 }
    ],
    rating: 4.5,
  },
  {
    id: 'yamuna-retreat-mathura',
    name: 'Yamuna Retreat',
    location: 'Mathura, India',
    price: 120,
    images: [
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1501117716987-c8e3f1e3ecb4?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1520697222867-9e0b2f1f7a32?auto=format&fit=crop&w=800&q=70',
    ],
    description: 'Modern hotel with views of the Yamuna and quick rides to Vrindavan and Dwarkadheesh Temple.',
    amenities: ['River View', 'Restaurant', 'Lift', 'Free WiFi', 'Air Conditioning', 'Parking'],
    roomTypes: [
      { name: 'River View Room', price: 120, capacity: 2 },
      { name: 'Suite', price: 180, capacity: 3 },
      { name: 'Family Suite', price: 220, capacity: 4 }
    ],
    rating: 4.3,
  },
  // Banaras (Varanasi)
  {
    id: 'ghat-view-banaras',
    name: 'Ghat View Hotel',
    location: 'Banaras, India',
    price: 110,
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3aa1?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=70',
    ],
    description: 'Steps away from the ghats with a cozy cafe and evening aarti experience.',
    amenities: ['Free WiFi', 'Cafe', 'Air Conditioning', 'Airport Transfer', 'City Tours'],
    roomTypes: [
      { name: 'City View Room', price: 110, capacity: 2 },
      { name: 'Deluxe Room', price: 150, capacity: 3 }
    ],
    rating: 4.7,
  },
  {
    id: 'sarnath-suites-banaras',
    name: 'Sarnath Suites',
    location: 'Banaras, India',
    price: 145,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=800&q=70',
    ],
    description: 'Spacious suites close to Sarnath with business facilities and swift connectivity.',
    amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Conference Room', 'Parking'],
    roomTypes: [
      { name: 'Executive Suite', price: 145, capacity: 2 },
      { name: 'Family Suite', price: 200, capacity: 4 }
    ],
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

export default function HotelBookingPage() {
  const params = useParams();
  const router = useRouter();
  const hotelId = params.id as string;
  const { addToCart, checkLoginStatus, updateUser } = useCart();
  
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRoomType, setSelectedRoomType] = useState(0);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [dateRange, setDateRange] = useState<Array<{
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }>>([
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
  const formRef = useRef<HTMLDivElement>(null);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const imagesQueueRef = useRef<HTMLDivElement>(null);
  const [queueMax, setQueueMax] = useState(0);
  const [queueVal, setQueueVal] = useState(0);

  useEffect(() => {
    const hotel = mockHotels.find(h => h.id === hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
    } else {
      router.push('/hotels');
    }
  }, [hotelId, router]);

  // Auto-adjust rooms whenever guests or room type change
  useEffect(() => {
    if (!selectedHotel) return;
    const capacity = selectedHotel.roomTypes?.[selectedRoomType]?.capacity || 1;
    const autoRooms = Math.max(1, Math.ceil(guests / capacity));
    setRooms(autoRooms);
  }, [selectedHotel, selectedRoomType, guests]);

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

  // Update custom scrollbar positions for images queue when modal is open
  useEffect(() => {
    if (!showImagesModal) return;
    const el = imagesQueueRef.current;
    if (!el) return;
    const update = () => {
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      setQueueMax(max);
      setQueueVal(el.scrollLeft);
    };
    update();
    el.addEventListener('scroll', update, { passive: true } as any);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update as any);
      window.removeEventListener('resize', update);
    };
  }, [showImagesModal]);

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
    const selectedRooms = Math.max(1, rooms);
    return nights * roomPrice * selectedRooms;
  };

  const handleBooking = () => {
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  const handleAddToCart = () => {
    if (!dateRange[0].startDate || !dateRange[0].endDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    const capacity = selectedHotel.roomTypes[selectedRoomType].capacity || 1;
    // Auto-correct rooms based on guests and capacity
    const autoRooms = Math.max(1, Math.ceil(guests / capacity));
    const correctedRooms = Math.min(Math.max(1, autoRooms), guests);
    if (correctedRooms !== rooms) {
      setRooms(correctedRooms);
    }
    
    const cartItem = {
      id: `${selectedHotel.id}-${selectedRoomType}-${dateRange[0].startDate?.toISOString()}`,
      type: 'hotel' as const,
      name: selectedHotel.name,
      price: calculateTotalPrice(),
      image: selectedHotel.images[0],
      details: {
        checkIn: dateRange[0].startDate?.toLocaleDateString() || '',
        checkOut: dateRange[0].endDate?.toLocaleDateString() || '',
        guests: guests,
        rooms: rooms,
        roomType: selectedHotel.roomTypes[selectedRoomType].name
      }
    };
    
    if (!checkLoginStatus()) {
      setPendingCartItem(cartItem);
      setShowLoginPopup(true);
    } else {
      addToCart(cartItem);
      router.push('/cart');
    }
  };

  const handleLoginSuccess = () => {
    if (pendingCartItem) {
      addToCart(pendingCartItem);
      setPendingCartItem(null);
      router.push('/cart');
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Build dynamic property highlights based on hotel data
  const buildHighlights = (hotel: any) => {
    const city = (hotel.location || '').split(',')[0] || 'the city';
    const amenities: string[] = hotel.amenities || [];
    const hasVeg = amenities.some((a) => /veg|restaurant/i.test(a));
    const hasParking = amenities.some((a) => /park/i.test(a));
    const hasTransfer = amenities.some((a) => /transfer|shuttle/i.test(a));
    const elderly = amenities.some((a) => /lift|elevat|room service|concierge/i.test(a));

    const items = [
      { icon: '📍', title: 'Close to Landmark', desc: `Prime location in ${city}.` },
      { icon: '🌿', title: 'Pure Veg Food Options', desc: hasVeg ? 'Pure vegetarian restaurant available at the property.' : 'Vegetarian-friendly options available nearby.' },
      { icon: '🚌', title: 'Transfers Provided', desc: hasTransfer ? 'Property provides airport/station transfers.' : 'Assistance available for arranging local transfers.' },
      { icon: '🅿️', title: 'Provides Parking', desc: hasParking ? 'Free parking available at the property.' : 'Parking assistance available near the property.' },
      { icon: '🧓', title: 'Elderly Friendly Property', desc: elderly ? 'Lift/elevator and staff support for elderly guests.' : 'Staff available to assist elderly guests upon request.' },
    ];
    return items;
  };

  // City -> popular landmark and distance (fallbacks included)
  const getNearestLandmark = (hotel: any) => {
    const cityKey = ((hotel.location || '').split(',')[0] || '').trim().toLowerCase();
    const mapping: Record<string, { city: string; landmark: string; km: number }> = {
      goa: { city: 'Goa', landmark: 'Calangute Beach', km: 1.2 },
      manali: { city: 'Manali', landmark: 'Hadimba Devi Temple', km: 2.3 },
      mumbai: { city: 'Mumbai', landmark: 'Gateway of India', km: 3.1 },
      mathura: { city: 'Mathura', landmark: 'Sri Krishna Janmabhoomi', km: 4.9 },
      vrindavan: { city: 'Vrindavan', landmark: 'Banke Bihari Temple', km: 2.1 },
    };
    const fallbackCity = (hotel.location || '').split(',')[0] || 'City';
    return mapping[cityKey] || { city: fallbackCity, landmark: 'Popular Landmark', km: 1.0 };
  };

  // Pick a representative image for a room option
  const getRoomImage = (hotel: any, index: number) => {
    const imgs: string[] = hotel.images || [];
    if (!imgs.length) return '/next.svg';
    return imgs[index % imgs.length];
  };

  return (
    <div style={{ background: '#f5f3ef' }}>
    <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      

      {/* Overview Section */}
      <section style={{ padding:'5rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem', alignItems:'center' }}>
          {/* Left Image with simple carousel dots */}
          <div style={{ background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 16px rgba(0,0,0,0.08)', overflow:'hidden' }}>
            <div style={{ position:'relative', height:300 }}>
              <img src={selectedHotel.images[currentImageIndex]} alt={selectedHotel.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <button 
                onClick={() => setShowImagesModal(true)}
                style={{ position:'absolute', top:12, right:12, background:'rgba(255,255,255,0.9)', border:'1px solid #eee', color:'#1a2a3a', padding:'0.5rem 0.9rem', borderRadius:'0.6rem', fontWeight:700, cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}
              >
                View all images
        </button>
              <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6 }}>
                {selectedHotel.images.map((_:string, index:number) => (
                  <span key={index} onClick={()=>setCurrentImageIndex(index)} style={{ width:10, height:10, borderRadius:'50%', background: currentImageIndex===index ? '#1e6f5c' : '#ffffffaa', border:'1px solid #1e6f5c', cursor:'pointer' }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Details */}
          <div>
            <h2 style={{ fontSize:'2rem', fontWeight:800, color:'#1a2a3a', margin:0 }}>{selectedHotel.name}</h2>
            {(() => {
              const info = getNearestLandmark(selectedHotel);
              return (
                <div style={{ marginTop:6, fontWeight:700, color:'#1a2a3a' }}>
                  <span style={{ color:'#1e6f5c' }}>{info.city}</span>
                  <span style={{ color:'#999', margin:'0 8px' }}>|</span>
                  <span style={{ color:'#444' }}>{info.km.toFixed(1)} km drive to {info.landmark}</span>
                </div>
              );
            })()}
            <p style={{ color:'#555', margin:'0.8rem 0 1rem 0', lineHeight:1.2 }}>{selectedHotel.description}</p>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'0.6rem 1.2rem', margin:'2.5rem 0 0.4rem 0', color:'#1a2a3a' }}>
              <div>• Free Cancellation till 24 hrs before check in</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:1,color:'#1a2a3a'}}>
                <span style={{ color:'#f29927' }}>★</span>
                <span>Rated {selectedHotel.rating.toFixed(1)} by guests</span>
              </div>
            <div style={{ display:'flex', gap:'0.8rem', margin:'1rem 0 0 0',alignItems:'center' }}>
              <button onClick={()=>window.open('tel:+917037753106','_self')} style={{ border:'1px solid #1e6f5c', background:'#fff', color:'#1e6f5c', padding:'0.6rem 1rem', borderRadius:'0.6rem', fontWeight:600, cursor:'pointer' }}>+91-7037753106</button>
            </div>
            </div>

        </div>
      </section>

      {/* Facilities Section */}
      <section style={{ padding:'0 1rem 1.5rem 2rem' }}>
        <div style={{ background:'#fff', borderRadius:'1.2rem', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', padding:'2rem' }}>
          <h3 style={{ textAlign:'center', fontSize:'1.8rem', fontWeight:800, color:'#1a2a3a', marginBottom:'1.5rem' }}>Room Facilities</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(164px, 1fr))', gap:'.5rem' }}>
            {selectedHotel.amenities.slice(0,12).map((amenity:string, i:number) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'0.6rem 0.8rem', border:'2px dashed #eee', borderRadius:'0.6rem' }}>
                <span style={{ fontSize:'1.1rem',position:'relative',top:'0.1rem',color:'#1e6f5c' }}>•</span>
                <span style={{ color:'#333',fontSize:'1rem',textAlign:'center',width:'100%' }}>{amenity}</span>
                <span style={{ fontSize:'1.1rem',position:'relative',top:'0.1rem',color:'#1e6f5c' }}>•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section ref={formRef} style={{ padding:'0 2rem 3rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:'2rem', alignItems:'start' }}>
          {/* Left: Details (60%) */}
          <div>
            <div style={{ background:'#fff', borderRadius:'1rem', padding:'1.5rem', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', marginBottom:'1.5rem' }}>
              <h3 style={{ fontSize:'1.3rem', fontWeight:700, color:'#1a2a3a', marginBottom:'0.8rem' }}>Hotel Location</h3>
              <div style={{ color:'#666', marginBottom:'0.8rem' }}>{selectedHotel.location}</div>
              <div style={{ borderRadius:'0.8rem', overflow:'hidden', boxShadow:'0 1px 8px rgba(0,0,0,0.08)' }}>
                <iframe
                  title="hotel-map"
                  width="100%"
                  height="320"
                  style={{ border: 0, display:'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(selectedHotel.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
              <div style={{ marginTop:'0.8rem' }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHotel.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color:'#1e6f5c', fontWeight:700 }}
                >
                  Open in Google Maps
                </a>
              </div>
              {/* Why guests love this property - dynamic by hotel */}
              <div style={{ background:'#fff', borderRadius:'1rem', padding:'1.5rem', boxShadow:'0 2px 16px rgba(0,0,0,0.06)', marginTop:'1rem' }}>
                <h3 style={{ fontSize:'1.3rem', fontWeight:800, color:'#1a2a3a', marginBottom:'0.8rem' }}>Why do Devotees love this property?</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.8rem' }}>
                  {buildHighlights(selectedHotel).map((h, i) => (
                    <div key={i}>
                      <div style={{ display:'flex', alignItems:'center', gap:10, fontWeight:800, color:'#1a2a3a' }}>
                        <span>{h.icon}</span> <span>{h.title}</span>
                      </div>
                      <div style={{ color:'#555', marginTop:4 }}>{h.desc}</div>
                    </div>
              ))}
            </div>
          </div>
        </div>
          </div>
          {/* Right: Booking Card (40%) */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '1rem', 
            padding: '1.5rem', 
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a2a3a', marginBottom: '1.2rem' }}>
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
                  border: '2px solid #1e6f5c',
                  borderRadius: '0.8rem',
                  background: '#fff',
                  color: '#1e6f5c',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '1rem'
                }}
              >
                <span style={{ marginRight:8 }}>📅</span>
                {dateRange[0].startDate && dateRange[0].endDate
                  ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
                  : dateRange[0].startDate
                    ? `Check-in: ${dateRange[0].startDate.toLocaleDateString()} (Select check-out)`
                    : 'Select check-in and check-out dates'}
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
                  border: '2px solid #1e6f5c',
                  width: '100%'
                }}>
                  <CustomCalendar
                    selectedStartDate={dateRange[0].startDate || null}
                    selectedEndDate={dateRange[0].endDate || null}
                    onDateSelect={(date) => {
                      if (!dateRange[0].startDate || (dateRange[0].startDate && dateRange[0].endDate)) {
                        // Start new selection or reset
                        setDateRange([{ 
                          startDate: date, 
                          endDate: null, 
                          key: 'selection' 
                        }]);
                      } else if (date > dateRange[0].startDate!) {
                        // Complete selection with end date
                        setDateRange([{ 
                          startDate: dateRange[0].startDate, 
                          endDate: date, 
                          key: 'selection' 
                        }]);
                      } else {
                        // Reset and start new selection
                        setDateRange([{ 
                          startDate: date, 
                          endDate: null, 
                          key: 'selection' 
                        }]);
                      }
                    }}
                    onClose={() => setShowDatePicker(false)}
                  />
                </div>
              )}
              
              <div style={{ 
                background: '#f6faf9', 
                padding: '0.8rem', 
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                color: '#1e6f5c',
                textAlign: 'center'
              }}>
                {dateRange[0].startDate && dateRange[0].endDate 
                  ? `${calculateNights()} night stay`
                  : dateRange[0].startDate
                    ? 'Select check-out date to complete booking'
                    : 'Click to select your check-in and check-out dates'
                }
              </div>
            </div>

            {/* Room Type Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Room Options</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                {selectedHotel.roomTypes.map((rt: any, i: number) => {
                  const selected = i === selectedRoomType;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedRoomType(i)}
                      style={{
                        display:'grid',
                        gridTemplateColumns:'84px 1fr auto',
                        gap:'0.75rem',
                        alignItems:'center',
                        border:'2px solid',
                        borderColor: selected ? '#1e6f5c' : '#eee',
                        borderRadius:'0.9rem',
                        padding:'0.6rem 0.75rem',
                        cursor:'pointer',
                        background: selected ? '#f6faf9' : '#fff'
                      }}
                    >
                      <img src={getRoomImage(selectedHotel, i)} alt={rt.name} style={{ width:84, height:64, objectFit:'cover', borderRadius:'0.6rem' }} />
                      <div>
                        <div style={{ fontWeight:700, color:'#1a2a3a' }}>{rt.name}</div>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4, flexWrap:'wrap' }}>
                          <span style={{ fontSize:'0.85rem', color:'#1e6f5c', background:'#e9f5f2', border:'1px solid #cfece7', borderRadius:6, padding:'0.2rem 0.5rem', fontWeight:700 }}>Sleeps {rt.capacity || 1}</span>
                          <span style={{ fontSize:'0.95rem', color:'#1a2a3a', fontWeight:800 }}>₹{rt.price} <span style={{ color:'#888', fontWeight:500, fontSize:'0.85rem' }}>/night</span></span>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          aria-label={`Select ${rt.name}`}
                          onClick={(e) => { e.stopPropagation(); setSelectedRoomType(i); }}
                          style={{
                            padding:'0.55rem 0.9rem',
                            borderRadius:'0.6rem',
                            background: selected ? 'linear-gradient(135deg, #1e6f5c, #2a9d8f)' : '#fff',
                            color: selected ? '#fff' : '#1e6f5c',
                            border: selected ? 'none' : '2px solid #1e6f5c',
                            fontWeight:700,
                            cursor:'pointer'
                          }}
                        >
                          {selected ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Guests and Rooms */}
            <div style={{ marginBottom: '1.2rem' }}>
              
              {/* Single Line Layout */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '0.8rem'
              }}>
                {/* Guests Selection */}
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.4rem',

                  }}>
                    <label style={{ 
                      fontSize: '1.1rem', 
                      color: '#555', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <span>👥</span>
                      Guests
                    </label>
                    
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: '#f8f9fa',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <button
                      aria-label="decrease guests"
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '6px', 
                        border: '1px solid #1e6f5c', 
                        background: '#fff', 
                        color: '#1e6f5c', 
                        fontSize: '1rem', 
                        cursor: 'pointer',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1e6f5c';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#1e6f5c';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      −
                    </button>
                    
                    <div style={{ 
                      flex: 1, 
                      textAlign: 'center', 
                      padding: '0.4rem', 
                      border: '1px solid #1e6f5c', 
                      borderRadius: '6px', 
                      color: '#1e6f5c', 
                      fontWeight: '700',
                      background: '#fff',
                      fontSize: '0.9rem',
                      minWidth: '40px'
                    }}>
                      {guests}
                    </div>
                    
                    <button
                      aria-label="increase guests"
                      onClick={() => setGuests(g => Math.min(20, g + 1))}
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '6px', 
                        border: '1px solid #1e6f5c', 
                        background: '#fff', 
                        color: '#1e6f5c', 
                        fontSize: '1rem', 
                        cursor: 'pointer',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1e6f5c';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#1e6f5c';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms Selection */}
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '0.4rem'
                  }}>
                    <label style={{ 
                      fontSize: '1.1rem', 
                      color: '#555', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <span>🏠</span>
                      Rooms
                    </label>
                    
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    background: '#f8f9fa',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <button
                      aria-label="decrease rooms"
                      onClick={() => setRooms(r => Math.max(1, r - 1))}
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '6px', 
                        border: '1px solid #1e6f5c', 
                        background: '#fff', 
                        color: '#1e6f5c', 
                        fontSize: '1rem', 
                        cursor: 'pointer',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1e6f5c';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#1e6f5c';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      −
                    </button>
                    
                    <div style={{ 
                      flex: 1, 
                      textAlign: 'center', 
                      padding: '0.4rem', 
                      border: '1px solid #1e6f5c', 
                      borderRadius: '6px', 
                      color: '#1e6f5c', 
                      fontWeight: '700',
                      background: '#fff',
                      fontSize: '0.9rem',
                      minWidth: '40px'
                    }}>
                      {rooms}
                    </div>
                    
                    <button
                      aria-label="increase rooms"
                      onClick={() => setRooms(r => r + 1)}
                      style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '6px', 
                        border: '1px solid #1e6f5c', 
                        background: '#fff', 
                        color: '#1e6f5c', 
                        fontSize: '1rem', 
                        cursor: 'pointer',
                        fontWeight: '700',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1e6f5c';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#1e6f5c';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Capacity Info - Compact */}
              <div style={{ 
                marginTop: '0.6rem',
                padding: '0.5rem',
                background: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px',
                fontSize: '0.75rem',
                color: '#856404',
                lineHeight: '1.2'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontWeight: '600'
                }}>
                  <span>ℹ️</span>
                  <span>Capacity: {selectedHotel.roomTypes[selectedRoomType].name} ({selectedHotel.roomTypes[selectedRoomType].capacity || 1} guests/room)</span>
                </div>
              </div>
            </div>


            {/* Price Summary */}
            <div style={{ 
              background: '#f6faf9', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              marginBottom: '1.5rem',
              border: '2px solid #1e6f5c'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Room Rate:</span>
                <span>
                  ₹{selectedHotel.roomTypes[selectedRoomType].price} × {calculateNights()} nights × {' '}{rooms} room(s)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#333' }}>Total:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e6f5c' }}>
                  ₹{calculateTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #1e6f5c, #2a9d8f)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(30, 111, 92, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Book {rooms} Room Now 
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      {/* Images Modal */}
      {showImagesModal && (
        <div
          onClick={() => setShowImagesModal(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem', zIndex: 2000 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background:'#fff', borderRadius:'1.2rem', maxWidth:1000, width:'100%', maxHeight:'90vh', overflow:'auto', position:'relative', boxShadow:'0 8px 32px rgba(0,0,0,0.25)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              onClick={() => setShowImagesModal(false)}
              style={{ position:'absolute', top:12, right:12, background:'rgba(174, 171, 171, 0.95)', border:'none', width:36, height:36, borderRadius:'50%', cursor:'pointer', fontSize:'1.2rem', boxShadow:'0 2px 8px rgba(0, 0, 0, 0.15)' }}
            >
              ×
            </button>
            <div style={{ padding:'1rem 1.2rem 1.5rem 1.2rem' }}>
              <h3 style={{ margin:'0 0 1rem 0', fontSize:'1.3rem', fontWeight:800, color:'#1a2a3a' }}>All Photos</h3>
              <div style={{ position:'relative' }}>
                <div id="images-queue" ref={imagesQueueRef} style={{ display:'flex', gap:12, overflowX:'auto', padding:'0.5rem 2.5rem', scrollBehavior:'smooth' }}>
                  {[...selectedHotel.images, ...selectedHotel.images].map((src:string, i:number) => (
                    <img key={`queue-${i}`} src={src} alt={`queue-${i}`} style={{ width:240, height:160, objectFit:'cover', borderRadius:'0.8rem', flex:'0 0 auto' }} />
                  ))}
                </div>
                {/* hide native scrollbar */}
                <style>{`
                  #images-queue { scrollbar-width: none; -ms-overflow-style: none; }
                  #images-queue::-webkit-scrollbar { width: 0; height: 0; }
                `}</style>
                {/* custom slider linked to queue scroll */}
                <div style={{ padding:'0.6rem 2.5rem 0 2.5rem' }}>
                  <div style={{ position:'relative', height:28 }}>
                    <div
                      style={{
                        position:'absolute',
                        top:'50%', left:0, right:0, height:2,
                        background:`linear-gradient(90deg, #222 ${queueMax ? (queueVal/queueMax)*100 : 0}%, #eee ${queueMax ? (queueVal/queueMax)*100 : 0}%)`,
                        transform:'translateY(-50%)'
                      }}
                    />
                    <input
                      type="range"
                      min={0}
                      max={queueMax || 1}
                      value={queueVal}
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setQueueVal(v);
                        const el = imagesQueueRef.current;
                        if (el) el.scrollTo({ left: v, behavior: 'smooth' });
                      }}
                      style={{
                        appearance:'none', WebkitAppearance:'none', width:'100%', background:'transparent', position:'absolute', top:0, left:0, right:0, height:28, cursor:'pointer'
                      }}
                      aria-label="images queue position"
                    />
                    <div
                      style={{ position:'absolute', top:'50%', left:`${queueMax ? (queueVal/queueMax)*100 : 0}%`, transform:'translate(-50%, -50%)', width:34, height:34, background:'#fff', borderRadius:'50%', boxShadow:'0 4px 14px rgba(0,0,0,0.25)' }}
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </main>
    </div>
  );
} 