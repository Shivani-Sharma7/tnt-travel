"use client";
import { useState } from 'react';
import Link from 'next/link';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginPopup({ isOpen, onClose, onLoginSuccess }: LoginPopupProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLoginMode) {
        // Login logic
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            emailOrMobile: formData.email, 
            password: formData.password 
          }),
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Login failed");
        
        // Store user data
        localStorage.setItem("tnt_user", JSON.stringify({ name: data.user?.name || formData.email }));
        onLoginSuccess();
        onClose();
      } else {
        // Signup logic
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }

        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            mobile: formData.phone,
            password: formData.password,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }),
        });
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Signup failed");
        
        // Auto-login after signup
        localStorage.setItem("tnt_user", JSON.stringify({ name: data.user?.name || formData.firstName }));
        onLoginSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '2rem'
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#22313f',
            marginBottom: '0.5rem'
          }}>
            {isLoginMode ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1rem'
          }}>
            {isLoginMode 
              ? 'Please login to add items to your cart' 
              : 'Join us for amazing travel experiences'
            }
          </p>
        </div>

        {/* Toggle Buttons */}
        <div style={{
          display: 'flex',
          background: '#f5f5f5',
          borderRadius: '1rem',
          padding: '0.3rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setIsLoginMode(true)}
            style={{
              flex: 1,
              padding: '0.8rem',
              borderRadius: '0.7rem',
              border: 'none',
              background: isLoginMode ? '#f29927' : 'transparent',
              color: isLoginMode ? '#fff' : '#666',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            style={{
              flex: 1,
              padding: '0.8rem',
              borderRadius: '0.7rem',
              border: 'none',
              background: !isLoginMode ? '#f29927' : 'transparent',
              color: !isLoginMode ? '#fff' : '#666',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {!isLoginMode && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="First Name *"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: '0.8rem',
                    border: '1.5px solid #e6e6e6',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: '0.8rem',
                    border: '1.5px solid #e6e6e6',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                pattern="[0-9]{10,15}"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '0.8rem',
                  border: '1.5px solid #e6e6e6',
                  fontSize: '1rem'
                }}
              />
              <textarea
                placeholder="Full Address *"
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '0.8rem',
                  border: '1.5px solid #e6e6e6',
                  fontSize: '1rem',
                  minHeight: '80px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="City *"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: '0.8rem',
                    border: '1.5px solid #e6e6e6',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="State *"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                  style={{
                    padding: '0.9rem 1rem',
                    borderRadius: '0.8rem',
                    border: '1.5px solid #e6e6e6',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Pincode *"
                required
                pattern="[0-9]{6}"
                value={formData.pincode}
                onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '0.8rem',
                  border: '1.5px solid #e6e6e6',
                  fontSize: '1rem'
                }}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            style={{
              padding: '0.9rem 1rem',
              borderRadius: '0.8rem',
              border: '1.5px solid #e6e6e6',
              fontSize: '1rem'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Password *"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '0.8rem',
                border: '1.5px solid #e6e6e6',
                fontSize: '1rem'
              }}
            />
            {!isLoginMode && (
              <input
                type="password"
                placeholder="Confirm Password *"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                style={{
                  padding: '0.9rem 1rem',
                  borderRadius: '0.8rem',
                  border: '1.5px solid #e6e6e6',
                  fontSize: '1rem'
                }}
              />
            )}
          </div>

          {error && (
            <div style={{
              color: '#d32f2f',
              textAlign: 'center',
              fontWeight: 600,
              padding: '0.8rem',
              background: '#ffebee',
              borderRadius: '0.5rem',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem',
              borderRadius: '0.8rem',
              background: 'linear-gradient(90deg,#f29927 60%,#e67e22 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.1rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading 
              ? (isLoginMode ? 'Logging in...' : 'Creating Account...') 
              : (isLoginMode ? 'Login' : 'Create Account')
            }
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e0e0e0'
        }}>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              style={{
                background: 'none',
                border: 'none',
                color: '#f29927',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {isLoginMode ? 'Sign up here' : 'Login here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 