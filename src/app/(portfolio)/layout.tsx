import { Navigation } from "@/components/features/navigation/Navigation";
import { Footer } from "@/components/features/navigation/Footer";
import { SkipToContent } from "@/components/features/navigation/SkipToContent";
import { CommandPalette } from "@/components/features/command-palette/CommandPalette";
import { PageTransition } from "@/components/ui/PageTransition";
import { client, SANITY_TAGS } from '@/sanity/client';
import { siteSettingsQuery } from '@/sanity/queries';

export default async function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { tags: [SANITY_TAGS.settings] } });

  return (
    <>
      <SkipToContent />
      <Navigation settings={settings} />
      <CommandPalette />
      
      {/* Accessibility Landmark */}
      <main id="main-content" className="flex-1 mt-16" tabIndex={-1}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      <Footer settings={settings} />
    </>
  );
}
