'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface LyricsDisplayProps {
  songTitle: string;
  artist?: string;
}

export default function LyricsDisplay({ songTitle, artist }: LyricsDisplayProps) {
  const [songData, setSongData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample lyrics (since Genius API requires scraping for actual lyrics)
  const sampleLyrics = [
    "In the quiet of the night",
    "Where shadows dance with light",
    "I find my voice, I find my way",
    "Through melodies that never fade",
    "",
    "Every note, a memory",
    "Every chord, a part of me",
    "In this rhythm, I am free",
    "Lost in sound's infinity",
    "",
    "When the world feels far away",
    "Music brings me back to stay",
    "In the silence, in the sound",
    "Here is where I'm found",
  ];

  useEffect(() => {
    if (isOpen && !songData) {
      // Fetch song data from Genius
      const query = artist ? `title=${encodeURIComponent(songTitle)}&artist=${encodeURIComponent(artist)}` : `title=${encodeURIComponent(songTitle)}`;
      fetch(`/api/lyrics?${query}`)
        .then((res) => res.json())
        .then((data) => setSongData(data))
        .catch((err) => console.error('Error fetching lyrics:', err));
    }
  }, [isOpen, songData, songTitle, artist]);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors border border-white/10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        View Lyrics
      </motion.button>

      {/* Lyrics Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[80vh] bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-8 border-b border-white/10">
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-light mb-1"
              >
                {songTitle}
              </motion.h3>
              {artist && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-400"
                >
                  {artist}
                </motion.p>
              )}
            </div>

            {/* Lyrics */}
            <div ref={containerRef} className="p-8 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="space-y-6">
                {sampleLyrics.map((line, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className={`text-lg ${line === '' ? 'h-4' : 'text-gray-300'}`}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              {/* Powered by Genius */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500"
              >
                <a
                  href={songData?.url || 'https://genius.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition-colors"
                >
                  View on Genius →
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
