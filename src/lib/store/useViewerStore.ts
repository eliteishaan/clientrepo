import { create } from 'zustand';
import { ViewerMode, PerformanceTier, LifecycleState, RendererState, CameraPreset, AdaptedAsset } from '../types/viewer';

export interface ViewerInstance {
  lifecycle: LifecycleState;
  rendererState: RendererState;
  loadingProgress: number;
  selectedAsset: AdaptedAsset | null;
  cameraPreset: CameraPreset | null;
  activeMode: ViewerMode;
  supportedCapabilities: ViewerMode[];
  isPaused: boolean;
}

interface ViewerState {
  viewers: Record<string, ViewerInstance>;
  performanceTier: PerformanceTier;
  activeAnnotationId: string | null;
  
  // Actions
  initViewer: (id: string, initialData?: Partial<ViewerInstance>) => void;
  setViewerState: (id: string, state: Partial<ViewerInstance>) => void;
  setLifecycle: (id: string, lifecycle: LifecycleState) => void;
  setRendererState: (id: string, state: RendererState) => void;
  setPauseState: (id: string, isPaused: boolean) => void;
  setMode: (id: string, mode: ViewerMode) => void;
  triggerAnnotation: (annotationId: string | null) => void;
  detectCPUPerformanceTier: () => void;
  lockGPUPerformanceTier: (tier: PerformanceTier) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  viewers: {},
  performanceTier: 'Unknown',
  activeAnnotationId: null,

  initViewer: (id, initialData) => set((state) => ({
    viewers: {
      ...state.viewers,
      [id]: {
        lifecycle: 'Created',
        rendererState: 'Loading',
        loadingProgress: 0,
        selectedAsset: null,
        cameraPreset: null,
        activeMode: 'Solid',
        supportedCapabilities: [],
        isPaused: true,
        ...initialData,
      }
    }
  })),

  setViewerState: (id, newState) => set((state) => {
    if (!state.viewers[id]) return state;
    return {
      viewers: {
        ...state.viewers,
        [id]: { ...state.viewers[id], ...newState }
      }
    };
  }),

  setLifecycle: (id, lifecycle) => set((state) => {
    if (!state.viewers[id]) return state;
    return {
      viewers: {
        ...state.viewers,
        [id]: { ...state.viewers[id], lifecycle }
      }
    };
  }),

  setRendererState: (id, rendererState) => set((state) => {
    if (!state.viewers[id]) return state;
    return {
      viewers: {
        ...state.viewers,
        [id]: { ...state.viewers[id], rendererState }
      }
    };
  }),

  setPauseState: (id, isPaused) => set((state) => {
    if (!state.viewers[id]) return state;
    return {
      viewers: {
        ...state.viewers,
        [id]: { ...state.viewers[id], isPaused }
      }
    };
  }),

  setMode: (id, mode) => set((state) => {
    if (!state.viewers[id]) return state;
    return {
      viewers: {
        ...state.viewers,
        [id]: { ...state.viewers[id], activeMode: mode }
      }
    };
  }),

  triggerAnnotation: (annotationId) => set({ activeAnnotationId: annotationId }),

  detectCPUPerformanceTier: () => {
    if (typeof window === 'undefined' || !navigator) return;
    
    let tier: PerformanceTier = 'Mid';
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = (navigator as any).deviceMemory || 4; 
    
    if (hardwareConcurrency >= 8 && deviceMemory >= 8) {
      tier = 'High';
    } else if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
      tier = 'Low';
    }
    
    set({ performanceTier: tier });
  },

  lockGPUPerformanceTier: (tier) => set({ performanceTier: tier })
}));
