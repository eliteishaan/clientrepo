'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function CredentialsSection({ education, awards }: { education: any[], awards: any[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Accurate master content placeholders
  const displayEducation = (!education || education.length === 0) ? [
    { _id: '1', degree: 'B.S.', major: 'Mechanical Engineering', institution: 'Purdue University', startDate: '2024-09-01', endDate: '2028-05-01' },
    { _id: '2', degree: 'B.S.', major: 'Applied Physics', institution: 'Purdue University', startDate: '2024-09-01', endDate: '2028-05-01' },
    { _id: '3', degree: 'International Baccalaureate', major: 'Math AA HL & Scientific Research', institution: "St. Andrew's International School", startDate: '2022-09-01', endDate: '2024-05-01' },
  ] : education;

  const displayAwards = (!awards || awards.length === 0) ? [
    { _id: 'a1', title: 'Valedictorian', issuer: "St. Andrew's International School", date: '2024-05-01' },
    { _id: 'a2', title: 'Council of International Schools Award', issuer: 'Council of International Schools', date: '2024-05-01' },
    { _id: 'a3', title: 'BAISS Student Leaders Award', issuer: 'Bahamas Association of Independent Secondary Schools', date: '2024-05-01' },
  ] : awards;

  useGSAP(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.fromTo('.cred-heading', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
        )
        .fromTo('.cred-col-1', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 
          '-=0.6'
        )
        .fromTo('.cred-col-2', 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 
          '-=0.8'
        )
        .fromTo('.cred-footer', 
          { opacity: 0 }, 
          { opacity: 1, duration: 1.0 }, 
          '-=0.5'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-surface-canvas text-text-primary py-32 relative z-10 border-b border-border-medium" aria-label="Credentials">
      <Container variant="editorial" className="relative z-10">
        
        {/* Editorial Heading Block */}
        <div className="flex flex-col text-left max-w-[65ch] mb-16 md:mb-24 cred-heading">
          {/* Metadata */}
          <span className="font-mono text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] text-text-secondary leading-none">
            Credentials
          </span>
          
          <div className="h-[24px]" />
          
          {/* Editorial Heading */}
          <h2 className="font-serif text-heading-l md:text-display-l font-medium tracking-tight leading-[1.1] text-text-primary text-balance">
            Education & Recognition
          </h2>
          
          <div className="h-[16px]" />
          
          {/* Paragraph */}
          <p className="font-sans text-body-l text-text-secondary max-w-2xl text-balance leading-relaxed">
            Academic background, awards, and professional development.
          </p>
          
          <div className="h-[40px]" />
          
          {/* Structural Divider */}
          <div className="w-full max-w-[240px] h-[1px] bg-border-medium opacity-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Education Column */}
          <div className="flex flex-col cred-col-1">
            <h3 className="font-mono text-mono-label tracking-widest uppercase border-b border-border-primary pb-4 mb-8 text-text-secondary">
              Academic Foundation
            </h3>
            <div className="flex flex-col gap-10">
              {Object.values(displayEducation.reduce((acc: any, edu: any) => {
                const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : '';
                const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : 'Expected ' + (edu.startDate ? new Date(edu.startDate).getFullYear() + 4 : '2026');
                const key = `${edu.institution}-${startYear}-${endYear}`;
                if (!acc[key]) {
                  acc[key] = { ...edu, degrees: [{ degree: edu.degree, major: edu.major }], endYearFormatted: endYear, startYearFormatted: startYear };
                } else {
                  acc[key].degrees.push({ degree: edu.degree, major: edu.major });
                }
                return acc;
              }, {})).map((edu: any, index: number) => (
                <div key={index} className="flex flex-col gap-1 pb-8 border-b border-border-secondary/50 last:border-0 last:pb-0">
                  <span className="font-mono text-mono-label font-medium uppercase tracking-widest text-text-metadata mb-2">
                    {edu.startYearFormatted && `${edu.startYearFormatted} — `}{edu.endYearFormatted}
                  </span>
                  <h4 className="text-heading-l font-serif tracking-tight text-text-primary mb-1">
                    {edu.institution}
                  </h4>
                  {edu.degrees.map((deg: any, i: number) => (
                    <p key={i} className="text-body-m font-sans text-text-secondary">
                      {deg.degree} in {deg.major}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Awards Column */}
          <div className="flex flex-col cred-col-2">
            <h3 className="font-mono text-mono-label tracking-widest uppercase border-b border-border-primary pb-4 mb-8 text-text-secondary">
              Honors & Recognition
            </h3>
            <div className="flex flex-col gap-10">
              {displayAwards.map((award: any) => (
                <div key={award._id} className="flex flex-col gap-1 pb-8 border-b border-border-secondary/50 last:border-0 last:pb-0">
                  <span className="font-mono text-mono-label font-medium uppercase tracking-widest text-text-metadata mb-2">
                    {award.date ? new Date(award.date).getFullYear() : 'N/A'}
                  </span>
                  <h4 className="text-heading-m font-serif font-medium tracking-tight text-text-primary mb-1">
                    {award.title}
                  </h4>
                  <p className="text-body-m font-sans text-text-secondary">
                    {award.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Small Footer Component */}
        <div className="mt-24 pt-8 border-t border-border-primary text-center md:text-left cred-footer">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-metadata">
            Complete academic transcript available upon request.
          </span>
        </div>

      </Container>
    </section>
  );
}
