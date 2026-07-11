'use client';

import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { Text } from '@/components/ui/Text';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export function SpecDrawer({ title, specs }: { title: string, specs: { key: string, value: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div className="border border-border rounded-md bg-surface overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-component-md bg-surface hover:bg-surface-inset transition-colors duration-fast focus-ring cursor-pointer"
        aria-expanded={isOpen}
      >
        <Text variant="label" className="font-bold">{title}</Text>
        <div className={clsx("transform transition-transform duration-fast", isOpen && "rotate-180")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden bg-background">
        <div className="p-component-md border-t border-border">
          <table className="table-semantic w-full text-left">
            <tbody>
              {specs.map((spec, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <th className="py-component-sm pr-component-md font-mono text-[length:var(--font-size-label)] text-text-secondary font-medium w-1/3">
                    {spec.key}
                  </th>
                  <td className="py-component-sm font-mono text-[length:var(--font-size-label)] text-text-primary">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
