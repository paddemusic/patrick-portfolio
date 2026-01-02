'use client';

import { useState, useEffect, RefObject } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface UseCursorPositionOptions {
  elementRef?: RefObject<HTMLElement | null>;
  throttleMs?: number;
}

/**
 * useCursorPosition - Track cursor position globally or relative to an element
 * @param options - Configuration options
 * @returns Current cursor position {x, y}
 */
export function useCursorPosition(options: UseCursorPositionOptions = {}): CursorPosition {
  const { elementRef, throttleMs = 16 } = options; // 16ms ~= 60fps

  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastUpdate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();

      // Throttle updates for performance
      if (now - lastUpdate < throttleMs) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          updatePosition(e);
        }, throttleMs - (now - lastUpdate));
        return;
      }

      lastUpdate = now;
      updatePosition(e);
    };

    const updatePosition = (e: MouseEvent) => {
      if (elementRef?.current) {
        // Position relative to element
        const rect = elementRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        // Global position
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [elementRef, throttleMs]);

  return position;
}
