export type LifecycleState = 'Created' | 'Loading' | 'Ready' | 'Active' | 'Paused' | 'Disposed';
export type RendererState = 'Loading' | 'Ready' | 'Failed' | 'Fallback' | 'Retry';
export type ViewerMode = 'Solid' | 'Wireframe' | 'Exploded' | 'Section' | 'Layers' | 'Measurements' | 'Annotations' | 'Analysis';
export type PerformanceTier = 'High' | 'Mid' | 'Low' | 'Unknown';

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface AdaptedAsset {
  id: string;
  type: 'GLB' | 'SVG' | 'PDF' | 'Image' | 'Video';
  sourceUrl: string;
  title: string;
  capabilities: ViewerMode[];
  metadata: {
    revision: string;
    scale: string;
    material: string;
    status: string;
    assetVersion: string;
    checksum: string;
  };
}

export interface RendererEngine {
  load: (url: string) => Promise<void>;
  dispose: () => void;
  pause: () => void;
  resume: () => void;
  setMode: (mode: ViewerMode) => void;
  focusAnnotation: (id: string) => void;
  capture: () => string; // Base64 DataURL
  resetView: () => void;
}
