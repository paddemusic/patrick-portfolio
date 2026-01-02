'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

interface ProjectHoverPreviewProps {
  project: Project | null;
  mousePosition: { x: number; y: number };
}

/**
 * ProjectHoverPreview - Cursor-following preview image
 * Renders as a portal to document.body for proper z-index layering
 * GPU-accelerated transforms for 60fps performance
 */
export default function ProjectHoverPreview({
  project,
  mousePosition,
}: ProjectHoverPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !project) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: 'fixed',
            left: mousePosition.x + 40,
            // Fix for Lenis smooth scroll: add scroll offset to maintain viewport-relative position
            top: mousePosition.y - 200 + (typeof window !== 'undefined' ? window.scrollY : 0),
            pointerEvents: 'none',
            zIndex: 9999,
            transform: 'translateZ(0)', // GPU acceleration
          }}
          className="w-[600px]"
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
              draggable={false}
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
