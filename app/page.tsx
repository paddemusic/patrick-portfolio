'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
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
import KineticLink from './components/KineticLink';
import KineticSpine from './components/KineticSpine';
import KineticTick from './components/KineticTick';
import KineticCable from './components/KineticCable';
import KineticDrop from './components/KineticDrop';
import KineticReel from './components/KineticReel';

export default function Home() {
  // Kinetic link refs - anchor points for mechanical transitions
  const aboutExitRef = useRef<HTMLDivElement>(null);
  const atmoEntryRef = useRef<HTMLDivElement>(null);
  const philosophyExitRef = useRef<HTMLDivElement>(null);
  const workExitRef = useRef<HTMLDivElement>(null);
  const partnersExitRef = useRef<HTMLDivElement>(null);
  const musicExitRef = useRef<HTMLDivElement>(null);

  // Impact states - triggered when kinetic objects reach bottom
  const [impactReady, setImpactReady] = useState(false);
  const [workTicked, setWorkTicked] = useState(false);
  const [spineWorkTrigger, setSpineWorkTrigger] = useState<'work' | null>(null);
  const [partnersImpactReady, setPartnersImpactReady] = useState(false);
  const [musicImpactReady, setMusicImpactReady] = useState(false);
  const [contactImpactReady, setContactImpactReady] = useState(false);

  // Handle KineticTick impact → Spine energy flow
  const handleWorkTickImpact = () => {
    setWorkTicked(true);
    setSpineWorkTrigger('work');
    // Reset trigger after beam animation completes
    setTimeout(() => setSpineWorkTrigger(null), 400);
  };

  return (
    <SectionReadinessProvider>
      <SmoothScroll>
        <ScrollProgress />
        <SectionProgress />
        <MagneticCursor />
        <KineticSpine triggerNode={spineWorkTrigger} />
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
            <main>
              <Hero />
              <About exitRef={aboutExitRef} />
              <KineticLink
                fromRef={aboutExitRef}
                toRef={atmoEntryRef}
                onImpact={() => setImpactReady(true)}
              />
              <AtmosphereBreak entryRef={atmoEntryRef} impactReady={impactReady} />
              <Philosophy exitRef={philosophyExitRef} />
              <KineticTick
                fromRef={philosophyExitRef}
                onImpact={handleWorkTickImpact}
              />
              <Work exitRef={workExitRef} />
              <KineticCable
                fromRef={workExitRef}
                onImpact={() => setPartnersImpactReady(true)}
              />
              <Partners impactReady={partnersImpactReady} exitRef={partnersExitRef} />
              <KineticDrop
                fromRef={partnersExitRef}
                onImpact={() => setMusicImpactReady(true)}
              />
              <Media impactReady={musicImpactReady} exitRef={musicExitRef} />
              <KineticReel
                fromRef={musicExitRef}
                onImpact={() => setContactImpactReady(true)}
              />
              <Contact impactReady={contactImpactReady} />
            </main>
          </motion.div>
        </CursorFollowGradient>
      </SmoothScroll>
    </SectionReadinessProvider>
  );
}
