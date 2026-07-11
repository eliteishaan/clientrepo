import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';

export function ProjectHeader({ project }: { project: any }) {
  return (
    <Section spacing="xl" aria-label="Project Header">
      <Container variant="wide">
        <Stack gap="lg">
          <div className="space-y-4">
            <Heading variant="display" level={1}>{project.title}</Heading>
            {project.subtitle && <Text variant="title" color="secondary" className="max-w-reading-max-width">{project.subtitle}</Text>}
          </div>
          
          <Stack direction="row" gap="lg" className="flex-wrap border-y border-border py-component-md mt-section-sm">
            {project.client && (
              <Stack gap="sm">
                <Text variant="label" color="secondary">Client/Class</Text>
                <Text variant="body">{project.client}</Text>
              </Stack>
            )}
            {project.date && (
              <Stack gap="sm">
                <Text variant="label" color="secondary">Date</Text>
                <Text variant="body">{project.date}</Text>
              </Stack>
            )}
            {project.categories?.length > 0 && (
              <Stack gap="sm">
                <Text variant="label" color="secondary">Categories</Text>
                <Text variant="body">{project.categories.map((c: any) => c.title).join(', ')}</Text>
              </Stack>
            )}
            {project.technologies?.length > 0 && (
              <Stack gap="sm">
                <Text variant="label" color="secondary">Technologies</Text>
                <Text variant="body">{project.technologies.map((t: any) => t.name).join(', ')}</Text>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
