'use client';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useCart } from '../../../../context/CartContext';
import SupportCall from '../../../../components/SupportCall';
import { useParams, useRouter } from 'next/navigation';

type CarType = 'Auto' | 'Sedan' | 'SUV' | 'Traveler';

const carTypeOptions: { label: CarType; desc: string; priceInfo: string }[] = [
  { label: 'Auto', desc: 'Budget 3-4 seater for city rides', priceInfo: 'From ₹1200/day' },
  { label: 'Sedan', desc: 'Comfortable 4 seater with AC', priceInfo: 'From ₹12/km' },
  { label: 'SUV', desc: 'Spacious 6-7 seater with AC', priceInfo: 'From ₹18/km' },
  { label: 'Traveler', desc: '11-21 seater for groups', priceInfo: 'From ₹25/km' },
];

type VehicleOption = {
  id: string;
  name: string;
  category: CarType;
  capacity: number; // total seats (including driver if that is the local convention; we will treat as passengers)
  priceText: string;
  icon: string;
};

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

const container: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e9e4df 0%, #f5f3ef 100%)',
  padding: '3vw 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const card: React.CSSProperties = {
  maxWidth: 1100,
  width: '95%',
  background: '#fff',
  borderRadius: '2rem',
  boxShadow: '0 8px 32px rgba(60,40,20,0.10)',
  padding: '2rem',
};

