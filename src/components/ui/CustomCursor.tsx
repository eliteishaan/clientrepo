'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable custom cursor on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Also disable in Studio
    if (isTouch || prefersReducedMotion || pathname?.startsWith('/studio') || typeof window === 'undefined') {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"});
    const yTo = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    let isHovering = false;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, [data-interactive="true"]');
      
      if (isInteractive && !isHovering) {
        isHovering = true;
        gsap.to(cursor, { 
          scale: 1.5, 
          opacity: 0.5, 
          backgroundColor: 'transparent',
          border: '1px solid white',
          duration: 0.3,
          ease: 'power2.out'
        });
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        gsap.to(cursor, { 
          scale: 1, 
          opacity: 1, 
          backgroundColor: 'white',
          border: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [pathname]);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference rounded-full pointer-events-none z-[9999]"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
