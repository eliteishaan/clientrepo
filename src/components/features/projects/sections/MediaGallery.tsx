'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Text } from '@/components/ui/Text';
import { Link } from '@/components/ui/Link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clsx } from 'clsx';

export function MediaGallery({ media, layout = 'grid', title }: { media?: any[], layout?: 'grid' | 'stacked' | 'offset' | 'fullscreen' | 'split', title?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Parallax on images
    const images = gsap.utils.toArray<HTMLElement>('.gallery-image-wrap');
    images.forEach((wrap) => {
      const img = wrap.querySelector('img');
      if (!img) return;
      
      gsap.fromTo(img, 
        { yPercent: -15, scale: 1.1 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  if (!media || media.length === 0) return null;

  return (
    <Section spacing="none" aria-label={title || 'Media Gallery'} className="w-full">
      <Container variant={layout === 'fullscreen' ? 'full' : layout === 'stacked' || layout === 'split' ? 'wide' : 'standard'}>
        <div ref={containerRef} className={clsx(layout !== 'fullscreen' && 'py-8 md:py-12')}>
          
          {title && (
            <div className="flex items-center gap-6 mb-10 max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-text-secondary shrink-0">
                {title}
              </h2>
              <div className="flex-1 h-px bg-border origin-left" />
            </div>
          )}
          
          <div className={clsx(
            layout === 'grid' && "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8",
            layout === 'split' && "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8",
            layout === 'stacked' && "flex flex-col gap-12 md:gap-24",
            layout === 'offset' && "grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center",
            layout === 'fullscreen' && "w-full"
          )}>
            {media.map((item: any, idx: number) => {
              const isOffsetRight = layout === 'offset' && idx % 2 !== 0;
              
              return (
                <figure 
                  key={idx} 
                  className={clsx(
                    "overflow-hidden relative bg-surface group",
                    layout === 'offset' && isOffsetRight ? "md:col-start-4 md:col-end-13" : layout === 'offset' ? "md:col-start-1 md:col-end-10" : "",
                    (layout === 'grid' || layout === 'offset' || layout === 'split') && "rounded-sm border border-border/50",
                    layout === 'fullscreen' && "w-full h-[70svh] md:h-[90svh] min-h-[500px]"
                  )}
                >
                  {item.type === 'Image' && item.imageUrl && (
                    <div className={clsx(
                      "gallery-image-wrap relative overflow-hidden w-full", 
                      layout === 'stacked' ? 'aspect-[16/9] rounded-sm' : 
                      layout === 'fullscreen' ? 'w-full h-full' : 
                      layout === 'split' ? 'aspect-[4/5]' :
                      'aspect-[4/3]'
                    )}>
                      <Image 
                        src={item.imageUrl} 
                        alt={item.alt || ''} 
                        fill
                        sizes={
                          layout === 'fullscreen' ? "100vw" : 
                          layout === 'stacked' ? "100vw" : 
                          layout === 'offset' ? "75vw" :
                          "(max-width: 768px) 100vw, 50vw"
                        }
                        className="object-cover origin-center will-change-transform" 
                      />
                    </div>
                  )}
                  
                  {/* File Placeholders */}
                  {(item.type === 'PDF' || item.type === 'CAD' || item.type === 'GLB' || item.type === 'Video') && (
                    <div className={clsx(
                      "flex flex-col items-center justify-center bg-surface-inset relative overflow-hidden",
                      layout === 'fullscreen' ? 'w-full h-full' : 'aspect-video'
                    )}>
                      {/* Blueprint Grid Background */}
                      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
                      
                      <div className="z-10 text-center p-8">
                        <span className="font-mono text-sm text-accent tracking-widest uppercase mb-4 block">
                          [{item.type} File Embedded]
                        </span>
                        <Text variant="caption" color="secondary" className="mb-8 block max-w-sm mx-auto">
                          Interactive 3D model, technical drawing, or video available via the Engineering Viewer.
                        </Text>
                        <Link href={item.url || '#'} isExternal className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors">
                          Download Original
                        </Link>
                      </div>
                    </div>
                  )}
                  
                  {/* Caption Overlay for Fullscreen, Standard below for others */}
                  {item.caption && (
                    <figcaption className={clsx(
                      "font-mono text-[10px] tracking-widest uppercase flex justify-between items-start md:items-center",
                      layout === 'fullscreen' 
                        ? "absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent text-white/80" 
                        : "p-4 md:p-5 border-t border-border/50 bg-surface text-text-secondary flex-col md:flex-row gap-2"
                    )}>
                      <span className="leading-relaxed md:leading-none">{item.caption}</span>
                      <span className={clsx(
                        layout === 'fullscreen' ? "text-white/50 hidden md:block" : "text-text-muted shrink-0"
                      )}>
                        FIG. {String(idx + 1).padStart(2, '0')}
                      </span>
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
