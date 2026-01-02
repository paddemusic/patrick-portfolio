'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/app/styles/tokens';
import { rollingHoverContainer, rollingHoverLetter } from '@/app/utils/animations';

interface RollingTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: keyof typeof tokens.typography.fontSize;
  weight?: keyof typeof tokens.typography.fontWeight;
  className?: string;
}

/**
 * RollingText - Text with letter-by-letter rolling animation on hover
 * Each letter rotates individually with a stagger effect
 */
export default function RollingText({
  children,
  as = 'h1',
  size = 'hero',
  weight = 'semibold',
  className = '',
}: RollingTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Component = motion[as] as any;

  // Split text into individual letters while preserving spaces
  const letters = children.split('').map((char, index) => ({
    char,
    key: `${char}-${index}`,
    isSpace: char === ' ',
  }));

  const styles = {
    fontSize: tokens.typography.fontSize[size],
    fontWeight: tokens.typography.fontWeight[weight],
    fontFamily: tokens.typography.fontFamily.sans,
    lineHeight: tokens.typography.lineHeight.tight,
    letterSpacing: tokens.typography.letterSpacing.tight,
    display: 'inline-block',
    cursor: 'default',
  };

  return (
    <Component
      className={className}
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={rollingHoverContainer}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
    >
      {letters.map(({ char, key, isSpace }) => (
        <motion.span
          key={key}
          variants={rollingHoverLetter}
          style={{
            display: 'inline-block',
            transformOrigin: '50% 100%',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            minWidth: isSpace ? '0.3em' : undefined,
          }}
        >
          {isSpace ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
}
