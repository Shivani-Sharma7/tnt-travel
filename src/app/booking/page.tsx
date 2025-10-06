'use client';

import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Memoized Calendar Grid Component for performance
const CalendarGrid = React.memo(({ 
  calYear, 
  calMonth, 
  daysInMonth, 
  toIso, 
  isDisabledDate, 
  selectedDateObj, 
  onDateSelect 
}: {
  calYear: number;
  calMonth: number;
  daysInMonth: (y: number, m: number) => number;
  toIso: (d: Date) => string;
  isDisabledDate: (d: Date) => boolean;
  selectedDateObj: Date | null;
  onDateSelect: (iso: string) => void;
}) => {
  const calendarCells = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const total = daysInMonth(calYear, calMonth);
    const cells: React.ReactNode[] = [];
    
    // Add empty cells for first week padding
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`e${i}`} />);
    }
    
    // Add date cells
    for (let day = 1; day <= total; day++) {
      const d = new Date(calYear, calMonth, day);
      const iso = toIso(d);
      const disabled = isDisabledDate(d);
      const isSelected = selectedDateObj && d.toDateString() === selectedDateObj.toDateString();
      
      cells.push(
        <button
          key={iso}
          disabled={disabled}
          onClick={() => onDateSelect(iso)}
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
    
    return cells;
  }, [calYear, calMonth, daysInMonth, toIso, isDisabledDate, selectedDateObj, onDateSelect]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, gridAutoRows: '48px', minHeight: 328 }}>
      {calendarCells}
    </div>
  );
});

