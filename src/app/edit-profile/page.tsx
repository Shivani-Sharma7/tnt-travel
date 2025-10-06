'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const ICON_OPTIONS = [
  '/elements/logo.png',
  '/elements/airplain.png',
  '/elements/boaticon.webp',
  '/elements/googlelogo.png',
  '/activity/mathura.png',
  '/activity/taxi.jpg',
];

export default function EditProfilePage() {
  const [user, setUser] = useState<{ name: string; email?: string; mobile?: string; address?: string; icon?: string } | null>(null);
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tnt_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setMobile(parsed.mobile || '');
        setAddress(parsed.address || '');
        setIcon(parsed.icon || ICON_OPTIONS[0]);
      }
    }
  }, []);

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, mobile, address, icon };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tnt_user', JSON.stringify(updatedUser));
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  if (!user) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Please log in to edit your profile.</div>;
  }

  return (
    <div style={{ maxWidth: 500, margin: '3rem auto', background: '#fff', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#7A6B57', marginBottom: '2rem', textAlign: 'center' }}>Edit Profile</h2>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <Image src={icon} alt="Profile Icon" width={80} height={80} style={{ borderRadius: '50%', background: '#f9f6f3', border: '2px solid #E2B89B' }} />
        <div style={{ marginTop: 12, fontWeight: 600, color: '#7A6B57' }}>Choose Profile Icon:</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
          {ICON_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setIcon(opt)}
              style={{
                border: icon === opt ? '2px solid #f29927' : '2px solid #E2B89B',
                borderRadius: '50%',
                padding: 2,
                background: '#fff',
                cursor: 'pointer',
                outline: icon === opt ? '2px solid #f29927' : 'none',
                transition: 'border 0.2s, outline 0.2s',
              }}
              aria-label="Choose profile icon"
            >
              <Image src={opt} alt="icon" width={40} height={40} style={{ borderRadius: '50%' }} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 600, color: '#7A6B57', display: 'block', marginBottom: 6 }}>Full Name</label>
        <input value={user.name} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #E2B89B', background: '#f9f6f3', color: '#7A6B57', fontWeight: 600 }} />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 600, color: '#7A6B57', display: 'block', marginBottom: 6 }}>Email</label>
        <input value={user.email || ''} disabled style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #E2B89B', background: '#f9f6f3', color: '#7A6B57', fontWeight: 600 }} />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 600, color: '#7A6B57', display: 'block', marginBottom: 6 }}>Mobile Number</label>
        <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Enter mobile number" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #E2B89B', color: '#7A6B57' }} />
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontWeight: 600, color: '#7A6B57', display: 'block', marginBottom: 6 }}>Address</label>
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address" style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #E2B89B', color: '#7A6B57' }} />
      </div>
      <button onClick={handleSave} style={{ width: '100%', padding: '1rem', borderRadius: '0.8rem', background: 'linear-gradient(90deg,#A67B5B 80%,#D8CAB8 20%)', color: '#fff', fontWeight: 700, border: 'none', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '1rem' }}>Save Changes</button>
      {success && <div style={{ color: '#27ae60', textAlign: 'center', fontWeight: 600 }}>Profile updated successfully!</div>}
    </div>
  );
} 