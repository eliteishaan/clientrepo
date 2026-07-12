'use client';

import { useRef, useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from '@/components/ui/Link';

export function ContactSection({ settings }: { settings: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // Local Time logic for the engineering aesthetic
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && textRef.current) {
      // Split text-like reveal without an external library (using chars/words if possible, but here we do block reveal)
      gsap.fromTo('.contact-reveal',
        { yPercent: 100, opacity: 0, rotationX: -10 },
        {
          yPercent: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  }, { scope: sectionRef });

  const email = settings?.email || 'vivaan@example.com';
  const linkedin = settings?.linkedin || '#';

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-foreground text-background pt-32 pb-24 relative z-10 overflow-hidden" 
      aria-label="Contact"
    >
      {/* Background CAD Grid in inverted colors */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Container variant="wide" className="relative z-10">
        
        {/* Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-32 border-b border-background/20 pb-8 gap-4 overflow-hidden">
          <div className="flex items-center gap-4 contact-reveal">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
              Status: Accepting Commissions
            </span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-background/60 contact-reveal">
            SYS.TIME: {time || 'CALCULATING...'}
          </div>
        </div>

        {/* Massive Typographic CTA */}
        <div className="flex flex-col mb-24 md:mb-40 perspective-[1000px]">
          <h2 ref={textRef} className="text-[clamp(3.5rem,10vw,12rem)] font-bold tracking-tighter uppercase leading-[0.85] -ml-1 md:-ml-2">
            <div className="overflow-hidden py-2"><div className="contact-reveal">Let&apos;s Build</div></div>
            <div className="overflow-hidden py-2"><div className="contact-reveal">Something <span className="font-serif italic font-light text-background/40">Better</span></div></div>
          </h2>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end border-t border-background/20 pt-12 overflow-hidden">
          
          <div className="md:col-span-6 lg:col-span-5 contact-reveal">
            <p className="text-xl md:text-2xl font-medium leading-snug text-background/80 max-w-md">
              Available for complex engineering challenges, industrial design consulting, and technical collaboration worldwide.
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-col sm:flex-row gap-6 md:gap-12 justify-end contact-reveal">
            <Link 
              href={`mailto:${email}`} 
              className="group relative inline-flex items-center justify-center h-16 px-10 bg-background text-foreground font-bold uppercase tracking-widest overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
            >
              <div className="relative z-10 flex items-center justify-center w-full h-full transition-transform duration-500 ease-out group-hover:-translate-y-[150%]">
                <span className="text-xs md:text-sm">{email}</span>
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center w-full h-full translate-y-[150%] transition-transform duration-500 ease-out group-hover:translate-y-0 bg-accent text-foreground">
                <span className="text-xs md:text-sm">Transmit Signal</span>
              </div>
            </Link>

            <Link 
              href={linkedin} 
              isExternal 
              className="group inline-flex items-center justify-center h-16 px-10 border border-background/30 rounded-full font-bold uppercase tracking-widest hover:border-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background"
            >
              <span className="text-xs md:text-sm">Connect Network</span>
            </Link>
          </div>
          
        </div>
      </Container>
    </section>
  );
}