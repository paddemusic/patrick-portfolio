'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

interface KineticTickProps {
  fromRef: RefObject<HTMLDivElement | null>;
  onImpact: () => void;
}

export default function KineticTick({ fromRef, onImpact }: KineticTickProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasImpacted, setHasImpacted] = useState(false);

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

  // Scroll-driven progress through the last portion of Philosophy section
  const { scrollYProgress } = useScroll({
    target: fromRef,
    offset: ["end 85%", "end 60%"], // Short window near end of Philosophy
  });

  // Smooth spring for slider movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to x-position (0 → 120px horizontal slide)
  const sliderX = useTransform(smoothProgress, [0, 1], [0, 120]);

  // Trigger impact at 98% progress
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest > 0.98 && !hasImpacted) {
        setHasImpacted(true);
        onImpact();
      }
    });
  }, [scrollYProgress, hasImpacted, onImpact]);

  // Reduced motion: render static layout
  if (prefersReducedMotion) {
    return (
      <div className="relative flex justify-center py-6">
        {/* Static track */}
        <div className="relative h-px w-32 bg-white/10" />
        {/* Static slider at end */}
        <div
          className="absolute right-0 w-2 h-2 rounded-sm bg-white/25 border border-white/20"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center py-6" style={{ minHeight: '80px' }}>
      {/* Horizontal track */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-px bg-white/10"
        style={{ width: '120px' }}
      />

      {/* Sliding tick marker - scroll-driven */}
      <motion.div
        style={{
          x: sliderX,
          position: 'absolute',
          left: 0,
          top: '50%',
          y: '-50%',
        }}
      >
        {/* Tick marker - small square */}
        <motion.div
          animate={
            hasImpacted
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }
              : {}
          }
          transition={{
            duration: 0.2,
            ease: [0.16, 0.0, 0.24, 1.0],
          }}
          className="w-2 h-2 rounded-sm bg-white/25 border border-white/20"
          style={{
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.1)',
          }}
        />
      </motion.div>
    </div>
  );
}
