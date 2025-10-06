'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../../context/CartContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Mock data for trip destinations and packages
const tripDestinations = {
  'mathura-vrindavan': {
    id: 'mathura-vrindavan',
    name: 'Mathura & Vrindavan',
    location: 'Uttar Pradesh, India',
    duration: '2N/3D',
    description: 'Experience the divine beauty of Lord Krishna\'s birthplace with spiritual tours, temple visits, and cultural experiences.',
    highlights: ['Krishna Janmasthan Temple', 'Banke Bihari Temple', 'Govardhan Hill', 'Radha Kund'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'
    ],

    rating: 4.8,
    reviews: 100,
    basePrice: 15000,
    originalPrice: 18000,
    discount: 17
  },
  'varanasi': {
    id: 'varanasi',
    name: 'Varanasi',
    location: 'Uttar Pradesh, India',
    duration: '2N/3D',
    description: 'Discover the spiritual capital of India with Ganga Aarti, temple visits, and boat rides.',
    highlights: ['Ganga Aarti', 'Kashi Vishwanath Temple', 'Sarnath', 'Boat Ride'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 892,
    basePrice: 12000,
    originalPrice: 15000,
    discount: 20
  },
  'agra-taj': {
    id: 'agra-taj',
    name: 'Agra & Taj Mahal',
    location: 'Uttar Pradesh, India',
    duration: '1N/2D',
    description: 'Experience the wonder of the Taj Mahal and explore the rich history of Agra.',
    highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Local Markets'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 1567,
    basePrice: 8000,
    originalPrice: 10000,
    discount: 20
  },
  'rajasthan-heritage': {
    id: 'rajasthan-heritage',
    name: 'Rajasthan Heritage',
    location: 'Rajasthan, India',
    duration: '3N/4D',
    description: 'Explore the royal heritage of Rajasthan with palaces, forts, and cultural experiences.',
    highlights: ['Jaipur Palace', 'Amber Fort', 'Jodhpur Fort', 'Udaipur Lake'],
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 2341,
    basePrice: 25000,
    originalPrice: 30000,
    discount: 17
  }
};

// Hotel data from hotels page
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
    roomTypes: [
      { name: 'Standard Room', price: 95, capacity: 2 },
      { name: 'Deluxe Room', price: 120, capacity: 3 },
      { name: 'Family Room', price: 160, capacity: 4 }
    ],
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
    roomTypes: [
      { name: 'River View Room', price: 120, capacity: 2 },
      { name: 'Suite', price: 180, capacity: 3 },
      { name: 'Family Suite', price: 220, capacity: 4 }
    ],
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
    roomTypes: [
      { name: 'City View Room', price: 110, capacity: 2 },
      { name: 'Deluxe Room', price: 150, capacity: 3 }
    ],
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
    roomTypes: [
      { name: 'Executive Suite', price: 145, capacity: 2 },
      { name: 'Family Suite', price: 200, capacity: 4 }
    ],
    policies: ['Check-in: 2:00 PM', 'Check-out: 12:00 PM'],
  },
];

// Vehicle categories and options (same as taxi/tour page)
type CarType = 'Auto' | 'Sedan' | 'SUV' | 'Traveler';

const carTypeOptions: { label: CarType; desc: string; priceInfo: string }[] = [
  { label: 'Auto', desc: 'Budget 3-4 seater for city rides', priceInfo: 'From ₹1200/day' },
  { label: 'Sedan', desc: 'Comfortable 4-7 seater with AC', priceInfo: 'From ₹2200/km' },
  { label: 'SUV', desc: 'Spacious 6-7 seater with AC', priceInfo: 'From ₹2800/km' },
  { label: 'Traveler', desc: '11-21 seater for groups', priceInfo: 'From ₹6000/km' },
];

type VehicleOption = {
  id: string;
  name: string;
  category: CarType;
  capacity: number;
  priceText: string;
  icon: string;
  image: string;
  description: string;
  features: string[];
};

const vehicleInventory: VehicleOption[] = [
  { 
    id: 'auto-3', 
    name: 'Bajaj Auto Rickshaw', 
    category: 'Auto', 
    capacity: 3, 
    priceText: '₹1200/day', 
    icon: '🛺',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    description: 'AC | 1 Luggage Bag | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Economical', 'Easy Navigation', 'Local Knowledge', 'Quick Service']
  },
  { 
    id: 'auto-4', 
    name: 'Mahindra Alfa Plus', 
    category: 'Auto', 
    capacity: 4, 
    priceText: '₹1500/day', 
    icon: '🛺',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: '4 Seater | AC | 2 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Economical', 'Easy Navigation', 'Local Knowledge', 'Quick Service', 'Extra Space']
  },
  { 
    id: 'sedan-4', 
    name: 'Swift Dzire (AC)', 
    category: 'Sedan', 
    capacity: 4, 
    priceText: '₹2200/km', 
    icon: '🚗',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    description: 'AC | 2 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger']
  },
  { 
    id: 'sedan-4p', 
    name: 'Sedan Prime (AC)', 
    category: 'Sedan', 
    capacity: 4, 
    priceText: '₹2400/km', 
    icon: '🚗',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Premium AC | 3 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Premium Interior']
  },
  { 
    id: 'Eeho-7', 
    name: 'Echon (AC)', 
    category: 'Sedan', 
    capacity: 7, 
    priceText: '₹2400/km', 
    icon: '🚙',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: '7 Seater | AC | 4 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Extra Space']
  },
  { 
    id: 'suv-6', 
    name: 'Maruti Ertiga (AC)', 
    category: 'SUV', 
    capacity: 6, 
    priceText: '₹2800/km', 
    icon: '🚙',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    description: '6 Seater | AC | 4 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Spacious Interior']
  },
  { 
    id: 'suv-6p', 
    name: 'Innova Crysta (AC)', 
    category: 'SUV', 
    capacity: 6, 
    priceText: '₹3000/km', 
    icon: '🚙',
    image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80',
    description: 'Premium 6 Seater | AC | 5 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Spacious Interior', 'Premium']
  },
  { 
    id: 'trav-11', 
    name: 'Force Traveler 11', 
    category: 'Traveler', 
    capacity: 11, 
    priceText: '₹6000/km', 
    icon: '🚌',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: '11 Seater | AC | 6 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Spacious Interior']
  },
  { 
    id: 'trav-15', 
    name: 'Tata Winger 15', 
    category: 'Traveler', 
    capacity: 15, 
    priceText: '₹6500/km', 
    icon: '🚌',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: '15 Seater | AC | 8 Luggage Bags | First Aid | Intercity Transfer, 3 Sightseeing Transfers Included',
    features: ['Air Conditioning', 'Music System', 'GPS Navigation', 'Child Seat Available', 'WiFi Hotspot', 'Phone Charger', 'Spacious Interior', 'Premium']
  }
];

