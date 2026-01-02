'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { tokens } from '@/app/styles/tokens';
import { fadeInUp, scrollReveal } from '@/app/utils/animations';

interface FluidTextProps extends Omit<HTMLMotionProps<'h1'>, 'children'> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: keyof typeof tokens.typography.fontSize;
  weight?: keyof typeof tokens.typography.fontWeight;
  className?: string;
  animate?: boolean;
  delay?: number;
}

/**
 * FluidText - Responsive typography using clamp()
 * Automatically scales between min and max sizes based on viewport
 */
export default function FluidText({
  children,
  as = 'h1',
  size = 'hero',
  weight = 'normal',
  className = '',
  animate = true,
  delay = 0,
  ...props
}: FluidTextProps) {
  const Component = motion[as] as any;

  const styles = {
    fontSize: tokens.typography.fontSize[size],
    fontWeight: tokens.typography.fontWeight[weight],
    fontFamily: tokens.typography.fontFamily.sans,
    lineHeight: size === 'hero' || size === 'section' ? tokens.typography.lineHeight.tight : tokens.typography.lineHeight.normal,
    letterSpacing: size === 'hero' || size === 'section' ? tokens.typography.letterSpacing.tight : tokens.typography.letterSpacing.normal,
  };

  const animationVariant = animate ? scrollReveal(delay) : undefined;

  return (
    <Component
      className={className}
      style={styles}
      variants={animationVariant}
      initial={animate ? 'initial' : undefined}
      whileInView={animate ? 'animate' : undefined}
      viewport={{ once: true, margin: '-100px' }}
      {...props}
    >
      {children}
    </Component>
  );
}
