'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from '@/components/ui/Link';

export function AwardsSection({ awards }: { awards: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const displayAwards = (!awards || awards.length === 0) ? [
    {
      _id: 'fallback_1',
      title: 'Valedictorian',
      issuer: 'High School',
      date: '2022-05-01'
    },
    {
      _id: 'fallback_2',
      title: 'Council of International Schools Award',
      issuer: 'Council of International Schools',
      date: '2022-01-01'
    },
    {
      _id: 'fallback_3',
      title: 'BAISS Student Leaders Award',
      issuer: 'BAISS',
      date: '2022-01-01'
    }
  ] : awards;

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Table rows stagger up
    const items = gsap.utils.toArray<HTMLElement>('.award-row');
    
    gsap.fromTo(items,
      { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Cinematic count-up for the total
    if (counterRef.current && !prefersReducedMotion) {
      gsap.fromTo(counterRef.current,
        { textContent: '00' },
        {
          textContent: displayAwards.length,
          duration: 2,
          ease: 'power4.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            if (counterRef.current) {
              const val = Math.round(Number(this.targets()[0].textContent));
              counterRef.current.textContent = val.toString().padStart(2, '0');
            }
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-24 md:py-40 relative z-10 border-y border-border overflow-hidden" aria-label="Awards and Recognition">
      <Container variant="wide" className="relative z-10">
        
        {/* Massive Typographic Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 border-b border-border/50 pb-8 gap-12">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 border border-accent rounded-sm rotate-45 animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-text-secondary">
                06 — 26 / Recognition
              </span>
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tighter uppercase leading-none">
              Honors &<br />Awards
            </h2>
          </div>
          
          {/* Visual Anchor Count */}
          <div className="flex items-baseline gap-4 md:gap-6 shrink-0 relative">
            <span 
              ref={counterRef} 
              className="text-[clamp(6rem,12vw,12rem)] font-bold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(var(--accent),0.3)] select-none"
              aria-hidden="true"
            >
              00
            </span>
            <span className="sr-only">Total awards granted: {displayAwards.length}</span>
            <span className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.3em] rotate-180" style={{ writingMode: 'vertical-rl' }} aria-hidden="true">
              Total<br/>Granted
            </span>
          </div>
          
        </div>

        {/* Editorial Table Layout */}
        <div className="flex flex-col border-t border-border/50 group/table">
          {displayAwards.map((award: any, i: number) => (
            <div
              key={award._id}
              className="award-row group flex flex-col sm:flex-row justify-between sm:items-center py-8 md:py-12 border-b border-border/40 hover:border-accent transition-colors duration-500 relative cursor-pointer overflow-hidden bg-transparent hover:bg-surface-inset"
            >
              
              {/* Hover highlight background slide */}
              <div className="absolute inset-0 bg-accent/5 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 md:gap-24 lg:gap-32 relative z-10 w-full sm:w-auto">
                
                {/* Meta Column (Index & Year) */}
                <div className="flex items-center gap-6 md:gap-12 shrink-0">
                  <span className="font-mono text-[10px] md:text-xs text-text-secondary/50 font-bold w-4 md:w-6 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {award.date && (
                    <span className="font-mono text-sm md:text-base font-medium text-text-secondary transition-colors duration-300 group-hover:text-foreground">
                      {new Date(award.date).getFullYear()}
                    </span>
                  )}
                </div>

                {/* Main Content Column */}
                <div className="flex flex-col gap-1.5 mt-4 sm:mt-0">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                    {award.title}
                  </h3>
                  <p className="font-mono text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] transition-transform duration-500 group-hover:translate-x-4 delay-75">
                    {award.issuer}
                  </p>
                </div>
                
              </div>

              {/* Action Column */}
              {award.url && (
                <div className="relative z-10 mt-8 sm:mt-0 shrink-0 self-start sm:self-center">
                  <Link
                    href={award.url}
                    isExternal
                    className="group/link flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-border/50 bg-background hover:border-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
                    aria-label={`View award: ${award.title}`}
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      <span className="absolute transform translate-x-[-150%] transition-transform duration-500 ease-out group-hover/link:translate-x-0 group-hover:text-accent">
                        →
                      </span>
                      <span className="absolute transform transition-transform duration-500 ease-out group-hover/link:translate-x-[150%] font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                        View
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}