import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Link } from '@/components/ui/Link';

export function MediaGallery({ media, layout = 'grid', title }: { media?: any[], layout?: 'grid' | 'stacked', title?: string }) {
  if (!media || media.length === 0) return null;

  return (
    <Section spacing="md" aria-label={title || 'Media Gallery'}>
      <Container variant="standard">
        <Stack gap="lg">
          {title && <Heading variant="heading" level={2}>{title}</Heading>}
          <div className={layout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-component-md" : "flex flex-col gap-section-sm"}>
            {media.map((item: any, idx: number) => (
              <figure key={idx} className="border border-border rounded-md overflow-hidden bg-surface">
                {item.type === 'Image' && item.imageUrl && (
                  <img src={item.imageUrl} alt={item.alt || ''} className="w-full h-auto object-cover" loading="lazy" />
                )}
                {(item.type === 'PDF' || item.type === 'CAD' || item.type === 'GLB' || item.type === 'Video') && (
                  <div className="p-section-sm text-center flex flex-col items-center justify-center aspect-video bg-surface-inset">
                    <Text variant="body" className="font-bold">{item.type} File Embedded</Text>
                    <Link href={item.url || '#'} isExternal className="mt-component-md">View Source File</Link>
                  </div>
                )}
                {item.caption && (
                  <figcaption className="p-component-sm text-caption text-center border-t border-border bg-background text-text-secondary">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
