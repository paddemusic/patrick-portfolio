'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// REAL stats from Patrick's CVs - backed by actual achievements
// Using clean abbreviated format for professional look
const authenticStats = [
  {
    number: 300,
    label: 'Video Plays',
    proof: 'Music videos, social content, TV2 campaigns',
    suffix: 'M',
  },
  {
    number: 250,
    label: 'Followers',
    proof: 'Built organically 2015-2021 through music career',
    suffix: 'K',
  },
  {
    number: 400,
    label: 'Live Performances',
    proof: 'Concerts and speaking engagements, domestic and international',
    suffix: '+',
  },
  {
    number: 600,
    label: 'Monthly Ad Budget (TV2)',
    proof: 'Facebook campaigns for major TV shows',
    suffix: 'K kr',
  },
  {
    number: 24,
    label: 'Music Releases',
    proof: 'Each with detailed launch strategy, press, video',
    suffix: '',
  },
  {
    number: 8,
    label: 'Merchandise Sales',
    proof: 'Online store, brand building 2015-2021',
    suffix: 'K+',
  },
];

// Simple format - just the number
function formatNumber(num: number): string {
  return num.toString();
}

// Count-up animation hook
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Ease out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * easeProgress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, hasAnimated]);

  return { count, startAnimation: () => setHasAnimated(true) };
}

function StatCard({ stat, index }: { stat: typeof authenticStats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { count, startAnimation } = useCountUp(stat.number);

  useEffect(() => {
    if (isInView) {
      startAnimation();
    }
  }, [isInView, startAnimation]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        delay: index * 0.165,
        duration: 1.0,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="border-b border-zinc-800/50 hover:border-zinc-700 transition-colors duration-500"
      style={{
        paddingBottom: 'clamp(3rem, 6vh, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.5rem, 3vh, 2rem)'
      }}
    >
      {/* Number - Massive and dominant */}
      <div className="font-light tracking-tight" style={{
        fontSize: 'clamp(4rem, 10vw, 7rem)',
        lineHeight: '1.0',
        letterSpacing: '-0.02em'
      }}>
        {formatNumber(count)}
        <span style={{ opacity: 0.5 }}>{stat.suffix}</span>
      </div>

      {/* Label - Clear but secondary */}
      <div className="font-light" style={{
        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
        lineHeight: '1.4',
        opacity: 0.85
      }}>
        {stat.label}
      </div>

      {/* Proof - Subtle, breathes */}
      <div style={{
        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
        lineHeight: '1.8',
        opacity: 0.5,
        maxWidth: '50ch'
      }}>
        {stat.proof}
      </div>
    </motion.div>
  );
}

export default function StatsProof() {
  return (
    <section id="stats" className="relative" style={{
      paddingTop: 'clamp(8rem, 15vh, 12rem)',
      paddingBottom: 'clamp(8rem, 15vh, 12rem)'
    }}>
      {/* Section Label */}
      <div className="container mx-auto px-6" style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs tracking-widest text-gray-600 mb-8"
          style={{ opacity: 0.5 }}
        >
          (PROVEN TRACK RECORD)
        </motion.div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-6" style={{ marginBottom: 'clamp(6rem, 12vh, 8rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <h2 className="font-light tracking-tight" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: '1.2',
            letterSpacing: '-0.015em',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)'
          }}>
            Proven Track Record
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            lineHeight: '1.8',
            opacity: 0.85,
            maxWidth: '65ch'
          }}>
            These aren't vanity metrics - they're proof of understanding audiences and
            delivering what works. From building a music career from scratch to managing
            six-figure monthly ad budgets for Norway's biggest broadcaster.
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto" style={{ gap: 'clamp(4rem, 8vh, 6rem)' }}>
          {authenticStats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
