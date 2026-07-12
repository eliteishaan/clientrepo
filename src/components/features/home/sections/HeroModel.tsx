'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function TurbineStage({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const blades = 24;

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    // Base idle rotation
    const baseSpeed = 0.5;
    // Accelerate when hovered
    const targetSpeed = isHovered ? 4.0 : baseSpeed;
    
    // We store the current speed on the userData object
    if (groupRef.current.userData.speed === undefined) {
      groupRef.current.userData.speed = baseSpeed;
    }
    
    groupRef.current.userData.speed = THREE.MathUtils.damp(
      groupRef.current.userData.speed, 
      targetSpeed, 
      2, 
      delta
    );

    groupRef.current.rotation.y += delta * groupRef.current.userData.speed;
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {/* Outer Casing */}
      <mesh>
        <cylinderGeometry args={[2.4, 2.4, 0.8, 64, 1, true]} />
        <meshPhysicalMaterial color="#1a1a1a" metalness={0.95} roughness={0.4} side={THREE.DoubleSide} clearcoat={0.2} />
      </mesh>
      
      {/* Outer Rim Lip - Front */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.05, 16, 64]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Outer Rim Lip - Back */}
      <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.05, 16, 64]} />
        <meshPhysicalMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Central Hub */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.6, 0.8, 32]} />
        <meshPhysicalMaterial color="#111" metalness={0.9} roughness={0.3} />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.5, 0.8, 32]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.95} roughness={0.15} clearcoat={1.0} />
      </mesh>

      {/* Turbine Blades */}
      {Array.from({ length: blades }).map((_, i) => {
        const angle = (i / blades) * Math.PI * 2;
        return (
          <group key={i} rotation={[0, angle, 0]}>
            <mesh position={[1.45, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
              <boxGeometry args={[1.9, 0.03, 0.4]} />
              <meshPhysicalMaterial 
                color="#888" 
                metalness={1.0} 
                roughness={0.2} 
                clearcoat={0.5} 
                envMapIntensity={2.5}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function HeroModel() {
  const { mouse, viewport } = useThree();
  const assemblyRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((_state, delta) => {
    if (!assemblyRef.current) return;
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;

    if (!prefersReducedMotion) {
      // Subtle mouse parallax for the entire assembly
      const targetX = (mouse.y * viewport.height) / 25;
      const targetY = (mouse.x * viewport.width) / 25;
      
      assemblyRef.current.rotation.x = THREE.MathUtils.damp(assemblyRef.current.rotation.x, targetX, 2, delta);
      assemblyRef.current.rotation.y = THREE.MathUtils.damp(assemblyRef.current.rotation.y, targetY, 2, delta);
    }
  });

  return (
    <>
      <Environment preset="warehouse" />
      
      {/* Studio Lighting Setup for Metallic Surfaces */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#aaccff" />
      <spotLight position={[0, -10, 5]} intensity={5} color="#ffaa55" angle={0.6} penumbra={1} distance={20} />
      
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float 
          speed={1.5} 
          rotationIntensity={0.1} 
          floatIntensity={0.2} 
          floatingRange={[-0.05, 0.05]}
        >
          <group 
            ref={assemblyRef}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
          >
            <TurbineStage isHovered={isHovered} />
          </group>
        </Float>
      </PresentationControls>
    </>
  );
}