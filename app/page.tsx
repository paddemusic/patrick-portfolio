'use client';

import { motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import AtmosphereBreak from './components/AtmosphereBreak';
import Philosophy from './components/Philosophy';
import Work from './components/Work';
import Partners from './components/Partners';
import Media from './components/Media';
import Contact from './components/Contact';
import NavigationNew from './components/Navigation/NavigationNew';
import SmoothScroll from './components/SmoothScroll';
import MagneticCursor from './components/MagneticCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import SectionProgress from './components/ui/SectionProgress';
import { CursorFollowGradient } from './components/ui/CursorEffects';
import { SectionReadinessProvider } from './context/SectionReadiness';

export default function Home() {

  return (
    <SectionReadinessProvider>
      <SmoothScroll>
        <ScrollProgress />
        <SectionProgress />
        <MagneticCursor />
        <CursorFollowGradient
          gradientSize={1000}
          gradientColor="100, 100, 255"
          gradientOpacity={0.08}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="min-h-screen bg-black text-white"
          >
            <NavigationNew />
            <Hero />
            <About />
            <AtmosphereBreak />
            <Philosophy />
            <Work />
            <Partners />
            <Media />
            <Contact />
          </motion.div>
        </CursorFollowGradient>
      </SmoothScroll>
    </SectionReadinessProvider>
  );
}
