'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import LoginPopup from '@/components/LoginPopup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const mockTrips = [
  {
    id: 'golden-triangle',
    name: 'Golden Triangle Tour',
    type: 'Cultural',
    price: 25000,
    basePrice: 25000,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Experience the rich cultural heritage of India with our Golden Triangle Tour.',
    highlights: ['Taj Mahal Visit', 'Amber Fort', 'Red Fort', 'Qutub Minar', 'City Palace', 'Hawa Mahal'],
    itinerary: ['Day 1-2: Delhi Exploration', 'Day 3-4: Agra & Taj Mahal', 'Day 5-7: Jaipur & Amber Fort'],
    customizationOptions: {
      duration: [
        { label: '5 Days, 4 Nights', price: 20000 },
        { label: '7 Days, 6 Nights', price: 25000 },
        { label: '10 Days, 9 Nights', price: 35000 }
      ],
      accommodation: [
        { label: 'Budget Hotels', price: 0 },
        { label: '3-Star Hotels', price: 5000 },
        { label: '5-Star Hotels', price: 15000 }
      ],
      hotels: [
        { label: 'No Hotel Included', price: 0 },
        { label: 'The Grand Palace (Jaipur)', price: 8000 },
        { label: 'Seaside Resort (Goa)', price: 6000 },
        { label: 'Mountain View Inn (Manali)', price: 5000 },
        { label: 'City Lights Hotel (Mumbai)', price: 10000 }
      ],
      transportation: [
        { label: 'AC Bus', price: 0 },
        { label: 'AC Car', price: 3000 },
        { label: 'Luxury Coach', price: 8000 }
      ],
      meals: [
        { label: 'None', price: 0 },
        { label: 'Breakfast Only', price: 0 },
        { label: 'Half Board (Breakfast + Dinner)', price: 2000 },
        { label: 'Full Board (All Meals)', price: 4000 }
      ],
      activities: [
        { label: 'None', price: 0 },
        { label: 'Basic Sightseeing', price: 0 },
        { label: 'Guided Tours', price: 1500 },
        { label: 'Premium Experiences', price: 3000 }
      ]
    }
  },
  {
    id: 'himalayan-adventure',
    name: 'Himalayan Adventure',
    type: 'Adventure',
    price: 32000,
    basePrice: 32000,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Embark on an unforgettable adventure in the majestic Himalayas.',
    highlights: ['Mountain Trekking', 'Camping Under Stars', 'River Rafting', 'Village Visits', 'Sunrise Views', 'Local Cuisine'],
    itinerary: ['Day 1-3: Acclimatization & Base Camp', 'Day 4-7: Trekking & Camping', 'Day 8-10: Adventure Activities'],
    customizationOptions: {
      duration: [
        { label: '7 Days, 6 Nights', price: 25000 },
        { label: '10 Days, 9 Nights', price: 32000 },
        { label: '14 Days, 13 Nights', price: 45000 }
      ],
      accommodation: [
        { label: 'Camping', price: 0 },
        { label: 'Guest Houses', price: 3000 },
        { label: 'Mountain Resorts', price: 8000 }
      ],
      hotels: [
        { label: 'No Hotel Included', price: 0 },
        { label: 'The Grand Palace (Jaipur)', price: 8000 },
        { label: 'Seaside Resort (Goa)', price: 6000 },
        { label: 'Mountain View Inn (Manali)', price: 5000 },
        { label: 'City Lights Hotel (Mumbai)', price: 10000 }
      ],
      transportation: [
        { label: 'Local Transport', price: 0 },
        { label: 'Private Vehicle', price: 5000 },
        { label: 'Helicopter Transfer', price: 15000 }
      ],
      meals: [
        { label: 'None', price: 0 },
        { label: 'Basic Meals', price: 0 },
        { label: 'Nutritious Meals', price: 2500 },
        { label: 'Gourmet Meals', price: 5000 }
      ],
      activities: [
        { label: 'None', price: 0 },
        { label: 'Basic Trekking', price: 0 },
        { label: 'Adventure Sports', price: 3000 },
        { label: 'Premium Experiences', price: 6000 }
      ]
    }
  },
  {
    id: 'goa-beach-escape',
    name: 'Goa Beach Escape',
    type: 'Leisure',
    price: 18000,
    basePrice: 18000,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Relax and rejuvenate in the tropical paradise of Goa.',
    highlights: ['Beach Hopping', 'Water Sports', 'Nightlife', 'Seafood Dining', 'Church Visits', 'Spice Plantation'],
    itinerary: ['Day 1: Arrival & Beach Relaxation', 'Day 2-3: Beach Activities & Water Sports', 'Day 4: Sightseeing & Nightlife', 'Day 5: Departure'],
    customizationOptions: {
      duration: [
        { label: '3 Days, 2 Nights', price: 12000 },
        { label: '5 Days, 4 Nights', price: 18000 },
        { label: '7 Days, 6 Nights', price: 25000 }
      ],
      accommodation: [
        { label: 'Beach Huts', price: 0 },
        { label: '3-Star Resorts', price: 3000 },
        { label: '5-Star Beach Resorts', price: 10000 }
      ],
      hotels: [
        { label: 'No Hotel Included', price: 0 },
        { label: 'The Grand Palace (Jaipur)', price: 8000 },
        { label: 'Seaside Resort (Goa)', price: 6000 },
        { label: 'Mountain View Inn (Manali)', price: 5000 },
        { label: 'City Lights Hotel (Mumbai)', price: 10000 }
      ],
      transportation: [
        { label: 'Local Transport', price: 0 },
        { label: 'AC Car', price: 2000 },
        { label: 'Luxury Vehicle', price: 5000 }
      ],
      meals: [
        { label: 'None', price: 0 },
        { label: 'Breakfast Only', price: 0 },
        { label: 'Half Board', price: 1500 },
        { label: 'All Inclusive', price: 3000 }
      ],
      activities: [
        { label: 'None', price: 0 },
        { label: 'Basic Activities', price: 0 },
        { label: 'Water Sports Package', price: 2000 },
        { label: 'Premium Experiences', price: 4000 }
      ]
    }
  }
];

