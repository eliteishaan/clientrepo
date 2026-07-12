'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { PortableText } from '@portabletext/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function PhilosophySection({ bio }: { bio: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current) return;
    
    // Gentle opacity and slight Y translation for the entire text block
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        }
      }
    );
  }, { scope: sectionRef });

  if (!bio) return null;

  return (
    <section ref={sectionRef} className="w-full bg-background text-foreground py-[25vh] relative z-10" aria-label="Engineering Philosophy">
      <Container variant="reading">
        <div ref={textRef} className="max-w-4xl mx-auto flex flex-col gap-12 text-center md:text-left">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary">
            Philosophy
          </h2>
          
          <div className="prose prose-p:text-[clamp(1.5rem,4vw,3rem)] prose-p:leading-[1.2] prose-p:font-bold prose-p:tracking-tight prose-p:text-text-primary prose-a:text-accent dark:prose-invert max-w-none">
            <PortableText value={bio} />
          </div>
          
          <div className="w-12 h-px bg-border mx-auto md:mx-0 mt-8" />
        </div>
      </Container>
    </section>
  );
}