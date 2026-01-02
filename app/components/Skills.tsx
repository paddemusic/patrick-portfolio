'use client';

import { motion } from 'framer-motion';

// Core principles - how Patrick works, not what tools he uses
const principles = [
  {
    title: 'Entertainment DNA + Commercial Rigor',
    description: 'Bringing performer instincts to strategic campaigns. Understanding what captures attention and what converts.',
  },
  {
    title: 'AI-First, Human-Centered',
    description: 'Leveraging AI tools for efficiency and scale while maintaining authentic creative voice.',
  },
  {
    title: 'Strategic Planning Before Execution',
    description: 'Every release, campaign, and project starts with detailed strategy. Execution follows vision.',
  },
  {
    title: 'Outcome-Focused Delivery',
    description: 'Measured by results, not process. If it doesn\'t move metrics, it doesn\'t ship.',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full" style={{
      paddingTop: 'clamp(8rem, 15vh, 12rem)',
      paddingBottom: 'clamp(8rem, 15vh, 12rem)'
    }}>
        {/* Section label and header */}
        <div className="container mx-auto px-6" style={{ marginBottom: 'clamp(6rem, 12vh, 8rem)' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs tracking-widest text-gray-600 mb-8"
            style={{ opacity: 0.5 }}
          >
            (HOW I WORK)
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-light"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.015em',
              marginBottom: 'clamp(1.5rem, 3vh, 2rem)'
            }}
          >
            approach over tools
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
              lineHeight: '1.8',
              opacity: 0.85,
              maxWidth: '65ch'
            }}
          >
            Tools evolve. Principles don't.
          </motion.p>
        </div>

        {/* Principles - Clean, spacious */}
        <div className="container mx-auto px-6">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(4rem, 8vh, 6rem)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  delay: index * 0.2,
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="border-b border-zinc-800/30 hover:border-zinc-700 transition-colors duration-500"
                style={{ paddingBottom: 'clamp(3rem, 6vh, 4rem)' }}
              >
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  lineHeight: '1.4',
                  letterSpacing: '-0.015em',
                  marginBottom: 'clamp(1rem, 2vh, 1.5rem)'
                }}>
                  {principle.title}
                </h3>

                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  lineHeight: '1.8',
                  opacity: 0.65,
                  maxWidth: '65ch'
                }}>
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
}
