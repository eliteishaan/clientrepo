'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from '@/components/ui/Link';

export function AwardsSection({ awards }: { awards: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Stagger from right — unique horizontal entrance identity
    const items = gsap.utils.toArray<HTMLElement>('.award-item');
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: prefersReducedMotion ? 0 : 60 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power3.out',
          delay: prefersReducedMotion ? 0 : i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Count-up for the awards total
    if (counterRef.current && !prefersReducedMotion) {
      gsap.fromTo(counterRef.current,
        { textContent: '0' },
        {
          textContent: awards.length,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: sectionRef });

  if (false) return null; // Debug bypass

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground relative z-10" aria-label="Awards and Recognition">
      <Container variant="wide" className="py-[var(--spacing-section-lg)]">
        {/* Oversize count creates visual anchor */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 lg:gap-48 items-start md:items-end mb-16 md:mb-24">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-secondary block mb-4">
              Recognition
            </span>
            <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-tighter uppercase leading-none">
              Awards &amp; Honors
            </h2>
          </div>
          <div className="flex items-baseline gap-2 shrink-0">
            <span ref={counterRef} className="text-[clamp(4rem,12vw,12rem)] font-bold leading-none tracking-tighter text-foreground/10">
              {awards.length}
            </span>
            <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">Recognitions</span>
          </div>
        </div>

        {/* Awards list — each item is a full-width row with distinct rhythm */}
        <div className="flex flex-col border-t border-border">
          {awards.map((award: any, i: number) => (
            <div
              key={award._id}
              className="award-item group grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 sm:gap-8 lg:gap-16 items-center py-8 md:py-10 border-b border-border/40"
            >
              {/* Index */}
              <span className="font-mono text-xs text-text-secondary w-8 shrink-0 hidden sm:block">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Main content */}
              <div>
                <h3 className="text-lg md:text-2xl font-bold tracking-tight group-hover:text-text-secondary transition-colors duration-500">
                  {award.title}
                </h3>
                <p className="font-mono text-xs text-text-secondary mt-1 uppercase tracking-wider">
                  {award.issuer}
                </p>
              </div>

              {/* Date + optional link */}
              <div className="flex items-center gap-6 shrink-0">
                {award.date && (
                  <span className="font-mono text-sm text-text-secondary">
                    {new Date(award.date).getFullYear()}
                  </span>
                )}
                {award.url && (
                  <Link
                    href={award.url}
                    isExternal
                    className="font-mono text-[10px] uppercase tracking-widest border border-border/50 px-3 py-1.5 rounded-full hover:border-foreground hover:text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`View award: ${award.title}`}
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}