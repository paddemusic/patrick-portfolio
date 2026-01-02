/**
 * Premium Motion System
 *
 * Inspired by staged reveals from reference site (ghuynguyen.vercel.app)
 * but extended for slow, intentional, editorial pacing.
 *
 * Key principles:
 * - One primary element animates per viewport
 * - Headlines first, body second, metadata third
 * - Extended durations (1200-1800ms vs reference's 600ms)
 * - Gentle easing curves
 * - Scroll resistance through staged state changes
 */

import { Variants } from 'framer-motion';

/**
 * TIMING SYSTEM
 * Reference uses 600ms - we extend to 1200-1800ms for premium feel
 */
export const premiumDurations = {
  instant: 0.2,
  fast: 0.6,      // Reference baseline
  normal: 1.2,    // 2x reference (our new baseline)
  slow: 1.8,      // 3x reference (for primary elements)
  slower: 2.4,    // 4x reference (for hero moments)
} as const;

/**
 * EASING CURVES
 * Reference: cubic-bezier(0.76, 0, 0.24, 1) - aggressive ease-out
 * Premium: Gentler curves with longer decay
 */
export const premiumEasing = {
  // Gentle ease-out (primary elements)
  gentle: [0.25, 0.1, 0.25, 1.0],

  // Soft ease-in-out (secondary elements)
  soft: [0.45, 0.05, 0.55, 0.95],

  // Emphasized ease-out (hero moments)
  emphasized: [0.2, 0.0, 0.2, 1.0],

  // Decelerated (metadata, supporting elements)
  decelerated: [0.3, 0.0, 0.1, 1.0],
} as const;

/**
 * SEQUENCING DELAYS
 * Reference: 15ms letter stagger
 * Premium: Extended to 200-400ms element stagger
 */
export const premiumDelays = {
  // Between hierarchy levels (headline → body → meta)
  hierarchy: 0.4,

  // Between sibling elements (card 1 → card 2)
  siblings: 0.3,

  // Between child elements (word-by-word, line-by-line)
  children: 0.15,

  // Scroll resistance delay (animation before scroll)
  resistance: 0.2,
} as const;

/**
 * STAGED TEXT REVEAL
 * Inspired by reference's letter-by-letter reveals
 * Applied to words/lines instead of letters for editorial feel
 */
export const stagedText: Variants = {
  hidden: {
    opacity: 0,
    y: 40, // Vertical translation like reference
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: premiumDurations.normal,
      ease: premiumEasing.gentle,
    },
  },
};

/**
 * HEADLINE REVEAL
 * First in sequence, most prominent
 */
export const headlineReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60, // Larger translation for headlines
    scale: 0.98, // Subtle scale for weight
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: premiumDurations.slow,
      ease: premiumEasing.emphasized,
    },
  },
};

/**
 * BODY TEXT REVEAL
 * Second in sequence, follows headline
 */
export const bodyReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: premiumDurations.normal,
      ease: premiumEasing.gentle,
      delay: premiumDelays.hierarchy, // Waits for headline
    },
  },
};

/**
 * METADATA REVEAL
 * Third in sequence, most subtle
 */
export const metadataReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: premiumDurations.fast,
      ease: premiumEasing.decelerated,
      delay: premiumDelays.hierarchy * 2, // Waits for body
    },
  },
};

/**
 * WEIGHTY CARD ENTRANCE
 * For Works section - slow, intentional
 */
export const weightyCard: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: premiumDurations.slow,
      ease: premiumEasing.emphasized,
      delay: index * premiumDelays.siblings,
    },
  }),
};

/**
 * TIMELINE STATE REVEAL
 * State-based, not scroll-distance-based
 */
export const timelineState: Variants = {
  hidden: {
    opacity: 0,
    x: -60, // Horizontal from timeline line
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: premiumDurations.normal,
      ease: premiumEasing.gentle,
      delay: index * premiumDelays.siblings,
    },
  }),
};

/**
 * MINIMAL GALLERY MOTION
 * Let images breathe - subtle fade only
 */
export const minimalImage: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      duration: premiumDurations.slow,
      ease: premiumEasing.soft,
      delay: index * 0.1, // Tight stagger
    },
  }),
};

