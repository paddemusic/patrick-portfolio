'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Cinematic motion variants - Film-title entrance with depth layering
  // Name layer (foreground - sharp focus)
  const nameVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      scale: 1.0,
      filter: 'blur(0px)',
    },
  };

  // Tagline layer (mid-ground - subtle depth)
  const taglineVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 0.85,
      scale: 0.98,
      filter: 'blur(1px)',
    },
  };

  // Location layer (background - furthest depth)
  const locationVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.94,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 0.5,
      scale: 0.96,
      filter: 'blur(2px)',
    },
  };

  // Background atmospheric image - cinematic "hero still" layer
  const backgroundVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 0.16, // Very subtle presence
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  // Reduced motion overrides - Preserve delay rhythm but simplify to opacity-only
  const getVariant = (baseVariant: Variants): Variants => {
    if (prefersReducedMotion) {
      // Extract target opacity if it exists in the variant
      const targetOpacity = typeof baseVariant.visible === 'object' && 'opacity' in baseVariant.visible
        ? (baseVariant.visible.opacity as number)
        : 1;

      return {
        hidden: { opacity: 0 },
        visible: { opacity: targetOpacity },
      };
    }
    return baseVariant;
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Subtle radial gradient - anchoring treatment */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric Background Image - Cinematic "hero still" */}
      <motion.div
        variants={getVariant(backgroundVariant)}
        initial="hidden"
        animate="visible"
        transition={{
          delay: prefersReducedMotion ? 1.35 : 1.35,
          duration: prefersReducedMotion ? 0.3 : 1.6,
          ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
        }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            width: 'min(1200px, 92vw)',
            maxHeight: '70vh',
            aspectRatio: '16/9',
          }}
        >
          <Image
            src="/images/gallery/atmosphere-1.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(max-width: 1200px) 92vw, 1200px"
            className="object-cover rounded-xl"
            style={{
              filter: 'grayscale(55%) brightness(0.55) contrast(1.05)',
            }}
          />
          {/* Readability overlay - ensures text dominance */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/75 rounded-xl" />
        </div>
      </motion.div>

      {/* Text Content - Center focus */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Name - Staged reveal: word by word with depth */}
        <h1
          className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-light mb-16 relative text-white overflow-hidden"
          style={{
            letterSpacing: '-0.02em',
            lineHeight: '1',
          }}
        >
          {/* First word: "patrick" - 1.2s initial hold, then 1.8s entrance */}
          {/* Wrapper has cinematic animation, inner text renders immediately for LCP */}
          <motion.span
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
              delay: prefersReducedMotion ? 0.3 : 1.2,
              duration: prefersReducedMotion ? 0.3 : 1.8,
              ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
            }}
            className="inline-block"
          >
            <span className="inline-block" style={{ opacity: 1 }}>
              patrick
            </span>
          </motion.span>
          {' '}
          {/* Second word: "jørgensen" - Enters at 3.4s */}
          <motion.span
            variants={getVariant(nameVariant)}
            initial="hidden"
            animate="visible"
            transition={{
              delay: prefersReducedMotion ? 0.6 : 3.4,
              duration: prefersReducedMotion ? 0.3 : 1.8,
              ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
            }}
            className="inline-block"
          >
            jørgensen
          </motion.span>
        </h1>

        {/* Tagline - Mid-ground layer, enters at 5.8s with subtle blur */}
        <motion.div
          variants={getVariant(taglineVariant)}
          initial="hidden"
          animate="visible"
          transition={{
            delay: prefersReducedMotion ? 0.9 : 5.8,
            duration: prefersReducedMotion ? 0.3 : 1.6,
            ease: prefersReducedMotion ? undefined : [0.20, 0.0, 0.20, 1.0],
          }}
          className="space-y-3"
        >
          <p className="text-sm md:text-base text-gray-500 tracking-wide lowercase">
            creative technologist · musician
          </p>
        </motion.div>
      </div>

      {/* Geographic Location - Background layer, enters at 8.2s with depth blur */}
      <motion.footer
        variants={getVariant(locationVariant)}
        initial="hidden"
        animate="visible"
        transition={{
          delay: prefersReducedMotion ? 1.2 : 8.2,
          duration: prefersReducedMotion ? 0.3 : 1.4,
          ease: prefersReducedMotion ? undefined : [0.22, 0.0, 0.18, 1.0],
        }}
        className="absolute bottom-8 left-0 right-0 flex justify-center text-xs text-gray-600"
      >
        <span>Oslo, Norway</span>
      </motion.footer>
    </section>
  );
}
