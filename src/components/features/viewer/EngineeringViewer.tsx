'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AdaptedAsset } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { AssetValidator } from '@/lib/adapters/AssetValidator';
import { ViewerHUD } from './ViewerHUD';
import { ViewerControls } from './ViewerControls';

// Lazy loaded heavy engines
const WebGLRenderer = dynamic(() => import('./engines/WebGLRenderer'), { 
  ssr: false, 
  loading: () => <EngineLoader type="GLB" /> 
});
const SVGRenderer = dynamic(() => import('./engines/SVGRenderer'), { 
  ssr: false, 
  loading: () => <EngineLoader type="SVG" /> 
});
const PDFPreviewRenderer = dynamic(() => import('./engines/PDFPreviewRenderer'), { 
  ssr: false, 
  loading: () => <EngineLoader type="PDF" /> 
});
const ImageRenderer = dynamic(() => import('./engines/ImageRenderer'), { 
  ssr: false, 
  loading: () => <EngineLoader type="IMG" /> 
});
const VideoRenderer = dynamic(() => import('./engines/VideoRenderer'), { 
  ssr: false, 
  loading: () => <EngineLoader type="VID" /> 
});

function EngineLoader({ type }: { type: string }) {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10 font-mono">
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        <div className="absolute inset-0 border border-accent/20 rounded-full animate-[spin_4s_linear_infinite]" />
        <div className="absolute inset-4 border-t border-r border-accent/40 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
        <div className="absolute inset-8 border border-dashed border-accent/30 rounded-full animate-[spin_6s_linear_infinite]" />
        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      </div>
      <div className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-2">
        Allocating {type} Engine
      </div>
      <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
        Establishing VRAM Buffer{dots}
      </div>
    </div>
  );
}

export function EngineeringViewer({ asset, viewerId }: { asset: AdaptedAsset, viewerId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const { initViewer, setPauseState, setLifecycle, detectCPUPerformanceTier, viewers } = useViewerStore();
  const instance = viewers[viewerId];

  useEffect(() => {
    detectCPUPerformanceTier();
    
    // Asset Validation Stage
    const validation = AssetValidator.validate(asset);
    if (!validation.isValid) {
      setValidationError(validation.reason || 'Unknown validation error');
      initViewer(viewerId, { lifecycle: 'Disposed', rendererState: 'Failed' });
      return;
    }

    initViewer(viewerId, {
      selectedAsset: asset,
      supportedCapabilities: asset.capabilities,
      activeMode: 'Solid',
      lifecycle: 'Loading',
      rendererState: 'Loading',
    });

    // We assume the shell is ready once validation passes
    setLifecycle(viewerId, 'Ready');

    return () => {
      // Immediate dispose on unmount
      setLifecycle(viewerId, 'Disposed');
    };
  }, [asset, viewerId, detectCPUPerformanceTier, initViewer, setLifecycle]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // The "One WebGL Rule" and off-screen pausing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          setPauseState(viewerId, !isVisible);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [viewerId, setPauseState]);

  if (validationError) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-video bg-black flex flex-col items-center justify-center font-mono border border-error/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-error/5 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <span className="text-error font-bold uppercase tracking-[0.2em] mb-2 z-10">SYSTEM_ERR</span>
        <span className="text-error/70 text-xs tracking-widest uppercase z-10">{validationError}</span>
      </div>
    );
  }

  if (!instance) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-video bg-black relative border border-white/10 flex items-center justify-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 animate-pulse">
          INITIALIZING...
        </span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-video bg-black overflow-hidden flex flex-col group rounded-sm shadow-2xl"
      id={`viewer-${viewerId}`}
    >
      {/* Structural Crosshairs & UI Framing */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent/50 z-30 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/50 z-30 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/50 z-30 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent/50 z-30 pointer-events-none transition-all duration-300 group-hover:w-12 group-hover:h-12" />
      
      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none opacity-20 flex items-center justify-center">
        <div className="w-full h-px bg-white/50" />
        <div className="absolute w-px h-full bg-white/50" />
      </div>

      <ViewerHUD asset={asset} instance={instance} />
      
      {/* Renderer Routing */}
      <div className="relative flex-grow w-full h-full cursor-grab active:cursor-grabbing">
        {asset.type === 'GLB' && !instance.isPaused && <WebGLRenderer asset={asset} viewerId={viewerId} />}
        {asset.type === 'SVG' && <SVGRenderer asset={asset} viewerId={viewerId} />}
        {asset.type === 'PDF' && <PDFPreviewRenderer asset={asset} viewerId={viewerId} />}
        {asset.type === 'Image' && <ImageRenderer asset={asset} viewerId={viewerId} />}
        {asset.type === 'Video' && <VideoRenderer asset={asset} viewerId={viewerId} />}
      </div>

      <ViewerControls asset={asset} viewerId={viewerId} />
    </div>
  );
}
