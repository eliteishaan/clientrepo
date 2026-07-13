import { client, SANITY_TAGS } from '@/sanity/client';
import { 
  siteSettingsQuery,
  authorQuery, 
  featuredProjectsQuery, 
  experienceQuery, 
  educationQuery, 
  awardsQuery 
} from '@/sanity/queries';

import { HeroSection } from '@/components/features/home/sections/HeroSection';
import { PhilosophySection } from '@/components/features/home/sections/PhilosophySection';
import { FeaturedProjectsSection } from '@/components/features/home/sections/FeaturedProjectsSection';
import { SkillsSection } from '@/components/features/home/sections/SkillsSection';
import { ExperienceSection } from '@/components/features/home/sections/ExperienceSection';
import { CredentialsSection } from '@/components/features/home/sections/CredentialsSection';
import { ContactSection } from '@/components/features/home/sections/ContactSection';

export const metadata = {
  title: 'Vivan — Precision Engineering & Industrial Design',
  description: 'Portfolio of Vivan — mechatronics engineer and industrial designer crafting precision systems and compelling products.',
};

export default async function HomePage() {
  const fetchOptions = { next: { tags: [SANITY_TAGS.page, SANITY_TAGS.project, SANITY_TAGS.settings] } };

  const [
    settings,
    author,
    featuredProjects,
    experience,
    education,
    awards
  ] = await Promise.all([
    client.fetch(siteSettingsQuery, {}, fetchOptions),
    client.fetch(authorQuery, {}, fetchOptions),
    client.fetch(featuredProjectsQuery, {}, fetchOptions),
    client.fetch(experienceQuery, {}, fetchOptions),
    client.fetch(educationQuery, {}, fetchOptions),
    client.fetch(awardsQuery, {}, fetchOptions),
  ]);

  return (
    <div className="flex flex-col w-full bg-background">
      {/* 01 — Hero: Cinematic opening / WebGL presence */}
      <HeroSection />

      {/* 02 — Philosophy: Manifesto / Brand voice */}
      <PhilosophySection bio={author?.bio} />

      {/* 03 — Selected Works: Editorial stacked projects */}
      <FeaturedProjectsSection projects={featuredProjects} />

      {/* 04 — Experience: Blueprint engineering timeline */}
      <ExperienceSection experience={experience} />

      {/* 05 — Capabilities: Engineering Toolkit */}
      <SkillsSection capabilities={author?.capabilities} />

      {/* 06 — Credentials: Grid layout for Education & Awards */}
      <CredentialsSection education={education} awards={awards} />

      {/* 08 — Contact & Footer: Full-chapter closing CTA */}
      <ContactSection settings={settings} />
    </div>
  );
}
