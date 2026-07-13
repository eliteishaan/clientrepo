import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { AdaptedAsset, RendererEngine } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clsx } from 'clsx';

const SVGRenderer = forwardRef<RendererEngine, { asset: AdaptedAsset, viewerId: string }>(
  ({ asset, viewerId }, ref) => {
    const [svgContent, setSvgContent] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);
    const svgWrapRef = useRef<HTMLDivElement>(null);
    
    const { viewers, setRendererState } = useViewerStore();
    const instance = viewers[viewerId];

    // Pan & Zoom
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragStart = useRef({ x: 0, y: 0 });

    useImperativeHandle(ref, () => ({
      load: async (url: string) => {
        setRendererState(viewerId, 'Loading');
        try {
          const res = await fetch(url);
          const text = await res.text();
          setSvgContent(text);
          setRendererState(viewerId, 'Ready');
        } catch {
          setRendererState(viewerId, 'Failed');
        }
      },
      dispose: () => { setSvgContent(''); },
      pause: () => {},
      resume: () => {},
      setMode: () => {},
      focusAnnotation: () => {},
      capture: () => '',
      resetView: () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    }));

    useEffect(() => {
      if (!svgContent) {
        fetch(asset.sourceUrl)
          .then(res => res.text())
          .then(text => {
            setSvgContent(text);
            setRendererState(viewerId, 'Ready');
          })
          .catch(() => setRendererState(viewerId, 'Failed'));
      }
    }, [asset.sourceUrl, svgContent, viewerId, setRendererState]);

    useGSAP(() => {
      if (!svgWrapRef.current || !svgContent) return;
      gsap.fromTo(svgWrapRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }, [svgContent]);

    // Pan/Zoom Handlers
    const handleWheel = (e: React.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const newScale = Math.min(Math.max(0.5, scale - e.deltaY * 0.01), 5);
        setScale(newScale);
      }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
      e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y
        });
      }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const activeMode = instance?.activeMode || 'Blueprint';

    return (
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full bg-surface-inset flex items-center justify-center overflow-hidden touch-none"
        onWheel={handleWheel}
      >
        <div 
          ref={svgWrapRef}
          className={clsx(
            "relative transition-transform duration-75",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div 
            className={`w-[80vw] md:w-[60vw] max-w-5xl h-auto svg-engine-${activeMode.toLowerCase()}`}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .svg-engine-blueprint svg { stroke: var(--text-primary); stroke-width: 1px; fill: none; transition: all 0.5s ease; }
          .svg-engine-blueprint svg path { vector-effect: non-scaling-stroke; }
          .svg-engine-layers svg { stroke: var(--text-secondary); fill: none; }
          .svg-engine-layers svg g[data-layer="dimensions"] { stroke: var(--accent); opacity: 0.8; stroke-width: 2px; }
          .svg-engine-layers svg g[data-layer="annotations"] { stroke: var(--error); opacity: 0.9; }
        `}} />
      </div>
    );
  }
);

SVGRenderer.displayName = 'SVGRenderer';
export default SVGRenderer;
