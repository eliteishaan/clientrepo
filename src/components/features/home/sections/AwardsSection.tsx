'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from '@/components/ui/Link';
import { Award } from '@/lib/types/sanity';

export function AwardsSection({ awards }: { awards: Award[] }) {
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
    <section ref={sectionRef} className="w-full bg-surface-primary text-text-primary py-24 md:py-32 relative z-10 border-y border-border-subtle overflow-hidden" aria-label="Awards and Recognition">
      <Container variant="editorial" className="relative z-10">
        
        {/* Massive Typographic Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between md:items-end border-b border-border-subtle pb-8 gap-12 md:gap-4">
          <h2 className="text-display-l font-medium tracking-tight uppercase leading-none">
            Honors & Awards
          </h2>
          <div className="flex flex-col md:items-end gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-metadata">
              DOC.REF / AWD-01
            </span>
            <span className="font-mono text-mono-label text-text-secondary uppercase tracking-[0.2em]">
              SEC.06 / RECOGNITION / REV.A
            </span>
          </div>

          <div className="flex items-baseline gap-4 md:gap-6 shrink-0 relative">
            <span 
              ref={counterRef} 
              className="text-display-xl font-medium leading-[0.8] tracking-tighter text-text-primary/5 select-none"
              aria-hidden="true"
            >
              00
            </span>
            <span className="sr-only">Total awards granted: {displayAwards.length}</span>
            <span className="font-mono text-mono-micro text-text-secondary uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }} aria-hidden="true">
              Total<br/>Granted
            </span>
          </div>
        </div>

        {/* Editorial Table Layout */}
        <div className="flex flex-col border-t border-border group/table">
          {displayAwards.map((award: Award, i: number) => (
            <div
              key={award._id}
              className="award-row group flex flex-col sm:flex-row justify-between sm:items-center py-8 md:py-12 border-b border-border hover:border-text-primary transition-colors duration-500 relative cursor-pointer overflow-hidden bg-transparent hover:bg-surface-elevated pl-0 hover:pl-4"
            >
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 md:gap-24 lg:gap-32 relative z-10 w-full sm:w-auto">
                
                {/* Meta Column (Index & Year) */}
                <div className="flex items-center gap-6 md:gap-12 shrink-0">
                  <span className="font-mono text-mono-label text-text-secondary/50 font-bold w-4 md:w-6 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {award.date && (
                    <span className="font-mono text-mono-label font-medium text-text-secondary transition-colors duration-300 group-hover:text-foreground">
                      {new Date(award.date).getFullYear()}
                    </span>
                  )}
                </div>

                {/* Main Content Column */}
                <div className="flex flex-col gap-1.5 mt-4 sm:mt-0">
                  <h3 className="text-heading-m font-medium tracking-tight text-text-primary">
                    {award.title}
                  </h3>
                  <p className="font-mono text-mono-label text-text-secondary uppercase tracking-widest transition-transform duration-500 group-hover:translate-x-4 delay-75">
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
                    className="group/link flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-sm border border-border bg-background hover:border-text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary overflow-hidden"
                    aria-label={`View award: ${award.title}`}
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      <span className="absolute transform translate-x-[-150%] transition-transform duration-500 ease-out group-hover/link:translate-x-0 group-hover:text-text-primary">
                        →
                      </span>
                      <span className="absolute transform transition-transform duration-500 ease-out group-hover/link:translate-x-[150%] font-mono text-mono-micro uppercase tracking-widest text-text-secondary">
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