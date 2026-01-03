'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useState, useEffect, useRef, RefObject } from 'react';
import SectionBridge from './ui/SectionBridge';
import { useSectionReadiness } from '@/app/context/SectionReadiness';
import { EDITORIAL_SPACING, EDITORIAL_TYPOGRAPHY, CARD_STYLES } from '@/app/styles/spacing';
import { worksImages } from '@/app/content/imageManifest';

interface WorkProps {
  exitRef?: RefObject<HTMLDivElement | null>;
}

interface Project {
  id: string;
  title: string;
  role: string; // More scannable than "category"
  year: string;
  impact: string; // Outcome-first summary (1 line)
  metric?: {
    value: string; // e.g., "38.3K"
    label: string; // e.g., "followers gained"
  };
  client?: string;
  image: string;
  link?: string; // Optional project link
}

const projects: Project[] = [
  {
    id: '1',
    title: 'TV2 Election Coverage 2023',
    role: 'Social Media Strategy',
    year: '2023',
    impact: 'Reached millions during Norwegian election with strategic Instagram campaigns.',
    metric: {
      value: '38.3K',
      label: 'new followers',
    },
    client: 'TV2',
    image: worksImages[0].src, // election-tv2.jpg
  },
  {
    id: '3',
    title: 'Music Career',
    role: 'Artist & Brand Builder',
    year: '2015-2021',
    impact: 'Built audience from zero through strategic releases and live performances.',
    metric: {
      value: '300M',
      label: 'total plays',
    },
    image: worksImages[1].src, // album-cover.png
  },
  {
    id: '5',
    title: 'AI-Powered Workflows',
    role: 'Technology Integration',
    year: '2023-2024',
    impact: 'Mastered AI tools to build custom workflows for modern content production.',
    image: worksImages[2].src, // hoodie.png
  },
];

/**
 * ProjectCard - Cinematic proof reveal with weight + depth
 * Driven from Works section isInView state (no per-card whileInView)
 */
function ProjectCard({
  project,
  index,
  canTrigger,
  isInView,
  prefersReducedMotion,
}: {
  project: Project;
  index: number;
  canTrigger: boolean;
  isInView: boolean;
  prefersReducedMotion: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  // Track mouse position for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice || prefersReducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && !prefersReducedMotion) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Calculate tilt based on mouse position
  const getTiltStyle = () => {
    if (!isHovering || isTouchDevice || prefersReducedMotion) {
      return {};
    }

    // Map 0-1 to -8 to 8 degrees
    const tiltX = (mousePosition.y - 0.5) * -16; // Inverted for natural feel
    const tiltY = (mousePosition.x - 0.5) * 16;

    return {
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px) scale(1.01)`,
    };
  };
  // Cinematic card variant - weight + soft depth
  const cardVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 28,
      scale: 0.985,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  };

  // Reduced motion override
  const getVariant = (baseVariant: Variants): Variants => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }
    return baseVariant;
  };

  // Card timing: base delay 0.9s + stagger 0.22s per card
  const cardDelay = 0.9 + index * 0.22;

  return (
    <motion.article
      variants={getVariant(cardVariant)}
      initial="hidden"
      animate={canTrigger && isInView ? 'visible' : 'hidden'}
      transition={{
        delay: prefersReducedMotion ? index * 0.1 : cardDelay,
        duration: prefersReducedMotion ? 0.3 : 1.6,
        ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
      }}
      className="group relative"
    >
      <motion.a
        ref={cardRef}
        href={project.link || `#${project.id}`}
        className={`block ${CARD_STYLES.background} border ${CARD_STYLES.border} ${CARD_STYLES.borderRadius} transition-all duration-500 ${CARD_STYLES.borderHover} ${CARD_STYLES.backgroundHover}
                   focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black overflow-hidden`}
        style={{
          padding: CARD_STYLES.padding,
          position: 'relative',
          ...(isTouchDevice || prefersReducedMotion ? {} : getTiltStyle()),
          transition: 'transform 0.15s ease-out, border-color 0.5s, background-color 0.5s',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sheen gradient that follows cursor */}
        {isHovering && !isTouchDevice && !prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.06), transparent 40%)`,
              zIndex: 1,
            }}
          />
        )}
        {/* Film Still Image - Top on mobile, right on desktop */}
        <div className="relative mb-6 lg:float-right lg:ml-6 lg:mb-0 overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} - ${project.role}`}
            className="w-full lg:w-64 object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              maxHeight: '220px',
              filter: 'grayscale(45%)',
              opacity: 0.9,
            }}
          />
          {/* Subtle overlay to keep it subdued */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/30" />
        </div>

        {/* Header: Title + Year - Increased spacing */}
        <div className="flex items-start justify-between gap-4" style={{ marginBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
          <h3
            className="font-light text-white flex-1 group-hover:text-gray-200 transition-colors"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', // Card title size
              lineHeight: '1.4',
              letterSpacing: '-0.015em'
            }}
          >
            {project.title}
          </h3>
          <span
            className="text-gray-600 tracking-wider shrink-0"
            style={{
              fontSize: 'clamp(0.75rem, 1.25vw, 0.8125rem)',
              opacity: 0.5,
              marginTop: '0.25rem'
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Role + Client - Clearer hierarchy */}
        <div
          className="flex flex-wrap items-center gap-2"
          style={{ marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }}
        >
          <span
            className="text-gray-400 font-light"
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)',
              opacity: 0.85
            }}
          >
            {project.role}
          </span>
          {project.client && (
            <>
              <span className="text-gray-700" style={{ opacity: 0.5 }}>·</span>
              <span
                className="text-gray-500"
                style={{
                  fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)',
                  opacity: 0.65
                }}
              >
                {project.client}
              </span>
            </>
          )}
        </div>

        {/* Impact Summary - Increased line height for calm */}
        <p
          className="text-gray-400 max-w-2xl"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: '1.8', // More relaxed
            opacity: 0.85,
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)'
          }}
        >
          {project.impact}
        </p>

        {/* Metric Chip - More dominant */}
        {project.metric && (
          <div
            className="inline-flex items-baseline gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-full"
            style={{ marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }}
          >
            <span
              className="font-light text-white tabular-nums"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', // Larger metric
                lineHeight: '1'
              }}
            >
              {project.metric.value}
            </span>
            <span
              className="text-gray-500 tracking-wide"
              style={{
                fontSize: 'clamp(0.75rem, 1.25vw, 0.8125rem)',
                opacity: 0.65
              }}
            >
              {project.metric.label}
            </span>
          </div>
        )}

        {/* View Project Link - Subtle */}
        <div
          className="flex items-center gap-2 text-gray-500 group-hover:text-gray-300 transition-colors"
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)',
            opacity: 0.65
          }}
        >
          <span className="tracking-wide">(view project)</span>
          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }} // Slower arrow
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </div>
      </motion.a>
    </motion.article>
  );
}

