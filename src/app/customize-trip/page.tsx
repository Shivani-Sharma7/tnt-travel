'use client';
import React, { useState, useEffect, useRef } from 'react';

// Mock trips data
const mockTrips: any[] = [
  {
    name: 'Trip to Mathura, Vrindavan',
    type: 'Traditional',
    price: 28000,
    duration: '2N/3D',
    rating: 4.7,
    amenities: ['Intercity Car Transfers', '3-Star Hotels', 'Selected Meals', 'Activities'],
    images: [
      "/elements/vrindavan.jpg",
      "/elements/premmindir.jpg",
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Mathura, Vrindavan', '2N/3D trip'],
    description: 'Experience the divine journey to the holy cities of Mathura and Vrindavan with comfortable intercity car transfers, quality 3-star hotel accommodations, selected meals, and engaging activities. Perfect for spiritual seekers and cultural enthusiasts.',
    highlights: ['Krishna Janmasthan Temple', 'Banke Bihari Temple', 'Prem Mandir', 'Radha Raman Temple', 'Govind Dev Temple', 'Sacred Ghats'],
    itinerary: ['Day 1: Arrival & Mathura Temples', 'Day 2: Vrindavan Exploration', 'Day 3: Departure'],
    inclusions: ['Intercity Car Transfers', '3-Star Hotel Accommodation', 'Selected Meals', 'Guided Activities', 'Temple Entries', 'Airport Transfers'],
    exclusions: ['Personal Expenses', 'Optional Activities', 'Travel Insurance', 'Tips'],
  },
  {
    name: 'Trip to Mathura, Vrindavan',
    type: 'Luxury',
    price: 55000,
    duration: '2N/3D',
    rating: 4.9,
    amenities: ['Luxury Car Transfers', '5-Star Hotels', 'All Meals', 'Premium Activities'],
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Mathura, Vrindavan', '2N/3D trip'],
    description: 'Experience the divine journey to the holy cities of Mathura and Vrindavan with luxury car transfers, premium 5-star hotel accommodations, all meals included, and exclusive premium activities. Perfect for luxury spiritual seekers.',
    highlights: ['Krishna Janmasthan Temple', 'Banke Bihari Temple', 'Prem Mandir', 'Radha Raman Temple', 'Govind Dev Temple', 'Sacred Ghats'],
    itinerary: ['Day 1: Arrival & Mathura Temples', 'Day 2: Vrindavan Exploration', 'Day 3: Departure'],
    inclusions: ['Luxury Car Transfers', '5-Star Hotel Accommodation', 'All Meals (Premium)', 'Premium Guided Activities', 'Temple Entries', 'Airport Transfers'],
    exclusions: ['Personal Expenses', 'Optional Activities', 'Travel Insurance', 'Tips'],
  },
  {
    name: 'Trip to Mathura, Vrindavan',
    type: 'Budget',
    price: 15000,
    duration: '2N/3D',
    rating: 4.5,
    amenities: ['Local Transport', 'Budget Hotels', 'Breakfast Only', 'Basic Activities'],
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Mathura, Vrindavan', '2N/3D trip'],
    description: 'Experience the divine journey to the holy cities of Mathura and Vrindavan with local transport, comfortable budget hotel accommodations, breakfast included, and basic activities. Perfect for budget-conscious spiritual seekers.',
    highlights: ['Krishna Janmasthan Temple', 'Banke Bihari Temple', 'Prem Mandir', 'Radha Raman Temple', 'Govind Dev Temple', 'Sacred Ghats'],
    itinerary: ['Day 1: Arrival & Mathura Temples', 'Day 2: Vrindavan Exploration', 'Day 3: Departure'],
    inclusions: ['Local Transport', 'Budget Hotel Accommodation', 'Breakfast Only', 'Basic Guided Activities', 'Temple Entries', 'Airport Pickup'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses', 'Optional Activities', 'Travel Insurance'],
  },
  // New Banaras trip
  {
    name: 'City View Room',
    type: 'Traditional',
    price: 110,
    duration: '1N/2D',
    rating: 4.7,
    amenities: ['Near Ghat', 'Cafe'],
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=facearea&w=800&q=80',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=facearea&w=800&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3aa1?auto=format&fit=facearea&w=800&q=80'
    ],
    features: ['Banaras', '1N/2D'],
    description: 'Stay close to the ghats with easy access to Dashashwamedh Ghat and local cafes. Perfect for witnessing the Ganga Aarti and exploring the old city lanes.',
    highlights: ['Ganga Aarti', 'Dashashwamedh Ghat', 'Local Cafe', 'Boat Ride'],
    itinerary: ['Day 1: Ghats & Aarti', 'Day 2: Old City Walk'],
    inclusions: ['Local Transfers', 'Standard Hotel', 'Breakfast'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses']
  },
  {
    name: 'City View Room',
    type: 'Luxury',
    price: 180,
    duration: '1N/2D',
    rating: 4.8,
    amenities: ['Luxury Car Transfers', '5-Star Hotel', 'All Meals', 'Private Boat'],
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=facearea&w=800&q=80',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=facearea&w=800&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3aa1?auto=format&fit=facearea&w=800&q=80'
    ],
    features: ['Banaras', '1N/2D'],
    description: 'Premium Banaras stay with luxury transfers, 5-star accommodation, curated meals, and a private boat ride for Ganga Aarti.',
    highlights: ['Private Boat at Aarti', '5-Star Stay', 'Chauffeur Service'],
    itinerary: ['Day 1: Luxury Aarti Experience', 'Day 2: Heritage Tour'],
    inclusions: ['Luxury Transfers', '5-Star Hotel', 'All Meals'],
    exclusions: ['Personal Expenses']
  },
  {
    name: 'City View Room',
    type: 'Budget',
    price: 95,
    duration: '1N/2D',
    rating: 4.4,
    amenities: ['Local Transport', 'Budget Hotel', 'Breakfast Only'],
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=facearea&w=800&q=80',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=facearea&w=800&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3aa1?auto=format&fit=facearea&w=800&q=80'
    ],
    features: ['Banaras', '1N/2D'],
    description: 'Affordable Banaras experience with clean budget hotel, local transfers, and breakfast included.',
    highlights: ['Aarti Visit', 'Budget Stay'],
    itinerary: ['Day 1: Ghats & Markets', 'Day 2: Morning Boat Ride'],
    inclusions: ['Local Transfers', 'Budget Hotel', 'Breakfast'],
    exclusions: ['Lunch & Dinner']
  }
];

