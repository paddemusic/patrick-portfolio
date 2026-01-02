/**
 * Design Tokens - Single source of truth for design system
 * Based on reference: https://ghuynguyen.vercel.app
 */

export const tokens = {
  // Color System
  colors: {
    background: {
      primary: '#000000',
      secondary: '#0a0a0a',
      tertiary: '#1a1a1a',
      hover: 'rgba(255, 255, 255, 0.05)',
      glass: 'rgba(0, 0, 0, 0.7)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a3a3a3',
      tertiary: '#737373',
      muted: '#525252',
    },
    accent: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      tertiary: '#ec4899',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(255, 255, 255, 0.2)',
    },
  },

  // Typography System - Editorial hierarchy with clear differentiation
  typography: {
    fontFamily: {
      sans: 'var(--font-instrument, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
      mono: 'var(--font-geist-mono, "SF Mono", Monaco, monospace)',
    },
    fontSize: {
      // Hero tier - Name, opening statements
      hero: 'clamp(3rem, 10vw, 6rem)',          // 48px - 96px (LARGER)

      // Section tier - Major section headings
      section: 'clamp(2.5rem, 6vw, 4rem)',      // 40px - 64px (Distinct from hero)

      // Subsection tier - Card titles, major statements
      subsection: 'clamp(1.75rem, 4vw, 2.5rem)', // 28px - 40px (Clear step down)

      // Card title tier - Project titles, timeline jobs
      cardTitle: 'clamp(1.25rem, 3vw, 1.75rem)', // 20px - 28px (Scannable)

      // Body tier - Descriptions, paragraphs
      bodyLarge: 'clamp(1.125rem, 2.5vw, 1.375rem)', // 18px - 22px (Comfortable reading)
      body: 'clamp(1rem, 2vw, 1.125rem)',       // 16px - 18px (Standard)

      // Meta tier - Labels, captions, supporting text
      meta: 'clamp(0.875rem, 1.5vw, 0.9375rem)', // 14px - 15px (Subtle)
      metaSmall: 'clamp(0.75rem, 1.25vw, 0.8125rem)', // 12px - 13px (Very subtle)
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: {
      tightest: 1.0,  // Hero text only
      tight: 1.2,     // Section headings
      snug: 1.4,      // Card titles
      normal: 1.6,    // Body text (INCREASED for calm)
      relaxed: 1.8,   // Long-form content (INCREASED)
      loose: 2.0,     // Spacious paragraphs
    },
    letterSpacing: {
      tighter: '-0.03em',  // Large headings
      tight: '-0.015em',   // Headings
      normal: '0',         // Body
      wide: '0.02em',      // Meta text
      wider: '0.05em',     // Section labels
      widest: '0.1em',     // Micro labels
    },
    // Opacity levels for hierarchy
    opacity: {
      primary: 1.0,      // Headings, key content
      secondary: 0.85,   // Body text
      tertiary: 0.65,    // Supporting text
      quaternary: 0.5,   // Meta labels
      muted: 0.35,       // Very subtle elements
    },
  },

  // Spacing System - Editorial rhythm with intentional breathing room
  spacing: {
    // Section-level spacing
    sectionVertical: 'clamp(8rem, 15vh, 12rem)',    // 128px - 192px (GENEROUS between sections)
    sectionHeader: 'clamp(4rem, 8vh, 6rem)',        // 64px - 96px (Above section content)

    // Content-level spacing
    contentBlock: 'clamp(3rem, 6vh, 4.5rem)',       // 48px - 72px (Between major blocks)
    paragraph: 'clamp(1.5rem, 3vh, 2rem)',          // 24px - 32px (Between paragraphs)

    // Component-level spacing
    cardGrid: 'clamp(2rem, 4vh, 3rem)',             // 32px - 48px (Between cards)
    cardInternal: 'clamp(1.5rem, 3vh, 2rem)',       // 24px - 32px (Inside cards)
    listItem: 'clamp(2.5rem, 5vh, 3.5rem)',         // 40px - 56px (Between list items)

    // Micro-level spacing
    gap: {
      xs: '0.5rem',     // 8px  - Tight inline elements
      sm: '0.75rem',    // 12px - Inline with breathing
      md: '1rem',       // 16px - Standard gap
      lg: '1.5rem',     // 24px - Comfortable gap
      xl: '2rem',       // 32px - Generous gap
      '2xl': '3rem',    // 48px - Very generous
      '3xl': '4rem',    // 64px - Section-level
    },

    // Container constraints for readability
    maxWidth: {
      text: '65ch',       // Optimal reading width (65 characters)
      textWide: '75ch',   // Slightly wider for headings
      card: '900px',      // Card max width
      container: '1400px', // Site max width
    },
  },

  // Animation System - Calm, intentional, hierarchy-focused
  animation: {
    duration: {
      instant: 0.15,   // Slightly slower for calm
      fast: 0.3,       // Increased from 0.2
      normal: 0.6,     // Increased from 0.4
      slow: 0.8,       // Increased from 0.6
      slower: 1.0,     // Increased from 0.8
      slowest: 1.4,    // Increased from 1.2 - very editorial
    },
    easing: {
      // Smooth, calm easing - no bounces, gentle curves
      smooth: [0.4, 0, 0.2, 1],        // Standard ease-out
      gentle: [0.25, 0.1, 0.25, 1],    // Very gentle, almost linear
      entrance: [0.25, 0, 0.1, 1],     // Soft entrance
      exit: [0.4, 0, 0.6, 1],          // Soft exit
    },
    delay: {
      none: 0,
      micro: 0.05,     // Very subtle stagger
      short: 0.15,     // Increased from 0.1
      medium: 0.3,     // Increased from 0.2
      long: 0.5,       // Increased from 0.4
      veryLong: 0.8,   // For very intentional pauses
    },
    stagger: {
      tight: 0.08,     // Tight stagger for related items
      normal: 0.15,    // Standard stagger (increased)
      relaxed: 0.25,   // Slow, editorial stagger
    },
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 20px rgba(59, 130, 246, 0.3)',
  },

  // Blur Effects
  blur: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
  },

  // Breakpoints (for reference)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  },
} as const;

// Type exports for TypeScript
export type TokenColors = typeof tokens.colors;
export type TokenTypography = typeof tokens.typography;
export type TokenAnimation = typeof tokens.animation;
