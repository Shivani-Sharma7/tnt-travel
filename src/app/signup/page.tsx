"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

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
          firstName, 
          lastName, 
          email, 
          phone, 
          address, 
          city, 
          state, 
          pincode, 
          password 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      setSuccess("You have successfully created an account!");
      setTimeout(() => router.push("/login"), 1800);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(120deg,#22313f 60%,#f29927 100%)',padding:'2vw'}}>
      <div style={{background:'#fff',padding:'2.5rem 2rem',borderRadius:'1.5rem',boxShadow:'0 4px 32px rgba(34,49,63,0.13)',maxWidth:500,width:'100%',display:'flex',flexDirection:'column',gap:'1.5rem'}}>
        <h2 style={{textAlign:'center',fontWeight:800,fontSize:'2rem',color:'#22313f',marginBottom:'0.5rem'}}>Create Account</h2>
        <p style={{textAlign:'center',color:'#666',fontSize:'1rem',marginBottom:'1rem'}}>Join us for amazing travel experiences</p>
        
        <form style={{display:'flex',flexDirection:'column',gap:'1.2rem'}} onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <input 
              type="text" 
              placeholder="First Name *" 
              required 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)} 
              style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
            />
            <input 
              type="text" 
              placeholder="Last Name *" 
              required 
              value={lastName} 
              onChange={e => setLastName(e.target.value)} 
              style={{padding:'0.9rem 1rem',borderRadius:'0.8rem',border:'1.5px solid #e6e6e6',fontSize:'1rem'}} 
            />
          </div>

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
            {loading ? "Creating Account..." : "Create Account"}
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
          Already have an account? <Link href="/login" style={{color:'#f29927',fontWeight:600}}>Login</Link>
        </div>
      </div>
    </div>
  );
} 