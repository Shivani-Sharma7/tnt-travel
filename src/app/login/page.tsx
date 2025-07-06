"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Check query parameter to set initial tab
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      if (tab === 'signup') {
        setIsLogin(false);
      } else if (tab === 'login') {
        setIsLogin(true);
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!isLogin) {
      // Validation for signup
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
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const body = isLogin 
        ? { emailOrMobile, password }
        : { 
            fullName, 
            email, 
            phone, 
            address, 
            city, 
            state, 
            pincode, 
            password 
          };
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (isLogin ? "Login failed" : "Signup failed"));
      
      if (isLogin) {
        // Store user/session here
        localStorage.setItem("tnt_user", JSON.stringify(data.user));
        alert(`Welcome, ${data.user.name}!`);
        router.push("/");
      } else {
        setSuccess("You have successfully created an account!");
        setTimeout(() => setIsLogin(true), 1800);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : (isLogin ? "Login failed" : "Signup failed");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'flex-start',justifyContent:'flex-end',padding:'8vw 12vw',position:'relative',overflow:'hidden'}}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={(e) => console.error('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/gallary/c01dd2c36e88bbe3f75855930126b1ba.mp4" type="video/mp4" />
        <source src="/gallary/8fd6ece89fcd44078ba3df0fcfa0f4d9.mp4" type="video/mp4" />
        <source src="/gallary/767f11e02b2e6787809c473b2b30fd51.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Fallback background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/gallary/arti.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2,
      }}></div>
      
      {/* Overlay for better readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.4)',
        zIndex: 0,
      }}></div>
                      <div style={{background:'#fff',padding:isLogin ? '3rem 2rem' : '2rem 2rem',borderRadius:'1.5rem',boxShadow:'0 4px 32px rgba(34,49,63,0.13)',maxWidth:isLogin ? 380 : 650,width:'100%',display:'flex',flexDirection:'column',gap:isLogin ? '1.5rem' : '1rem',position:'relative',zIndex:1}}>
          {/* Toggle Buttons */}
          <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem'}}>
            <button
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.8rem',
                borderRadius: '0.8rem',
                background: isLogin ? '#f29927' : '#f5f5f5',
                color: isLogin ? '#fff' : '#666',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.8rem',
                borderRadius: '0.8rem',
                background: !isLogin ? '#f29927' : '#f5f5f5',
                color: !isLogin ? '#fff' : '#666',
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Sign Up
            </button>
          </div>

          {isLogin && (
            <h2 style={{textAlign:'center',fontWeight:800,fontSize:'1.8rem',color:'#22313f',marginBottom:'0.5rem'}}>
              Welcome Back!
            </h2>
          )}
          
          <form style={{display:'flex',flexDirection:'column',gap:isLogin ? '1.2rem' : '0.8rem'}} onSubmit={handleSubmit}>
            {isLogin ? (
              // Login Form
              <>
                <input
                  type="text"
                  placeholder="Email or Mobile Number"
                  required
                  value={emailOrMobile}
                  onChange={e => setEmailOrMobile(e.target.value)}
                  style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1.1rem'}}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1.1rem'}}
                />
              </>
            ) : (
              // Signup Form
              <>
                <p style={{textAlign:'center',color:'#666',fontSize:'1rem',marginBottom:'0.5rem'}}>Join us for amazing travel experiences</p>
                
                {/* Personal Information */}
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  required 
                  value={fullName} 
                  onChange={e => setFullName(e.target.value)} 
                  style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                />

                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                />

                <input 
                  type="tel" 
                  placeholder="Phone Number *" 
                  required 
                  pattern="[0-9]{10,15}" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                />

                {/* Address Information */}
                <textarea 
                  placeholder="Full Address *" 
                  required 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  style={{
                    padding:'0.9rem 1rem',
                    borderRadius:'0.8rem',
                    border:'1.5px solid #e6e6e6',
                    fontSize:'1rem',
                    minHeight:'80px',
                    resize:'vertical',
                    fontFamily:'inherit'
                  }} 
                />

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  <input 
                    type="text" 
                    placeholder="City *" 
                    required 
                    value={city} 
                    onChange={e => setCity(e.target.value)} 
                    style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                  />
                  <input 
                    type="text" 
                    placeholder="State *" 
                    required 
                    value={state} 
                    onChange={e => setState(e.target.value)} 
                    style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                  />
                </div>

                <input 
                  type="text" 
                  placeholder="Pincode *" 
                  required 
                  pattern="[0-9]{6}" 
                  value={pincode} 
                  onChange={e => setPincode(e.target.value)} 
                  style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                />

                {/* Password Information */}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
                  <input 
                    type="password" 
                    placeholder="Password *" 
                    required 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                  />
                  <input 
                    type="password" 
                    placeholder="Confirm Password *" 
                    required 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
                  />
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={loading}
              style={{
                padding:'1rem',
                borderRadius:'0.8rem',
                background:'linear-gradient(90deg,#f29927 60%,#e67e22 100%)',
                color:'#fff',
                fontWeight:700,
                fontSize:'1.1rem',
                border:'none',
                marginTop:'0.5rem',
                cursor:loading?'not-allowed':'pointer',
                boxShadow:'0 2px 8px #f2992740',
                opacity:loading?0.7:1,
                transition:'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {loading ? (isLogin ? "Logging in..." : "Creating Account...") : (isLogin ? "Login" : "Create Account")}
            </button>
          </form>
          
          {error && (
            <div style={{
              color:'#d32f2f',
              textAlign:'center',
              fontWeight:600,
              padding:'0.8rem',
              background:'#ffebee',
              borderRadius:'0.5rem',
              border:'1px solid #ffcdd2'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              color:'#388e3c',
              textAlign:'center',
              fontWeight:700,
              fontSize:'1.1rem',
              padding:'0.8rem',
              background:'#e8f5e8',
              borderRadius:'0.5rem',
              border:'1px solid #c8e6c9'
            }}>
              {success}
            </div>
          )}
          
          <div style={{textAlign:'center',marginTop:'0.5rem',fontSize:'1.05rem'}}>
            {isLogin ? (
              <>Don&apos;t have an account? <button onClick={() => setIsLogin(false)} style={{color:'#f29927',fontWeight:600,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Sign Up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setIsLogin(true)} style={{color:'#f29927',fontWeight:600,background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Login</button></>
            )}
          </div>
        </div>
    </div>
  );
} 