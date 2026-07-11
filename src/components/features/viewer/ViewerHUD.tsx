import { AdaptedAsset } from '@/lib/types/viewer';
import { ViewerInstance } from '@/lib/store/useViewerStore';

export function ViewerHUD({ asset, instance }: { asset: AdaptedAsset, instance: ViewerInstance }) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none z-20 flex justify-between items-start font-mono text-[10px] uppercase tracking-wider text-text-secondary">
      {/* Top Left: Metadata */}
      <div className="flex flex-col gap-1">
        <span className="text-text-primary font-bold">{asset.title}</span>
        <span>REV: {asset.metadata.revision}</span>
        <span>MAT: {asset.metadata.material}</span>
      </div>

      {/* Top Right: Status & Mode */}
      <div className="flex flex-col gap-1 text-right">
        <div className="flex items-center justify-end gap-2 text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {instance.isPaused ? 'STANDBY' : 'ACTIVE_RENDER'}
        </div>
        <span>MODE: {instance.activeMode}</span>
        <span>SCL: {asset.metadata.scale}</span>
      </div>
    </div>
  );
}
