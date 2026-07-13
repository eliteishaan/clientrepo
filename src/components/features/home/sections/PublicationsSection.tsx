'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from '@/components/ui/Link';

export function PublicationsSection({ publications }: { publications: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Create placeholder data if CMS is empty
  const displayPublications = (!publications || publications.length === 0) ? [
    {
      _id: 'pub_1',
      title: 'Generative Design in Topology Optimization for Aerospace Brackets',
      date: '2023-11-15',
      publisher: 'Journal of Mechanical Design',
      authors: ['Vivaan', 'Dr. Sarah Jenkins'],
      url: '#'
    },
    {
      _id: 'pub_2',
      title: 'Thermal Analysis of High-Density Battery Packs using FEA',
      date: '2022-04-20',
      publisher: 'Int. Journal of Heat & Mass Transfer',
      authors: ['Vivaan'],
    },
    {
      _id: 'pub_3',
      title: 'Kinematic Synthesis of 5-Axis Robotic Effectors',
      date: '2021-08-10',
      publisher: 'IEEE Robotics and Automation Letters',
      authors: ['Vivaan', 'J. Smith', 'L. Chen'],
      url: '#'
    }
  ] : publications;

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const rows = gsap.utils.toArray<HTMLElement>('.journal-row');
      
      rows.forEach((row) => {
        const title = row.querySelector('.journal-title');
        const meta = row.querySelectorAll('.journal-meta');
        const line = row.querySelector('.journal-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });

        if (line) {
          tl.fromTo(line,
            { scaleX: 0, transformOrigin: 'left' },
            { scaleX: 1, duration: 1, ease: 'power4.out' }
          );
        }

        if (title) {
          tl.fromTo(title,
            { opacity: 0, y: 30, rotationX: 10, transformOrigin: '0% 100%' },
            { opacity: 1, y: 0, rotationX: 0, duration: 1, ease: 'power3.out' },
            "-=0.6"
          );
        }

        if (meta.length > 0) {
          tl.fromTo(meta,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
            "-=0.8"
          );
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-surface-secondary text-text-primary py-24 md:py-32 relative z-10 border-b border-border-subtle overflow-hidden" aria-label="Research and Publications">
      <Container variant="editorial">
        
        {/* Header - Editorial Index Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-mono-label uppercase tracking-widest text-text-secondary">
                07 — 26 / Journal
              </span>
            </div>
            <h2 className="text-display-l font-medium tracking-tight uppercase leading-none">
              Research &<br />Publications
            </h2>
          </div>
          <div className="font-mono text-xs text-text-secondary uppercase tracking-widest text-left md:text-right max-w-[240px] leading-relaxed border-l-2 border-accent pl-4 md:border-l-0 md:pl-0 md:border-r-2 md:pr-4">
            Academic & Industry Research Contributions
          </div>
        </div>

        {/* Academic Journal Layout */}
        <div className="flex flex-col">
          {displayPublications.map((pub: any, index: number) => {
            const pubYear = pub.date ? new Date(pub.date).getFullYear() : '';
            const volume = String(displayPublications.length - index).padStart(2, '0');

            return (
              <div 
                key={pub._id} 
                className="journal-row group relative flex flex-col pt-8 pb-12 md:pt-12 md:pb-16"
              >
                {/* Expanding Top Border */}
                <div className="journal-line absolute top-0 left-0 right-0 h-px bg-border-subtle group-hover:bg-accent group-hover:h-[2px] transition-all duration-500" />
                
                <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_4fr] gap-8 md:gap-16">
                  
                    {/* Left Column: Volume & Date */}
                  <div className="flex md:flex-col justify-between md:justify-start gap-4 md:gap-8 journal-meta">
                    <span className="font-mono text-sm md:text-base font-medium text-text-primary tracking-widest uppercase">
                      VOL. {volume}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                      {pubYear}
                    </span>
                  </div>

                  {/* Right Column: Title & Metadata */}
                  <div className="flex flex-col items-start gap-6">
                    
                    <h3 className="journal-title text-heading-l font-medium tracking-tight leading-[1.1] text-text-primary group-hover:text-accent transition-colors duration-500">
                      {pub.title}
                    </h3>
                    
                    {/* Dense Metadata Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle journal-meta">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-mono-micro uppercase tracking-widest text-text-secondary/60">
                          Published In
                        </span>
                        <span className="font-mono text-mono-label uppercase tracking-widest font-medium text-text-primary">
                          {pub.publisher}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-mono-micro uppercase tracking-widest text-text-secondary/60">
                          Authors
                        </span>
                        <span className="font-mono text-mono-label uppercase tracking-widest text-text-secondary">
                          {pub.authors?.join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Link */}
                    <div className="mt-4 journal-meta">
                      {pub.url ? (
                        <Link 
                          href={pub.url} 
                          isExternal 
                          className="group/btn relative inline-flex items-center gap-4 text-mono-label font-medium uppercase tracking-widest focus-visible:outline-none text-text-primary"
                          aria-label={`Read publication: ${pub.title}`}
                        >
                          <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-[120%]">
                            Read Paper
                          </span>
                          <span className="absolute inset-0 z-10 translate-y-[120%] transition-transform duration-300 group-hover/btn:translate-y-0 text-accent">
                            Read Paper
                          </span>
                          <div className="w-8 h-[1px] bg-text-primary transition-all duration-300 group-hover/btn:w-16 group-hover/btn:bg-accent" />
                        </Link>
                      ) : (
                        <span className="font-mono text-mono-micro uppercase tracking-widest text-text-secondary/50 flex items-center gap-3">
                          <span className="w-4 h-px bg-text-secondary/30" />
                          Print Archive
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}