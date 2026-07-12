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
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.15,
        }
      );
    });
  }, { scope: sectionRef });

  if (!projects || projects.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-32" aria-label="Related Case Studies">
      <Container variant="wide">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12 md:mb-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary shrink-0">
            Continue Reading
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project: any) => (
            <NextLink 
              key={project._id} 
              href={`/projects/${project.slug}`} 
              className="related-card group block focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-surface mb-5">
                {project.coverImageUrl ? (
                  <Image 
                    src={project.coverImageUrl} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                )}
              </div>
              
              {/* Text */}
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {project.subtitle}
                </p>
              )}
            </NextLink>
          ))}
        </div>
      </Container>
    </section>
  );
}
