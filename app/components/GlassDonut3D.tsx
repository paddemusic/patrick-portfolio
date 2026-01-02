'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, MeshTransmissionMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function GlassDonut() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!torusRef.current) return;
    // Ultra-gentle auto-rotation for premium feel
    torusRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    torusRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.6}
    >
      <mesh ref={torusRef}>
        <torusGeometry args={[1.5, 0.7, 64, 128]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={1}
          roughness={0.15}
          thickness={1.2}
          ior={1.5}
          chromaticAberration={0.2}
          anisotropy={1}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.2}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#e0e0e0"
        />
      </mesh>
    </Float>
  );
}

export default function GlassDonut3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-[600px] relative"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />
        <pointLight position={[0, 5, 5]} intensity={2} color="#ffffff" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <Suspense fallback={null}>
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <GlassDonut />
          </PresentationControls>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      {/* Contextual label - minimal, sophisticated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 text-center pointer-events-none"
      >
        <p className="text-xs text-gray-600 tracking-widest">(drag to explore)</p>
      </motion.div>
    </motion.div>
  );
}
