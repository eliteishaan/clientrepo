'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function EducationSection({ education }: { education: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  // Create placeholder data if CMS is empty
  const displayEducation = (!education || education.length === 0) ? [
    {
      _id: '1',
      degree: 'B.S.',
      major: 'Mechanical Engineering',
      institution: 'Purdue University',
      location: 'West Lafayette, IN',
      startDate: '2022-09-01',
      endDate: '2026-05-01',
    },
    {
      _id: '2',
      degree: 'B.S.',
      major: 'Applied Physics',
      institution: 'Purdue University',
      location: 'West Lafayette, IN',
      startDate: '2022-09-01',
      endDate: '2026-05-01',
    },
    {
      _id: '3',
      degree: 'IB Diploma',
      major: 'Science & Mathematics',
      institution: 'High School',
      startDate: '2018-09-01',
      endDate: '2022-05-01',
    }
  ] : education;

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // Architectural grow-line scrub
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              end: 'bottom 80%',
              scrub: true,
            }
          }
        );
      }

      // Stagger education items
      const items = gsap.utils.toArray<HTMLElement>('.education-item');
      items.forEach((item) => {
        const node = item.querySelector('.arch-node');
        const content = item.querySelectorAll('.edu-anim');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        });

        if (node) {
          tl.fromTo(node,
            { scale: 0, rotation: -45, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' }
          );
        }

        tl.fromTo(content,
          { opacity: 0, x: -30, filter: 'blur(4px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          "-=0.3"
        );
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-24 md:py-40 relative z-10 overflow-hidden" aria-label="Education">
      
      {/* Architectural Hatch Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--theme-border) 0, var(--theme-border) 1px, transparent 1px, transparent 20px)' }} />

      <Container variant="wide" className="relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between md:items-end border-b border-border/50 pb-8 gap-4">
          <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-tighter uppercase leading-none">
            Education
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-accent rounded-sm animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.3em]">
              05 — 26 / Academic Foundation
            </span>
          </div>
        </div>

        <div className="relative pl-8 md:pl-16 ml-2 md:ml-4">
          
          {/* Static Background Line */}
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-border/30" />
          
          {/* Architectural Grow Line */}
          <div ref={lineRef} className="absolute top-0 left-0 bottom-0 w-[2px] bg-foreground origin-top scale-y-0" />
          
          <div className="flex flex-col gap-24 md:gap-32">
            {displayEducation.map((edu: any) => {
              const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : '';
              const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present';
              
              return (
                <div key={edu._id} className="education-item relative flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 items-start">
                  
                  {/* Architectural Node (Hollow Square) */}
                  <div className="arch-node absolute left-[-36px] md:left-[-68px] top-2 w-4 h-4 bg-background border-[1.5px] border-foreground transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-1 h-1 bg-accent rounded-sm" />
                  </div>
                  
                  {/* Date & Institution Meta */}
                  <div className="w-full md:w-1/3 flex flex-col gap-3 shrink-0 edu-anim mt-1">
                    <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary">
                      {startYear && `${startYear} — `}{endYear}
                    </span>
                    <h4 className="text-xl md:text-2xl font-medium tracking-tight text-text-primary mt-2 uppercase">
                      {edu.institution}
                    </h4>
                    {edu.location && (
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-secondary/70">
                        {edu.location}
                      </span>
                    )}
                  </div>

                  {/* Degree Details */}
                  <div className="w-full md:w-2/3 flex flex-col pt-1">
                    <h3 className="edu-anim text-3xl md:text-5xl font-bold tracking-tight uppercase leading-none mb-6">
                      {edu.degree} <span className="text-text-secondary/50 font-light mx-2">in</span> <span className="text-accent">{edu.major}</span>
                    </h3>
                    
                    {edu.minor && (
                      <p className="edu-anim text-lg md:text-xl text-text-secondary mb-8 font-medium">
                        Minor in {edu.minor}
                      </p>
                    )}
                    
                    {(edu.gpa || (edu.honors && edu.honors.length > 0)) && (
                      <div className="flex flex-wrap gap-4 mt-4">
                        {edu.gpa && (
                          <div className="edu-anim border border-border/40 px-5 py-3 rounded bg-surface-inset shadow-inner">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary block mb-1.5">Cum. GPA</span>
                            <span className="font-mono text-sm md:text-base font-bold text-foreground">{edu.gpa}</span>
                          </div>
                        )}
                        {edu.honors?.map((honor: string, i: number) => (
                          <div key={i} className="edu-anim border border-border/40 px-5 py-3 rounded bg-surface/30 backdrop-blur-sm flex items-center hover:bg-surface-elevated transition-colors duration-300">
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-primary">{honor}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}