'use client';

import { useRef, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

interface Skill {
  name: string;
  featured?: boolean;
}

interface CapabilityCategory {
  title: string;
  skills: Skill[];
}

export function SkillsSection({ capabilities }: { capabilities: CapabilityCategory[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Create placeholder data if CMS is empty
  const displayCapabilities = useMemo(() => (!capabilities || capabilities.length === 0) ? [
    {
      title: 'Mechanical Engineering',
      skills: [{ name: 'CAD Design' }, { name: 'Thermal Systems' }, { name: 'GD&T' }, { name: 'Design for Manufacturing' }, { name: 'Finite Element Analysis' }]
    },
    {
      title: 'Simulation & Analysis',
      skills: [{ name: 'FEA' }, { name: 'ANSYS' }, { name: 'Failure Analysis' }, { name: 'Optimization' }]
    },
    {
      title: 'Manufacturing',
      skills: [{ name: 'CNC Machining' }, { name: 'Rapid Prototyping' }, { name: 'Assembly' }, { name: 'Tooling Design' }]
    },
    {
      title: 'Leadership & Research',
      skills: [{ name: 'Technical Writing' }, { name: 'Communication' }, { name: 'Leadership' }, { name: 'Research Protocols' }]
    }
  ] : capabilities, [capabilities]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.context(() => {
      // Intro Sequence Timeline
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      introTl.fromTo('.section-meta',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo('.section-title',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.section-desc',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        )
        .fromTo('.section-divider',
          { scaleX: 0, transformOrigin: 'left', opacity: 0 },
          { scaleX: 1, opacity: 0.5, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );

      // Independent trigger for each category block
      // Desktop: they share Y coordinates so they trigger in rows
      // Mobile: they stack and trigger sequentially as you scroll
      const categories = gsap.utils.toArray<HTMLElement>('.capability-category');
      
      categories.forEach((cat) => {
        const header = cat.querySelector('.category-header');
        const items = gsap.utils.toArray(cat.querySelectorAll('.skill-item'));
        
        const catTl = gsap.timeline({
          scrollTrigger: {
            trigger: cat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });

        if (header) {
          catTl.fromTo(header,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        }
        
        if (items.length > 0) {
          catTl.fromTo(items,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
            header ? '-=0.6' : 0
          );
        }
      });
    }, sectionRef);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-surface-graphite text-text-primary-dark py-32 relative z-10" aria-label="Technical Expertise">
      
      <Container variant="editorial" className="relative z-10 mb-10 md:mb-14">
        <div className="flex flex-col text-left max-w-[65ch]">
          
          {/* Metadata */}
          <span className="section-meta font-mono text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] text-text-secondary-dark leading-none">
            Technical Expertise
          </span>
          
          <div className="h-[24px]" />
          
          {/* Editorial Heading */}
          <h2 className="section-title font-serif text-heading-l md:text-display-l font-medium tracking-tight leading-[1.1] text-text-primary-dark text-balance">
            Engineering Toolkit
          </h2>
          
          <div className="h-[16px]" />
          
          {/* Paragraph */}
          <p className="section-desc font-sans text-body-l text-text-secondary-dark max-w-2xl text-balance leading-relaxed">
            The tools, methodologies, and engineering disciplines supporting my work across research, design, and manufacturing.
          </p>
          
          <div className="h-[40px]" />
          
          {/* Structural Divider */}
          <div className="section-divider w-full max-w-[240px] h-[1px] bg-border-medium opacity-50 origin-left" />
          
        </div>
      </Container>

      <Container variant="editorial" className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-16 md:gap-y-24 relative">
          {displayCapabilities.map((category: CapabilityCategory, idx: number) => {
            const rowClass = `skill-row-${Math.floor(idx / 2)}`;
            return (
              <div key={idx} className={`capability-category flex flex-col relative ${rowClass}`}>
                
                <h3 className="category-header font-sans text-[19px] md:text-[20px] font-medium text-text-primary-dark mb-8 tracking-tight leading-snug">
                  {category.title}
                </h3>
                
                <ul className="flex flex-col gap-4">
                  {category.skills?.map((skill: Skill, sIdx: number) => (
                    <li 
                      key={sIdx} 
                      className="skill-item flex items-center cursor-default"
                      data-index={sIdx}
                    >
                      <div className="group relative inline-flex items-center transition-transform duration-500 ease-out hover:translate-x-[3px] py-[2px]">
                        <span className={`font-sans text-[17px] tracking-wide transition-colors duration-500 ${skill.featured ? 'font-medium text-text-primary-dark' : 'text-text-secondary-dark group-hover:text-text-primary-dark'}`}>
                          {skill.name}
                        </span>
                        <span className="absolute -bottom-[2px] left-0 right-0 h-[1px] bg-accent origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}