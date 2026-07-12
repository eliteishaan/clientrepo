'use client';

import { useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

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
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Parallax for the image inside the wrapper
      if (image) {
        gsap.fromTo(image,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: imageWrapper,
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

  const displayProjects = (!projects || projects.length === 0) ? [
    {
      _id: 'fallback_1',
      title: 'T6-6061 Enclosure',
      slug: '#',
      subtitle: 'Thermal management system for high-density computing.',
      categories: [{ title: 'Industrial Design' }, { title: 'Thermal Engineering' }],
      isFallback: true
    },
    {
      _id: 'fallback_2',
      title: 'Kinetic Assembly',
      slug: '#',
      subtitle: 'High-precision robotic effector for automated manufacturing.',
      categories: [{ title: 'Robotics' }, { title: 'Mechatronics' }],
      isFallback: true
    }
  ] : projects;

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-24 md:py-32 relative z-10" aria-label="Featured Projects">
      <Container variant="wide">
        <div className="mb-16 md:mb-32 flex justify-between items-end border-b border-border/50 pb-8">
          <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-tighter uppercase leading-none">
            Selected Works
          </h2>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest hidden md:block">
            02 — 26
          </span>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {displayProjects.map((project: any, index: number) => {
            const headingId = `project-heading-${project._id}`;
            const projectSlug = project.slug?.current || project.slug;
            const projectUrl = project.isFallback ? '#' : `/projects/${projectSlug}`;
            const projectYear = project.date ? new Date(project.date).getFullYear() : '2024';

            return (
              <article 
                key={project._id} 
                className="project-card group flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 items-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
                aria-labelledby={headingId}
              >
                
                {/* Image Section */}
                <div className={`w-full md:w-3/5 lg:w-2/3 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Link href={projectUrl} className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
                    <div className="project-image-wrapper w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-surface-inset relative rounded-lg border border-border/30 shadow-elevation-low transition-shadow duration-500 group-hover:shadow-elevation-high">
                      {project.coverImageUrl ? (
                        <Image 
                          src={project.coverImageUrl} 
                          alt={`Cover image for ${project.title}`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 66vw"
                          className="project-image object-cover origin-center transition-transform duration-700 ease-out scale-110 group-hover:scale-105" 
                        />
                      ) : (
                        // Premium Placeholder Graphic
                        <div className="project-image absolute inset-0 w-full h-full scale-110 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center bg-gradient-to-br from-surface to-surface-elevated">
                           <div className="absolute inset-0 bg-[linear-gradient(var(--theme-border)_1px,transparent_1px),linear-gradient(90deg,var(--theme-border)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                           <span className="font-mono text-text-secondary tracking-widest uppercase relative z-10 bg-background/80 px-4 py-2 border border-border/50 rounded backdrop-blur-sm shadow-sm">Awaiting Media</span>
                        </div>
                      )}
                      
                      {/* Overlay for hover depth */}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 pointer-events-none" />
                    </div>
                  </Link>
                </div>

                {/* Content Section */}
                <div className="project-content w-full md:w-2/5 lg:w-1/3 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <span className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] block">
                      {project.client || 'Internal Research'}
                    </span>
                    <div className="h-px bg-border/50 flex-grow" />
                    <span className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-widest">
                      {projectYear}
                    </span>
                  </div>
                  
                  <h3 id={headingId} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6 transition-colors duration-300 group-hover:text-accent">
                    <Link href={projectUrl} className="outline-none">
                      {project.title}
                    </Link>
                  </h3>
                  
                  {project.subtitle && (
                    <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed max-w-sm">
                      {project.subtitle}
                    </p>
                  )}
                  
                  {project.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                      {project.categories.map((cat: any, i: number) => (
                        <span key={cat._id || cat.slug || cat.title || i} className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-text-secondary border border-border/40 px-3 py-1.5 rounded-full bg-surface/30 backdrop-blur-sm transition-colors duration-300 group-hover:border-border/80">
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link 
                    href={projectUrl} 
                    className="group/btn relative inline-flex items-center gap-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] self-start overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm text-accent"
                    aria-label={`View case study for ${project.title}`}
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-[120%]">
                      View Case Study
                    </span>
                    <span className="absolute inset-0 z-10 translate-y-[120%] transition-transform duration-300 group-hover/btn:translate-y-0 text-foreground">
                      View Case Study
                    </span>
                    <div className="w-8 h-px bg-accent transition-all duration-300 group-hover/btn:w-16 group-hover/btn:bg-foreground" />
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