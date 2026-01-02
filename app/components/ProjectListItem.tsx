'use client';

import { motion } from 'framer-motion';
import { referenceScrollReveal, viewportConfig } from '@/app/utils/animations';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  metrics?: string;
  client?: string;
}

interface ProjectListItemProps {
  project: Project;
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

/**
 * ProjectListItem - Individual project in vertical list
 * Reference-style typography and scroll reveal timing
 */
export default function ProjectListItem({
  project,
  index,
  onHoverStart,
  onHoverEnd,
}: ProjectListItemProps) {
  return (
    <motion.div
      variants={referenceScrollReveal(index)}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="group cursor-pointer border-b border-zinc-800/50 hover:border-zinc-700 transition-colors duration-300"
      style={{
        marginBottom: 'clamp(10rem, 12vw, 12rem)', // 160-192px spacing
      }}
    >
      <div className="py-8">
        {/* Category and Year */}
        <motion.div
          className="flex items-center gap-6 mb-8 text-sm tracking-widest uppercase text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.165 + 0.2 }}
        >
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>{project.year}</span>
        </motion.div>

        {/* Project Title - Huge, fluid typography */}
        <h3
          className="font-light group-hover:translate-x-4 transition-transform duration-500"
          style={{
            fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', // 40-72px
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <motion.p
          className="mt-8 text-gray-400"
          style={{
            fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)', // 18-20px
            lineHeight: '1.8',
            maxWidth: '42ch', // Optimal reading width
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.165 + 0.4 }}
        >
          {project.description}
        </motion.p>

        {/* Metrics and Client */}
        {(project.metrics || project.client) && (
          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.165 + 0.5 }}
          >
            {project.metrics && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-gray-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                {project.metrics}
              </span>
            )}
            {project.client && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-gray-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {project.client}
              </span>
            )}
          </motion.div>
        )}

        {/* Hover Indicator */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span>View Project</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
