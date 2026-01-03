'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface SpineNode {
  id: string;
  label: string;
}

const SPINE_NODES: SpineNode[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'atmosphere-break', label: 'Chapter' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'work', label: 'Work' },
  { id: 'partners', label: 'Partners' },
  { id: 'music', label: 'Music' },
  { id: 'contact', label: 'Contact' },
];

interface KineticSpineProps {
  triggerNode?: 'work' | null;
}

export default function KineticSpine({ triggerNode }: KineticSpineProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [prevActiveNode, setPrevActiveNode] = useState<string | null>(null);
  const [pulsingNode, setPulsingNode] = useState<string | null>(null);
  const [energyBeam, setEnergyBeam] = useState<{ from: number; to: number } | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // IntersectionObserver to track active section
    const observers: IntersectionObserver[] = [];

    SPINE_NODES.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Fire energy beam before activating (if not reduced motion)
              const fromIndex = SPINE_NODES.findIndex((n) => n.id === activeNode);
              const toIndex = SPINE_NODES.findIndex((n) => n.id === id);

              if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex && !prefersReducedMotion) {
                setEnergyBeam({ from: fromIndex, to: toIndex });
                setTimeout(() => setEnergyBeam(null), 400);
              }

              setPrevActiveNode(activeNode);
              setActiveNode(id);

              // Trigger pulse animation after beam (or immediately if reduced motion)
              const pulseDelay = prefersReducedMotion ? 0 : 150;
              setTimeout(() => {
                setPulsingNode(id);
                setTimeout(() => setPulsingNode(null), 300);
              }, pulseDelay);
            }
          });
        },
        {
          threshold: 0.3, // Section is active when 30% visible
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [activeNode, prefersReducedMotion]);

  // Handle external trigger (e.g., from KineticTick)
  useEffect(() => {
    if (triggerNode === 'work' && !prefersReducedMotion) {
      const philosophyIndex = SPINE_NODES.findIndex((n) => n.id === 'philosophy');
      const workIndex = SPINE_NODES.findIndex((n) => n.id === 'work');

      // Fire energy beam from philosophy → work
      setEnergyBeam({ from: philosophyIndex, to: workIndex });
      setTimeout(() => setEnergyBeam(null), 400);

      // Pulse work node
      setTimeout(() => {
        setPulsingNode('work');
        setTimeout(() => setPulsingNode(null), 300);
      }, 150);
    }
  }, [triggerNode, prefersReducedMotion]);

  // Calculate beam position and height
  const getBeamStyle = () => {
    if (!energyBeam) return null;

    const { from, to } = energyBeam;
    const railHeight = 384; // h-96 = 384px
    const fromY = (from / (SPINE_NODES.length - 1)) * railHeight;
    const toY = (to / (SPINE_NODES.length - 1)) * railHeight;
    const beamHeight = Math.abs(toY - fromY);
    const beamTop = Math.min(fromY, toY);

    return {
      top: `${beamTop}px`,
      height: `${beamHeight}px`,
    };
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      {/* Vertical rail */}
      <div className="relative h-96 w-px bg-white/5">
        {/* Energy beam - flows between nodes on activation */}
        {energyBeam && !prefersReducedMotion && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: getBeamStyle()?.height || 0, opacity: [0, 0.35, 0] }}
            transition={{
              height: { duration: 0.35, ease: [0.16, 0.0, 0.24, 1.0] },
              opacity: { duration: 0.4, ease: [0.16, 0.0, 0.24, 1.0] },
            }}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              ...getBeamStyle(),
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))',
              filter: 'blur(4px)',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
            }}
          />
        )}

        {/* Nodes */}
        {SPINE_NODES.map((node, index) => {
          const isActive = activeNode === node.id;
          const isPulsing = pulsingNode === node.id;
          const yPosition = (index / (SPINE_NODES.length - 1)) * 100;

          return (
            <div
              key={node.id}
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: `${yPosition}%`,
              }}
            >
              {/* Pulse ring - expands and fades on activation */}
              {isPulsing && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 0.0, 0.24, 1.0] }}
                  className="absolute inset-0 rounded-full border border-white/40"
                  style={{
                    width: '20px',
                    height: '20px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}

              {/* Node circle - compression pulse for physical weight */}
              <motion.div
                animate={
                  isPulsing
                    ? {
                        scale: [1, 0.92, 1.3, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 0.3,
                  ease: [0.16, 0.0, 0.24, 1.0],
                }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.3)' : 'none',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
