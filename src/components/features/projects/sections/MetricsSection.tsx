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
    const cards = gsap.utils.toArray<HTMLElement>('.metric-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
          delay: i * 0.1,
        }
      );
    });

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
            duration: 2,
            ease: 'power2.out',
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
    <section className="w-full py-20 md:py-32" aria-label="Results & Metrics">
      <Container variant="wide">
        <div ref={containerRef}>
          {/* Section label */}
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary mb-12 md:mb-16">
            Results & Metrics
          </h2>
          
          {/* Metric cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/50">
            {metrics.map((metric: any, idx: number) => (
              <div key={idx} className="metric-card bg-background p-8 md:p-10 flex flex-col">
                {/* Large value */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="metric-value text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground tabular-nums">
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-lg md:text-xl font-medium text-text-secondary">
                      {metric.unit}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mt-auto pt-4 border-t border-border/30">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
