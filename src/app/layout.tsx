import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Preloader } from '@/components/ui/Preloader';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

const plexSans = IBM_Plex_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
});

// Dynamic URL resolution for Vercel environments
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return `https://${process.env.NEXT_PUBLIC_SITE_URL}`;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

// Global metadata architecture
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    template: '%s | Vivan | Engineering Portfolio',
    default: 'Vivan | Premium Engineering Portfolio',
  },
  description: 'Mechanical Engineering & Applied Physics Portfolio. Showcasing precision hardware, rapid prototyping, and advanced computational mechanics.',
  keywords: ['Mechanical Engineering', 'Applied Physics', 'Portfolio', 'Hardware', 'Prototyping', 'CAD', 'Simulation', 'Vivan'],
  authors: [{ name: 'Vivan' }],
  creator: 'Vivan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vivan.dev',
    title: 'Vivan | Premium Engineering Portfolio',
    description: 'Mechanical Engineering & Applied Physics Portfolio. Showcasing precision hardware and advanced computational mechanics.',
    siteName: 'Vivan Portfolio',
    images: [{
      url: '/og-image.jpg', // Fallback, will be overridden dynamically
      width: 1200,
      height: 630,
      alt: 'Vivan Engineering Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivan | Premium Engineering Portfolio',
    description: 'Mechanical Engineering & Applied Physics Portfolio.',
    creator: '@vivan',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vivan',
              url: 'https://vivan.dev',
              jobTitle: 'Mechanical Engineer',
              description: 'Mechanical Engineering & Applied Physics Portfolio',
              sameAs: [
                'https://github.com/vivan',
                'https://linkedin.com/in/vivan'
              ]
            })
          }}
        />
        <Preloader />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
