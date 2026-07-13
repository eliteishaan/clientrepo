'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  PresentationControls,
  Lightformer,
  Center,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// PRECISION TURBINE DISC
//
// Communicates: Aerospace · Propulsion · Mechanical Engineering · Manufacturing
// Inspired by: Radial impeller / centrifugal compressor disc
// Relevant to: Vivaan's pulsejet valve work at PURPL, injector design at PSP
//
// Geometry:
//   - Central hub (machined cylinder with chamfered cap)
//   - 9 radial blades (swept, thin aerofoil profile)
//   - Outer rim (annular ring connecting blade tips)
//   - Central bore (hollow — lightweight design)
//   - Full disc spins as one unified part — slow, heavy, confident
// ─────────────────────────────────────────────────────────────────────────────

function TurbineDisc() {
  const groupRef = useRef<THREE.Group>(null);

  // ── Materials ──────────────────────────────────────────────────────────────
  const polishedTitanium = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#78808A'),     // Darker base for deeper blacks
        metalness: 1.0,                        // Absolute metal
        roughness: 0.1,                        // Sharp specular highlights
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 4.5,                  // High reflection for bright machined edges
      }),
    [],
  );

  const anodizedHub = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#161E28'),     // Deep Titanium Blue signature accent
        metalness: 0.95,
        roughness: 0.28,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        envMapIntensity: 2.8,
      }),
    [],
  );

  const brushedRim = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#6E89A8'),     // Steel Blue signature tint on rim
        metalness: 0.92,
        roughness: 0.35,
        clearcoat: 0.3,
        envMapIntensity: 2.0,
      }),
    [],
  );

  // ── Blade geometry (9 swept radial blades) ─────────────────────────────────
  const bladeCount = 9;
  const bladeAngles = useMemo(
    () => Array.from({ length: bladeCount }, (_, i) => (i / bladeCount) * Math.PI * 2),
    [],
  );

  // Build one blade as a flat extruded shape
  const bladeShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Swept aerofoil cross-section (thin, tapered)
    shape.moveTo(0, 0.32);        // root inner
    shape.lineTo(0.05, 0.32);    // root inner width
    shape.bezierCurveTo(0.12, 0.32, 0.18, 0.98, 0.10, 0.98); // outer swept tip
    shape.lineTo(0.0, 0.98);     // outer tip inner edge
    shape.bezierCurveTo(-0.04, 0.98, -0.04, 0.32, 0, 0.32);  // back to root
    return shape;
  }, []);

  const bladeExtrudeSettings = useMemo(
    () => ({
      steps: 1,
      depth: 0.055,              // thin — precision machined
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.006,
      bevelSegments: 3,
    }),
    [],
  );

  // ── Animation ──────────────────────────────────────────────────────────────
  useFrame((state, delta) => {
    const active =
      (window as any).heroInteractionEnabled || state.clock.elapsedTime > 3.0;
    if (!active || !groupRef.current) return;

    // Unified single-axis spin — slow, heavy, confident
    groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef} rotation={[0.28, 0, 0]}>
      {/* Tilt disc 28° toward viewer — shows face and blade depth simultaneously */}

      {/* ── Outer Rim ── */}
      <mesh material={brushedRim} castShadow receiveShadow>
        <torusGeometry args={[1.08, 0.065, 48, 128]} />
      </mesh>

      {/* ── Outer face ring (inset detail) ── */}
      <mesh position={[0, 0, 0.02]} material={polishedTitanium} castShadow>
        <torusGeometry args={[1.02, 0.025, 32, 128]} />
      </mesh>

      {/* ── Radial Blades ── */}
      {bladeAngles.map((angle, i) => (
        <mesh
          key={i}
          rotation={[0, 0, angle + Math.PI * 0.04]}
          material={polishedTitanium}
          castShadow
          receiveShadow
        >
          <extrudeGeometry args={[bladeShape, bladeExtrudeSettings] as any} />
        </mesh>
      ))}

      {/* ── Disc Face (front) ── */}
      <mesh position={[0, 0, 0.028]} material={anodizedHub} receiveShadow>
        <circleGeometry args={[0.30, 64]} />
      </mesh>

      {/* ── Disc Face (back) ── */}
      <mesh position={[0, 0, -0.028]} rotation={[0, Math.PI, 0]} material={anodizedHub}>
        <circleGeometry args={[0.30, 64]} />
      </mesh>

      {/* ── Central Hub (machined cylinder) ── */}
      <mesh material={anodizedHub} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.10, 64]} />
      </mesh>

      {/* ── Hub chamfer top ── */}
      <mesh position={[0, 0.052, 0]} material={polishedTitanium} castShadow>
        <cylinderGeometry args={[0.20, 0.28, 0.012, 64]} />
      </mesh>

      {/* ── Hub chamfer bottom ── */}
      <mesh position={[0, -0.052, 0]} material={polishedTitanium} castShadow>
        <cylinderGeometry args={[0.28, 0.20, 0.012, 64]} />
      </mesh>

      {/* ── Central bore (hollow shaft hole) ── */}
      <mesh material={brushedRim}>
        <cylinderGeometry args={[0.085, 0.085, 0.14, 48]} />
      </mesh>

      {/* ── Bore inner lip ── */}
      <mesh material={polishedTitanium}>
        <torusGeometry args={[0.085, 0.012, 24, 64]} />
      </mesh>

      {/* ── Bolt pattern (6 precision holes represented as dark recesses) ── */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.032]}
            material={anodizedHub}
            castShadow
          >
            <cylinderGeometry args={[0.028, 0.028, 0.04, 24]} />
          </mesh>
        );
      })}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STUDIO LIGHTING — Three-point, industrial photoshoot
