'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

export function ProjectHeader({ project }: { project: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Intro Animations
    const tl = gsap.timeline();
    
    tl.fromTo(imageWrapRef.current,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2.2, ease: 'power3.out' }
    )
    .fromTo(textRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
      '-=1.6'
    )
    .fromTo(metaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=1'
    );

    // Scroll Parallax — Image sinks down, text rises and fades
    gsap.to(imageWrapRef.current, {
      yPercent: 25,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to(textRef.current, {
      yPercent: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '60% top',
        scrub: true,
      }
    });

    gsap.to(metaRef.current, {
      yPercent: -50,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  if (!project) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-black"
      aria-label="Project Hero"
    >
      {/* Background Image / Depth Layer */}
      <div ref={imageWrapRef} className="absolute inset-0 z-0 will-change-transform opacity-0">
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          /* Geometric fallback when no cover image */
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950" />
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
      </div>

      {/* Blueprint Grid Overlay — fades in from bottom */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent_40%,#000_100%)] pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-20 pb-[8svh] md:pb-[10svh]">
        <Container variant="wide">
          <div className="max-w-5xl" ref={textRef}>
            {/* Super Title / Client */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-bold">
                {project.client || 'Personal Initiative'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] font-bold tracking-tighter uppercase text-white mb-6">
              {project.title}
            </h1>

            {/* Subtitle */}
            {project.subtitle && (
              <p className="text-lg md:text-2xl lg:text-3xl text-white/80 max-w-3xl leading-snug font-medium mb-12">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Editorial Metadata Grid */}
          <div 
            ref={metaRef} 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-8 border-t border-white/15 text-white/70 font-mono text-[10px] md:text-xs uppercase tracking-widest"
          >
            {project.date && (
              <div>
                <span className="block text-white/40 mb-2">Timeline</span>
                <span className="text-white/90">{project.date}</span>
              </div>
            )}
            {project.categories?.length > 0 && (
              <div>
                <span className="block text-white/40 mb-2">Discipline</span>
                <span className="text-white/90">{project.categories.map((c: any) => c.title).join(' / ')}</span>
              </div>
            )}
            {project.technologies?.length > 0 && (
              <div className="col-span-2 md:col-span-1">
                <span className="block text-white/40 mb-2">Stack</span>
                <span className="text-white/90">{project.technologies.map((t: any) => t.name).join(' · ')}</span>
              </div>
            )}
            <div className="hidden md:flex md:col-span-1 items-end justify-end">
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/40 text-[9px]">Scroll</span>
                <div className="w-px h-8 bg-white/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[scrollPulse_2s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
