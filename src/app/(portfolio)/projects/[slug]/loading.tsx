'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loading() {
  const container = useRef<HTMLDivElement>(null);
  const progressLine = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    gsap.to(progressLine.current, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      repeat: -1,
      yoyo: true,
      transformOrigin: 'left center'
    });
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col w-full h-[100svh] bg-background items-center justify-center relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center gap-8">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs tracking-widest uppercase text-accent animate-pulse">
            Allocating Resources
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            INITIALIZING PROJECT MANIFEST
          </span>
        </div>
        
        <div className="w-48 h-px bg-white/10 overflow-hidden relative">
          <div ref={progressLine} className="absolute inset-0 bg-accent scale-x-0" />
        </div>
      </div>
    </div>
  );
}
