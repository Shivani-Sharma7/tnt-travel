"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TripCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  route: string;
  category: string;
  placesCovered?: string[];
}

interface VehicleOption {
  id: string;
  name: string;
  category: string;
  capacity: number;
  priceText: string;
  icon: string;
}

const vehicleInventory: VehicleOption[] = [
  { id: 'auto-3', name: 'Bajaj Auto Rickshaw', category: 'Auto', capacity: 3, priceText: '₹1200/day', icon: '🛺' },
  { id: 'auto-4', name: 'Mahindra Alfa Plus', category: 'Auto', capacity: 4, priceText: '₹1500/day', icon: '🛺' },
  { id: 'sedan-4', name: 'Swift Dzire (AC)', category: 'Sedan', capacity: 4, priceText: '₹2200/km', icon: '🚗' },
  { id: 'sedan-4p', name: 'Sedan Prime (AC)', category: 'Sedan', capacity: 4, priceText: '₹2400/km', icon: '🚗' },
  { id: 'suv-6', name: 'Maruti Ertiga (AC)', category: 'SUV', capacity: 6, priceText: '₹2800/km', icon: '🚙' },
  { id: 'suv-6p', name: 'Innova Crysta (AC)', category: 'SUV', capacity: 6, priceText: '₹3000/km', icon: '🚙' },
  { id: 'Eeho-7', name: 'Echon (AC)', category: 'Sedan', capacity: 7, priceText: '₹2400/km', icon: '🚙' },
  { id: 'trav-11', name: 'Force Traveler 11', category: 'Traveler', capacity: 11, priceText: '₹6000/km', icon: '🚌' },
  { id: 'trav-15', name: 'Tata Winger 15', category: 'Traveler', capacity: 15, priceText: '₹6500/km', icon: '🚌' }
];

const tripData: TripCard[] = [
  {
    id: 1,
    title: "Mathura Vrindavan 1 Day Tour Package",
    subtitle: "GET STARTED",
    description: "Experience the divine essence of Mathura and Vrindavan in a comprehensive one-day tour. Visit sacred temples, historical sites, and immerse yourself in the spiritual atmosphere of Lord Krishna's birthplace.",
    image: "/activity/mathura.png",
    route: "#",
    category: "Heritage",
    placesCovered: [
      "Krishna Janambhoomi",
      "Gokul",
      "Birla Mandir",
      "Pagal Baba Mandir",
      "ISKCON Temple",
      "Banke Bihari Temples",
      "Vaishno Devi Temple",
      "Nidhivan",
      "Prem Mandir"
    ]
  },
  {
    id: 2,
    title: "Mathura Vrindavan Barsana 2 Day Trip",
    subtitle: "EXTENDED HERITAGE",
    description: "Embark on a comprehensive 2-day spiritual journey covering Mathura, Vrindavan, and Barsana. Experience the divine atmosphere of Radha Rani's birthplace and explore the sacred Braj region in depth.",
    image: "/activity/yamuna.jpg",
    route: "#",
    category: "Heritage",
    placesCovered: [
      "Krishna Janambhoomi",
      "Gokul",
      "Birla Mandir",
      "Pagal Baba Mandir",
      "ISKCON Temple",
      "Banke Bihari Temples",
      "Vaishno Devi Temple",
      "Nidhivan",
      "Prem Mandir",
      "Nandgaon",
      "Barsana",
      "Govardhan"
    ]
  },
  {
    id: 3,
    title: "Mathura Vrindavan 3 Day Taxi Package",
    subtitle: "COMPLETE SPIRITUAL JOURNEY",
    description: "Embark on an immersive 3-day spiritual journey through the sacred Braj region. Experience the complete divine essence of Lord Krishna's birthplace, childhood places, and the most revered temples of Vrindavan with our professional taxi service.",
    image: "/activity/mathura.png",
    route: "#",
    category: "Heritage",
    placesCovered: [
      "Krishna Janambhoomi",
      "Gokul",
      "Yamuna River",
      "Raman Reti",
      "Chinta Haran",
      "Brahmand Ghat",
      "Chaursi Khamba",
      "Birla Mandir",
      "Pagal Baba Mandir",
      "Kanch ka Mandir",
      "Banke Bihari Mandir",
      "ISKCON Temple",
      "Prem Mandir",
      "Nidhivan",
      "Nandgaon",
      "Barsana",
      "Kirti Mandir",
      "Govardhan"
    ]
  },
  {
    id: 4,
    title: "Mathura Vrindavan Agra 3 Day Trip Package",
    subtitle: "SPIRITUAL & HERITAGE JOURNEY",
    description: "Experience the perfect blend of spirituality and heritage in this comprehensive 3-day journey. From the sacred Braj region to the architectural marvels of Agra, discover the divine and historical treasures of India with our professional taxi service.",
    image: "/activity/mathura.png",
    route: "#",
    category: "Heritage",
    placesCovered: [
      "Krishna Janambhoomi",
      "Gokul",
      "Raman Reti",
      "Birla Mandir",
      "Pagal Baba Mandir",
      "Kancha ka Mandir",
      "Banke Bihari Mandir",
      "ISKCON Temple",
      "Prem Mandir",
      "Nidhivan",
      "Nandgaon",
      "Barsana",
      "Kirti Mandir",
      "Govardhan",
      "Taj Mahal",
      "Agra Fort",
      "Fatehpur Sikri"
    ]
  }
];

