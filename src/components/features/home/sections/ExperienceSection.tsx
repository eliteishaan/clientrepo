'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';

export function ExperienceSection({ experience }: { experience: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = gsap.utils.toArray<HTMLElement>('.experience-item');

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  }, { scope: sectionRef });

  if (!experience || experience.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-[var(--spacing-section-lg)] relative z-10" aria-label="Experience">
      {/* Subtle background blueprint grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,#000_10%,transparent_100%)] opacity-10 pointer-events-none" />
      
      <Container variant="wide" className="relative z-10">
        <div className="mb-[var(--spacing-section-lg)] flex justify-between items-end border-b border-border pb-8">
          <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-tighter uppercase leading-none">
            Experience
          </h2>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest hidden md:block">
            03 — 26
          </span>
        </div>

        <div className="flex flex-col">
          {experience.map((exp: any, index: number) => {
            const isLast = index === experience.length - 1;
            return (
              <div key={exp._id} className={`experience-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 md:py-20 ${!isLast ? 'border-b border-border/50' : ''}`}>
                
                {/* Meta Column */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                    {exp.location}
                  </span>
                  {exp.companyLogoUrl && (
                    <div className="mt-6 w-16 h-16 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                      <Image src={exp.companyLogoUrl} alt={exp.company} fill className="object-contain object-left" />
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 uppercase">
                    {exp.company}
                  </h3>
                  <h4 className="text-xl md:text-2xl text-text-secondary font-medium mb-8">
                    {exp.role}
                  </h4>
                  
                  {exp.achievements?.length > 0 && (
                    <ul className="flex flex-col gap-4">
                      {exp.achievements.map((ach: string, idx: number) => (
                        <li key={idx} className="text-base md:text-lg text-text-secondary leading-relaxed relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Column */}
                <div className="lg:col-span-3">
                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-col gap-6">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary border-b border-border/50 pb-2 inline-block w-full">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: any) => (
                          <span key={tech.name} className="text-xs border border-border/50 px-3 py-1.5 rounded-full uppercase tracking-wider text-text-secondary bg-surface/50 backdrop-blur-sm">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}