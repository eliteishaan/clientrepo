'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { useGSAP } from '@gsap/react';

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    if (!container.current) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || pathname === '/') {
      gsap.set(container.current, { opacity: 1, y: 0, filter: 'blur(0px)' });
      return;
    }

    gsap.fromTo(
      container.current,
      { opacity: 0, y: 10, filter: 'blur(4px)' },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 0.6, 
        ease: 'power3.out',
        clearProps: 'all' // Prevents transform conflicts after animation completes
      }
    );
  }, { dependencies: [pathname], scope: container });

  return (
    <div ref={container} className="will-change-transform will-change-opacity flex-grow flex flex-col w-full h-full">
      {children}
    </div>
  );
}
