import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { AdaptedAsset, RendererEngine } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';

const SVGRenderer = forwardRef<RendererEngine, { asset: AdaptedAsset, viewerId: string }>(
  ({ asset, viewerId }, ref) => {
    const [svgContent, setSvgContent] = useState<string>('');
    const { viewers, setRendererState } = useViewerStore();
    const instance = viewers[viewerId];

    useImperativeHandle(ref, () => ({
      load: async (url: string) => {
        setRendererState(viewerId, 'Loading');
        try {
          const res = await fetch(url);
          const text = await res.text();
          setSvgContent(text);
          setRendererState(viewerId, 'Ready');
        } catch (e) {
          setRendererState(viewerId, 'Failed');
        }
      },
      dispose: () => { setSvgContent(''); },
      pause: () => {},
      resume: () => {},
      setMode: (_mode) => {},
      focusAnnotation: (_id) => {},
      capture: () => '',
      resetView: () => {}
    }));

    useEffect(() => {
      // Auto-load on mount for simple integration
      if (!svgContent) {
        fetch(asset.sourceUrl)
          .then(res => res.text())
          .then(text => setSvgContent(text))
          .catch(err => console.error(err));
      }
    }, [asset.sourceUrl]);

    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-surface-inset overflow-auto">
        <div 
          className={`w-full max-w-4xl h-auto transition-opacity duration-500 ${svgContent ? 'opacity-100' : 'opacity-0'} svg-engine-${instance?.activeMode?.toLowerCase()}`}
          dangerouslySetInnerHTML={{ __html: svgContent }} 
        />
        <style dangerouslySetInnerHTML={{__html: `
          .svg-engine-blueprint svg { stroke: var(--theme-text-primary); fill: none; }
          .svg-engine-layers svg g[data-layer="dimensions"] { stroke: var(--theme-accent); opacity: 0.5; }
        `}} />
      </div>
    );
  }
);

SVGRenderer.displayName = 'SVGRenderer';
export default SVGRenderer;
