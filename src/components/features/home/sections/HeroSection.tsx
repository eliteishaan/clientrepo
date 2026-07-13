'use client';

import { useRef, Suspense, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { useExperience } from '@/hooks/useExperience';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';

const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const { introPlayed, setIntroPlayed } = useExperience();

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (introPlayed || reduced) {
        gsap.set(
          [metaRef.current, subRef.current, ctaRef.current, canvasRef.current],
          { opacity: 1, y: 0, x: 0 },
        );
        gsap.set([line1Ref.current, line2Ref.current], { yPercent: 0 });
        (window as any).heroInteractionEnabled = true;
        return;
      }

      // ── Initial hidden state ──
      (window as any).heroInteractionEnabled = false;

      gsap.set(metaRef.current, { opacity: 0, x: -30 });
      gsap.set(line1Ref.current, { yPercent: 100 });
      gsap.set(line2Ref.current, { yPercent: 100 });
      gsap.set(subRef.current, { opacity: 0, x: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: -20 });
      gsap.set(canvasRef.current, { opacity: 0, x: 40 });

      // ── Master timeline ──
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          setIntroPlayed(true);
          setTimeout(() => {
            (window as any).heroInteractionEnabled = true;
          }, 500);
        },
      });

      // Nav intro trigger (since Nav checks this, we could manually trigger it or just let it run)
      // Actually, Nav will run on its own. It's better to just wait a beat.

      // Metadata (from West)
      tl.to(metaRef.current, { opacity: 0.55, x: 0, duration: 2.0, ease: 'power3.out' }, 0.0);

      // Object starts entering first (from East)
      tl.to(canvasRef.current, { opacity: 1, x: 0, duration: 3.2, ease: 'power3.out' }, 0.2);

      // VIVAN reveal (from South via clip mask)
      tl.to(line1Ref.current, { yPercent: 0, duration: 1.8 }, 0.8);

      // NAGRATH reveal (from South via clip mask)
      tl.to(line2Ref.current, { yPercent: 0, duration: 1.8 }, 0.95);

      // Statement (from East)
      tl.to(subRef.current, { opacity: 1, x: 0, duration: 1.8, ease: 'power3.out' }, 1.3);

      // CTA (from North)
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 1.6);
    },
    { scope: sectionRef, dependencies: [introPlayed] },
  );

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full h-[100svh] min-h-[600px] overflow-hidden md:grid md:grid-cols-2"
    >
      {/* ─── LEFT: Typography (Canvas) ─── */}
      <div className="relative z-20 h-full bg-surface-canvas py-32 flex flex-col justify-center px-6 md:px-[var(--spacing-section-sm)] lg:pl-[max(var(--spacing-section-sm),calc((100vw-var(--width-container-hero))/2))]">
        <div className="w-full max-w-[var(--width-container-editorial)]">

          {/* Metadata */}
          <p
            ref={metaRef}
            className="font-mono uppercase select-none"
            style={{
              fontSize: '0.75rem', // 12px (bumped up for sharpness)
              letterSpacing: '0.22em',
              lineHeight: 1,
              opacity: 0,
              color: 'var(--text-secondary)',
              willChange: 'transform, opacity',
            }}
          >
            Purdue University &nbsp;•&nbsp; Mechanical Engineering &nbsp;•&nbsp; Applied Physics
          </p>

          <div style={{ height: 40 }} aria-hidden="true" />

          {/* Title */}
          <h1
            className="font-serif uppercase"
            style={{
              fontSize: 'var(--font-size-display-xl)',
              fontWeight: 380,
              letterSpacing: '-0.01em',
              lineHeight: 0.98,
              maxWidth: 520,
              color: 'var(--text-primary)',
            }}
          >
            <div className="overflow-hidden py-1"><span ref={line1Ref} className="block" style={{ willChange: 'transform' }}>VIVAN</span></div>
            <div className="overflow-hidden py-1"><span ref={line2Ref} className="block" style={{ willChange: 'transform' }}>NAGRATH</span></div>
          </h1>

          <div style={{ height: 32 }} aria-hidden="true" />
          
          {/* Differentiator Statement */}
          <p
            ref={subRef}
            className="max-w-[420px]"
            style={{ 
              fontSize: '1.2rem', // bumped up slightly for sharpness
              lineHeight: 1.6,
              color: 'var(--text-secondary)', 
              opacity: 0, 
              willChange: 'transform, opacity' 
            }}
          >
            Engineering high-performance physical systems from first principles.
          </p>

          <div style={{ height: 48 }} aria-hidden="true" />



          <div className="mt-[6vh]" ref={ctaRef} style={{ opacity: 0, willChange: 'transform, opacity' }}>
            <a
              href="#work"
              className="group inline-flex flex-col font-mono text-[12px] font-bold uppercase tracking-widest outline-none focus-ring"
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
              }}
            >
              <span className="relative pb-1 flex items-center gap-2">
                VIEW SELECTED WORK
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-[4px]">→</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-text-primary origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: 3D Canvas (Graphite) ─── */}
      <div className="relative z-10 h-full w-full pointer-events-none bg-surface-graphite">
        
        {/* Extremely Subtle Vignette */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
        <div
          ref={canvasRef}
          className="absolute inset-0 pointer-events-auto"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          <Canvas
            frameloop={inView ? 'always' : 'demand'}
            camera={{ position: [0, 0.6, 5.5], fov: 28 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              toneMapping: 6,
              outputColorSpace: 'srgb',
            }}
            shadows
            dpr={[1, 1.5]}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <HeroModel />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}