// Enhanced customization options
const customizationOptions = {
  transfers: vehicleInventory, // Use the standardized vehicle inventory
  activities: [
    // Included Activities (from activities page)
    { 
      id: 'pottery', 
      name: 'Pottery', 
      price: 300, 
      duration: '2 hours', 
      description: 'Traditional pottery making experience in Gokul', 
      image: '/activity/pottery.jpg', 
      location: 'Gokul',
      category: 'included',
      status: 'active', 
      features: ['Traditional', 'Hands-on', 'Cultural']
    },
    { 
      id: 'boating', 
      name: 'Boating', 
      price: 500, 
      duration: '1.5 hours', 
      description: 'Scenic boating experience in Mathura & Vrindavan', 
      image: '/activity/boating1.jpg', 
      location: 'Mathura & Vrindavan',
      category: 'included',
      status: 'active', 
      features: ['Scenic', 'Water Activity', 'Relaxing']
    },
    { 
      id: 'hutstay', 
      name: 'Hut Stay', 
      price: 800, 
      duration: 'Overnight', 
      description: 'Traditional hut accommodation experience in Barsana', 
      image: '/activity/hutstay.jpg', 
      location: 'Barsana',
      category: 'extra',
      status: 'active', 
      features: ['Traditional', 'Rural', 'Unique Experience']
    },
    { 
      id: 'funride', 
      name: 'Fun Ride', 
      price: 200, 
      duration: '30 minutes', 
      description: 'Exciting fun ride experience in Vrindavan', 
      image: '/activity/gaintwheel.jpg', 
      location: 'Vrindavan',
      category: 'included',
      status: 'active', 
      features: ['Fun', 'Entertainment', 'Family']
    },
    // Extra Activities (from activities page)
    { 
      id: 'darshan', 
      name: 'Darshan', 
      price: 600, 
      duration: '2 hours', 
      description: 'Darshan of Premanand maharaj ji in Vrindavan', 
      image: '/activity/premanandji.jpg', 
      location: 'Vrindavan',
      category: 'included',
      status: 'active', 
      features: ['Unique', 'Eco-friendly', 'Traditional']
    },
    { 
      id: 'artiexperience', 
      name: 'Arti Experience', 
      price: 350, 
      duration: '1 hour', 
      description: 'Spiritual arti ceremony experience in Mathura', 
      image: '/activity/arti2 (3).jpg', 
      location: 'Mathura',
      category: 'extra',
      status: 'active', 
      features: ['Spiritual', 'Ceremony', 'Cultural']
    },
    { 
      id: 'photoshoot', 
      name: 'Photoshoot', 
      price: 2000, 
      duration: '2 hours', 
      description: 'Photoshoot in Mathura or Vrindavan specific location', 
      image: '/activity/yamuna2.jpg', 
      location: 'Mathura',
      category: 'extra',
      status: 'active', 
      features: ['Sacred', 'River', 'Spiritual']
    }
  ],
  meals: [
    { 
      id: 'breakfast-only', 
      name: 'Breakfast', 
      price: 500, 
      description: 'Daily breakfast included with local and continental options', 
      image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&w=400&q=80', 
      status: 'active', 
      battery: 90,
      features: ['Breakfast', 'Local', 'Continental']
    },
    { 
      id: 'half-board', 
      name: 'lunch', 
      price: 1200, 
      description: 'Breakfast and dinner included with multiple cuisine options', 
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80', 
      status: 'inactive', 
      battery: 75,
      features: ['Breakfast', 'Dinner', 'Multi-cuisine']
    },
    { 
      id: 'full-board', 
      name: 'snacks', 
      price: 2000, 
      description: 'All meals included with premium dining experience', 
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', 
      status: 'active', 
      battery: 80,
      features: ['All Meals', 'Premium', 'Dining']
    },
    { 
      id: 'premium-dining', 
      name: 'dinner', 
      price: 3500, 
      description: 'Luxury dining experience with gourmet meals', 
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80', 
      status: 'inactive', 
      battery: 65,
      features: ['Luxury', 'Gourmet', 'Fine Dining']
    }
  ]
};