const varanasiTripData: TripCard[] = [
  {
    id: 101,
    title: "Varanasi 1 Day Spiritual Tour",
    subtitle: "HOLY CITY EXPERIENCE",
    description: "Experience the spiritual essence of Varanasi in a comprehensive one-day tour. Visit sacred ghats, ancient temples, and immerse yourself in the divine atmosphere of the holy city.",
    image: "/activity/yamuna.jpg",
    route: "#",
    category: "Spiritual",
    placesCovered: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath",
      "Manikarnika Ghat",
      "Assi Ghat",
      "Tulsi Manas Temple",
      "Sankat Mochan Temple",
      "Durga Temple",
      "Bharat Mata Temple"
    ]
  },
  {
    id: 102,
    title: "Varanasi Sarnath 2 Day Trip",
    subtitle: "BUDDHIST HERITAGE",
    description: "Embark on a comprehensive 2-day spiritual journey covering Varanasi and Sarnath. Experience the divine atmosphere of Lord Shiva's city and explore the sacred Buddhist heritage sites.",
    image: "/activity/yamuna.jpg",
    route: "#",
    category: "Spiritual",
    placesCovered: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath",
      "Dhamek Stupa",
      "Chaukhandi Stupa",
      "Manikarnika Ghat",
      "Assi Ghat",
      "Tulsi Manas Temple",
      "Sankat Mochan Temple",
      "Durga Temple",
      "Bharat Mata Temple",
      "Ganga Aarti"
    ]
  },
  {
    id: 103,
    title: "Varanasi 3 Day Complete Package",
    subtitle: "COMPLETE SPIRITUAL JOURNEY",
    description: "Embark on an immersive 3-day spiritual journey through the sacred city of Varanasi. Experience the complete divine essence of Lord Shiva's abode, ancient ghats, and the most revered temples with our professional taxi service.",
    image: "/activity/yamuna.jpg",
    route: "#",
    category: "Spiritual",
    placesCovered: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath",
      "Manikarnika Ghat",
      "Assi Ghat",
      "Tulsi Manas Temple",
      "Sankat Mochan Temple",
      "Durga Temple",
      "Bharat Mata Temple",
      "Dhamek Stupa",
      "Chaukhandi Stupa",
      "Ganga Aarti",
      "Morning Boat Ride",
      "Evening Aarti",
      "Temple Darshan",
      "Ghat Exploration",
      "Spiritual Ceremonies",
      "Cultural Experience"
    ]
  },
  {
    id: 104,
    title: "Varanasi Ayodhya 3 Day Trip Package",
    subtitle: "SPIRITUAL & HERITAGE JOURNEY",
    description: "Experience the perfect blend of spirituality and heritage in this comprehensive 3-day journey. From the sacred city of Varanasi to the divine birthplace of Lord Rama in Ayodhya, discover the spiritual treasures of India.",
    image: "/activity/yamuna.jpg",
    route: "#",
    category: "Spiritual",
    placesCovered: [
      "Dashashwamedh Ghat",
      "Kashi Vishwanath Temple",
      "Sarnath",
      "Manikarnika Ghat",
      "Assi Ghat",
      "Tulsi Manas Temple",
      "Sankat Mochan Temple",
      "Durga Temple",
      "Bharat Mata Temple",
      "Ayodhya Ram Mandir",
      "Hanuman Garhi",
      "Kanak Bhawan",
      "Nageshwarnath Temple",
      "Ram Ki Paidi",
      "Ganga Aarti",
      "Ayodhya Darshan",
      "Spiritual Ceremonies"
    ]
  }
];

