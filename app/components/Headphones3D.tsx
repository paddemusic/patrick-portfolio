'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function HeadphonesModel() {
  const { scene } = useGLTF('/models/headphones.glb');
  const modelRef = useRef<any>(null);

  useFrame((state) => {
    if (!modelRef.current) return;
    // Gentle floating rotation
    modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <primitive
        ref={modelRef}
        object={scene}
        scale={2.5}
        position={[0, 0, 0]}
      />
    </Float>
  );
}

export default function Headphones3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-[400px] relative"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />

        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <HeadphonesModel />
          </PresentationControls>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      {/* Contextual label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-4 left-0 right-0 text-center"
      >
        <p className="text-xs text-gray-500 tracking-wider">DRAG TO ROTATE</p>
      </motion.div>
    </motion.div>
  );
}

// Preload the model
useGLTF.preload('/models/headphones.glb');