// StarBlock component for displaying ratings
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

// Hotel details data
const hotelDetails = {
  'The Grand Palace (Jaipur)': {
    name: 'The Grand Palace',
    location: 'Jaipur, India',
    rating: 4.7,
    price: '₹8,000/night',
    description: 'Experience luxury and comfort at The Grand Palace, located in the heart of Jaipur.',
    amenities: ['Free WiFi', 'Breakfast Included', 'Swimming Pool', 'Spa & Wellness', 'Restaurant', 'Room Service'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ]
  },
  'Seaside Resort (Goa)': {
    name: 'Seaside Resort',
    location: 'Goa, India',
    rating: 4.5,
    price: '₹6,000/night',
    description: 'Escape to paradise at Seaside Resort, where pristine beaches meet luxury accommodation.',
    amenities: ['Beach Access', 'Swimming Pool', 'Beach Bar', 'Water Sports', 'Spa', 'Restaurant'],
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ]
  },
  'Mountain View Inn (Manali)': {
    name: 'Mountain View Inn',
    location: 'Manali, India',
    rating: 4.2,
    price: '₹5,000/night',
    description: 'Nestled in the Himalayas, Mountain View Inn offers breathtaking views and cozy accommodations.',
    amenities: ['Mountain View', 'Free Parking', 'Bonfire', 'Adventure Tours', 'Restaurant', 'Free WiFi'],
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ]
  },
  'City Lights Hotel (Mumbai)': {
    name: 'City Lights Hotel',
    location: 'Mumbai, India',
    rating: 4.9,
    price: '₹10,000/night',
    description: 'Experience the vibrant energy of Mumbai from the comfort of City Lights Hotel.',
    amenities: ['Rooftop Bar', 'Gym Access', 'Business Center', 'Restaurant', 'Free WiFi', 'Air Conditioning'],
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ]
  }
};

