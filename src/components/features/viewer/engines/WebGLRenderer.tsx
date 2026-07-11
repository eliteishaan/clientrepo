import { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { AdaptedAsset, RendererEngine } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';

function Model({ url, activeMode }: { url: string, activeMode: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (!mesh.userData.originalMaterial) {
          mesh.userData.originalMaterial = mesh.material;
        }
        
        if (activeMode === 'Wireframe') {
          const wireMat = new THREE.MeshBasicMaterial({ color: 0x888888, wireframe: true });
          mesh.material = wireMat;
        } else if (activeMode === 'Section') {
          mesh.material = mesh.userData.originalMaterial;
        } else {
          mesh.material = mesh.userData.originalMaterial;
        }
      }
    });

    return () => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material;
          if (mat && mat !== (child as THREE.Mesh).userData.originalMaterial) {
            (mat as THREE.Material).dispose();
          }
        }
      });
    };
  }, [activeMode, scene]);

  return <primitive object={scene} />;
}

const WebGLRenderer = forwardRef<RendererEngine, { asset: AdaptedAsset, viewerId: string }>(
  ({ asset, viewerId }, ref) => {
    const { viewers, performanceTier, lockGPUPerformanceTier, setRendererState } = useViewerStore();
    const instance = viewers[viewerId];

    useImperativeHandle(ref, () => ({
      load: async (url: string) => {
        setRendererState(viewerId, 'Loading');
        try {
          await useGLTF.preload(url);
          setRendererState(viewerId, 'Ready');
        } catch (e) {
          setRendererState(viewerId, 'Failed');
        }
      },
      dispose: () => {
        useGLTF.clear(asset.sourceUrl);
      },
      pause: () => {},
      resume: () => {},
      setMode: (_mode) => {},
      focusAnnotation: (_id) => {},
      capture: () => '',
      resetView: () => {}
    }));

    const dpr = performanceTier === 'Low' ? 1 : performanceTier === 'Mid' ? 1.5 : 2;

    useEffect(() => {
      return () => {
        useGLTF.clear(asset.sourceUrl);
      };
    }, [asset.sourceUrl]);

    return (
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: performanceTier !== 'Low', powerPreference: 'high-performance' }}
        className="w-full h-full cursor-move"
        onCreated={({ gl }) => {
          // Hardware refinement: if rendering hits limits, downgrade tier
          const capabilities = gl.capabilities;
          if (capabilities.maxTextureSize < 4096) {
            lockGPUPerformanceTier('Low');
          }
        }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {!instance.isPaused && (
          <Model url={asset.sourceUrl} activeMode={instance.activeMode} />
        )}
        
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      </Canvas>
    );
  }
);

WebGLRenderer.displayName = 'WebGLRenderer';
export default WebGLRenderer;
