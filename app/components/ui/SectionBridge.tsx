'use client';

import { motion } from 'framer-motion';
import { smoothReveal } from '@/app/utils/motion';

interface SectionBridgeProps {
  text: string;
  fromSection?: string;
  className?: string;
}

/**
 * SectionBridge - Minimal transitional microcopy between sections
 * Helps users understand context and creates smoother flow
 */
export default function SectionBridge({ text, fromSection, className = '' }: SectionBridgeProps) {
  return (
    <motion.div
      variants={smoothReveal(0.1)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-10%' }}
      className={`text-xs text-gray-600 tracking-widest mb-12 ${className}`}
      aria-label={fromSection ? `Transitioning from ${fromSection}` : 'Section transition'}
    >
      {text}
    </motion.div>
  );
}
