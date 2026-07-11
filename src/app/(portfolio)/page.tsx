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
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Divider } from '@/components/ui/Divider';

import { HeroSection } from '@/components/features/home/sections/HeroSection';
import { PhilosophySection } from '@/components/features/home/sections/PhilosophySection';
import { FeaturedProjectsSection } from '@/components/features/home/sections/FeaturedProjectsSection';
import { SkillsSection } from '@/components/features/home/sections/SkillsSection';
import { ExperienceSection } from '@/components/features/home/sections/ExperienceSection';
import { EducationSection } from '@/components/features/home/sections/EducationSection';
import { AwardsSection } from '@/components/features/home/sections/AwardsSection';
import { PublicationsSection } from '@/components/features/home/sections/PublicationsSection';
import { ContactSection } from '@/components/features/home/sections/ContactSection';

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

  if (!author && !featuredProjects?.length) {
    return (
      <Container>
        <Section spacing="xl">
          <p>No homepage data available. Please publish content in Sanity.</p>
        </Section>
      </Container>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSection 
        heroSequence={settings?.homepageHero} 
        title={author?.name} 
        subtitle={author?.role} 
      />
      <Divider />
      <PhilosophySection bio={author?.bio} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <SkillsSection skills={author?.skills} />
      <ExperienceSection experience={experience} />
      <EducationSection education={education} />
      <AwardsSection awards={awards} />
      <PublicationsSection publications={publications} />
      <Divider />
      <ContactSection settings={settings} />
    </div>
  );
}
