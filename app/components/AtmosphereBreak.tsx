'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSectionReadiness } from '@/app/context/SectionReadiness';

export default function AtmosphereBreak() {
  const { isSectionReady, markSectionReady } = useSectionReadiness();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // State-based trigger - safe, no gating
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.25, // 25% visibility
  });

  // Chapter marker variant - subtle cinematic punctuation
  const chapterVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(3px)',
      y: 10,
    },
    visible: {
      opacity: 0.45, // Very subtle presence
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
    },
  };

  // Cinematic title card variant - "breath" moment focus-pull
  const titleCardVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 0.28, // Subtle presence
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Wait for About section, then mark ready after brief delay
  useEffect(() => {
    if (isSectionReady('about')) {
      const timer = setTimeout(() => {
        markSectionReady('atmosphereBreak');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSectionReady, markSectionReady]);

  // Reduced motion override
  const getVariant = (baseVariant: Variants, targetOpacity: number = 1): Variants => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: targetOpacity },
      };
    }
    return baseVariant;
  };

  return (
    <section
      id="atmosphere-break"
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        paddingTop: 'clamp(12rem, 20vh, 16rem)',
        paddingBottom: 'clamp(16rem, 28vh, 20rem)',
        background: '#000000',
      }}
      aria-label="Atmosphere"
    >
      <div className="flex flex-col items-center">
        {/* Chapter Marker - Cinematic transition punctuation */}
        <motion.div
          variants={getVariant(chapterVariant, 0.45)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0,
            duration: prefersReducedMotion ? 0.3 : 1.1,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="text-zinc-400 uppercase text-center"
          style={{
            fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
            letterSpacing: '0.35em',
            opacity: 0.45,
            marginBottom: 'clamp(1.25rem, 3vh, 2rem)',
          }}
        >
          CHAPTER I
        </motion.div>

        {/* Single cinematic title card image - "breath" moment */}
        <motion.div
          variants={getVariant(titleCardVariant, 0.28)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0.15,
            duration: prefersReducedMotion ? 0.3 : 1.6,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="relative overflow-hidden rounded-xl"
          style={{
            width: 'min(1100px, 92vw)',
            maxHeight: '55vh',
            aspectRatio: '16/9',
          }}
        >
          <Image
            src="/images/gallery/atmosphere-2.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1100px) 92vw, 1100px"
            className="object-cover rounded-xl"
            style={{
              filter: 'grayscale(50%)',
            }}
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-black/30 rounded-xl" />
        </motion.div>
      </div>
    </section>
  );
}
