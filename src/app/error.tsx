'use client';

import { useEffect } from 'react';
import { Link } from '@/components/ui/Link';
import { Container } from '@/components/ui/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80svh] relative overflow-hidden bg-background">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-mono text-6xl md:text-8xl font-bold tracking-tighter text-error mb-6">
          ERR_500
        </h1>
        
        <div className="h-px w-24 bg-error mb-8 opacity-50" />
        
        <h2 className="font-mono text-lg md:text-xl tracking-[0.2em] uppercase text-text-primary mb-4">
          System Failure
        </h2>
        
        <p className="text-text-secondary max-w-md mb-12 font-sans">
          A critical rendering exception has occurred. Our engineers have been notified. Please initiate a system reboot or return to the origin.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center h-12 px-8 font-mono text-xs tracking-widest uppercase text-text-primary border border-text-primary hover:bg-surface-inset transition-colors rounded-sm focus-ring outline-none"
          >
            Reboot
          </button>
          
          <Link 
            href="/" 
            className="inline-flex items-center justify-center h-12 px-8 font-mono text-xs tracking-widest uppercase text-background bg-text-primary hover:bg-error transition-colors rounded-sm focus-ring outline-none"
          >
            Return to Origin
          </Link>
        </div>
      </Container>
    </div>
  );
}
