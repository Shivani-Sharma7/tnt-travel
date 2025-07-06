"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(120deg,#22313f 60%,#f29927 100%)',padding:'2vw'}}>
      <div style={{background:'#fff',padding:'2.5rem 2rem',borderRadius:'1.5rem',boxShadow:'0 4px 32px rgba(34,49,63,0.13)',maxWidth:380,width:'100%',display:'flex',flexDirection:'column',gap:'1.5rem'}}>
        <h2 style={{textAlign:'center',fontWeight:800,fontSize:'2rem',color:'#22313f',marginBottom:'0.5rem'}}>Login</h2>
        <form style={{display:'flex',flexDirection:'column',gap:'1.2rem'}} onSubmit={handleSubmit}>
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
          <button
            type="submit"
            disabled={loading}
            style={{padding:'0.9rem',borderRadius:'0.8rem',background:'#f29927',color:'#fff',fontWeight:700,fontSize:'1.1rem',border:'none',marginTop:'0.5rem',cursor:loading?'not-allowed':'pointer',boxShadow:'0 2px 8px #f2992740',opacity:loading?0.7:1}}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <div style={{color:'#d32f2f',textAlign:'center',fontWeight:600}}>{error}</div>}
        <div style={{textAlign:'center',marginTop:'0.5rem',fontSize:'1.05rem'}}>
          Don't have an account? <Link href="/signup" style={{color:'#f29927',fontWeight:600}}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 