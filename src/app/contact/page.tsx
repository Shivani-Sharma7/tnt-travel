export const metadata = {
  title: "Contact Us | TnT Travels",
  description: "Contact TnT Travels for tour bookings, inquiries, and support. We're here to help you plan your next adventure!",
};

export default function Contact() {
  return (
    <main style={{padding:'2rem'}}>
      <h1>Contact Us</h1>
      <form style={{display:'flex',flexDirection:'column',gap:'1rem',maxWidth:'400px'}}>
        <input type="text" placeholder="Your Name" required style={{padding:'0.5rem',borderRadius:'4px',border:'1px solid #ccc'}} />
        <input type="email" placeholder="Your Email" required style={{padding:'0.5rem',borderRadius:'4px',border:'1px solid #ccc'}} />
        <textarea placeholder="Your Message" required style={{padding:'0.5rem',borderRadius:'4px',border:'1px solid #ccc'}} rows={4} />
        <button type="submit" style={{padding:'0.75rem',borderRadius:'4px',border:'none',background:'#0070f3',color:'#fff',fontWeight:'bold'}}>Send Message</button>
      </form>
    </main>
  );
} 