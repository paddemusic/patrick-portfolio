'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import { useScroll, useTransform, motion } from 'framer-motion';
import * as THREE from 'three';

function MetallicTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Smooth rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;

    // Subtle breathing effect
    const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} castShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          distort={0.3}
          speed={2}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function MetallicShape3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />

        <MetallicTorus />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
