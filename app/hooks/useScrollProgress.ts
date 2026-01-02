'use client';

import { useState, useEffect } from 'react';

/**
 * useScrollProgress - Track scroll progress from 0 to 1
 * @returns Scroll progress value between 0 and 1
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    // Initial calculation
    updateProgress();

    // Update on scroll (throttled via passive event)
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progress;
}
