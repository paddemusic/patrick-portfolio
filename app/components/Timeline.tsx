'use client';

import { motion } from 'framer-motion';
import { FluidText } from './ui/Typography';
import { tokens } from '@/app/styles/tokens';

const timeline = [
  {
    year: '2023-2024',
    title: 'AI-Forward Creative Technologist',
    company: 'Independent',
    description: 'Invested significant time mastering AI tools for modern media production. Economic advising and project work.',
    achievement: 'Built AI-powered content workflows',
  },
  {
    year: '2021-2022',
    title: 'SoMe & YouTube Manager',
    company: 'TV2 (National Broadcaster)',
    description: 'Managed 400-600k kr monthly ad budgets. Launch strategies for Kompani Lauritzen, The Voice, Forræder.',
    achievement: 'Scaled national campaigns',
  },
  {
    year: '2015-2021',
    title: 'Entrepreneur & Artist',
    company: 'Self-Employed',
    description: '24 music releases, 400 concerts across domestic and international stages. Built brand through strategic planning and detailed launch strategies.',
    achievement: 'Built from zero to scale',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative w-full" style={{
      paddingTop: 'clamp(8rem, 15vh, 12rem)',
      paddingBottom: 'clamp(8rem, 15vh, 12rem)'
    }}>
      {/* Section label */}
      <div className="container mx-auto px-6" style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xs tracking-widest text-gray-600 mb-8"
          style={{ opacity: 0.5 }}
        >
          (TIMELINE)
        </motion.div>
      </div>

      {/* Timeline items */}
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="relative" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6rem, 12vh, 10rem)' }}>
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 origin-top ml-6"
            style={{ transformOrigin: 'top' }}
          />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true, // State-based: triggers once, holds state
                margin: '-15% 0px -35% 0px', // Tighter trigger
                amount: 0.4, // 40% visible to trigger
              }}
              className="relative pl-16"
            >
              {/* Timeline dot - appears first */}
              <motion.div
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1.0],
                    },
                  },
                }}
                className="absolute left-0 top-0 w-4 h-4 ml-[18px] bg-white rounded-full ring-4 ring-black"
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vh, 2rem)' }}>
                {/* Year - Primary element, appears second */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 60, scale: 0.98 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 1.8,
                        ease: [0.2, 0.0, 0.2, 1.0],
                        delay: 0.2, // After dot
                      },
                    },
                  }}
                  className="font-light"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    lineHeight: '1.2',
                    letterSpacing: '-0.015em',
                    opacity: 1.0
                  }}
                >
                  {item.year}
                </motion.div>

                {/* Title - Secondary element */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 1.2,
                        ease: [0.25, 0.1, 0.25, 1.0],
                        delay: 0.7, // After year
                      },
                    },
                  }}
                >
                  <FluidText as="h3" size="subsection" weight="normal" className="text-white">
                    {item.title}
                  </FluidText>
                </motion.div>

                {/* Company - Metadata */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.3, 0.0, 0.1, 1.0],
                        delay: 1.1, // After title
                      },
                    },
                  }}
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                    lineHeight: '1.6',
                    opacity: 0.65
                  }}
                >
                  {item.company}
                </motion.p>

                {/* Description - Final element */}
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.3, 0.0, 0.1, 1.0],
                        delay: 1.3, // After company
                      },
                    },
                  }}
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                    lineHeight: '1.8',
                    opacity: 0.65,
                    maxWidth: '65ch'
                  }}
                >
                  {item.description}
                </motion.p>

                {/* Achievement badge - Final metadata */}
                {item.achievement && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.3, 0.0, 0.1, 1.0],
                          delay: 1.6, // After description
                        },
                      },
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-gray-400 mt-4"
                  >
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item.achievement}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partners Section - Visual Rest */}
      <div className="container mx-auto px-6" style={{
        marginTop: 'clamp(12rem, 20vh, 16rem)',
        marginBottom: 'clamp(6rem, 10vh, 8rem)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-7xl mx-auto"
        >
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xs tracking-widest text-gray-600 mb-8"
            style={{ opacity: 0.5 }}
          >
            (PARTNERS)
          </motion.div>

          <FluidText as="h3" size="section" weight="light" className="text-gray-300" style={{ marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
            Trusted By
          </FluidText>

          {/* Select logos only - quiet presentation */}
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'clamp(3rem, 6vh, 5rem)' }}>
            {[
              { name: 'TV2', src: '/images/clients/tv2.png' },
              { name: 'Sony Music', src: '/images/clients/sony-music.png' },
              { name: 'BI Norwegian Business School', src: '/images/clients/bi.png' },
              { name: 'Nobel Peace Center', src: '/images/clients/nobel.png' },
            ].map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3 },
                }}
                className="relative flex items-center justify-center group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-w-full h-20 object-contain opacity-50 group-hover:opacity-90 transition-all duration-400 filter grayscale group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
