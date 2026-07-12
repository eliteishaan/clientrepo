'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { clsx } from 'clsx';
import { Container } from '@/components/ui/Container';

interface Chapter {
  id: string;
  label: string;
}

export function ProjectNavigation({ chapters }: { chapters: Chapter[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    // Calculate overall reading progress
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      setProgress((winScroll / height) * 100);
    }

    // Show nav after scrolling past hero (roughly 100vh)
    setIsVisible(winScroll > window.innerHeight * 0.8);

    // Determine active chapter
    let currentActive = '';
    for (const chapter of chapters) {
      const el = document.getElementById(chapter.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          currentActive = chapter.id;
        }
      }
    }
    if (currentActive) {
      setActiveId(currentActive);
    }
  }, [chapters]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useGSAP(() => {
    // No-op — visibility is controlled via CSS transform based on isVisible state
  }, { scope: navRef });

  const scrollToChapter = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0;
      const targetY = element.getBoundingClientRect().top + window.scrollY - navHeight - 32;
      
      // Smooth scroll using GSAP animation on a proxy
      const proxy = { y: window.scrollY };
      gsap.to(proxy, {
        y: targetY,
        duration: 1,
        ease: 'power3.inOut',
        onUpdate: () => window.scrollTo(0, proxy.y),
      });
      
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (!chapters || chapters.length === 0) return null;

  return (
    <div 
      ref={navRef} 
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl border-b border-border/40" />
      
      {/* Progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-accent transform-gpu origin-left transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
      
      <Container variant="wide">
        <nav className="relative flex items-center h-12 md:h-14 overflow-x-auto hide-scrollbar" aria-label="Case study chapters">
          <ol className="flex items-center gap-1 md:gap-2 min-w-max">
            {chapters.map((chapter, idx) => (
              <li key={chapter.id} className="flex items-center">
                {idx > 0 && <span className="text-text-muted/30 mx-2 hidden md:inline" aria-hidden="true">·</span>}
                <a
                  href={`#${chapter.id}`}
                  onClick={(e) => scrollToChapter(e, chapter.id)}
                  className={clsx(
                    "text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] md:tracking-widest transition-all duration-300 px-3 py-2 rounded-sm whitespace-nowrap relative",
                    activeId === chapter.id 
                      ? "text-foreground bg-surface" 
                      : "text-text-secondary hover:text-foreground"
                  )}
                  aria-current={activeId === chapter.id ? 'true' : undefined}
                >
                  <span className="text-text-muted/50 mr-1.5 hidden md:inline">{String(idx + 1).padStart(2, '0')}</span>
                  {chapter.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
