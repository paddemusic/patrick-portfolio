'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function CameraModel() {
  const { scene } = useGLTF('/models/camera.glb');
  const modelRef = useRef<any>(null);

  useFrame((state) => {
    if (!modelRef.current) return;
    // Subtle breathing animation
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1;
    modelRef.current.scale.set(breathe, breathe, breathe);
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
    >
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.8}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </Float>
  );
}

export default function Camera3D() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-[350px] relative"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <CameraModel />
          </PresentationControls>
          <Environment preset="city" />
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
        <p className="text-xs text-gray-500 tracking-wider">INTERACTIVE 3D MODEL</p>
      </motion.div>
    </motion.div>
  );
}

// Preload the model
useGLTF.preload('/models/camera.glb');
