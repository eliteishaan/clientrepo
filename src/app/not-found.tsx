import { Link } from '@/components/ui/Link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80svh] relative overflow-hidden bg-background">
      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-mono text-8xl md:text-9xl font-bold tracking-tighter text-white mb-6 animate-[pulse_3s_ease-in-out_infinite]">
          404
        </h1>
        
        <div className="h-px w-24 bg-accent mb-8" />
        
        <h2 className="font-mono text-lg md:text-xl tracking-[0.2em] uppercase text-text-primary mb-4">
          Vector Not Found
        </h2>
        
        <p className="text-text-secondary max-w-md mb-12 font-sans">
          The requested resource trajectory does not exist in the current spatial mapping. Please recalibrate your navigation.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center h-12 px-8 font-mono text-xs tracking-widest uppercase text-background bg-text-primary hover:bg-accent transition-colors rounded-sm focus-ring outline-none"
        >
          Return to Origin
        </Link>
      </Container>
    </div>
  );
}
