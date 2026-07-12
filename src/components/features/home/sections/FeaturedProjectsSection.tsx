'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

// Option A: Editorial Stacked Cards
export function FeaturedProjectsSection({ projects }: { projects: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>('.project-card');

    cards.forEach((card) => {
      const imageWrapper = card.querySelector('.project-image-wrapper');
      const image = card.querySelector('.project-image');
      const content = card.querySelector('.project-content');

      // Mask Reveal for the image wrapper
      gsap.fromTo(imageWrapper, 
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

      // Parallax for the image inside the wrapper
      if (image) {
        gsap.fromTo(image,
          { scale: 1.2, yPercent: -15 },
          {
            scale: 1,
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      // Fade up for content
      gsap.fromTo(content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, { scope: sectionRef });

  if (!projects || projects.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-[var(--spacing-section-lg)] relative z-10" aria-label="Featured Projects">
      <Container variant="wide">
        <div className="mb-[var(--spacing-section-md)] flex justify-between items-end border-b border-border pb-8">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-tighter uppercase leading-none">
            Selected Works
          </h2>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest hidden md:block">
            02 — 26
          </span>
        </div>

        <div className="flex flex-col gap-[var(--spacing-section-lg)]">
          {projects.map((project: any, index: number) => {
            const headingId = `project-heading-${project._id}`;
            return (
              <article 
                key={project._id} 
                className="project-card flex flex-col md:flex-row gap-8 md:gap-16 items-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
                aria-labelledby={headingId}
              >
                
                {/* Image Section - Left (or Right based on index) */}
                <div className={`w-full md:w-2/3 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="project-image-wrapper w-full aspect-[4/3] overflow-hidden bg-surface-inset relative rounded-lg">
                    {project.coverImageUrl && (
                      <Image 
                        src={project.coverImageUrl} 
                        alt={`Cover image for ${project.title}`} 
                        fill
                        sizes="(max-width: 768px) 100vw, 66vw"
                        className="project-image object-cover origin-center" 
                      />
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="project-content w-full md:w-1/3 flex flex-col justify-center">
                  <span className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-widest mb-3 md:mb-4 block">
                    {project.client || 'Personal Project'} • {new Date(project.date).getFullYear()}
                  </span>
                  
                  <h3 id={headingId} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4">
                    {project.title}
                  </h3>
                  
                  {project.subtitle && (
                    <p className="text-text-secondary text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-sm">
                      {project.subtitle}
                    </p>
                  )}
                  
                  {project.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
                      {project.categories.map((cat: any) => (
                        <span key={cat.slug} className="text-[10px] md:text-xs border border-border px-2 md:px-3 py-1 rounded-full uppercase tracking-wider">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="group relative inline-flex items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-widest self-start overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    aria-label={`View case study for ${project.title}`}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-full">
                      View Case Study
                    </span>
                    <span className="absolute inset-0 z-10 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      View Case Study
                    </span>
                    <div className="w-6 md:w-8 h-px bg-foreground transition-all duration-300 group-hover:w-10 md:group-hover:w-12" />
                  </Link>
                </div>

              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}