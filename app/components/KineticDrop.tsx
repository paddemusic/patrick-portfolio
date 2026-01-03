'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

interface KineticDropProps {
  fromRef: RefObject<HTMLDivElement | null>;
  onImpact: () => void;
}

export default function KineticDrop({ fromRef, onImpact }: KineticDropProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasImpacted, setHasImpacted] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

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

  // Scroll-driven progress through the last portion of Partners section
  const { scrollYProgress } = useScroll({
    target: fromRef,
    offset: ["end 85%", "end 60%"], // Last 25% of Partners
  });

  // Smooth spring for weight drop
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to y-position (0 → 160px drop)
  const weightY = useTransform(smoothProgress, [0, 1], [0, 160]);

  // Trigger impact at 95% progress
  useEffect(() => {
    if (prefersReducedMotion) return; // Don't fire onImpact in reduced motion

    return scrollYProgress.on('change', (latest) => {
      if (latest >= 0.95 && !hasImpacted) {
        setHasImpacted(true);
        setShowPulse(true);
        onImpact();

        // Hide pulse after animation
        setTimeout(() => setShowPulse(false), 300);
      }
    });
  }, [scrollYProgress, hasImpacted, onImpact, prefersReducedMotion]);

  // Reduced motion: render static layout at bottom
  if (prefersReducedMotion) {
    return (
      <div className="relative flex justify-center py-8 hidden lg:block">
        {/* Static shaft */}
        <div className="relative h-40 w-px bg-white/10 mx-auto" />
        {/* Static weight at bottom */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white/20 border border-white/15"
          style={{ boxShadow: '0 0 6px rgba(255, 255, 255, 0.1)' }}
        />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center py-8 hidden lg:block" style={{ minHeight: '200px' }}>
      {/* Vertical shaft */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-px bg-white/10"
        style={{ height: '160px' }}
      />

      {/* Falling weight - scroll-driven */}
      <motion.div
        style={{
          y: weightY,
          position: 'absolute',
          top: '2rem',
          left: '50%',
          x: '-50%',
        }}
      >
        {/* Impact pulse ring */}
        {showPulse && (
          <motion.div
            initial={{ scale: 1, opacity: 0.18 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 0.0, 0.24, 1.0] }}
            className="absolute inset-0 rounded-full border border-white/30"
            style={{
              width: '40px',
              height: '40px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        {/* Impact animation on weight itself */}
        <motion.div
          animate={
            hasImpacted
              ? {
                  scale: [1, 0.9, 1.1, 1],
                  y: [0, 6, 0],
                }
              : {}
          }
          transition={{
            duration: 0.24,
            ease: [0.16, 0.0, 0.24, 1.0],
          }}
          className="w-3 h-3 rounded-full bg-white/20 border border-white/15"
          style={{
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.1)',
          }}
        />
      </motion.div>
    </div>
  );
}
