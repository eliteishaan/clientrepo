import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';

export function ExperienceSection({ experience }: { experience: any[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <Section spacing="lg" aria-label="Experience">
      <Container>
        <Stack gap="lg">
          <h3 className="text-2xl font-bold">Experience</h3>
          <div className="relative border-l ml-3 md:ml-0 pl-6 space-y-8">
            {experience.map((exp: any) => (
              <div key={exp._id} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <Stack gap="sm">
                  <div>
                    <h4 className="font-bold text-lg">{exp.role}</h4>
                    <p className="font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate} {exp.location ? `| ${exp.location}` : ''}
                    </p>
                  </div>
                  
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.achievements.map((ach: string, idx: number) => (
                        <li key={idx} className="text-sm">{ach}</li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exp.technologies.map((tech: any) => (
                        <span key={tech.name} className="text-xs border px-2 py-1 rounded-md">{tech.name}</span>
                      ))}
                    </div>
                  )}
                </Stack>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
