'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export function MetricsSection({ metrics }: { metrics?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

          // Temporarily set to 0 to prepare for animation
          target.innerText = prefix + '0' + suffix;

          gsap.to(obj, {
            val: val,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              target.innerText = prefix + (isInt ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix;
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
    <Section spacing="lg" aria-label="Results & Metrics">
      <Container variant="standard">
        <div ref={containerRef}>
          <Stack gap="lg">
          <Heading variant="heading" level={2}>Results & Metrics</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-component-md p-section-sm bg-surface-inset rounded-md border border-border">
            {metrics.map((metric: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-metric font-mono font-bold text-text-metric">
                  <span className="metric-value">{metric.value}</span>
                  <span className="text-title ml-1 text-foreground">{metric.unit}</span>
                </div>
                <Text variant="label" color="secondary" className="mt-component-sm block">{metric.label}</Text>
              </div>
            ))}
          </div>
        </Stack>
        </div>
      </Container>
    </Section>
  );
}
