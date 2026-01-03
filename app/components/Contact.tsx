'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  contactLabel,
  contactHeading,
  contactCTA,
  contactSecondary,
  contactTiming,
} from '@/app/utils/premiumMotion';
import { EDITORIAL_SPACING, EDITORIAL_TYPOGRAPHY } from '@/app/styles/spacing';

interface ContactProps {
  impactReady?: boolean;
}

export default function Contact({ impactReady = false }: ContactProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [didImpact, setDidImpact] = useState(false);
  const [impactPulse, setImpactPulse] = useState(false);
  const containerRef = useRef(null);

  // State-based trigger at 30% viewport visibility
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3, // 30% visibility
  });

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

  // Handle external impact trigger from KineticReel
  useEffect(() => {
    if (impactReady && !didImpact && !prefersReducedMotion) {
      setDidImpact(true);
      setImpactPulse(true);
      // Reset pulse after animation
      setTimeout(() => setImpactPulse(false), 280);
    }
  }, [impactReady, didImpact, prefersReducedMotion]);

  // Reduced motion overrides
  const getVariant = (baseVariant: any) => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.2 },
        },
      };
    }
    return baseVariant;
  };

  // Title card variant - cinematic "final frame" background layer
  const titleCardVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 0.22, // Subtle atmospheric presence
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full"
      style={{
        paddingTop: EDITORIAL_SPACING.endSectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.endSectionPaddingBottom,
      }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Cinematic Title Card - "Final Frame" atmospheric background */}
        <div className="relative">
          {/* Final frame settle animation wrapper - triggers on reel lock */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            animate={
              !prefersReducedMotion && impactPulse
                ? {
                    scale: [1, 1.01, 0.995, 1.0],
                    opacity: [1, 1.06, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.28,
              ease: [0.16, 0.0, 0.24, 1.0],
            }}
          >
            <motion.div
              variants={
                prefersReducedMotion
                  ? { hidden: { opacity: 0 }, visible: { opacity: 0.22 } }
                  : titleCardVariant
              }
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{
                delay: 0.35, // After heading starts
                duration: prefersReducedMotion ? 0.3 : 1.5,
                ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-xl pointer-events-none"
              style={{
                width: 'min(1100px, 92vw)',
                maxHeight: '55vh',
                zIndex: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/projects/election-tv2.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover rounded-xl"
                style={{
                  maxHeight: '55vh',
                  filter: 'grayscale(55%)',
                }}
              />
              {/* Readability overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/45 rounded-xl" />
            </motion.div>
          </motion.div>

          {/* Content wrapper with elevated z-index */}
          <div className="relative" style={{ zIndex: 10 }}>
            {/* Stage 1: Label */}
        <motion.div
          variants={getVariant(contactLabel)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: prefersReducedMotion ? 0 : contactTiming.label,
            duration: prefersReducedMotion ? 0.2 : 0.7,
            ease: prefersReducedMotion ? undefined : [0.3, 0.0, 0.1, 1.0],
          }}
          className="text-gray-600 tracking-widest"
          style={{
            fontSize: EDITORIAL_TYPOGRAPHY.labelSize,
            marginBottom: EDITORIAL_SPACING.componentGapLarge,
          }}
        >
          (CONTACT)
        </motion.div>

        {/* Stage 2: Heading */}
        <motion.h2
          variants={getVariant(contactHeading)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: prefersReducedMotion ? 0 : contactTiming.heading,
            duration: prefersReducedMotion ? 0.2 : 1.8,
            ease: prefersReducedMotion ? undefined : [0.2, 0.0, 0.2, 1.0],
          }}
          className="font-light tracking-tight text-white"
          style={{
            fontSize: EDITORIAL_TYPOGRAPHY.h2Size,
            lineHeight: EDITORIAL_TYPOGRAPHY.h2LineHeight,
            letterSpacing: EDITORIAL_TYPOGRAPHY.h2LetterSpacing,
            marginBottom: EDITORIAL_SPACING.introGap,
            maxWidth: '20ch',
          }}
        >
          Get in touch
        </motion.h2>

        {/* Stage 3: Primary CTA (Email - Dominant) */}
        <motion.div
          variants={getVariant(contactCTA)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: prefersReducedMotion ? 0 : contactTiming.cta,
            duration: prefersReducedMotion ? 0.2 : 1.1,
            ease: prefersReducedMotion ? undefined : [0.25, 0.1, 0.25, 1.0],
          }}
          style={{ marginBottom: EDITORIAL_SPACING.introGap }}
        >
          <p
            className="text-gray-500 mb-3"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
          >
            For work inquiries
          </p>
          <a
            href="mailto:contact@hellonomusic.com"
            aria-label="Email contact@hellonomusic.com"
            className="inline-block text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '300',
              letterSpacing: '-0.02em',
            }}
          >
            contact@hellonomusic.com
          </a>
        </motion.div>

        {/* Stage 4: Secondary Items (Grouped) */}
        <motion.div
          variants={getVariant(contactSecondary)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: prefersReducedMotion ? 0 : contactTiming.secondary,
            duration: prefersReducedMotion ? 0.2 : 0.8,
            ease: prefersReducedMotion ? undefined : [0.25, 0.1, 0.25, 1.0],
          }}
          className="space-y-8"
        >
          {/* Portfolio Link */}
          <div>
            <p
              className="text-gray-500 mb-2"
              style={{ fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)' }}
            >
              Portfolio
            </p>
            <a
              href="https://flokk-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit portfolio at flokk-ten.vercel.app"
              className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontWeight: '300',
              }}
            >
              flokk-ten.vercel.app
            </a>
          </div>

          {/* Request CV */}
          <div>
            <a
              href="mailto:contact@hellonomusic.com?subject=CV%20Request"
              aria-label="Request CV via email"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black px-4 py-2 rounded"
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              }}
            >
              <span>Request CV</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          {/* Social Links - Compact Row */}
          <div
            className="pt-6 border-t border-zinc-800/50"
            style={{ marginTop: 'clamp(2rem, 4vh, 3rem)' }}
          >
            <p
              className="text-gray-600 mb-3"
              style={{ fontSize: 'clamp(0.75rem, 1.25vw, 0.875rem)' }}
            >
              Elsewhere
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/paddemusic' },
                { name: 'Instagram', url: 'https://instagram.com/p4trickofficial' },
                { name: 'YouTube', url: 'https://youtube.com/patrickjorgensen' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${social.name} profile`}
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black px-2 py-1 rounded"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

            {/* Footer - Final silence */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : contactTiming.secondary + 0.8,
                duration: prefersReducedMotion ? 0.2 : 0.6,
              }}
              className="text-center text-gray-600"
              style={{
                marginTop: EDITORIAL_SPACING.sectionPaddingTop,
                fontSize: EDITORIAL_TYPOGRAPHY.labelSize,
              }}
            >
              <p>© 2025 Patrick Jørgensen</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
