'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls, Lightformer, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function TurbineStage({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const blades = 22;

  // Pre-calculate geometry arrays to avoid recreation
  const bladeIndices = useMemo(() => Array.from({ length: blades }), [blades]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    
    // Idle rotation
    const baseSpeed = 0.3;
    // Accelerate when hovered
    const targetSpeed = isHovered ? 2.5 : baseSpeed;
    
    if (groupRef.current.userData.speed === undefined) {
      groupRef.current.userData.speed = baseSpeed;
    }
    
    groupRef.current.userData.speed = THREE.MathUtils.damp(
      groupRef.current.userData.speed, 
      targetSpeed, 
      3, // smoothness
      delta
    );

    // Spin the turbine
    groupRef.current.rotation.y += delta * groupRef.current.userData.speed;
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 8, 0, 0]}>
      {/* Outer Casing - Matte Anodized Aluminum */}
      <mesh>
        <cylinderGeometry args={[2.5, 2.5, 1.2, 64, 1, true]} />
        <meshPhysicalMaterial 
          color="#0f0f11" 
          metalness={0.8} 
          roughness={0.6} 
          clearcoat={0.1}
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Outer Rim Lips - Polished Chamfers to catch light */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 32, 128]} />
        <meshPhysicalMaterial color="#333" metalness={1.0} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 32, 128]} />
        <meshPhysicalMaterial color="#333" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* Stator Vanes (Static structure behind blades) */}
      <group position={[0, -0.3, 0]}>
        {bladeIndices.map((_, i) => {
          const angle = (i / blades) * Math.PI * 2;
          return (
            <mesh key={`stator-${i}`} position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[1.8, 0.1, 0.05]} />
              <meshPhysicalMaterial color="#050505" metalness={0.9} roughness={0.7} />
            </mesh>
          );
        })}
      </group>
      
      {/* Central Hub - Polished Titanium */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.6, 64]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.95} roughness={0.2} clearcoat={0.5} />
      </mesh>
      
      {/* Nose cone (Spinner) - Highly polished */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.6, 0.9, 64]} />
        <meshPhysicalMaterial color="#000000" metalness={1.0} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>

      {/* Turbine Blades - Machined Aluminum with rounded edges for specular highlights */}
      <group position={[0, 0.2, 0]}>
        {bladeIndices.map((_, i) => {
          const angle = (i / blades) * Math.PI * 2;
          return (
            <group key={`blade-${i}`} rotation={[0, angle, 0]}>
              <mesh position={[1.5, 0, 0]} rotation={[Math.PI / 6, 0, 0]}>
                <RoundedBox args={[1.9, 0.04, 0.4]} radius={0.015} smoothness={4}>
                  <meshPhysicalMaterial 
                    color="#b0b0b5" 
                    metalness={1.0} 
                    roughness={0.25} 
                    clearcoat={0.3}
                    envMapIntensity={2.5}
                  />
                </RoundedBox>
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

// Custom Lighting Environment (Apple/Porsche Studio Style)
function StudioLighting() {
  return (
    <group>
      {/* Base environmental reflections */}
      <Environment preset="city" />
      
      {/* Large soft overhead light for clean top reflections */}
      <Lightformer
        form="rect"
        intensity={4}
        position={[0, 10, 0]}
        scale={[20, 20, 1]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      
      {/* Side fill light (warm) */}
      <Lightformer
        form="rect"
        intensity={2}
        color="#ffe8cc"
        position={[-10, 0, 10]}
        scale={[10, 20, 1]}
        target={[0, 0, 0]}
      />
      
      {/* Key rim light (cool, intense) to separate from background */}
      <Lightformer
        form="rect"
        intensity={5}
        color="#ccddff"
        position={[10, 5, -10]}
        scale={[10, 40, 1]}
        target={[0, 0, 0]}
      />
      
      <ambientLight intensity={0.1} />
      {/* Directional light for actual shadows */}
      <directionalLight 
        castShadow 
        position={[5, 10, 5]} 
        intensity={1.5} 
        shadow-mapSize={[2048, 2048]} 
        shadow-bias={-0.0001}
      />
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
      // Subtle, heavy feeling mouse parallax
      const targetX = (mouse.y * viewport.height) / 35;
      const targetY = (mouse.x * viewport.width) / 35;
      
      assemblyRef.current.rotation.x = THREE.MathUtils.damp(assemblyRef.current.rotation.x, targetX, 2, delta);
      assemblyRef.current.rotation.y = THREE.MathUtils.damp(assemblyRef.current.rotation.y, targetY, 2, delta);
    }
  });

  return (
    <>
      <StudioLighting />
      
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 6, Math.PI / 6]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float 
          speed={1.5} 
          rotationIntensity={0.05} 
          floatIntensity={0.15} 
          floatingRange={[-0.05, 0.05]}
        >
          <group 
            ref={assemblyRef}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            scale={0.9} // Slight scale down to ensure breathing room
          >
            <TurbineStage isHovered={isHovered} />
          </group>
        </Float>
      </PresentationControls>

      {/* Ground shadow for weight/physicality */}
      <ContactShadows 
        position={[0, -2.2, 0]} 
        opacity={0.6} 
        scale={10} 
        blur={2} 
        far={4} 
        color="#000000"
      />
    </>
  );
}