/**
 * Work Section - Cinematic "proof reveal"
 * Heading resolves like title card, cards arrive with weight + depth
 * Safe trigger model: no gating, visible by default
 */
export default function Work({ exitRef }: WorkProps = {}) {
  const { markSectionReady } = useSectionReadiness();
  const [canTrigger, setCanTrigger] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const headerRef = useRef(null);

  // State-based trigger - safe for fast scroll
  const isInView = useInView(headerRef, {
    once: true,
    amount: 0.25, // 25% visibility
    margin: '-10% 0px -25% 0px', // Scroll resistance
  });

  // Cinematic heading variants - match Hero/Philosophy focus-pull language
  const headlineVariant: Variants = {
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

  const descriptionVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(3px)',
      y: 14,
    },
    visible: {
      opacity: 0.9,
      scale: 1,
      filter: 'blur(1px)',
      y: 0,
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

  // No Philosophy gating - triggers immediately when in view
  useEffect(() => {
    setCanTrigger(true);
  }, []);

  // Mark Works ready when Card 2 completes (for Partners gating)
  useEffect(() => {
    if (!canTrigger || !isInView) return;

    // Card 2: delay 0.9s + 0.22s + duration 1.6s = 2.72s
    const timer = setTimeout(() => {
      markSectionReady('works');
    }, 2720);

    return () => clearTimeout(timer);
  }, [canTrigger, isInView, markSectionReady]);

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
      id="work"
      ref={headerRef}
      className="relative"
      style={{
        paddingTop: EDITORIAL_SPACING.sectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.sectionPaddingBottom,
      }}
    >
      {/* Section Header - Cinematic title card reveal */}
      <div className="container mx-auto px-6" style={{ marginBottom: EDITORIAL_SPACING.introGap }}>
        {/* Section bridge */}
        <SectionBridge
          text="exploring the work"
          fromSection="philosophy"
          className="mb-8"
        />

        {/* Label - Simple fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={canTrigger && isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.6,
          }}
          className="text-gray-600 tracking-widest mb-8"
          style={{ fontSize: EDITORIAL_TYPOGRAPHY.labelSize }}
        >
          (WORKS)
        </motion.div>

        {/* Headline - Cinematic focus pull */}
        <motion.h2
          variants={getVariant(headlineVariant, 1)}
          initial="hidden"
          animate={canTrigger && isInView ? 'visible' : 'hidden'}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 1.4,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="font-light text-white mb-6"
          style={{
            fontSize: EDITORIAL_TYPOGRAPHY.h2Size,
            lineHeight: EDITORIAL_TYPOGRAPHY.h2LineHeight,
            letterSpacing: EDITORIAL_TYPOGRAPHY.h2LetterSpacing,
            maxWidth: EDITORIAL_TYPOGRAPHY.h2MaxWidth,
          }}
        >
          selected projects
        </motion.h2>

        {/* Description - Cinematic focus pull, delayed 0.3s */}
        <motion.p
          variants={getVariant(descriptionVariant, 0.9)}
          initial="hidden"
          animate={canTrigger && isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0.3,
            duration: prefersReducedMotion ? 0.3 : 1.1,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="text-gray-400"
          style={{
            fontSize: EDITORIAL_TYPOGRAPHY.bodySize,
            lineHeight: EDITORIAL_TYPOGRAPHY.bodyLineHeight,
            maxWidth: EDITORIAL_TYPOGRAPHY.bodyMaxWidth,
          }}
        >
          from entertainment to enterprise, each project is built on strategy, creativity, and proven results.
        </motion.p>
      </div>

      {/* Projects Grid - Weighty cards with stagger */}
      <div className="container mx-auto px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto"
          style={{ gap: 'clamp(2rem, 4vh, 3rem)' }} // Breathing room between cards
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              canTrigger={canTrigger}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Kinetic link anchor - exit point for mechanical transition to Partners */}
      {exitRef && (
        <div
          id="work-exit-anchor"
          ref={exitRef}
          className="absolute bottom-0 left-0 right-0 h-px w-full"
          style={{ zIndex: 1 }}
        />
      )}
    </section>
  );
}