// Hero section images
const heroImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80'
  }
];

// Helper components
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

function TripImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i+1)%images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div
      style={{position:'relative',width:'100%',height:150,display:'flex',alignItems:'center',justifyContent:'center',background:'#f9f6f2'}}
      onMouseEnter={() => setIdx(i => (i+1)%images.length)}
    >
      <img src={images[idx]} alt="Trip" style={{
        width: '90%',
        height: 140,
        objectFit: 'cover',
        borderRadius: '1rem',
        marginBlock: '1rem',
        marginInline: 'auto',
        transition: 'transform 0.35s cubic-bezier(1,5,1,1)',
        boxShadow: '0 2px 12px #A67B5B22',
      }} />
      <div style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
        {images.map((_,i) => (
          <span
            key={i}
            onClick={e => {e.stopPropagation(); setIdx(i);}}
            style={{width:7,height:7,borderRadius:'50%',background:idx===i?'#A67B5B':'#e0c97c',display:'inline-block',cursor:'pointer',transition:'background 0.2s'}}
          />
        ))}
      </div>
    </div>
  );
}

function TripDetailsModal({ trip, isOpen, onClose }: { trip: any; isOpen: boolean; onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '1.5rem',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: 'slideIn 0.3s ease-out',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: '#666',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ×
        </button>

        {/* Image Carousel */}
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden', borderRadius: '1.5rem 1.5rem 0 0' }}>
          <img
            src={trip.images[currentImageIndex]}
            alt={trip.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Image Navigation */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
            {trip.images.map((_: string, index: number) => (
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
          {/* Price Badge */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#d48166',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.2rem',
            borderRadius: '1.2rem',
            padding: '0.5rem 1.2rem',
            boxShadow: '0 2px 8px rgba(212, 129, 102, 0.4)',
          }}>
            ₹{trip.price}
            <span style={{
              fontSize: '0.8rem',
              color: '#fff',
              fontWeight: 500,
              marginLeft: '0.5rem'
            }}>
              (per person)
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#A67B5B', margin: 0 }}>{trip.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StarBlock rating={trip.rating} />
                <span style={{ fontWeight: 700, color: '#222', fontSize: '1.1rem' }}>{trip.rating}</span>
              </div>
            </div>
            <div style={{ color: '#666', fontSize: '1.1rem', fontWeight: 500 }}>{trip.type} Package</div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{trip.description}</p>
          </div>

          {/* Highlights */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#A67B5B', marginBottom: '1rem' }}>Highlights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {trip.highlights.map((highlight: string, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                  <span style={{ color: '#d48166', fontSize: '1.1em' }}>✓</span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#A67B5B', marginBottom: '1rem' }}>Itinerary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {trip.itinerary.map((day: string, index: number) => (
                <div key={index} style={{ color: '#666', fontSize: '0.95rem' }}>
                  <span style={{ color: '#d48166', marginRight: '0.5rem' }}>•</span>
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#A67B5B', marginBottom: '1rem' }}>Inclusions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {trip.inclusions.map((inclusion: string, index: number) => (
                  <div key={index} style={{ color: '#666', fontSize: '0.95rem' }}>
                    <span style={{ color: '#d48166', marginRight: '0.5rem' }}>✓</span>
                    {inclusion}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#A67B5B', marginBottom: '1rem' }}>Exclusions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {trip.exclusions.map((exclusion: string, index: number) => (
                  <div key={index} style={{ color: '#666', fontSize: '0.95rem' }}>
                    <span style={{ color: '#d48166', marginRight: '0.5rem' }}>✗</span>
                    {exclusion}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>

            <button
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '1rem',
                background: '#fff',
                color: '#A67B5B',
                fontWeight: 700,
                border: '2px solid #A67B5B',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function CustomizeTripPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Traditional');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPersons, setSelectedPersons] = useState<number>(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 100000 },
    duration: { min: 0, max: 10 },
    rating: { min: 0, max: 5 },
    amenities: {
      hotel: false,
      transport: false,
      guide: false,
      meals: false,
      spa: false,
      camping: false,
      equipment: false,
      safetyGear: false,
    },
    showFilters: false,
  });

  // Auto-rotate background and cards every 6 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 800); // Increased transition duration for smoother movement
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Manual navigation
  const goToImage = (index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
      // Restart auto-rotation
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
          setIsTransitioning(false);
        }, 800);
      }, 6000);
    }, 800);
  };

  const currentImage = heroImages[currentImageIndex];
  const visibleCards = heroImages.slice(currentImageIndex).concat(heroImages.slice(0, currentImageIndex)).slice(0, 5);
  
  // The leftmost card (index 0 in visibleCards) should be the background
  const backgroundImage = visibleCards[0];

  // Filter functions
  const toggleFilter = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: !prev.amenities[amenity as keyof typeof prev.amenities]
      }
    }));
  };

  const updatePriceRange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };

  const updateDurationRange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      duration: { min, max }
    }));
  };

  const updateRatingRange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      rating: { min, max }
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 100000 },
      duration: { min: 0, max: 10 },
      rating: { min: 0, max: 5 },
      amenities: {
        hotel: false,
        transport: false,
        guide: false,
        meals: false,
        spa: false,
        camping: false,
        equipment: false,
        safetyGear: false,
      },
      showFilters: false,
    });
  };

  // Filter trips based on current filters
  const filteredTrips = mockTrips.filter(trip => {
    // Location filter
    if (selectedLocation) {
      const inMathuraVrindavan = /mathura|vrindavan/i.test(trip.features.join(' ') + ' ' + trip.name + ' ' + trip.description);
      const inBanaras = /banaras|varanasi/i.test(trip.features.join(' ') + ' ' + trip.name + ' ' + trip.description);
      if (selectedLocation === 'Mathura/Vrindavan' && !inMathuraVrindavan) return false;
      if (selectedLocation === 'Banaras' && !inBanaras) return false;
    }
    // Price filter
    if (trip.price < filters.priceRange.min || trip.price > filters.priceRange.max) return false;
    
    // Duration filter
    const tripDuration = parseInt(trip.duration.split('/')[0].replace(/\D/g, ''));
    if (tripDuration < filters.duration.min || tripDuration > filters.duration.max) return false;
    
    // Rating filter
    if (trip.rating < filters.rating.min || trip.rating > filters.rating.max) return false;
    
    // Amenities filter
    const activeAmenities = Object.entries(filters.amenities)
      .filter(([_, isActive]) => isActive)
      .map(([amenity, _]) => amenity);
    
    if (activeAmenities.length > 0) {
      const tripAmenities = trip.amenities.map((a: string) => a.toLowerCase());
      const hasRequiredAmenity = activeAmenities.some((amenity: string) => 
        tripAmenities.some((tripAmenity: string) => 
          tripAmenity.includes(amenity.toLowerCase())
        )
      );
      if (!hasRequiredAmenity) return false;
    }
    
    return true;
  });

  // Trip-related functions
  const handleViewDetails = (trip: any) => {
    console.log('View Details clicked for:', trip.name);
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Hero Section with Rotating Background */}
      <section style={{
        position: 'relative',
        height: '70vh',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${backgroundImage.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: isTransitioning ? 'opacity 0.8s ease-in-out' : 'opacity 0.5s ease-in-out',
          opacity: isTransitioning ? 0.7 : 1
        }} />

        {/* Content Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '2rem'
        }}>
          <div style={{
            textAlign: 'left',
            color: '#fff',
            maxWidth: '600px',
            marginLeft: '4rem'
          }}>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 900,
              marginBottom: '1.5rem',
              textShadow: '0 3px 12px rgba(0,0,0,0.6)',
              lineHeight: 1.1
            }}>
              Trips for Every Budget
            </h1>
            <p style={{
              fontSize: '1.6rem',
              fontWeight: 400,
              lineHeight: 1.5,
              marginBottom: '0',
              textShadow: '0 2px 6px rgba(0,0,0,0.5)',
              opacity: 0.95
            }}>
              We are having trips in every budget with multiple activities and tradition and cultural trip also
            </p>
          </div>
        </div>

                {/* Card Carousel - Bottom Right */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          display: 'flex',
          gap: '1rem',
          zIndex: 20
        }}>
          {/* Left Card - Becomes Background */}
          <div
            key={visibleCards[0].id}
            style={{
              width: '120px',
              height: '80px',
              borderRadius: '1rem',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.8s ease-in-out',
              transform: isTransitioning ? 'scale(3) translateX(-50%) translateY(-50%)' : 'scale(1)',
              border: '3px solid #f29927',
              position: 'relative',
              zIndex: isTransitioning ? 30 : 20,
              opacity: isTransitioning ? 0 : 1
            }}
            onClick={() => goToImage(currentImageIndex)}
            onMouseEnter={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.transform = 'scale(1.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isTransitioning) {
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <img
              src={visibleCards[0].image}
              alt={`Hero image ${visibleCards[0].id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '0.5rem',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 600
            }}>
              Image {visibleCards[0].id}
            </div>
          </div>
          
          {/* Other Cards */}
          {visibleCards.slice(1).map((card, index) => (
            <div
              key={card.id}
              style={{
                width: '120px',
                height: '80px',
                borderRadius: '1rem',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.8s ease-in-out',
                transform: 'scale(1)',
                border: '2px solid rgba(255,255,255,0.3)',
                position: 'relative',
                zIndex: 20,
                opacity: 1
              }}
              onClick={() => goToImage((currentImageIndex + index + 1) % heroImages.length)}
              onMouseEnter={(e) => {
                if (!isTransitioning) {
                  e.currentTarget.style.transform = 'scale(1.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isTransitioning) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <img
                src={card.image}
                alt={`Hero image ${card.id}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundImage: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                padding: '0.5rem',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 600
              }}>
                Image {card.id}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToImage((currentImageIndex - 1 + heroImages.length) % heroImages.length)}
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 20,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        <button
          onClick={() => goToImage((currentImageIndex + 1) % heroImages.length)}
            style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: 20,
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>


      </section>

      {/* Filter Section */}
      
          
       

            {/* Trip Categories Section */}
      <section style={{
        padding: '4rem 2rem',
        background: '#e0e0e0'
      }}>
        
        {/* Combined Category and Location Selectors */}
        <div style={{
          width: '100%',
          margin: '0 auto 3rem auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Location Selector */}
          <div style={{
            display: 'flex',
            background: '#333',
            borderRadius: '1rem',
            padding: '0.3rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            border: '2px solid #333'
          }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem',
                background: selectedLocation === 'Mathura/Vrindavan' ? '#fff' : 'transparent',
                color: selectedLocation === 'Mathura/Vrindavan' ? '#333' : '#fff',
                borderRadius: '0.7rem', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 600, fontSize: '1rem', minWidth: '170px', justifyContent: 'center'
              }}
              onClick={() => setSelectedLocation(selectedLocation === 'Mathura/Vrindavan' ? '' : 'Mathura/Vrindavan')}
            >
              <span style={{ fontSize: '1.2rem' }}>🛕</span>
              <span>Mathura</span>
            </div>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem',
                background: selectedLocation === 'Banaras' ? '#fff' : 'transparent',
                color: selectedLocation === 'Banaras' ? '#333' : '#fff',
                borderRadius: '0.7rem', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 600, fontSize: '1rem', minWidth: '150px', justifyContent: 'center', position: 'relative'
              }}
              onClick={() => setSelectedLocation(selectedLocation === 'Banaras' ? '' : 'Banaras')}
            >
              <span style={{ fontSize: '1.2rem' }}>🌅</span>
              <span>Banaras</span>
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#f29927',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.2rem 0.4rem',
                borderRadius: '0.4rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(242, 153, 39, 0.4)',
                zIndex: 10
              }}>
                Coming Soon
              </div>
            </div>
          </div>

          {/* Category Selector */}
          <div style={{
            display: 'flex',
            background: '#333',
            borderRadius: '1rem',
            padding: '0.3rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            border: '2px solid #333'
          }}>
            {/* Traditional Segment */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              background: selectedCategory === 'Traditional' ? '#fff' : 'transparent',
              color: selectedCategory === 'Traditional' ? '#333' : '#fff',
              borderRadius: '0.7rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 600,
              fontSize: '1rem',
              minWidth: '160px',
              justifyContent: 'center'
            }}
            onClick={() => setSelectedCategory('Traditional')}
            >
              <span style={{ fontSize: '1.2rem' }}>🏛️</span>
              <span>Traditional</span>
          </div>

            {/* Luxury Segment */}
                <div style={{
                  display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              background: selectedCategory === 'Luxury' ? '#fff' : 'transparent',
              color: selectedCategory === 'Luxury' ? '#333' : '#fff',
              borderRadius: '0.7rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
                  fontWeight: 600,
              fontSize: '1rem',
              minWidth: '160px',
              justifyContent: 'center'
            }}
            onClick={() => setSelectedCategory('Luxury')}
            >
              <span style={{ fontSize: '1.2rem' }}>🏖️</span>
              <span>Luxury</span>
              </div>

            {/* Budget Segment */}
                <div style={{
                  display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              background: selectedCategory === 'Budget' ? '#fff' : 'transparent',
              color: selectedCategory === 'Budget' ? '#333' : '#fff',
              borderRadius: '0.7rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: 600,
              fontSize: '1rem',
              minWidth: '160px',
              justifyContent: 'center'
            }}
            onClick={() => setSelectedCategory('Budget')}
            >
              <span style={{ fontSize: '1.2rem' }}>💰</span>
              <span>Budget</span>
            </div>
          </div>

        </div>

        {/* Mobile-Style Trip Cards */}
                <div style={{
                  display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
          maxWidth: '1200px',
          margin: '2rem auto 0 auto',
        }}>
          {(selectedCategory
            ? filteredTrips.filter(trip => trip.type === selectedCategory)
            : filteredTrips
          ).map((trip, idx) => (
            <div
              key={idx}
              className="trip-card"
              style={{
                background: '#fff',
                borderRadius: '1.2rem',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer',
                minHeight: '320px',
                maxWidth: '580px',
                filter: /banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) ? 'grayscale(100%)' : 'none',
                opacity: /banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) ? 0.7 : 1
              }}
              onMouseEnter={e => {
                if (!/banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || ''))) {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: 170, background:'#f9f6f2' }}>
                <img 
                  src={trip.images[0]} 
                  alt={trip.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Content */}
              <div style={{ padding: '1rem 1.2rem' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ color:'#1e6f5c', fontWeight:800, fontSize:'1.25rem' }}>₹{trip.price} <span style={{color:'#888',fontWeight:500,fontSize:'0.9rem'}}> /person</span></div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <span style={{ color:'#f29927' }}>★</span>
                    <span style={{ fontWeight:700, color:'#444' }}>{Number(trip.rating).toFixed(1)}</span>
                  </div>
                </div>
                <div style={{ fontWeight:700, color:'#222', marginBottom: 6 }}>{trip.name}</div>
                {(() => {
                  const text = ((trip.features||[]).join(' ') + ' ' + trip.name + ' ' + (trip.description||''));
                  let city='Mathura', landmark='Sri Krishna Janmabhoomi', km='4.9';
                  if (/banaras|varanasi/i.test(text)) { city='Banaras'; landmark='Dashashwamedh Ghat'; km='1.0'; }
                  return (
                    <div style={{ color:'#444', fontSize:'0.9rem', marginBottom: 10 }}>
                      <span style={{ color:'#1e6f5c', fontWeight:700 }}>{city}</span>
                      <span style={{ color:'#999', margin:'0 6px' }}>|</span>
                      <span>{km} km drive to {landmark}</span>
                    </div>
                  );
                })()}
                {(() => {
                  const bedCount = trip.price >= 120 ? 2 : 1;
                  const bathCount = 1;
                  const sqft = 300 + (idx % 3) * 20;
                  return (
                    <div style={{ display:'flex', alignItems:'center', gap:16, color:'#666', fontSize:'0.9rem' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <span>🛏️</span>
                        <span>{bedCount} Bed</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <span>🛁</span>
                        <span>{bathCount} Bath</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <span>◼️</span>
                        <span>{sqft} sqft</span>
                      </div>
                    </div>
                  );
                })()}
                <div style={{ display:'flex', justifyContent:'flex-end', marginTop: 12 }}>
                  <button
                    data-book={"true"}
                    disabled={/banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || ''))}
                    style={{
                      background: /banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) 
                        ? 'linear-gradient(135deg, #ccc, #999)' 
                        : 'linear-gradient(135deg, #f29927, #e67e22)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.8rem',
                      padding: '0.6rem 1rem',
                      fontWeight: 700,
                      cursor: /banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) ? 'not-allowed' : 'pointer',
                      boxShadow: /banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) 
                        ? '0 2px 8px rgba(153,153,153,0.35)' 
                        : '0 2px 8px rgba(242,153,39,0.35)',
                      opacity: /banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) ? 0.6 : 1
                    }}
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (!/banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || ''))) {
                        const text = (trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')).toLowerCase(); 
                        let tripId = 'mathura-vrindavan'; 
                        if (/(varanasi|banaras)/i.test(text)) tripId = 'varanasi'; 
                        else if (/agra/.test(text) && /taj/.test(text)) tripId = 'agra-taj'; 
                        else if (/rajasthan/.test(text)) tripId = 'rajasthan-heritage'; 
                        else if (/(mathura|vrindavan)/i.test(text)) tripId = 'mathura-vrindavan'; 
                        window.location.href = `/customize-trip/customize/${tripId}`; 
                      }
                    }}
                    onMouseEnter={(e) => { 
                      if (!/banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || ''))) {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; 
                      }
                    }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
                  >
                    {/banaras|varanasi/i.test(trip.name + ' ' + (trip.features || []).join(' ') + ' ' + (trip.description || '')) ? 'Coming Soon' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

        {/* Trip Details Modal */}
        {selectedTrip && (
          <TripDetailsModal
            trip={selectedTrip}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes fadeInTripCard {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tripBookShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-3px); }
          40%, 80% { transform: translateX(3px); }
        }
        .trip-card:hover button[data-book="true"] {
          animation: tripBookShake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
} 