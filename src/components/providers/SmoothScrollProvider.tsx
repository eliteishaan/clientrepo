'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    // Force scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

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

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    // Handle hash link clicks for smooth scrolling
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const hash = href.substring(hashIndex);
        if (hash === '#') return;
        
        const pathPart = href.substring(0, hashIndex);
        // If it's a link to the current page's hash
        if (pathPart === '' || pathPart === pathname) {
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { 
              offset: -88, // Offset for the fixed header
              duration: 1.5
            });
            // Update URL without jumping
            window.history.pushState(null, '', href);
          }
        }
      }
    };

    document.addEventListener('click', handleHashClick);

    return () => {
      document.removeEventListener('click', handleHashClick);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, [pathname]);

  return <>{children}</>;
}
