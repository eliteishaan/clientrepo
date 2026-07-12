'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

export function ExperienceSection({ experience }: { experience: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Timeline drawing animation
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

    const items = gsap.utils.toArray<HTMLElement>('.experience-item');

    items.forEach((item) => {
      const node = item.querySelector('.timeline-node');
      const contentBlocks = item.querySelectorAll('.exp-anim');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      if (node) {
        tl.fromTo(node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
        );
      }

      tl.fromTo(contentBlocks,
        { opacity: 0, y: 30, rotationX: 5, transformOrigin: '0% 50%' },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        "-=0.2"
      );
    });
  }, { scope: sectionRef });

  const displayExperience = (!experience || experience.length === 0) ? [
    {
      _id: 'fallback_1',
      company: 'PURPL',
      role: 'Pulsejet Valve Design Responsible Engineer',
      startDate: '2023',
      isCurrent: true,
      location: 'West Lafayette, IN',
      achievements: [
        'Leading the design and testing of high-frequency pulsejet valves.',
        'Iterating on mechanical constraints to optimize thrust performance under extreme thermal conditions.'
      ],
      technologies: [{ name: 'CAD' }, { name: 'FEA' }, { name: 'Manufacturing' }]
    },
    {
      _id: 'fallback_2',
      company: 'Purdue Space Program',
      role: 'Injector Design Engineer',
      startDate: '2022',
      endDate: '2023',
      isCurrent: false,
      location: 'West Lafayette, IN',
      achievements: [
        'Engineered complex injector geometries for aerospace applications.',
        'Conducted fluid flow analysis and pressure drop testing.'
      ],
      technologies: [{ name: 'SolidWorks' }, { name: 'Fluid Dynamics' }, { name: 'Testing' }]
    },
    {
      _id: 'fallback_3',
      company: 'ASME Racing Team',
      role: 'Performance Engineer',
      startDate: '2021',
      endDate: '2022',
      isCurrent: false,
      location: 'West Lafayette, IN',
      achievements: [
        'Analyzed telemetry data to refine mechanical setups.',
        'Optimized suspension geometry for improved track performance.'
      ],
      technologies: [{ name: 'Data Analysis' }, { name: 'Vehicle Dynamics' }, { name: 'Testing' }]
    },
    {
      _id: 'fallback_4',
      company: 'Sun Oil Limited',
      role: 'Engineering Internship',
      startDate: '2020',
      endDate: '2020',
      isCurrent: false,
      location: 'Bahamas',
      achievements: [
        'Assisted in industrial engineering operations and site management.',
        'Documented safety compliance and operational workflows.'
      ],
      technologies: []
    }
  ] : experience;

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-24 md:py-40 relative z-10 overflow-hidden" aria-label="Experience">
      {/* Cinematic Blueprint Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
      
      <Container variant="wide" className="relative z-10">
        
        {/* Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between md:items-end border-b border-border/50 pb-8 gap-4">
          <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold tracking-tighter uppercase leading-none">
            Experience
          </h2>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.3em]">
              03 — 26 / Professional Timeline
            </span>
          </div>
        </div>

        {/* Timeline Structure */}
        <div className="relative pl-6 md:pl-12 lg:pl-16 ml-2 md:ml-4">
          
          {/* Static Track Line */}
          <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-border/40" />
          
          {/* Dynamic Draw Line */}
          <div ref={lineRef} className="absolute top-0 left-0 bottom-0 w-[2px] bg-accent origin-top scale-y-0 shadow-[0_0_10px_rgba(var(--accent),0.5)]" />
          
          <div className="flex flex-col gap-24 md:gap-32">
            {displayExperience.map((exp: any, idx: number) => {
              const isFeatured = idx === 0;
              
              return (
                <div key={exp._id} className="relative flex flex-col">
                  {/* Categorical Dividers as requested by user */}
                  {idx === 0 && (
                    <div className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-accent border-b border-accent/20 pb-4">
                      Featured Engineering Experience
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-text-secondary border-b border-border/20 pb-4">
                      Other Engineering Experience
                    </div>
                  )}

                  <div className="experience-item relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 perspective-[1000px]">
                    
                    {/* Glowing Node */}
                    <div className={`timeline-node absolute left-[-24px] md:left-[-48px] lg:left-[-64px] ${isFeatured ? 'top-3 md:top-4 w-4 h-4 shadow-[0_0_20px_rgba(var(--accent),1)]' : 'top-2 md:top-3 w-3 h-3 shadow-[0_0_15px_rgba(var(--accent),0.8)]'} bg-background border-2 border-accent rounded-full transform -translate-x-1/2 z-20`} />
                    
                    {/* Meta Column (Date & Location) */}
                    <div className="lg:col-span-3 flex flex-col gap-3 exp-anim">
                      <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-text-secondary">
                        {exp.location}
                      </span>
                      {exp.companyLogoUrl && (
                        <div className="mt-8 w-20 h-20 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out border border-border/30 rounded p-2 bg-surface-inset">
                          <Image src={exp.companyLogoUrl} alt={exp.company} fill className="object-contain p-2" />
                        </div>
                      )}
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-6 flex flex-col justify-start mt-[-6px] ${isFeatured ? 'scale-[1.02] transform-origin-left' : ''}`}>
                      <h3 className={`${isFeatured ? 'text-4xl md:text-7xl text-accent' : 'text-3xl md:text-5xl'} font-bold tracking-tight mb-2 uppercase exp-anim transition-colors`}>
                        {exp.company}
                      </h3>
                      <h4 className={`${isFeatured ? 'text-xl md:text-3xl text-text-primary' : 'text-lg md:text-2xl text-text-secondary'} font-medium mb-8 exp-anim`}>
                        {exp.role}
                      </h4>
                      
                      {exp.achievements?.length > 0 && (
                        <ul className="flex flex-col gap-5">
                          {exp.achievements.map((ach: string, aIdx: number) => (
                            <li key={aIdx} className="exp-anim text-base md:text-lg text-text-primary leading-relaxed relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-border before:rounded-sm hover:before:bg-accent hover:before:scale-150 before:transition-all before:duration-300">
                              {ach}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                  {/* Tech Stack Column */}
                  <div className="lg:col-span-3 mt-8 lg:mt-0">
                    {exp.technologies?.length > 0 && (
                      <div className="flex flex-col gap-6 exp-anim">
                        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-text-secondary border-b border-border/50 pb-3 inline-block w-full">
                          Technical Stack
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech: any) => (
                            <span key={tech.name} className="font-mono text-[10px] md:text-xs border border-border/40 px-3 py-1.5 rounded-sm uppercase tracking-widest text-text-secondary bg-surface/30 backdrop-blur-sm hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors duration-300">
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

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