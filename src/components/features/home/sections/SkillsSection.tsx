'use client';

import { useRef, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function SkillsSection({ skills }: { skills: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Create placeholder data if CMS is empty
  const displaySkills = useMemo(() => (!skills || skills.length === 0) ? [
    { category: { title: 'Mechanical Systems' }, technology: { name: 'CAD' } },
    { category: { title: 'Mechanical Systems' }, technology: { name: 'Mechanical Design' } },
    { category: { title: 'Mechanical Systems' }, technology: { name: 'Manufacturing' } },
    
    { category: { title: 'Design & Analysis' }, technology: { name: 'Testing' } },
    { category: { title: 'Design & Analysis' }, technology: { name: 'Analysis' } },
    { category: { title: 'Design & Analysis' }, technology: { name: 'Simulation' } },
    
    { category: { title: 'Engineering Practice' }, technology: { name: 'Leadership' } },
    { category: { title: 'Engineering Practice' }, technology: { name: 'Problem Solving' } },
    { category: { title: 'Engineering Practice' }, technology: { name: 'Critical Thinking' } },
  ] : skills, [skills]);

  // Extract all unique technology names for the marquee
  const marqueeItems = useMemo(() => {
    const names = displaySkills.map(s => s.technology?.name).filter(Boolean);
    return Array.from(new Set(names));
  }, [displaySkills]);

  // Group skills by category title
  const groupedSkills = useMemo(() => {
    return displaySkills.reduce((acc: any, skill: any) => {
      const category = skill.category?.title || 'Core Capabilities';
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  }, [displaySkills]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Infinite Marquee Animation
    if (marqueeRef.current && !prefersReducedMotion) {
      const marqueeInner = marqueeRef.current.querySelector('.marquee-inner');
      if (marqueeInner) {
        gsap.to(marqueeInner, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        });
      }
    }

    // Grid Fade Up Stagger
    const columns = gsap.utils.toArray<HTMLElement>('.skill-col');
    
    gsap.fromTo(columns,
      { opacity: 0, y: prefersReducedMotion ? 0 : 60 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-surface text-foreground py-24 md:py-40 relative z-10 border-y border-border overflow-hidden" aria-label="Technical Capabilities">
      
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 bg-noise opacity-50 pointer-events-none" />

      <Container variant="wide" className="relative z-10 mb-16 md:mb-32">
        <div className="flex justify-between items-end border-b border-border/40 pb-8">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            Capabilities
          </span>
          <span className="font-mono text-sm text-text-secondary uppercase tracking-widest hidden md:block">
            04 — 26
          </span>
        </div>
      </Container>

      {/* Massive Typographic Marquee */}
      {marqueeItems.length > 0 && (
        <div ref={marqueeRef} className="w-full overflow-hidden whitespace-nowrap border-y border-border/20 py-4 md:py-8 bg-surface-elevated/30 backdrop-blur-sm relative z-10 mb-20 md:mb-32 flex">
          <div className="marquee-inner inline-flex items-center">
            {/* Double the items to create a seamless loop */}
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="flex items-center">
                <span className="text-[clamp(3rem,8vw,8rem)] font-bold tracking-tighter uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] hover:text-foreground transition-colors duration-500 cursor-default px-8 md:px-16">
                  {item}
                </span>
                <span className="w-4 h-4 md:w-8 md:h-8 bg-accent rounded-full opacity-50" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structured Technical Grid */}
      <Container variant="wide" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
          {Object.entries(groupedSkills).map(([category, items]: [string, any]) => (
            <div key={category} className="skill-col flex flex-col group/col">
              
              <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase border-b border-border pb-6 mb-8 text-text-primary flex justify-between items-center group-hover/col:border-accent transition-colors duration-500">
                {category}
                <span className="font-mono text-[10px] text-text-secondary">[{items.length}]</span>
              </h3>
              
              <ul className="flex flex-col">
                {items.map((skill: any, idx: number) => {
                  const isLast = idx === items.length - 1;
                  return (
                    <li key={idx} className={`group flex justify-between items-center py-4 ${!isLast ? 'border-b border-border/30' : ''}`}>
                      <span className="text-lg md:text-xl font-medium tracking-tight text-text-secondary group-hover:text-accent transition-colors duration-300 relative pl-4">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                        {skill.technology?.name}
                      </span>
                      {skill.proficiency && (
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-text-secondary/60 group-hover:text-text-primary transition-colors duration-300">
                            {skill.proficiency}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}