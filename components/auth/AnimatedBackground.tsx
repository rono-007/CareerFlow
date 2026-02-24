import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 60;
        const yPos = (clientY / window.innerHeight - 0.5) * 60;

        gsap.to(blob1Ref.current, { x: xPos * 1.5, y: yPos * 1.5, duration: 2, ease: "power2.out" });
        gsap.to(blob2Ref.current, { x: -xPos * 2, y: -yPos * 2, duration: 2.5, ease: "power2.out" });
        gsap.to(blob3Ref.current, { x: xPos * 0.8, y: -yPos * 1.2, duration: 3, ease: "power2.out" });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-[#FDFCF9]">
      {/* Noise Texture Overlay for that premium grainy look */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-overlay z-50">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.4" />
        </svg>
      </div>

      {/* Primary Atmospheric Gradient */}
      <motion.div
        className="absolute inset-0 opacity-40 bg-gradient-to-br from-nature-beige via-nature-primary/5 to-white"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Morphing Organic Blobs (Lucrative Motion) */}
      <div className="absolute inset-0">
        <motion.div
          ref={blob1Ref}
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] bg-nature-primary/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 60% 40% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          ref={blob2Ref}
          className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] bg-nature-leaf/25 rounded-full blur-[100px]"
          animate={{
            scale: [1, 0.85, 1.15, 1],
            borderRadius: ["30% 70% 70% 30% / 50% 30% 70% 50%", "70% 30% 30% 70% / 30% 70% 50% 30%", "30% 70% 70% 30% / 50% 30% 70% 50%"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          ref={blob3Ref}
          className="absolute -bottom-[20%] left-[10%] w-[60vw] h-[60vw] bg-nature-wood/10 rounded-full blur-[140px]"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            borderRadius: ["50% 50% 30% 70% / 50% 50% 70% 30%", "30% 70% 50% 50% / 70% 30% 50% 50%", "50% 50% 30% 70% / 50% 50% 70% 30%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Glass Leaves (High Fidelity Detail) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1.2, 0.8],
              y: [0, -40, 0],
              rotate: [0, 45, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 3,
              ease: "easeInOut"
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-nature-forest/40 drop-shadow-2xl">
              <path d="M12 2C12 2 3 9 3 15C3 18.3137 5.68629 21 9 21H15C18.3137 21 21 18.3137 21 15C21 9 12 2 12 2Z" fill="white" fillOpacity="0.1" />
              <path d="M12 2V21" strokeOpacity="0.5" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Ultra-subtle Animated Grid */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{ backgroundImage: 'radial-gradient(#1B5E20 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default AnimatedBackground;
