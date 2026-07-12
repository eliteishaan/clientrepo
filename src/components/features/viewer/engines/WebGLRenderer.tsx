import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Preload, ContactShadows, Bounds, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AdaptedAsset, RendererEngine, ViewerMode } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';

// Premium Material Library
const premiumMaterials = {
  wireframe: new THREE.MeshBasicMaterial({ 
    color: 0x888888, 
    wireframe: true,
    transparent: true,
    opacity: 0.5
  }),
  ghost: new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.2,
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1
  })
};

function Model({ url, activeMode, isPaused }: { url: string, activeMode: ViewerMode, isPaused: boolean }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const originalPositions = useRef<Map<string, THREE.Vector3>>(new Map());
  const originalMaterials = useRef<Map<string, THREE.Material | THREE.Material[]>>(new Map());

  // Store original state on load
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (!originalMaterials.current.has(mesh.uuid)) {
          originalMaterials.current.set(mesh.uuid, mesh.material);
        }
        if (!originalPositions.current.has(mesh.uuid)) {
          originalPositions.current.set(mesh.uuid, mesh.position.clone());
        }
        
        // Enable premium rendering features
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  // Handle Mode Switching with GSAP
  useGSAP(() => {
    if (isPaused) return;

    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      
      // Exploded View Logic
      if (activeMode === 'Exploded') {
        const center = new THREE.Vector3();
        mesh.geometry.computeBoundingBox();
        mesh.geometry.boundingBox?.getCenter(center);
        
        // Push outwards from center based on bounding box
        const dir = center.clone().normalize();
        const targetPos = originalPositions.current.get(mesh.uuid)?.clone().add(dir.multiplyScalar(2)) || mesh.position;
        
        gsap.to(mesh.position, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 1.5,
          ease: "power3.inOut"
        });
      } else {
        const origPos = originalPositions.current.get(mesh.uuid);
        if (origPos) {
          gsap.to(mesh.position, {
            x: origPos.x,
            y: origPos.y,
            z: origPos.z,
            duration: 1.5,
            ease: "power3.inOut"
          });
        }
      }

      // Material Switching Logic
      if (activeMode === 'Wireframe') {
        mesh.material = premiumMaterials.wireframe;
      } else {
        const origMat = originalMaterials.current.get(mesh.uuid);
        if (origMat) mesh.material = origMat;
      }
    });
  }, [activeMode, isPaused, scene]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Camera Auto-Framer
function AutoFramer() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  
  useGSAP(() => {
    // Reveal animation for camera
    gsap.from(camera.position, {
      y: camera.position.y + 5,
      z: camera.position.z + 5,
      duration: 2,
      ease: "power3.out"
    });
  }, []);

  return <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 1.5} minDistance={1} maxDistance={20} />;
}

const WebGLRenderer = forwardRef<RendererEngine, { asset: AdaptedAsset, viewerId: string }>(
  ({ asset, viewerId }, ref) => {
    const { viewers, performanceTier, lockGPUPerformanceTier, setRendererState } = useViewerStore();
    const instance = viewers[viewerId];
    
    // Track initialization
    useEffect(() => {
      useGLTF.preload(asset.sourceUrl);
      setRendererState(viewerId, 'Ready');
      return () => {
        useGLTF.clear(asset.sourceUrl);
      };
    }, [asset.sourceUrl, viewerId, setRendererState]);

    useImperativeHandle(ref, () => ({
      load: async (url: string) => {
        setRendererState(viewerId, 'Loading');
        try {
          await useGLTF.preload(url);
          setRendererState(viewerId, 'Ready');
        } catch {
          setRendererState(viewerId, 'Failed');
        }
      },
      dispose: () => {
        useGLTF.clear(asset.sourceUrl);
      },
      pause: () => {},
      resume: () => {},
      setMode: () => {},
      focusAnnotation: () => {},
      capture: () => '',
      resetView: () => {}
    }));

    // Tier based rendering quality
    const dpr = performanceTier === 'Low' ? 1 : performanceTier === 'Mid' ? 1.5 : 2;
    const shadowMapSize = performanceTier === 'High' ? 2048 : performanceTier === 'Mid' ? 1024 : 512;

    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-background to-surface-inset opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        <Canvas 
          camera={{ position: [5, 5, 5], fov: 45 }}
          dpr={dpr}
          gl={{ 
            antialias: performanceTier !== 'Low', 
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
          shadows={performanceTier !== 'Low'}
          className="w-full h-full outline-none"
          onCreated={({ gl }) => {
            const capabilities = gl.capabilities;
            if (capabilities.maxTextureSize < 4096) {
              lockGPUPerformanceTier('Low');
            }
          }}
        >
          {performanceTier === 'Low' && <AdaptiveDpr pixelated />}
          <Environment preset="studio" environmentIntensity={0.8} />
          
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={1.5} 
            castShadow={performanceTier !== 'Low'}
            shadow-mapSize={[shadowMapSize, shadowMapSize]}
            shadow-bias={-0.0001}
          />
          
          <Bounds fit clip observe margin={1.2}>
            {!instance.isPaused && (
              <Model url={asset.sourceUrl} activeMode={instance.activeMode} isPaused={instance.isPaused} />
            )}
          </Bounds>
          
          {performanceTier !== 'Low' && (
            <ContactShadows 
              position={[0, -1, 0]} 
              opacity={0.5} 
              scale={10} 
              blur={2} 
              far={4} 
              color="#000000"
            />
          )}
          
          <AutoFramer />
          <Preload all />
        </Canvas>
      </div>
    );
  }
);

WebGLRenderer.displayName = 'WebGLRenderer';
export default WebGLRenderer;
