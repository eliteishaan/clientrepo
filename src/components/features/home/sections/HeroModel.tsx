'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls, Lightformer, ContactShadows, Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function GearboxModel({ isHovered }: { isHovered: boolean }) {
  const { scene } = useGLTF('/models/gearbox_assy.glb');
  const modelRef = useRef<THREE.Group>(null);

  // Preload and convert materials to premium PBR Physical materials
  useMemo(() => {
    // Compute bounding box of the scene and scale it dynamically to a standard size
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2.6; // Perfect bounds to avoid overlapping text
    const scaleFactor = targetSize / maxDim;
    scene.scale.setScalar(scaleFactor);

    scene.traverse((child) => {
      if ((child as any).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          
          // Create highly detailed physical material matching CAD/precision manufacturing finishes
          const physicalMat = new THREE.MeshPhysicalMaterial({
            color: mat.color,
            map: mat.map,
            normalMap: mat.normalMap,
            roughnessMap: mat.roughnessMap,
            metalnessMap: mat.metalnessMap,
            metalness: 0.95,
            roughness: 0.22,
            clearcoat: 0.8,
            clearcoatRoughness: 0.1,
            envMapIntensity: 2.2
          });
          mesh.material = physicalMat;
        }
      }
    });
  }, [scene]);

  useFrame((_state, delta) => {
    if (!modelRef.current) return;
    
    // Idle rotation
    const baseSpeed = 0.08;
    // Speed up slightly when hovered
    const targetSpeed = isHovered ? 0.35 : baseSpeed;
    
    if (modelRef.current.userData.speed === undefined) {
      modelRef.current.userData.speed = baseSpeed;
    }
    
    modelRef.current.userData.speed = THREE.MathUtils.damp(
      modelRef.current.userData.speed, 
      targetSpeed, 
      2.5, 
      delta
    );

    modelRef.current.rotation.y += delta * modelRef.current.userData.speed;
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
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
      
      <ambientLight intensity={0.15} />
      {/* Directional light for shadows */}
      <directionalLight 
        castShadow 
        position={[5, 10, 5]} 
        intensity={2} 
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
      const targetX = (mouse.y * viewport.height) / 45;
      const targetY = (mouse.x * viewport.width) / 45;
      
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
        speed={1.2}
        zoom={1}
        rotation={[0.3, 0.5, 0]}
        polar={[-Math.PI / 6, Math.PI / 6]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float 
          speed={1.2} 
          rotationIntensity={0.03} 
          floatIntensity={0.1} 
          floatingRange={[-0.03, 0.03]}
        >
          {/* Shift model to the right (x=0.7) to fully clear Vivan Nagrath text on the left */}
          <group 
            ref={assemblyRef}
            position={[0.7, -0.15, 0]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
          >
            <Center>
              <GearboxModel isHovered={isHovered} />
            </Center>
          </group>
        </Float>
      </PresentationControls>

      {/* Ground shadow for weight/physicality */}
      <ContactShadows 
        position={[0.7, -2.0, 0]} 
        opacity={0.45} 
        scale={8} 
        blur={2.5} 
        far={4} 
        color="#000000"
      />
    </>
  );
}

// Preload the gearbox model asset
useGLTF.preload('/models/gearbox_assy.glb');