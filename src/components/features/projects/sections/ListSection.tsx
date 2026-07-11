import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Stack } from '@/components/ui/Stack';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { List, ListItem } from '@/components/ui/List';

export function ListSection({ title, items, type = 'bullet' }: { title: string, items?: any[], type?: 'bullet' | 'constraint' | 'requirement' }) {
  if (!items || items.length === 0) return null;

  return (
    <Section spacing="lg" aria-label={title}>
      <Container variant="reading">
        <Stack gap="md">
          <Heading variant="heading" level={2}>{title}</Heading>
          <List>
            {items.map((item: any, idx: number) => {
              if (type === 'bullet') {
                return <ListItem key={idx} className="text-text-secondary">{item}</ListItem>;
              }
              if (type === 'constraint') {
                return (
                  <ListItem key={idx}>
                    <strong className="text-foreground">{item.title}:</strong> <span className="text-text-secondary">{item.description}</span>
                  </ListItem>
                );
              }
              if (type === 'requirement') {
                return (
                  <ListItem key={idx} className="flex flex-col mb-component-sm">
                    <div className="flex items-center">
                      <strong className="text-foreground">{item.title}</strong> 
                      {item.isMet && <span className="text-[10px] ml-2 bg-success text-white px-1.5 py-0.5 rounded-sm uppercase font-mono font-bold tracking-wider">Met</span>}
                    </div>
                    <Text variant="body" color="secondary" className="mt-1">{item.description}</Text>
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </Stack>
      </Container>
    </Section>
  );
}
