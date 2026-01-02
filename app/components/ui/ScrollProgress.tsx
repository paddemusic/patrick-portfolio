'use client';

import { motion } from 'framer-motion';
import { useScrollProgress } from '@/app/hooks';
import { tokens } from '@/app/styles/tokens';

/**
 * ScrollProgress - Minimalist progress bar at top
 * Pure white, no gradients - matches design philosophy
 */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-white/20 origin-left"
      style={{
        scaleX: progress,
        zIndex: tokens.zIndex.fixed,
      }}
      initial={{ scaleX: 0 }}
      transition={{
        duration: tokens.animation.duration.fast,
        ease: tokens.animation.easing.smooth,
      }}
    />
  );
}
