'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const mockHotels = [
  // Mathura
  {
    id: 'krishna-inn-mathura',
    name: 'Krishna Inn',
    location: 'Mathura, India',
    price: 95,
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 340,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=70',
    ],
    features: ['Free WiFi', 'Breakfast Included'],
    rating: 4.5,
    description: 'Comfortable stay near Shri Krishna Janmabhoomi with easy access to local temples and markets.',
    amenities: ['Free WiFi', 'Breakfast Included', 'Air Conditioning', 'Restaurant', 'Free Parking', 'Room Service'],
    rooms: ['Standard Room', 'Deluxe Room', 'Family Room'],
    policies: ['Check-in: 1:00 PM', 'Check-out: 11:00 AM', 'Free cancellation till 24 hours before arrival'],
  },
  {
    id: 'yamuna-retreat-mathura',
    name: 'Yamuna Retreat',
    location: 'Mathura, India',
    price: 120,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 420,
    images: [
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1501117716987-c8e3f1e3ecb4?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1520697222867-9e0b2f1f7a32?auto=format&fit=crop&w=800&q=70',
    ],
    features: ['River View', 'Rooftop Dining'],
    rating: 4.3,
    description: 'Modern hotel with views of the Yamuna and quick rides to Vrindavan and Dwarkadheesh Temple.',
    amenities: ['River View', 'Restaurant', 'Lift', 'Free WiFi', 'Air Conditioning', 'Parking'],
    rooms: ['River View Room', 'Suite', 'Family Suite'],
    policies: ['Check-in: 2:00 PM', 'Check-out: 12:00 PM'],
  },
  // Banaras (Varanasi)
  {
    id: 'ghat-view-banaras',
    name: 'Ghat View Hotel',
    location: 'Banaras, India',
    price: 110,
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 360,
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3aa1?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=70',
    ],
    features: ['Near Ghat', 'Cafe'],
    rating: 4.7,
    description: 'Steps away from the ghats with a cozy cafe and evening aarti experience.',
    amenities: ['Free WiFi', 'Cafe', 'Air Conditioning', 'Airport Transfer', 'City Tours'],
    rooms: ['City View Room', 'Deluxe Room'],
    policies: ['Check-in: 12:00 PM', 'Check-out: 11:00 AM'],
  },
  {
    id: 'sarnath-suites-banaras',
    name: 'Sarnath Suites',
    location: 'Banaras, India',
    price: 145,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 500,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=70',
      'https://images.unsplash.com/photo-1551776235-dde6d4829808?auto=format&fit=crop&w=800&q=70',
    ],
    features: ['Suite Rooms', 'Business Friendly'],
    rating: 4.4,
    description: 'Spacious suites close to Sarnath with business facilities and swift connectivity.',
    amenities: ['Free WiFi', 'Restaurant', 'Gym', 'Conference Room', 'Parking'],
    rooms: ['Executive Suite', 'Family Suite'],
    policies: ['Check-in: 2:00 PM', 'Check-out: 12:00 PM'],
  },
];



const cardStyle = {
  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
  borderRadius: '1.2rem',
  boxShadow: '0 6px 24px rgba(122,107,87,0.15)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: 7,
  minHeight: 315,
  position: 'relative',
  minWidth: 300,
  maxWidth: 450,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  animation: 'fadeInHotelCard 0.8s cubic-bezier(.4,2,.6,1)',
  border: '1px solid rgba(255,255,255,0.8)',
} as React.CSSProperties;

const imgStyle = {
  width: '100%',
  height: 140,
  objectFit: 'cover',
  borderRadius: '0.8rem',
  marginBlock: '0.7rem',
  marginInline: 'auto',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 3px 14px rgba(0,0,0,0.1)',
  filter: 'brightness(1.05)',
} as React.CSSProperties;

