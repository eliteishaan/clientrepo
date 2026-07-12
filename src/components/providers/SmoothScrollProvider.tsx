'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Do not enable smooth scroll in Studio to prevent interference with Sanity's own layout
    if (pathname?.startsWith('/studio')) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out expo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [pathname]);

  return <>{children}</>;
}
