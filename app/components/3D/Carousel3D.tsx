'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { tokens } from '@/app/styles/tokens';

interface Carousel3DItem {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  gradient?: string;
}

interface Carousel3DProps {
  items: Carousel3DItem[];
  onItemClick?: (item: Carousel3DItem) => void;
}

/**
 * Carousel3D - 3D perspective carousel for showcasing projects
 * Features drag interaction and automatic rotation
 */
export default function Carousel3D({ items, onItemClick }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isDragging) {
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isDragging, items.length]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 50;

    if (info.offset.x > threshold) {
      // Dragged right - go to previous
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (info.offset.x < -threshold) {
      // Dragged left - go to next
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px]">
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="sync">
          {items.map((item, index) => {
            const offset = (index - currentIndex + items.length) % items.length;
            const isCenter = offset === 0;
            const isAdjacent = offset === 1 || offset === items.length - 1;
            const isVisible = offset <= 2 || offset >= items.length - 2;

            if (!isVisible) return null;

            let xOffset = 0;
            let zOffset = 0;
            let rotateY = 0;
            let scale = 0.6;
            let opacity = 0.4;

            if (offset === 0) {
              // Center
              xOffset = 0;
              zOffset = 0;
              rotateY = 0;
              scale = 1;
              opacity = 1;
            } else if (offset === 1) {
              // Right
              xOffset = 300;
              zOffset = -200;
              rotateY = -25;
              scale = 0.7;
              opacity = 0.6;
            } else if (offset === items.length - 1) {
              // Left
              xOffset = -300;
              zOffset = -200;
              rotateY = 25;
              scale = 0.7;
              opacity = 0.6;
            } else if (offset === 2) {
              // Far right
              xOffset = 500;
              zOffset = -400;
              rotateY = -35;
              scale = 0.5;
              opacity = 0.3;
            } else {
              // Far left
              xOffset = -500;
              zOffset = -400;
              rotateY = 35;
              scale = 0.5;
              opacity = 0.3;
            }

            return (
              <motion.div
                key={item.id}
                className="absolute w-[500px] h-[400px] cursor-pointer"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY,
                  scale,
                  opacity,
                }}
                transition={{
                  duration: tokens.animation.duration.slow,
                  ease: tokens.animation.easing.smooth,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => isCenter && onItemClick?.(item)}
                whileHover={isCenter ? { scale: 1.02 } : undefined}
              >
                <div
                  className={`relative w-full h-full rounded-2xl overflow-hidden ${
                    item.gradient || 'bg-gradient-to-br from-blue-900 to-purple-900'
                  }`}
                  style={{
                    boxShadow: isCenter
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Project Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  )}

                  {/* Overlay with Project Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isCenter ? 1 : 0.6, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm text-gray-400 mb-2">{item.category} • {item.year}</p>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => navigate('prev')}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Previous"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => navigate('next')}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Next"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
