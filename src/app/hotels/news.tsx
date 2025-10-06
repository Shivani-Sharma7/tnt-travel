'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  gap: 10,
  minHeight: 400,
  position: 'relative',
  minWidth: 280,
  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
  cursor: 'pointer',
  animation: 'fadeInHotelCard 0.7s cubic-bezier(.4,2,.6,1)',
} as React.CSSProperties;

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
      <img src={images[idx]} alt="Hotel" style={{width: '90%', height: 170, objectFit: 'cover', borderRadius: '1rem', marginBlock: '1rem', marginInline: 'auto', transition: 'transform 0.35s cubic-bezier(1,5,1,1)', boxShadow: '0 2px 12px #7A6B5722'}} />
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
  transition: 'all 0.2s ease',
};

export default function HotelsNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg, rgb(241, 227, 245) 0%, #f8e7d2 100%)' }}>
      <main style={{padding:'3rem 2vw',maxWidth:'1200px',margin:'0 auto'}}>
        <h1 style={{textAlign:'center',fontWeight:800,fontSize:'2.5rem',color:'#222',marginBottom:'2.8rem',letterSpacing:'-1px',textShadow:'0 2px 8px #e0e0e0'}}>Hotel News & Highlights</h1>
        <section style={{
          width: '100%',
          margin: '0 auto 3rem auto',
          display: 'flex',
          gap: '2.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'luxury' ? '' : 'luxury')}
            style={{
              background: selectedCategory === 'luxury' ? 'linear-gradient(90deg,#A67B5B 85%,#D8CAB8 15%)' : '#f4f8ef',
              color: selectedCategory === 'luxury' ? '#fff' : '#222',
              border: selectedCategory === 'luxury' ? '2px solid #A67B5B' : '2px solid #eee',
              borderRadius: '1.2rem',
              padding: '2.2rem 2rem 1.5rem 2rem',
              flex:'1 1 320px',
              maxWidth:340,
              minWidth:260,
              boxShadow:'0 2px 16px #b7e4c740',
              display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',
              fontWeight:700,
              fontSize:'1.1rem',
              cursor:'pointer',
              transition:'all 0.2s',
              outline: selectedCategory === 'luxury' ? '2px solid #A67B5B' : 'none',
            }}
          >
            <span style={{fontSize:80,marginBottom:'1.2rem'}}>🏨</span>
            <span style={{fontWeight:700,fontSize:'1.3rem',marginBottom:'0.6rem'}}>Luxury Hotels</span>
            <span style={{color:'#444',fontSize:'1.02rem',fontWeight:500,lineHeight:1.4}}>
              Experience world-class comfort and amenities in our selection of <b>luxury hotels</b>, perfect for those seeking elegance, premium service, and unforgettable stays.
            </span>
          </button>
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'traditional' ? '' : 'traditional')}
            style={{
              background: selectedCategory === 'traditional' ? 'linear-gradient(90deg,#A67B5B 85%,#D8CAB8 15%)' : '#f4f8ef',
              color: selectedCategory === 'traditional' ? '#fff' : '#222',
              border: selectedCategory === 'traditional' ? '2px solid #A67B5B' : '2px solid #eee',
              borderRadius: '1.2rem',
              padding: '2.2rem 2rem 1.5rem 2rem',
              flex:'1 1 320px',
              maxWidth:340,
              minWidth:260,
              boxShadow:'0 2px 16px #b7e4c740',
              display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',
              fontWeight:700,
              fontSize:'1.1rem',
              cursor:'pointer',
              transition:'all 0.2s',
              outline: selectedCategory === 'traditional' ? '2px solid #A67B5B' : 'none',
            }}
          >
            <span style={{fontSize:80,marginBottom:'1.2rem'}}>🏡</span>
            <span style={{fontWeight:700,fontSize:'1.3rem',marginBottom:'0.6rem'}}>Traditional Hotels & Homestays</span>
            <span style={{color:'#444',fontSize:'1.02rem',fontWeight:500,lineHeight:1.4}}>
              Enjoy a warm, authentic experience in <b>traditional hotels</b> and <b>homestays</b>, where local culture and hospitality make you feel right at home.
            </span>
          </button>
          <button
            onClick={() => setSelectedCategory(selectedCategory === 'budget' ? '' : 'budget')}
            style={{
              background: selectedCategory === 'budget' ? 'linear-gradient(90deg,#A67B5B 85%,#D8CAB8 15%)' : '#f4f8ef',
              color: selectedCategory === 'budget' ? '#fff' : '#222',
              border: selectedCategory === 'budget' ? '2px solid #A67B5B' : '2px solid #eee',
              borderRadius: '1.2rem',
              padding: '2.2rem 2rem 1.5rem 2rem',
              flex:'1 1 320px',
              maxWidth:340,
              minWidth:260,
              boxShadow:'0 2px 16px #b7e4c740',
              display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',
              fontWeight:700,
              fontSize:'1.1rem',
              cursor:'pointer',
              transition:'all 0.2s',
              outline: selectedCategory === 'budget' ? '2px solid #A67B5B' : 'none',
            }}
          >
            <span style={{fontSize:80,marginBottom:'1.2rem'}}>💸</span>
            <span style={{fontWeight:700,fontSize:'1.3rem',marginBottom:'0.6rem'}}>Budget Hotels</span>
            <span style={{color:'#444',fontSize:'1.02rem',fontWeight:500,lineHeight:1.4}}>
              Find the best value for your money with our <b>budget hotels</b>, offering comfort and convenience at affordable prices for every traveler.
            </span>
          </button>
        </section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginTop: '2rem',
        }}>
          {(selectedCategory
            ? mockHotels.filter(hotel =>
                selectedCategory === 'luxury' ? hotel.price >= 120 :
                selectedCategory === 'budget' ? hotel.price < 100 :
                selectedCategory === 'traditional' ? /traditional|homestay|inn/i.test(hotel.name + hotel.description + hotel.location) :
                true
              )
            : mockHotels
          ).map((hotel, idx) => (
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
                  <span style={{background: '#E2B89B', color: '#7A6B57', fontWeight: 700, fontSize: '0.98rem', borderRadius: '1rem', padding: '0.3rem 1rem', marginBottom: 10, marginTop: 2, letterSpacing: '0.2px'}}>{hotel.location}</span>
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
                        // No modal on news page for simplicity
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
      </main>
    </div>
  );
} 