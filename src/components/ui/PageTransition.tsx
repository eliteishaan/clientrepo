'use client';

export function PageTransition({ children }: { children: React.ReactNode }) {
  // Shell for future routing animations (e.g., GSAP transition)
  return <div className="page-transition-wrapper">{children}</div>;
}
