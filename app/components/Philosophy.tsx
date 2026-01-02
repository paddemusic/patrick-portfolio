'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { philosophyTiming } from '@/app/utils/premiumMotion';
import { useSectionReadiness } from '@/app/context/SectionReadiness';
import { EDITORIAL_SPACING, EDITORIAL_TYPOGRAPHY } from '@/app/styles/spacing';

// Authentic principles from Patrick's CVs - locked to 4 principles
const principles = [
  {
    title: 'Strategy Before Execution',
    description: 'Every music release had a plan: press, visuals, promotion. Nothing launched without a strategy for before, during, and after.',
  },
  {
    title: 'Entertainment Meets Commercial',
    description: 'Performing teaches you how audiences respond. Strategic work teaches you how content performs. Both matter.',
  },
  {
    title: 'AI Is Infrastructure',
    description: 'Modern content production runs on AI tools. I use them the way previous generations used Photoshop.',
  },
  {
    title: 'Numbers Tell the Truth',
    description: 'Metrics reveal what works. Every campaign is measured against clear outcomes.',
  },
];

// Intro Panel - Section header as its own frame
function IntroPanel({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const ref = useRef(null);

  // State-based trigger for intro panel
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  // Cinematic "focus pull" variants for intro panel
  const headlineVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  const bodyVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 0.9,
      scale: 1,
      filter: 'blur(1px)',
    },
  };

  // Title card variant - ghost atmospheric layer behind heading
  const titleCardVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 0.20, // Very subtle atmospheric presence
      scale: 1,
      filter: 'blur(0px)',
    },
  };

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
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        height: '100vh',
        paddingTop: EDITORIAL_SPACING.sectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.sectionPaddingBottom,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="relative container mx-auto px-6 max-w-6xl flex flex-col justify-start pt-12">
        {/* Ghost Title Card - Cinematic atmospheric layer behind heading */}
        <motion.div
          variants={
            prefersReducedMotion
              ? { hidden: { opacity: 0 }, visible: { opacity: 0.20 } }
              : titleCardVariant
          }
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0.2, // After label starts, before title fully resolves
            duration: prefersReducedMotion ? 0.3 : 1.6,
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
            src="/images/gallery/atmosphere-2.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover rounded-xl"
            style={{
              maxHeight: '55vh',
              filter: 'grayscale(50%)',
            }}
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 rounded-xl" />
        </motion.div>

        {/* Content wrapper with elevated z-index */}
        <div className="relative" style={{ zIndex: 10 }}>
          {/* Label - Simple fade */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
            className="text-gray-600 tracking-widest mb-8"
            style={{ fontSize: EDITORIAL_TYPOGRAPHY.labelSize }}
          >
            (PHILOSOPHY)
          </motion.div>

          {/* Section Title - Cinematic focus pull */}
          <motion.h2
            variants={getVariant(headlineVariant, 1)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 1.6,
              ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
            }}
            className="font-light tracking-tight text-white mb-8"
            style={{
              fontSize: EDITORIAL_TYPOGRAPHY.h2Size,
              lineHeight: EDITORIAL_TYPOGRAPHY.h2LineHeight,
              letterSpacing: EDITORIAL_TYPOGRAPHY.h2LetterSpacing,
              maxWidth: EDITORIAL_TYPOGRAPHY.h2MaxWidth,
            }}
          >
            How I Work
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