const chipStyle = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #E2B89B 0%, #D8CAB8 100%)',
  color: '#7A6B57',
  fontWeight: 700,
  fontSize: '0.85rem',
  borderRadius: '0.8rem',
  padding: '0.3rem 1rem',
  marginBottom: 7,
  marginTop: 1,
  letterSpacing: '0.2px',
  boxShadow: '0 2px 6px rgba(226,184,155,0.3)',
} as React.CSSProperties;

const priceBadgeStyle = {
  position: 'absolute',
  top: 13,
  right: 13,
  background: 'linear-gradient(135deg, #f29927 0%, #f4a261 100%)',
  color: '#fff',
  fontWeight: 800,
  fontSize: '0.95rem',
  borderRadius: '1rem',
  padding: '0.4rem 1rem',
  boxShadow: '0 3px 12px rgba(242, 153, 39, 0.4)',
  zIndex: 2,
  backdropFilter: 'blur(10px)',
} as React.CSSProperties;

const btnStyle = {
  padding: '0.4rem 0.8rem',
  borderRadius: '0.8rem',
  background: 'linear-gradient(135deg, #A67B5B 0%, #C19A6B 100%)',
  color: '#fff',
  fontWeight: 700,
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  marginTop: 8,
  boxShadow: '0 3px 12px rgba(166,123,91,0.3)',
  letterSpacing: '0.3px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  flex: 1,
  minWidth: 0,
  maxWidth: '100%',
  display: 'block',
  position: 'relative',
  overflow: 'hidden',
} as React.CSSProperties;

