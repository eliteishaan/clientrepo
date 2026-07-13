'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function EngineerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.engineer-anim',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-canvas text-text-primary py-24 md:py-32 relative z-10" aria-label="Engineer Profile">
      <Container variant="editorial">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          
          <div className="engineer-anim w-48 h-64 md:w-64 md:h-80 relative bg-surface-secondary border border-border-subtle mb-10 overflow-hidden">
            <Image 
              src="/images/placeholders/vivan_portrait_1783865996256.png" 
              alt="Vivan Nagrath" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out" 
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>

          <h2 className="engineer-anim text-heading-l font-medium tracking-tight uppercase mb-4 text-text-primary">
            Vivan Nagrath
          </h2>

          <div className="engineer-anim font-mono text-mono-label uppercase tracking-widest text-text-secondary mb-6 flex flex-col gap-1">
            <span>Mechanical Engineering</span>
            <span>Applied Physics</span>
            <span className="mt-2 text-text-secondary/60">Purdue University</span>
          </div>

          <p className="engineer-anim text-body-l text-text-primary font-medium tracking-tight mt-6 border-t border-border-subtle pt-8">
            Building precise mechanical systems through research, analysis and engineering.
          </p>

        </div>
      </Container>
    </section>
  );
}
