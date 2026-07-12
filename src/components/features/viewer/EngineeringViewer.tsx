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
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated z-10 font-mono text-caption text-text-secondary animate-pulse">
      [ FETCHING_{type}_ENGINE ]
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
          // If strictly intersecting, unpause
          const isVisible = entry.isIntersecting;
          setPauseState(viewerId, !isVisible);
        });
      },
      { threshold: 0.1 } // At least 10% visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [viewerId, setPauseState]);

  if (validationError) {
    return <div className="w-full aspect-video bg-surface flex items-center justify-center font-mono text-error border border-error">ERROR: {validationError}</div>;
  }

  if (!instance) return <div className="w-full aspect-video bg-surface animate-pulse" />; // Stage 1: Placeholder

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-background border border-border overflow-hidden flex flex-col group"
      id={`viewer-${viewerId}`}
    >
      <ViewerHUD asset={asset} instance={instance} />
      
      {/* Renderer Routing */}
      <div className="relative flex-grow">
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