export default function CustomizeTripPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const tripId = params.tripId as string;

  // Add CSS for hiding scrollbar
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .hide-scrollbar {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  
  // Get trip details
  const tripDetails = tripDestinations[tripId as keyof typeof tripDestinations] || tripDestinations['mathura-vrindavan'];
  
  // Filter hotels based on trip destination
  const getLocationSpecificHotels = () => {
    if (tripId === 'mathura-vrindavan') {
      return mockHotels.filter(hotel => 
        hotel.location.toLowerCase().includes('mathura')
      );
    } else if (tripId === 'varanasi') {
      return mockHotels.filter(hotel => 
        hotel.location.toLowerCase().includes('banaras') || hotel.location.toLowerCase().includes('varanasi')
      );
    } else if (tripId === 'agra-taj') {
      return mockHotels.filter(hotel => 
        hotel.location.toLowerCase().includes('mathura') || hotel.location.toLowerCase().includes('agra')
      );
    } else if (tripId === 'rajasthan-heritage') {
      return mockHotels.filter(hotel => 
        hotel.location.toLowerCase().includes('mathura') || hotel.location.toLowerCase().includes('banaras')
      );
    }
    // Default: show all hotels
    return mockHotels;
  };
  
  const availableHotels = getLocationSpecificHotels();
  
  // Parse duration from trip details (e.g., "2N/3D" -> { nights: 2, days: 3 })
  const parseDuration = (durationString: string) => {
    const match = durationString.match(/(\d+)N\/(\d+)D/);
    if (match) {
      return {
        nights: parseInt(match[1]),
        days: parseInt(match[2])
      };
    }
    return { nights: 2, days: 3 }; // Default fallback
  };
  
  const tripDuration = parseDuration(tripDetails.duration);
  
  // Generate itinerary preview based on trip duration
  const generateItineraryPreview = () => {
    const { nights, days } = tripDuration;
    const itinerary = [];
    
    // For Mathura & Vrindavan trip
    if (tripId === 'mathura-vrindavan') {
      if (nights === 1) {
        itinerary.push({ location: 'Mathura', nights: 1 });
      } else if (nights === 2) {
        itinerary.push({ location: 'Mathura', nights: 1 });
        itinerary.push({ location: 'Vrindavan', nights: 1 });
      } else if (nights === 3) {
        itinerary.push({ location: 'Mathura', nights: 1 });
        itinerary.push({ location: 'Vrindavan', nights: 1 });
        itinerary.push({ location: 'Agra', nights: 1 });
      } else {
        // For longer trips, distribute evenly
        const locations = ['Mathura', 'Vrindavan', 'Agra', 'Gokul'];
        for (let i = 0; i < nights; i++) {
          itinerary.push({ location: locations[i % locations.length], nights: 1 });
        }
      }
    } else if (tripId === 'varanasi') {
      // For Varanasi trip
      if (nights === 1) {
        itinerary.push({ location: 'Varanasi', nights: 1 });
      } else if (nights === 2) {
        itinerary.push({ location: 'Varanasi', nights: 1 });
        itinerary.push({ location: 'Sarnath', nights: 1 });
      } else {
        const locations = ['Varanasi', 'Sarnath', 'Prayagraj'];
        for (let i = 0; i < nights; i++) {
          itinerary.push({ location: locations[i % locations.length], nights: 1 });
        }
      }
    } else if (tripId === 'agra-taj') {
      // For Agra & Taj Mahal trip
      if (nights === 1) {
        itinerary.push({ location: 'Agra', nights: 1 });
      } else {
        itinerary.push({ location: 'Agra', nights: 1 });
        itinerary.push({ location: 'Fatehpur Sikri', nights: 1 });
      }
    } else if (tripId === 'rajasthan-heritage') {
      // For Rajasthan Heritage trip
      const locations = ['Jaipur', 'Jodhpur', 'Udaipur'];
      for (let i = 0; i < nights; i++) {
        itinerary.push({ location: locations[i % locations.length], nights: 1 });
      }
    } else {
      // Default itinerary for other trips
      for (let i = 0; i < nights; i++) {
        itinerary.push({ location: `Day ${i + 1}`, nights: 1 });
      }
    }
    
    return itinerary;
  };
  
  const itineraryPreview = generateItineraryPreview();
  
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedPersons, setSelectedPersons] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTripDuration, setSelectedTripDuration] = useState(tripDuration.nights);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [calMonth, setCalMonth] = useState<number>(new Date().getMonth());
  const [calYear, setCalYear] = useState<number>(new Date().getFullYear());
  const [todayIso, setTodayIso] = useState<string>('');
  const [maxStartIso, setMaxStartIso] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState('New Delhi');
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [showPersonPicker, setShowPersonPicker] = useState(false);
  const [selectedTransfers, setSelectedTransfers] = useState<string[]>(['sedan-4']);
  const [selectedTransferCategory, setSelectedTransferCategory] = useState<CarType>('Sedan');
  const [selectedHotels, setSelectedHotels] = useState<string[]>(() => {
    if (availableHotels.length > 0) {
      return [availableHotels[0].id];
    }
    return [];
  });
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<{[hotelId: string]: number}>(() => {
    const initial: {[hotelId: string]: number} = {};
    if (availableHotels.length > 0) {
      initial[availableHotels[0].id] = 0; // Default to first room type
    }
    return initial;
  });
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['boating']);
  const [selectedMeals, setSelectedMeals] = useState<string[]>(['breakfast-only']);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferToChange, setTransferToChange] = useState<string | null>(null);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [hotelToChange, setHotelToChange] = useState<string | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityToChange, setActivityToChange] = useState<string | null>(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [mealToChange, setMealToChange] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pendingActivities, setPendingActivities] = useState<string[]>([]);
  const [pendingMeals, setPendingMeals] = useState<string[]>([]);
  const [activityModalLoading, setActivityModalLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Memoized activity data for better performance
  const includedActivities = useMemo(() => 
    customizationOptions.activities.filter(option => option.category === 'included'),
    []
  );
  
  const extraActivities = useMemo(() => 
    customizationOptions.activities.filter(option => option.category === 'extra'),
    []
  );

  // Preload activity data for better performance
  useEffect(() => {
    // Preload activity images
    const preloadImages = () => {
      customizationOptions.activities.forEach(activity => {
        const img = new Image();
        img.src = activity.image;
      });
    };
    
    preloadImages();
  }, []);

  // Initialize per-day states
  const initializePerDayState = useMemo(() => (defaultValue: string[]) => {
    const state: { [day: number]: string[] } = {};
    for (let i = 1; i <= tripDuration.days; i++) {
      state[i] = defaultValue;
    }
    return state;
  }, [tripDuration.days]);

  const [perDayTransfers, setPerDayTransfers] = useState<{ [day: number]: string[] }>(initializePerDayState(['sedan-4']));
  const [perDayHotels, setPerDayHotels] = useState<{ [day: number]: string[] }>(() => {
    if (availableHotels.length > 0) {
      return initializePerDayState([availableHotels[0].id]);
    }
    return {};
  });
  const [perDayRoomTypes, setPerDayRoomTypes] = useState<{ [day: number]: {[hotelId: string]: number} }>(() => {
    const initial: { [day: number]: {[hotelId: string]: number} } = {};
    for (let i = 1; i <= tripDuration.days; i++) {
      initial[i] = {};
      if (availableHotels.length > 0) {
        initial[i][availableHotels[0].id] = 0; // Default to first room type
      }
    }
    return initial;
  });
  const [perDayMeals, setPerDayMeals] = useState<{ [day: number]: string[] }>(initializePerDayState(['breakfast-only']));
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If section doesn't exist, show a message or create it dynamically
      alert(`Please select a ${sectionId.replace('-section', '')} option from the available choices.`);
    }
  };

  // Calculate total price based on selections
  useEffect(() => {
    // Start with 0, only add selected services
    let newTotalPrice = 0;

    // Add per-day costs
    for (let i = 1; i <= tripDuration.days; i++) {
      // Transfer costs (per vehicle, not per person)
      if (perDayTransfers[i]) {
        perDayTransfers[i].forEach(transferId => {
          const transfer = customizationOptions.transfers.find(t => t.id === transferId);
          if (transfer) {
            // Extract price from priceText (e.g., "₹2200/km" -> 2200)
            const priceMatch = transfer.priceText.match(/₹(\d+)/);
            if (priceMatch) {
              newTotalPrice += parseInt(priceMatch[1]);
            }
          }
        });
      }
      // Hotel costs (per room, not per person - but need multiple rooms if capacity exceeded)
      if (i <= tripDuration.nights && perDayHotels[i]) {
        perDayHotels[i].forEach(hotelId => {
          const hotel = mockHotels.find(h => h.id === hotelId);
          if (hotel) {
            const roomTypeIndex = perDayRoomTypes[i]?.[hotelId] || 0;
            const roomType = hotel.roomTypes?.[roomTypeIndex];
            if (roomType) {
              // Calculate number of rooms needed based on capacity
              const roomsNeeded = Math.ceil(selectedPersons / roomType.capacity);
              newTotalPrice += roomType.price * roomsNeeded;
            } else {
              // Fallback to base price
              newTotalPrice += hotel.price;
            }
          }
        });
      }
      // Meal costs (per person)
      if (perDayMeals[i]) {
        perDayMeals[i].forEach(mealId => {
          const meal = customizationOptions.meals.find(m => m.id === mealId);
          if (meal) newTotalPrice += meal.price * selectedPersons;
        });
      }
    }
    
    // Add activity costs (per person) - only for extra activities
    selectedActivities.forEach(activityId => {
      const activity = customizationOptions.activities.find(a => a.id === activityId);
      if (activity) {
        // Only charge for extra activities, included activities are free
        if (activity.category === 'extra') {
          newTotalPrice += activity.price * selectedPersons;
        }
        // Included activities are free (no cost added)
      }
    });
    
    setTotalPrice(newTotalPrice);
  }, [perDayTransfers, perDayHotels, perDayRoomTypes, perDayMeals, selectedActivities, tripDuration, selectedPersons, tripDetails.basePrice]);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.date-picker-container')) {
        setShowDatePicker(false);
      }
      if (!target.closest('.address-picker-container')) {
        setShowAddressPicker(false);
      }
      if (!target.closest('.person-picker-container')) {
        setShowPersonPicker(false);
      }
      if (!target.closest('.date-picker-container')) {
        setIsCalendarOpen(false);
      }
    };

    if (showDatePicker || showAddressPicker || showPersonPicker || isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker, showAddressPicker, showPersonPicker, isCalendarOpen]);

  // Calendar helpers
  const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const isDisabledDate = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  // Initialize today's date
  useEffect(() => {
    const today = new Date();
    const todayStr = toIso(today);
    setTodayIso(todayStr);
    setMaxStartIso(todayStr);
    
    // Set initial start date
    if (selectedStartDate) {
      setStartDate(toIso(selectedStartDate));
    }
  }, [selectedStartDate]);

  // Update selectedStartDate when startDate changes
  useEffect(() => {
    if (startDate) {
      const date = new Date(startDate + 'T00:00:00');
      setSelectedStartDate(date);
    }
  }, [startDate]);

  // Calculate trip end date
  const tripEndDate = useMemo(() => {
    if (!selectedStartDate) return null;
    const endDate = new Date(selectedStartDate);
    endDate.setDate(endDate.getDate() + tripDuration.days - 1);
    return endDate;
  }, [selectedStartDate, tripDuration.days]);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tripDetails.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tripDetails.images.length]);

  const handleBooking = () => {
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const nextBookingStep = () => {
    setBookingStep(prev => prev + 1);
  };

  const prevBookingStep = () => {
    setBookingStep(prev => prev - 1);
  };

  const handleFinalBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking confirmed:', {
      tripDetails,
      selectedTransfers,
      selectedHotels,
      selectedActivities,
      selectedMeals,
      tripDuration,
      selectedPersons,
      selectedStartDate,
      totalPrice,
      userDetails
    });
    setShowBookingModal(false);
    setBookingStep(1);
    // You could show a success message or redirect to a confirmation page
  };

  return (
    <>
      <style jsx>{`
        .activity-modal-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#1a1a1a' : '#f5f5f5',
      color: darkMode ? '#fff' : '#333'
    }}>
      
      {/* Hero Section - Modern Design */}
      <div style={{
        position: 'relative',
        height: '0vh',
        minHeight: '600px',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${tripDetails.images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        padding: '0 2rem'
      }}>
        
        {/* Main Content */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          width: '100%', 
          maxWidth: '1400px', 
          margin: '0 auto',
          zIndex: 2
        }}>
          
          {/* Left Content */}
          <div style={{ flex: '1', maxWidth: '600px' }}>

            {/* Destination Name */}
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 800, 
              fontFamily: 'serif',
              marginBottom: '1rem', 
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              lineHeight: '1.1',
              marginTop:'5rem',
              letterSpacing: '-0.02em'
            }}>
              {tripDetails.name}
          </h1>
          
            {/* Descriptive Text */}
            
             

              {/* Action Buttons */}
              <div style={{ display: 'flex', marginTop: '9rem', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{
               
               display: 'inline-block',
               background: 'rgba(255, 255, 255, 0)',
               backdropFilter: 'blur(10px)',
               padding: '0.5rem 1.5rem',
               borderRadius: '30px',
               border: '1px solid rgba(6, 5, 5, 0.3)',
               fontSize: '0.9rem',
               fontWeight: 600
             }}>
               {tripDetails.duration} 
          </div>

               
               <div 
                 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                 onClick={() => {
                   setSelectedImageIndex(0);
                   setShowImageModal(true);
                 }}
               >
                 <div style={{
                   width: '60px',
                   height: '60px',
                   borderRadius: '50%',
                   background: '#ff4444',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   boxShadow: '0 4px 15px rgba(255, 68, 68, 0.4)',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                 >
                <div style={{
                     width: 0,
                     height: 0,
                     borderLeft: '12px solid #fff',
                     borderTop: '8px solid transparent',
                     borderBottom: '8px solid transparent',
                     marginLeft: '3px'
                   }} />
                </div>
                 <span style={{ fontSize: '1rem', fontWeight: 500 }}>all images</span>
            </div>
          </div>

             {/* Day Selector */}
             <div style={{ 
               marginTop: '7rem',
               display: 'flex',
               alignItems: 'center',
               gap: '1rem'
             }}>
               <span style={{ 
                  color: '#fff',
                  fontSize: '1rem',
                 fontWeight: 600
               }}>
                 Choose Day:
               </span>
                <div style={{
                 display: 'flex', 
                 gap: '0.5rem',
                 flexWrap: 'wrap'
               }}>
                 {Array.from({ length: tripDuration.days }, (_, i) => i + 1).map(day => (
                    <button
                     key={day}
                     onClick={() => setSelectedDay(day)}
                      style={{
                       background: selectedDay === day ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                       color: selectedDay === day ? '#333' : '#fff',
                       border: '1px solid rgba(255, 255, 255, 0.3)',
                       borderRadius: '25px',
                       padding: '0.5rem 1rem',
                       fontSize: '0.9rem',
                       fontWeight: 600,
                        cursor: 'pointer',
                       transition: 'all 0.3s ease',
                       minWidth: '60px'
              }}
              onMouseEnter={(e) => {
                       if (selectedDay !== day) {
                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                       }
              }}
              onMouseLeave={(e) => {
                       if (selectedDay !== day) {
                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                       }
              }}
            >
                     Day {day}
            </button>
                 ))}
          </div>
        </div>

            {/* Trip Duration Badge */}
            
      </div>

          {/* Right Content - Destination Card */}
      <div style={{
            flex: '0 0 350px',
            marginLeft: '2rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '0',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              color: '#333',
        position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Card Image Only */}
            <div style={{
                width: '100%',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#f0f0f0'
              }}>
                <img 
                  src={tripDetails.images[(currentImageIndex + 1) % tripDetails.images.length]} 
                  alt={tripDetails.name}
              style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
          </div>
        </div>
          </div>
        </div>

        
        {/* Image Navigation Dots */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          {tripDetails.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: index === currentImageIndex ? '#fff' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', gap: '2rem', padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
        {/* Left Column - Trip Details & Customization */}
        <div style={{ flex: 1 }}>
          {/* Customization Options */}
          <div style={{
            background: darkMode ? '#2d2d2d' : '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.5rem' }}>Customize Your Trip</h2>
            
            {/* Day Selector above Customize Your Trip */}

            {/* Customize Your Trip section (per-day) */}
            <div style={{
              background: darkMode ? '#2d2d2d' : '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <div id="activity-section" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>Trip Activities </h3>
                  <button
                    onClick={() => {
                      setActivityModalLoading(true);
                      setPendingActivities(selectedActivities);
                      setShowActivityModal(true);
                      // Simulate data loading time for better UX
                      setTimeout(() => setActivityModalLoading(false), 100);
                    }}
                    style={{ background: 'none', color: '#1976d2', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Add More
                  </button>
                </div>
                {selectedActivities.length > 0 ? (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {selectedActivities.map((activityId) => {
                      const activity = customizationOptions.activities.find(a => a.id === activityId);
                      if (!activity) return null;
                      return (
                        <div
                          key={activity.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            background: darkMode ? '#3d3d3d' : '#f0f0f0',
                            border: '2px solid rgb(63, 63, 64)',
                            position: 'relative',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                        >
                          <img 
                            src={activity.image} 
                            alt={activity.name}
                            style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover', background: '#fff' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{activity.name}</span>
                              {activity.category && (
                                <span style={{ 
                                  fontSize: '0.7rem', 
                                  padding: '0.2rem 0.5rem', 
                                  borderRadius: '0.3rem',
                                  background: activity.category === 'included' ? '#e8f5e8' : '#f3e5f5',
                                  color: activity.category === 'included' ? '#4caf50' : '#9c27b0',
                                  border: `1px solid ${activity.category === 'included' ? '#4caf50' : '#9c27b0'}`
                                }}>
                                  {activity.category === 'included' ? 'FREE' : 'EXTRA'}
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '1rem', color: darkMode ? '#ccc' : '#444', marginBottom: '0.3rem' }}>
                              {activity.description}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: darkMode ? '#aaa' : '#666', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <span>📍 {activity.location}</span>
                              <span>⏱️ {activity.duration}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: darkMode ? '#999' : '#666', background: darkMode ? '#3d3d3d' : '#f9f9f9', borderRadius: '0.5rem' }}>
                    No activities selected for the trip.
                  </div>
                )}
                {/* Activity Change Modal */}
                {showActivityModal && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div 
                      className="activity-modal-scroll"
                      style={{
                      background: darkMode ? '#2d2d2d' : '#fff',
                      borderRadius: '1rem',
                        padding: '1.5rem',
                      minWidth: '350px',
                      maxWidth: '95vw',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none', // IE and Edge
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Choose Activities</h3>
                        <button onClick={() => setShowActivityModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>×</button>
                      </div>
                      
                      {activityModalLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', color: darkMode ? '#ccc' : '#666' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>⏳</div>
                            <div>Loading activities...</div>
                          </div>
                        </div>
                      ) : (
                        <>
                      {/* Included Activities Section */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 600, 
                          marginBottom: '0.8rem', 
                          color: '#333', 
                          padding: '0.4rem 0.8rem', 
                          background: '#e8f5e8', 
                          borderRadius: '0.5rem', 
                          border: '1px solid #4caf50' 
                        }}>
                          🎯 Included Activities (Free with package)
                        </h4>
                        <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '1rem' }}>
                          {includedActivities.map(option => {
                          const checked = pendingActivities.includes(option.id);
                          return (
                              <div key={option.id} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.8rem', 
                                padding: '0.8rem', 
                                borderRadius: '0.8rem', 
                                background: checked ? '#e8f5e8' : '#f7f7f7', 
                                border: checked ? '2px solid #4caf50' : '1px solid #ddd', 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: checked ? '0 4px 12px rgba(76, 175, 80, 0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                              onClick={() => {
                                setPendingActivities(checked ? pendingActivities.filter(id => id !== option.id) : [...pendingActivities, option.id]);
                              }}
                            >
                                <input type="checkbox" checked={checked} readOnly style={{ accentColor: '#4caf50' }} />
                                <img 
                                  src={option.image} 
                                  alt={option.name} 
                                  style={{ width: '60px', height: '45px', borderRadius: '0.4rem', objectFit: 'cover', background: '#fff' }}
                                  onError={(e) => {
                                    e.currentTarget.src = '/activity/hotel.jpg'; // Fallback image
                                  }}
                                  loading="lazy"
                                />
                              <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 600, color: '#333', fontSize: '1rem' }}>{option.name}</div>
                                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.2rem' }}>{option.description}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#888' }}>📍 {option.location} • ⏱️ {option.duration}</div>
                              </div>
                                <div style={{ fontWeight: 700, color: '#4caf50', fontSize: '1rem' }}>FREE</div>
                            </div>
                          );
                        })}
                      </div>
                      </div>

                      {/* Extra Activities Section */}
                      <div>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 600, 
                          marginBottom: '0.8rem', 
                          color: '#333', 
                          padding: '0.4rem 0.8rem', 
                          background: '#f3e5f5', 
                          borderRadius: '0.5rem', 
                          border: '1px solid #9c27b0' 
                        }}>
                          ⭐ Extra Activities (Additional cost)
                        </h4>
                        <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '1rem' }}>
                          {extraActivities.map(option => {
                            const checked = pendingActivities.includes(option.id);
                            return (
                              <div key={option.id} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.8rem', 
                                padding: '0.8rem', 
                                borderRadius: '0.8rem', 
                                background: checked ? '#f3e5f5' : '#f7f7f7', 
                                border: checked ? '2px solid #9c27b0' : '1px solid #ddd', 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: checked ? '0 4px 12px rgba(156, 39, 176, 0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                                onClick={() => {
                                  setPendingActivities(checked ? pendingActivities.filter(id => id !== option.id) : [...pendingActivities, option.id]);
                                }}
                              >
                                <input type="checkbox" checked={checked} readOnly style={{ accentColor: '#9c27b0' }} />
                                <img 
                                  src={option.image} 
                                  alt={option.name} 
                                  style={{ width: '60px', height: '45px', borderRadius: '0.4rem', objectFit: 'cover', background: '#fff' }}
                                  onError={(e) => {
                                    e.currentTarget.src = '/activity/hotel.jpg'; // Fallback image
                                  }}
                                  loading="lazy"
                                />
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 600, color: '#333', fontSize: '1rem' }}>{option.name}</div>
                                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.2rem' }}>{option.description}</div>
                                  <div style={{ fontSize: '0.7rem', color: '#888' }}>📍 {option.location} • ⏱️ {option.duration}</div>
                                </div>
                                <div style={{ fontWeight: 700, color: '#9c27b0', fontSize: '1rem' }}>₹{option.price}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Selection Summary */}
                      <div style={{ 
                        background: '#f8f9fa', 
                        padding: '0.8rem', 
                        borderRadius: '0.5rem', 
                        marginBottom: '0.8rem',
                        border: '1px solid #e9ecef'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>Selected Activities:</span>
                          <span style={{ fontWeight: 700, color: '#1976d2', fontSize: '0.9rem' }}>{pendingActivities.length}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                          {pendingActivities.length > 0 ? (
                            <div>
                              {pendingActivities.map(activityId => {
                                const activity = customizationOptions.activities.find(a => a.id === activityId);
                                return activity ? (
                                  <div key={activityId} style={{ marginBottom: '0.2rem' }}>
                                    • {activity.name} {activity.category === 'included' ? '(FREE)' : `(₹${activity.price})`}
                                  </div>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <span style={{ fontStyle: 'italic' }}>No activities selected</span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setSelectedActivities(pendingActivities);
                          setShowActivityModal(false);
                        }}
                        style={{
                          width: '100%',
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          padding: '0.8rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          marginTop: '0.3rem',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#1565c0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#1976d2';
                        }}
                      >
                        Save Selection ({pendingActivities.length} activities)
                      </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Per-day Transfers */}
              {selectedTransfers.length > 0 && (
                <div id="transfer-section" style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>Transfers</h3>
                    <button
                      onClick={() => setShowTransferModal(true)}
                      style={{ background: 'none', color: '#1976d2', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      CHANGE
                    </button>
                  </div>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {(perDayTransfers[selectedDay] || []).map((transferId) => {
                      const transfer = customizationOptions.transfers.find(t => t.id === transferId);
                      if (!transfer) return null;
                      return (
                        <div
                          key={transfer.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            background: darkMode ? '#3d3d3d' : '#f0f0f0',
                            border: '2px solid rgb(63, 63, 64)',
                            position: 'relative',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                        >
                          <img 
                            src={transfer.image} 
                            alt={transfer.name}
                            style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover', background: '#fff' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Private Transfer</span>
                            </div>
                            <div style={{ fontSize: '1rem', color: darkMode ? '#ccc' : '#444', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>🚗</span>
                              <span>{transfer.description.split('|').slice(0, 1).join(' | ')}</span>
                              <span>|</span>
                              <span>{transfer.description.split('|').slice(1).join(' | ')}</span>
                            </div>
                            <div style={{ fontSize: '0.95rem', color: darkMode ? '#aaa' : '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>📍</span>
                              <span>{transfer.description.split('|').pop()}</span>
                            </div>
                          </div>
                          
                        </div>
                      );
                    })}
                  </div>
                  {/* Transfer Change Modal */}
                  {showTransferModal && (
                    <div style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.4)',
                      zIndex: 2000,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        background: darkMode ? '#2d2d2d' : '#fff',
                        borderRadius: '1rem',
                        padding: '2rem',
                        minWidth: '350px',
                        maxWidth: '95vw',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Choose Transfer</h3>
                          <button onClick={() => setShowTransferModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>×</button>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                          {/* Car Category Selection */}
                          <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.8rem', color: darkMode ? '#fff' : '#333' }}>Choose Car Category</h4>
                            <div style={{ display: 'grid', gap: '0.4rem' }}>
                              {carTypeOptions.map(opt => (
                                <button
                                  key={opt.label}
                                  onClick={() => setSelectedTransferCategory(opt.label)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                    padding: '0.6rem 0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid',
                                    borderColor: selectedTransferCategory === opt.label ? '#1976d2' : (darkMode ? 'rgba(255,255,255,0.15)' : '#ccc'),
                                    background: selectedTransferCategory === opt.label ? 'rgba(25,118,210,0.1)' : (darkMode ? '#444' : '#f7f7f7'),
                                    color: darkMode ? '#fff' : '#333',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                  }}
                                >
                                  <span>{opt.label}</span>
                                  <span style={{ color: darkMode ? '#ccc' : '#666', fontWeight: 400, fontSize: '0.8rem' }}>{opt.desc}</span>
                                  <span style={{ color: '#1976d2', fontWeight: 600, fontSize: '0.8rem' }}>{opt.priceInfo}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Available Cars in Selected Category */}
                          <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.8rem', color: darkMode ? '#fff' : '#333' }}>Available Cars - {selectedTransferCategory}</h4>
                            <div style={{ display: 'grid', gap: '0.8rem' }}>
                              {customizationOptions.transfers
                                .filter(option => option.category === selectedTransferCategory)
                                .map(option => (
                                  <div key={option.id} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '1rem', 
                                    padding: '1rem', 
                                    borderRadius: '0.5rem', 
                                    background: (perDayTransfers[selectedDay] || []).includes(option.id) ? '#fdf2f2' : (darkMode ? '#444' : '#f7f7f7'), 
                                    border: (perDayTransfers[selectedDay] || []).includes(option.id) ? '2px solid rgb(127, 129, 132)' : '1px solid #ccc', 
                                    cursor: 'pointer' 
                                  }}
                                    onClick={() => {
                                      setPerDayTransfers(prev => ({ ...prev, [selectedDay]: [option.id] }));
                                      setShowTransferModal(false);
                                    }}
                                  >
                                    <img src={option.image} alt={option.name} style={{ width: '60px', height: '40px', borderRadius: '0.3rem', objectFit: 'cover', background: '#fff' }} />
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontWeight: 600 }}>{option.name}</div>
                                      <div style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666' }}>{option.description}</div>
                                      <div style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#888', marginTop: '0.2rem' }}>
                                        Capacity: {option.capacity} passengers • {option.features.slice(0, 2).join(', ')}
                                      </div>
                                    </div>
                                    <div style={{ fontWeight: 600, color: '#1976d2' }}>{option.priceText}</div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Per-day Accommodation (not for last day) */}
              {selectedDay < tripDuration.days && (
                <div id="hotel-section" style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '600', margin: 0 }}>Accommodation</h3>
                    <button
                      onClick={() => setShowHotelModal(true)}
                      style={{ background: 'none', color: '#1976d2', border: 'none', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Change
                    </button>
                  </div>
                  
                  {availableHotels.length === 0 ? (
                    <div style={{ 
                      padding: '1rem', 
                      textAlign: 'center', 
                      color: darkMode ? '#999' : '#666', 
                      background: darkMode ? '#3d3d3d' : '#f9f9f9', 
                      borderRadius: '0.5rem' 
                    }}>
                      No hotels available for this destination.
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {(perDayHotels[selectedDay] || []).map((hotelId) => {
                        const hotel = availableHotels.find(h => h.id === hotelId);
                        if (!hotel) return null;
                        const selectedRoomTypeIndex = perDayRoomTypes[selectedDay]?.[hotelId] || 0;
                        const selectedRoomType = hotel.roomTypes?.[selectedRoomTypeIndex];
                        return (
                          <div
                            key={hotel.id}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              padding: '1.5rem',
                              borderRadius: '0.5rem',
                              background: darkMode ? '#3d3d3d' : '#f0f0f0',
                              border: '2px solid rgb(63, 63, 64)',
                              position: 'relative',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                            }}
                          >
                            {/* Hotel Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <img 
                                src={hotel.images[0]} 
                              alt={hotel.name}
                              style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover', background: '#fff' }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{hotel.name}</span>
                              </div>
                              <div style={{ fontSize: '1rem', color: darkMode ? '#ccc' : '#444', marginBottom: '0.3rem' }}>
                                {hotel.description}
                              </div>
                              <div style={{ fontSize: '0.95rem', color: darkMode ? '#aaa' : '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>⭐</span>
                                <span>{hotel.rating} / 5</span>
                              </div>
                              </div>
                            </div>
                            
                            {/* Room Type Selection */}
                            {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                              <div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.8rem', color: darkMode ? '#fff' : '#333' }}>
                                  Select Room Category:
                                </h4>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                  {hotel.roomTypes.map((roomType: any, index: number) => {
                                    const roomsNeeded = Math.ceil(selectedPersons / roomType.capacity);
                                    const isSelected = selectedRoomTypeIndex === index;
                                    return (
                                      <div
                                        key={index}
                                        onClick={() => {
                                          setPerDayRoomTypes(prev => ({
                                            ...prev,
                                            [selectedDay]: {
                                              ...prev[selectedDay],
                                              [hotelId]: index
                                            }
                                          }));
                                        }}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '1rem',
                                          padding: '0.8rem',
                                          borderRadius: '0.5rem',
                                          background: isSelected ? 'rgb(224, 224, 224)' : (darkMode ? '#444' : '#f7f7f7'),
                                          border: isSelected ? '2px solid rgb(127, 129, 132)' : '1px solid #ccc',
                                          cursor: 'pointer',
                                          transition: 'all 0.2s ease'
                                        }}
                                      >
                                        <div style={{ flex: 1 }}>
                                          <div style={{ fontWeight: 600, color: darkMode ? '#fff' : '#333' }}>
                                            {roomType.name}
                                          </div>
                                          <div style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666' }}>
                                            Sleeps {roomType.capacity} guests
                                          </div>
                                          {isSelected && (
                                            <div style={{ 
                                              fontSize: '0.8rem', 
                                              color: '#1976d2', 
                                              fontWeight: 600,
                                              marginTop: '0.2rem'
                                            }}>
                                              {roomsNeeded} room{roomsNeeded > 1 ? 's' : ''} needed for {selectedPersons} guest{selectedPersons > 1 ? 's' : ''}
                                            </div>
                                          )}
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                          <div style={{ fontWeight: 600, color: '#1976d2' }}>
                                            ₹{roomType.price}/night
                                          </div>
                                          {isSelected && roomsNeeded > 1 && (
                                            <div style={{ fontSize: '0.8rem', color: darkMode ? '#ccc' : '#666' }}>
                                              ×{roomsNeeded} = ₹{(roomType.price * roomsNeeded).toLocaleString()}
                                            </div>
                                          )}
                            </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Hotel Change Modal */}
                  {showHotelModal && (
                    <div style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.4)',
                      zIndex: 2000,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        background: darkMode ? '#2d2d2d' : '#fff',
                        borderRadius: '1rem',
                        padding: '2rem',
                        minWidth: '350px',
                        maxWidth: '95vw',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Choose Accommodation</h3>
                          <button onClick={() => setShowHotelModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>×</button>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          {availableHotels.length === 0 ? (
                            <div style={{ 
                              padding: '1rem', 
                              textAlign: 'center', 
                              color: darkMode ? '#999' : '#666', 
                              background: darkMode ? '#3d3d3d' : '#f9f9f9', 
                              borderRadius: '0.5rem' 
                            }}>
                              No hotels available for this destination.
                            </div>
                          ) : (
                            availableHotels.map(option => (
                              <div key={option.id} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1rem', 
                                padding: '1rem', 
                                borderRadius: '0.5rem', 
                                background: (perDayHotels[selectedDay] || []).includes(option.id) ? '#fdf2f2' : (darkMode ? '#444' : '#f7f7f7'), 
                                border: (perDayHotels[selectedDay] || []).includes(option.id) ? '2px solid rgb(127, 129, 132)' : '1px solid #ccc', 
                                cursor: 'pointer' 
                              }}
                                onClick={() => {
                                  setPerDayHotels(prev => ({ ...prev, [selectedDay]: [option.id] }));
                                  // Set default room type when selecting hotel
                                  setPerDayRoomTypes(prev => ({
                                    ...prev,
                                    [selectedDay]: {
                                      ...prev[selectedDay],
                                      [option.id]: 0
                                    }
                                  }));
                                  setShowHotelModal(false);
                                }}
                              >
                                <img src={option.images[0]} alt={option.name} style={{ width: '60px', height: '40px', borderRadius: '0.3rem', objectFit: 'cover', background: '#fff' }} />
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 600 }}>{option.name}</div>
                                  <div style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666' }}>{option.description}</div>
                                  <div style={{ fontSize: '0.8rem', color: darkMode ? '#aaa' : '#888', marginTop: '0.2rem' }}>
                                    {option.roomTypes?.length || 0} room types available
                                </div>
                                </div>
                                <div style={{ fontWeight: 600, color: '#1976d2' }}>
                                  ₹{option.roomTypes?.[0]?.price || option.price}/night
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Per-day Meals */}
              <div id="meal-section" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>Meals</h3>
                  <button
                    onClick={() => {
                      setPendingMeals(perDayMeals[selectedDay] || []);
                      setShowMealModal(true);
                    }}
                    style={{ background: 'none', color: '#1976d2', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Add More
                  </button>
                </div>
                {(perDayMeals[selectedDay] || []).length > 0 ? (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {(perDayMeals[selectedDay] || []).map((mealId) => {
                      const meal = customizationOptions.meals.find(m => m.id === mealId);
                      if (!meal) return null;
                      return (
                        <div
                          key={meal.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            background: darkMode ? '#3d3d3d' : '#f0f0f0',
                            border: '2px solid rgb(63, 63, 64)',
                            position: 'relative',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                        >
                          <img 
                            src={meal.image} 
                            alt={meal.name}
                            style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover', background: '#fff' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{meal.name}</span>
                            </div>
                            <div style={{ fontSize: '1rem', color: darkMode ? '#ccc' : '#444', marginBottom: '0.3rem' }}>
                              {meal.description}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: darkMode ? '#aaa' : '#666', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>🍽️</span>
                              <span>{meal.features.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ padding: '1rem', textAlign: 'center', color: darkMode ? '#999' : '#666', background: darkMode ? '#3d3d3d' : '#f9f9f9', borderRadius: '0.5rem' }}>
                    No meals selected for this day.
                  </div>
                )}
                {/* Meal Change Modal */}
                {showMealModal && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      background: darkMode ? '#2d2d2d' : '#fff',
                      borderRadius: '1rem',
                      padding: '2rem',
                      minWidth: '350px',
                      maxWidth: '95vw',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Choose Meals</h3>
                        <button onClick={() => setShowMealModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>×</button>
                      </div>
                      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                        {customizationOptions.meals.map(option => {
                          const checked = (perDayMeals[selectedDay] || []).includes(option.id);
                          return (
                            <div key={option.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.5rem', background: checked ? 'rgb(219, 220, 221)' : (darkMode ? '#444' : '#f7f7f7'), border: checked ? '2px solid rgb(85, 85, 85)' : '1px solid #ccc', cursor: 'pointer' }}
                              onClick={() => {
                                const currentMeals = perDayMeals[selectedDay] || [];
                                const newMeals = checked ? currentMeals.filter(id => id !== option.id) : [...currentMeals, option.id];
                                setPerDayMeals(prev => ({ ...prev, [selectedDay]: newMeals }));
                              }}
                            >
                              <input type="checkbox" checked={checked} readOnly style={{ accentColor: '#1976d2' }} />
                              <img src={option.image} alt={option.name} style={{ width: '60px', height: '40px', borderRadius: '0.3rem', objectFit: 'cover', background: '#fff' }} />
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600 }}>{option.name}</div>
                                <div style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666' }}>{option.description}</div>
                              </div>
                              <div style={{ fontWeight: 600, color: '#1976d2' }}>₹{option.price}{option.id === 'breakfast-only' ? '' : '/day'}</div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMeals(pendingMeals);
                          setShowMealModal(false);
                        }}
                        style={{
                          width: '100%',
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          padding: '0.8rem',
                          borderRadius: '0.5rem',
                          fontWeight: 600,
                          fontSize: '1rem',
                          cursor: 'pointer',
                          marginTop: '0.5rem'
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Activities (fixed for all days) */}
            </div>
          </div>
        </div>



        {/* Right Column - Booking Summary */}
        <div style={{ width: '400px', position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
          <div style={{
            background: darkMode ? '#2d2d2d' : '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Booking Summary</h2>
            {/* Guests Selector moved here */}
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#ccc' : '#666' }}>Guests</span>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <button onClick={() => setSelectedPersons(p => Math.max(1, p - 1))} style={{ width:32, height:32, borderRadius:6, border:`1px solid ${darkMode ? '#555' : '#1976d2'}`, background:'transparent', color: darkMode ? '#fff' : '#1976d2', cursor:'pointer' }}>−</button>
                  <div style={{ minWidth:60, textAlign:'center', padding:'0.4rem 0.6rem', border:`1px solid ${darkMode ? '#555' : '#1976d2'}`, borderRadius:6, color: darkMode ? '#fff' : '#1976d2', fontWeight:700 }}>{selectedPersons} {selectedPersons === 1 ? 'Adult' : 'Adults'}</div>
                  <button onClick={() => setSelectedPersons(p => Math.min(20, p + 1))} style={{ width:32, height:32, borderRadius:6, border:`1px solid ${darkMode ? '#555' : '#1976d2'}`, background:'transparent', color: darkMode ? '#fff' : '#1976d2', cursor:'pointer' }}>+</button>
                </div>
              </div>
            </div>
            
            {/* Trip Details */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#ccc' : '#666' }}>Trip</span>
                <span style={{ fontWeight: 600 }}>{tripDetails.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#ccc' : '#666' }}>Duration</span>
                <span style={{ fontWeight: 600 }}>{tripDuration.nights}N/{tripDuration.days}D</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#ccc' : '#666' }}>Persons</span>
                <span style={{ fontWeight: 600 }}>{selectedPersons} {selectedPersons === 1 ? 'Person' : 'Persons'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: darkMode ? '#ccc' : '#666' }}>Trip starts on</span>
                <div className="date-picker-container" style={{ position: 'relative' }}>
                  <button
                    onClick={() => {
                      // init calendar with current selected or today
                      const base = selectedStartDate ?? new Date();
                      setCalMonth(base.getMonth());
                      setCalYear(base.getFullYear());
                      setIsCalendarOpen(true);
                    }}
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      border: '1.5px solid #ddd',
                      padding: '0.65rem 0.9rem',
                      fontWeight: 800,
                      color: '#1a2a3a',
                      background: 'linear-gradient(180deg, #ffffff, #f7f7f7)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s ease, border-color 0.2s ease, transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#e2b89b';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = '#ddd';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span aria-hidden="true" style={{ fontSize: '1rem' }}>📅</span>
                      <span>
                        {selectedStartDate 
                          ? selectedStartDate.toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                            })
                          : 'Select travel date'
                        }
                      </span>
                    </span>
                    <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Change</span>
                  </button>
                  {isCalendarOpen && (
                    <div
                      onClick={() => setIsCalendarOpen(false)}
                      style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000,
                        backdropFilter: 'blur(2px)'
                      }}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: '#fff', borderRadius: 16, padding: 16, boxShadow: '0 14px 40px rgba(0,0,0,0.18)', width: 416, height: 480, boxSizing: 'border-box' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                          <button
                            onClick={() => {
                              let m = calMonth - 1;
                              let y = calYear;
                              if (m < 0) { m = 11; y -= 1; }
                              setCalMonth(m); setCalYear(y);
                            }}
                            style={{ background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', color: '#1a2a3a', transition: 'color 0.2s ease, transform 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#e2b89b'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#1a2a3a'; e.currentTarget.style.transform = 'scale(1)'; }}
                            aria-label="Previous month"
                          >
                            ‹
                          </button>
                          <div style={{ fontWeight: 800 }}>{new Date(calYear, calMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
                          <button
                            onClick={() => {
                              let m = calMonth + 1;
                              let y = calYear;
                              if (m > 11) { m = 0; y += 1; }
                              setCalMonth(m); setCalYear(y);
                            }}
                            style={{ background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', color: '#1a2a3a', transition: 'color 0.2s ease, transform 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#e2b89b'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#1a2a3a'; e.currentTarget.style.transform = 'scale(1)'; }}
                            aria-label="Next month"
                          >
                            ›
                          </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 5, marginBottom: 8, color: '#7A6B57', fontWeight: 800, fontSize: 15 }}>
                          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} style={{ textAlign: 'center' }}>{d}</div>)}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {(() => {
                          const firstDay = new Date(calYear, calMonth, 1).getDay();
                          const total = daysInMonth(calYear, calMonth);
                          const cells: React.ReactNode[] = [];
                          for (let i = 0; i < firstDay; i++) {
                            cells.push(<div key={`e${i}`} />);
                          }
                          for (let day = 1; day <= total; day++) {
                            const d = new Date(calYear, calMonth, day);
                            const iso = toIso(d);
                            const disabled = isDisabledDate(d);
                            const isSelected = selectedStartDate && d.toDateString() === selectedStartDate.toDateString();
                            cells.push(
                              <button
                                key={iso}
                                disabled={disabled}
                                onClick={() => { setStartDate(iso); setIsCalendarOpen(false); }}
                                style={{
                                  border: isSelected ? '2px solid #1a2a3a' : '1px solid #eee',
                                  background: isSelected ? '#e2b89b' : '#fff',
                                  color: disabled ? '#aaa' : '#1a2a3a',
                                  borderRadius: 12,
                                  padding: '10px 0',
                                  cursor: disabled ? 'not-allowed' : 'pointer',
                                  fontWeight: 800,
                                }}
                              >
                                {day}
                              </button>
                            );
                          }
                          return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, gridAutoRows: '48px', minHeight: 328 }}>{cells}</div>;
                        })()}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                          <button onClick={() => setIsCalendarOpen(false)} style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>Close</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: darkMode ? '#ccc' : '#666' }}>Trip End Date</span>
                <span style={{ fontWeight: 600 }}>
                  {tripEndDate 
                    ? tripEndDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })
                    : 'Select start date first'
                  }
                </span>
              </div>
            </div>

            {/* Quick Selections Overview */}
            {(() => {
              const transfersCount = Object.values(perDayTransfers).reduce((acc, arr) => acc + ((arr || []).length), 0);
              const hotelsNights = Object.entries(perDayHotels)
                .filter(([day]) => Number(day) <= tripDuration.nights)
                .reduce((acc, [, arr]) => acc + ((arr || []).length), 0);
              const mealsCount = Object.values(perDayMeals).reduce((acc, arr) => acc + ((arr || []).length), 0);
              const activitiesCount = selectedActivities.length;
              const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' } as React.CSSProperties;
              const countStyle = { fontWeight: 600 } as React.CSSProperties;
              return (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={rowStyle}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Transfers</span>
                    <span style={countStyle}>{transfersCount} selected</span>
                  </div>
                  <div style={rowStyle}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Accommodation</span>
                    <span style={countStyle}>{hotelsNights} night(s)</span>
                  </div>
                  <div style={rowStyle}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Meals</span>
                    <span style={countStyle}>{mealsCount} selected</span>
                  </div>
                  <div style={rowStyle}>
                    <span style={{ color: darkMode ? '#ccc' : '#666' }}>Activities</span>
                    <span style={countStyle}>{activitiesCount} selected</span>
                  </div>
                </div>
              );
            })()}

            {/* Price Breakdown */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Price Breakdown</h3>
              
              {/* Detailed breakdown */}
              <div style={{ fontSize: '0.9rem', color: darkMode ? '#ccc' : '#666', marginBottom: '0.8rem' }}>
                <div style={{ marginBottom: '0.3rem' }}>
                  <strong>Accommodation:</strong> Per room (auto-calculated based on room capacity)
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <strong>Meals:</strong> Per person (×{selectedPersons})
                </div>
                <div style={{ marginBottom: '0.3rem' }}>
                  <strong>Activities:</strong> Included activities FREE, Extra activities per person (×{selectedPersons})
                </div>
                <div>
                  <strong>Transfers:</strong> Per vehicle (not per person)
                </div>
              </div>
              
              {/* Activity breakdown */}
              {selectedActivities.length > 0 && (
                <div style={{ marginBottom: '0.8rem', padding: '0.8rem', background: darkMode ? '#333' : '#f8f9fa', borderRadius: '0.5rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Selected Activities:</div>
                  {selectedActivities.map(activityId => {
                    const activity = customizationOptions.activities.find(a => a.id === activityId);
                    if (!activity) return null;
                    const isIncluded = activity.category === 'included';
                    const cost = isIncluded ? 0 : activity.price * selectedPersons;
                    return (
                      <div key={activityId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                        <span style={{ color: darkMode ? '#ccc' : '#666' }}>
                          {activity.name} {isIncluded ? '(FREE)' : `(×${selectedPersons})`}
                        </span>
                        <span style={{ fontWeight: 600, color: isIncluded ? '#4caf50' : '#1976d2' }}>
                          {isIncluded ? 'FREE' : `₹${cost.toLocaleString()}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Selected Services</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>

              <div style={{ 
                borderTop: `1px solid ${darkMode ? '#444' : '#ddd'}`, 
                paddingTop: '0.5rem',
                marginTop: '0.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Total ({selectedPersons} {selectedPersons === 1 ? 'Person' : 'Persons'})</span>
                  <span style={{ fontWeight: 600, color: '#1976d2', fontSize: '1.2rem' }}>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: darkMode ? '#ccc' : '#999', textAlign: 'center', marginTop: '1rem' }}>
              Free cancellation up to 24 hours before departure
            </div>

            <button
              onClick={() => setShowDetailsModal(true)}
              style={{
                width: '100%',
                background: 'rgb(10, 24, 37, 20%)',
                color: '#040a16',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                margin: '1rem 1rem 1rem 0'
              }}
            >
              View Details
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => {
                // Create trip item for cart
                const tripItem = {
                  id: `trip-${tripId}-${selectedStartDate?.toISOString().split('T')[0] || 'custom'}`,
                  type: 'trip' as const,
                  name: `Trip to ${tripDetails.name}`,
                  price: totalPrice,
                  image: tripDetails.images[0],
                  details: {
                    tripDate: selectedStartDate?.toISOString().split('T')[0] || '',
                    tripEndDate: tripEndDate?.toISOString().split('T')[0] || '',
                    duration: `${tripDuration.nights}N/${tripDuration.days}D`,
                    accommodation: Object.entries(perDayHotels).map(([day, hotelIds]) => 
                      hotelIds.map(hotelId => {
                        const hotel = mockHotels.find(h => h.id === hotelId);
                        if (!hotel) return null;
                        const roomTypeIndex = perDayRoomTypes[Number(day)]?.[hotelId] || 0;
                        const roomType = hotel.roomTypes?.[roomTypeIndex];
                        return `${hotel.name}${roomType ? ` (${roomType.name})` : ''}`;
                      }).filter(Boolean).join(', ')
                    ).filter(Boolean).join(', ') || 'Not selected',
                    transportation: Object.values(perDayTransfers).flat().map(transferId => 
                      customizationOptions.transfers.find(t => t.id === transferId)?.name
                    ).filter(Boolean).join(', ') || 'Not selected',
                    meals: Object.values(perDayMeals).flat().map(mealId => 
                      customizationOptions.meals.find(m => m.id === mealId)?.name
                    ).filter(Boolean).join(', ') || 'Not selected',
                    activities: selectedActivities.map(activityId => 
                      customizationOptions.activities.find(a => a.id === activityId)?.name
                    ).filter(Boolean).join(', ') || 'Not selected',
                  },
                };
                addToCart(tripItem);
                router.push('/cart');
              }}
              style={{
                width: '100%',
                background: '#EF6C62',
                color: '#fff',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EF6C82';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#EF6C62';
              }}
            >
              Book Now - ₹{totalPrice.toLocaleString()}
            </button>

            
            {showDetailsModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 3000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  background: darkMode ? '#2d2d2d' : '#fff',
                  borderRadius: '1rem',
                  padding: '2rem',
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Your Selections</h3>
                    <button onClick={() => setShowDetailsModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: darkMode ? '#fff' : '#333' }}>×</button>
                  </div>
                  <div>
                    {Array.from({ length: tripDuration.days }, (_, i) => i + 1).map(day => (
                      <div key={day} style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Day {day}</h4>
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Transfers:</strong> {(perDayTransfers[day] || []).map(id => customizationOptions.transfers.find(t => t.id === id)?.name).filter(Boolean).join(', ') || 'None'}
                        </div>
                        {day !== tripDuration.days && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <strong>Accommodation:</strong> {(perDayHotels[day] || []).map(hotelId => {
                              const hotel = mockHotels.find(h => h.id === hotelId);
                              if (!hotel) return null;
                              const roomTypeIndex = perDayRoomTypes[day]?.[hotelId] || 0;
                              const roomType = hotel.roomTypes?.[roomTypeIndex];
                              return `${hotel.name}${roomType ? ` (${roomType.name})` : ''}`;
                            }).filter(Boolean).join(', ') || 'None'}
                          </div>
                        )}
                        <div style={{ marginBottom: '0.5rem' }}>
                          <strong>Meals:</strong> {(perDayMeals[day] || []).map(id => customizationOptions.meals.find(m => m.id === id)?.name).filter(Boolean).join(', ') || 'None'}
                        </div>
                      </div>
                    ))}
                    <div style={{ borderTop: '1px solid #ccc', margin: '1rem 0' }} />
                    <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Activities (for entire trip)</h4>
                    <div>{selectedActivities.map(id => customizationOptions.activities.find(a => a.id === id)?.name).filter(Boolean).join(', ') || 'None'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: darkMode ? '#2d2d2d' : '#fff',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>Complete Your Booking</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                ×
              </button>
            </div>

            {/* Booking Steps */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              {[1, 2, 3].map((step) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: bookingStep >= step ? '#1976d2' : (darkMode ? '#444' : '#ddd'),
                    color: bookingStep >= step ? '#fff' : (darkMode ? '#fff' : '#333'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600
                  }}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div style={{
                      width: '50px',
                      height: '2px',
                      background: bookingStep > step ? '#1976d2' : (darkMode ? '#444' : '#ddd'),
                      margin: '0 0.5rem'
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Trip Details */}
            {bookingStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Trip Details</h3>
                <div style={{ background: darkMode ? '#3d3d3d' : '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Destination:</span>
                    <span style={{ fontWeight: 600 }}>{tripDetails.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Duration:</span>
                    <span style={{ fontWeight: 600 }}>{tripDuration.nights}N/{tripDuration.days}D</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Trip starts on:</span>
                    <span style={{ fontWeight: 600 }}>
                      {selectedStartDate ? selectedStartDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) : 'Select Date'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Trip End Date:</span>
                    <span style={{ fontWeight: 600 }}>
                      {tripEndDate 
                        ? tripEndDate.toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })
                        : 'Select start date first'
                      }
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Total Price:</span>
                    <span style={{ fontWeight: 600, color: '#1976d2' }}>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={nextBookingStep}
                  style={{
                    width: '100%',
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {bookingStep === 2 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Personal Details</h3>
                <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                      background: darkMode ? '#3d3d3d' : '#fff',
                      color: darkMode ? '#fff' : '#333'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                      background: darkMode ? '#3d3d3d' : '#fff',
                      color: darkMode ? '#fff' : '#333'
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                      background: darkMode ? '#3d3d3d' : '#fff',
                      color: darkMode ? '#fff' : '#333'
                    }}
                  />
                  <textarea
                    placeholder="Address"
                    value={userDetails.address}
                    onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                    rows={3}
                    style={{
                      padding: '0.8rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                      background: darkMode ? '#3d3d3d' : '#fff',
                      color: darkMode ? '#fff' : '#333',
                      resize: 'vertical'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={prevBookingStep}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: darkMode ? '#fff' : '#333',
                      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={nextBookingStep}
                    style={{
                      flex: 1,
                      background: '#1976d2',
                      color: '#fff',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {bookingStep === 3 && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem' }}>Payment</h3>
                <div style={{ background: darkMode ? '#3d3d3d' : '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Amount to Pay:</span>
                    <span style={{ fontWeight: 600, color: '#1976d2', fontSize: '1.2rem' }}>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Payment Methods</h4>
                  <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {['Credit/Debit Card', 'UPI', 'Net Banking', 'Wallet'].map((method) => (
                      <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input type="radio" name="payment" value={method} />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={prevBookingStep}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: darkMode ? '#fff' : '#333',
                      border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinalBooking}
                    style={{
                      flex: 1,
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Chat */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: '#9c27b0',
        color: '#fff',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(156, 39, 176, 0.4)',
        fontSize: '1.5rem',
        zIndex: 1000
      }}      >
        ?
      </div>

      {/* Image Gallery Modal - BRANDHUB Style */}
      {showImageModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            zIndex: 3000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
          onClick={() => setShowImageModal(false)}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 3rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '2px'
            }}>
              GALLERY
            </div>
            <button
              onClick={() => setShowImageModal(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '2rem',
                cursor: 'pointer',
                padding: '0.5rem',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              ×
            </button>
          </div>

          {/* Gallery Container */}
          <div
            style={{
              flex: 1,
              padding: '3rem',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Horizontal Scrolling Gallery */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '1rem 0',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            } as React.CSSProperties}>
              {tripDetails.images.map((image, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  style={{
                    flex: '0 0 400px',
                    height: '500px',
                    background: '#111',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedImageIndex === index ? '2px solid #fff' : '2px solid transparent',
                    transform: selectedImageIndex === index ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: selectedImageIndex === index 
                      ? '0 20px 40px rgba(255,255,255,0.1)' 
                      : '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedImageIndex !== index) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedImageIndex !== index) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                    }
                  }}
                >
                  {/* Image */}
                  <div style={{
                    height: '350px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={image}
                      alt={`${tripDetails.name} - Image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    {selectedImageIndex === index && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#000',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      } as React.CSSProperties}>
                        ✓
                      </div>
                    )}
                  </div>
                  
                  {/* Card Content */}
                  <div style={{
                    padding: '1.5rem',
                    height: '150px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{
                        color: '#fff',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        margin: '0 0 0.5rem 0',
                        letterSpacing: '1px'
                      }}>
                        {tripDetails.name.toUpperCase()}
                      </h3>
                      <p style={{
                        color: '#ccc',
                        fontSize: '0.9rem',
                        margin: 0,
                        letterSpacing: '0.5px'
                      }}>
                        IMAGE {index + 1} OF {tripDetails.images.length}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#fff',
                      fontSize: '0.8rem',
                      opacity: 0.7
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: selectedImageIndex === index ? '#fff' : '#666',
                        borderRadius: '50%',
                        transition: 'background 0.3s ease'
                      }} />
                      <span>VIEW DETAILS</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              marginTop: 'auto',
              padding: '2rem 0',
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                color: '#fff',
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '3px',
                lineHeight: 1
              }}>
                OUR GALLERY
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
} 