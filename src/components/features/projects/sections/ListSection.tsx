'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clsx } from 'clsx';

export function ListSection({ title, items, type = 'bullet', id }: { title: string; items?: any[]; type?: 'bullet' | 'constraint' | 'requirement'; id?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (ruleRef.current) {
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

    const listItems = gsap.utils.toArray<HTMLElement>('.list-item');
    listItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
          delay: Math.min(i * 0.1, 0.5), // Cap delay so large lists don't take forever
        }
      );
    });
  }, { scope: sectionRef });

  if (!items || items.length === 0) return null;

  return (
    <section ref={sectionRef} id={id} className={clsx("w-full py-16 md:py-24", type === 'requirement' ? "bg-surface-inset" : "")} aria-label={title}>
      <Container variant="reading">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          
          {/* Metadata Sidebar */}
          <div className="w-full md:w-1/4 shrink-0 flex flex-col pt-2" ref={metaRef}>
            <div className="flex items-center gap-4 mb-8 md:mb-0">
              <h2 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-secondary">
                {title}
              </h2>
            </div>
            
            <div className="hidden md:block mt-auto font-mono text-[9px] uppercase tracking-widest text-text-muted opacity-50">
              <span className="block mb-1">TOTAL: {String(items.length).padStart(2, '0')}</span>
              {type === 'requirement' && <span className="block text-emerald-500">SYS_REQ_VERIFIED</span>}
              {type === 'constraint' && <span className="block text-accent">BOUNDING_VOL</span>}
            </div>
          </div>
          
          {/* Main List Area */}
          <div className="w-full md:w-3/4">
            <div ref={ruleRef} className="w-full h-px bg-border/60 origin-left mb-8 hidden md:block" />
             
            <ul className={clsx("flex flex-col", type === 'bullet' ? 'gap-4' : '')} role="list">
              {items.map((item: any, idx: number) => {
                const itemNum = String(idx + 1).padStart(2, '0');
                
                if (type === 'bullet') {
                  return (
                    <li key={idx} className="list-item flex items-start gap-6 py-4 px-6 bg-surface rounded-sm border border-border/30">
                      <span className="font-mono text-[10px] text-text-muted mt-1.5 shrink-0 w-6 border-b border-text-muted/30 pb-1">{itemNum}</span>
                      <span className="text-base md:text-lg leading-relaxed text-text-secondary">{item}</span>
                    </li>
                  );
                }
                
                if (type === 'constraint') {
                  return (
                    <li key={idx} className="list-item flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-8 border-b border-border/50 last:border-b-0 relative group">
                      <div className="absolute left-0 top-0 w-1 h-0 bg-accent group-hover:h-full transition-all duration-300 opacity-50" />
                      
                      <div className="w-full sm:w-1/3 shrink-0 pl-4 sm:pl-6">
                        <span className="font-mono text-[10px] text-accent block mb-2">{itemNum} {'//'} LIMIT</span>
                        <strong className="text-foreground font-semibold text-lg">{item.title}</strong>
                      </div>
                      
                      <div className="w-full sm:w-2/3">
                        <span className="text-base text-text-secondary leading-relaxed block font-mono text-sm">{item.description}</span>
                      </div>
                    </li>
                  );
                }
                
                if (type === 'requirement') {
                  return (
                    <li key={idx} className="list-item bg-background p-6 md:p-8 border border-border/50 rounded-sm mb-4 relative overflow-hidden group">
                      {/* Technical background pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="font-mono text-[10px] text-text-muted border border-border/50 px-2 py-0.5 rounded-sm bg-surface">REQ-{itemNum}</span>
                            <strong className="text-foreground font-bold text-lg md:text-xl">{item.title}</strong>
                            
                            {item.isMet && (
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm ml-auto md:ml-3">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <span className="text-base text-text-secondary leading-relaxed block">{item.description}</span>
                        </div>
                      </div>
                    </li>
                  );
                }
                
                return null;
              })}
            </ul>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
