'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AdaptedAsset } from '@/lib/types/viewer';
import { useViewerStore } from '@/lib/store/useViewerStore';
import { clsx } from 'clsx';

export default function ImageRenderer({ asset, viewerId }: { asset: AdaptedAsset; viewerId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { setRendererState } = useViewerStore();
  
  // Pan and Zoom state
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Basic lifecycle hook
    setRendererState(viewerId, 'Ready');
  }, [viewerId, setRendererState]);

  useGSAP(() => {
    if (!containerRef.current || !imageWrapRef.current) return;
    
    // Initial progressive reveal
    gsap.fromTo(imageWrapRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  // Handle Zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const newScale = Math.min(Math.max(1, scale - e.deltaY * 0.01), 5);
      setScale(newScale);
      
      // If we zoom all the way out, reset position
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  // Handle Pan
  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
      // Capture pointer so dragging continues even if cursor leaves image briefly
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && scale > 1) {
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
  
  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden touch-none"
      onWheel={handleWheel}
    >
      <div 
        ref={imageWrapRef}
        className={clsx(
          "relative w-full h-full flex items-center justify-center transition-transform duration-75",
          scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDoubleClick={handleDoubleClick}
      >
        <Image
          ref={imgRef}
          src={asset.sourceUrl}
          alt={asset.title}
          fill
          priority
          sizes="100vw"
          className="object-contain pointer-events-none"
          draggable={false}
          onLoadingComplete={() => setRendererState(viewerId, 'Ready')}
        />
      </div>
      
      {/* Zoom Hint */}
      {scale === 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full pointer-events-none opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
            Double-click or Cmd/Ctrl + Scroll to Zoom
          </span>
        </div>
      )}
    </div>
  );
}
