'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const mockHotels = [
  {
    name: 'The Grand Palace',
    location: 'Jaipur, India',
    price: 120,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Free WiFi', 'Breakfast Included'],
    rating: 4.7,
    description: 'Experience luxury and comfort at The Grand Palace, located in the heart of Jaipur. This 5-star hotel offers world-class amenities and stunning views of the Pink City.',
    amenities: ['Free WiFi', 'Breakfast Included', 'Swimming Pool', 'Spa & Wellness', 'Restaurant', 'Room Service', 'Air Conditioning', 'Free Parking'],
    rooms: ['Deluxe Room', 'Suite', 'Family Room', 'Executive Room'],
    policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Free cancellation until 24 hours before arrival'],
  },
  {
    name: 'Seaside Resort',
    location: 'Goa, India',
    price: 95,
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Beach Access', 'Swimming Pool'],
    rating: 4.5,
    description: 'Escape to paradise at Seaside Resort, where pristine beaches meet luxury accommodation. Perfect for a relaxing beach vacation in Goa.',
    amenities: ['Beach Access', 'Swimming Pool', 'Beach Bar', 'Water Sports', 'Spa', 'Restaurant', 'Free WiFi', 'Air Conditioning'],
    rooms: ['Beach View Room', 'Garden Villa', 'Pool Suite', 'Standard Room'],
    policies: ['Check-in: 3:00 PM', 'Check-out: 12:00 PM', 'Free cancellation until 48 hours before arrival'],
  },
  {
    name: 'Mountain View Inn',
    location: 'Manali, India',
    price: 80,
    images: [
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Mountain View', 'Free Parking'],
    rating: 4.2,
    description: 'Nestled in the Himalayas, Mountain View Inn offers breathtaking views and cozy accommodations perfect for adventure seekers and nature lovers.',
    amenities: ['Mountain View', 'Free Parking', 'Bonfire', 'Adventure Tours', 'Restaurant', 'Free WiFi', 'Heating', 'Garden'],
    rooms: ['Mountain View Room', 'Cottage', 'Deluxe Room', 'Family Suite'],
    policies: ['Check-in: 1:00 PM', 'Check-out: 10:00 AM', 'Free cancellation until 72 hours before arrival'],
  },
  {
    name: 'City Lights Hotel',
    location: 'Mumbai, India',
    price: 150,
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=facearea&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80',
    ],
    features: ['Rooftop Bar', 'Gym Access'],
    rating: 4.9,
    description: 'Experience the vibrant energy of Mumbai from the comfort of City Lights Hotel. Modern amenities and stunning city views await you.',
    amenities: ['Rooftop Bar', 'Gym Access', 'Business Center', 'Restaurant', 'Free WiFi', 'Air Conditioning', 'Valet Parking', 'Concierge'],
    rooms: ['City View Room', 'Executive Suite', 'Business Room', 'Deluxe Room'],
    policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'Free cancellation until 24 hours before arrival'],
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
  minHeight: 400,
  position: 'relative',
  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
  cursor: 'pointer',
  animation: 'fadeInHotelCard 0.7s cubic-bezier(.4,2,.6,1)',
} as React.CSSProperties;

const imgStyle = {
  width: '90%',
  height: 170,
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
  transition: 'all 0.2s ease',
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

function HotelImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i+1)%images.length), 5000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div
      style={{position:'relative',width:'100%',height:190,display:'flex',alignItems:'center',justifyContent:'center',background:'#f9f6f2'}}
      onMouseEnter={() => setIdx(i => (i+1)%images.length)}
    >
      <img src={images[idx]} alt="Hotel" style={imgStyle} />
      <div style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6}}>
        {images.map((_,i) => (
          <span
            key={i}
            onClick={e => {e.stopPropagation(); setIdx(i);}}
            style={{width:7,height:7,borderRadius:'50%',background:idx===i?'#7A6B57':'#E2B89B',display:'inline-block',cursor:'pointer',transition:'background 0.2s'}}
          />
        ))}
      </div>
    </div>
  );
}

function HotelDetailsModal({ hotel, isOpen, onClose }: { hotel: any; isOpen: boolean; onClose: () => void }) {
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
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Image Navigation */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
            {hotel.images.map((_: string, index: number) => (
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
            ₹{hotel.price}/night
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#7A6B57', margin: 0 }}>{hotel.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StarBlock rating={hotel.rating} />
                <span style={{ fontWeight: 700, color: '#222', fontSize: '1.1rem' }}>{hotel.rating}</span>
              </div>
            </div>
            <div style={{ color: '#666', fontSize: '1.1rem', fontWeight: 500 }}>{hotel.location}</div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>{hotel.description}</p>
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Amenities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {hotel.amenities.map((amenity: string, index: number) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                  <span style={{ color: '#f29927', fontSize: '1.1em' }}>✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Room Types</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {hotel.rooms.map((room: string, index: number) => (
                <span
                  key={index}
                  style={{
                    background: '#E2B89B',
                    color: '#7A6B57',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  {room}
                </span>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7A6B57', marginBottom: '1rem' }}>Hotel Policies</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {hotel.policies.map((policy: string, index: number) => (
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

export default function HotelsPage() {
  const router = useRouter();
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [filter, setFilter] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (hotel: any) => {
    console.log('View Details clicked for:', hotel.name);
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <main style={{padding:'3rem 2vw',maxWidth:'1200px',margin:'0 auto'}}>
      <h1 style={{fontSize:'2.5rem',fontWeight:800,marginBottom:'2rem',color:'#7A6B57'}}>Find Hotels</h1>
      <style>{`
        @keyframes fadeInHotelCard {
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
        {mockHotels.map((hotel, idx) => (
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
            <HotelImageCarousel images={hotel.images} />
            <span style={priceBadgeStyle}>₹{hotel.price}/night</span>
            <div style={{padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:2}}>
                  <div style={{fontWeight: 800, fontSize: '1.3rem', color: '#7A6B57'}}>{hotel.name}</div>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',marginBottom:6}}>
                  <StarBlock rating={hotel.rating} />
                  <span style={{fontWeight:700,color:'#222',fontSize:'1.08rem',marginLeft:6}}>{hotel.rating}</span>
                </div>
                <span style={chipStyle}>{hotel.location}</span>
                <ul style={{margin: '8px 0 0 0', padding: 0, listStyle: 'none', color: '#666', fontSize: '1rem', fontWeight: 500}}>
                  {hotel.features.map((feature, i) => (
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
                      handleViewDetails(hotel);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    View Details
                  </button>
                  <button 
                    style={btnStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/hotels/book/${hotel.name.toLowerCase().replace(/\s+/g, '-')}`);
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

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <HotelDetailsModal
          hotel={selectedHotel}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </main>
  );
}