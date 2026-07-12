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

  const navItems = (settings?.navigation && settings.navigation.length > 0) ? settings.navigation : [
    { label: 'Work', href: '/' },
    { label: 'About', href: '/#overview' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <>
      <header 
        ref={headerRef}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 flex justify-center px-6 md:px-12 pt-6",
          isScrolled ? "pointer-events-none" : ""
        )}
      >
        <div className={clsx(
          "w-full max-w-7xl rounded-full transition-all duration-500 flex items-center justify-between px-8 md:px-12 h-16 md:h-20 border",
          isScrolled 
            ? "bg-background/80 backdrop-blur-xl border-white/10 pointer-events-auto" 
            : "bg-transparent border-transparent"
        )}>
          {/* Logo */}
          <Link 
            href="/" 
            className="font-sans text-xl md:text-2xl font-bold tracking-tighter text-text-primary hover:text-accent transition-colors focus-ring outline-none select-none flex-shrink-0"
            aria-label="Home"
          >
            VN
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main Navigation">
            <ul className="flex items-center gap-10 m-0 p-0 list-none">
              {navItems.map((nav: any) => {
                const isActive = pathname === nav.href || pathname?.startsWith(`${nav.href}/`);
                return (
                  <li key={nav.label}>
                    <Link 
                      href={nav.href} 
                      className={clsx(
                        "group relative py-2 font-mono text-[11px] font-medium tracking-[0.1em] uppercase transition-all duration-300 focus-ring outline-none rounded-sm",
                        isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary hover:tracking-[0.15em]"
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {nav.label}
                      <span 
                        className={clsx(
                          "absolute -bottom-1 left-0 right-0 h-px bg-text-primary origin-center transition-transform duration-500 ease-out",
                          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 group-hover:bg-accent"
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
                className="group relative px-6 py-2.5 ml-4 font-mono text-[10px] tracking-widest uppercase text-background bg-text-primary overflow-hidden rounded-full focus-ring outline-none"
              >
                <div className="absolute inset-0 bg-accent translate-y-[101%] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 mix-blend-difference text-white">Resume</span>
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
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-none md:hidden"
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

