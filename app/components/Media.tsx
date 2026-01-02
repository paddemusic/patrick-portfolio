'use client';

import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { EDITORIAL_SPACING, EDITORIAL_TYPOGRAPHY } from '@/app/styles/spacing';
import { musicImages } from '@/app/content/imageManifest';

// Featured track + optional expansion (2 more)
const tracks = [
  {
    title: 'Lifeline',
    artist: 'Patrick Jørgensen',
    duration: '3:28',
    cover: musicImages[0].src, // lifeline.png
    audio: '/audio/lifeline.mp3',
  },
  {
    title: 'Set You Free',
    artist: 'Patrick Jørgensen',
    duration: '3:12',
    cover: musicImages[1].src, // set-you-free.png
    audio: '/audio/set-you-free.mp3',
  },
  {
    title: 'Brother',
    artist: 'Patrick Jørgensen',
    duration: '2:58',
    cover: musicImages[2].src, // brother.png
    audio: '/audio/brother.mp3',
  },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Media() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef(null);

  // State-based trigger - safe, no gating
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.25, // 25% visibility
    margin: '-10% 0px -25% 0px', // Scroll resistance
  });

  // Cinematic variants - "object on table" focus-pull
  const labelVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(2px)',
      y: 18,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
    },
  };

  const playerObjectVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
      filter: 'blur(3px)',
      y: 22,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
    },
  };

  const showMoreVariant: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(2px)',
      y: 10,
    },
    visible: {
      opacity: 0.8,
      filter: 'blur(0px)',
      y: 0,
    },
  };

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // No gating - triggers immediately when in view
  useEffect(() => {
    setCanTrigger(true);
  }, []);

  const currentTrack = tracks[activeTrack];

  // Handle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle next track (only when expanded)
  const nextTrack = () => {
    if (showAllTracks) {
      setActiveTrack((prev) => (prev + 1) % tracks.length);
    }
  };

  // Handle previous track (only when expanded)
  const prevTrack = () => {
    if (showAllTracks) {
      setActiveTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  };

  // Handle track selection from list
  const selectTrack = (index: number) => {
    setActiveTrack(index);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-advance only if expanded
      if (showAllTracks) {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [showAllTracks]);

  // Reset to first track when hiding list
  useEffect(() => {
    if (!showAllTracks && activeTrack !== 0) {
      setActiveTrack(0);
      setIsPlaying(false);
    }
  }, [showAllTracks, activeTrack]);

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Reduced motion override
  const getVariant = (baseVariant: Variants, targetOpacity: number = 1): Variants => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: targetOpacity },
      };
    }
    return baseVariant;
  };

  return (
    <section
      id="media"
      ref={containerRef}
      className="relative w-full"
      style={{
        paddingTop: EDITORIAL_SPACING.sectionPaddingTop,
        paddingBottom: EDITORIAL_SPACING.sectionPaddingBottom,
      }}
    >
      <div className="container mx-auto px-6">
        {/* Label - Cinematic focus-pull */}
        <motion.div
          variants={getVariant(labelVariant, 1)}
          initial="hidden"
          animate={canTrigger && isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0, // No delay for label
            duration: prefersReducedMotion ? 0.3 : 1.2,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="text-gray-600 tracking-widest mb-12"
          style={{ fontSize: EDITORIAL_TYPOGRAPHY.labelSize }}
        >
          (MUSIC)
        </motion.div>

        {/* Player Object - Single unit (album art + controls) */}
        <motion.div
          variants={getVariant(playerObjectVariant, 1)}
          initial="hidden"
          animate={canTrigger && isInView ? 'visible' : 'hidden'}
          transition={{
            delay: 0.45,
            duration: prefersReducedMotion ? 0.3 : 1.6,
            ease: prefersReducedMotion ? undefined : [0.16, 0.0, 0.24, 1.0],
          }}
          className="max-w-2xl mx-auto"
        >
          {/* Album Artwork */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[400px] mx-auto aspect-square rounded-xl overflow-hidden shadow-2xl"
              style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentTrack.cover}
                alt={`${currentTrack.title} album cover`}
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Track Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center"
              style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
            >
              <h3
                className="font-light mb-2 tracking-tight text-white"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  lineHeight: '1.2',
                }}
              >
                {currentTrack.title}
              </h3>
              <p
                className="text-gray-400"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                }}
              >
                {currentTrack.artist}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div style={{ marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }}>
            <div
              onClick={handleProgressClick}
              role="slider"
              aria-label="Audio progress"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' && audioRef.current) {
                  audioRef.current.currentTime = Math.min(currentTime + 5, duration);
                } else if (e.key === 'ArrowLeft' && audioRef.current) {
                  audioRef.current.currentTime = Math.max(currentTime - 5, 0);
                }
              }}
              className="h-2 bg-zinc-800 rounded-full cursor-pointer overflow-hidden group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              <div
                className="h-full bg-white transition-all duration-100 group-hover:bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="flex justify-between text-sm text-gray-500"
              style={{ marginTop: 'clamp(0.5rem, 1vh, 0.75rem)' }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div
            className="flex items-center justify-center"
            style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}
          >
            {/* Previous Button - only visible when expanded */}
            {showAllTracks && (
              <button
                onClick={prevTrack}
                aria-label="Previous track"
                className="w-12 h-12 rounded-full bg-zinc-800/50 hover:bg-zinc-700 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
              </button>
            )}

            {/* Play/Pause Button - Central (cinematic hover) */}
            <motion.button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.02,
                      transition: { duration: 0.7, ease: [0.16, 0.0, 0.24, 1.0] },
                    }
              }
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              {isPlaying ? (
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </motion.button>

            {/* Next Button - only visible when expanded */}
            {showAllTracks && (
              <button
                onClick={nextTrack}
                aria-label="Next track"
                className="w-12 h-12 rounded-full bg-zinc-800/50 hover:bg-zinc-700 flex items-center justify-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
              </button>
            )}
          </div>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} src={currentTrack.audio} preload="metadata" />
        </motion.div>

        {/* Show More Tracks - Secondary, quiet reveal after player settles */}
        {!showAllTracks && (
          <motion.div
            variants={getVariant(showMoreVariant, 0.8)}
            initial="hidden"
            animate={canTrigger && isInView ? 'visible' : 'hidden'}
            transition={{
              delay: 2.2, // After player settles (0.45s + 1.6s = 2.05s)
              duration: prefersReducedMotion ? 0.3 : 0.7,
              ease: prefersReducedMotion ? undefined : [0.20, 0.0, 0.20, 1.0],
            }}
            className="text-center"
            style={{ marginTop: 'clamp(3rem, 6vh, 5rem)' }}
          >
            <button
              onClick={() => setShowAllTracks(true)}
              aria-label="Show 2 more tracks"
              className="text-sm tracking-wide text-gray-500 hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black px-4 py-2 rounded"
            >
              (show 2 more tracks)
            </button>
          </motion.div>
        )}

        {/* Track List - Only visible when expanded */}
        <AnimatePresence>
          {showAllTracks && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-2xl mx-auto overflow-hidden"
              style={{ marginTop: 'clamp(3rem, 6vh, 5rem)' }}
            >
              <div className="space-y-3">
                {tracks.slice(1).map((track, index) => (
                  <button
                    key={track.title}
                    onClick={() => selectTrack(index + 1)}
                    aria-label={`Play ${track.title}`}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black ${
                      activeTrack === index + 1
                        ? 'bg-zinc-800/80'
                        : 'bg-zinc-800/30 hover:bg-zinc-800/50'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={track.cover}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div className="text-sm font-light text-white">{track.title}</div>
                      <div className="text-xs text-gray-500">{track.artist}</div>
                    </div>
                    <div className="text-xs text-gray-500">{track.duration}</div>
                  </button>
                ))}
              </div>

              {/* Hide tracks button */}
              <div className="text-center" style={{ marginTop: 'clamp(2rem, 4vh, 3rem)' }}>
                <button
                  onClick={() => setShowAllTracks(false)}
                  aria-label="Hide additional tracks"
                  className="text-sm tracking-wide text-gray-500 hover:text-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black px-4 py-2 rounded"
                >
                  (hide tracks)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
