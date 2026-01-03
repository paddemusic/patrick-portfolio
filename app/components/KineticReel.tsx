'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, RefObject } from 'react';

interface KineticReelProps {
  fromRef: RefObject<HTMLDivElement | null>;
  onImpact: () => void;
}

export default function KineticReel({ fromRef, onImpact }: KineticReelProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasLocked, setHasLocked] = useState(false);
  const [showTick, setShowTick] = useState(false);

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

  // Scroll-driven progress through the last portion of Music section
  const { scrollYProgress } = useScroll({
    target: fromRef,
    offset: ["end 85%", "end 60%"], // Last 25% of Music
  });

  // Smooth spring for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to wheel rotation (0 → 540deg = 1.5 turns)
  const wheelRotation = useTransform(smoothProgress, [0, 1], [0, 540]);

  // Map progress to line extension (scaleX 0 → 1)
  const lineScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Map progress to line opacity (0.08 → 0.22)
  const lineOpacity = useTransform(smoothProgress, [0, 1], [0.08, 0.22]);

  // Trigger lock at 95% progress
  useEffect(() => {
    if (prefersReducedMotion) return; // Don't fire onImpact in reduced motion

    return scrollYProgress.on('change', (latest) => {
      if (latest >= 0.95 && !hasLocked) {
        setHasLocked(true);
        onImpact();

        // Show tick notch briefly
        setShowTick(true);
        setTimeout(() => setShowTick(false), 200);
      }
    });
  }, [scrollYProgress, hasLocked, onImpact, prefersReducedMotion]);

  // Reduced motion: render static layout
  if (prefersReducedMotion) {
    return (
      <div className="relative flex justify-center py-8 hidden lg:block">
        {/* Static line - fully drawn */}
        <div
          className="h-px bg-white/12"
          style={{
            width: 'min(320px, 70vw)',
          }}
        />
        {/* Static wheel at left */}
        <div
          className="absolute left-1/2 top-1/2 -translate-y-1/2"
          style={{
            left: 'calc(50% - min(160px, 35vw))',
          }}
        >
          <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center py-8 hidden lg:block" style={{ minHeight: '160px' }}>
      {/* Glow layer - duplicate line with blur */}
      <motion.div
        style={{
          scaleX: lineScaleX,
          transformOrigin: 'left',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '1px',
          width: 'min(320px, 70vw)',
          background: 'rgba(255, 255, 255, 0.12)',
          filter: 'blur(6px)',
        }}
      />

      {/* Main line - tightens as reel winds */}
      <motion.div
        style={{
          scaleX: lineScaleX,
          opacity: lineOpacity,
          transformOrigin: 'left',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '1px',
          width: 'min(320px, 70vw)',
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.15))',
        }}
      />

      {/* Tick notch at line end - appears briefly on lock */}
      {showTick && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginLeft: 'min(160px, 35vw)',
            width: '1px',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.25)',
          }}
        />
      )}

      {/* Reel wheel - rotates as line tightens */}
      <motion.div
        style={{
          rotate: wheelRotation,
          position: 'absolute',
          left: '50%',
          top: '50%',
          y: '-50%',
          x: '-50%',
          marginLeft: 'calc(-1 * min(160px, 35vw))',
        }}
      >
        {/* Lock animation on wheel */}
        <motion.div
          animate={
            hasLocked
              ? {
                  scale: [1, 0.9, 1.06, 1],
                }
              : {}
          }
          transition={{
            duration: 0.26,
            ease: [0.16, 0.0, 0.24, 1.0],
          }}
        >
          {/* Outer wheel ring */}
          <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center">
            {/* Inner hub */}
            <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
          </div>
        </motion.div>
      </motion.div>

      {/* Line opacity pulse on lock */}
      {hasLocked && (
        <motion.div
          initial={{ opacity: 0.22 }}
          animate={{ opacity: [0.22, 0.32, 0.22] }}
          transition={{ duration: 0.28 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '1px',
            width: 'min(320px, 70vw)',
            background: 'rgba(255, 255, 255, 0.1)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
