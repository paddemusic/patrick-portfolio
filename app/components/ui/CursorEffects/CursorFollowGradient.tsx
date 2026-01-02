'use client';

import { useRef, useEffect, useState } from 'react';
import { useCursorPosition } from '@/app/hooks';
import { calculateCursorGradient } from '@/app/utils/animations';

interface CursorFollowGradientProps {
  children: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientBlur?: number;
}

/**
 * CursorFollowGradient - Wraps content with cursor-following radial gradient effect
 * Perfect for Philosophy section and interactive areas
 */
export default function CursorFollowGradient({
  children,
  className = '',
  gradientSize = 600,
  gradientColor = '59, 130, 246', // Blue RGB
  gradientOpacity = 0.15,
  gradientBlur = 80,
}: CursorFollowGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = useState('');
  const { x, y } = useCursorPosition({ elementRef: containerRef, throttleMs: 16 });

  useEffect(() => {
    if (containerRef.current) {
      const newGradient = calculateCursorGradient(x, y, containerRef.current, {
        size: gradientSize,
        color: gradientColor,
        opacity: gradientOpacity,
        blur: gradientBlur,
      });
      setGradient(newGradient);
    }
  }, [x, y, gradientSize, gradientColor, gradientOpacity, gradientBlur]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        background: gradient,
      }}
    >
      {children}
    </div>
  );
}
