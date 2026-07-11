import { AdaptedAsset } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';

export function ViewerControls({ asset, viewerId }: { asset: AdaptedAsset, viewerId: string }) {
  const { viewers, setMode } = useViewerStore();
  const instance = viewers[viewerId];

  if (!instance) return null;

  // We only show controls if the asset supports them
  const modes = ['Solid']; // Solid is universally the default for 3D
  if (asset.capabilities.includes('Wireframe')) modes.push('Wireframe');
  if (asset.capabilities.includes('Exploded')) modes.push('Exploded');
  if (asset.capabilities.includes('Section')) modes.push('Section');

  // SVG specific
  if (asset.type === 'SVG') {
    modes.length = 0; // Clear 3D modes
    modes.push('Blueprint');
    if (asset.capabilities.includes('Layers')) modes.push('Layers');
  }

  // PDF specific
  if (asset.type === 'PDF') return null; // Preview has no viewer modes

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center bg-surface-elevated border border-border p-1 rounded-md z-20 shadow-elevation-low transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      {modes.map(mode => (
        <button
          key={mode}
          onClick={() => setMode(viewerId, mode as any)}
          className={`px-3 py-1.5 text-xs font-mono tracking-widest transition-colors rounded-sm ${
            instance.activeMode === mode 
              ? 'bg-accent text-accent-foreground' 
              : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
