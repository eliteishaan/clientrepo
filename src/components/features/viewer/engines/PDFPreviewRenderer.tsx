import { forwardRef, useImperativeHandle } from 'react';
import { AdaptedAsset, RendererEngine } from '@/lib/types/viewer';
import { FileIcon, ExternalLinkIcon } from 'lucide-react';
import { useViewerStore } from '@/lib/store/useViewerStore';

const PDFPreviewRenderer = forwardRef<RendererEngine, { asset: AdaptedAsset, viewerId: string }>(
  ({ asset, viewerId }, ref) => {
    const { setRendererState } = useViewerStore();

    useImperativeHandle(ref, () => ({
      load: async (_url: string) => {
        setRendererState(viewerId, 'Ready');
      },
      dispose: () => {},
      pause: () => {},
      resume: () => {},
      setMode: (_mode) => {},
      focusAnnotation: (_id) => {},
      capture: () => '',
      resetView: () => {}
    }));

    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-surface-inset p-8">
        <div className="max-w-md w-full bg-background border border-border p-8 rounded-md shadow-elevation-high text-center flex flex-col items-center gap-4">
          
          <div className="w-16 h-16 bg-surface-elevated rounded-full flex items-center justify-center mb-2">
            <FileIcon className="w-8 h-8 text-accent" />
          </div>
          
          <h3 className="text-title font-bold tracking-tight">{asset.title}</h3>
          
          <div className="text-sm font-mono text-text-secondary flex gap-4">
            <span>REV: {asset.metadata.revision}</span>
            <span>DOCUMENT</span>
          </div>

          <p className="text-sm text-text-secondary mt-2">
            PDF rendering requires a native viewer for optimal precision and security.
          </p>

          <a 
            href={asset.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-background font-mono text-sm tracking-widest uppercase hover:bg-text-secondary transition-colors"
          >
            Open Document <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }
);

PDFPreviewRenderer.displayName = 'PDFPreviewRenderer';
export default PDFPreviewRenderer;
