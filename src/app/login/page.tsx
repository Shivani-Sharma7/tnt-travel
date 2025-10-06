"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Add CSS for placeholder styling
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      input::placeholder {
        color: rgba(255, 255, 255, 0.7) !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrMobile, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Store user/session here
      localStorage.setItem("tnt_user", JSON.stringify(data.user));
      alert(`Welcome, ${data.user.name}!`);
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       background: 'url("/elements/bg.jpg") center/cover',
        position: 'relative',
        padding: '2rem'
      }}>
        {/* Blurred Background Image for Loading */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/elements/bg.jpg")',
          zIndex: -1
        }} />
        
        {/* Additional Background Overlay for Loading */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1
        }} />
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '2rem',
          padding: '3rem 2.5rem',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}>
          <div style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            fontWeight: 500
          }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'url("/elements/bg.jpg") center/cover',
      position: 'relative',
      padding: '2rem'
    }}>
      {/* Blurred Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("/elements/bg.jpg") center/cover',
        filter: 'blur(1px)',
        zIndex: -1
      }} />
      
      {/* Additional Background Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
        zIndex: -1
      }} />
      
      {/* Glassmorphism Login Card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        border: '3px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '2rem',
        padding: '3rem 2.5rem',
        maxWidth: '520px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            marginBottom: '0.5rem'
          }}>
            Login
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            fontWeight: 400
          }}>
            Welcome back please login to your account
          </p>
        </div>

        {/* Form */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem',color: '#ffffff' }} onSubmit={handleSubmit}>
          {/* Username Field */}
          <div style={{ position: 'relative',color: '#ffffff' }}>
            <input
              type="text"
                placeholder="Email or Mobile Number"
                
              required
              value={emailOrMobile}
              onChange={e => setEmailOrMobile(e.target.value)}
              suppressHydrationWarning
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                paddingRight: '3rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            <div style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.2rem'
            }}>
              👤
            </div>
          </div>

          {/* Password Field */}
          <div style={{ position: 'relative' }}>
          <input
              type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
              suppressHydrationWarning
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                paddingRight: '3rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              suppressHydrationWarning
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Remember Me */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              suppressHydrationWarning
              style={{
                width: '18px',
                height: '18px',
                accentColor: '#4ade80',
                cursor: 'pointer'
              }}
            />
            <label htmlFor="remember" style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '1rem',
              background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1.1rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(74, 222, 128, 0.3)';
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div style={{
            color: '#ff6b6b',
            textAlign: 'center',
            fontWeight: 600,
            marginTop: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        {/* Sign Up Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{
            color: '#ffffff',
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
          }}
          >
            Signup
          </Link>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          Created by <span style={{ fontWeight: 600 }}>TNT Travel</span>
        </div>
      </div>
    </div>
  );
} 