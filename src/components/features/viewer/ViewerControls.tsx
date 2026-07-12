import { useState } from 'react';
import { AdaptedAsset, ViewerMode } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { clsx } from 'clsx';

export function ViewerControls({ asset, viewerId }: { asset: AdaptedAsset, viewerId: string }) {
  const { viewers, setMode } = useViewerStore();
  const instance = viewers[viewerId];
  
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!instance) return null;

  const toggleFullscreen = () => {
    const el = document.getElementById(`viewer-${viewerId}`);
    if (!el) return;
    
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    // Premium feedback without actual download logic for now
    // Note: Actual download logic should go here via anchor tag or blob fetch
    // TODO: implement standard download trigger
  };

  // Build the mode array based on capabilities
  const modes: ViewerMode[] = [];
  if (asset.type === 'GLB') {
    modes.push('Solid'); // Default
    if (asset.capabilities.includes('Wireframe')) modes.push('Wireframe');
    if (asset.capabilities.includes('Exploded')) modes.push('Exploded');
    if (asset.capabilities.includes('Section')) modes.push('Section');
  } else if (asset.type === 'SVG') {
    modes.push('Layers'); // Default
  }

  // If there are no modes and it's an image/video/pdf, we just show utilities
  const showModes = modes.length > 0;

  return (
    <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      
      {/* Primary Rendering Modes Dock */}
      {showModes && (
        <div className="flex items-center bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
          {modes.map(mode => {
            const isActive = instance.activeMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setMode(viewerId, mode)}
                className={clsx(
                  "px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-full",
                  isActive 
                    ? "bg-white text-black shadow-sm" 
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {mode}
              </button>
            );
          })}
        </div>
      )}

      {/* Utility Actions Dock */}
      <div className="flex items-center bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
        <button
          onClick={handleDownload}
          className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title="Download Original"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      </div>
      
    </div>
  );
}
