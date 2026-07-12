import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

// Global metadata architecture
export const metadata: Metadata = {
  metadataBase: new URL('https://vivaan.dev'), // Update to actual domain in production
  title: {
    template: '%s | Vivaan | Engineering Portfolio',
    default: 'Vivaan | Premium Engineering Portfolio',
  },
  description: 'Mechanical Engineering & Applied Physics Portfolio. Showcasing precision hardware, rapid prototyping, and advanced computational mechanics.',
  keywords: ['Mechanical Engineering', 'Applied Physics', 'Portfolio', 'Hardware', 'Prototyping', 'CAD', 'Simulation', 'Vivaan'],
  authors: [{ name: 'Vivaan' }],
  creator: 'Vivaan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vivaan.dev',
    title: 'Vivaan | Premium Engineering Portfolio',
    description: 'Mechanical Engineering & Applied Physics Portfolio. Showcasing precision hardware and advanced computational mechanics.',
    siteName: 'Vivaan Portfolio',
    images: [{
      url: '/og-image.jpg', // Fallback, will be overridden dynamically
      width: 1200,
      height: 630,
      alt: 'Vivaan Engineering Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivaan | Premium Engineering Portfolio',
    description: 'Mechanical Engineering & Applied Physics Portfolio.',
    creator: '@vivaan',
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
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Vivaan',
              url: 'https://vivaan.dev',
              jobTitle: 'Mechanical Engineer',
              description: 'Mechanical Engineering & Applied Physics Portfolio',
              sameAs: [
                'https://github.com/vivaan',
                'https://linkedin.com/in/vivaan'
              ]
            })
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
