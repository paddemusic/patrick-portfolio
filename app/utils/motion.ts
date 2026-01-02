/**
 * Motion utilities with reduced-motion support
 * Ensures animations respect user preferences for accessibility
 */

import { Variants } from 'framer-motion';
import { tokens } from '@/app/styles/tokens';

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Fade in animation - calm, editorial entrance
 * Reduced motion: opacity only, nearly instant
 */
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 30, // Slightly more distance for calm reveal
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.animation.duration.slow, // Slower for calm
      ease: tokens.animation.easing.gentle, // Gentler curve
    },
  },
};

/**
 * Fade in from left - respects reduced motion
 */
export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: tokens.animation.duration.normal,
      ease: tokens.animation.easing.smooth,
    },
  },
};

/**
 * Fade in from right - respects reduced motion
 */
export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: tokens.animation.duration.normal,
      ease: tokens.animation.easing.smooth,
    },
  },
};

/**
 * Scale in animation - respects reduced motion
 */
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: tokens.animation.duration.normal,
      ease: tokens.animation.easing.smooth,
    },
  },
};

/**
 * Stagger container - creates calm, intentional sequence
 * Headers first, content second, metadata last
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: tokens.animation.stagger.normal, // Slower stagger for calm
      delayChildren: tokens.animation.delay.short, // Small delay before starting
    },
  },
};

/**
 * Relaxed stagger for dense content (Skills, Timeline)
 */
export const staggerContainerRelaxed: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: tokens.animation.stagger.relaxed, // Very slow for editorial feel
      delayChildren: tokens.animation.delay.medium,
    },
  },
};

/**
 * Stagger item - child of staggerContainer
 */
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.animation.duration.normal,
      ease: tokens.animation.easing.smooth,
    },
  },
};

/**
 * Get animation props that respect reduced motion
 * Returns empty object if user prefers reduced motion
 */
export const getAnimationProps = (
  variants: Variants,
  options?: {
    whileInView?: boolean;
    viewport?: { once?: boolean; margin?: string };
    delay?: number;
  }
) => {
  // If reduced motion is preferred, return minimal animation
  if (prefersReducedMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.01 }, // Nearly instant
    };
  }

  // Normal animation
  const baseProps = {
    variants,
    initial: 'initial',
    ...(options?.whileInView ? { whileInView: 'animate' } : { animate: 'animate' }),
  };

  if (options?.viewport) {
    return {
      ...baseProps,
      viewport: options.viewport,
    };
  }

  if (options?.delay) {
    return {
      ...baseProps,
      transition: { delay: options.delay },
    };
  }

  return baseProps;
};

/**
 * Smooth reveal animation - gentle fade and slide
 * Perfect for section content
 */
export const smoothReveal = (delay: number = 0): Variants => ({
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.animation.duration.slow,
      ease: tokens.animation.easing.smooth,
      delay,
    },
  },
});

/**
 * Section entrance - for entire sections
 */
export const sectionEntrance: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: tokens.animation.duration.slower,
      ease: tokens.animation.easing.smooth,
    },
  },
};
