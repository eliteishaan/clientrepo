'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function DownloadsList({ downloads }: { downloads?: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const items = gsap.utils.toArray<HTMLElement>('.download-item');
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
          },
          delay: i * 0.08,
        }
      );
    });
  }, { scope: sectionRef });

  if (!downloads || downloads.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24" aria-label="Downloads">
      <Container variant="reading">
        <div className="max-w-3xl mx-auto">
          {/* Section label */}
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary mb-10">
            Downloads & Resources
          </h2>

          {/* Download list */}
          <div className="flex flex-col">
            {downloads.map((dl: any, idx: number) => (
              <a 
                key={idx} 
                href={dl.url} 
                target="_blank" 
                rel="noreferrer" 
                className="download-item group flex items-center justify-between py-5 border-b border-border/50 transition-colors duration-300 hover:border-accent/50 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none rounded-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-text-muted mt-1 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="text-base md:text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 block">
                      {dl.title}
                    </span>
                    {dl.description && (
                      <span className="text-sm text-text-secondary mt-1 block">{dl.description}</span>
                    )}
                  </div>
                </div>
                
                {/* Arrow icon */}
                <svg 
                  className="w-5 h-5 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
