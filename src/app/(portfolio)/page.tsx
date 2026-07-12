import { client, SANITY_TAGS } from '@/sanity/client';
import { 
  siteSettingsQuery,
  authorQuery, 
  featuredProjectsQuery, 
  experienceQuery, 
  educationQuery, 
  awardsQuery, 
  publicationsQuery 
} from '@/sanity/queries';

import { HeroSection } from '@/components/features/home/sections/HeroSection';
import { PhilosophySection } from '@/components/features/home/sections/PhilosophySection';
import { FeaturedProjectsSection } from '@/components/features/home/sections/FeaturedProjectsSection';
import { SkillsSection } from '@/components/features/home/sections/SkillsSection';
import { ExperienceSection } from '@/components/features/home/sections/ExperienceSection';
import { EducationSection } from '@/components/features/home/sections/EducationSection';
import { AwardsSection } from '@/components/features/home/sections/AwardsSection';
import { PublicationsSection } from '@/components/features/home/sections/PublicationsSection';
import { ContactSection } from '@/components/features/home/sections/ContactSection';

export const metadata = {
  title: 'Vivaan — Precision Engineering & Industrial Design',
  description: 'Portfolio of Vivaan — mechatronics engineer and industrial designer crafting precision systems and compelling products.',
};

export default async function HomePage() {
  const fetchOptions = { next: { tags: [SANITY_TAGS.page, SANITY_TAGS.project, SANITY_TAGS.settings] } };

  const [
    settings,
    author,
    featuredProjects,
    experience,
    education,
    awards,
    publications
  ] = await Promise.all([
    client.fetch(siteSettingsQuery, {}, fetchOptions),
    client.fetch(authorQuery, {}, fetchOptions),
    client.fetch(featuredProjectsQuery, {}, fetchOptions),
    client.fetch(experienceQuery, {}, fetchOptions),
    client.fetch(educationQuery, {}, fetchOptions),
    client.fetch(awardsQuery, {}, fetchOptions),
    client.fetch(publicationsQuery, {}, fetchOptions),
  ]);

  return (
    <main id="main-content" className="flex flex-col w-full bg-background">
      {/* Skip to content for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-mono focus:text-sm focus:uppercase focus:tracking-widest focus:rounded"
      >
        Skip to content
      </a>

      {/* 01 — Hero: Cinematic opening / WebGL presence */}
      <HeroSection 
        title={author?.name} 
        subtitle={author?.role} 
      />

      {/* 02 — Philosophy: Manifesto / Brand voice */}
      <PhilosophySection bio={author?.bio} />

      {/* 03 — Selected Works: Editorial stacked projects */}
      <FeaturedProjectsSection projects={featuredProjects} />

      {/* 04 — Capabilities: Typographic marquee skills */}
      <SkillsSection skills={author?.skills} />

      {/* 05 — Experience: Blueprint engineering timeline */}
      <ExperienceSection experience={experience} />

      {/* 06 — Education: Architectural grow-line layout */}
      <EducationSection education={education} />

      {/* 07 — Recognition: Count-up awards list */}
      <AwardsSection awards={awards} />

      {/* 08 — Publications: Print-editorial research list */}
      <PublicationsSection publications={publications} />

      {/* 09 — Contact & Footer: Full-chapter closing CTA */}
      <ContactSection settings={settings} />
    </main>
  );
}