const outlineBtnStyle = {
  ...btnStyle,
  background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
  color: '#7A6B57',
  border: '2px solid #A67B5B',
  boxShadow: '0 4px 16px rgba(166,123,91,0.15)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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

        {/* Images Collection */}
        <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', background:'#fff', maxHeight: '85vh', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
            {hotel.images.map((src: string, index: number) => (
              <img key={`grid-${index}`} src={src} alt={`${hotel.name}-${index+1}`} style={{ width:'100%', height:200, objectFit:'cover', borderRadius:'1rem', boxShadow:'0 2px 12px rgba(0,0,0,0.08)' }} />
            ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '0 1.5rem 1.5rem 1.5rem', background:'#fff' }}>
        <div style={{ letterSpacing: '2px', fontWeight: 900, color: '#222', textTransform: 'uppercase' }}>ARE YOU READY TO STAY WITH US?</div>
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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const hotelGridRef = useRef<HTMLDivElement>(null);

  // City -> popular landmark and distance (fallbacks included)
  const getNearestLandmark = (hotel: any) => {
    const cityKey = ((hotel.location || '').split(',')[0] || '').trim().toLowerCase();
    const mapping: Record<string, { city: string; landmark: string; km: number }> = {
      jaipur: { city: 'Jaipur', landmark: 'Hawa Mahal', km: 2.0 },
      goa: { city: 'Goa', landmark: 'Calangute Beach', km: 1.2 },
      manali: { city: 'Manali', landmark: 'Hadimba Devi Temple', km: 2.3 },
      mumbai: { city: 'Mumbai', landmark: 'Gateway of India', km: 3.1 },
      mathura: { city: 'Mathura', landmark: 'Sri Krishna Janmabhoomi', km: 4.9 },
      vrindavan: { city: 'Vrindavan', landmark: 'Banke Bihari Temple', km: 2.1 },
    };
    const fallbackCity = (hotel.location || '').split(',')[0] || 'City';
    return mapping[cityKey] || { city: fallbackCity, landmark: 'Popular Landmark', km: 1.0 };
  };

  const handleViewDetails = (hotel: any) => {
    console.log('View Details clicked for:', hotel.name);
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHotel(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
    setTimeout(() => {
      hotelGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // slight delay to allow filter to apply
  };

  const handleLocationClick = (loc: string) => {
    setSelectedLocation(selectedLocation === loc ? '' : loc);
    setTimeout(() => {
      hotelGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
        padding: '3rem 2rem 6rem 2rem',
        margin: '2rem 0 0 0',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Hero Section */}
        <section
          style={{
            position: 'relative',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            height: 300,
            marginBottom: '2.5rem',
            boxShadow: '0 16px 48px rgba(0,0,0,0.18)'
          }}
        >
          <img
            src={'/activity/hotels.jpg'}
            alt="Hotels hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)' }} />
          <div style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', color: '#fff' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Find Perfect Stay for you</h1>
            <p style={{ marginTop: '0.6rem', fontSize: '1.1rem', maxWidth: 560, lineHeight: 1.5 }}>
              Handpicked luxury, traditional homestays, and budget-friendly hotels across India. Book with confidence.
            </p>
          </div>
        </section>
        
        <section style={{
          width: '100%',
          margin: '0 0 3rem auto',
        }}>
          {/* Location Selector - like taxi segmented control */}
          <div style={{
            width: '100%',
            margin: '0 auto 1.2rem auto',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            alignItems: 'center'
          }}>
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: selectedLocation === 'Mathura' ? '#fff' : 'transparent',
                  color: selectedLocation === 'Mathura' ? '#333' : '#fff',
                  borderRadius: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minWidth: '170px',
                  justifyContent: 'center'
                }}
                onClick={() => handleLocationClick('Mathura')}
              >
                <span style={{ fontSize: '1.2rem' }}>🛕</span>
                <span>Mathura</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: selectedLocation === 'Banaras' ? '#fff' : 'transparent',
                  color: selectedLocation === 'Banaras' ? '#333' : '#fff',
                  borderRadius: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minWidth: '170px',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                onClick={() => handleLocationClick('Banaras')}
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
          </div>
          <div style={{
            width: '100%',
            margin: '0 auto 1.2rem auto',
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            alignItems: 'center'
          }}>
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: selectedCategory === 'traditional' ? '#fff' : 'transparent',
                  color: selectedCategory === 'traditional' ? '#333' : '#fff',
                  borderRadius: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minWidth: '180px',
                  justifyContent: 'center'
                }}
                onClick={() => handleCategoryClick('traditional')}
              >
                <span style={{ fontSize: '1.2rem' }}>🏛️</span>
                <span>Traditional</span>
              </div>

              <div
                style={{
              display: 'flex',
              alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: selectedCategory === 'luxury' ? '#fff' : 'transparent',
                  color: selectedCategory === 'luxury' ? '#333' : '#fff',
                  borderRadius: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minWidth: '150px',
              justifyContent: 'center'
                }}
                onClick={() => handleCategoryClick('luxury')}
              >
                <span style={{ fontSize: '1.2rem' }}>🏖️</span>
                <span>Luxury</span>
            </div>

              <div
            style={{
              display: 'flex',
              alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: selectedCategory === 'budget' ? '#fff' : 'transparent',
                  color: selectedCategory === 'budget' ? '#333' : '#fff',
                  borderRadius: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minWidth: '180px',
              justifyContent: 'center'
                }}
                onClick={() => handleCategoryClick('budget')}
              >
                <span style={{ fontSize: '1.2rem' }}>💰</span>
                <span>Budget</span>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          
        </section>
        {/* Filtered hotel cards grid below */}
        
        <style>{`
          @keyframes fadeInHotelCard {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes hotelBookShake { 0%{transform:translateX(0)} 20%{transform:translateX(-2px)} 40%{transform:translateX(2px)} 60%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 100%{transform:translateX(0)} }
        `}</style>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem',
        }} ref={hotelGridRef}>
          {(mockHotels
            .filter(hotel => {
              if (!selectedLocation) return true;
              const city = (hotel.location || '').split(',')[0];
              return city.toLowerCase() === selectedLocation.toLowerCase();
            })
            .filter(hotel => {
              if (!selectedCategory) return true;
              if (selectedCategory === 'luxury') return hotel.price >= 120;
              if (selectedCategory === 'budget') return hotel.price < 100;
              if (selectedCategory === 'traditional') return /traditional|homestay|inn/i.test(hotel.name + hotel.description + hotel.location);
              return true;
            })
          ).map((hotel, idx) => {
            const roomTitle = (hotel.rooms && hotel.rooms[0]) || hotel.name;
            const bedCount = (hotel as any).bedrooms ?? 1;
            const bathCount = (hotel as any).bathrooms ?? 1;
            const sqft = (hotel as any).areaSqft ?? (300 + idx * 100);
            // Removed category pill/tag
            return (
            <div
              key={idx}
              style={{
                  background: '#fff',
                  borderRadius: '1.2rem',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                cursor: 'pointer',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  filter: (hotel.location || '').toLowerCase().includes('banaras') ? 'grayscale(100%)' : 'none',
                  opacity: (hotel.location || '').toLowerCase().includes('banaras') ? 0.7 : 1,
              }}
              onMouseEnter={e => {
                  if (!(hotel.location || '').toLowerCase().includes('banaras')) {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                    const btn = e.currentTarget.querySelector('button[data-book="true"]') as HTMLButtonElement;
                    if (btn) {
                      btn.style.animation = 'hotelBookShake 0.45s ease-in-out 1';
                      setTimeout(() => { if (btn) btn.style.animation = ''; }, 500);
                    }
                  }
              }}
              onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
                }}
                onClick={() => !(hotel.location || '').toLowerCase().includes('banaras') && handleViewDetails(hotel)}
              >
                <div style={{ position: 'relative', height: 170, background:'#f9f6f2' }}>
                  <img src={hotel.images[0]} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1rem 1.2rem' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ color:'#1e6f5c', fontWeight:800, fontSize:'1.25rem' }}>₹{hotel.price} <span style={{color:'#888',fontWeight:500,fontSize:'0.9rem'}}> /night</span></div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ color:'#f29927' }}>★</span>
                      <span style={{ fontWeight:700, color:'#444' }}>{hotel.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div style={{ fontWeight:700, color:'#222', marginBottom: 6 }}>{roomTitle}</div>
                  {(() => {
                    const info = getNearestLandmark(hotel);
                    return (
                      <div style={{ color:'#444', fontSize:'0.9rem', marginBottom: 10 }}>
                        <span style={{ color:'#1e6f5c', fontWeight:700 }}>{info.city}</span>
                        <span style={{ color:'#999', margin:'0 6px' }}>|</span>
                        <span>{info.km.toFixed(1)} km drive to {info.landmark}</span>
                      </div>
                    );
                  })()}
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
                  <div style={{ display:'flex', justifyContent:'flex-end', marginTop: 12 }}>
                    <button
                      style={{
                        background: (hotel.location || '').toLowerCase().includes('banaras') 
                          ? 'linear-gradient(135deg, #ccc, #999)' 
                          : 'linear-gradient(135deg, #f29927, #e67e22)',
                      color: '#fff',
                      border: 'none',
                        borderRadius: '0.8rem',
                        padding: '0.6rem 1rem',
                      fontWeight: 700,
                      cursor: (hotel.location || '').toLowerCase().includes('banaras') ? 'not-allowed' : 'pointer',
                        boxShadow: (hotel.location || '').toLowerCase().includes('banaras') 
                          ? '0 2px 8px rgba(153,153,153,0.35)' 
                          : '0 2px 8px rgba(242,153,39,0.35)',
                        opacity: (hotel.location || '').toLowerCase().includes('banaras') ? 0.6 : 1
                      }}
                      data-book={"true"}
                      disabled={(hotel.location || '').toLowerCase().includes('banaras')}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (!(hotel.location || '').toLowerCase().includes('banaras')) {
                          router.push(`/hotels/book/${hotel.id}`); 
                        }
                      }}
                      onMouseEnter={(e) => { 
                        if (!(hotel.location || '').toLowerCase().includes('banaras')) {
                          e.currentTarget.style.transform = 'translateY(-2px)'; 
                        }
                      }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {(hotel.location || '').toLowerCase().includes('banaras') ? 'Coming Soon' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



        {/* Hotel Details Modal */}
        {selectedHotel && (
          <HotelDetailsModal
            hotel={selectedHotel}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
      </main>
  );
}