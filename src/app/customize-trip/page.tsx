'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const mockTrips = [
  {
    name: 'Golden Triangle Tour',
    type: 'Cultural',
    price: 25000,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Delhi, Agra, Jaipur', '7 Days, 6 Nights'],
    rating: 4.9,
    description: 'Experience the rich cultural heritage of India with our Golden Triangle Tour. Visit the iconic monuments of Delhi, the magnificent Taj Mahal in Agra, and the Pink City of Jaipur.',
    highlights: ['Taj Mahal Visit', 'Amber Fort', 'Red Fort', 'Qutub Minar', 'City Palace', 'Hawa Mahal'],
    itinerary: ['Day 1-2: Delhi Exploration', 'Day 3-4: Agra & Taj Mahal', 'Day 5-7: Jaipur & Amber Fort'],
    inclusions: ['Hotel Accommodation', 'Daily Breakfast', 'AC Transportation', 'Professional Guide', 'Monument Entries', 'Airport Transfers'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses', 'Optional Activities', 'Travel Insurance'],
  },
  {
    name: 'Himalayan Adventure',
    type: 'Adventure',
    price: 32000,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Trekking, Camping', '10 Days, 9 Nights'],
    rating: 4.7,
    description: 'Embark on an unforgettable adventure in the majestic Himalayas. Experience trekking, camping, and breathtaking mountain views that will leave you spellbound.',
    highlights: ['Mountain Trekking', 'Camping Under Stars', 'River Rafting', 'Village Visits', 'Sunrise Views', 'Local Cuisine'],
    itinerary: ['Day 1-3: Acclimatization & Base Camp', 'Day 4-7: Trekking & Camping', 'Day 8-10: Adventure Activities'],
    inclusions: ['Camping Equipment', 'Meals During Trek', 'Professional Guide', 'Safety Equipment', 'Transportation', 'Permits'],
    exclusions: ['Personal Gear', 'Travel Insurance', 'Personal Expenses', 'Tips & Gratuities'],
  },
  {
    name: 'Goa Beach Escape',
    type: 'Leisure',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Beaches, Nightlife', '5 Days, 4 Nights'],
    rating: 4.8,
    description: 'Relax and rejuvenate in the tropical paradise of Goa. Enjoy pristine beaches, vibrant nightlife, and delicious seafood in this coastal haven.',
    highlights: ['Beach Hopping', 'Water Sports', 'Nightlife', 'Seafood Dining', 'Church Visits', 'Spice Plantation'],
    itinerary: ['Day 1: Arrival & Beach Relaxation', 'Day 2-3: Beach Activities & Water Sports', 'Day 4: Sightseeing & Nightlife', 'Day 5: Departure'],
    inclusions: ['Beach Resort Stay', 'Daily Breakfast', 'Airport Transfers', 'Beach Activities', 'City Tour', 'Dinner Cruise'],
    exclusions: ['Water Sports', 'Personal Expenses', 'Alcoholic Beverages', 'Optional Tours'],
  },
];

const cardStyle = {
  background: '#fff',
  borderRadius: '1.5rem',
  boxShadow: '0 2px 16px rgba(166,123,91,0.13)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  minHeight: 340,
  position: 'relative',
  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
  cursor: 'pointer',
  animation: 'fadeInTripCard 0.7s cubic-bezier(.4,2,.6,1)',
} as React.CSSProperties;

const imgStyle = {
  width: '90%',
  height: 140,
  objectFit: 'cover',
  borderRadius: '1rem',
  marginBlock: '1rem',
  marginInline: 'auto',
  transition: 'transform 0.35s cubic-bezier(1,5,1,1)',
  boxShadow: '0 2px 12px #A67B5B22',
} as React.CSSProperties;

const chipStyle = {
  display: 'inline-block',
  background: '#f9e6d1',
  color: '#A67B5B',
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
  background: '#d48166',
  color: '#fff',
  fontWeight: 800,
  fontSize: '1.1rem',
  borderRadius: '1.2rem',
  padding: '0.5rem 1.2rem',
  boxShadow: '0 2px 8px #d4816640',
  zIndex: 2,
} as React.CSSProperties;

const btnStyle = {
  padding: '0.5rem 0',
  borderRadius: '0.8rem',
  background: 'linear-gradient(90deg,#A67B5B 60%,#d48166 100%)',
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
  color: '#A67B5B',
  border: '2px solid #A67B5B',
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
      <img src={images[idx]} alt="Trip" style={imgStyle} />
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
  const router = useRouter();

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
                ...btnStyle,
                flex: 1,
                padding: '1rem',
                fontSize: '1.1rem',
              }}
              onClick={() => router.push(`/customize-trip/customize/${trip.name.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              Customize Trip
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

export default function CustomizeTripPage() {
  const router = useRouter();
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <main style={{padding:'3rem 2vw',maxWidth:'1200px',margin:'0 auto'}}>
      <h1 style={{fontSize:'2.5rem',fontWeight:800,marginBottom:'2rem',color:'#A67B5B'}}>Customize Your Trip</h1>
      <style>{`
        @keyframes fadeInTripCard {
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
        {mockTrips.map((trip, idx) => (
          <div
            key={idx}
            style={cardStyle}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.045) translateY(-6px)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px #A67B5B33';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(166,123,91,0.13)';
            }}
          >
            <TripImageCarousel images={trip.images} />
            <span style={priceBadgeStyle}>₹{trip.price}</span>
            <div style={{padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:2}}>
                  <div style={{fontWeight: 800, fontSize: '1.3rem', color: '#A67B5B'}}>{trip.name}</div>
                  <span style={{fontWeight:600,fontSize:'1.05rem',color:'#d48166',marginLeft:8}}>{trip.type}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',marginBottom:6}}>
                  <StarBlock rating={trip.rating} />
                  <span style={{fontWeight:700,color:'#222',fontSize:'1.08rem',marginLeft:6}}>{trip.rating}</span>
                </div>
                <ul style={{margin: '8px 0 0 0', padding: 0, listStyle: 'none', color: '#666', fontSize: '1rem', fontWeight: 500}}>
                  {trip.features.map((feature, i) => (
                    <li key={i} style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                      <span style={{color: '#d48166', fontSize: '1.1em'}}>•</span> {feature}
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
                      handleViewDetails(trip);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    View Details
                  </button>
                  <button 
                    style={btnStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/customize-trip/customize/${trip.name.toLowerCase().replace(/\s+/g, '-')}`);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <TripDetailsModal
          trip={selectedTrip}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </main>
  );
} 