'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function MetricsSection({ metrics }: { metrics?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Animate each metric card entrance
    const cards = gsap.utils.toArray<HTMLElement>('.metric-cell');
    
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Animate numeric values
    const targets = gsap.utils.toArray<HTMLElement>('.metric-value');
    targets.forEach((target) => {
      const originalText = target.innerText;
      const numMatch = originalText.match(/[\d.,]+/);
      if (numMatch) {
        const numStr = numMatch[0].replace(/,/g, '');
        const val = parseFloat(numStr);
        if (!isNaN(val)) {
          const obj = { val: 0 };
          const prefix = originalText.substring(0, numMatch.index);
          const suffix = originalText.substring(numMatch.index! + numMatch[0].length);
          const isInt = numStr.indexOf('.') === -1;

          target.innerText = prefix + '0' + suffix;

          gsap.to(obj, {
            val: val,
            duration: 2.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              target.innerText = prefix + (isInt ? Math.floor(obj.val).toLocaleString() : obj.val.toFixed(1)) + suffix;
            },
            onComplete: () => {
              target.innerText = originalText;
            }
          });
        }
      }
    });
  }, { scope: containerRef });

  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="w-full py-24 md:py-40 bg-background" aria-label="Results & Metrics">
      <Container variant="wide">
        <div ref={containerRef}>
          
          <div className="flex items-center gap-6 mb-16 md:mb-24">
            <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-text-secondary shrink-0">
              System Telemetry // Results
            </h2>
            <div className="flex-1 h-px bg-border/50" />
          </div>
          
          {/* High-End Architectural Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/50 rounded-sm overflow-hidden">
            {metrics.map((metric: any, idx: number) => (
              <div 
                key={idx} 
                className="metric-cell relative bg-background p-10 md:p-12 flex flex-col justify-between group overflow-hidden"
              >
                {/* Background interaction */}
                <div className="absolute inset-0 bg-surface-inset translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="metric-value text-[clamp(3rem,6vw,6rem)] font-bold tracking-tighter text-foreground tabular-nums leading-none" aria-hidden="true">
                      {metric.value}
                    </span>
                    <span className="sr-only">{metric.value} {metric.unit || ''}</span>
                    {metric.unit && (
                      <span className="text-xl md:text-2xl font-bold text-accent" aria-hidden="true">
                        {metric.unit}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative z-10 flex items-center gap-4 border-t border-border/30 pt-6 mt-4 group-hover:border-accent/50 transition-colors duration-500">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted group-hover:text-foreground transition-colors duration-300">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
