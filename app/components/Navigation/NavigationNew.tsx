'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/app/styles/tokens';
import { fadeIn } from '@/app/utils/animations';
import Image from 'next/image';

// Main navigation sections (visible in nav bar)
const sections = [
  { id: 'about', label: '(About)' },
  { id: 'philosophy', label: '(Philosophy)' },
  { id: 'work', label: '(Works)' },
  { id: 'contact', label: '(Contact)' },
] as const;

// All sections for scroll tracking (including those not in main nav)
const allSections = [
  'hero',
  'about',
  'atmosphere-break',
  'philosophy',
  'work',
  'partners',
  'media',
  'contact',
] as const;

export default function NavigationNew() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track active section with Intersection Observer - Enhanced for all sections
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px', // Adjusted for better section detection
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

    // Observe all sections, not just nav sections
    allSections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section - Enhanced with Lenis support
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get Lenis instance if available
      const lenis = (window as any).lenis;

      if (lenis) {
        // Use Lenis for butter-smooth scrolling
        lenis.scrollTo(element, {
          offset: -80, // Account for fixed header
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        // Fallback to native smooth scroll
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }

      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-${tokens.zIndex.sticky} transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center relative z-10"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: tokens.animation.duration.fast }}
            >
              <img
                src="/images/logo/patrick-logo.png"
                alt="Patrick Jørgensen"
                className="h-8 w-auto"
              />
            </motion.button>

            {/* Desktop Navigation - Enhanced with accessibility */}
            <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
              {sections.map(({ id, label }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-xs font-normal tracking-wide transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1 ${
                    activeSection === id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.15 }}
                  aria-label={`Navigate to ${id} section`}
                  aria-current={activeSection === id ? 'location' : undefined}
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-white"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: tokens.animation.duration.fast }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: tokens.animation.duration.fast }}
              />
              <motion.span
                className="w-6 h-0.5 bg-white"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: tokens.animation.duration.fast }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] bg-black md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: tokens.animation.duration.normal }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {sections.map(({ id, label }, index) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-3xl font-light tracking-wider ${
                    activeSection === id ? 'text-white' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: tokens.animation.duration.normal,
                    delay: index * 0.1,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