export default function TaxiTourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<CarType>('Sedan');
  const [numPersons, setNumPersons] = useState<number>(2);

  const placesById: Record<string, string[]> = useMemo(() => ({
    // Mathura/Vrindavan set
    '1': [
      'Krishna Janambhoomi', 'Gokul', 'Birla Mandir', 'Pagal Baba Mandir',
      'ISKCON Temple', 'Banke Bihari Temples', 'Vaishno Devi Temple', 'Nidhivan', 'Prem Mandir'
    ],
    '2': [
      'Krishna Janambhoomi', 'Gokul', 'Birla Mandir', 'Pagal Baba Mandir', 'ISKCON Temple',
      'Banke Bihari Temples', 'Vaishno Devi Temple', 'Nidhivan', 'Prem Mandir', 'Nandgaon', 'Barsana', 'Govardhan'
    ],
    '3': [
      'Krishna Janambhoomi','Gokul','Yamuna River','Raman Reti','Chinta Haran','Brahmand Ghat','Chaursi Khamba',
      'Birla Mandir','Pagal Baba Mandir','Kanch ka Mandir','Banke Bihari Mandir','ISKCON Temple','Prem Mandir',
      'Nidhivan','Nandgaon','Barsana','Kirti Mandir','Govardhan'
    ],
    '4': [
      'Krishna Janambhoomi','Gokul','Raman Reti','Birla Mandir','Pagal Baba Mandir','Kancha ka Mandir',
      'Banke Bihari Mandir','ISKCON Temple','Prem Mandir','Nidhivan','Nandgaon','Barsana','Kirti Mandir','Govardhan',
      'Taj Mahal','Agra Fort','Fatehpur Sikri'
    ],
    // Varanasi set
    '101': [
      'Dashashwamedh Ghat','Kashi Vishwanath Temple','Sarnath','Manikarnika Ghat','Assi Ghat','Tulsi Manas Temple',
      'Sankat Mochan Temple','Durga Temple','Bharat Mata Temple'
    ],
    '102': [
      'Dashashwamedh Ghat','Kashi Vishwanath Temple','Sarnath','Dhamek Stupa','Chaukhandi Stupa','Manikarnika Ghat',
      'Assi Ghat','Tulsi Manas Temple','Sankat Mochan Temple','Durga Temple','Bharat Mata Temple','Ganga Aarti'
    ],
    '103': [
      'Dashashwamedh Ghat','Kashi Vishwanath Temple','Sarnath','Manikarnika Ghat','Assi Ghat','Tulsi Manas Temple',
      'Sankat Mochan Temple','Durga Temple','Bharat Mata Temple','Dhamek Stupa','Chaukhandi Stupa','Ganga Aarti',
      'Morning Boat Ride','Evening Aarti','Temple Darshan','Ghat Exploration','Spiritual Ceremonies','Cultural Experience'
    ],
    '104': [
      'Dashashwamedh Ghat','Kashi Vishwanath Temple','Sarnath','Manikarnika Ghat','Assi Ghat','Tulsi Manas Temple',
      'Sankat Mochan Temple','Durga Temple','Bharat Mata Temple','Ayodhya Ram Mandir','Hanuman Garhi','Kanak Bhawan',
      'Nageshwarnath Temple','Ram Ki Paidi','Ganga Aarti','Ayodhya Darshan','Spiritual Ceremonies'
    ],
  }), []);

  const title = useMemo(() => {
    const map: Record<string, string> = {
      '1': 'Mathura Vrindavan 1 Day Tour Package',
      '2': 'Mathura Vrindavan Barsana 2 Day Trip',
      '3': 'Mathura Vrindavan 3 Day Taxi Package',
      '4': 'Mathura Vrindavan Agra 4 Day Tour',
      '101': 'Varanasi 1 Day Spiritual Tour',
      '102': 'Varanasi Sarnath 2 Day Trip',
      '103': 'Varanasi 3 Day Complete Package',
      '104': 'Varanasi Ayodhya 3 Day Trip Package',
    };
    return map[id] ?? 'Taxi Tour Details';
  }, [id]);

  const descriptionsById: Record<string, string> = useMemo(() => ({
    '1': 'Experience the divine essence of Mathura and Vrindavan in a comprehensive one-day tour. Visit sacred temples, historical sites, and immerse yourself in the spiritual atmosphere of Lord Krishna\'s birthplace.',
    '2': 'Embark on a comprehensive 2-day spiritual journey covering Mathura, Vrindavan, and Barsana. Experience the divine atmosphere of Radha Rani\'s birthplace and explore the sacred Braj region in depth.',
    '3': 'Embark on an immersive 3-day spiritual journey through the sacred Braj region. Experience the complete divine essence of Lord Krishna\'s birthplace, childhood places, and the most revered temples with our professional taxi service.',
    '4': 'Experience the perfect blend of spirituality and heritage across Mathura, Vrindavan and Agra. Discover the divine and historical treasures with comfortable transfers and curated stops.',
    '101': 'Experience the spiritual essence of Varanasi in a comprehensive one-day tour. Visit sacred ghats, ancient temples, and immerse yourself in the divine atmosphere of the holy city.',
    '102': 'Embark on a 2-day spiritual journey covering Varanasi and Sarnath. Experience the divine atmosphere of Shiva\'s city and the sacred Buddhist heritage sites.',
    '103': 'An immersive 3-day spiritual journey through Varanasi. Explore ancient ghats, revered temples, and the city\'s living traditions with our professional taxi service.',
    '104': 'Experience the perfect blend of spirituality and heritage from Varanasi to Ayodhya. Discover the spiritual treasures of India with comfortable transfers and curated stops.'
  }), []);

  const itineraryById: Record<string, { day: number; title: string; items: string[] }[]> = useMemo(() => ({
    '1': [
      { day: 1, title: 'Mathura & Vrindavan Highlights', items: ['Krishna Janmabhoomi', 'Gokul', 'Birla Mandir', 'Pagal Baba Mandir', 'Banke Bihari Mandir', 'ISKCON Temple', 'Prem Mandir (Evening Aarti)'] }
    ],
    '2': [
      { day: 1, title: 'Mathura & Vrindavan', items: ['Janmabhoomi', 'Gokul', 'Birla Mandir', 'Pagal Baba Mandir', 'Prem Mandir'] },
      { day: 2, title: 'Nandgaon & Barsana', items: ['Nandgaon', 'Barsana', 'Kirti Mandir', 'Govardhan Parikrama (time permitting)'] }
    ],
    '3': [
      { day: 1, title: 'Mathura Core', items: ['Janmabhoomi', 'Gokul', 'Yamuna River Ghats', 'Raman Reti'] },
      { day: 2, title: 'Vrindavan Temples', items: ['Banke Bihari Mandir', 'ISKCON Temple', 'Nidhivan', 'Prem Mandir'] },
      { day: 3, title: 'Braj Circuit', items: ['Barsana', 'Nandgaon', 'Kirti Mandir', 'Govardhan'] }
    ],
    '4': [
      { day: 1, title: 'Mathura & Vrindavan', items: ['Janmabhoomi', 'Raman Reti', 'Birla Mandir', 'Banke Bihari', 'ISKCON'] },
      { day: 2, title: 'Braj Circuit', items: ['Nidhivan', 'Nandgaon', 'Barsana', 'Kirti Mandir', 'Govardhan'] },
      { day: 3, title: 'Agra Heritage', items: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri'] }
    ],
    '101': [
      { day: 1, title: 'Varanasi Essentials', items: ['Dashashwamedh Ghat', 'Kashi Vishwanath Temple', 'Assi/Manikarnika Ghats', 'Ganga Aarti'] }
    ],
    '102': [
      { day: 1, title: 'Varanasi City', items: ['Dashashwamedh Ghat', 'Kashi Vishwanath', 'Ghats tour', 'Ganga Aarti'] },
      { day: 2, title: 'Sarnath Heritage', items: ['Dhamek Stupa', 'Chaukhandi Stupa', 'Sarnath Museum (time permitting)'] }
    ],
    '103': [
      { day: 1, title: 'Ghats & Temples', items: ['Morning Boat Ride', 'Dashashwamedh Ghat', 'Kashi Vishwanath'] },
      { day: 2, title: 'Sarnath & Culture', items: ['Sarnath (Stupas/Museum)', 'Cultural Experiences'] },
      { day: 3, title: 'Deep Dive', items: ['Temple Darshan', 'Ghat Exploration', 'Evening Aarti'] }
    ],
    '104': [
      { day: 1, title: 'Varanasi Core', items: ['Dashashwamedh/Assi Ghats', 'Kashi Vishwanath', 'Ganga Aarti'] },
      { day: 2, title: 'Ayodhya Darshan', items: ['Ayodhya Ram Mandir', 'Hanuman Garhi', 'Kanak Bhawan', 'Ram Ki Paidi'] },
      { day: 3, title: 'Varanasi Return', items: ['Bharat Mata Temple', 'Sankat Mochan', 'Tulsi Manas Temple'] }
    ]
  }), []);

  const durationDays = useMemo(() => {
    const map: Record<string, number> = {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '101': 1,
      '102': 2,
      '103': 3,
      '104': 3,
    };
    return map[id] ?? 1;
  }, [id]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [todayIso, setTodayIso] = useState<string>('');
  const [maxStartIso, setMaxStartIso] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [calMonth, setCalMonth] = useState<number>(new Date().getMonth());
  const [calYear, setCalYear] = useState<number>(new Date().getFullYear());
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropLocation, setDropLocation] = useState<string>('');

  // Location options based on tour type
  const locationOptions = useMemo(() => {
    if (id.startsWith('1') || id.startsWith('2') || id.startsWith('3') || id.startsWith('4')) {
      // Mathura/Vrindavan tours
      return [
        'Mathura Junction Railway Station',
        'Mathura Bus Stand',
        'Vrindavan Bus Stand',
        'Krishna Janmabhoomi',
        'ISKCON Temple, Vrindavan',
        'Prem Mandir, Vrindavan',
        'Hotel pickup (Mathura)',
        'Hotel pickup (Vrindavan)',
        'Airport pickup (Delhi)',
        'Custom location'
      ];
    } else {
      // Varanasi tours
      return [
        'Varanasi Junction Railway Station',
        'Varanasi Bus Stand',
        'Lal Bahadur Shastri Airport',
        'Dashashwamedh Ghat',
        'Kashi Vishwanath Temple',
        'Assi Ghat',
        'Hotel pickup (Varanasi)',
        'Custom location'
      ];
    }
  }, [id]);

  const displayStart = useMemo(() => {
    if (!startDate) return 'Select date';
    try {
      const d = new Date(`${startDate}T00:00:00`);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return startDate;
    }
  }, [startDate]);
  const displayEnd = useMemo(() => {
    if (!startDate) return '';
    const start = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(start.getTime())) return '';
    const end = new Date(start);
    end.setDate(end.getDate() + Math.max(1, durationDays) - 1);
    return end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }, [startDate, durationDays]);
  useEffect(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;
    setTodayIso(iso);
    setStartDate(iso);

    const max = new Date(d);
    max.setFullYear(max.getFullYear() + 1);
    const maxIso = `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, '0')}-${String(max.getDate()).padStart(2, '0')}`;
    setMaxStartIso(maxIso);
  }, []);

  // Calendar helpers
  const minDateObj = useMemo(() => (todayIso ? new Date(`${todayIso}T00:00:00`) : null), [todayIso]);
  const maxDateObj = useMemo(() => (maxStartIso ? new Date(`${maxStartIso}T00:00:00`) : null), [maxStartIso]);
  const selectedDateObj = useMemo(() => (startDate ? new Date(`${startDate}T00:00:00`) : null), [startDate]);
  const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const isDisabledDate = (d: Date) => {
    if (minDateObj && d < minDateObj) return true;
    if (maxDateObj && d > maxDateObj) return true;
    return false;
  };
  const endDate = useMemo(() => {
    const start = new Date(startDate);
    if (Number.isNaN(start.getTime())) return '';
    const end = new Date(start);
    end.setDate(end.getDate() + Math.max(1, durationDays) - 1);
    const yyyy = end.getFullYear();
    const mm = String(end.getMonth() + 1).padStart(2, '0');
    const dd = String(end.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, [startDate, durationDays]);

  const matchingVehicles = useMemo(() => {
    return vehicleInventory.filter(v => v.category === selectedCategory && v.capacity >= numPersons);
  }, [selectedCategory, numPersons]);

  const suggestedCategories = useMemo(() => {
    const categories: CarType[] = ['Auto','Sedan','SUV','Traveler'];
    return categories.filter(cat =>
      vehicleInventory.some(v => v.category === cat && v.capacity >= numPersons)
    );
  }, [numPersons]);

  return (
    <main style={container}>
      {!mounted && (
        <div style={card}>
          <div style={{ padding: '2rem', textAlign: 'center', color: '#556' }}>Loading...</div>
        </div>
      )}
      {mounted && (
      <div style={card}>
        

        <h1 style={{ margin: '2rem 0 0.5rem 0',width:'1500px', fontSize: '2rem', fontWeight: 800, color: '#1a2a3a' }}>{title}</h1>
        <div style={{ color: '#556', marginBottom: '1.5rem' }}>{descriptionsById[id] ?? 'Curated itinerary covering popular temples, ghats, and heritage points with professional driver and flexible timing.'}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
          {/* Details */}
          <div>
            

            

            {itineraryById[id] && itineraryById[id].length > 0 && (
              <div style={{ marginTop: '1rem', background: '#f9f6f2', borderRadius: '1rem', padding: '1rem 1.2rem', border: '1px solid #eee' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#7A6B57' }}>Detailed Itinerary</h3>
                <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
                  {itineraryById[id].map((d) => (
                    <div key={d.day} style={{ background: '#fff', borderRadius: 12, padding: '0.8rem 1rem', border: '1px solid #eee' }}>
                      <div style={{ fontWeight: 800, color: '#1a2a3a', marginBottom: 6 }}>Day {d.day} • {d.title}</div>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#444' }}>
                        {d.items.map((it, idx) => (<li key={idx} style={{ lineHeight: 1.5 }}>{it}</li>))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* 24/7 Support + Pre-ride Info (moved below itinerary) */}
                <div style={{ marginTop: '3rem', background: '#f9f6f2', borderRadius: '1rem', padding: '1rem 1.2rem', border: '1px solid #eee', color: '#1a2a3a', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 900, marginBottom: 6 }}>24/7 Support</div>
                      <div style={{ color: '#556', lineHeight: 1.6 }}>
                        You will receive taxi and driver details 2 hours before pickup. We are available around the clock for any help.
                      </div>
                    </div>
                    <div style={{ position: 'relative', width: 36, height: 36 }}>
                      {/* Reuse call button */}
                      <SupportCall />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dates + Car Type Selector */}
          <div>
            {/* Travel Dates */}
            <div style={{ marginBottom: '1rem', background: '#f9f6f2', borderRadius: '1rem', padding: '1rem 1.2rem', border: '1px solid #eee', color: '#1a2a3a' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#7A6B57' }}>Travel Date</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ color: '#556', fontWeight: 700, marginBottom: 6 }}>Start date</div>
                  <button
                    type="button"
                    onClick={() => {
                      // init calendar with current selected or today
                      const base = selectedDateObj ?? (todayIso ? new Date(`${todayIso}T00:00:00`) : new Date());
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
                      <span>{displayStart}</span>
                    </span>
                    <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Change</span>
                  </button>
                  <input
                    type="date"
                    min={todayIso || undefined}
                    max={maxStartIso || undefined}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    ref={startInputRef}
                    style={{ position: 'absolute', left: -9999, opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                  />
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
                            const isSelected = selectedDateObj && d.toDateString() === selectedDateObj.toDateString();
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
                <div style={{ position: 'relative' }}>
                  <div style={{ color: '#556', fontWeight: 700, marginBottom: 6 }}>End date</div>
                  <div
                    aria-label="End date"
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      border: '1.5px solid #ddd',
                      padding: '0.65rem 0.9rem',
                      fontWeight: 800,
                      color: '#1a2a3a',
                      background: 'linear-gradient(180deg, #ffffff, #f7f7f7)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span aria-hidden="true" style={{ fontSize: '1rem' }}>📅</span>
                      <span>{displayEnd}</span>
                    </span>
                    <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Auto</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 8, color: '#7A6B57', fontWeight: 800 }}>{durationDays} {durationDays === 1 ? 'Day' : 'Days'} tour</div>
            </div>

            {/* Pickup & Drop Locations */}
            <div style={{ marginBottom: '1rem', background: '#f9f6f2', borderRadius: '1rem', padding: '1rem 1.2rem', border: '1px solid #eee', color: '#1a2a3a' }}>

              
                <div>
                  <div style={{ color: '#7A6B57', fontSize: '1rem',fontWeight: 700, marginBottom: 6 }}>Pickup Location</div>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      border: '1.5px solid #ddd',
                      padding: '0.65rem 0.9rem',
                      fontWeight: 600,
                      color: '#1a2a3a',
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select pickup location</option>
                    {locationOptions.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                  <div>
                  <div style={{ color: '#7A6B57', fontSize: '1rem',fontWeight: 700,marginTop: '.5rem', marginBottom: 6 }}>Drop Location</div>
                  <select
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      border: '1.5px solid #ddd',
                      padding: '0.65rem 0.9rem',
                      fontWeight: 600,
                      color: '#1a2a3a',
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select drop location</option>
                    {locationOptions.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              
            </div>

            <div style={{ background: '#1a2a3a', borderRadius: '1rem', padding: '1rem 1.2rem', color: '#fff' }}>
              <div style={{ fontWeight: 800, marginBottom: 10 }}>Choose Car Category & Guests</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {carTypeOptions.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedCategory(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '2px solid',
                      borderColor: selectedCategory === opt.label ? '#e2b89b' : 'rgba(255,255,255,0.15)',
                      background: selectedCategory === opt.label ? 'rgba(226,184,155,0.15)' : 'rgba(255,255,255,0.06)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}
                  >
                    <span>{opt.label}</span>
                    <span style={{ color: '#8ba3b3', fontWeight: 600, fontSize: '0.92rem' }}>{opt.desc}</span>
                    
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                <span style={{ color: '#8ba3b3', fontWeight: 700 }}>Guests</span>
                <button onClick={() => setNumPersons(Math.max(1, numPersons - 1))} style={{ background: '#2a3a4a', color: '#fff', border: 'none', padding: '0.3rem 1.5rem', borderRadius: 8, cursor: 'pointer' }}>-</button>
                <input
                  type="number"
                  min={1}
                  value={numPersons}
                  onChange={(e) => setNumPersons(Math.max(1, Number(e.target.value) || 1))}
                  style={{ width: 180, textAlign: 'center', fontWeight: 800, borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '0.3rem 0.4rem' }}
                />
                <button onClick={() => setNumPersons(numPersons + 1)} style={{ background: '#2a3a4a', color: '#fff', border: 'none', padding: '0.3rem 1.5rem', borderRadius: 8, cursor: 'pointer' }}>+</button>
              </div>
            </div>

            <div style={{ marginTop: '1rem', background: '#f9f6f2', borderRadius: '1rem', padding: '1rem 1.2rem', border: '1px solid #eee', color: '#1a2a3a' }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Available Cars</div>
              <div style={{ color: '#556', fontSize: '0.92rem', marginBottom: 10 }}>Showing {selectedCategory} options for {numPersons} {numPersons === 1 ? 'guest' : 'guests'}.</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {matchingVehicles.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    role="button"
                    aria-pressed={selectedVehicleId === v.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                      background: selectedVehicleId === v.id ? 'rgba(226,184,155,0.15)' : '#fff',
                      borderRadius: 12, padding: '0.8rem 1rem',
                      border: selectedVehicleId === v.id ? '2px solidrgb(128, 128, 128)' : '1px solid #eee',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease, background 0.2s ease'
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.4rem' }}>{v.icon}</span>
                      <div>
                        <div style={{ fontWeight: 800 }}>{v.name}</div>
                        <div style={{ color: '#556', fontSize: '0.92rem' }}>Up to {v.capacity} guests</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#7A6B57', fontWeight: 800 }}>{v.priceText}</span>
                      <span aria-hidden="true" style={{
                        width: 18, height: 18, borderRadius: '50%',
                        border: selectedVehicleId === v.id ? '6px solid #1a2a3a' : '2px solid #bbb',
                        boxSizing: 'border-box'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              {matchingVehicles.length === 0 && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ color: '#a55', fontWeight: 700, marginBottom: 8 }}>No cars in {selectedCategory} fit {numPersons} guests on this root.</div>
                  <div style={{ color: '#556', marginBottom: 6, fontWeight: 700 }}>Try a suitable category:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {suggestedCategories.filter(cat => cat !== selectedCategory).map(cat => (
                      <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 999, fontWeight: 800, cursor: 'pointer' }}>{cat}</button>
                    ))}
                  </div>
                </div>
              )}
              <button
                style={{
                  marginTop: 12, width: '100%', padding: '0.9rem 1rem', border: 'none', borderRadius: 12,
                  background: selectedVehicleId ? '#2a3a4a' : '#cfcfcf',
                  color: selectedVehicleId ? '#fff' : '#777', fontWeight: 800, cursor: selectedVehicleId ? 'pointer' : 'not-allowed',
                  boxShadow: selectedVehicleId ? '0 6px 18px rgba(48, 72, 112, 0.35)' : 'none'
                }}
                disabled={!selectedVehicleId}
                onClick={() => {
                  if (!selectedVehicleId) return;
                  const v = matchingVehicles.find(m => m.id === selectedVehicleId);
                  if (!v) return;
                  const priceMatch = v.priceText.match(/\d+/);
                  const price = priceMatch ? Number(priceMatch[0]) : 0;
                  const createdItem = {
                    id: `taxi-${id}-${v.id}-${startDate}`,
                    type: 'taxi' as const,
                    name: `${title} • ${v.name}`,
                    price,
                    image: '/activity/taxi.jpg',
                    details: {
                      tripDate: startDate,
                      tripEndDate: displayEnd,
                      passengers: numPersons,
                      transportation: v.name,
                      pickupLocation: pickupLocation || 'To be confirmed',
                      dropLocation: dropLocation || 'To be confirmed',
                    },
                  };
                  addToCart(createdItem);
                  router.push('/cart');
                }}
              >
                Book Now
              </button>
            </div>

            
            
          </div>
        </div>
      </div>
      )}
    </main>
  );
}