// Fades from darkness during hero intro sequence
// ─────────────────────────────────────────────────────────────────────────────

function StudioLighting() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    let t = 1;
    if (!(window as any).heroInteractionEnabled) {
      const elapsed = state.clock.getElapsedTime();
      if (elapsed < 1.3) t = 0;
      else {
        t = Math.min(1, (elapsed - 1.3) / 2.5);
        t = 1 - Math.pow(1 - t, 3);
      }
    }

    groupRef.current.children.forEach((child: any) => {
      if (child.isLight && child.userData.base !== undefined) {
        child.intensity = child.userData.base * t;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Warehouse environment — provides the base reflection map */}
      <Environment files="/empty_warehouse_01_1k.hdr" background={false} />

      {/* Key Light — upper right, warm-neutral, primary drama source */}
      <Lightformer
        form="rect"
        intensity={0}
        userData={{ base: 25 }}
        color="#F3EFE8" // Warm Ivory
        position={[8, 10, 6]}
        scale={[12, 12, 1]}
        target={[0, 0, 0]}
      />

      {/* Rim Light — behind left, Steel Blue signature, creates striking separation */}
      <Lightformer
        form="rect"
        intensity={0}
        userData={{ base: 60 }}
        color="#6E89A8" // Steel Blue accent
        position={[-8, 6, -6]}
        scale={[20, 20, 1]}
        target={[0, 0, 0]}
      />

      {/* Fill Light — below front left, lifts shadow detail extremely softly */}
      <Lightformer
        form="rect"
        intensity={0}
        userData={{ base: 0.2 }}
        color="#8A949F" // Secondary text colour for subtle fill
        position={[-5, -5, 6]}
        scale={[14, 14, 1]}
        target={[0, 0, 0]}
      />

      {/* Ground bounce — gives object weight, slight upward warm fill */}
      <Lightformer
        form="rect"
        intensity={0}
        userData={{ base: 0.8 }}
        color="#e8e0d0"
        position={[0, -2.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8, 8, 1]}
        target={[0, 0, 0]}
      />

      {/* Minimal ambient — just enough to see into deep shadow areas */}
      <ambientLight intensity={0} userData={{ base: 0.01 }} />

      {/* Sharp shadow-casting directional */}
      <directionalLight
        castShadow
        position={[8, 12, 6]}
        intensity={0}
        userData={{ base: 5.0 }}
      />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUND REFLECTION PLANE
// Subtle — gives object physical weight without looking like a showroom
// ─────────────────────────────────────────────────────────────────────────────

function GroundPlane() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.22, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        resolution={256}
        mirror={0.15}
        blur={[500, 200]}
        mixBlur={2.0}
        roughness={0.98}
        depthScale={0.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#232A31"
        metalness={0.2}
        opacity={0.15}
        transparent
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT SCENE
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroModel() {
  const { mouse, viewport } = useThree();
  const pivotRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!pivotRef.current) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    
    // Idle animation: Extremely slow object rotation & minimal camera drift
    const time = state.clock.getElapsedTime();
    pivotRef.current.position.y = Math.sin(time * 0.5) * 0.015; // Slow vertical breath
    
    if (!(window as any).heroInteractionEnabled) {
      // Intro camera settle (slowly easing into final position)
      if (time > 1.3) {
        pivotRef.current.rotation.x = THREE.MathUtils.damp(pivotRef.current.rotation.x, 0, 0.2, delta);
        pivotRef.current.rotation.y = THREE.MathUtils.damp(pivotRef.current.rotation.y, 0, 0.2, delta);
      }
      return;
    }

    // Subtle parallax tracking + Idle rotation
    const tx = (mouse.y * viewport.height) / 100;
    const ty = (mouse.x * viewport.width) / 100 + Math.sin(time * 0.2) * 0.05; // Added idle drift

    pivotRef.current.rotation.x = THREE.MathUtils.damp(
      pivotRef.current.rotation.x,
      tx,
      1.0,
      delta,
    );
    pivotRef.current.rotation.y = THREE.MathUtils.damp(
      pivotRef.current.rotation.y,
      ty,
      1.0,
      delta,
    );
  });

  return (
    <>
      <StudioLighting />

      <PresentationControls
        global={false}
        cursor
        snap
        speed={0.7}
        zoom={1}
        rotation={[4 * Math.PI / 180, 10 * Math.PI / 180, 0]}
        polar={[-Math.PI / 12, Math.PI / 12]}
        azimuth={[-Math.PI / 10, Math.PI / 10]}
      >
        <Float
          speed={0.6}
          rotationIntensity={0.008}
          floatIntensity={0.02}
          floatingRange={[-0.012, 0.012]}
        >
          <group ref={pivotRef} position={[0.25, 0.0, 0]} scale={0.93}>
            <Center>
              <TurbineDisc />
            </Center>
          </group>
        </Float>
      </PresentationControls>

      <GroundPlane />
    </>
  );
}