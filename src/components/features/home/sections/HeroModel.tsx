'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useExperience } from '@/hooks/useExperience';

export default function HeroModel(_props: { url?: string, type?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { introPlayed } = useExperience();
  
  useFrame(() => {
    // If we wanted to add a subtle hover floating effect when settled
    if (introPlayed && groupRef.current) {
      // Very slow ambient rotation
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Using GSAP to handle the exact timeline orchestration
  // The WebGL canvas becomes visible at 1.4s
  // 1.4s -> 1.8s: Analysis (Heatmap/Stress)
  // 1.9s -> 2.1s: Wireframe
  // 2.1s -> 2.3s: Solid (Settle)
  
  // Since we load the component, we just hook into the global time relative to mount.
  // Actually, the Canvas component mounts eagerly, but the container's opacity is 0.
  // We should trigger GSAP based on introPlayed.

  // To properly sync without an external ref, we'll just run a 2.3s internal timeline
  // that matches the global timeline.
  
  // Actually, let's just use `useEffect` to trigger the local GSAP sequence
  // and handle the material transitions natively.
  
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFrame((state) => {
      if (!materialRef.current || !groupRef.current) return;
      if (introPlayed || prefersReducedMotion) {
        groupRef.current.rotation.set(0.4, 0.6, 0);
        materialRef.current.color.setHex(0xaaaaaa);
        materialRef.current.wireframe = false;
        materialRef.current.emissive.setHex(0x000000);
        return;
      }
      
      const t = state.clock.getElapsedTime();
      
      // We assume clock starts when canvas mounts. The canvas mounts immediately.
      // So t=1.4 is when the canvas becomes visible.
      if (t < 1.4) {
        groupRef.current.rotation.set(0, t * 2, 0);
        materialRef.current.color.setHex(0xff0000); // Red heatmap
        materialRef.current.emissive.setHex(0xff0000);
        materialRef.current.emissiveIntensity = 0.5;
        materialRef.current.wireframe = false;
      } else if (t >= 1.4 && t < 1.9) {
        // Analysis phase
        groupRef.current.rotation.set(0, t * 2, 0);
        materialRef.current.color.setHex(0x00ffff); // Flow/Stress colors based on type
        materialRef.current.emissive.setHex(0x0000aa);
        materialRef.current.wireframe = false;
      } else if (t >= 1.9 && t < 2.1) {
        // Wireframe phase
        groupRef.current.rotation.set(0, t * 2, 0);
        materialRef.current.wireframe = true;
        materialRef.current.color.setHex(0x888888);
        materialRef.current.emissive.setHex(0x000000);
      } else if (t >= 2.1 && t < 3.0) {
        // Settle phase
        // Smoothly interpolate rotation to target (0.4, 0.6, 0)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.4, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0.6, 0.05);
        materialRef.current.wireframe = false;
        materialRef.current.color.setHex(0xcccccc);
      }
    });
  }

  // Fallback torus knot geometry if no URL
  return (
    <group ref={groupRef}>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      
      <mesh>
        <torusKnotGeometry args={[1.8, 0.6, 128, 32]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#cccccc" 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
