'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
    
    // Intro sequence
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && !(window as any).__navIntroPlayed) {
      gsap.set(headerRef.current, { opacity: 0, y: -20 });
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        delay: 1.6, // Wait for the spaced-out hero sequence
        ease: 'power4.out',
        onComplete: () => {
          (window as any).__navIntroPlayed = true;
        }
      });
    }

    // Scroll hide/show sequence
    gsap.to(headerRef.current, {
      y: isHidden ? '-100%' : '0%',
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
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

  const navItems = (settings?.navigation && settings.navigation.length > 0) ? settings.navigation : [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <>
      <header 
        ref={headerRef}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 flex justify-center border-b group/nav opacity-80 hover:opacity-100",
          isScrolled 
            ? "bg-canvas/85 backdrop-blur-md border-white/5" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="w-full max-w-[1440px] px-6 md:px-[56px] h-16 md:h-[88px] flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex flex-col font-mono tracking-widest text-text-primary hover:text-accent transition-colors focus-ring outline-none select-none flex-shrink-0"
            aria-label="Home"
          >
            <span className="text-[12px] font-mono font-medium uppercase leading-none tracking-widest text-text-primary">VIVAN NAGRATH</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-text-secondary leading-none mt-1 group-hover:text-accent-foreground transition-colors duration-300">PORTFOLIO</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[40px]" aria-label="Main Navigation">
            <ul className="flex items-center gap-[40px] m-0 p-0 list-none">
              {navItems.map((nav: any) => {
                const isActive = pathname === nav.href || pathname?.startsWith(`${nav.href}/`);
                return (
                  <li key={nav.label}>
                    <Link 
                      href={nav.href} 
                      className={clsx(
                        "group relative py-2 font-mono text-[0.85rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 focus-ring outline-none rounded-sm",
                        isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {nav.label}
                      <span 
                        className={clsx(
                          "absolute -bottom-1 left-0 right-0 h-[0.5px] origin-center transition-transform duration-500 ease-out",
                          isActive ? "scale-x-100 opacity-100 bg-accent" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 bg-text-primary"
                        )} 
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            {settings?.resumeReference?.url && (
              <Link 
                href={settings.resumeReference.url} 
                isExternal 
                variant="button"
                className="ml-4"
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
            <span className={clsx("w-6 h-px bg-text-primary transition-transform duration-300 origin-center", mobileMenuOpen && "translate-y-[7px] rotate-45")} />
            <span className={clsx("w-6 h-px bg-text-primary transition-opacity duration-300", mobileMenuOpen && "opacity-0")} />
            <span className={clsx("w-6 h-px bg-text-primary transition-transform duration-300 origin-center", mobileMenuOpen && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-none md:hidden"
        style={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)', pointerEvents: mobileMenuOpen ? 'auto' : 'none' }}
        inert={!mobileMenuOpen ? true : undefined}
        aria-hidden={!mobileMenuOpen}
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
              variant="button"
              className="mt-8 w-full max-w-[240px]"
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

