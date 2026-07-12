'use client';

import { useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function RelatedProjects({ projects }: { projects?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray<HTMLElement>('.related-card');
    
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: sectionRef });

  if (!projects || projects.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full py-24 md:py-40 bg-background" aria-label="Related Case Studies">
      <Container variant="wide">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-24">
          <div>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tighter uppercase leading-none">
              Explore<br />More Work
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-secondary">
              Related Systems
            </span>
          </div>
        </div>

        {/* Cinematic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project: any) => (
            <NextLink 
              key={project._id} 
              href={`/projects/${project.slug}`} 
              className="related-card group block focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              
              {/* Image Container with Parallax Hover */}
              <div className="relative aspect-[4/5] overflow-hidden bg-surface rounded-sm mb-6">
                
                {project.coverImageUrl ? (
                  <Image 
                    src={project.coverImageUrl} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 filter group-hover:brightness-110" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="font-mono text-xs text-text-muted uppercase tracking-widest">No Signal</span>
                  </div>
                )}
                
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Hover Reveal CTA */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden pointer-events-none">
                  <div className="bg-background/20 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                      View System
                    </span>
                  </div>
                </div>
                
              </div>
              
              {/* Typography */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                    {project.client || 'Initiative'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    {project.date ? new Date(project.date).getFullYear() : 'Ongoing'}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-500 line-clamp-2 leading-[1.1]">
                  {project.title}
                </h3>
              </div>
              
            </NextLink>
          ))}
        </div>
        
      </Container>
    </section>
  );
}
