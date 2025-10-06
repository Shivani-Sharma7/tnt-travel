'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCarSide, FaSuitcaseRolling, FaClock, FaDotCircle, FaSyncAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { mockCabs, cardStyle } from './cabData';
import CabImageCarousel from './CabImageCarousel';
import TripCards from '../../components/TripCards';
import { useCart } from '@/context/CartContext';
import VehicleCard from '@/components/VehicleCard';
import { getVehiclesByType } from '@/data/vehicleData';

const chipStyle = {
  display: 'inline-block',
  background: '#E2B89B',
  color: '#7A6B57',
  fontWeight: 700,
  fontSize: '0.98rem',
  borderRadius: '1rem',
  padding: '0.3rem 1rem',
  marginBottom: 10,
  marginTop: 2,
  letterSpacing: '0.2px',
};

const priceBadgeStyle = {
  position: 'absolute',
  top: 18,
  right: 18,
  background: '#f29927',
  color: '#fff',
  fontWeight: 800,
  fontSize: '1.1rem',
  borderRadius: '1.2rem',
  padding: '0.5rem 1.2rem',
  boxShadow: '0 2px 8px #f2992740',
  zIndex: 2,
} as React.CSSProperties;

const btnStyle = {
  padding: '0.5rem 0',
  borderRadius: '0.8rem',
  background: 'linear-gradient(90deg,#A67B5B 85%,#D8CAB8 15%)',
  color: '#fff',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: 12,
  boxShadow: '0 2px 8px #A67B5B22',
  letterSpacing: '0.3px',
  transition: 'background 0.2s, transform 0.2s',
  flex: 1,
  minWidth: 0,
  maxWidth: '100%',
  display: 'block',
};
const outlineBtnStyle = {
  ...btnStyle,
  background: '#fff',
  color: '#7A6B57',
  border: '2px solid #7A6B57',
  boxShadow: 'none',
};

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

