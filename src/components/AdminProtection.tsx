"use client";
import { useState, useEffect } from 'react';

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Admin password - you can change this to whatever you want
  // For better security, you can set this in your environment variables as NEXT_PUBLIC_ADMIN_PASSWORD
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'tnt-admin-2024';

  useEffect(() => {
    // Check if admin is already authenticated in this session
    const adminAuth = sessionStorage.getItem('tnt_admin_auth');
    if (adminAuth === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('tnt_admin_auth', 'authenticated');
      setPassword('');
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tnt_admin_auth');
    setPassword('');
    setError('');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fdf6f3'
      }}>
        <div style={{ fontSize: '1.2rem', color: '#7A6B57' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #7A6B57 0%, #E2B89B 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '2rem',
          padding: '3rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          {/* Lock Icon */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            color: '#7A6B57'
          }}>
            🔒
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#7A6B57',
            marginBottom: '0.5rem'
          }}>
            Admin Access Required
          </h1>

          <p style={{
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Enter the admin password to access the analytics dashboard
          </p>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #E2B89B',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#7A6B57';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E2B89B';
              }}
              autoFocus
            />

            <button
              type="submit"
              disabled={!password}
              style={{
                width: '100%',
                padding: '1rem',
                background: password ? 'linear-gradient(135deg, #f29927 0%, #e88a1a 100%)' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '1rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: password ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                marginBottom: '1rem'
              }}
              onMouseEnter={(e) => {
                if (password) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(242, 153, 39, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              🔓 Access Dashboard
            </button>
          </form>

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '1rem',
              borderRadius: '1rem',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              border: '1px solid #ffcdd2'
            }}>
              ❌ {error}
            </div>
          )}

          {/* Security Note */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '1rem',
            fontSize: '0.8rem',
            color: '#666',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#7A6B57' }}>
              🛡️ Security Notice
            </div>
            This page contains sensitive visitor analytics data. Only authorized administrators should have access.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Logout Button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#7A6B57',
            border: '2px solid #7A6B57',
            borderRadius: '2rem',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#7A6B57';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.color = '#7A6B57';
          }}
        >
          🚪 Admin Logout
        </button>
      </div>

      {/* Admin Badge */}
      

      {children}
    </div>
  );
}
