'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });
    };

    // Add cursor follower
    document.addEventListener('mousemove', moveCursor);

    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll(
      'a, button, [data-magnetic]'
    );

    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);

      el.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (el as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom cursor ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 z-[10000] mix-blend-difference hidden md:block"
      />
      {/* Custom cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-[10000] mix-blend-difference hidden md:block"
      />
    </>
  );
}
