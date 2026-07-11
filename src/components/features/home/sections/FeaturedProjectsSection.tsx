import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Link } from '@/components/ui/Link';

export function FeaturedProjectsSection({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <Section spacing="lg" aria-label="Featured Projects">
      <Container>
        <Stack gap="lg">
          <h3 className="text-2xl font-bold">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <article key={project._id} className="border rounded-lg overflow-hidden flex flex-col">
                {project.coverImageUrl && (
                  <div className="aspect-video bg-muted relative">
                    <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                  {project.subtitle && <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>}
                  
                  {project.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4">
                      {project.categories.map((cat: any) => (
                        <span key={cat.slug} className="text-xs bg-muted px-2 py-1 rounded-md">{cat.title}</span>
                      ))}
                    </div>
                  )}
                  <Link href={`/projects/${project.slug}`} className="mt-4 text-sm font-medium underline">
                    Read Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
