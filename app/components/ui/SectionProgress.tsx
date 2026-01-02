'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { tokens } from '@/app/styles/tokens';

// All sections in order
const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'atmosphere-break', label: 'Atmosphere' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'work', label: 'Works' },
  { id: 'partners', label: 'Partners' },
  { id: 'media', label: 'Music' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * SectionProgress - Minimalist vertical dot indicator
 * Shows current section and overall scroll progress
 * Accessible and reduced-motion friendly
 */
export default function SectionProgress() {
  const [activeSection, setActiveSection] = useState('hero');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollYProgress } = useScroll();

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Track active section
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(element, {
        offset: -80,
        duration: 1.2,
      });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate progress percentage
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[1100] hidden lg:block"
      aria-label="Section navigation"
      role="navigation"
    >
      <div className="flex flex-col items-center gap-3">
        {sections.map(({ id, label }, index) => {
          const isActive = activeSection === id;

          return (
            <motion.button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative focus:outline-none"
              whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              transition={{ duration: tokens.animation.duration.fast }}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? 'location' : undefined}
            >
              {/* Dot indicator */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-white scale-125'
                    : 'bg-gray-600 group-hover:bg-gray-400 group-focus:bg-gray-400'
                }`}
              />

              {/* Tooltip on hover */}
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md whitespace-nowrap">
                  <span className="text-xs text-white tracking-wide">{label}</span>
                </div>
              </div>

              {/* Focus ring */}
              <div className="absolute inset-0 -m-2 rounded-full border-2 border-white/20 opacity-0 group-focus:opacity-100 transition-opacity" />
            </motion.button>
          );
        })}
      </div>

      {/* Scroll progress line */}
      <div className="absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-px -z-10">
        <div className="absolute inset-0 bg-gray-800/50" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-white/30"
          style={{ height: progress }}
        />
      </div>
    </motion.aside>
  );
}
