import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import NextLink from 'next/link';

export function RelatedProjects({ projects }: { projects?: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <Section spacing="xl" aria-label="Related Projects">
      <Container variant="standard">
        <Stack gap="lg">
          <Heading variant="heading" level={2}>Related Case Studies</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-component-md">
            {projects.map((project: any) => (
              <NextLink key={project._id} href={`/projects/${project.slug}`} className="group block border border-border rounded-md overflow-hidden flex flex-col bg-surface hover:bg-surface-elevated hover:shadow-elevation-low transition-all duration-normal ease-snappy focus-ring">
                {project.coverImageUrl && (
                  <div className="aspect-video bg-surface-inset relative border-b border-border">
                    <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover group-hover:opacity-hover transition-opacity duration-fast" />
                  </div>
                )}
                <div className="p-component-md">
                  <Text variant="title" className="font-bold">{project.title}</Text>
                  {project.subtitle && <Text variant="caption" color="secondary" className="mt-1">{project.subtitle}</Text>}
                </div>
              </NextLink>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
