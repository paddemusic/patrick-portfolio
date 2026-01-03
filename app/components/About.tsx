'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { FluidText } from './ui/Typography';
import {
  aboutLabel,
  aboutHeadline,
  aboutBody,
  aboutPhoto,
  aboutTiming,
} from '@/app/utils/premiumMotion';
import { useSectionReadiness } from '@/app/context/SectionReadiness';
import { EDITORIAL_SPACING, EDITORIAL_TYPOGRAPHY } from '@/app/styles/spacing';
import { aboutImages } from '@/app/content/imageManifest';

export default function About() {
  const ref = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { markSectionReady } = useSectionReadiness();

  // State-based trigger: once when 30% visible
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
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

  // Mark About as ready for AtmosphereBreak when body text is visible
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      markSectionReady('about');
    }, aboutTiming.bodyVisible * 1000);

    return () => clearTimeout(timer);
  }, [isInView, markSectionReady]);

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

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative w-full"
      style={{
        paddingTop: EDITORIAL_SPACING.sectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.sectionPaddingBottom,
      }}
    >
      <div className="container max-w-5xl px-6">
        <div className="space-y-12">
          {/* Stage 1: Section label - metadata */}
          <motion.div
            variants={getVariant(aboutLabel)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              delay: prefersReducedMotion ? 0 : aboutTiming.label,
              duration: prefersReducedMotion ? 0.2 : 0.7,
              ease: prefersReducedMotion ? undefined : [0.3, 0.0, 0.1, 1.0],
            }}
            className="text-gray-500 tracking-widest"
            style={{ fontSize: EDITORIAL_TYPOGRAPHY.labelSize }}
          >
            (ABOUT)
          </motion.div>

          {/* Stage 2: Headline - primary element */}
          <motion.div
            variants={getVariant(aboutHeadline)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              delay: prefersReducedMotion ? 0 : aboutTiming.headline,
              duration: prefersReducedMotion ? 0.2 : 1.9,
              ease: prefersReducedMotion ? undefined : [0.2, 0.0, 0.2, 1.0],
            }}
          >
            <FluidText
              as="h2"
              size="section"
              weight="light"
              className="leading-tight text-white"
            >
              from stage to strategy
            </FluidText>
          </motion.div>

          {/* Stage 3: Body text - secondary element */}
          <motion.div
            variants={getVariant(aboutBody)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              delay: prefersReducedMotion ? 0 : aboutTiming.body,
              duration: prefersReducedMotion ? 0.2 : 1.1,
              ease: prefersReducedMotion ? undefined : [0.25, 0.1, 0.25, 1.0],
            }}
            className="space-y-12 text-gray-400"
            style={{
              fontSize: EDITORIAL_TYPOGRAPHY.bodySize,
              lineHeight: EDITORIAL_TYPOGRAPHY.bodyLineHeight,
              maxWidth: EDITORIAL_TYPOGRAPHY.bodyMaxWidth,
            }}
          >
            <p className="hover:text-gray-300 transition-colors duration-300">
              Performing led to building. International education in music and film across the US taught how entertainment works at scale.
            </p>

            <p className="hover:text-gray-300 transition-colors duration-300">
              At TV2, I managed launch strategies for major shows. Understanding audience behavior separates content that performs from content that doesn't.
            </p>

            <p className="hover:text-gray-300 transition-colors duration-300">
              Now I work where entertainment instincts meet commercial execution.
            </p>
          </motion.div>

          {/* Stage 4: Single Editorial Image */}
          <motion.div
            variants={getVariant(aboutPhoto)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              delay: prefersReducedMotion ? 0 : aboutTiming.photosStart,
              duration: prefersReducedMotion ? 0.2 : 1.1,
              ease: prefersReducedMotion ? undefined : [0.25, 0.1, 0.25, 1.0],
            }}
            className="pt-24"
          >
            <div className="relative overflow-hidden rounded-xl border border-zinc-800/50 group cursor-pointer" style={{ aspectRatio: '16/9', maxHeight: '70vh' }}>
              <Image
                src={aboutImages[0].src}
                alt={aboutImages[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  objectPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade-to-black scrim - "film cut" transition to chapter marker */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          delay: 0.15,
          duration: prefersReducedMotion ? 0.3 : 0.6,
          ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
        }}
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: 'clamp(140px, 18vh, 220px)',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))',
          zIndex: 20,
        }}
      />
    </section>
  );
}
