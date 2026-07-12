'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Link } from '@/components/ui/Link';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Navigation({ settings }: { settings: any }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent to Solid transition
      setIsScrolled(currentScrollY > 50);
      
      // Scroll Direction Hide/Show
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    if (!headerRef.current) return;
    
    gsap.to(headerRef.current, {
      y: isHidden ? '-100%' : '0%',
      duration: 0.4,
      ease: 'power3.out'
    });
  }, [isHidden]);

  // Handle Mobile Menu Animation
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!mobileMenuRef.current) return;
    
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(150% at calc(100% - 2rem) 2rem)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(mobileMenuRef.current, {
        clipPath: 'circle(0% at calc(100% - 2rem) 2rem)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const navItems = settings?.navigation || [];

  return (
    <>
      <header 
        ref={headerRef}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
          isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent border-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="font-mono text-xs tracking-widest uppercase font-bold text-text-primary hover:text-accent transition-colors focus-ring outline-none rounded-sm"
              aria-label="Home"
            >
              {settings?.title || 'Portfolio'}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              <ul className="flex items-center gap-8 m-0 p-0 list-none">
                {navItems.map((nav: any) => {
                  const isActive = pathname === nav.href || pathname?.startsWith(`${nav.href}/`);
                  return (
                    <li key={nav.label}>
                      <Link 
                        href={nav.href} 
                        className={clsx(
                          "relative py-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors focus-ring outline-none rounded-sm",
                          isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {nav.label}
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent animate-[scaleX_0.3s_ease-out_forwards] origin-left" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {settings?.resumeReference?.url && (
                <Link 
                  href={settings.resumeReference.url} 
                  isExternal 
                  className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-background bg-text-primary hover:bg-accent transition-colors rounded-sm focus-ring outline-none"
                >
                  Resume
                </Link>
              )}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 z-[60] focus-ring outline-none rounded-sm"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation"
            >
              <span className={clsx("w-6 h-px bg-text-primary transition-transform duration-300", mobileMenuOpen && "translate-y-[7px] rotate-45")} />
              <span className={clsx("w-6 h-px bg-text-primary transition-opacity duration-300", mobileMenuOpen && "opacity-0")} />
              <span className={clsx("w-6 h-px bg-text-primary transition-transform duration-300", mobileMenuOpen && "-translate-y-[7px] -rotate-45")} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Nav Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-none md:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)', pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-6">
          {navItems.map((nav: any) => {
            const isActive = pathname === nav.href || pathname?.startsWith(`${nav.href}/`);
            return (
              <Link 
                key={nav.label}
                href={nav.href} 
                className={clsx(
                  "font-mono text-xl tracking-widest uppercase transition-colors focus-ring outline-none rounded-sm",
                  isActive ? "text-accent" : "text-text-secondary hover:text-text-primary"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {nav.label}
              </Link>
            );
          })}
          
          {settings?.resumeReference?.url && (
            <Link 
              href={settings.resumeReference.url} 
              isExternal 
              className="mt-8 px-6 py-3 font-mono text-xs tracking-widest uppercase text-background bg-text-primary hover:bg-accent transition-colors rounded-sm focus-ring outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              Download Resume
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}

