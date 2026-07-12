'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clsx } from 'clsx';

export function TextSection({ title, content, variant = 'default', id }: { title: string; content?: string; variant?: 'default' | 'lead' | 'technical'; id?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !ruleRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Horizontal rule reveal
    gsap.fromTo(ruleRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        }
      }
    );

    // Text stagger reveal (lines)
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }
    
    if (metaRef.current) {
      gsap.fromTo(metaRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }
  }, { scope: sectionRef });

  if (!content) return null;

  return (
    <section ref={sectionRef} id={id} className={clsx("w-full py-16 md:py-24", variant === 'technical' ? "bg-surface-inset border-y border-border/50" : "")} aria-label={title}>
      <Container variant="reading">
        <div className={clsx("flex flex-col md:flex-row gap-8 md:gap-16", variant === 'lead' ? 'items-start' : '')}>
          
          {/* Metadata Sidebar */}
          <div className="w-full md:w-1/4 shrink-0 flex flex-col pt-2" ref={metaRef}>
            <div className="flex items-center gap-4 mb-8 md:mb-0">
              <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-secondary">
                {title}
              </h2>
            </div>
            
            {variant === 'technical' && (
              <div className="hidden md:block mt-auto font-mono text-[9px] uppercase tracking-widest text-text-muted opacity-50">
                <span className="block mb-1">REV. 01A</span>
                <span className="block">REF: TXT-{title.substring(0, 3).toUpperCase()}</span>
              </div>
            )}
          </div>
          
          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
             <div ref={ruleRef} className="w-full h-px bg-border/60 origin-left mb-8 hidden md:block" />
             
             <div ref={textRef} className={clsx(
               "prose-content max-w-prose",
               variant === 'lead' 
                 ? "text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-foreground font-medium tracking-tight" 
                 : variant === 'technical'
                 ? "text-sm md:text-base leading-[1.8] text-text-secondary font-mono bg-background/50 p-6 rounded-sm border border-border/30"
                 : "text-base md:text-lg lg:text-xl leading-[1.8] text-text-secondary"
             )}>
                <p className="whitespace-pre-wrap">{content}</p>
             </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
