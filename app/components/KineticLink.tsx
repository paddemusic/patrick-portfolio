'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

interface KineticLinkProps {
  fromRef: RefObject<HTMLDivElement | null>;
  toRef: RefObject<HTMLDivElement | null>;
  onImpact: () => void;
}

export default function KineticLink({ fromRef, toRef, onImpact }: KineticLinkProps) {
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

  // Scroll-driven progress through the last portion of About section
  const { scrollYProgress } = useScroll({
    target: fromRef,
    offset: ["end 85%", "end 60%"], // Short window near end of About
  });

  // Smooth spring for weight movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to y-position (0 → 140px drop)
  const weightY = useTransform(smoothProgress, [0, 1], [0, 140]);

  // Trigger impact at 98% progress
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest > 0.98 && !hasImpacted) {
        setHasImpacted(true);
        setShowPulse(true);
        onImpact();

        // Hide pulse after animation
        setTimeout(() => setShowPulse(false), 300);
      }
    });
  }, [scrollYProgress, hasImpacted, onImpact]);

  // Reduced motion: render static layout
  if (prefersReducedMotion) {
    return (
      <div className="relative flex justify-center py-8">
        {/* Static track */}
        <div className="relative h-32 w-px bg-white/10" />
        {/* Static weight at bottom */}
        <div
          className="absolute bottom-0 w-3 h-3 rounded-full bg-white/25 border border-white/20"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center py-8" style={{ minHeight: '160px' }}>
      {/* Vertical track - thin, subtle */}
      <div
        className="absolute top-0 w-px bg-white/10"
        style={{
          height: '140px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Falling weight - scroll-driven */}
      <motion.div
        style={{
          y: weightY,
          position: 'absolute',
          top: 0,
          left: '50%',
          x: '-50%',
        }}
      >
        {/* Impact pulse ring */}
        {showPulse && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.18 }}
            animate={{ scale: 2.5, opacity: 0 }}
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

        {/* Impact shake on weight itself */}
        <motion.div
          animate={
            hasImpacted
              ? {
                  scale: [1, 0.92, 1],
                  y: [0, 6, 0],
                }
              : {}
          }
          transition={{
            duration: 0.25,
            ease: [0.16, 0.0, 0.24, 1.0],
          }}
          className="w-3 h-3 rounded-full bg-white/25 border border-white/20"
          style={{
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.15)',
          }}
        />
      </motion.div>
    </div>
  );
}
