'use client';

import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { useEffect, useState } from 'react';

export function Footer({ settings }: { settings: any }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = (settings?.footer && settings.footer.length > 0) ? settings.footer : [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <footer className="w-full bg-surface-paper text-text-primary mt-auto relative z-20 border-t border-border-subtle pt-24 pb-8 overflow-hidden">
      <Container variant="editorial" className="flex flex-col gap-24">
        
        {/* Large Editorial Closing Statement */}
        <div className="w-full max-w-4xl">
          <h2 className="font-serif text-display-m md:text-display-l font-medium tracking-tight leading-[1.05] text-text-primary text-balance">
            Engineering ideas into physical reality.
          </h2>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 border-t border-border-primary pt-12">
          
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <span className="font-serif text-heading-l tracking-tight text-text-primary">
              Vivan Nagrath
            </span>
            <p className="font-sans text-body-m text-text-secondary max-w-xs leading-relaxed">
              Designing systems where precision is non-negotiable.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-text-secondary">
              Index
            </span>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
              {navLinks.map((nav: any) => (
                <Link 
                  key={nav.label} 
                  href={nav.href} 
                  className="font-sans text-body-m text-text-primary transition-all duration-300 group inline-flex relative w-fit"
                >
                  <span className="relative">
                    {nav.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Professional Contact */}
          <div className="md:col-span-4 flex flex-col gap-12">
            
            {/* Contact Details */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-text-secondary">
                Contact
              </span>
              <div className="flex flex-col gap-3 font-sans text-body-m text-text-primary">
                <Link href={`mailto:${settings?.email || 'vivan.nagrath@gmail.com'}`} className="hover:text-accent transition-colors duration-300 w-fit group">
                  <span className="relative">
                    Email
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </span>
                </Link>
                <Link href={settings?.linkedin || 'https://www.linkedin.com/in/vivan-nagrath/'} isExternal className="hover:text-accent transition-colors duration-300 w-fit group">
                  <span className="relative">
                    LinkedIn
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </span>
                </Link>
                <span className="text-text-secondary mt-1 block">West Lafayette, Indiana, USA</span>
              </div>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-text-secondary">
                Currently Seeking
              </span>
              <p className="font-sans text-body-m text-text-primary leading-relaxed max-w-sm">
                Mechanical Engineering, Research, Product Development, Aerospace Opportunities
              </p>
            </div>

          </div>
        </div>
        
        {/* Signature */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-border-secondary gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-metadata">
            Designed & engineered with precision.
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-metadata">
            © {mounted ? new Date().getFullYear() : '2026'} Vivan Nagrath.
          </span>
        </div>
        
      </Container>
    </footer>
  );
}