export default function TripCards() {
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('mathura');

  return (
    <div style={{
      background: '#1a2a3a',
      padding: '3rem 2rem',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem'
    }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '0.9rem',
          fontWeight: 400,
          color: '#8ba3b3',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '1rem'
        }}>
          Divine Experiences
        </h2>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 300,
          color: '#ffffff',
          fontFamily: 'serif',
          lineHeight: 1.2,
          marginBottom: '1rem'
        }}>
          Discover Your Perfect Spiritual Journey
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#8ba3b3',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Explore curated experiences that connect you with the divine roots of India
        </p>
      </div>

      {/* Location Picker Section */}
      <div style={{
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 600,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Choose Your Destination
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setSelectedLocation('mathura')}
            style={{
              background: selectedLocation === 'mathura' 
                ? 'linear-gradient(135deg,rgb(105, 108, 135),rgb(173, 161, 151))' 
                : 'rgba(255,255,255,0.1)',
              color: selectedLocation === 'mathura' ? '#ffffff' : '#8ba3b3',
              border: selectedLocation === 'mathura' 
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
              if (selectedLocation !== 'mathura') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedLocation !== 'mathura') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#8ba3b3';
              }
            }}
          >
            Mathura
          </button>
          <button
            onClick={() => setSelectedLocation('banaras')}
            style={{
              background: selectedLocation === 'banaras' 
                ? 'linear-gradient(135deg,rgb(105, 108, 135),rgb(173, 161, 151))' 
                : 'rgba(255,255,255,0.1)',
              color: selectedLocation === 'banaras' ? '#ffffff' : '#8ba3b3',
              border: selectedLocation === 'banaras' 
                ? 'none' 
                : '2px solid rgba(255,255,255,0.2)',
              padding: '1rem 2rem',
              borderRadius: '2rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '140px',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (selectedLocation !== 'banaras') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedLocation !== 'banaras') {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#8ba3b3';
              }
            }}
          >
            Banaras
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
          </button>
        </div>
      </div>

      {/* Trip Cards Grid */}
      {selectedLocation === 'mathura' && (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '3rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {tripData.map((trip, index) => (
          <div
            key={trip.id}
            onMouseEnter={() => setHovered(trip.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: '#ffffff',
              borderRadius: '1rem',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              transform: hovered === trip.id ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow: hovered === trip.id 
                ? '0 20px 40px rgba(0,0,0,0.3)' 
                : '0 8px 24px rgba(0,0,0,0.15)',
              position: 'relative'
            }}
          >
            {/* Image Section */}
            <div style={{
              position: 'relative',
              height: '280px',
              overflow: 'hidden'
            }}>
              <img
                src={trip.image}
                alt={trip.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  transform: hovered === trip.id ? 'scale(1.05)' : 'scale(1)'
                }}
              />
              {/* Section Number Overlay */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                fontSize: '4rem',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.1)',
                fontFamily: 'serif'
              }}>
                {String(trip.id).padStart(2, '0')}
              </div>
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255,255,255,0.9)',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1a2a3a',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {trip.category}
              </div>
            </div>

            {/* Content Section */}
            <div style={{
              padding: '2.5rem',
              background: '#ffffff',
              position: 'relative'
            }}>
              {/* Call Icon */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg,rgb(225, 164, 68), #e67e22)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(242,153,39,0.3)',
                animation: hovered === trip.id ? 'shake 0.5s ease-in-out infinite' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(242,153,39,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(242,153,39,0.3)';
              }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" fill="white"/>
                </svg>
              </div>
              
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#8ba3b3',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '1rem'
              }}>
                {trip.subtitle}
              </div>
              
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#1a2a3a',
                marginBottom: trip.placesCovered ? '1rem' : '2rem',
                lineHeight: 1.3
              }}>
                {trip.title}
              </h3>
              
               {trip.placesCovered && (
                 <div style={{
                   marginBottom: '1.5rem',
                   padding: '1rem',
                   background: 'rgba(183,157,155,0.1)',
                   borderRadius: '0.8rem',
                   border: '1px solid rgba(183,157,155,0.2)'
                 }}>
                   <h4 style={{
                 fontSize: '1rem',
                     fontWeight: 700,
                     color: '#1a2a3a',
                     marginBottom: '0.8rem',
                     textTransform: 'uppercase',
                     letterSpacing: '0.5px'
                   }}>
                     Places We Will Cover:
                   </h4>
                   <div style={{
                     display: 'grid',
                     gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                     gap: '0.5rem'
                   }}>
                     {trip.placesCovered.map((place, index) => (
                       <div key={index} style={{
                         fontSize: '0.85rem',
                 color: '#6b7c8d',
                         fontWeight: 500,
                         display: 'flex',
                         alignItems: 'center',
                         gap: '0.3rem'
                       }}>
                         <span style={{
                           color: '#f29927',
                           fontSize: '0.7rem'
                         }}>•</span>
                         {place}
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Options Available for Trip */}
               <div style={{
                 marginBottom: '1.5rem',
                 padding: '0.8rem',
                 background: 'rgba(242,153,39,0.1)',
                 borderRadius: '0.6rem',
                 border: '1px solid rgba(242,153,39,0.2)'
               }}>
                 <h4 style={{
                   fontSize: '0.9rem',
                   fontWeight: 700,
                   color: '#1a2a3a',
                   marginBottom: '0.6rem',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px'
                 }}>
                   Travel Options Available:
                 </h4>
                 <div style={{
                   display: 'grid',
                   gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                   gap: '0.6rem'
                 }}>
                   {(trip.id === 4 
                     ? vehicleInventory.filter(v => v.id !== 'auto-3' && v.id !== 'auto-4').slice(0, 4)
                     : vehicleInventory.slice(0, 4)
                   ).map((vehicle, index) => (
                     <div key={vehicle.id} style={{
                     fontSize: '0.8rem',
                     color: '#1a2a3a',
                     fontWeight: 600,
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.5rem',
                     padding: '0.6rem',
                     background: 'rgba(255,255,255,0.8)',
                     borderRadius: '0.5rem',
                     border: '1px solid rgba(242,153,39,0.3)',
                     transition: 'all 0.3s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-1px)';
                     e.currentTarget.style.boxShadow = '0 2px 8px rgba(242,153,39,0.2)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}
                   >
                     <span style={{
                       color: '#f29927',
                       fontSize: '1rem',
                       fontWeight: 700
                       }}>{vehicle.icon}</span>
                     <div>
                         <div style={{ fontWeight: 700, marginBottom: '0.1rem', fontSize: '0.75rem' }}>{vehicle.name}</div>
                         <div style={{ fontSize: '0.7rem', color: '#6b7c8d' }}>{vehicle.priceText}</div>
                     </div>
                   </div>
                   ))}
                 </div>
               </div>
               
               <div 
                 style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.5rem',
                   fontSize: '0.9rem',
                   fontWeight: 600,
                   color: '#1a2a3a',
                   transition: 'color 0.3s ease',
                   cursor: 'pointer',
                   width: '100%'
                 }}
                 onClick={() => setShowPopup(trip.id)}
               >
                 <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                   <span>Explore more</span>
                   <span style={{
                     transition: 'transform 0.3s ease',
                     transform: hovered === trip.id ? 'translateX(4px)' : 'translateX(0)'
                   }}>
                     →
                   </span>
                 </div>
                 <button
                   onClick={(e) => { e.stopPropagation(); router.push(`/taxi/tour/${trip.id}`); }}
                   style={{
                     marginLeft: 'auto',
                     background:  '#1a2a3a',
                     color: '#ffffff',
                     border: 'none',
                     padding: '0.5rem 1rem',
                     borderRadius: '1.2rem',
                     fontSize: '0.85rem',
                     fontWeight: 700,
                     cursor: 'pointer',
                     boxShadow: '0 2px 8px rgba(32, 51, 135, 0.3)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-1px)';
                     e.currentTarget.style.boxShadow = '0 4px 16px rgba(32, 51, 135, 0.35)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = '0 2px 8px rgba(32, 51, 135, 0.3)';
                   }}
                 >
                   Book Tour
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Varanasi Trip Cards Grid */}
      {selectedLocation === 'banaras' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          {varanasiTripData.map((trip, index) => (
            <div
              key={trip.id}
              onMouseEnter={() => setHovered(trip.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#ffffff',
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hovered === trip.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hovered === trip.id 
                  ? '0 20px 40px rgba(0,0,0,0.3)' 
                  : '0 8px 24px rgba(0,0,0,0.15)',
                position: 'relative',
                filter: 'grayscale(100%)',
                opacity: 0.7
              }}
            >
              {/* Image Section */}
              <div style={{
                position: 'relative',
                height: '280px',
                overflow: 'hidden'
              }}>
                <img
                  src={trip.image}
                  alt={trip.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: hovered === trip.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                {/* Section Number Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '2rem',
                  left: '2rem',
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.1)',
                  fontFamily: 'serif'
                }}>
                  {String(trip.id).padStart(2, '0')}
                </div>
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#1a2a3a',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {trip.category}
                </div>
              </div>

              {/* Content Section */}
              <div style={{
                padding: '2.5rem',
                background: '#ffffff',
                position: 'relative'
              }}>
                {/* Call Icon */}
                <div style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #f29927, #e67e22)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(242,153,39,0.3)',
                  animation: hovered === trip.id ? 'shake 0.5s ease-in-out infinite' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(242,153,39,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(242,153,39,0.3)';
                }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" fill="white"/>
                  </svg>
                </div>
                
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#8ba3b3',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '1rem'
                }}>
                  {trip.subtitle}
                </div>
                
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#1a2a3a',
                  marginBottom: trip.placesCovered ? '1rem' : '2rem',
                  lineHeight: 1.3
                }}>
                  {trip.title}
                </h3>
               
               {trip.placesCovered && (
                 <div style={{
                   marginBottom: '1.5rem',
                   padding: '1rem',
                   background: 'rgba(183,157,155,0.1)',
                   borderRadius: '0.8rem',
                   border: '1px solid rgba(183,157,155,0.2)'
                 }}>
                   <h4 style={{
                     fontSize: '1rem',
                     fontWeight: 700,
                     color: '#1a2a3a',
                     marginBottom: '0.8rem',
                     textTransform: 'uppercase',
                     letterSpacing: '0.5px'
                   }}>
                     Places We Will Cover:
                   </h4>
                   <div style={{
                     display: 'grid',
                     gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                     gap: '0.5rem'
                   }}>
                     {trip.placesCovered.map((place, index) => (
                       <div key={index} style={{
                         fontSize: '0.85rem',
                         color: '#6b7c8d',
                         fontWeight: 500,
                         display: 'flex',
                         alignItems: 'center',
                         gap: '0.3rem'
                       }}>
                         <span style={{
                           color: '#f29927',
                           fontSize: '0.7rem'
                         }}>•</span>
                         {place}
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Options Available for Trip */}
               <div style={{
                 marginBottom: '1.5rem',
                 padding: '0.8rem',
                 background: 'rgba(242,153,39,0.1)',
                 borderRadius: '0.6rem',
                 border: '1px solid rgba(242,153,39,0.2)'
               }}>
                 <h4 style={{
                   fontSize: '0.9rem',
                   fontWeight: 700,
                   color: '#1a2a3a',
                   marginBottom: '0.6rem',
                   textTransform: 'uppercase',
                   letterSpacing: '0.5px'
                 }}>
                   Travel Options Available:
                 </h4>
                 <div style={{
                   display: 'grid',
                   gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                   gap: '0.6rem'
                 }}>
                   {(trip.id === 4 
                     ? vehicleInventory.filter(v => v.id !== 'auto-3' && v.id !== 'auto-4').slice(0, 4)
                     : vehicleInventory.slice(0, 4)
                   ).map((vehicle, index) => (
                     <div key={vehicle.id} style={{
                     fontSize: '0.8rem',
                     color: '#1a2a3a',
                     fontWeight: 600,
                     display: 'flex',
                     alignItems: 'center',
                     gap: '0.5rem',
                     padding: '0.6rem',
                     background: 'rgba(255,255,255,0.8)',
                     borderRadius: '0.5rem',
                     border: '1px solid rgba(242,153,39,0.3)',
                     transition: 'all 0.3s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-1px)';
                     e.currentTarget.style.boxShadow = '0 2px 8px rgba(242,153,39,0.2)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}
                   >
                     <span style={{
                       color: '#f29927',
                       fontSize: '1rem',
                       fontWeight: 700
                       }}>{vehicle.icon}</span>
                     <div>
                         <div style={{ fontWeight: 700, marginBottom: '0.1rem', fontSize: '0.75rem' }}>{vehicle.name}</div>
                         <div style={{ fontSize: '0.7rem', color: '#6b7c8d' }}>{vehicle.priceText}</div>
                     </div>
                   </div>
                   ))}
                 </div>
               </div>
               
               <div 
                 style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.5rem',
                   fontSize: '0.9rem',
                   fontWeight: 600,
                   color: '#1a2a3a',
                   transition: 'color 0.3s ease',
                   cursor: 'pointer',
                   width: '100%'
                 }}
                 onClick={() => setShowPopup(trip.id)}
               >
                 <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                   <span>Explore more</span>
                   <span style={{
                     transition: 'transform 0.3s ease',
                     transform: hovered === trip.id ? 'translateX(4px)' : 'translateX(0)'
                   }}>
                     →
                   </span>
                 </div>
                 <button
                   onClick={(e) => { e.stopPropagation(); }}
                   disabled={true}
                   style={{
                     marginLeft: 'auto',
                     background: '#ccc',
                     color: '#999',
                     border: 'none',
                     padding: '0.5rem 1rem',
                     borderRadius: '1.2rem',
                     fontSize: '0.85rem',
                     fontWeight: 700,
                     cursor: 'not-allowed',
                     boxShadow: '0 2px 8px rgba(153, 153, 153, 0.3)',
                     opacity: 0.6
                   }}
                 >
                   Coming Soon
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
      )}



      {/* Bottom CTA Section */}
      {(selectedLocation === 'mathura' || selectedLocation === 'banaras') && (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '1rem',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{
          fontSize: '2rem',
          fontWeight: 300,
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Find the perfect taxi and hotel for you?
        </h3>
        <p style={{
          fontSize: '1.1rem',
          color: '#8ba3b3',
          marginBottom: '2rem'
        }}>
          We help you create the perfect spiritual experience
        </p>
        <div
          style={{
            background: 'linear-gradient(135deg, #f29927, #e67e22)',
            color: '#ffffff',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            display: 'inline-block',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(242,153,39,0.3)'
          }}
        >
          Start Planning Your Trip
                 </div>
       </div>
       )}

       {/* Popup Modal */}
       {showPopup && (
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
             zIndex: 9999,
             padding: '1rem',
             animation: 'fadeIn 0.3s ease-out',
           }}
           onClick={() => setShowPopup(null)}
         >
           <div
             style={{
               background: '#fff',
               borderRadius: '1.5rem',
               maxWidth: '800px',
               width: '100%',
               maxHeight: '90vh',
               overflow: 'auto',
               position: 'relative',
               animation: 'slideIn 0.3s ease-out',
               scrollbarWidth: 'none',
               msOverflowStyle: 'none'
             }}
             onClick={(e) => e.stopPropagation()}
           >
             {/* Close Button */}
             <button
               onClick={() => setShowPopup(null)}
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

             {/* Popup Content */}
             <div style={{ padding: '2.5rem' }}>
               {tripData.find(trip => trip.id === showPopup) && (
                 <>
                   {/* Header */}
                   <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                     <h2 style={{
                       fontSize: '2.2rem',
                       fontWeight: 700,
                       color: '#1a2a3a',
                       marginBottom: '1rem'
                     }}>
                       {tripData.find(trip => trip.id === showPopup)?.title}
                     </h2>
                     <div style={{
                       fontSize: '1rem',
                       color: '#6b7c8d',
                       lineHeight: 1.6
                     }}>
                       {tripData.find(trip => trip.id === showPopup)?.description}
                     </div>
                   </div>

                                       {/* Itinerary Section */}
                    {(showPopup === 1 || showPopup === 2 || showPopup === 3 || showPopup === 4) && (
                     <div style={{ marginBottom: '2rem' }}>
                       <h3 style={{
                         fontSize: '1.5rem',
                         fontWeight: 700,
                         color: '#1a2a3a',
                         marginBottom: '1.5rem',
                         textAlign: 'center'
                       }}>
                         Itinerary
                       </h3>
                                               <div style={{
                          background: 'rgba(183,157,155,0.1)',
                          borderRadius: '1rem',
                          padding: '2rem',
                          border: '1px solid rgba(183,157,155,0.2)'
                        }}>
                          {showPopup === 1 ? (
                            // 1 Day Tour Itinerary
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              {/* Pickup */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  1
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Pickup
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Driver will pick up from a preferred location in Mathura or Vrindavan.
                                  </p>
                                </div>
                              </div>

                              {/* First Destination */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  2
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    First Destination: Krishna Janambhoomi
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    The birthplace of Lord Krishna, where you'll experience the divine atmosphere and spiritual significance.
                                  </p>
                                </div>
                              </div>

                              {/* Next Destination */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  3
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Next Destination: Gokul
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    A village situated on the banks of the Yamuna River, where Lord Krishna spent his childhood.
                                  </p>
                                </div>
                              </div>

                              {/* Evening Activity */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  4
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Evening Activity: Visit Renowned Temples in Vrindavan
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Explore the sacred temples including Birla Mandir, Pagal Baba, ISKCON Temple, Banke Bihari Temples, Vaishno Devi Temple, Nidhivan, and Prem Mandir.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : showPopup === 2 ? (
                            // 2 Day Tour Itinerary
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                                             {/* Day 1 Header */}
                               <div style={{
                                 background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                 color: '#fff',
                                 padding: '0.8rem 1.5rem',
                                 borderRadius: '0.8rem',
                                 textAlign: 'center',
                                 fontWeight: 700,
                                 fontSize: '1.1rem',
                                 marginBottom: '1rem'
                               }}>
                                 DAY 1
                               </div>

                                                             {/* Day 1 Activities */}
                               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                 <div style={{
                                   background: '#f29927',
                                   color: '#fff',
                                   borderRadius: '50%',
                                   width: '30px',
                                   height: '30px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   fontSize: '0.8rem',
                                   fontWeight: 700,
                                   flexShrink: 0,
                                   marginTop: '0.2rem'
                                 }}>
                                   1
                                 </div>
                                 <div>
                                   <h4 style={{
                                     fontSize: '1.1rem',
                                     fontWeight: 700,
                                     color: '#1a2a3a',
                                     marginBottom: '0.5rem'
                                   }}>
                                     Pickup & Krishna Janambhoomi
                                   </h4>
                                   <p style={{
                                     fontSize: '1rem',
                                     color: '#6b7c8d',
                                     lineHeight: 1.5
                                   }}>
                                     Driver pickup from designated point. Visit Krishna Janambhoomi - The Birthplace of Lord Krishna.
                                   </p>
                                 </div>
                               </div>

                               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                 <div style={{
                                   background: '#f29927',
                                   color: '#fff',
                                   borderRadius: '50%',
                                   width: '30px',
                                   height: '30px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   fontSize: '0.8rem',
                                   fontWeight: 700,
                                   flexShrink: 0,
                                   marginTop: '0.2rem'
                                 }}>
                                   2
                                 </div>
                                 <div>
                                   <h4 style={{
                                     fontSize: '1.1rem',
                                     fontWeight: 700,
                                     color: '#1a2a3a',
                                     marginBottom: '0.5rem'
                                   }}>
                                     Gokul Exploration
                                   </h4>
                                   <p style={{
                                     fontSize: '1rem',
                                     color: '#6b7c8d',
                                     lineHeight: 1.5
                                   }}>
                                     Visit Gokul - The Village Where Lord Krishna Spent His Childhood.
                                   </p>
                                 </div>
                               </div>

                               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                 <div style={{
                                   background: '#f29927',
                                   color: '#fff',
                                   borderRadius: '50%',
                                   width: '30px',
                                   height: '30px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   fontSize: '0.8rem',
                                   fontWeight: 700,
                                   flexShrink: 0,
                                   marginTop: '0.2rem'
                                 }}>
                                   3
                                 </div>
                                 <div>
                                   <h4 style={{
                                     fontSize: '1.1rem',
                                     fontWeight: 700,
                                     color: '#1a2a3a',
                                     marginBottom: '0.5rem'
                                   }}>
                                     Evening: Vrindavan Temples
                                   </h4>
                                   <p style={{
                                     fontSize: '1rem',
                                     color: '#6b7c8d',
                                     lineHeight: 1.5
                                   }}>
                                     Visit Birla Mandir, Pagal Baba Mandir, ISKCON Temple, Banke Bihari Temples, Vaishno Devi Temple, Nidhivan, and Prem Mandir.
                                   </p>
                                 </div>
                               </div>

                                                             {/* Day 2 Header */}
                               <div style={{
                                 background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                 color: '#fff',
                                 padding: '0.8rem 1.5rem',
                                 borderRadius: '0.8rem',
                                 textAlign: 'center',
                                 fontWeight: 700,
                                 fontSize: '1.1rem',
                                 marginBottom: '1rem',
                                 marginTop: '1rem'
                               }}>
                                 DAY 2
                               </div>

                                                             {/* Day 2 Activities */}
                               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                 <div style={{
                                   background: '#f29927',
                                   color: '#fff',
                                   borderRadius: '50%',
                                   width: '30px',
                                   height: '30px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   fontSize: '0.8rem',
                                   fontWeight: 700,
                                   flexShrink: 0,
                                   marginTop: '0.2rem'
                                 }}>
                                   4
                                 </div>
                                 <div>
                                   <h4 style={{
                                     fontSize: '1.1rem',
                                     fontWeight: 700,
                                     color: '#1a2a3a',
                                     marginBottom: '0.5rem'
                                   }}>
                                     Morning: Nandgaon
                                   </h4>
                                   <p style={{
                                     fontSize: '1rem',
                                     color: '#6b7c8d',
                                     lineHeight: 1.5
                                   }}>
                                     Visit Nandgaon, the village of Lord Krishna's father, to explore the sacred Braj region.
                                   </p>
                                 </div>
                               </div>

                               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                 <div style={{
                                   background: '#f29927',
                                   color: '#fff',
                                   borderRadius: '50%',
                                   width: '30px',
                                   height: '30px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   fontSize: '0.8rem',
                                   fontWeight: 700,
                                   flexShrink: 0,
                                   marginTop: '0.2rem'
                                 }}>
                                   5
                                 </div>
                                 <div>
                                   <h4 style={{
                                     fontSize: '1.1rem',
                                     fontWeight: 700,
                                     color: '#1a2a3a',
                                     marginBottom: '0.5rem'
                                   }}>
                                     Afternoon: Barsana
                                   </h4>
                                   <p style={{
                                     fontSize: '1rem',
                                     color: '#6b7c8d',
                                     lineHeight: 1.5
                                   }}>
                                     Visit Barsana, which has 225 steps for the temple, and explore the sacred sites.
                                   </p>
                                 </div>
                               </div>

                               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                 <div style={{
                                   background: '#f29927',
                                   color: '#fff',
                                   borderRadius: '50%',
                                   width: '30px',
                                   height: '30px',
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center',
                                   fontSize: '0.8rem',
                                   fontWeight: 700,
                                   flexShrink: 0,
                                   marginTop: '0.2rem'
                                 }}>
                                   6
                                 </div>
                                 <div>
                                   <h4 style={{
                                     fontSize: '1.1rem',
                                     fontWeight: 700,
                                     color: '#1a2a3a',
                                     marginBottom: '0.5rem'
                                   }}>
                                     Evening: Govardhan & Return
                                   </h4>
                                   <p style={{
                                     fontSize: '1rem',
                                     color: '#6b7c8d',
                                     lineHeight: 1.5
                                   }}>
                                     Explore Govardhan. The 21 km Parikrama can be done on foot or by battery rickshaw (four-wheelers not allowed). Drop-off at designated point.
                                   </p>
                                 </div>
                               </div>
                            </div>
                          ) : showPopup === 3 ? (
                            // 3 Day Tour Itinerary
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              {/* Day 1 Header */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginBottom: '1rem'
                              }}>
                                DAY 1
                              </div>

                              {/* Day 1 Activities */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  1
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Pickup & Krishna Janambhoomi
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Our driver will pick you up from the pickup point and take you to Krishna Janambhoomi, the birthplace of Lord Krishna.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  2
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Gokul Exploration
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Gokul, the village where Lord Krishna spent his childhood, and explore the sacred Yamuna River.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  3
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Raman Reti
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Raman Reti where Lord Krishna played with his brother Balarama and friends in the sand.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  4
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Brahmand Ghat
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Brahmand Ghat where Mother Yashoda witnessed the entire universe within Lord Krishna's mouth.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  5
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Chinta Haran
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Chinta Haran, where Mother Yashoda offered prayers after witnessing the universe within Lord Krishna's mouth.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  6
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Chaursi Khamba
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Complete the day with a tour of Chaursi Khamba, a significant spiritual site.
                                  </p>
                                </div>
                              </div>

                              {/* Day 2 Header */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginBottom: '1rem',
                                marginTop: '1rem'
                              }}>
                                DAY 2
                              </div>

                              {/* Day 2 Activities */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  7
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Vrindavan Temple Tour
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Explore renowned temples in Vrindavan including Birla Mandir, Pagal Baba Mandir, Kanch Ka Mandir, Nidhivan, Vaishno Devi, and the breathtaking Prem Mandir.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  8
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Banke Bihari & ISKCON Temples
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit the sacred Banke Bihari Mandir and ISKCON Temple to complete the spiritual experience.
                                  </p>
                                </div>
                              </div>

                              {/* Day 3 Header */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginBottom: '1rem',
                                marginTop: '1rem'
                              }}>
                                DAY 3
                              </div>

                              {/* Day 3 Activities */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  9
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Nandgaon
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Nandgaon, the village of Lord Krishna's father, to explore the sacred Braj region.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  10
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Barsana
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Barsana, which has 225 steps for the temple, and explore the sacred sites including Kirti Mandir.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  11
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Govardhan & Return
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Explore Govardhan. The 21 km Parikrama can be done on foot or by battery rickshaw (four-wheelers not allowed). After the tour, we will drop you off at your designated drop point.
                                  </p>
                                </div>
                              </div>
                                                         </div>
                          ) : showPopup === 4 ? (
                            // 4 Day Tour Itinerary (Mathura Vrindavan Agra)
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              {/* Day 1 Header */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginBottom: '1rem'
                              }}>
                                DAY 1
                              </div>

                              {/* Day 1 Activities */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  1
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Pickup & Krishna Janambhoomi
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Our driver will pick you up from the pickup point and take you to Krishna Janambhoomi, the birthplace of Lord Krishna.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  2
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Gokul & Raman Reti
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Gokul, the village where Lord Krishna spent his childhood, and explore Raman Reti where Lord Krishna played with his brother Balarama.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  3
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Evening: Vrindavan Temple Tour
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit renowned temples in Vrindavan including Birla Mandir, Pagal Baba Mandir, ISKCON Temple, Banke Bihari Temples, Vaishno Devi Temple, Nidhivan, and finally Prem Mandir.
                                  </p>
                                </div>
                              </div>

                              {/* Day 2 Header */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginBottom: '1rem',
                                marginTop: '1rem'
                              }}>
                                DAY 2
                              </div>

                              {/* Day 2 Activities */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  4
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Nandgaon
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Nandgaon, the village of Lord Krishna's father, to explore the sacred Braj region.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  5
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Barsana
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit Barsana, which has 225 steps for the temple, and explore the sacred sites including Kirti Mandir.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  6
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Govardhan
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Explore Govardhan. The 21 km Parikrama can be done on foot or by battery rickshaw (four-wheelers not allowed).
                                  </p>
                                </div>
                              </div>

                              {/* Day 3 Header */}
                              <div style={{
                                background: 'linear-gradient(135deg, #f29927, #e67e22)',
                                color: '#fff',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '0.8rem',
                                textAlign: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                marginBottom: '1rem',
                                marginTop: '1rem'
                              }}>
                                DAY 3
                              </div>

                              {/* Day 3 Activities */}
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  7
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Taj Mahal
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit the iconic Taj Mahal, one of the Seven Wonders of the World, and marvel at its architectural beauty and romantic history.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  8
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Agra Fort
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Explore the magnificent Agra Fort, a UNESCO World Heritage site, and discover its rich Mughal architecture and history.
                                  </p>
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                  background: '#f29927',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  width: '30px',
                                  height: '30px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                  marginTop: '0.2rem'
                                }}>
                                  9
                                </div>
                                <div>
                                  <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    color: '#1a2a3a',
                                    marginBottom: '0.5rem'
                                  }}>
                                    Fatehpur Sikri & Return
                                  </h4>
                                  <p style={{
                                    fontSize: '1rem',
                                    color: '#6b7c8d',
                                    lineHeight: 1.5
                                  }}>
                                    Visit the historic Fatehpur Sikri, a well-preserved Mughal city. After the tour, we will drop you off at your designated drop point.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                     </div>
                   )}

                   {/* Places Covered Section */}
                   {tripData.find(trip => trip.id === showPopup)?.placesCovered && (
                     <div style={{ marginBottom: '2rem' }}>
                       <h3 style={{
                         fontSize: '1.5rem',
                         fontWeight: 700,
                         color: '#1a2a3a',
                         marginBottom: '1.5rem',
                         textAlign: 'center'
                       }}>
                         Places We Will Cover
                       </h3>
                       <div style={{
                         display: 'grid',
                         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                         gap: '1rem'
                       }}>
                         {tripData.find(trip => trip.id === showPopup)?.placesCovered?.map((place, index) => (
                           <div key={index} style={{
                             background: 'rgba(183,157,155,0.1)',
                             padding: '1rem',
                             borderRadius: '0.8rem',
                             border: '1px solid rgba(183,157,155,0.2)',
                             display: 'flex',
                             alignItems: 'center',
                             gap: '0.5rem'
                           }}>
                             <span style={{
                               color: '#f29927',
                               fontSize: '1.2rem',
                               fontWeight: 700
                             }}>•</span>
                             <span style={{
                               fontSize: '1rem',
                               color: '#1a2a3a',
                               fontWeight: 500
                             }}>
                               {place}
                             </span>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                   {/* Action Buttons */}
                   <div style={{
                     display: 'flex',
                     gap: '1rem',
                     justifyContent: 'center',
                     marginTop: '2rem'
                   }}>
                     <button
                       style={{
                         background: 'rgb(59, 62, 106)',
                         color: '#ffffff',
                         border: 'none',
                         padding: '1rem 2rem',
                         borderRadius: '2rem',
                         fontSize: '1rem',
                         fontWeight: 600,
                         cursor: 'pointer',
                         transition: 'all 0.3s ease',
                         boxShadow: '0 4px 16px rgba(59, 62, 106, 0.3)'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.transform = 'translateY(-2px)';
                         e.currentTarget.style.boxShadow = '0 8px 24px rgba(35, 36, 54, 0.5)';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.transform = 'translateY(0)';
                         e.currentTarget.style.boxShadow = '0 4px 16px rgba(39, 63, 242, 0.3)';
                       }}
                       onClick={() => {
                         const id = showPopup;
                         if (id) router.push(`/taxi/tour/${id}`);
                       }}
                     >
                       Book This Tour
                     </button>
                     <button
                       onClick={() => setShowPopup(null)}
                       style={{
                         background: '#fff',
                         color: '#1a2a3a',
                         border: '2px solid #1a2a3a',
                         padding: '1rem 2rem',
                         borderRadius: '2rem',
                         fontSize: '1rem',
                         fontWeight: 600,
                         cursor: 'pointer',
                         transition: 'all 0.3s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.background = '#1a2a3a';
                         e.currentTarget.style.color = '#fff';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.background = '#fff';
                         e.currentTarget.style.color = '#1a2a3a';
                       }}
                     >
                       Close
                     </button>
                   </div>
                 </>
               )}
             </div>
           </div>
         </div>
       )}

       <style>{`
         @keyframes fadeIn {
           from { opacity: 0; }
           to { opacity: 1; }
         }
         @keyframes slideIn {
           from { transform: scale(0.9) translateY(20px); opacity: 0; }
           to { transform: scale(1) translateY(0); opacity: 1; }
         }
         @keyframes shake {
           0%, 100% { transform: translateX(0); }
           10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
           20%, 40%, 60%, 80% { transform: translateX(2px); }
         }
       `}</style>
     </div>
   );
 } 