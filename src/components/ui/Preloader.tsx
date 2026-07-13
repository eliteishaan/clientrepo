'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textMeasureRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Optional: Only play once per session
    // if (sessionStorage.getItem('preloaderPlayed')) {
    //   setIsComplete(true);
    //   return;
    // }

    const fullWidth = textMeasureRef.current?.offsetWidth || 0;
    
    // Initial states
    gsap.set(textWrapperRef.current, { width: 0 });
    gsap.set(lineRef.current, { y: -window.innerHeight });

    // Block scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloaderPlayed', 'true');
        document.body.style.overflow = '';
        setIsComplete(true);
      }
    });

    // 1. Line drops from the sky
    tl.to(lineRef.current, { 
      y: 0, 
      duration: 1.2, 
      ease: 'expo.out' 
    })
    // 2. Line slides left as text wrapper expands
    .to(textWrapperRef.current, { 
      width: fullWidth, 
      duration: 1.2, 
      ease: 'expo.inOut' 
    }, '+=0.1')
    // 3. Slide the entire black screen up to reveal the site
    .to(containerRef.current, { 
      yPercent: -100, 
      duration: 1.0, 
      ease: 'expo.inOut' 
    }, '+=0.6');

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-auto"
    >
      <div className="flex items-center">
        {/* The thick white line */}
        <div 
          ref={lineRef} 
          className="w-1.5 md:w-2 h-16 md:h-20 bg-white z-20 relative rounded-sm" 
        />
        
        {/* The text wrapper that expands */}
        <div ref={textWrapperRef} className="overflow-hidden">
          <div 
            ref={textMeasureRef} 
            className="font-serif text-3xl md:text-5xl tracking-[0.4em] text-white pl-6 uppercase whitespace-nowrap"
          >
            vivan
          </div>
        </div>
      </div>
    </div>
  );
}
