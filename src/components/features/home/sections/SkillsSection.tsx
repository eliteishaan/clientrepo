import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';

export function SkillsSection({ skills }: { skills: any[] }) {
  if (!skills || skills.length === 0) return null;

  // Group skills by category title
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    const category = skill.category?.title || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <Section spacing="lg" aria-label="Technical Skills">
      <Container>
        <Stack gap="lg">
          <h3 className="text-2xl font-bold">Technical Skills</h3>
          <Stack gap="lg">
            {Object.entries(groupedSkills).map(([category, items]: [string, any]) => (
              <Stack gap="md" key={category}>
                <h4 className="text-lg font-semibold border-b pb-2">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill: any, idx: number) => (
                    <div key={idx} className="flex flex-col border px-3 py-2 rounded-md">
                      <span className="font-medium text-sm">{skill.technology?.name}</span>
                      {skill.proficiency && <span className="text-xs text-muted-foreground">{skill.proficiency}</span>}
                    </div>
                  ))}
                </div>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}