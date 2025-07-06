export default function AnimatedImage() {
  return (
    <div style={{flex:'0 0 400px',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
      <div style={{position:'absolute',width:'400px',height:'400px',borderRadius:'50%',background:'rgba(255,153,0,0.08)',zIndex:0}}></div>
      <img 
        src="/activity/about us.png" 
        alt="About Us" 
        style={{
          width:'360px',
          height:'380px',
          zIndex:1,
          position:'relative',
          borderRadius:'1rem'
        }}
      />
    </div>
  );
} 