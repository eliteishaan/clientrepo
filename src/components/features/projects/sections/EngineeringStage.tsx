'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { PortableText } from '@portabletext/react';
import { MediaGallery } from './MediaGallery';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function EngineeringStage({ label, stage }: { label: string; stage: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !ruleRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

    const proseEl = sectionRef.current.querySelector('.prose-content');
    if (proseEl) {
      gsap.fromTo(proseEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: proseEl,
            start: 'top 80%',
            once: true,
          }
        }
      );
    }
  }, { scope: sectionRef });

  if (!stage || (!stage.content && (!stage.media || stage.media.length === 0))) return null;

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-32 border-t border-border/20" aria-label={stage.title || label}>
      <Container variant="wide">
        {/* Split layout for text to match TextSection/ListSection */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 max-w-7xl mx-auto">
          
          <div className="w-full md:w-1/4 shrink-0 flex flex-col pt-2" ref={metaRef}>
            <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-secondary">
              {stage.title || label}
            </h2>
            
            <div className="hidden md:block mt-auto font-mono text-[9px] uppercase tracking-widest text-accent opacity-80">
              <span className="block mb-1">PHASE // {label.substring(0, 3).toUpperCase()}</span>
              {stage.media?.length > 0 && <span className="block text-text-muted">ATTACHMENTS: {String(stage.media.length).padStart(2, '0')}</span>}
            </div>
          </div>
          
          <div className="w-full md:w-3/4">
            <div ref={ruleRef} className="w-full h-px bg-border/60 origin-left mb-8 md:mb-12 hidden md:block" />
            
            {stage.content && (
              <div className="prose-content max-w-prose">
                <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-text-secondary prose-p:leading-[1.7] prose-strong:text-foreground prose-a:text-accent prose-a:underline-offset-4">
                  <PortableText value={stage.content} />
                </div>
              </div>
            )}
          </div>
          
        </div>
      </Container>

      {/* Media Gallery below text, expanding wider than the text container for visual impact */}
      {stage.media && stage.media.length > 0 && (
        <div className="mt-16 md:mt-24">
          <MediaGallery 
            media={stage.media} 
            layout={stage.media.length === 1 ? 'fullscreen' : stage.media.length === 2 ? 'split' : 'offset'} 
          />
        </div>
      )}
    </section>
  );
}
