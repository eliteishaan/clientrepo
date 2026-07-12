import { AdaptedAsset } from '@/lib/types/viewer';
import { ViewerInstance } from '@/lib/store/useViewerStore';
import { clsx } from 'clsx';

export function ViewerHUD({ asset, instance }: { asset: AdaptedAsset, instance: ViewerInstance }) {
  const isLoading = instance.rendererState === 'Loading';
  
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-20 flex justify-between items-start p-6 md:p-8">
      {/* Top Left: Metadata HUD */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className={clsx(
            "w-2 h-2 rounded-full transition-colors duration-300",
            isLoading ? "bg-accent animate-pulse" : 
            instance.isPaused ? "bg-warning" : "bg-success"
          )} />
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-text-primary bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/5">
            {asset.title}
          </span>
        </div>
        
        <div className="flex flex-col gap-1 mt-2 pl-5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <div className="flex items-center gap-4 bg-black/20 px-2 py-1 rounded w-max backdrop-blur-sm">
            <span className="text-white/40">ID</span>
            <span className="text-white/80">{asset.id}</span>
          </div>
          <div className="flex items-center gap-4 bg-black/20 px-2 py-1 rounded w-max backdrop-blur-sm">
            <span className="text-white/40">REV</span>
            <span className="text-white/80">{asset.metadata.revision}</span>
          </div>
          <div className="flex items-center gap-4 bg-black/20 px-2 py-1 rounded w-max backdrop-blur-sm">
            <span className="text-white/40">MAT</span>
            <span className="text-white/80">{asset.metadata.material}</span>
          </div>
        </div>
      </div>

      {/* Top Right: Status & Tech Specs */}
      <div className="flex flex-col items-end gap-2">
        <div className="bg-black/40 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2 text-white/50">
            <span>MODE</span>
            <span className="text-accent">{instance.activeMode}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <span>SCL</span>
            <span className="text-white/80">{asset.metadata.scale}</span>
          </div>
        </div>
        
        {isLoading && (
          <div className="mt-2 text-accent font-mono text-[10px] tracking-widest uppercase animate-pulse">
            Allocating Memory...
          </div>
        )}
      </div>
    </div>
  );
}
