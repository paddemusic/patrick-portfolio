'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

interface KineticCableProps {
  fromRef: RefObject<HTMLDivElement | null>;
  onImpact: () => void;
}

export default function KineticCable({ fromRef, onImpact }: KineticCableProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasLocked, setHasLocked] = useState(false);

  // Detect reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll-driven progress through the last portion of Works section
  const { scrollYProgress } = useScroll({
    target: fromRef,
    offset: ["end 85%", "end 60%"], // Last 25% of Works
  });

  // Smooth spring for cable draw
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to cable extension (0 → 1 scaleX)
  const cableScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Map progress to opacity (subtle fade in)
  const cableOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.08, 0.15, 0.22]);

  // Map progress to coupler visibility
  const couplerOpacity = useTransform(smoothProgress, [0, 0.85, 0.95], [0, 0, 1]);

  // Trigger lock at 95% progress
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest > 0.95 && !hasLocked) {
        setHasLocked(true);
        onImpact();
      }
    });
  }, [scrollYProgress, hasLocked, onImpact]);

  // Reduced motion: render static fully-drawn cable
  if (prefersReducedMotion) {
    return (
      <div className="relative flex justify-center py-8">
        {/* Static cable - fully drawn */}
        <div
          className="h-px bg-white/12"
          style={{
            width: 'min(280px, 60vw)',
          }}
        />
        {/* Static coupler at end */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20 border border-white/15"
          style={{
            right: 'calc(50% - min(140px, 30vw))',
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center py-8" style={{ minHeight: '100px' }}>
      {/* Cable - draws horizontally as you scroll */}
      <motion.div
        style={{
          scaleX: cableScale,
          opacity: cableOpacity,
          transformOrigin: 'left',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '1px',
          width: 'min(280px, 60vw)',
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.12))',
          boxShadow: '0 0 4px rgba(255, 255, 255, 0.1)',
        }}
      />

      {/* Coupler circle - appears near completion */}
      <motion.div
        style={{
          opacity: couplerOpacity,
          position: 'absolute',
          top: '50%',
          left: '50%',
          y: '-50%',
          x: `calc(${useTransform(cableScale, (s) => (s - 0.5) * 100)}% - 4px)`,
        }}
      >
        {/* Lock snap effect when fully locked */}
        <motion.div
          animate={
            hasLocked
              ? {
                  scale: [1, 0.85, 1.15, 1],
                  opacity: [1, 0.9, 1],
                }
              : {}
          }
          transition={{
            duration: 0.18,
            ease: [0.16, 0.0, 0.24, 1.0],
          }}
          className="w-2 h-2 rounded-full bg-white/20 border border-white/15"
          style={{
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.15)',
          }}
        />
      </motion.div>
    </div>
  );
}
