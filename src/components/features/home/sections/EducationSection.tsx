import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';

export function EducationSection({ education }: { education: any[] }) {
  if (!education || education.length === 0) return null;

  return (
    <Section spacing="lg" aria-label="Education">
      <Container>
        <Stack gap="lg">
          <h3 className="text-2xl font-bold">Education</h3>
          <Stack gap="md">
            {education.map((edu: any) => (
              <div key={edu._id} className="border p-4">
                <h4 className="font-bold">{edu.degree} in {edu.major}</h4>
                <p>{edu.institution}</p>
                <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
              </div>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
