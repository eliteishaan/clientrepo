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
    { label: 'Work', href: '/' },
    { label: 'About', href: '/#overview' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <footer className="w-full bg-background text-foreground mt-auto relative z-20 border-t border-border/20 pt-16 pb-8 overflow-hidden">
      <Container variant="wide">
        
        {/* Massive Logo Mark */}
        <div className="flex justify-center md:justify-start w-full mb-16 md:mb-24">
          <h2 className="text-[clamp(4rem,18vw,20rem)] font-bold tracking-tighter uppercase leading-[0.75] select-none text-foreground/5">
            {settings?.title || 'VIVAAN'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end">
          
          {/* Identity & Legal */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="font-bold uppercase tracking-widest text-lg">
                {settings?.title || 'Vivaan Engineering'}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                Precision Systems & Design
              </span>
            </div>
            
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Engineering solutions that bridge the gap between digital intent and physical reality.
            </p>
            
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary mt-4">
              © {mounted ? new Date().getFullYear() : '2024'} All Rights Reserved.
            </span>
          </div>

          {/* Navigation Matrix */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col sm:flex-row justify-start md:justify-end gap-16 md:gap-24">
            
            {/* Sitemap */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary/50 block">
                Index
              </span>
              <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
                {navLinks.map((nav: any) => (
                  <Link 
                    key={nav.label} 
                    href={nav.href} 
                    className="text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-300"
                  >
                    {nav.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary/50 block">
                Network
              </span>
              <nav aria-label="Social Links" className="flex flex-col gap-3">
                {settings?.linkedin && (
                  <Link href={settings.linkedin} isExternal className="text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-300">
                    LinkedIn
                  </Link>
                )}
                {settings?.github && (
                  <Link href={settings.github} isExternal className="text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-300">
                    GitHub
                  </Link>
                )}
                {settings?.email && (
                  <Link href={`mailto:${settings.email}`} className="text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-300">
                    Email
                  </Link>
                )}
              </nav>
            </div>

          </div>
        </div>
        
      </Container>
    </footer>
  );
}
