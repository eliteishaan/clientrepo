'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/components/ui/Link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { Project } from '@/lib/types/sanity';

export function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const displayProjects = (!projects || projects.length === 0) ? [
    {
      _id: 'fallback_1',
      title: 'T6-6061 Thermal Enclosure',
      slug: '#',
      subtitle: 'Designed a thermal enclosure capable of sustaining high heat loads while maintaining manufacturable tolerances for aerospace integration.',
      challenge: 'Maintain thermal stability during continuous high-load operation.',
      outcome: 'Reduced operating temperature while preserving manufacturable tolerances.',
      results: [
        { label: 'Heat Reduction', value: '32%' },
        { label: 'Tolerance', value: '±0.05 mm' },
        { label: 'Weight', value: '-18%' },
        { label: 'Material', value: '6061-T6' }
      ],
      categories: [{ title: 'Thermal Design' }, { title: 'FEA' }, { title: 'DFM' }, { title: 'CAD' }],
      coverImageUrl: '/images/placeholders/rocket_injector_1783865429873.png',
      isFallback: true
    },
    {
      _id: 'fallback_2',
      title: 'Kinetic Micro-Assembly Effector',
      slug: '#',
      subtitle: 'Engineered a high-precision 5-axis robotic effector capable of automated micro-assembly tasks with absolute repeatability.',
      challenge: 'Eliminate backlash and hysteresis in sub-millimeter positional control.',
      outcome: 'Achieved zero-backlash positioning with absolute spatial accuracy.',
      results: [
        { label: 'Accuracy', value: '±2 μm' },
        { label: 'Payload', value: '500g' },
        { label: 'Actuation', value: 'Piezo' },
        { label: 'Latency', value: '<5ms' }
      ],
      categories: [{ title: 'Robotics' }, { title: 'Kinematics' }, { title: 'Control Systems' }],
      coverImageUrl: '/images/placeholders/robotic_effector_1783865454409.png',
      isFallback: true
    }
  ] : projects;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Create the 3D depth effect: As a new card slides up, the one below it scales down and fades into the shadows
      const cards = gsap.utils.toArray<HTMLElement>('.sticky-card');
      
      cards.forEach((card, i) => {
        // Do not animate the very last card (the archive) so it stays solid at the end
        if (i === cards.length - 1) return;

        const innerContent = card.querySelector('.card-inner');
        
        gsap.to(innerContent, {
          yPercent: -10, // Slight physical push back
          scale: 0.92, // Compresses the titanium plate
          opacity: 0.15, // Fades into the background
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: "top top", // Starts the exact moment the card locks to the top
            end: () => `+=${window.innerHeight}`, // Ends exactly when the next card fully covers it
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    // FIX: Strictly NO overflow-hidden on this wrapper. Native scroll requires visible overflow.
    <section 
      id="work"
      ref={sectionRef} 
      className="w-full bg-surface-stone text-text-primary py-32 relative z-10" 
      aria-label="Selected Works"
    >
      <div className="w-full flex flex-col relative z-10 bg-surface-stone">
        
        {/* Editorial Section Introduction */}
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-[12vh] pb-[6vh] flex flex-col items-start gap-4 relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7B8087] opacity-85">03</div>
          <h2 className="font-serif text-[2.5rem] md:text-[3.5rem] font-medium leading-[1] text-[#0F1115]">Selected Work</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#4E5560]">Research · Engineering · Manufacturing</p>
          {/* Fading Gradient Line */}
          <div className="absolute bottom-0 left-6 md:left-12 right-6 md:right-12 h-[1px] bg-gradient-to-r from-[#0F1115]/40 via-[#0F1115]/10 to-transparent" />
        </div>
        {displayProjects.map((project: Project, index: number) => {
          const headingId = `project-heading-${project._id}`;
          const projectSlug = project.slug;
          const projectUrl = project.isFallback ? '#' : `/projects/${projectSlug}`;

          return (
            // The magic happens here: sticky top-0 and h-screen perfectly stack the cards
            <article 
              key={project._id} 
              className={`sticky-card sticky top-0 w-full h-screen flex items-start justify-center bg-surface-stone outline-none origin-top overflow-hidden ${
                index === 0 ? 'border-t-0' : 'border-t border-border-light'
              }`}
              aria-labelledby={headingId}
            >
              {/* Inner wrapper that receives the GSAP scale/fade effect */}
              <div className="card-inner w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-0 flex flex-col md:flex-row items-start justify-between gap-8 md:gap-24">
                
                {/* Text Hierarchy (Left on desktop, top on mobile) */}
                <div className="w-full md:w-5/12 flex flex-col text-left order-1 my-auto max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  
                  <div className="project-number font-mono text-[11px] uppercase tracking-[0.18em] text-[#7B8087] opacity-85 mb-4 md:mb-5">
                    {String(index + 1).padStart(2, '0')} / {String(displayProjects.length).padStart(2, '0')}
                  </div>
                  
                  <h3 id={headingId} className="project-title font-serif text-[2.5rem] md:text-[3.5rem] leading-[0.95] font-medium tracking-[-0.03em] mb-[48px] text-[#0F1115]">
                    <Link href={projectUrl} className="outline-none block hover:opacity-90 transition-opacity">
                      {project.title}
                    </Link>
                  </h3>
                  
                  {/* Mobile Image Hero (Only visible on mobile, positioned exactly between title and description) */}
                  <div className="w-full h-[35vh] min-h-[300px] shrink-0 md:hidden mb-[48px]">
                    <Link href={projectUrl} className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-[#2A2A2A]">
                      <div className="w-full h-full overflow-hidden bg-surface-canvas relative border border-[#C6BFB3] shadow-none">
                        {project.coverImageUrl ? (
                          <Image 
                            src={project.coverImageUrl} 
                            alt={`Cover image for ${project.title}`} 
                            fill
                            sizes="(max-width: 768px) 100vw, 60vw"
                            decoding="async"
                            className="object-cover origin-center" 
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-surface-canvas">
                             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                  
                  {/* Editorial Flow */}
                  <div className="flex flex-col w-full border-t border-border-light">
                    
                    {/* Subtitle / Description */}
                    {project.subtitle && (
                      <div className="pt-[24px] pb-[36px] border-b border-border-light">
                        <p className="text-[1.05rem] leading-[1.6] text-[#4E5560] font-sans text-balance max-w-[50ch]">
                          {project.subtitle}
                        </p>
                      </div>
                    )}

                    {/* Challenge */}
                    {project.challenge && (
                      <div className="py-[24px] border-b border-border-light flex flex-col gap-[12px]">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7B8087] opacity-85">Challenge</span>
                        <p className="text-[1rem] leading-[1.55] text-[#2A2A2A] max-w-[50ch]">
                          {project.challenge}
                        </p>
                      </div>
                    )}

                    {/* Outcome */}
                    {project.outcome && (
                      <div className="py-[24px] border-b border-border-light flex flex-col gap-[12px]">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7B8087] opacity-85">Outcome</span>
                        <p className="text-[1rem] leading-[1.55] text-[#2A2A2A] max-w-[50ch]">
                          {project.outcome}
                        </p>
                      </div>
                    )}

                    {/* Results / Metrics */}
                    {project.results && project.results.length > 0 && (
                      <div className="pt-[20px] pb-[28px] border-b border-border-light">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                          {project.results.map((result: any, idx: number) => (
                            <div key={idx} className="flex flex-col gap-[4px]">
                              <span className="font-mono text-[15px] font-medium text-[#2A2A2A] leading-none">{result.value}</span>
                              <span className="font-mono text-[11px] leading-[1.3] uppercase tracking-[0.18em] text-[#7B8087] opacity-85">{result.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    {project.categories && project.categories.length > 0 && (
                      <div className="pt-[24px] pb-[24px] border-b border-border-light flex flex-col gap-[12px]">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7B8087] opacity-85">Engineering Stack</span>
                        <div className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] text-[#2A2A2A]">
                          {project.categories.map((cat: any) => cat.title).join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Monochromatic CTA */}
                  <div className="project-cta flex justify-start mt-[44px] mb-4">
                    <Link 
                      href={projectUrl} 
                      className="group inline-flex items-center gap-[12px] font-mono text-[11px] uppercase tracking-[0.18em]"
                    >
                      <span className="relative pb-1 text-[#2A2A2A]">
                        View Case Study
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#7B8794] transition-all duration-500 ease-out group-hover:w-full" />
                      </span>
                      <span className="transition-transform duration-500 ease-out group-hover:translate-x-1 text-[#2A2A2A]">→</span>
                    </Link>
                  </div>
                </div>

                {/* Cinematic Image Hero (Desktop only, right side) - Static & Printed */}
                <div className="hidden md:block w-full md:w-7/12 md:h-[75vh] order-2 my-auto">
                  <Link href={projectUrl} className="block w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-[#2A2A2A]">
                    <div className="w-full h-full overflow-hidden bg-surface-secondary relative border border-[#C6BFB3] shadow-none">
                      {project.coverImageUrl ? (
                        <Image 
                          src={project.coverImageUrl} 
                          alt={`Cover image for ${project.title}`} 
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          decoding="async"
                          className="object-cover origin-center" 
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-surface-secondary">
                           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

              </div>
            </article>
          );
        })}

        {/* Final Archive Panel - Also acts as the last sticky plate */}
        <article className="sticky-card sticky top-0 w-full h-screen flex items-center justify-center bg-surface-stone border-t border-border-medium shadow-none">
          <div className="card-inner w-full max-w-2xl flex flex-col gap-6 text-center px-6">
            <h3 className="font-serif text-[3rem] md:text-[5rem] leading-[0.95] font-medium tracking-tight text-[#111111]">
              Full Archive
            </h3>
            <p className="text-text-secondary text-body-l md:text-[1.25rem] font-sans mb-8 mx-auto max-w-[40ch]">
              Review additional case studies, legacy projects, and detailed engineering documentation.
            </p>
            <div className="flex justify-center">
              <Link href="#contact" className="group inline-flex items-center gap-3 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em]">
                <span className="relative pb-1 text-[#111111]">
                  Initiate Transmission
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#111111] transition-all duration-500 ease-out group-hover:w-full" />
                </span>
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1 text-[#111111]">→</span>
              </Link>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}