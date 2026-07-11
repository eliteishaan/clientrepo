'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center text-center p-24">
          <h2 className="font-mono text-2xl font-bold mb-4">CRITICAL SYSTEM FAILURE</h2>
          <p className="font-mono text-sm opacity-50 mb-8">{error.message}</p>
          <button onClick={() => reset()} className="border px-4 py-2 font-mono hover:bg-black hover:text-white transition-colors">
            [ Reboot ]
          </button>
        </div>
      </body>
    </html>
  );
}
