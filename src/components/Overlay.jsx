import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Overlay = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleNoHover = () => {
    // Keep button visible by constraining to a safe zone
    // Button dimensions: roughly 150px wide, 60px tall
    const buttonWidth = 150;
    const buttonHeight = 60;
    const padding = 20;
    
    // Calculate safe movement range
    const maxX = (window.innerWidth / 2) - buttonWidth - padding;
    const maxY = (window.innerHeight / 2) - buttonHeight - padding;
    
    // Random position within safe bounds
    const x = (Math.random() * 2 - 1) * Math.max(maxX, 50);
    const y = (Math.random() * 2 - 1) * Math.max(maxY, 50);

    setNoButtonPosition({ x, y });
  };

  const handleYesClick = () => {
    setAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
    // Fire more confetti
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ffb6c1']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ffb6c1']
      });
  
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    if (audioRef.current) {
        audioRef.current.volume = 1.0;
        if (!isPlaying) {
            audioRef.current.play().catch(e => console.log("Audio play failed", e));
            setIsPlaying(true);
        }
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Try to play music on first interaction if possible, or just let user toggle
  useEffect(() => {
    const handleFirstClick = () => {
        if (audioRef.current && !isPlaying) {
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
        window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []); // Only run once

  if (accepted) {
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', color: '#ff4d6d', fontFamily: 'Cursive, sans-serif',
        zIndex: 10
      }}>
        <h1 style={{ 
            fontSize: 'clamp(3rem, 10vw, 6rem)', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            textAlign: 'center',
            padding: '1rem',
            animation: 'pulse 2s infinite'
        }}>
            I love you babe, Date tayo mamaya kasama nido ! ❤️
        </h1>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'white' }}>Happy Valentine's Day!</p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 10
    }}>
        <audio ref={audioRef} loop src="/music.mp3" />
        
        {/* Music Toggle */}
        <div style={{ pointerEvents: 'auto', position: 'absolute', top: '20px', right: '20px' }}>
            <button 
                onClick={toggleMusic}
                style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    backdropFilter: 'blur(5px)'
                }}
            >
                {isPlaying ? '🔊' : '🔇'}
            </button>
        </div>

      <h1 style={{ 
        color: '#ff4d6d', 
        fontSize: 'clamp(2rem, 5vw, 4rem)', 
        fontFamily: 'Cursive, sans-serif',
        marginBottom: '2rem',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        padding: '0 1rem'
      }}>
        Will you be my Valentine?
      </h1>
      <div style={{ display: 'flex', gap: '2rem', pointerEvents: 'auto', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleYesClick}
          style={{
            padding: '1rem 3rem',
            fontSize: '1.5rem',
            backgroundColor: '#ff4d6d',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          Yes 💖
        </motion.button>

        <motion.button
          animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          onClick={handleNoHover} // Ensure click also triggers move
          style={{
            padding: '1rem 3rem',
            fontSize: '1.5rem',
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            borderRadius: '50px',
            cursor: 'not-allowed', // Hint that you can't click it
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          No 😢
        </motion.button>
      </div>
    </div>
  );
};

export default Overlay;
