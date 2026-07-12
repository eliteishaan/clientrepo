'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { useExperience } from '@/hooks/useExperience';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const HeroModel = dynamic(() => import('./HeroModel'), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 z-0 opacity-0" />
});

export function HeroSection({ heroSequence, title, subtitle }: { heroSequence?: any, title?: string, subtitle?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<SVGSVGElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const webglContainerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);

  const { introPlayed, setIntroPlayed } = useExperience();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroPlayed(true);
      }
    });

    if (introPlayed || prefersReducedMotion) {
      gsap.set(terminalRef.current, { opacity: 0, display: 'none' });
      gsap.set(sketchRef.current, { opacity: 0, display: 'none' });
      gsap.set(blueprintRef.current, { opacity: 1 });
      gsap.set(webglContainerRef.current, { opacity: 1 });
      gsap.set(titleBlockRef.current, { opacity: 1 });
      gsap.set(hudRef.current, { opacity: 1 });
      return;
    }

    // Set initial states
    gsap.set(terminalRef.current, { opacity: 1 });
    gsap.set(sketchRef.current, { opacity: 0, strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set(blueprintRef.current, { opacity: 0 });
    gsap.set(webglContainerRef.current, { opacity: 0 });
    gsap.set(titleBlockRef.current, { opacity: 0 });
    gsap.set(hudRef.current, { opacity: 0 });

    // Stage 1: Requirements (0.0s - 0.2s)
    tl.to(terminalRef.current, { opacity: 0, delay: 0.2, duration: 0.08 });

    // Stage 2: Sketch (0.28s - 0.78s)
    tl.to(sketchRef.current, { opacity: 1, duration: 0.1 }, "+=0");
    tl.to(sketchRef.current, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, "<");
    
    // Stage 3: Blueprint & Typography (0.88s - 1.28s)
    tl.to(sketchRef.current, { opacity: 0, duration: 0.1 }, "+=0.1");
    tl.to(blueprintRef.current, { opacity: 1, duration: 0.1 }, "<");
    tl.to(titleBlockRef.current, { opacity: 1, duration: 0.3 }, "<");

    // Stage 4: Engineering Analysis Transition (1.4s)
    tl.to(webglContainerRef.current, { opacity: 1, duration: 0.4 }, "+=0.12");
    
    // Stage 6: HUD settles (2.1s - 2.3s)
    tl.to(hudRef.current, { opacity: 1, duration: 0.2 }, 2.1);

  }, { scope: containerRef, dependencies: [introPlayed] });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-background text-foreground flex flex-col pt-header-height border-b border-border"
      onPointerMove={(e) => {
        if (!isHovering) setIsHovering(true);
        setCursorPos({ x: e.clientX, y: e.clientY });
      }}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
    >
      
      {/* Inspection Annotation Cursor */}
      {isHovering && introPlayed && (
        <div 
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <div className="relative">
            {/* Crosshair */}
            <div className="absolute w-4 h-px bg-accent/50 -left-2 top-0" />
            <div className="absolute h-4 w-px bg-accent/50 left-0 -top-2" />
            {/* Annotation Label */}
            <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-md border border-border px-2 py-1 text-[10px] font-mono text-text-secondary whitespace-nowrap shadow-elevation-high">
              X:{cursorPos.x.toFixed(0)} Y:{cursorPos.y.toFixed(0)}
              <br/>INSPECTING_MESH
            </div>
          </div>
        </div>
      )}

      {/* HUD Overlay */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none z-20 border-[12px] border-surface-inset m-section-sm rounded-md flex flex-col justify-between p-component-md opacity-0 hidden md:flex">
        <div className="flex justify-between font-mono text-caption text-text-secondary uppercase">
          <span>SYS.CALIBRATED</span>
          <span>TOLERANCE: ±0.001</span>
        </div>
        <div className="flex justify-between font-mono text-caption text-text-secondary uppercase">
          <span>{heroSequence?.analysisType || 'STRUCTURAL_ANALYSIS'}</span>
          <span>RDY</span>
        </div>
      </div>

      {/* Stage 1: Terminal */}
      <div ref={terminalRef} className="absolute inset-0 flex flex-col justify-center items-center z-30 p-section-sm bg-background font-mono text-caption text-text-primary">
        <div className="w-full max-w-lg text-left">
          {heroSequence?.terminalOutput?.map((line: string, i: number) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${i * 30}ms` }}>{line}</div>
          )) || (
            <>
              <div>&gt; INITIATING_SEQUENCE...</div>
              <div>&gt; LOADING_TOLERANCES...</div>
              <div>&gt; MAT_ID: T6-6061</div>
              <div>&gt; PARSING_VOLUME_DATA...</div>
            </>
          )}
        </div>
      </div>

      {/* Stages 2-3: Sketch & Blueprint */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <svg ref={sketchRef} className="w-3/4 h-3/4 opacity-0 stroke-text-secondary fill-none stroke-[2px]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {heroSequence?.sketchSvg ? (
            <g dangerouslySetInnerHTML={{ __html: heroSequence.sketchSvg }} />
          ) : (
            <circle cx="50" cy="50" r="40" />
          )}
        </svg>
        <div ref={blueprintRef} className="absolute inset-0 flex items-center justify-center opacity-0">
          <div className="absolute inset-0 bg-[linear-gradient(var(--theme-border)_1px,transparent_1px),linear-gradient(90deg,var(--theme-border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
          <svg className="w-3/4 h-3/4 stroke-text-primary fill-none stroke-[2px]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {heroSequence?.blueprintSvg ? (
               <g dangerouslySetInnerHTML={{ __html: heroSequence.blueprintSvg }} />
            ) : (
              <circle cx="50" cy="50" r="40" />
            )}
          </svg>
        </div>
      </div>

      {/* Typography Integration */}
      <Container className="relative z-30 flex-grow flex flex-col justify-end pb-section-xl pointer-events-none">
        <div ref={titleBlockRef} className="max-w-2xl opacity-0 bg-background/90 backdrop-blur-sm p-section-sm border-l-4 border-l-accent shadow-elevation-high">
          <Text variant="caption" className="font-mono text-accent uppercase tracking-widest mb-component-sm block">Engineering Portfolio</Text>
          <h1 className="text-display font-bold leading-tight tracking-tight mb-component-md">{title || 'Precision Engineering'}</h1>
          <Text variant="body" color="secondary" className="max-w-md">{subtitle || 'A showcase of structural design, mechanics, and computational modeling.'}</Text>
        </div>
      </Container>

      {/* Stages 4-6: WebGL Layer */}
      <div ref={webglContainerRef} className="absolute inset-0 z-0 opacity-0 bg-transparent">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <HeroModel url={heroSequence?.modelFile?.asset?.url} type={heroSequence?.analysisType} />
        </Canvas>
      </div>

    </section>
  );
}