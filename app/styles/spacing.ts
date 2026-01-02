/**
 * Editorial Spacing System
 * Shared constants for consistent rhythm across all sections
 */

export const EDITORIAL_SPACING = {
  // Section vertical padding
  sectionPaddingTop: 'clamp(8rem, 15vh, 12rem)',    // 128-192px
  sectionPaddingBottom: 'clamp(8rem, 15vh, 12rem)', // 128-192px

  // Contact/Music extended padding
  endSectionPaddingTop: 'clamp(12rem, 20vh, 16rem)',    // 192-256px
  endSectionPaddingBottom: 'clamp(12rem, 20vh, 16rem)', // 192-256px

  // Philosophy/Panel baseline offset
  panelTopOffset: 'clamp(12vh, 15vh, 18vh)', // Consistent headline baseline from top

  // Intro gap (space after section heading block)
  introGap: 'clamp(4rem, 8vh, 6rem)', // 64-96px

  // Internal component spacing
  componentGapSmall: 'clamp(1.5rem, 3vh, 2rem)',   // 24-32px
  componentGapMedium: 'clamp(2rem, 4vh, 3rem)',    // 32-48px
  componentGapLarge: 'clamp(3rem, 6vh, 5rem)',     // 48-80px
  componentGapXLarge: 'clamp(4rem, 8vh, 6rem)',    // 64-96px

  // Panel silence
  panelMinHeight: 'clamp(70vh, 80vh, 85vh)', // Consistent panel height
  introMinHeight: 'clamp(70vh, 75vh, 80vh)', // Intro frame height
} as const;

export const EDITORIAL_TYPOGRAPHY = {
  // Section labels (PHILOSOPHY, WORKS, etc.)
  labelSize: 'clamp(0.75rem, 1.25vw, 0.875rem)',
  labelSpacing: 'widest', // tracking-widest

  // Section headings (H2)
  h2Size: 'clamp(2.5rem, 5vw, 4rem)',
  h2LineHeight: '1.2',
  h2LetterSpacing: '-0.02em',
  h2MaxWidth: '30ch', // 28-32ch range

  // Subsection headings (H3) - Works titles, Philosophy principles
  h3Size: 'clamp(1.75rem, 3.5vw, 2.5rem)',
  h3LineHeight: '1.3',
  h3LetterSpacing: '-0.015em',
  h3MaxWidth: '25ch', // 22-28ch range

  // Body text
  bodySize: 'clamp(1rem, 2vw, 1.125rem)',
  bodyLineHeight: '1.6',
  bodyLetterSpacing: '-0.01em',
  bodyMaxWidth: '60ch', // 55-65ch range

  // Intro/description text (slightly larger)
  introSize: 'clamp(1.125rem, 2.25vw, 1.25rem)',
  introLineHeight: '1.6',
  introMaxWidth: '65ch', // 60-70ch range
} as const;

export const CARD_STYLES = {
  // Unified card background system
  background: 'bg-zinc-950/50',
  backgroundHover: 'hover:bg-zinc-900/50',
  border: 'border-zinc-800/50',
  borderHover: 'hover:border-zinc-700',
  borderRadius: 'rounded-xl',

  // Card padding
  padding: 'clamp(1.5rem, 3vh, 2.5rem)',
} as const;