/**
 * SCROLL RESISTANCE
 * Animation state changes before allowing scroll
 */
export const scrollResistance = {
  threshold: 0.5, // 50% visibility before triggering
  rootMargin: '0px 0px -20% 0px', // Trigger earlier
  triggerOnce: true, // State change, not continuous
};

/**
 * INTERSECTION OBSERVER CONFIG
 * For state-based reveals
 */
export const premiumObserverConfig = {
  threshold: 0.3, // 30% visible to trigger
  rootMargin: '-10% 0px -30% 0px', // Offset for natural timing
  triggerOnce: true, // One-time state change
};

/**
 * HERO-SPECIFIC MOTION
 * Staged name reveal with scroll resistance
 */

// Hero name word reveal (primary element)
export const heroNameWord: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 2.2, // 2.0-2.4s range
      ease: premiumEasing.emphasized,
    },
  },
};

// Hero tagline (secondary element)
export const heroTagline: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4, // 1.2-1.6s range
      ease: premiumEasing.gentle,
    },
  },
};

// Hero metadata (corner details, footer)
export const heroMetadata: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

/**
 * HERO TIMING SEQUENCE
 * Choreographed delays for staged reveal
 */
export const heroTiming = {
  // Name words
  firstWord: 0,           // "patrick" starts immediately
  secondWord: 0.4,        // "jørgensen" starts 400ms after first

  // Tagline
  tagline: 1.0,           // Starts after first word has begun

  // Metadata (staggered)
  metadataStart: 2.4,     // Starts after tagline begins
  metadataStagger: 0.25,  // 250ms between each metadata element

  // Scroll unlock
  scrollUnlock: 2.9,      // After metadata starts animating (~50% opacity)

  // Mobile multiplier
  mobileMultiplier: 0.7,  // 70% of desktop timing on mobile
} as const;

/**
 * ABOUT-SPECIFIC MOTION
 * Hierarchical reveal: Label → Headline → Body → Photos
 */

// About section label
export const aboutLabel: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

// About headline (primary element)
export const aboutHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.9, // 1.8-2.0s range
      ease: premiumEasing.emphasized,
    },
  },
};

// About body text (secondary element)
export const aboutBody: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // 1.0-1.2s range
      ease: premiumEasing.gentle,
    },
  },
};

// About photos (minimal motion)
export const aboutPhoto: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // 1.0-1.2s range
      ease: premiumEasing.gentle,
    },
  },
};

/**
 * ABOUT TIMING SEQUENCE
 * Hierarchical choreography
 */
export const aboutTiming = {
  // Stage 1: Label
  label: 0,

  // Stage 2: Headline (starts after label begins)
  headline: 0.35,         // 0.3-0.4s after label

  // Stage 3: Body (starts after headline begins)
  body: 0.9,              // headline(0.35) + 0.5-0.6s delay

  // Stage 4: Photos (starts after body begins)
  photosStart: 1.6,       // body(0.9) + 0.6-0.8s delay
  photoStagger: 0.15,     // 0.1-0.2s between photos

  // Section completion (for AtmosphereBreak unlock)
  bodyVisible: 1.5,       // When body becomes visible enough for next section
} as const;

/**
 * PHILOSOPHY-SPECIFIC MOTION
 * High resistance: One principle per viewport
 */

// Philosophy principle headline (primary element)
export const philosophyHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.9, // 1.8-2.0s range
      ease: premiumEasing.emphasized,
    },
  },
};

// Philosophy principle body (secondary element)
export const philosophyBody: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // 1.0-1.2s range
      ease: premiumEasing.gentle,
    },
  },
};

/**
 * PHILOSOPHY TIMING SEQUENCE
 * Per-principle choreography
 */
export const philosophyTiming = {
  // Stage A: Headline
  headline: 0,

  // Stage B: Body (starts after headline begins)
  body: 0.55,             // 0.5-0.6s after headline

  // Readiness markers (for Works gating)
  firstPrincipleBody: 1.6, // After first principle body visible
  allPrinciplesComplete: 2.0, // After last principle body visible
} as const;

/**
 * WORKS-SPECIFIC MOTION
 * Weighty proof delivery: Cards reveal with weight after Philosophy completion
 */