const BookingDetailsPage = React.memo(() => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items, addToCart } = useCart();

  const itemId = searchParams.get('id') || '';
  const cartItem = useMemo(() => items.find(i => i.id === itemId), [items, itemId]);

  const [form, setForm] = useState({
    pickupDate: '',
    pickupTime: '',
    numberOfDays: 1,
    pickupAddress: '',
    destinationAddress: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  // Calendar state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [todayIso, setTodayIso] = useState('');
  const [maxStartIso, setMaxStartIso] = useState('');
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  // Time picker state
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [timeInputRef] = useState(useRef<HTMLInputElement | null>(null));
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('AM');

  // Number picker state
  const [isNumberPickerOpen, setIsNumberPickerOpen] = useState(false);
  const numberInputRef = useRef<HTMLInputElement | null>(null);

  // Address picker states
  const [isPickupAddressOpen, setIsPickupAddressOpen] = useState(false);
  const [isDestinationAddressOpen, setIsDestinationAddressOpen] = useState(false);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const pickupAddressInputRef = useRef<HTMLInputElement | null>(null);
  const destinationAddressInputRef = useRef<HTMLInputElement | null>(null);

  const update = useCallback((key: keyof typeof form, value: any) => setForm(prev => ({ ...prev, [key]: value })), []);

  // Calendar helpers - memoized for performance
  const minDateObj = useMemo(() => (todayIso ? new Date(`${todayIso}T00:00:00`) : null), [todayIso]);
  const maxDateObj = useMemo(() => (maxStartIso ? new Date(`${maxStartIso}T00:00:00`) : null), [maxStartIso]);
  const selectedDateObj = useMemo(() => (form.pickupDate ? new Date(`${form.pickupDate}T00:00:00`) : null), [form.pickupDate]);
  
  // Memoize expensive calendar functions
  const toIso = useMemo(() => (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`, []);
  const daysInMonth = useMemo(() => (y: number, m: number) => new Date(y, m + 1, 0).getDate(), []);
  const isDisabledDate = useMemo(() => (d: Date) => {
    if (minDateObj && d < minDateObj) return true;
    if (maxDateObj && d > maxDateObj) return true;
    return false;
  }, [minDateObj, maxDateObj]);

  const displayStart = useMemo(() => {
    if (!form.pickupDate) return 'Select date';
    try {
      const d = new Date(`${form.pickupDate}T00:00:00`);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return form.pickupDate;
    }
  }, [form.pickupDate]);

  const displayTime = useMemo(() => {
    if (!form.pickupTime) return 'Select time';
    return form.pickupTime;
  }, [form.pickupTime]);

  const displayNumber = useMemo(() => {
    return `${form.numberOfDays} ${form.numberOfDays === 1 ? 'Day' : 'Days'}`;
  }, [form.numberOfDays]);

  const displayPickupAddress = useMemo(() => {
    if (!form.pickupAddress) return 'Enter pickup address';
    return form.pickupAddress;
  }, [form.pickupAddress]);

  const displayDestinationAddress = useMemo(() => {
    if (!form.destinationAddress) return 'Enter destination address';
    return form.destinationAddress;
  }, [form.destinationAddress]);

  const handleTimeConfirm = useCallback(() => {
    let hours = selectedHour;
    if (selectedPeriod === 'PM' && selectedHour !== 12) {
      hours += 12;
    } else if (selectedPeriod === 'AM' && selectedHour === 12) {
      hours = 0;
    }
    const timeString = `${String(hours).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`;
    update('pickupTime', timeString);
    setIsTimePickerOpen(false);
  }, [selectedHour, selectedMinute, selectedPeriod, update]);

  // Move preset times outside component to prevent recreation
  const presetTimes = useMemo(() => [
    { label: '6:00 AM', hour: 6, minute: 0, period: 'AM' as const },
    { label: '8:00 AM', hour: 8, minute: 0, period: 'AM' as const },
    { label: '10:00 AM', hour: 10, minute: 0, period: 'AM' as const },
    { label: '12:00 PM', hour: 12, minute: 0, period: 'PM' as const },
    { label: '2:00 PM', hour: 2, minute: 0, period: 'PM' as const },
    { label: '4:00 PM', hour: 4, minute: 0, period: 'PM' as const },
    { label: '6:00 PM', hour: 6, minute: 0, period: 'PM' as const },
    { label: '8:00 PM', hour: 8, minute: 0, period: 'PM' as const },
  ], []);

  const handlePresetTime = useCallback((hour: number, minute: number, period: 'AM' | 'PM') => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(period);
  }, []);

  const handleBookNow = useCallback(() => {
    // Check if all required fields are filled
    if (!form.pickupDate || !form.pickupTime || !form.pickupAddress || !form.destinationAddress) {
      alert('Please fill all required fields before booking');
      return;
    }

    // Ensure cartItem exists
    if (!cartItem) {
      alert('No item selected for booking');
      return;
    }

    // Create a new cart item with the updated details
    const updatedCartItem = {
      ...cartItem,
      details: {
        ...cartItem.details,
        tripDate: form.pickupDate,
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
        numberOfDays: form.numberOfDays,
        pickupLocation: form.pickupAddress,
        dropLocation: form.destinationAddress,
        isRoundTrip: isRoundTrip,
      }
    };

    // Add to cart
    addToCart(updatedCartItem);
    
    // Redirect to cart page
    router.push('/cart');
  }, [form, cartItem, addToCart, router, isRoundTrip]);

  const handleCalendarOpen = useCallback(() => {
    const base = selectedDateObj ?? (todayIso ? new Date(`${todayIso}T00:00:00`) : new Date());
    setCalMonth(base.getMonth());
    setCalYear(base.getFullYear());
    setIsCalendarOpen(true);
  }, [selectedDateObj, todayIso]);

  const handlePreviousMonth = useCallback(() => {
    let m = calMonth - 1;
    let y = calYear;
    if (m < 0) { m = 11; y -= 1; }
    setCalMonth(m); 
    setCalYear(y);
  }, [calMonth, calYear]);

  const handleNextMonth = useCallback(() => {
    let m = calMonth + 1;
    let y = calYear;
    if (m > 11) { m = 0; y += 1; }
    setCalMonth(m); 
    setCalYear(y);
  }, [calMonth, calYear]);

  const handleDateSelect = useCallback((iso: string) => {
    update('pickupDate', iso);
    setIsCalendarOpen(false);
  }, [update]);

  // Move styles outside component to prevent recreation
  const commonButtonStyle = useMemo(() => ({
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
  }), []);

  const commonHoverEffects = useMemo(() => ({
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)';
      e.currentTarget.style.borderColor = '#e2b89b';
      e.currentTarget.style.transform = 'translateY(-1px)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
      e.currentTarget.style.borderColor = '#ddd';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }), []);

  useEffect(() => {
    if (!cartItem) return;
    setForm(prev => ({
      ...prev,
      pickupDate: cartItem.details.tripDate || cartItem.details.pickupDate || prev.pickupDate,
      pickupTime: cartItem.details.pickupTime || prev.pickupTime,
      pickupAddress: cartItem.details.pickupLocation || prev.pickupAddress,
      destinationAddress: cartItem.details.dropLocation || prev.destinationAddress,
    }));
  }, [cartItem]);

  // Initialize time picker when form.pickupTime changes
  useEffect(() => {
    if (form.pickupTime) {
      const [hours, minutes] = form.pickupTime.split(':').map(Number);
      if (hours === 0) {
        setSelectedHour(12);
        setSelectedPeriod('AM');
      } else if (hours === 12) {
        setSelectedHour(12);
        setSelectedPeriod('PM');
      } else if (hours > 12) {
        setSelectedHour(hours - 12);
        setSelectedPeriod('PM');
      } else {
        setSelectedHour(hours);
        setSelectedPeriod('AM');
      }
      setSelectedMinute(minutes);
    }
  }, [form.pickupTime]);

  // Initialize date constraints
  useEffect(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;
    setTodayIso(iso);
    if (!form.pickupDate) setForm(prev => ({ ...prev, pickupDate: iso }));

    const max = new Date(d);
    max.setFullYear(max.getFullYear() + 1);
    const maxIso = `${max.getFullYear()}-${String(max.getMonth() + 1).padStart(2, '0')}-${String(max.getDate()).padStart(2, '0')}`;
    setMaxStartIso(maxIso);
    
    // Set loading to false after initialization
    setIsLoading(false);
  }, []);

  // Now check conditions after all hooks are called
  if (!itemId) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>No booking selected</div>
          <div style={{ color: '#555' }}>Please go back and select a service to book.</div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => router.back()} style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Go Back</button>
          </div>
        </div>
      </main>
    );
  }

  if (!cartItem) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Booking not found</div>
          <div style={{ color: '#555' }}>We couldn't find the selected item. It may have been removed.</div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => router.back()} style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Go Back</button>
          </div>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Loading...</div>
          <div style={{ color: '#555' }}>Please wait while we prepare your booking details.</div>
        </div>
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission removed - users can only select time and fill details
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e9e4df 0%, #f5f3ef 100%)',
      padding: '3vw 0',
      display: 'flex',
      flexDirection: 'column',
      margin:'2 auto 0rem 0',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1100,
        width: '95%',
        background: '#fff',
        marginTop: '2rem',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px rgba(60,40,20,0.10)',
        padding: '2rem',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#1a2a3a' }}>Trip Details</h1>
            <div style={{ color: '#556', marginTop: 6 }}>Provide your trip details to confirm booking.</div>
            <div style={{ color: '#7A6B57', marginTop: 4, fontSize: '0.9rem' }}>Fields marked with * are required</div>

            <div style={{ marginTop: '1.5rem', display: 'grid', gap: '0.9rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#7A6B57', marginBottom: 6 }}>Pickup Date *</div>
                  <button
                    type="button"
                    onClick={handleCalendarOpen}
                    style={commonButtonStyle}
                    {...commonHoverEffects}
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
                    value={form.pickupDate}
                    onChange={(e) => update('pickupDate', e.target.value)}
                    ref={dateInputRef}
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
                            onClick={handlePreviousMonth}
                            style={{ background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', color: '#1a2a3a', transition: 'color 0.2s ease, transform 0.15s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#e2b89b'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = '#1a2a3a'; e.currentTarget.style.transform = 'scale(1)'; }}
                            aria-label="Previous month"
                          >
                            ‹
                          </button>
                          <div style={{ fontWeight: 800 }}>{new Date(calYear, calMonth, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>
                          <button
                            onClick={handleNextMonth}
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
                           <CalendarGrid 
                             calYear={calYear}
                             calMonth={calMonth}
                             daysInMonth={daysInMonth}
                             toIso={toIso}
                             isDisabledDate={isDisabledDate}
                             selectedDateObj={selectedDateObj}
                             onDateSelect={handleDateSelect}
                           />
                         </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                          <button onClick={() => setIsCalendarOpen(false)} style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 8, fontWeight: 800, cursor: 'pointer' }}>Close</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#7A6B57', marginBottom: 6 }}>Pickup Time *</div>
                  <button
                    type="button"
                    onClick={() => setIsTimePickerOpen(true)}
                    style={commonButtonStyle}
                    {...commonHoverEffects}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span aria-hidden="true" style={{ fontSize: '1rem' }}>⏰</span>
                      <span>{displayTime}</span>
                    </span>
                    <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Change</span>
                  </button>
                  <input
                    type="time"
                    value={form.pickupTime}
                    onChange={(e) => update('pickupTime', e.target.value)}
                    ref={timeInputRef}
                    style={{ position: 'absolute', left: -9999, opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                  />
                  {isTimePickerOpen && (
                    <div
                      onClick={() => setIsTimePickerOpen(false)}
                      style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000,
                        backdropFilter: 'blur(2px)'
                      }}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 14px 40px rgba(0,0,0,0.18)', minWidth: 400 }}
                      >
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                          <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#1a2a3a', marginBottom: 16 }}>Select Time</div>
                          
                          {/* Preset Times */}
                          <div style={{ marginBottom: 20 }}>
                            <div style={{ fontSize: '0.9rem', color: '#7A6B57', marginBottom: 8, fontWeight: 600 }}>Quick Select</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                              {presetTimes.map((preset, index) => (
                                <button
                                  key={index}
                                  onClick={() => handlePresetTime(preset.hour, preset.minute, preset.period)}
                                  style={{
                                    padding: '0.5rem 0.3rem',
                                    border: '1px solid #e2b89b',
                                    borderRadius: 8,
                                    background: selectedHour === preset.hour && selectedMinute === preset.minute && selectedPeriod === preset.period ? '#e2b89b' : '#fff',
                                    color: selectedHour === preset.hour && selectedMinute === preset.minute && selectedPeriod === preset.period ? '#1a2a3a' : '#7A6B57',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!(selectedHour === preset.hour && selectedMinute === preset.minute && selectedPeriod === preset.period)) {
                                      e.currentTarget.style.background = '#f0f0f0';
                                      e.currentTarget.style.borderColor = '#d4a574';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!(selectedHour === preset.hour && selectedMinute === preset.minute && selectedPeriod === preset.period)) {
                                      e.currentTarget.style.background = '#fff';
                                      e.currentTarget.style.borderColor = '#e2b89b';
                                    }
                                  }}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Custom Time Picker */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
                            {/* Hour Picker */}
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '0.9rem', color: '#7A6B57', marginBottom: 4, fontWeight: 600 }}>Hour</div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <button
                                  onClick={() => setSelectedHour(prev => prev === 12 ? 1 : prev + 1)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid #e2b89b',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    color: '#1a2a3a',
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  ▲
                                </button>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a2a3a', minWidth: 40, textAlign: 'center' }}>
                                  {selectedHour}
                                </div>
                                <button
                                  onClick={() => setSelectedHour(prev => prev === 1 ? 12 : prev - 1)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid #e2b89b',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    color: '#1a2a3a',
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  ▼
                                </button>
                              </div>
                            </div>

                            {/* Minute Picker */}
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '0.9rem', color: '#7A6B57', marginBottom: 4, fontWeight: 600 }}>Minute</div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <button
                                  onClick={() => setSelectedMinute(prev => prev === 55 ? 0 : prev + 5)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid #e2b89b',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    color: '#1a2a3a',
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  ▲
                                </button>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a2a3a', minWidth: 40, textAlign: 'center' }}>
                                  {String(selectedMinute).padStart(2, '0')}
                                </div>
                                <button
                                  onClick={() => setSelectedMinute(prev => prev === 0 ? 55 : prev - 5)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    border: '1px solid #e2b89b',
                                    borderRadius: '50%',
                                    background: '#fff',
                                    color: '#1a2a3a',
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  ▼
                                </button>
                              </div>
                            </div>

                            {/* AM/PM Picker */}
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ fontSize: '0.9rem', color: '#7A6B57', marginBottom: 4, fontWeight: 600 }}>Period</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <button
                                  onClick={() => setSelectedPeriod('AM')}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: '1px solid #e2b89b',
                                    borderRadius: 8,
                                    background: selectedPeriod === 'AM' ? '#e2b89b' : '#fff',
                                    color: selectedPeriod === 'AM' ? '#1a2a3a' : '#7A6B57',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    minWidth: 40
                                  }}
                                >
                                  AM
                                </button>
                                <button
                                  onClick={() => setSelectedPeriod('PM')}
                                  style={{
                                    padding: '0.4rem 0.8rem',
                                    border: '1px solid #e2b89b',
                                    borderRadius: 8,
                                    background: selectedPeriod === 'PM' ? '#e2b89b' : '#fff',
                                    color: selectedPeriod === 'PM' ? '#1a2a3a' : '#7A6B57',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    minWidth: 40
                                  }}
                                >
                                  PM
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Selected Time Display */}
                          <div style={{ 
                            background: '#f9f6f2', 
                            padding: '1rem', 
                            borderRadius: 12, 
                            border: '1px solid #e2b89b',
                            marginBottom: 20
                          }}>
                            <div style={{ fontSize: '0.9rem', color: '#7A6B57', marginBottom: 4, fontWeight: 600 }}>Selected Time</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1a2a3a' }}>
                              {selectedHour}:{String(selectedMinute).padStart(2, '0')} {selectedPeriod}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                          <button
                            onClick={handleTimeConfirm}
                            style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setIsTimePickerOpen(false)}
                            style={{ background: '#fff', color: '#7A6B57', border: '2px solid #7A6B57', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#7A6B57', marginBottom: 6 }}>Number of Days</div>
                <button
                  type="button"
                  onClick={() => setIsNumberPickerOpen(true)}
                  style={commonButtonStyle}
                  {...commonHoverEffects}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span aria-hidden="true" style={{ fontSize: '1rem' }}>📅</span>
                    <span>{displayNumber}</span>
                  </span>
                  <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Change</span>
                </button>
                <input
                  type="number"
                  min={1}
                  value={form.numberOfDays}
                  onChange={(e) => update('numberOfDays', Number(e.target.value) || 1)}
                  ref={numberInputRef}
                  style={{ position: 'absolute', left: -9999, opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                />
                {isNumberPickerOpen && (
                  <div
                    onClick={() => setIsNumberPickerOpen(false)}
                    style={{
                      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000,
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 14px 40px rgba(0,0,0,0.18)', minWidth: 300 }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a2a3a', marginBottom: 16 }}>Select Number of Days</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
                          <button
                            onClick={() => update('numberOfDays', Math.max(1, form.numberOfDays - 1))}
                            style={{ background: '#e2b89b', color: '#1a2a3a', border: 'none', width: 40, height: 40, borderRadius: '50%', fontSize: '1.5rem', fontWeight: 800, cursor: 'pointer' }}
                          >
                            -
                          </button>
                          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1a2a3a', minWidth: 60, textAlign: 'center' }}>
                            {form.numberOfDays}
                          </div>
                          <button
                            onClick={() => update('numberOfDays', form.numberOfDays + 1)}
                            style={{ background: '#e2b89b', color: '#1a2a3a', border: 'none', width: 40, height: 40, borderRadius: '50%', fontSize: '1.5rem', fontWeight: 800, cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button
                          onClick={() => setIsNumberPickerOpen(false)}
                          style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setIsNumberPickerOpen(false)}
                          style={{ background: '#fff', color: '#7A6B57', border: '2px solid #7A6B57', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#7A6B57', marginBottom: 6 }}>Pickup Address *</div>
                <button
                  type="button"
                  onClick={() => setIsPickupAddressOpen(true)}
                  style={commonButtonStyle}
                  {...commonHoverEffects}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span aria-hidden="true" style={{ fontSize: '1rem' }}>📍</span>
                    <span style={{ textAlign: 'left', flex: 1 }}>{displayPickupAddress}</span>
                  </span>
                  <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Change</span>
                </button>
                <input
                  value={form.pickupAddress}
                  onChange={(e) => update('pickupAddress', e.target.value)}
                  placeholder="Enter pickup address"
                  ref={pickupAddressInputRef}
                  style={{ position: 'absolute', left: -9999, opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                />
                {isPickupAddressOpen && (
                  <div
                    onClick={() => setIsPickupAddressOpen(false)}
                    style={{
                      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000,
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 14px 40px rgba(0,0,0,0.18)', minWidth: 400 }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a2a3a', marginBottom: 16 }}>Enter Pickup Address</div>
                        <input
                          value={form.pickupAddress}
                          onChange={(e) => update('pickupAddress', e.target.value)}
                          placeholder="Enter pickup address"
                          style={{
                            width: '100%',
                            fontSize: '1rem',
                            padding: '0.8rem',
                            border: '2px solid #e2b89b',
                            borderRadius: 12,
                            textAlign: 'left'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button
                          onClick={() => setIsPickupAddressOpen(false)}
                          style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setIsPickupAddressOpen(false)}
                          style={{ background: '#fff', color: '#7A6B57', border: '2px solid #7A6B57', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#7A6B57', marginBottom: 6 }}>Destination Address *</div>
                <button
                  type="button"
                  onClick={() => setIsDestinationAddressOpen(true)}
                  style={commonButtonStyle}
                  {...commonHoverEffects}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span aria-hidden="true" style={{ fontSize: '1rem' }}>🎯</span>
                    <span style={{ textAlign: 'left', flex: 1 }}>{displayDestinationAddress}</span>
                  </span>
                  <span aria-hidden="true" style={{ fontSize: '0.9rem', color: '#8ba3b3', fontWeight: 700 }}>Change</span>
                </button>
                <input
                  value={form.destinationAddress}
                  onChange={(e) => update('destinationAddress', e.target.value)}
                  placeholder="Enter destination address"
                  ref={destinationAddressInputRef}
                  style={{ position: 'absolute', left: -9999, opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                />
                {isDestinationAddressOpen && (
                  <div
                    onClick={() => setIsDestinationAddressOpen(false)}
                    style={{
                      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000,
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 14px 40px rgba(0,0,0,0.18)', minWidth: 400 }}
                    >
                      <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1a2a3a', marginBottom: 16 }}>Enter Destination Address</div>
                        <input
                          value={form.destinationAddress}
                          onChange={(e) => update('destinationAddress', e.target.value)}
                          placeholder="Enter destination address"
                          style={{
                            width: '100%',
                            fontSize: '1rem',
                            padding: '0.8rem',
                            border: '2px solid #e2b89b',
                            borderRadius: 12,
                            textAlign: 'left'
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                        <button
                          onClick={() => setIsDestinationAddressOpen(false)}
                          style={{ background: '#1a2a3a', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setIsDestinationAddressOpen(false)}
                          style={{ background: '#fff', color: '#7A6B57', border: '2px solid #7A6B57', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#7A6B57', marginBottom: 6 }}>Round Trip</div>
                <button
                  type="button"
                  onClick={() => setIsRoundTrip(!isRoundTrip)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1.2rem',
                    borderRadius: 12,
                    border: '2px solid #e2b89b',
                    background: isRoundTrip ? '#e2b89b' : '#fff',
                    color: isRoundTrip ? '#1a2a3a' : '#7A6B57',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span aria-hidden="true" style={{ fontSize: '1rem' }}>
                    {isRoundTrip ? '🔄' : '➡️'}
                  </span>
                  <span>{isRoundTrip ? 'Round Trip Selected' : 'One Way Trip'}</span>
                </button>
                <div style={{ fontSize: '0.85rem', color: '#7A6B57', marginTop: 6, textAlign: 'center' }}>
                  {isRoundTrip ? 'Return to pickup location after destination' : 'Direct journey to destination'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => router.back()} style={{ padding: '0.8rem 1.2rem', borderRadius: 12, border: '2px solid #7A6B57', background: '#fff', color: '#7A6B57', fontWeight: 800, cursor: 'pointer' }}>Go Back</button>
                <button type="button" onClick={handleBookNow} style={{ padding: '0.8rem 1.2rem', borderRadius: 12, border: 'none', background: '#1a2a3a', color: '#fff', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 18px rgba(48, 72, 112, 0.35)' }}>Book Now</button>
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: '#f9f6f2', borderRadius: '1rem', padding: '1rem 1.2rem', border: '1px solid #eee' }}>
              <div style={{ fontWeight: 800, marginBottom: 6, color: '#7A6B57' }}>Selected Item</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <img src={cartItem.image} alt={cartItem.name} style={{ width: 96, height: 72, objectFit: 'cover', borderRadius: 8 }} />
                <div>
                  <div style={{ fontWeight: 800 }}>{cartItem.name}</div>
                  <div style={{ color: '#556', fontSize: '0.95rem' }}>₹{cartItem.price.toLocaleString()}</div>
                  {cartItem.type === 'taxi' && cartItem.details.transportation && (
                    <div style={{ color: '#777', fontSize: '0.9rem', marginTop: 4 }}>
                      {cartItem.details.transportation} • {cartItem.details.pickupLocation || 'Pickup TBD'} → {cartItem.details.dropLocation || 'Drop TBD'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
         </main>
   );
 });

export default BookingDetailsPage;