export default function CustomizeTripPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [customizations, setCustomizations] = useState({
    duration: 0,
    accommodation: 0,
    hotels: 0,
    transportation: 0,
    meals: [] as number[],
    activities: [] as number[]
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, checkLoginStatus } = useCart();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<any>(null);
  const [tripDate, setTripDate] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showHotelInfo, setShowHotelInfo] = useState(false);
  const [selectedHotelInfo, setSelectedHotelInfo] = useState<any>(null);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.start-date-picker-container')) {
        setShowStartDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const trip = mockTrips.find(t => t.id === tripId);
    if (trip) {
      setSelectedTrip(trip);
    } else {
      router.push('/customize-trip');
    }
  }, [tripId, router]);

  useEffect(() => {
    if (selectedTrip) {
      document.body.style.overflow = 'unset';
    }
  }, [selectedTrip]);

  if (!selectedTrip) {
    return (
      <div style={{ padding: '3rem 2vw', textAlign: 'center' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    const durationPrice = selectedTrip.customizationOptions.duration[customizations.duration]?.price || 0;
    const accommodationPrice = selectedTrip.customizationOptions.accommodation[customizations.accommodation]?.price || 0;
    const hotelPrice = selectedTrip.customizationOptions.hotels[customizations.hotels]?.price || 0;
    const transportationPrice = selectedTrip.customizationOptions.transportation[customizations.transportation]?.price || 0;
    const mealsPrice = customizations.meals.reduce((sum: number, index: number) => 
      sum + (selectedTrip.customizationOptions.meals[index]?.price || 0), 0);
    const activitiesPrice = customizations.activities.reduce((sum: number, index: number) => 
      sum + (selectedTrip.customizationOptions.activities[index]?.price || 0), 0);
    
    return durationPrice + accommodationPrice + hotelPrice + transportationPrice + mealsPrice + activitiesPrice;
  };

  const handleCustomizationChange = (category: string, index: number) => {
    setCustomizations(prev => ({
      ...prev,
      [category]: index
    }));
  };

  const handleBookNow = () => {
    alert('Booking functionality will be implemented here!');
  };

  const handleAddToCart = () => {
    if (!tripDate) {
      alert('Please select a start date for your trip');
      return;
    }
    
    const cartItem = {
      id: `${selectedTrip.id}-${customizations.duration}-${customizations.accommodation}-${customizations.hotels}-${customizations.transportation}-${customizations.meals.join(',')}-${customizations.activities.join(',')}-${tripDate}`,
      type: 'trip' as const,
      name: selectedTrip.name,
      price: calculateTotalPrice(),
      image: selectedTrip.images[0],
      details: {
        duration: selectedTrip.customizationOptions.duration[customizations.duration]?.label,
        accommodation: selectedTrip.customizationOptions.accommodation[customizations.accommodation]?.label,
        hotel: selectedTrip.customizationOptions.hotels[customizations.hotels]?.label,
        transportation: selectedTrip.customizationOptions.transportation[customizations.transportation]?.label,
        meals: customizations.meals.length > 0 
          ? customizations.meals.map((index: number) => selectedTrip.customizationOptions.meals[index]?.label).filter(Boolean).join(', ')
          : 'None',
        activities: customizations.activities.length > 0 
          ? customizations.activities.map((index: number) => selectedTrip.customizationOptions.activities[index]?.label).filter(Boolean).join(', ')
          : 'None',
        tripDate: tripDate ? new Date(tripDate).toLocaleDateString() : undefined,
        tripEndDate: undefined // Removed tripEndDate from cart item
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

  const handleHotelInfo = (hotelName: string) => {
    const hotelData = hotelDetails[hotelName as keyof typeof hotelDetails];
    if (hotelData) {
      setSelectedHotelInfo(hotelData);
      setShowHotelInfo(true);
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
          ← Back to Trips
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#7A6B57', margin: 0 }}>
          Customize {selectedTrip.name}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left: Trip Details */}
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
                src={selectedTrip.images[currentImageIndex]}
                alt={selectedTrip.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
                {selectedTrip.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      background: currentImageIndex === index ? '#7A6B57' : 'rgba(255, 255, 255, 0.6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7A6B57', marginBottom: '0.5rem' }}>
              {selectedTrip.name}
            </h2>
            <p style={{ color: '#666', marginBottom: '1rem' }}>{selectedTrip.description}</p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {selectedTrip.highlights.slice(0, 3).map((highlight: string, index: number) => (
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
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Customization Form */}
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
              Customize Your Trip
            </h2>

            {/* Duration */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Duration</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTrip.customizationOptions.duration.map((option: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="duration"
                      checked={customizations.duration === index}
                      onChange={() => handleCustomizationChange('duration', index)}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <span style={{ flex: 1 }}>{option.label}</span>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>+₹{option.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accommodation */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Accommodation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTrip.customizationOptions.accommodation.map((option: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="accommodation"
                      checked={customizations.accommodation === index}
                      onChange={() => handleCustomizationChange('accommodation', index)}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <span style={{ flex: 1 }}>{option.label}</span>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>+₹{option.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hotel Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Select Hotel</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTrip.customizationOptions.hotels.map((option: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="hotels"
                      checked={customizations.hotels === index}
                      onChange={() => handleCustomizationChange('hotels', index)}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>{option.label}</span>
                      {option.label !== 'No Hotel Included' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleHotelInfo(option.label);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#7A6B57',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: '0.2rem',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(122,107,87,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none';
                          }}
                          title="View hotel details"
                        >
                          ℹ️
                        </button>
                      )}
                    </div>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>+₹{option.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transportation */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Transportation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTrip.customizationOptions.transportation.map((option: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="transportation"
                      checked={customizations.transportation === index}
                      onChange={() => handleCustomizationChange('transportation', index)}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <span style={{ flex: 1 }}>{option.label}</span>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>+₹{option.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Meals */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Meals</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTrip.customizationOptions.meals.map((option: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={customizations.meals.includes(index)}
                      onChange={() => {
                        setCustomizations(prev => ({
                          ...prev,
                          meals: prev.meals.includes(index)
                            ? prev.meals.filter(i => i !== index)
                            : [...prev.meals, index]
                        }));
                      }}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <span style={{ flex: 1 }}>{option.label}</span>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>+₹{option.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Activities</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedTrip.customizationOptions.activities.map((option: any, index: number) => (
                  <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={customizations.activities.includes(index)}
                      onChange={() => {
                        setCustomizations(prev => ({
                          ...prev,
                          activities: prev.activities.includes(index)
                            ? prev.activities.filter(i => i !== index)
                            : [...prev.activities, index]
                        }));
                      }}
                      style={{ accentColor: '#7A6B57' }}
                    />
                    <span style={{ flex: 1 }}>{option.label}</span>
                    <span style={{ color: '#f29927', fontWeight: 600 }}>+₹{option.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Trip Date Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>Trip Date</h3>
              <div style={{ marginBottom: '1rem' }}>
                <div className="start-date-picker-container" style={{ position: 'relative' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '0.3rem' }}>Start Date *</label>
                  <button
                    onClick={() => setShowStartDatePicker(!showStartDatePicker)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #7A6B57',
                      borderRadius: '0.5rem',
                      background: '#fff',
                      color: tripDate ? '#7A6B57' : '#999',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {tripDate 
                      ? new Date(tripDate).toLocaleDateString()
                      : 'Select start date'
                    }
                  </button>
                  {showStartDatePicker && (
                    <div style={{ 
                      position: 'absolute', 
                      zIndex: 1000, 
                      background: '#fff', 
                      borderRadius: '0.5rem', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      marginTop: '0.5rem',
                      border: '2px solid #7A6B57'
                    }}>
                      <DatePicker
                        selected={tripDate ? new Date(tripDate) : null}
                        onChange={(date) => {
                          setTripDate(date ? date.toISOString().split('T')[0] : '');
                          setShowStartDatePicker(false);
                        }}
                        minDate={new Date()}
                        inline
                        dateFormat="MMM dd, yyyy"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div style={{ 
                background: '#fdf6f3', 
                padding: '0.8rem', 
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                color: '#7A6B57',
                textAlign: 'center'
              }}>
                {tripDate 
                  ? `Trip starts on ${new Date(tripDate).toLocaleDateString()}`
                  : 'Please select your trip start date'
                }
              </div>
            </div>

            {/* Total Price */}
            <div style={{ 
              background: '#E2B89B', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              marginBottom: '1.5rem',
              border: '2px solid #7A6B57'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Price Breakdown</h3>
              
              {/* Duration Price */}
              {selectedTrip.customizationOptions.duration[customizations.duration]?.price > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#7A6B57' }}>{selectedTrip.customizationOptions.duration[customizations.duration]?.label}:</span>
                  <span style={{ color: '#7A6B57', fontWeight: 600 }}>+₹{selectedTrip.customizationOptions.duration[customizations.duration]?.price.toLocaleString()}</span>
                </div>
              )}

              {/* Accommodation Price */}
              {selectedTrip.customizationOptions.accommodation[customizations.accommodation]?.price > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#7A6B57' }}>{selectedTrip.customizationOptions.accommodation[customizations.accommodation]?.label}:</span>
                  <span style={{ color: '#7A6B57', fontWeight: 600 }}>+₹{selectedTrip.customizationOptions.accommodation[customizations.accommodation]?.price.toLocaleString()}</span>
                </div>
              )}

              {/* Hotel Price */}
              {selectedTrip.customizationOptions.hotels[customizations.hotels]?.price > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#7A6B57' }}>{selectedTrip.customizationOptions.hotels[customizations.hotels]?.label}:</span>
                  <span style={{ color: '#7A6B57', fontWeight: 600 }}>+₹{selectedTrip.customizationOptions.hotels[customizations.hotels]?.price.toLocaleString()}</span>
                </div>
              )}

              {/* Transportation Price */}
              {selectedTrip.customizationOptions.transportation[customizations.transportation]?.price > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#7A6B57' }}>{selectedTrip.customizationOptions.transportation[customizations.transportation]?.label}:</span>
                  <span style={{ color: '#7A6B57', fontWeight: 600 }}>+₹{selectedTrip.customizationOptions.transportation[customizations.transportation]?.price.toLocaleString()}</span>
                </div>
              )}

              {/* Meals Prices */}
              {customizations.meals.length > 0 && customizations.meals.map((mealIndex: number) => {
                const meal = selectedTrip.customizationOptions.meals[mealIndex];
                if (meal && meal.price > 0) {
                  return (
                    <div key={mealIndex} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#7A6B57' }}>{meal.label}:</span>
                      <span style={{ color: '#7A6B57', fontWeight: 600 }}>+₹{meal.price.toLocaleString()}</span>
                    </div>
                  );
                }
                return null;
              })}

              {/* Activities Prices */}
              {customizations.activities.length > 0 && customizations.activities.map((activityIndex: number) => {
                const activity = selectedTrip.customizationOptions.activities[activityIndex];
                if (activity && activity.price > 0) {
                  return (
                    <div key={activityIndex} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#7A6B57' }}>{activity.label}:</span>
                      <span style={{ color: '#7A6B57', fontWeight: 600 }}>+₹{activity.price.toLocaleString()}</span>
                    </div>
                  );
                }
                return null;
              })}

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #7A6B57', paddingTop: '1rem', marginTop: '1rem' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57' }}>Total Price:</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7A6B57' }}>
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
                onClick={handleBookNow}
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
                Book Customized Trip
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hotel Info Popup */}
      {showHotelInfo && selectedHotelInfo && (
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
          onClick={() => setShowHotelInfo(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '1.5rem',
              maxWidth: '600px',
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
              onClick={() => setShowHotelInfo(false)}
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

            {/* Hotel Image */}
            <div style={{ position: 'relative', height: '200px', borderRadius: '1.5rem 1.5rem 0 0', overflow: 'hidden' }}>
              <img
                src={selectedHotelInfo.images[0]}
                alt={selectedHotelInfo.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Price Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#f29927',
                color: '#fff',
                fontWeight: 800,
                fontSize: '1rem',
                borderRadius: '1rem',
                padding: '0.5rem 1rem',
                boxShadow: '0 2px 8px rgba(242,153,39,0.4)',
              }}>
                {selectedHotelInfo.price}
              </div>
            </div>

            {/* Hotel Content */}
            <div style={{ padding: '2rem' }}>
              {/* Header */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7A6B57', margin: 0 }}>{selectedHotelInfo.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <StarBlock rating={selectedHotelInfo.rating} />
                    <span style={{ fontWeight: 700, color: '#222', fontSize: '1rem' }}>{selectedHotelInfo.rating}</span>
                  </div>
                </div>
                <div style={{ color: '#666', fontSize: '1rem', fontWeight: 500 }}>{selectedHotelInfo.location}</div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{selectedHotelInfo.description}</p>
              </div>

              {/* Amenities */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Amenities</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {selectedHotelInfo.amenities.map((amenity: string, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                      <span style={{ color: '#f29927', fontSize: '1.1em' }}>✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setShowHotelInfo(false)}
                  style={{
                    padding: '1rem 2rem',
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
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Popup */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </main>
  );
} 