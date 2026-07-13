'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from '@/components/ui/Link';

export function ContactSection({ settings }: { settings: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && textRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo('.contact-reveal',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, { scope: sectionRef });

  const email = settings?.email || 'vivan.nagrath@gmail.com';
  const linkedin = settings?.linkedin || 'https://www.linkedin.com/in/vivan-nagrath/';
  const isAccepting = settings?.acceptingCommissions !== false; // defaults to true

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="w-full min-h-[80svh] relative z-10 overflow-hidden md:grid md:grid-cols-2 flex flex-col bg-surface-graphite text-text-primary-dark" 
      aria-label="Contact"
    >
      {/* ─── LEFT: Typography ─── */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-[var(--spacing-section-sm)] lg:pl-[max(var(--spacing-section-sm),calc((100vw-var(--width-container-hero))/2))] py-32 md:py-0 border-b md:border-b-0 md:border-r border-border-secondary/30">
        <div className="w-full max-w-[var(--width-container-editorial)] flex flex-col justify-between h-full py-12 md:py-24">

          {/* Status Label */}
          <div className="flex flex-col justify-start border-b border-border-secondary/50 pb-8 mb-16 md:mb-0 contact-reveal">
            <span className="font-mono text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] text-text-secondary-dark leading-none">
              Status: {isAccepting ? 'Accepting Projects' : 'Currently Unavailable'}
            </span>
          </div>
          
          {/* Editorial CTA */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] text-text-secondary-dark leading-none mb-8 contact-reveal">
              Contact
            </span>
            <h2 ref={textRef} className="font-serif text-heading-xl md:text-display-l font-medium tracking-tight leading-[1.05] text-text-primary-dark text-balance contact-reveal">
              Let's Build Something Better.
            </h2>
          </div>
        </div>
      </div>

      {/* ─── RIGHT: Action Grid ─── */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center px-6 md:px-[var(--spacing-section-sm)] lg:pr-[max(var(--spacing-section-sm),calc((100vw-var(--width-container-hero))/2))] py-24 md:py-0">
        <div className="relative z-10 w-full max-w-[var(--width-container-editorial)] flex flex-col h-full justify-between py-12 md:py-24">
          
          <div className="hidden md:block mb-16 md:mb-0" /> {/* Spacer to align with left column */}

          <div className="flex flex-col gap-12 md:gap-24 items-start md:items-end text-left md:text-right border-t border-border-secondary/50 pt-12 w-full">
            
            <p className="text-heading-m md:text-heading-l font-serif tracking-tight leading-tight max-w-lg text-text-primary-dark contact-reveal">
              Available for complex engineering challenges, industrial design consulting, and technical collaboration worldwide.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm contact-reveal">
              <Link 
                href={`mailto:${email}`} 
                variant="button"
                className="w-full h-14 justify-center font-sans tracking-wide"
              >
                Send Email
              </Link>

              <Link 
                href={linkedin} 
                isExternal 
                variant="button"
                className="w-full h-14 justify-center font-sans tracking-wide bg-transparent border border-border-secondary/50 hover:bg-surface-paper hover:text-surface-graphite transition-colors duration-300"
              >
                LinkedIn Profile
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}