'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { Link } from '@/components/ui/Link';
import { Experience } from '@/lib/types/sanity';

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline draw line
    if (trackRef.current) {
      gsap.fromTo(trackRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );
    }

    const items = gsap.utils.toArray<HTMLElement>('.experience-block');

    items.forEach((item) => {
      const node = item.querySelector('.timeline-node');
      const content = item.querySelectorAll('.animate-up');
      const image = item.querySelector('.animate-image');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      if (node) {
        tl.fromTo(node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
      }

      tl.fromTo(content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        "-=0.6"
      );

      if (image) {
        tl.fromTo(image,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          "-=0.6"
        );
      }
    });
  }, { scope: sectionRef });

  const displayExperience = (!experience || experience.length === 0) ? [
    {
      _id: 'fallback_1',
      company: 'PURPL',
      role: 'Pulsejet Valve Design Responsible Engineer',
      startDate: '2023-01-01',
      isCurrent: true,
      location: 'West Lafayette, Indiana',
      description: 'Designed and optimized pulsejet valve geometries for high-temperature propulsion systems, balancing thermal performance, manufacturability, and rapid design iteration across research and testing.',
      technologies: [{ name: 'Thermal Design' }, { name: 'CAD' }, { name: 'FEA' }, { name: 'Manufacturing' }],
      coverImageUrl: '/images/placeholders/rocket_injector_1783865429873.png'
    },
    {
      _id: 'fallback_2',
      company: 'Purdue Space Program',
      role: 'Injector Design Engineer',
      startDate: '2022-01-01',
      endDate: '2023-01-01',
      isCurrent: false,
      location: 'West Lafayette, Indiana',
      description: 'Engineered complex multi-element injector architectures, achieving optimal propellant mixing and a significant increase in combustion stability during sustained ground testing.',
      technologies: [{ name: 'Fluid Dynamics' }, { name: 'CAD' }, { name: 'Testing' }],
      coverImageUrl: '/images/placeholders/fea_bracket_1783865466280.png'
    },
    {
      _id: 'fallback_3',
      company: 'ASME Racing Team',
      role: 'Performance Engineer',
      startDate: '2021-01-01',
      endDate: '2022-01-01',
      isCurrent: false,
      location: 'West Lafayette, Indiana',
      description: 'Developed predictive telemetry models to refine mechanical suspension setups, translating raw track data into direct geometric optimizations that improved lap times significantly.',
      technologies: [{ name: 'Data Analysis' }, { name: 'Kinematics' }, { name: 'Vehicle Dynamics' }],
      coverImageUrl: '/images/placeholders/robotic_effector_1783865454409.png'
    },
    {
      _id: 'fallback_4',
      company: 'Sun Oil Limited',
      role: 'Engineering Internship',
      startDate: '2020-01-01',
      endDate: '2020-08-01',
      isCurrent: false,
      location: 'Bahamas',
      description: 'Audited industrial operational workflows and documented safety compliance protocols for large-scale energy infrastructure.',
      technologies: [{ name: 'Systems Engineering' }, { name: 'Compliance' }],
      coverImageUrl: null
    }
  ] : experience;

  return (
    <section ref={sectionRef} className="w-full bg-surface-paper text-text-primary py-32 relative z-10 overflow-hidden" aria-label="Experience">
      
      {/* Header */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 mb-24 md:mb-32 flex flex-col items-start gap-4 pb-8 relative">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7B8087] opacity-85">04</div>
        <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] font-medium leading-[1] text-[#0F1115]">
          Professional Experience
        </h2>
        {/* Fading Gradient Line */}
        <div className="absolute bottom-0 left-6 md:left-12 right-6 md:right-12 h-[1px] bg-gradient-to-r from-[#0F1115]/40 via-[#0F1115]/10 to-transparent" />
      </div>

      <Container variant="editorial" className="relative z-10">

        {/* Timeline Structure */}
        <div className="relative pl-6 md:pl-12 lg:pl-16 w-full max-w-[900px] mx-auto">
          
          {/* Static Background Track Line */}
          <div className="absolute top-0 left-0 md:left-[16px] bottom-0 w-[1px] bg-[#D8D2C8]" />
          
          {/* Dynamic Draw Line */}
          <div ref={trackRef} className="absolute top-0 left-0 md:left-[16px] bottom-0 w-[1px] bg-[#2A2A2A] origin-top scale-y-0" />

          <div className="flex flex-col gap-24 md:gap-32">
            {displayExperience.map((exp: Experience) => {
              
              // Format dates cleanly
              const startYear = exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
              const endYear = exp.isCurrent ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
              const duration = startYear ? `${startYear} — ${endYear}` : '';

              return (
                <article key={exp._id} className="experience-block relative flex flex-col w-full">
                  
                  {/* Machined Timeline Node */}
                  <div className="timeline-node absolute left-[-24px] md:left-[-32px] lg:left-[-48px] top-4 w-3 h-3 md:w-2.5 md:h-2.5 bg-[#0F1115] transform -translate-x-1/2 z-20" />

                  {/* 1. Header (Company & Role) */}
                  <div className="animate-up flex flex-col mb-8">
                    <h3 className="font-serif text-[2.5rem] md:text-[3rem] font-medium leading-[1.1] text-[#0F1115] mb-2">
                      {exp.company}
                    </h3>
                    <h4 className="font-mono text-[14px] md:text-[16px] text-[#2A2A2A]">
                      {exp.role}
                    </h4>
                  </div>

                  {/* 2. Metadata (Duration & Location) */}
                  <div className="animate-up flex flex-col gap-1 font-mono text-[12px] md:text-[13px] text-[#7B8087] mb-12">
                    <span>{duration}</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* 3. Description */}
                  {exp.description && (
                    <div className="animate-up mb-12">
                      <p className="text-[1.05rem] md:text-[1.1rem] leading-[1.65] text-[#4E5560] max-w-[65ch]">
                        {exp.description}
                      </p>
                    </div>
                  )}

                  {/* 4. Core Disciplines */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="animate-up mb-16 flex flex-col gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#7B8087]">Core Disciplines</span>
                      <div className="font-mono text-[12px] md:text-[13px] text-[#2A2A2A]">
                        {exp.technologies.map((tech: any) => tech.name).join(' / ')}
                      </div>
                    </div>
                  )}

                  {/* Optional CTA to Project */}
                  {exp.relatedProjects && exp.relatedProjects.length > 0 && (
                    <div className="animate-up mb-16">
                      <Link 
                        href={`/projects/${exp.relatedProjects[0].slug}`} 
                        className="group inline-flex items-center gap-[12px] font-mono text-[11px] uppercase tracking-[0.18em]"
                      >
                        <span className="relative pb-1 text-[#2A2A2A]">
                          View Project
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#7B8794] transition-all duration-500 ease-out group-hover:w-full" />
                        </span>
                        <span className="transition-transform duration-500 ease-out group-hover:translate-x-1 text-[#2A2A2A]">→</span>
                      </Link>
                    </div>
                  )}

                  {/* 5. Large Cinematic Image */}
                  {exp.coverImageUrl && (
                    <div className="animate-image relative w-[85%] md:w-full aspect-[16/9] md:aspect-[3/2] overflow-hidden bg-surface-canvas border border-border-light">
                      <Image 
                        src={exp.coverImageUrl} 
                        alt={`Visual from ${exp.company}`} 
                        fill 
                        sizes="(max-width: 1024px) 85vw, 820px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}