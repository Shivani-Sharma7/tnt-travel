"use client";
import { useState, useEffect } from "react";

const carouselItems = [
  { type: "video", src: "/gallary/c01dd2c36e88bbe3f75855930126b1ba.mp4", alt: "Travel Video 1" },
  { type: "image", src: "/activity/yamuna.jpg", alt: "Travel Image 1" },
  { type: "video", src: "/gallary/a0feb3fe182875ac3b916bbcb88ebd44_720w.mp4", alt: "Travel Video 2" },
  { type: "image", src: "/activity/heroo1.jpg", alt: "Travel Image 2" },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [mounted]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % carouselItems.length
    );
  };

  const handleVideoError = () => {
    console.log("Video failed to load, falling back to image");
    setVideoError(true);
  };

  if (!mounted) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/activity/ghat.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
      }} />
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: -1,
    }}>
      {/* Carousel Items */}
      {carouselItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {item.type === 'video' && !videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              onError={handleVideoError}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <source src={item.src} type="video/mp4" />
              {/* Fallback to image if video fails */}
              <img
                src="/activity/ghat.jpg"
                alt="Fallback"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </video>
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                console.log(`Image failed to load: ${item.src}`);
                e.currentTarget.src = '/activity/ghat.jpg';
              }}
            />
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: '#fff',
          zIndex: 10,
          transition: 'background 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
      >
        ‹
      </button>

      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: '#fff',
          zIndex: 10,
          transition: 'background 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 10,
      }}>
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)',
        zIndex: 0,
      }} />
    </div>
  );
} 