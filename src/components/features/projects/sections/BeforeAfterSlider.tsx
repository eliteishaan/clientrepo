'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import { Text } from '@/components/ui/Text';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Before', 
  afterLabel = 'After',
  className 
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPosition(percent);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    } else {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging, onPointerMove, onPointerUp]);

  return (
    <div 
      ref={containerRef}
      className={clsx('relative w-full aspect-video select-none overflow-hidden rounded-md border border-border bg-surface cursor-col-resize touch-pan-y', className)}
      onPointerDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
    >
      {/* After Image (Background) */}
      <img src={afterImage} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      
      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-accent pointer-events-none z-10 flex items-center justify-center shadow-elevation-high"
        style={{ left: `${position}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center shadow-elevation-mid">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
            <path d="M11 5l-7 7 7 7M13 19l7-7-7-7"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <Text variant="label" className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-sm border border-border">{beforeLabel}</Text>
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <Text variant="label" className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-sm border border-border">{afterLabel}</Text>
      </div>
    </div>
  );
}
