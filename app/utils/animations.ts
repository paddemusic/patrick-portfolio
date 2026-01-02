/**
 * Animation Utilities - Reusable Framer Motion variants and helpers
 * GPU-accelerated, optimized for performance
 */

import { Variants } from 'framer-motion';
import { tokens } from '@/app/styles/tokens';

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    transform: 'translateZ(0)', // GPU acceleration
  },
  animate: {
    opacity: 1,
    transition: {
      duration: tokens.animation.duration.normal,
      ease: tokens.animation.easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: tokens.animation.duration.fast,
    },
  },
};

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    transform: 'translateZ(0)',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.animation.duration.slow,
      ease: tokens.animation.easing.smooth,
    },
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.animation.duration.slow,
      ease: tokens.animation.easing.smooth,
    },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    transform: 'translateZ(0)',
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

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: tokens.animation.duration.fast,
      ease: tokens.animation.easing.smooth,
    },
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: tokens.animation.stagger.normal,
      delayChildren: tokens.animation.delay.short,
    },
  },
};

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

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: tokens.animation.duration.slow,
      ease: tokens.animation.easing.smooth,
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: tokens.animation.duration.slow,
      ease: tokens.animation.easing.smooth,
    },
  },
};

// ============================================
// CURSOR-FOLLOWING GRADIENT
// ============================================

interface CursorGradientOptions {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
}

export const calculateCursorGradient = (
  x: number,
  y: number,
  element: HTMLElement,
  options: CursorGradientOptions = {}
): string => {
  const {
    size = 600,
    color = '59, 130, 246', // RGB for blue
    opacity = 0.15,
    blur = 80,
  } = options;

  const rect = element.getBoundingClientRect();
  const xPos = ((x - rect.left) / rect.width) * 100;
  const yPos = ((y - rect.top) / rect.height) * 100;

  return `radial-gradient(${size}px at ${xPos}% ${yPos}%, rgba(${color}, ${opacity}), transparent ${blur}%)`;
};

// ============================================
// SCROLL REVEAL
// ============================================

export const scrollReveal = (delay: number = 0): Variants => ({
  initial: {
    opacity: 0,
    y: 50,
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

// ============================================
// TEXT REVEAL (Letter by letter)
// ============================================

export const textRevealContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const textRevealLetter: Variants = {
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

// ============================================
// ROLLING HOVER (Letter rotation)
// ============================================

export const rollingHoverContainer: Variants = {
  initial: {},
  hover: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const rollingHoverLetter: Variants = {
  initial: {
    rotateX: 0,
    y: 0,
  },
  hover: {
    rotateX: [0, -90, -90, 0],
    y: [0, -5, -5, 0],
    transition: {
      duration: 0.4,
      ease: tokens.animation.easing.smooth,
      times: [0, 0.3, 0.7, 1],
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a custom spring animation
 */
export const spring = (stiffness: number = 100, damping: number = 10) => ({
  type: 'spring' as const,
  stiffness,
  damping,
});

/**
 * Creates a custom tween animation
 */
export const tween = (duration: number = 0.4, ease: readonly number[] = tokens.animation.easing.smooth) => ({
  type: 'tween' as const,
  duration,
  ease,
});

/**
 * Generates stagger delay for item at index
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

/**
 * Check if user prefers reduced motion
 */
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation variant respecting user's motion preferences
 */
export const getMotionVariant = (variant: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      initial: variant.animate,
      animate: variant.animate,
    };
  }
  return variant;
};

// ============================================
// SCROLL CHOREOGRAPHY (Reference-style timing)
// ============================================

/**
 * Reference site stagger timing (0.165s between items)
 */
export const getReferenceStagger = (index: number): number => {
  return index * 0.165;
};

/**
 * Reference-style scroll reveal with exact timing
 */
export const referenceScrollReveal = (index: number = 0): Variants => ({
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      delay: getReferenceStagger(index),
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1], // Reference easing
    },
  },
});

/**
 * Viewport configuration for early reveal (reference pattern)
 */
export const viewportConfig = {
  once: true,
  margin: '-20%', // Start animation before element enters
};

/**
 * Chain reaction configuration
 * Section A exit range → Section B entrance range with overlap
 */
export const createChainReaction = (
  sectionIndex: number,
  totalSections: number
) => {
  const progressPerSection = 1 / totalSections;
  const start = sectionIndex * progressPerSection;
  const mid = start + progressPerSection * 0.5;
  const end = start + progressPerSection;

  return {
    exit: [start + progressPerSection * 0.3, start + progressPerSection * 0.6] as [number, number],
    enter: [start + progressPerSection * 0.4, start + progressPerSection * 0.7] as [number, number],
    progress: [start, end] as [number, number],
  };
};

/**
 * Standard scroll-triggered item animation (reference timing)
 */
export const scrollItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