// Works section label
export const worksLabel: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

// Works headline (primary element)
export const worksHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.9, // 1.8-2.0s range
      ease: premiumEasing.emphasized,
    },
  },
};

// Works description (secondary element)
export const worksDescription: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // 1.0-1.2s range
      ease: premiumEasing.gentle,
    },
  },
};

// Works card - weighty entrance
export const worksCard: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 2.0, // Very weighty
      ease: premiumEasing.emphasized,
    },
  },
};

/**
 * WORKS TIMING SEQUENCE
 * Hierarchical choreography for proof section
 */
export const worksTiming = {
  // Stage 1: Label
  label: 0,

  // Stage 2: Headline (starts after label begins)
  headline: 0.35,         // 0.3-0.4s after label

  // Stage 3: Description (starts after headline begins)
  description: 0.9,       // headline(0.35) + 0.5-0.6s delay

  // Stage 4: Cards (starts after description begins)
  cardsStart: 1.6,        // description(0.9) + 0.6-0.8s delay
  cardStagger: 0.4,       // 0.4s between each card

  // Readiness markers (for Partners gating)
  card2HalfOpacity: 2.4,  // cardsStart(1.6) + cardStagger(0.4) + (cardDuration(2.0) * 0.5) = 2.4s
} as const;

/**
 * PARTNERS-SPECIFIC MOTION
 * Quiet cultural signal: Quick reveal, then silence
 */

// Partners section label
export const partnersLabel: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

// Partners heading
export const partnersHeading: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4, // 1.2-1.6s range
      ease: premiumEasing.gentle,
    },
  },
};

// Partners logos - reveal simultaneously
export const partnersLogos: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // 1.0-1.2s range
      ease: premiumEasing.gentle,
    },
  },
};

/**
 * PARTNERS TIMING SEQUENCE
 * Quick reveal choreography
 */
export const partnersTiming = {
  // Stage 1: Label
  label: 0,

  // Stage 2: Heading (starts after label begins)
  heading: 0.15,          // 0.1-0.2s after label

  // Stage 3: Logos (starts after heading begins)
  logos: 0.45,            // heading(0.15) + 0.3s delay

  // Silence hold (for breath before Music)
  silenceHold: 0.5,       // ~0.5s pause after logos finish
} as const;

/**
 * MUSIC-SPECIFIC MOTION
 * Optional depth: Calm, curated, restrained
 */

// Music section label
export const musicLabel: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

// Music player container
export const musicPlayer: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5, // 1.4-1.6s range
      ease: premiumEasing.gentle,
    },
  },
};

// Music "Show more" button (optional)
export const musicShowMore: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

/**
 * MUSIC TIMING SEQUENCE
 * Medium tempo reveal
 */
export const musicTiming = {
  // Stage 1: Label
  label: 0,

  // Stage 2: Player (starts after label begins)
  player: 0.5,            // 0.4-0.6s after label

  // Stage 3: Show more (starts after player begins)
  showMore: 2.0,          // player(0.5) + 1.5s (player duration)
} as const;

/**
 * CONTACT-SPECIFIC MOTION
 * Final authored frame: Calm, minimal, decisive
 */

// Contact section label
export const contactLabel: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7, // 0.6-0.8s range
      ease: premiumEasing.decelerated,
    },
  },
};

// Contact heading
export const contactHeading: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.8, // 1.6-2.0s range
      ease: premiumEasing.emphasized,
    },
  },
};

// Contact primary CTA (email)
export const contactCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // 1.0-1.2s range
      ease: premiumEasing.gentle,
    },
  },
};

// Contact secondary items (grouped)
export const contactSecondary: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEasing.gentle,
    },
  },
};

/**
 * CONTACT TIMING SEQUENCE
 * End cap choreography
 */
export const contactTiming = {
  // Stage 1: Label
  label: 0,

  // Stage 2: Heading (starts after label begins)
  heading: 0.35,          // 0.3-0.4s after label

  // Stage 3: Primary CTA (starts after heading begins)
  cta: 0.95,              // heading(0.35) + 0.5-0.6s delay

  // Stage 4: Secondary items (starts after CTA begins)
  secondary: 2.05,        // cta(0.95) + cta duration(1.1s)
} as const;