// Individual principle panel - each is a full frame
function PrinciplePanel({
  principle,
  index,
  onBodyVisible,
  prefersReducedMotion,
}: {
  principle: typeof principles[0];
  index: number;
  onBodyVisible?: () => void;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef(null);

  // Each principle has its own state-based trigger
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  // Cinematic "focus pull" variants for principle panels
  const headlineVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  const bodyVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 0.9,
      scale: 1,
      filter: 'blur(1px)',
    },
  };

  // Scene marker variant - gentle index + rule focus-pull
  const sceneMarkerVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 0.55,
      y: 0,
      filter: 'blur(0px)',
    },
  };

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

  // Mark first principle's body as visible for Philosophy readiness
  useEffect(() => {
    if (!isInView || !onBodyVisible) return;

    // Wait for body animation to complete (0.35s delay + 1.2s duration)
    const timer = setTimeout(() => {
      onBodyVisible();
    }, (0.35 + 1.2) * 1000);

    return () => clearTimeout(timer);
  }, [isInView, onBodyVisible]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        height: '100vh',
        paddingTop: EDITORIAL_SPACING.sectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.sectionPaddingBottom,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl flex flex-col justify-start pt-12">
        {/* Scene Index - Cinematic progression marker */}
        <motion.div
          variants={getVariant(sceneMarkerVariant, 0.55)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0,
            duration: prefersReducedMotion ? 0.3 : 1.0,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="text-zinc-400 uppercase"
          style={{
            fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
            letterSpacing: '0.28em',
            opacity: 0.55,
            marginBottom: 'clamp(0.75rem, 2vh, 1.25rem)',
          }}
        >
          {String(index + 1).padStart(2, '0')} / 04
        </motion.div>

        {/* Horizontal Rule - Scene separator */}
        <motion.div
          variants={getVariant(sceneMarkerVariant, 1.0)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0,
            duration: prefersReducedMotion ? 0.3 : 1.0,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          style={{
            height: '1px',
            width: 'min(420px, 60vw)',
            background: 'rgba(255, 255, 255, 0.1)',
            marginBottom: 'clamp(1rem, 2.5vh, 1.75rem)',
          }}
        />

        {/* Principle Headline - Cinematic focus pull */}
        <motion.h3
          variants={getVariant(headlineVariant, 1)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 1.6,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="font-light tracking-tight text-white hover:text-gray-200 transition-colors duration-500"
          style={{
            fontSize: EDITORIAL_TYPOGRAPHY.h3Size,
            lineHeight: EDITORIAL_TYPOGRAPHY.h3LineHeight,
            letterSpacing: EDITORIAL_TYPOGRAPHY.h3LetterSpacing,
            maxWidth: EDITORIAL_TYPOGRAPHY.h3MaxWidth,
            marginBottom: EDITORIAL_SPACING.componentGapMedium,
          }}
        >
          {principle.title}
        </motion.h3>

        {/* Principle Body - Cinematic focus pull, delayed 0.35s */}
        <motion.p
          variants={getVariant(bodyVariant, 0.9)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0.35,
            duration: prefersReducedMotion ? 0.3 : 1.2,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="text-gray-400"
          style={{
            fontSize: EDITORIAL_TYPOGRAPHY.bodySize,
            lineHeight: EDITORIAL_TYPOGRAPHY.bodyLineHeight,
            maxWidth: EDITORIAL_TYPOGRAPHY.bodyMaxWidth,
          }}
        >
          {principle.description}
        </motion.p>
      </div>
    </div>
  );
}

export default function Philosophy() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [firstPrincipleComplete, setFirstPrincipleComplete] = useState(false);
  const [allPrinciplesTriggered, setAllPrinciplesTriggered] = useState(false);
  const { markSectionReady } = useSectionReadiness();

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

  // Detect desktop for scroll-snap (lg+ = 1024px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Mark Philosophy ready when first principle body is visible
  const handleFirstPrincipleBodyVisible = () => {
    if (!firstPrincipleComplete) {
      setFirstPrincipleComplete(true);
      markSectionReady('philosophy');
    }
  };

  // Track when all principles have been triggered (for final readiness)
  useEffect(() => {
    if (firstPrincipleComplete && !allPrinciplesTriggered) {
      // Wait for last principle's body to be visible
      const timer = setTimeout(() => {
        setAllPrinciplesTriggered(true);
        markSectionReady('philosophyComplete');
      }, philosophyTiming.allPrinciplesComplete * 1000);

      return () => clearTimeout(timer);
    }
  }, [firstPrincipleComplete, allPrinciplesTriggered, markSectionReady]);

  return (
    <section
      id="philosophy"
      className="relative"
      style={{
        // CSS Scroll-Snap: Only on desktop (lg+ = 1024px)
        scrollSnapType: isDesktop ? 'y mandatory' : 'none',
        // Respect prefers-reduced-motion for scroll behavior
        scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
      }}
    >
      {/* Panel 0: Intro Frame */}
      <IntroPanel prefersReducedMotion={prefersReducedMotion} />

      {/* Panels 1-4: Principle Frames */}
      {principles.map((principle, index) => (
        <PrinciplePanel
          key={index}
          principle={principle}
          index={index}
          onBodyVisible={index === 0 ? handleFirstPrincipleBodyVisible : undefined}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </section>
  );
}
