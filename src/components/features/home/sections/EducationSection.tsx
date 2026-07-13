'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Education } from '@/lib/types/sanity';

export function EducationSection({ education }: { education: Education[] }) {
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
            { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
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
    <section ref={sectionRef} className="w-full bg-surface-elevated text-text-primary py-24 md:py-32 relative z-10 overflow-hidden" aria-label="Education">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 bg-engineering-grid pointer-events-none" />

      <Container variant="editorial" className="relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between md:items-end border-b border-border pb-8 gap-4">
          <h2 className="text-display-l font-medium tracking-tight uppercase leading-none">
            Education
          </h2>
          <div className="flex flex-col md:items-end gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-metadata">
              DOC.REF / ACAD-01
            </span>
            <span className="font-mono text-mono-label text-text-secondary uppercase tracking-[0.2em]">
              SEC.05 / ACADEMIC FOUNDATION / REV.A
            </span>
          </div>
        </div>

        <div className="relative pl-8 md:pl-16 ml-2 md:ml-4">
          
          {/* Static Background Line */}
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-border-subtle" />
          
          {/* Architectural Grow Line (Steel Blue Accent) */}
          <div ref={lineRef} className="absolute top-0 left-0 bottom-0 w-[1px] bg-accent/60 origin-top scale-y-0" />
          
          <div className="flex flex-col gap-16 md:gap-24">
            {Object.values(displayEducation.reduce((acc: any, edu: any) => {
              const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : '';
              const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present';
              const key = `${edu.institution}-${startYear}-${endYear}`;
              if (!acc[key]) {
                acc[key] = { ...edu, degrees: [{ degree: edu.degree, major: edu.major, minor: edu.minor }] };
              } else {
                acc[key].degrees.push({ degree: edu.degree, major: edu.major, minor: edu.minor });
                acc[key].isDualDegree = true;
              }
              return acc;
            }, {})).map((edu: any) => {
              const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : '';
              const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present';
              
              return (
                <div key={edu._id} className="education-item relative flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 items-start">
                  
                  {/* Machined Pin (Precision marker) */}
                  <div className="arch-node absolute left-[-36px] md:left-[-68px] top-2 w-3 h-3 border-[1px] border-accent/40 bg-surface-elevated flex items-center justify-center rounded-sm transform -translate-x-1/2">
                    <div className="w-1 h-1 bg-accent/80 rounded-sm" />
                  </div>
                  
                  {/* Date & Institution Meta */}
                  <div className="w-full md:w-1/3 flex flex-col gap-3 shrink-0 edu-anim mt-1">
                    <span className="font-mono text-mono-label font-medium uppercase tracking-widest text-text-secondary">
                      {startYear && `${startYear} — `}{endYear}
                    </span>
                    <h4 className="text-heading-m font-medium tracking-tight text-text-primary mt-2 uppercase">
                      {edu.institution}
                    </h4>
                    {edu.isDualDegree && (
                       <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent mt-1">
                          [ DUAL DEGREE PROGRAM ]
                       </span>
                    )}
                    {edu.location && (
                      <span className="font-mono text-mono-micro uppercase tracking-widest text-text-secondary/70">
                        {edu.location}
                      </span>
                    )}
                  </div>

                  {/* Degree Details */}
                  <div className="w-full md:w-2/3 flex flex-col pt-1">
                    {edu.degrees.map((deg: any, i: number) => (
                      <div key={i} className="mb-6 last:mb-0">
                        <h3 className="edu-anim text-heading-l font-medium tracking-tight uppercase leading-none mb-2">
                          {deg.degree} <span className="text-text-secondary/50 font-light mx-2">in</span> <span className="text-text-primary">{deg.major}</span>
                        </h3>
                        {deg.minor && (
                          <p className="edu-anim text-body-l text-text-secondary font-medium mt-3">
                            Minor in {deg.minor}
                          </p>
                        )}
                      </div>
                    ))}
                    
                    {(edu.gpa || (edu.honors && edu.honors.length > 0)) && (
                      <div className="flex flex-wrap gap-4 mt-6 border-t border-border-subtle pt-6">
                        {edu.gpa && (
                          <div className="edu-anim border border-border px-5 py-3 rounded-sm bg-transparent">
                            <span className="font-mono text-mono-micro uppercase tracking-widest text-text-secondary block mb-1.5">Cum. GPA</span>
                            <span className="font-mono text-body font-medium text-text-metric">{edu.gpa}</span>
                          </div>
                        )}
                        {edu.honors?.map((honor: string, i: number) => (
                          <div key={i} className="edu-anim border border-border px-5 py-3 rounded-sm bg-surface/30 backdrop-blur-sm flex items-center hover:bg-surface-elevated transition-colors duration-300">
                            <span className="font-mono text-mono-micro font-medium uppercase tracking-widest text-text-primary">{honor}</span>
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