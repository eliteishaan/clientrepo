'use client';

import { useRef, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useExperience } from '@/hooks/useExperience';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const HeroModel = dynamic(() => import('./HeroModel'), { 
  ssr: false, 
  loading: () => null
});

// Helper for splitting text into chars
const SplitText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block ${className || ''}`} aria-label={text}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]" aria-hidden="true">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="inline-block split-char opacity-0 translate-y-[120%] rotate-[10deg] origin-bottom-left">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export function HeroSection({ title }: { title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webglContainerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { introPlayed, setIntroPlayed } = useExperience();

  useGSAP(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroPlayed(true);
      }
    });

    if (introPlayed || prefersReducedMotion) {
      gsap.set('.split-char', { opacity: 1, y: 0, rotation: 0 });
      gsap.set(metadataRef.current, { opacity: 1 });
      gsap.set(subtitleRef.current, { opacity: 1 });
      gsap.set(ctaRef.current, { opacity: 1 });
      gsap.set(webglContainerRef.current, { opacity: 1 });
      
      gsap.to(webglContainerRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      return;
    }

    // Cinematic Storytelling Sequence
    gsap.set('.split-char', { opacity: 0, y: '120%', rotation: 10 });
    gsap.set(metadataRef.current, { opacity: 0, y: 20 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(webglContainerRef.current, { opacity: 0 });

    tl.to(metadataRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.5);
    tl.to('.split-char', { opacity: 1, y: 0, rotation: 0, duration: 1.2, stagger: 0.03, ease: 'power4.out' }, 0.8);
    tl.to(webglContainerRef.current, { opacity: 1, duration: 2.5, ease: 'power2.inOut' }, 1.4);
    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 2.0);
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 2.5);

    // Scroll Parallax setup after animation
    tl.add(() => {
      gsap.to(webglContainerRef.current, {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

  }, { scope: containerRef, dependencies: [introPlayed] });

  // Fallback split text if we need it
  const titleParts = (title || 'Vivan Nagrath').split(' ');

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-background text-foreground flex flex-col pt-[88px]"
    >
      
      {/* 3D WebGL Canvas - Parked strictly on the right, shifted 140px right, lowered 40px, w=58% */}
      <div 
        ref={webglContainerRef} 
        className="absolute inset-y-0 right-[-10%] md:right-[-140px] w-[120%] md:w-[58%] top-[40px] z-0 opacity-0 pointer-events-auto flex items-center"
      >
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: 3 }}
          dpr={[1, 2]}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <HeroModel />
          </Suspense>
        </Canvas>
      </div>
 
      {/* Container - matching Navigation 1440px max-width and 56px horizontal padding */}
      <div className="relative z-10 flex-grow flex flex-col justify-center pb-20 pointer-events-none w-full max-w-[1440px] mx-auto px-6 md:px-[56px]">
        {/* Left content column with 620-700px maximum width, target width 42-46% viewport (md:w-[44vw]) */}
        <div className="w-full md:w-[44vw] max-w-[700px] relative z-10 flex flex-col items-start text-left">
          
          {/* Metadata Row */}
          <div 
            ref={metadataRef} 
            className="flex flex-wrap items-center gap-[28px] font-mono text-[11px] text-text-secondary uppercase tracking-[0.24em] opacity-[0.55] mb-[56px]"
          >
            <span>Purdue University</span>
            <span className="text-border/40 font-light select-none">/</span>
            <span>Mechanical Engineering</span>
            <span className="text-border/40 font-light select-none">/</span>
            <span>Applied Physics</span>
          </div>
          
          {/* Hero Title */}
          <h1 className="font-sans font-[800] text-[clamp(2.5rem,7.8vw,3.8rem)] md:text-[clamp(3.8rem,7.8vw,7.8rem)] leading-[0.92] tracking-[-0.04em] uppercase overflow-hidden text-text-primary -ml-0.5 md:-ml-1 flex flex-col">
            {titleParts.map((part, i) => (
              <SplitText key={i} text={part} className="block" />
            ))}
          </h1>
          
          {/* Subtitle */}
          <div 
            ref={subtitleRef} 
            className="font-mono text-[15px] sm:text-[16px] md:text-[18px] font-normal text-white/72 uppercase tracking-[0.04em] leading-[1.9] flex flex-col mt-[72px]"
          >
            <span>Mechanical Engineering</span>
            <span>Applied Physics</span>
            <div className="h-[1.9em]" /> {/* blank line matching leading-[1.9] */}
            <span>Purdue University</span>
            <span>West Lafayette</span>
          </div>

          {/* Call to Action */}
          <div ref={ctaRef} className="mt-[64px] pointer-events-auto">
            <button 
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group font-mono text-[13px] font-medium uppercase tracking-[0.2em] text-text-primary/85 hover:text-text-primary hover:underline transition-colors focus-ring outline-none select-none"
            >
              View Selected Work &rarr;
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}