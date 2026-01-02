'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FluidText } from './ui/Typography';
import { EDITORIAL_SPACING, EDITORIAL_TYPOGRAPHY } from '@/app/styles/spacing';

export default function Partners() {
  const [canTrigger, setCanTrigger] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // State-based trigger - safe, no gating
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3, // 30% visibility
    margin: '-10% 0px -25% 0px', // Scroll resistance
  });

  // Cinematic variants - "cultural whisper" focus-pull
  const headingVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(2px)',
      y: 18,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
    },
  };

  const logoVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)',
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
    },
  };

  // Title card variant - cinematic ghost layer behind logos
  const titleCardVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 0.25, // Subtle atmospheric layer
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

  // No Works gating - triggers immediately when in view
  useEffect(() => {
    setCanTrigger(true);
  }, []);

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
      id="partners"
      ref={containerRef}
      className="relative w-full"
      style={{
        paddingTop: EDITORIAL_SPACING.endSectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.sectionPaddingBottom,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Label - Cinematic focus-pull */}
          <motion.div
            variants={getVariant(headingVariant, 0.5)}
            initial="hidden"
            animate={canTrigger && isInView ? 'visible' : 'hidden'}
            transition={{
              delay: 0, // No delay for label
              duration: prefersReducedMotion ? 0.3 : 1.2,
              ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
            }}
            className="text-gray-600 tracking-widest mb-8"
            style={{ fontSize: EDITORIAL_TYPOGRAPHY.labelSize, opacity: 0.5 }}
          >
            (PARTNERS)
          </motion.div>

          {/* Heading - Cinematic focus-pull, delayed 0.15s */}
          <motion.div
            variants={getVariant(headingVariant, 1)}
            initial="hidden"
            animate={canTrigger && isInView ? 'visible' : 'hidden'}
            transition={{
              delay: 0.15,
              duration: prefersReducedMotion ? 0.3 : 1.2,
              ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
            }}
          >
            <FluidText
              as="h3"
              size="section"
              weight="light"
              className="text-gray-300"
              style={{ marginBottom: EDITORIAL_SPACING.introGap }}
            >
              Trusted By
            </FluidText>
          </motion.div>

          {/* Title Card - Cinematic ghost layer behind logos */}
          <div className="relative">
            <motion.div
              variants={getVariant(titleCardVariant, 0.25)}
              initial="hidden"
              animate={canTrigger && isInView ? 'visible' : 'hidden'}
              transition={{
                delay: 0.35, // After heading, before logos
                duration: prefersReducedMotion ? 0.3 : 1.4,
                ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
              }}
              className="absolute inset-0 -top-12 -bottom-12 flex items-center justify-center pointer-events-none overflow-hidden rounded-xl"
              style={{ zIndex: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/gallery/atmosphere-1.jpg"
                alt=""
                aria-hidden="true"
                className="w-full object-cover rounded-xl"
                style={{
                  maxHeight: '50vh',
                  filter: 'grayscale(40%)',
                }}
              />
              {/* Subtle black overlay for logo readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/60 rounded-xl" />
            </motion.div>

            {/* Logos - ALL reveal simultaneously at 0.55s (NO stagger) */}
            <div className="relative grid grid-cols-2 md:grid-cols-4" style={{ gap: EDITORIAL_SPACING.componentGapLarge, zIndex: 1 }}>
            {[
              { name: 'TV2', src: '/images/clients/tv2.png' },
              { name: 'Sony Music', src: '/images/clients/sony-music.png' },
              { name: 'BI Norwegian Business School', src: '/images/clients/bi.png' },
              { name: 'Nobel Peace Center', src: '/images/clients/nobel.png' },
            ].map((client) => (
              <motion.div
                key={client.name}
                variants={getVariant(logoVariant, 1)}
                initial="hidden"
                animate={canTrigger && isInView ? 'visible' : 'hidden'}
                transition={{
                  delay: 0.55, // Same delay for ALL logos - no stagger
                  duration: prefersReducedMotion ? 0.3 : 1.1,
                  ease: prefersReducedMotion ? undefined : [0.20, 0.0, 0.20, 1.0],
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.02, // Minimal hover
                        transition: { duration: 0.8 },
                      }
                }
                className="relative flex items-center justify-center group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-w-full h-20 object-contain opacity-50 group-hover:opacity-90 transition-all duration-400 filter grayscale group-hover:grayscale-0"
                />
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
