'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const mockCabs = [
  {
    name: 'Swift Dzire',
    type: 'Sedan',
    price: 18,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['AC', '4 Passengers'],
    rating: 4.6,
    description: 'Comfortable and reliable Swift Dzire sedan perfect for city travel and airport transfers. Spacious interior with modern amenities.',
    specifications: ['Engine: 1.2L Petrol', 'Mileage: 22 km/l', 'Seating: 4 Passengers', 'Luggage: 2 Bags', 'AC: Yes', 'Music System: Yes'],
    amenities: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger'],
    policies: ['Free Cancellation: 2 hours before', 'Waiting Time: 15 minutes free', 'Extra Km: ₹12/km', 'Night Charges: 10% extra'],
  },
  {
    name: 'Toyota Innova',
    type: 'SUV',
    price: 28,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['AC', '6 Passengers'],
    rating: 4.8,
    description: 'Premium Toyota Innova SUV offering luxury and comfort for group travel. Perfect for family trips and business travel.',
    specifications: ['Engine: 2.4L Diesel', 'Mileage: 18 km/l', 'Seating: 6 Passengers', 'Luggage: 4 Bags', 'AC: Yes', 'Music System: Yes'],
    amenities: ['Air Conditioning', 'Premium Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Leather Seats'],
    policies: ['Free Cancellation: 3 hours before', 'Waiting Time: 20 minutes free', 'Extra Km: ₹18/km', 'Night Charges: 15% extra'],
  },
  {
    name: 'Tempo Traveller',
    type: 'Van',
    price: 40,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['AC', '12 Passengers'],
    rating: 4.4,
    description: 'Spacious Tempo Traveller van ideal for large groups, corporate events, and family gatherings. Comfortable seating for up to 12 passengers.',
    specifications: ['Engine: 2.5L Diesel', 'Mileage: 15 km/l', 'Seating: 12 Passengers', 'Luggage: 8 Bags', 'AC: Yes', 'Music System: Yes'],
    amenities: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Spacious Interior'],
    policies: ['Free Cancellation: 4 hours before', 'Waiting Time: 30 minutes free', 'Extra Km: ₹25/km', 'Night Charges: 20% extra'],
  },
];

const cardStyle = {
  background: '#fff',
  borderRadius: '1.5rem',
  boxShadow: '0 2px 16px rgba(122,107,87,0.13)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  minHeight: 340,
  position: 'relative',
  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
  cursor: 'pointer',
  animation: 'fadeInCabCard 0.7s cubic-bezier(.4,2,.6,1)',
} as React.CSSProperties;

const imgStyle = {
  width: '90%',
  height: 140,
  objectFit: 'cover',
  borderRadius: '1rem',
  marginBlock: '1rem',
  marginInline: 'auto',
  transition: 'transform 0.35s cubic-bezier(1,5,1,1)',
  boxShadow: '0 2px 12px #7A6B5722',
} as React.CSSProperties;

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
  background: 'linear-gradient(90deg,#7A6B57 60%,#f29927 100%)',
  color: '#fff',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  marginTop: 12,
  boxShadow: '0 2px 8px #7A6B5722',
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

function CabImageCarousel({ images }: { images: string[] }) {
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
      <img src={images[idx]} alt="Cab" style={imgStyle} />
      <div style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
        {images.map((_,i) => (
          <span
            key={i}
            onClick={e => {e.stopPropagation(); setIdx(i);}}
            style={{width:7,height:7,borderRadius:'50%',background:idx===i?'#7A6B57':'#e0c97c',display:'inline-block',cursor:'pointer',transition:'background 0.2s'}}
          />
        ))}
      </div>
    </div>
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
      `}</style>
    </div>
  );
}

export default function TaxiPage() {
  const router = useRouter();
  const [selectedCab, setSelectedCab] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (cab: any) => {
    console.log('View Details clicked for:', cab.name);
    setSelectedCab(cab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCab(null);
  };

  return (
    <main style={{padding:'3rem 2vw',maxWidth:'1200px',margin:'0 auto'}}>
      <h1 style={{fontSize:'2.5rem',fontWeight:800,marginBottom:'2rem',color:'#7A6B57'}}>Book a Cab</h1>
      <style>{`
        @keyframes fadeInCabCard {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
      }}>
        {mockCabs.map((cab, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.045) translateY(-6px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px #7A6B5733';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(122,107,87,0.13)';
            }}
          >
            <CabImageCarousel images={cab.images} />
            <span style={priceBadgeStyle}>₹{cab.price}/km</span>
            <div style={{padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:2}}>
                  <div style={{fontWeight: 800, fontSize: '1.3rem', color: '#7A6B57'}}>{cab.name}</div>
                  <span style={{fontWeight:600,fontSize:'1.05rem',color:'#f29927',marginLeft:8}}>{cab.type}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',marginBottom:6}}>
                  <StarBlock rating={cab.rating} />
                  <span style={{fontWeight:700,color:'#222',fontSize:'1.08rem',marginLeft:6}}>{cab.rating}</span>
                </div>
                <ul style={{margin: '8px 0 0 0', padding: 0, listStyle: 'none', color: '#666', fontSize: '1rem', fontWeight: 500}}>
                  {cab.features.map((feature, i) => (
                    <li key={i} style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                      <span style={{color: '#f29927', fontSize: '1.1em'}}>•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{display:'flex',gap:'0.7rem',marginTop:12}}>
                  <button 
                    style={outlineBtnStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(cab);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    View Details
                  </button>
                  <button 
                    style={btnStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/taxi/book/${cab.name.toLowerCase().replace(/\s+/g, '-')}`);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cab Details Modal */}
      {selectedCab && (
        <CabDetailsModal
          cab={selectedCab}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </main>
  );
}
