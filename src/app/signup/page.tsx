"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
      input::placeholder, textarea::placeholder {
        color: rgba(0, 0, 0, 0.6) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }


    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          mobile, 
          password,
          role
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setSuccess("You have successfully created an account!");
      setTimeout(() => router.push("/login"), 1800);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
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
        background: '#CFC9BB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: '#CFC9BB',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '420px',
        }}>
          <div style={{ color: '#2d5a27', fontSize: '1.2rem', fontWeight: 500 }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'url("/elements/bg.jpg") center/cover',
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '1.4rem auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column - Signup Form */}
        <div style={{ padding: '0 0' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 800,
            color: '#CFC9BB',
            margin: 0,
            marginBottom: '2rem',
            letterSpacing: '-0.02em'
          }}>
            SIGNUP
          </h1>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#CFC9BB',
                marginBottom: '0.1rem'
              }}>
                Full name
              </label>
              <input
                type="text"
                
                required
                value={name}
                onChange={e => setName(e.target.value)}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  padding: '0.3rem 0',
                  border: 'none',
                  borderBottom: '2px solid #cfc9bb',
                  background: 'transparent',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#2d5a27';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = '#4a4a4a';
                }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#CFC9BB',
                marginBottom: '0.1rem'
              }}>
                Email address
              </label>
              <input
                type="email"
                
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  padding: '0.3rem 0',
                  border: 'none',
                  borderBottom: '2px solid #cfc9bb',
                  background: 'transparent',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#2d5a27';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = '#4a4a4a';
                }}
              />
            </div>

            {/* Mobile Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#CFC9BB',
                marginBottom: '0.1rem'
              }}>
                Mobile number
              </label>
              <input
                type="tel"
                
                required
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  padding: '0.3rem 0',
                  border: 'none',
                  borderBottom: '2px solid #cfc9bb',
                  background: 'transparent',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#2d5a27';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = '#4a4a4a';
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#CFC9BB',
                marginBottom: '0.1rem'
              }}>
                Password
              </label>
              <input
                type="password"
                
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                suppressHydrationWarning
                style={{
                  width: '100%',
                  
                  border: 'none',
                  borderBottom: '2px solid #cfc9bb',
                  background: 'transparent',
                  fontSize: '2rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#2d5a27';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = '#4a4a4a';
                }}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: 500,
                color: '#CFC9BB',
                marginBottom: '0.1rem'
              }}>
                Confirm password
              </label>
              <input
                type="password"
                
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                suppressHydrationWarning
                style={{
                  width: '100%',
                 
                  border: 'none',
                  borderBottom: '2px solid #cfc9bb',
                  background: 'transparent',
                  fontSize: '2rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#2d5a27';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = '#4a4a4a';
                }}
              />
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              style={{
                width: '100%',
                padding: '1rem 2rem',
                borderRadius: '2rem',
                background: '#11190C',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                marginTop: '1rem'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#11292C';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#11190C';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? "Creating Account..." : "Submit"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#d32f2f',
              textAlign: 'center',
              fontWeight: 600,
              marginTop: '1rem',
              padding: '0.8rem',
              background: '#ffebee',
              borderRadius: '0.5rem',
              border: '1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{
              color: '#388e3c',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1.1rem',
              marginTop: '1rem',
              padding: '0.8rem',
              background: '#e8f5e8',
              borderRadius: '0.5rem',
              border: '1px solid #c8e6c9'
            }}>
              {success}
            </div>
          )}

          {/* Login Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '1rem',
            color: '#CFC9BB'  
          }}>
            Already have an account?{' '}
            <Link href="/login" style={{
              color: '#CFC9BB',
              fontWeight: 600,
              textDecoration: 'none',
              borderBottom: '1px solidrgb(16, 45, 13)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = '#2d5a27';
            }}
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Column - Contact Information Card */}
        <div style={{
          background: 'url("/elements/bg.jpg") center/cover',
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative',
          margin: 'auto 0',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          
        }}>
          {/* Role Selection - Top Section */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <label style={{
              display: 'block',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Select your role (Optional)
            </label>
            <div style={{
              display: 'flex',
              gap: '0.8rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              {['Traveler', 'Explorer', 'Devotee'].map((roleOption) => (
                <button
                  key={roleOption}
                  type="button"
                  onClick={() => setRole(roleOption)}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '2rem',
                    background: role === roleOption ? '#2d5a27' : 'rgba(255,255,255,0.1)',
                    color: '#ffffff',
                    border: role === roleOption ? '2px solid #2d5a27' : '1px solid rgba(255,255,255,0.3)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    minWidth: '100px'
                  }}
                  onMouseEnter={(e) => {
                    if (role !== roleOption) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (role !== roleOption) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    }
                  }}
                >
                  {roleOption}
                </button>
              ))}
            </div>
          </div>
          {/* Card Header */}
          <div style={{
            background: '#11190C',
            padding: '2rem',
            textAlign: 'center',
            position: 'relative',
            margin: '.6rem .6rem .6rem .6rem',
            borderRadius: '1rem',
          }}>
            {/* Decorative dots */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              width: '8px',
              height: '8px',
              background: '#ffd700',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '8px',
              height: '8px',
              background: '#ffd700',
              borderRadius: '50%'
            }} />
            
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 700,
              margin: 0,
              marginBottom: '0.5rem',
              
            }}>
              Get in touch with us!
            </h2>
            <p style={{
              color: '#ffffff',
              fontSize: '1rem',
              margin: 0,
              opacity: 0.9
            }}>
              Let's talk!
            </p>
          </div>

          {/* Card Body */}
          <div style={{
            padding: '2rem',
            background: 'rgba(207, 201, 187, 0.1)'
            
          }}>
            {/* Email */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 'bold' }}>@</span>
              </div>
              <span style={{ color: '#ffffff', fontSize: '1rem' }}>Info@tnttravel.com</span>
            </div>

            {/* Phone */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#ffffff', fontSize: '1.3rem' }}>📞</span>
              </div>
              <span style={{ color: '#ffffff', fontSize: '1rem' }}>+91 9876543210</span>
            </div>

            {/* Social Media 1 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 'bold' }}>@</span>
              </div>
              <span style={{ color: '#ffffff', fontSize: '1rem' }}>@tnttravel</span>
            </div>

            {/* Social Media 2 */}
            <div style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                flexShrink: 0
              }}>
                <span style={{ color: '#ffffff', fontSize: '1.3rem' }}>📱</span>
              </div>
              <span style={{ color: '#ffffff', fontSize: '1rem' }}>@tnttravel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}