function CabDetailsModal({ cab, isOpen, onClose }: { cab: any; isOpen: boolean; onClose: () => void }) {
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
            src={cab.images[currentImageIndex]}
            alt={cab.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Image Navigation */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
            {cab.images.map((_: string, index: number) => (
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
          {/* Price Badge */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f29927',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.2rem',
            borderRadius: '1.2rem',
            padding: '0.5rem 1.2rem',
            boxShadow: '0 2px 8px rgba(242, 153, 39, 0.4)',
          }}>
            ₹{cab.price}/km
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#7A6B57', margin: 0 }}>{cab.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StarBlock rating={cab.rating} />
                <span style={{ fontWeight: 700, color: '#222', fontSize: '1.1rem' }}>{cab.rating}</span>
              </div>
            </div>
            <div style={{ color: '#666', fontSize: '1.1rem', fontWeight: 500 }}>{cab.type} Class</div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{cab.description}</p>
          </div>

          {/* Specifications */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Specifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {cab.specifications.map((spec: string, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                  <span style={{ color: '#f29927', fontSize: '1.1em' }}>⚙️</span>
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {cab.amenities.map((amenity: string, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                  <span style={{ color: '#f29927', fontSize: '1.1em' }}>✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Booking Policies</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {cab.policies.map((policy: string, index: number) => (
                <div key={index} style={{ color: '#666', fontSize: '0.95rem' }}>
                  <span style={{ color: '#f29927', marginRight: '0.5rem' }}>•</span>
                  {policy}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              style={{
                ...btnStyle,
                flex: 1,
                padding: '1rem',
                fontSize: '1.1rem',
              }}
            >
              Book Now
            </button>
            <button
              style={{
                ...outlineBtnStyle,
                flex: 1,
                padding: '1rem',
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
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes wheelClickAnim {
          0% { transform: translateX(-50%) rotate(0deg); opacity: 1; }
          60% { transform: translateX(120px) rotate(720deg); opacity: 1; }
          85% { transform: translateX(120px) translateY(120px) rotate(1080deg) scale(1.1); opacity: 1; }
          100% { transform: translateX(120px) translateY(120px) rotate(1080deg) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Trip mock data
const mockTrips = [
  {
    name: 'Mathura Local Tour',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Explore the spiritual and historical sites of Mathura in a day.',
    locationsCovered: ['Shri Krishna Janmabhoomi', 'Dwarkadhish Temple', 'Vishram Ghat', 'Prem Mandir', 'Banke Bihari Temple'],
    location: 'Mathura',
  },
  {
    name: 'Mathura - Vrindavan Tour',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Visit the holy towns of Mathura and Vrindavan, including major temples and ghats.',
    locationsCovered: ['Mathura', 'Vrindavan', 'Prem Mandir', 'Banke Bihari Temple', 'ISKCON Temple'],
    location: 'Mathura',
  },
  {
    name: 'Agra Day Tour',
    price: 5500,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Experience the wonders of Agra including the Taj Mahal and Agra Fort.',
    locationsCovered: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Fatehpur Sikri'],
    location: 'Agra',
  },
  {
    name: 'Mathura - Agra Tour',
    price: 6500,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Combined tour of Mathura and Agra, covering temples and world heritage sites.',
    locationsCovered: ['Mathura', 'Vrindavan', 'Taj Mahal', 'Agra Fort'],
    location: 'Agra',
  },
  {
    name: 'Vrindavan - Barsana Tour',
    price: 5000,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Discover the spiritual charm of Vrindavan and Barsana.',
    locationsCovered: ['Vrindavan', 'Barsana', 'Radha Rani Temple', 'Prem Mandir'],
    location: 'Mathura',
  },
  {
    name: 'Varanasi Ghats Tour',
    price: 4000,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Experience the spiritual essence of Varanasi with ghats and temples tour.',
    locationsCovered: ['Dashashwamedh Ghat', 'Manikarnika Ghat', 'Kashi Vishwanath Temple', 'Sarnath'],
    location: 'Varanasi',
  },
  {
    name: 'Varanasi - Sarnath Tour',
    price: 4800,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Visit the sacred Buddhist site of Sarnath and explore Varanasi city.',
    locationsCovered: ['Sarnath', 'Dhamek Stupa', 'Kashi Vishwanath Temple', 'Ganga Ghats'],
    location: 'Varanasi',
  },
  {
    name: 'Agra - Fatehpur Sikri Tour',
    price: 5200,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    description: 'Explore the historical wonders of Agra and the abandoned city of Fatehpur Sikri.',
    locationsCovered: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Buland Darwaza'],
    location: 'Agra',
  },
];

// Helper component for trip images carousel
function TripImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images || images.length === 0) return null;
  return (
    <div style={{position:'relative',width:'100%',height:180,overflow:'hidden',borderTopLeftRadius:'1.5rem',borderTopRightRadius:'1.5rem',background:'#f9f6f2',marginBottom:12}}>
      <img src={images[idx]} alt="Trip" style={{width:'100%',height:'100%',objectFit:'cover'}} />
      {images.length > 1 && (
        <div style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
          {images.map((_,i) => (
            <span
              key={i}
              onClick={e => {e.stopPropagation(); setIdx(i);}}
              style={{width:7,height:7,borderRadius:'50%',background:idx===i?'#7A6B57':'#e0c97c',display:'inline-block',cursor:'pointer',transition:'background 0.2s'}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const carTypes = [
  { label: 'SUV', value: 'SUV', icon: (
    <svg width="60" height="32" viewBox="0 0 60 32"><rect x="8" y="14" width="44" height="12" rx="6" fill="#888"/><rect x="14" y="10" width="32" height="8" rx="4" fill="#ccc"/><circle cx="18" cy="28" r="4" fill="#222"/><circle cx="42" cy="28" r="4" fill="#222"/></svg>
  ) },
  { label: 'HATCHBACK', value: 'Hatchback', icon: (
    <svg width="60" height="32" viewBox="0 0 60 32"><rect x="10" y="16" width="40" height="10" rx="5" fill="#888"/><rect x="18" y="12" width="24" height="7" rx="3.5" fill="#ccc"/><circle cx="18" cy="28" r="4" fill="#222"/><circle cx="42" cy="28" r="4" fill="#222"/></svg>
  ) },
  { label: 'SEDAN', value: 'Sedan', icon: (
    <svg width="60" height="32" viewBox="0 0 60 32"><rect x="8" y="16" width="44" height="10" rx="5" fill="#6ca0dc"/><rect x="16" y="12" width="28" height="7" rx="3.5" fill="#b3d1f7"/><circle cx="18" cy="28" r="4" fill="#222"/><circle cx="42" cy="28" r="4" fill="#222"/></svg>
  ) },
];

// Combined Wheel SVG component (dashed tread + strong inner)
function WheelSVG({ style = {} }: { style?: React.CSSProperties }) {
  // Studs positions (8 evenly spaced)
  const studs = Array.from({length:8}, (_,i) => {
    const angle = (i/8)*2*Math.PI;
    const r = 13.5;
    return {
      cx: 19 + r * Math.cos(angle),
      cy: 19 + r * Math.sin(angle)
    };
  });
  return (
    <svg width="100" height="100" viewBox="0 0 38 38" style={style}>
      <defs>
        <radialGradient id="tireGradientStrong" cx="50%" cy="50%" r="50%">
          <stop offset="50%" stopColor="#222" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
        <radialGradient id="metalGradientStrong" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#888" />
        </radialGradient>
      </defs>
      {/* Dashed outer ring (tread) */}
      <circle cx="19" cy="19" r="18" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="3,3" />
      {/* Thick, dark tire */}
      <circle cx="19" cy="19" r="16.5" fill="url(#tireGradientStrong)" stroke="#111" strokeWidth="3.5" />
      {/* Double wall for tire */}
      <circle cx="19" cy="19" r="14.2" fill="none" stroke="#222" strokeWidth="2.5" />
      {/* Wheel rim (bolder) */}
      <circle cx="19" cy="19" r="10.5" fill="url(#metalGradientStrong)" stroke="#bbb" strokeWidth="2.5" />
      {/* Studs (metallic bolts) */}
      {studs.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r="0.9" fill="#bbb" stroke="#888" strokeWidth="0.5" />
      ))}
      {/* Spokes (bolder) */}
      <g stroke="#888" strokeWidth="2.2">
        <line x1="19" y1="8.5" x2="19" y2="29.5" />
        <line x1="8.5" y1="19" x2="29.5" y2="19" />
        <line x1="12.5" y1="12.5" x2="25.5" y2="25.5" />
        <line x1="25.5" y1="12.5" x2="12.5" y2="25.5" />
      </g>
      {/* Center cap (bolder) */}
      <circle cx="19" cy="19" r="4.2" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
    </svg>
  );
}

export default function TaxiPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [tab, setTab] = useState<'Trip'|'Ride'>('Trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [rentalLocation, setRentalLocation] = useState('');
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [rentalDropdown, setRentalDropdown] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedCab, setSelectedCab] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(carTypes[0].value);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
  const [wheelDropped, setWheelDropped] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(false);
  const [isWheelHovered, setIsWheelHovered] = useState(false);
  const [wheelClickAnim, setWheelClickAnim] = useState(false);
  const [wheelLanded, setWheelLanded] = useState(false);
  const [isBottomWheelHovered, setIsBottomWheelHovered] = useState(false);
  const [isWheelHoveredLeft, setIsWheelHoveredLeft] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add global style for continuous spin
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Add keyframes for click animation
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML += `@keyframes wheelClickAnim {
      0% { transform: translateX(-50%) rotate(0deg); opacity: 1; }
      60% { transform: translateX(120px) rotate(720deg); opacity: 1; }
      85% { transform: translateX(120px) translateY(120px) rotate(1080deg) scale(1.1); opacity: 1; }
      100% { transform: translateX(120px) translateY(120px) rotate(1080deg) scale(1); opacity: 1; }
    }`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const referenceAddresses = [
    'Mathura Junction Railway Station',
    'Shri Krishna Janmabhoomi',
    'Dwarkadhish Temple',
    'Vishram Ghat',
    'Prem Mandir, Vrindavan',
    'Banke Bihari Temple',
    'Agra railway station'
  ];

  const handleSearch = () => {
    setPendingSearch(true);
    setWheelDropped(true);
    setShowResults(false);
    setWheelClickAnim(true);
    setWheelLanded(false);
    setTimeout(() => {
      setShowResults(true);
      setWheelDropped(false);
      setPendingSearch(false);
      setWheelClickAnim(false);
      setWheelLanded(true);
    }, 1000); // Animation duration
  };
  const handleViewDetails = (cab: any) => {
    setSelectedCab(cab);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCab(null);
  };

  const handleRideBookNow = (vehicleName: string, priceText: string) => {
    const digits = priceText.match(/\d+/g);
    const price = digits ? Number(digits.join('')) : 0;
    const createdItem = {
      id: `ride-${vehicleName.replace(/\s+/g,'-').toLowerCase()}-${from || 'loc'}`,
      type: 'taxi',
      name: `${vehicleName} • ${from || 'Location'}`,
      price,
      image: '/activity/taxi.jpg',
      details: {
        pickupLocation: from || 'To be confirmed',
        dropLocation: to || 'To be confirmed',
        transportation: vehicleName,
      },
    } as const;
    addToCart(createdItem);
    router.push(`/booking?id=${encodeURIComponent(createdItem.id)}`);
  };

  // Handle vehicle type filter selection
  const handleVehicleTypeToggle = (vehicleType: string) => {
    setSelectedVehicleTypes(prev => {
      if (prev.includes(vehicleType)) {
        return prev.filter(type => type !== vehicleType);
      } else {
        return [...prev, vehicleType];
      }
    });
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
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
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e9e4df 0%, #f5f3ef 100%)',
      padding: '3vw 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1300,
        width: '95%',
        background: '#fff',
        borderRadius: '2.5rem',
        boxShadow: '0 8px 32px rgba(60,40,20,0.10)',
        padding: '3rem 2rem 1rem 2rem',
        margin: '2rem 0 0 0',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Three Feature Cards */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}>
          {/* Card 1 */}
          <div style={{
            background: '#f4f8ef',
            borderRadius: '1.2rem',
            padding: '2.2rem 2rem 1.5rem 2rem',
            flex: '1 1 320px',
            maxWidth: 340,
            minWidth: 260,
            boxShadow: '0 2px 16px #b7e4c740',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <span style={{fontSize: 60, marginBottom: '1.2rem'}}>💸</span>
            <h2 style={{fontWeight:700,fontSize:'1.3rem',marginBottom:'0.6rem',color:'#222'}}>For any budget</h2>
            <div style={{color:'#444',fontSize:'1.02rem',fontWeight:500,lineHeight:1.4}}>
              From <b>Autos</b> to <b>Prime Sedans</b> and <b>Travelers</b>, you will find a ride in your budget at your convenience any time.
            </div>
          </div>
          {/* Card 2 */}
          <div style={{
            background: '#f4f8ef',
            borderRadius: '1.2rem',
            padding: '2.2rem 2rem 1.5rem 2rem',
            flex: '1 1 320px',
            maxWidth: 340,
            minWidth: 260,
            boxShadow: '0 2px 16px #b7e4c740',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <span style={{fontSize: 60, marginBottom: '1.2rem'}}>🗺️</span>
            <h2 style={{fontWeight:700,fontSize:'1.3rem',marginBottom:'0.6rem',color:'#222'}}>For any distance</h2>
            <div style={{color:'#444',fontSize:'1.02rem',fontWeight:500,lineHeight:1.4}}>
              Take a Ride to your favourite destinations outside as well as inside the city.
            </div>
          </div>
          {/* Card 3 */}
          <div style={{
            background: '#f4f8ef',
            borderRadius: '1.2rem',
            padding: '2.2rem 2rem 1.5rem 2rem',
            flex: '1 1 320px',
            maxWidth: 340,
            minWidth: 260,
            boxShadow: '0 2px 16px #b7e4c740',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <span style={{fontSize: 60, marginBottom: '1.2rem'}}>⏰</span>
            <h2 style={{fontWeight:700,fontSize:'1.3rem',marginBottom:'0.6rem',color:'#222'}}>For any Time, any Duration</h2>
            <div style={{color:'#444',fontSize:'1.02rem',fontWeight:500,lineHeight:1.4}}>
              Easily plan a day out without having to worry about conveyance with an hour-based package from <b>Rental</b>.
            </div>
          </div>
        </div>
        {/* Tabs row */}
        <div style={{display:'flex',gap:'1.5rem',fontWeight:700,fontSize:'1.15rem',padding:'2.5rem 0 1rem 4rem '}}>
          {(['Trip','Ride'] as const).map(t => (
            <div
              key={t}
              onClick={()=>setTab(t)}
              style={{
                cursor:'pointer',
                borderBottom: tab===t ? '3px solid #111' : 'none',
                color: tab===t ? '#111' : '#888',
                paddingBottom: 6,
                transition:'color 0.2s, border 0.2s',
                minWidth: 110,
                textAlign: 'center',
              }}
            >{t}</div>
          ))}
        </div>

        {/* Content Section */}
        <section style={{padding:'2rem 0'}}>
          {/* Trip Section - Show beautiful trip cards */}
          {tab === 'Trip' && (
            <div style={{
              background: '#1a2a3a',
              margin: '0 -2rem',
              padding: '4rem 2rem',
              borderRadius: '2rem',
              marginTop: '2rem'
            }}>
              <TripCards />
            </div>
          )}

          {/* Ride Section - Show location search and results */}
          {tab === 'Ride' && (
            <div>
              {/* Ride Section Description */}
              <div style={{
              background: '#1a2a3a',
              margin: '0 -2rem',
              padding: '4rem 2rem',
              borderRadius: '2rem',
              marginTop: '2rem'
            }}>
                <h1 style={{
                  fontSize: '3.5rem',
                  textAlign: 'center',
                  fontWeight: 300,
                  color: '#ffffff',
                  fontFamily: 'serif',
                  lineHeight: 1.2,
                  margin: ' 4rem 0 .5rem 0'
                }}>
                  Book Your Daily Cab Service
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    color: '#8ba3b3',
                    maxWidth: '600px',
                    margin: '0 auto',
                    marginBottom: '6rem'
                }}>
                  You can book a cab from here on a daily basis for intercity and out intracity .
                </p>

                {/* Destination Options with Wheel on Right */}
                <div style={{
                  display: 'flex',
                  maxWidth: '1100px',
                  margin: '0 auto'
                }}>
                  {/* Left side - Destination Options */}
                  <div style={{
                    flex: 1,
                  textAlign: 'center',
                  margin : '0 -6rem 0 0'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '1.5rem'
                  }}>
                    Choose Your Location
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => setFrom('Mathura')}
                      style={{
                        background: from === 'Mathura' 
                          ? 'linear-gradient(135deg,rgb(105, 108, 135),rgb(173, 161, 151))' 
                          : 'rgba(255,255,255,0.1)',
                        color: from === 'Mathura' ? '#ffffff' : 'rgb(129, 144, 144)',
                        border: from === 'Mathura' 
                          ? 'none' 
                          : '2px solid rgba(255,255,255,0.2)',
                          
                        padding: '1rem 2rem',
                        borderRadius: '2rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        if (from !== 'Mathura') {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                          e.currentTarget.style.color = '#1a2a3a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (from !== 'Mathura') {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = '#1a2a3a';
                        }
                      }}
                    >
                      Mathura
                    </button>
                    <button
                      onClick={() => setFrom('Banaras')}
                      style={{
                        background: from === 'Banaras' 
                          ? 'linear-gradient(135deg,rgb(105, 108, 135),rgb(173, 161, 151))' 
                          : 'rgba(255,255,255,0.1)',
                        color: from === 'Banaras' ? '#ffffff' : 'rgb(129, 144, 144)',
                        border: from === 'Banaras' 
                          ? 'none' 
                          : '2px solid rgba(255,255,255,0.2)',
                        padding: '1rem 2rem',
                        borderRadius: '2rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        minWidth: '140px'
                      }}
                      onMouseEnter={(e) => {
                        if (from !== 'Banaras') {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                          e.currentTarget.style.color = '#1a2a3a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (from !== 'Banaras') {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                          e.currentTarget.style.color = '#1a2a3a';
                        }
                      }}
                    >
                      Banaras
                    </button>
                    </div>
                  </div>

                  {/* Right side - Wheel Animation */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div
                      style={{
                        cursor: 'pointer',
                        animation: 'spin 2s linear infinite',
                        transformOrigin: '50% 50%'
                      }}
                      onMouseEnter={() => setIsWheelHovered(true)}
                      onMouseLeave={() => setIsWheelHovered(false)}
                    >
                      <WheelSVG style={isWheelHovered ? { animation: 'spin 1s linear infinite', transformOrigin: '50% 50%' } : {}} />
                    </div>
                  </div>
                </div>
              

              {/* Vehicle Type Filter - Only show when location is selected */}
              {from && (
                <div style={{
                  position: 'relative',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#1a2a3a',
                    margin: '2rem 0 0 0',
                    textAlign: 'center'
                  }}>
                    Choose Vehicle Type
                  </h4>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}>
                    {/* Auto */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flex: 1,
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: selectedVehicleTypes.includes('auto') 
                          ? `
                            radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.5) 0%, transparent 50%),
                            radial-gradient(circle at 40% 70%, rgba(176, 224, 230, 0.3) 0%, transparent 50%),
                            linear-gradient(135deg, rgba(240, 248, 255, 0.9) 0%, rgba(230, 248, 255, 0.7) 100%)
                          `
                          : 'rgb(10, 15, 59,.8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: selectedVehicleTypes.includes('auto') ? '2px solid rgb(173, 161, 151)' : '2px solid #e0e0e0',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onClick={() => handleVehicleTypeToggle('auto')}
                      >
                        {selectedVehicleTypes.includes('auto') && (
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '25px',
                            height: '25px',
                            background: 'rgba(135, 206, 235, 0.7)',
                            borderRadius: '50%',
                            zIndex: 0
                          }} />
                        )}
                        <span style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>🛺</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#eef',
                          marginBottom: '.2rem'
                        }}>
                          Auto
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          color: '#8ba3b3',
                          fontFamily: 'serif'
                        }}>
                          3-4 Seater
                        </div>
                      </div>
                    </div>

                    {/* Connector Line */}
                    <div style={{
                      width: '40px',
                      height: '2px',
                      background: '#f29927',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#f29927',
                        borderRadius: '50%',
                        position: 'absolute',
                        right: '-3px',
                        top: '-2px'
                      }}></div>
                    </div>

                    {/* Car */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flex: 1,
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: selectedVehicleTypes.includes('car') 
                          ? `
                            radial-gradient(circle at 25% 25%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(173, 216, 230, 0.5) 0%, transparent 50%),
                            radial-gradient(circle at 50% 10%, rgba(176, 224, 230, 0.3) 0%, transparent 50%),
                            linear-gradient(135deg, rgba(240, 248, 255, 0.9) 0%, rgba(230, 248, 255, 0.7) 100%)
                          `
                          : 'rgb(10, 15, 59,.8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: selectedVehicleTypes.includes('car') ? '2px solid rgb(173, 161, 151)' : '2px solid #e0e0e0',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onClick={() => handleVehicleTypeToggle('car')}
                      >
                        {selectedVehicleTypes.includes('car') && (
                          <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            width: '30px',
                            height: '30px',
                            background: 'rgba(135, 206, 235, 0.6)',
                            borderRadius: '50%',
                            zIndex: 0
                          }} />
                        )}
                        <span style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>🚙</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#eef',
                          marginBottom: '0.2rem'
                        }}>
                          Car
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          color: '#8ba3b3',
                          fontFamily: 'serif'
                        }}>
                          4-6 Seater
                        </div>
                      </div>
                    </div>

                    {/* Connector Line */}
                    <div style={{
                      width: '40px',
                      height: '2px',
                      background: '#f29927',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#f29927',
                        borderRadius: '50%',
                        position: 'absolute',
                        right: '-3px',
                        top: '-2px'
                      }}></div>
                    </div>

                    {/* Traveler */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flex: 1,
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: selectedVehicleTypes.includes('traveler') 
                          ? `
                            radial-gradient(circle at 30% 20%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 70% 80%, rgba(173, 216, 230, 0.5) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(176, 224, 230, 0.3) 0%, transparent 50%),
                            linear-gradient(135deg, rgba(240, 248, 255, 0.9) 0%, rgba(230, 248, 255, 0.7) 100%)
                          `
                          : 'rgb(10, 15, 59,.8)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: selectedVehicleTypes.includes('traveler') ? '2px solid rgb(173, 161, 151)' : '2px solid #e0e0e0',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onClick={() => handleVehicleTypeToggle('traveler')}
                      >
                        {selectedVehicleTypes.includes('traveler') && (
                          <div style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '-12px',
                            width: '32px',
                            height: '32px',
                            background: 'rgba(135, 206, 235, 0.6)',
                            borderRadius: '50%',
                            zIndex: 0
                          }} />
                        )}
                        <span style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>🚌</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#eef',
                          marginBottom: '0.2rem'
                        }}>
                          Traveler
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          color: '#8ba3b3',
                          fontFamily: 'serif'
                        }}>
                          11-21 Seater
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            
              {/* Vehicle Options Cards */}
              {from && selectedVehicleTypes.length > 0 && (
                <div style={{
                  background: '#f9f6f2',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 2px 16px #b7e4c740',
                  marginTop: '2rem'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#1a2a3a',
                    marginBottom: '1.5rem',
                    textAlign: 'left'
                  }}>
                    Available Vehicle Options
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                  }}>
                    {/* Auto Options */}
                    {selectedVehicleTypes.includes('auto') && (
                      <>
                        {/* Mathura Auto Options */}
                        {from === 'Mathura' && (
                          <>
                            {/* 3 Seater Auto - Mathura */}
                    <div style={{
                      background: '#fff',
                              borderRadius: '0.75rem',
                      padding: '1.5rem',
                              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                              border: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                    }}
                    >
                      {/* Company Logo */}
                      <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '1rem'
                              }}>
                                <div style={{
                                  width: '48px',
                                  height: '48px',
                                  background: `
                                    radial-gradient(circle at 20% 30%, rgba(135, 206, 235, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 20%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                                    radial-gradient(circle at 40% 70%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                    linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                                  `,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    width: '30px',
                                    height: '30px',
                                    background: 'rgba(135, 206, 235, 0.6)',
                                    borderRadius: '50%',
                                    zIndex: 0
                                  }} />
                                  <span style={{ position: 'relative', zIndex: 1 }}>🛺</span>
                      </div>
                      <button style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                                  color: '#999',
                                  padding: '0.25rem',
                                  borderRadius: '0.25rem',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#f29927';
                      }}
                      onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#999';
                      }}
                      >
                        🔖
                      </button>
                              </div>

                        {/* Company Name */}
                        <div style={{
                          fontSize: '0.9rem',
                                color: '#666',
                          marginBottom: '0.25rem'
                        }}>
                                Bajaj Auto
                        </div>

                        {/* Posted Time */}
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#999',
                                marginBottom: '0.75rem'
                        }}>
                                2 hours ago
                        </div>

                              {/* Job Title */}
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: '#1a1a1a',
                                marginBottom: '0.75rem',
                                lineHeight: '1.3'
                        }}>
                                Auto Rickshaw
                        </div>

                              {/* Job Type Tags */}
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                                marginBottom: '1rem',
                                flexWrap: 'wrap'
                        }}>
                          <span style={{
                                  background: '#f0f0f0',
                            color: '#666',
                                  fontSize: '0.8rem',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                            fontWeight: 500
                          }}>
                            3 Seater
                          </span>
                          <span style={{
                                  background: '#f0f0f0',
                            color: '#666',
                                  fontSize: '0.8rem',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                            fontWeight: 500
                          }}>
                            Mathura
                          </span>
                        </div>

                              {/* Salary */}
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#1a1a1a',
                                marginBottom: '0.5rem'
                        }}>
                                ₹1,200/day
                        </div>

                        {/* Location */}
                        <div style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                marginBottom: '1.5rem'
                        }}>
                          Mathura, India
                        </div>

                        {/* Apply Button */}
                        <button style={{
                          background: '#1a1a1a',
                          color: '#fff',
                          border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                                transition: 'all 0.2s',
                                width: '100%'
                        }}
                        onClick={() => handleRideBookNow('Bajaj Auto Rickshaw','₹1200/day')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#333';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#1a1a1a';
                                e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        >
                          Book Now
                        </button>
                    </div>

                            {/* 4 Seater Auto - Mathura */}
                            <div style={{
                              background: '#fff',
                              borderRadius: '0.75rem',
                              padding: '1.5rem',
                              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                              border: '1px solid #f0f0f0',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                            }}
                            >
                              {/* Company Logo */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '1rem'
                              }}>
                                <div style={{
                                  width: '48px',
                                  height: '48px',
                                  background: `
                                    radial-gradient(circle at 30% 20%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                                    radial-gradient(circle at 70% 80%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 60% 40%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                    linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                                  `,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}>
                                  <div style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    left: '-8px',
                                    width: '25px',
                                    height: '25px',
                                    background: 'rgba(173, 216, 230, 0.7)',
                                    borderRadius: '50%',
                                    zIndex: 0
                                  }} />
                                  <span style={{ position: 'relative', zIndex: 1 }}>🛺</span>
                              </div>
                              <button style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                color: '#f29927',
                                  padding: '0.25rem',
                                  borderRadius: '0.25rem',
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#e67e22';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#f29927';
                              }}
                              >
                                🔖
                              </button>
                              </div>

                                {/* Company Name */}
                                <div style={{
                                  fontSize: '0.9rem',
                                color: '#666',
                                  marginBottom: '0.25rem'
                                }}>
                                Mahindra
                                </div>

                                {/* Posted Time */}
                                <div style={{
                                  fontSize: '0.8rem',
                                  color: '#999',
                                marginBottom: '0.75rem'
                                }}>
                                1 hour ago
                                </div>

                              {/* Job Title */}
                                <div style={{
                                  fontSize: '1.1rem',
                                  fontWeight: 700,
                                  color: '#1a1a1a',
                                marginBottom: '0.75rem',
                                lineHeight: '1.3'
                                }}>
                                Alfa Plus
                                </div>

                              {/* Job Type Tags */}
                                <div style={{
                                  display: 'flex',
                                  gap: '0.5rem',
                                marginBottom: '1rem',
                                flexWrap: 'wrap'
                                }}>
                                  <span style={{
                                  background: '#f0f0f0',
                                    color: '#666',
                                  fontSize: '0.8rem',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                                    fontWeight: 500
                                  }}>
                                    4 Seater
                                  </span>
                                  <span style={{
                                  background: '#f0f0f0',
                                    color: '#666',
                                  fontSize: '0.8rem',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                                    fontWeight: 500
                                  }}>
                                    Mathura
                                  </span>
                                </div>

                              {/* Salary */}
                                <div style={{
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  color: '#1a1a1a',
                                marginBottom: '0.5rem'
                                }}>
                                ₹1,500/day
                                </div>

                                {/* Location */}
                                <div style={{
                                fontSize: '0.9rem',
                                color: '#666',
                                marginBottom: '1.5rem'
                                }}>
                                  Mathura, India
                                </div>

                                {/* Apply Button */}
                                <button style={{
                                  background: '#1a1a1a',
                                  color: '#fff',
                                  border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                  fontSize: '0.9rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                transition: 'all 0.2s',
                                width: '100%'
                                }}
                                onClick={() => handleRideBookNow('Mahindra Alfa Plus','₹1500/day')}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#333';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#1a1a1a';
                                e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                >
                                  Book Now
                                </button>
                            </div>
                          </>
                        )}

                        {/* Banaras Auto Options */}
                        {from === 'Banaras' && (
                          <>
                            {/* 3 Seater Auto - Banaras */}
                            <div style={{
                              background: '#fff',
                              borderRadius: '0.8rem',
                              padding: '1.2rem',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              border: '1px solid #e0e0e0',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            >
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '0.8rem'
                              }}>
                                <span style={{ fontSize: '2rem' }}>🛺</span>
                                <div>
                                  <div style={{
                                    fontWeight: 600,
                                    color: '#1a2a3a',
                                    fontSize: '1rem',
                                    marginBottom: '0.2rem'
                                  }}>
                                    TVS Auto Rickshaw
                                  </div>
                                  <div style={{
                                    fontSize: '0.8rem',
                                    color: '#666'
                                  }}>
                                    3 Seater | Banaras
                                  </div>
                                </div>
                              </div>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <div style={{
                                  fontSize: '0.9rem',
                                  color: '#666'
                                }}>
                                  ₹1400/day
                                </div>
                                <button style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.8rem',
                                  fontWeight: 500,
                              cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={() => handleRideBookNow('TVS Auto Rickshaw','₹1400/day')}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#e67e22';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f29927';
                                }}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>

                            {/* 4 Seater Auto - Banaras */}
                            <div style={{
                              background: '#fff',
                              borderRadius: '0.8rem',
                              padding: '1.2rem',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              border: '1px solid #e0e0e0',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            >
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                marginBottom: '0.8rem'
                              }}>
                                <span style={{ fontSize: '2rem' }}>🛺</span>
                                <div>
                                  <div style={{
                                    fontWeight: 600,
                                    color: '#1a2a3a',
                                    fontSize: '1rem',
                                    marginBottom: '0.2rem'
                                  }}>
                                    Piaggio Ape City
                                  </div>
                                  <div style={{
                                    fontSize: '0.8rem',
                                    color: '#666'
                                  }}>
                                    4 Seater | Banaras
                                  </div>
                                </div>
                              </div>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <div style={{
                                  fontSize: '0.9rem',
                                  color: '#666'
                                }}>
                                  ₹1700/day
                                </div>
                                <button style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '0.5rem 1rem',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.8rem',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={() => handleRideBookNow('Piaggio Ape City','₹1700/day')}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#e67e22';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f29927';
                                }}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {/* Car Options */}
                    {selectedVehicleTypes.includes('car') && (
                      <>
                        {/* Swift Dzire */}
                        <div style={{
                                background: '#fff',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                        }}
                        >
                          {/* Company Logo */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              background: `
                                radial-gradient(circle at 25% 25%, rgba(135, 206, 235, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at 50% 10%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                              `,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                              position: 'relative',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                position: 'absolute',
                                top: '-12px',
                                right: '-12px',
                                width: '35px',
                                height: '35px',
                                background: 'rgba(135, 206, 235, 0.5)',
                                borderRadius: '50%',
                                zIndex: 0
                              }} />
                              <span style={{ position: 'relative', zIndex: 1 }}>🚙</span>
                              </div>
                              <button style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                              color: '#999',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#f29927';
                              }}
                              onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#999';
                              }}
                              >
                                🔖
                              </button>
                          </div>

                                {/* Company Name */}
                                <div style={{
                                  fontSize: '0.9rem',
                            color: '#666',
                                  marginBottom: '0.25rem'
                                }}>
                            Maruti Suzuki
                                </div>

                                {/* Posted Time */}
                                <div style={{
                                  fontSize: '0.8rem',
                                  color: '#999',
                            marginBottom: '0.75rem'
                                }}>
                                3 hours ago
                                </div>

                          {/* Job Title */}
                                <div style={{
                                  fontSize: '1.1rem',
                                  fontWeight: 700,
                                  color: '#1a1a1a',
                            marginBottom: '0.75rem',
                            lineHeight: '1.3'
                                }}>
                            Swift Dzire
                                </div>

                          {/* Job Type Tags */}
                                <div style={{
                                  display: 'flex',
                                  gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                                }}>
                                  <span style={{
                              background: '#f0f0f0',
                                    color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                                    fontWeight: 500
                                  }}>
                              4 Seater
                                  </span>
                                  <span style={{
                              background: '#f0f0f0',
                                    color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                                    fontWeight: 500
                                  }}>
                              AC
                                  </span>
                                </div>

                          {/* Salary */}
                                <div style={{
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  color: '#1a1a1a',
                            marginBottom: '0.5rem'
                                }}>
                            ₹12/km
                                </div>

                                {/* Location */}
                                <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '1.5rem'
                          }}>
                            All Cities, India
                                </div>

                                {/* Apply Button */}
                                <button style={{
                                  background: '#1a1a1a',
                                  color: '#fff',
                                  border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                                  fontSize: '0.9rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '100%'
                                }}
                          onClick={() => handleRideBookNow('Swift Dzire','₹12/km')}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#1a1a1a';
                            e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                >
                                  Book Now
                                </button>
                            </div>

                        {/* Innova Crysta */}
                            <div style={{
                              background: '#fff',
                          borderRadius: '0.75rem',
                              padding: '1.5rem',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          border: '1px solid #f0f0f0',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                            }}
                            >
                              {/* Company Logo */}
                              <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              background: `
                                radial-gradient(circle at 40% 30%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at 60% 70%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 20% 80%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                              `,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                              position: 'relative',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '-10px',
                                width: '30px',
                                height: '30px',
                                background: 'rgba(173, 216, 230, 0.6)',
                                borderRadius: '50%',
                                zIndex: 0
                              }} />
                              <span style={{ position: 'relative', zIndex: 1 }}>🚐</span>
                              </div>
                              <button style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                color: '#f29927',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                                transition: 'color 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#e67e22';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#f29927';
                              }}
                              >
                                🔖
                              </button>
                          </div>

                                {/* Company Name */}
                                <div style={{
                                  fontSize: '0.9rem',
                            color: '#666',
                                  marginBottom: '0.25rem'
                                }}>
                            Toyota
                                </div>

                                {/* Posted Time */}
                                <div style={{
                                  fontSize: '0.8rem',
                                  color: '#999',
                            marginBottom: '0.75rem'
                                }}>
                            4 hours ago
                                </div>

                          {/* Job Title */}
                                <div style={{
                                  fontSize: '1.1rem',
                                  fontWeight: 700,
                                  color: '#1a1a1a',
                            marginBottom: '0.75rem',
                            lineHeight: '1.3'
                                }}>
                            Innova Crysta
                                </div>

                          {/* Job Type Tags */}
                                <div style={{
                                  display: 'flex',
                                  gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                                }}>
                                  <span style={{
                              background: '#f0f0f0',
                                    color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                                    fontWeight: 500
                                  }}>
                              6 Seater
                                  </span>
                                  <span style={{
                              background: '#f0f0f0',
                                    color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                                    fontWeight: 500
                                  }}>
                              AC
                                  </span>
                                </div>

                          {/* Salary */}
                                <div style={{
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  color: '#1a1a1a',
                            marginBottom: '0.5rem'
                                }}>
                            ₹18/km
                                </div>

                                {/* Location */}
                                <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '1.5rem'
                          }}>
                            All Cities, India
                                </div>

                                {/* Apply Button */}
                                <button style={{
                                  background: '#1a1a1a',
                                  color: '#fff',
                                  border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                                  fontSize: '0.9rem',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '100%'
                                }}
                          onClick={() => handleRideBookNow('Innova Crysta','₹18/km')}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#1a1a1a';
                            e.currentTarget.style.transform = 'translateY(0)';
                                }}
                                >
                                  Book Now
                                </button>
                              </div>

                        {/* Ertiga */}
                        <div style={{
                          background: '#fff',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                        }}
                        >
                          {/* Company Logo */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                      }}>
                          <div style={{
                              width: '48px',
                              height: '48px',
                              background: `
                                radial-gradient(circle at 35% 25%, rgba(135, 206, 235, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 65% 75%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at 15% 60%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                              `,
                              borderRadius: '50%',
                        display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              position: 'relative',
                              overflow: 'hidden'
                      }}>
                        <div style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                width: '28px',
                                height: '28px',
                                background: 'rgba(135, 206, 235, 0.6)',
                                borderRadius: '50%',
                                zIndex: 0
                              }} />
                              <span style={{ position: 'relative', zIndex: 1 }}>🚐</span>
                        </div>
                        <button style={{
                              background: 'none',
                          border: 'none',
                              fontSize: '1.2rem',
                          cursor: 'pointer',
                              color: '#999',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                              transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#f29927';
                        }}
                        onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#999';
                        }}
                        >
                              🔖
                        </button>
                      </div>

                          {/* Company Name */}
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '0.25rem'
                          }}>
                            Maruti Suzuki
                    </div>

                          {/* Posted Time */}
                        <div style={{
                            fontSize: '0.8rem',
                            color: '#999',
                            marginBottom: '0.75rem'
                          }}>
                            5 hours ago
                          </div>

                          {/* Job Title */}
                              <div style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            marginBottom: '0.75rem',
                            lineHeight: '1.3'
                          }}>
                            Ertiga
                  </div>

                          {/* Job Type Tags */}
                              <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                                fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              6 Seater
                            </span>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              AC
                            </span>
                </div>

                          {/* Salary */}
                          <div style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1a1a1a',
                            marginBottom: '0.5rem'
                          }}>
                            ₹16/km
                          </div>

                          {/* Location */}
                            <div style={{
                              fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '1.5rem'
                            }}>
                            All Cities, India
                            </div>

                          {/* Apply Button */}
                            <button style={{
                            background: '#1a1a1a',
                              color: '#fff',
                              border: 'none',
                            padding: '0.75rem 1.5rem',
                              borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                              cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '100%'
                            }}
                          onClick={() => handleRideBookNow('Maruti Ertiga','₹16/km')}
                            onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1a1a1a';
                            e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                              Book Now
                            </button>
                          </div>
                      </>
                    )}

                    {/* Traveler Options */}
                    {selectedVehicleTypes.includes('traveler') && (
                      <>
                        {/* 11 Seater Traveler */}
                        <div style={{
                          background: '#fff',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                        }}
                        >
                          {/* Company Logo */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}>
                              <div style={{
                              width: '48px',
                              height: '48px',
                              background: `
                                radial-gradient(circle at 30% 20%, rgba(135, 206, 235, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at 70% 80%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 50% 50%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                              `,
                              borderRadius: '50%',
                            display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              position: 'relative',
                              overflow: 'hidden'
                          }}>
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                width: '32px',
                                height: '32px',
                                background: 'rgba(135, 206, 235, 0.5)',
                                borderRadius: '50%',
                                zIndex: 0
                              }} />
                              <span style={{ position: 'relative', zIndex: 1 }}>🚌</span>
                            </div>
                            <button style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '1.2rem',
                              cursor: 'pointer',
                              color: '#999',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                              transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#f29927';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#999';
                            }}
                            >
                              🔖
                            </button>
                          </div>

                          {/* Company Name */}
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '0.25rem'
                          }}>
                            Force Motors
                        </div>

                          {/* Posted Time */}
                        <div style={{
                            fontSize: '0.8rem',
                            color: '#999',
                            marginBottom: '0.75rem'
                          }}>
                            6 hours ago
                          </div>

                          {/* Job Title */}
                              <div style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            marginBottom: '0.75rem',
                            lineHeight: '1.3'
                          }}>
                            Traveler
                              </div>

                          {/* Job Type Tags */}
                              <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                                fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              11 Seater
                            </span>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              AC
                            </span>
                              </div>

                          {/* Salary */}
                          <div style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1a1a1a',
                            marginBottom: '0.5rem'
                          }}>
                            ₹25/km
                          </div>

                          {/* Location */}
                            <div style={{
                              fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '1.5rem'
                            }}>
                            All Cities, India
                            </div>

                          {/* Apply Button */}
                            <button style={{
                            background: '#1a1a1a',
                              color: '#fff',
                              border: 'none',
                            padding: '0.75rem 1.5rem',
                              borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                    cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '100%'
                            }}
                            onClick={() => handleRideBookNow('Force Traveler','₹25/km')}
                            onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1a1a1a';
                            e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                              Book Now
                            </button>
              </div>

                        {/* 15 Seater Traveler */}
                        <div style={{
                          background: '#fff',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                        }}
                        >
                          {/* Company Logo */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}>
                              <div style={{
                              width: '48px',
                              height: '48px',
                              background: `
                                radial-gradient(circle at 25% 30%, rgba(135, 206, 235, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 75% 70%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at 45% 15%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                              `,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              position: 'relative',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '-12px',
                                width: '35px',
                                height: '35px',
                                background: 'rgba(173, 216, 230, 0.6)',
                                borderRadius: '50%',
                                zIndex: 0
                              }} />
                              <span style={{ position: 'relative', zIndex: 1 }}>🚌</span>
                              </div>
                            <button style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '1.2rem',
                              cursor: 'pointer',
                              color: '#f29927',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                              transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#e67e22';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#f29927';
                            }}
                            >
                              🔖
                            </button>
                          </div>

                          {/* Company Name */}
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '0.25rem'
                          }}>
                            Tata Motors
                          </div>

                          {/* Posted Time */}
                              <div style={{
                                fontSize: '0.8rem',
                            color: '#999',
                            marginBottom: '0.75rem'
                              }}>
                            7 hours ago
                              </div>

                          {/* Job Title */}
                          <div style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            marginBottom: '0.75rem',
                            lineHeight: '1.3'
                          }}>
                            Winger
                            </div>

                          {/* Job Type Tags */}
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              15 Seater
                            </span>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              AC
                            </span>
                          </div>

                          {/* Salary */}
                            <div style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1a1a1a',
                            marginBottom: '0.5rem'
                            }}>
                              ₹32/km
                            </div>

                          {/* Location */}
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '1.5rem'
                          }}>
                            All Cities, India
                          </div>

                          {/* Apply Button */}
                            <button style={{
                            background: '#1a1a1a',
                              color: '#fff',
                              border: 'none',
                            padding: '0.75rem 1.5rem',
                              borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                              cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '100%'
                            }}
                            onClick={() => handleRideBookNow('Tata Winger','₹32/km')}
                            onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1a1a1a';
                            e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                              Book Now
                            </button>
                        </div>

                        {/* 21 Seater Traveler */}
                        <div style={{
                          background: '#fff',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                          border: '1px solid #f0f0f0',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                        }}
                        >
                          {/* Company Logo */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}>
                              <div style={{
                              width: '48px',
                              height: '48px',
                              background: `
                                radial-gradient(circle at 35% 25%, rgba(135, 206, 235, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 65% 75%, rgba(173, 216, 230, 0.4) 0%, transparent 50%),
                                radial-gradient(circle at 15% 60%, rgba(176, 224, 230, 0.2) 0%, transparent 50%),
                                linear-gradient(135deg, rgba(240, 248, 255, 0.8) 0%, rgba(230, 248, 255, 0.6) 100%)
                              `,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              position: 'relative',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '-10px',
                                width: '30px',
                                height: '30px',
                                background: 'rgba(173, 216, 230, 0.6)',
                                borderRadius: '50%',
                                zIndex: 0
                              }} />
                              <span style={{ position: 'relative', zIndex: 1 }}>🚌</span>
                              </div>
                            <button style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '1.2rem',
                              cursor: 'pointer',
                              color: '#999',
                              padding: '0.25rem',
                              borderRadius: '0.25rem',
                              transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#f29927';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#999';
                            }}
                            >
                              🔖
                            </button>
                          </div>

                          {/* Company Name */}
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '0.25rem'
                          }}>
                            Force Motors
                          </div>

                          {/* Posted Time */}
                              <div style={{
                                fontSize: '0.8rem',
                            color: '#999',
                            marginBottom: '0.75rem'
                              }}>
                            8 hours ago
                              </div>

                          {/* Job Title */}
                          <div style={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            marginBottom: '0.75rem',
                            lineHeight: '1.3'
                          }}>
                            Tempo Traveler
                            </div>

                          {/* Job Type Tags */}
                          <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              21 Seater
                            </span>
                            <span style={{
                              background: '#f0f0f0',
                              color: '#666',
                              fontSize: '0.8rem',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '1rem',
                              fontWeight: 500
                            }}>
                              AC
                            </span>
                          </div>

                          {/* Salary */}
                            <div style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#1a1a1a',
                            marginBottom: '0.5rem'
                            }}>
                              ₹45/km
                            </div>

                          {/* Location */}
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#666',
                            marginBottom: '1.5rem'
                          }}>
                            All Cities, India
                          </div>

                          {/* Apply Button */}
                            <button style={{
                            background: '#1a1a1a',
                              color: '#fff',
                              border: 'none',
                            padding: '0.75rem 1.5rem',
                              borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                              cursor: 'pointer',
                            transition: 'all 0.2s',
                            width: '100%'
                            }}
                            onClick={() => handleRideBookNow('Tempo Traveler','₹45/km')}
                            onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#333';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1a1a1a';
                            e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                              Book Now
                            </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
              )}
              </div>
            </div>
          )}
        </section>
        
      </div>
    </main>
  );
}




