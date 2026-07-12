'use client';

import { useRef, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { useExperience } from '@/hooks/useExperience';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { ArrowDown } from 'lucide-react';

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
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-background text-foreground flex flex-col pt-32"
    >
      
      {/* 3D WebGL Canvas - Parked strictly on the right */}
      <div ref={webglContainerRef} className="absolute inset-y-0 right-[-10%] md:right-0 w-[120%] md:w-[60%] z-0 opacity-0 pointer-events-auto flex items-center">
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

      <Container className="relative z-10 flex-grow flex flex-col justify-center pb-20 pointer-events-none">
        <div className="max-w-[85vw] md:max-w-[45vw] relative z-10 flex flex-col gap-6 md:gap-8">
          
          {/* Metadata */}
          <div ref={metadataRef} className="flex flex-wrap gap-2 md:gap-4 font-mono text-[9px] md:text-[10px] text-text-secondary uppercase tracking-[0.2em] opacity-80">
            <span>Purdue University</span>
            <span className="text-border/40">/</span>
            <span>Mechanical Engineering</span>
            <span className="text-border/40">/</span>
            <span>Applied Physics</span>
            <span className="text-border/40">/</span>
            <span>Aerospace Systems</span>
          </div>
          
          {/* Hero Title */}
          <h1 className="font-sans font-[800] text-[clamp(4.5rem,10vw,10rem)] leading-[0.85] tracking-[-0.03em] uppercase overflow-hidden text-text-primary -ml-1 md:-ml-2 flex flex-col">
            {titleParts.map((part, i) => (
              <SplitText key={i} text={part} className="block" />
            ))}
          </h1>
          
          {/* Subtitle */}
          <div ref={subtitleRef} className="font-mono text-[11px] md:text-xs text-text-secondary uppercase tracking-[0.15em] flex flex-col gap-1 mt-2 md:mt-4">
            <span className="text-text-primary">Mechanical Engineering</span>
            <span className="text-text-primary">Applied Physics</span>
            <div className="h-4" /> {/* Spacer */}
            <span>Purdue University</span>
            <span>West Lafayette</span>
          </div>

          {/* Call to Action */}
          <div ref={ctaRef} className="mt-12 md:mt-24 pointer-events-auto">
            <button 
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-start gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors focus-ring outline-none"
            >
              <ArrowDown className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300" />
              <span>View Selected Work</span>
            </button>
          </div>
        </div>
      </Container>
      
    </section>
  );
}