import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col';
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  as?: React.ElementType;
};

export function Stack({
  children,
  className,
  direction = 'col',
  gap = 'none',
  align,
  justify,
  as: Component = 'div',
}: Props) {
  const Comp = Component as any;
  return (
    <Comp
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        {
          'gap-0': gap === 'none',
          'gap-[var(--spacing-component-sm)]': gap === 'sm',
          'gap-[var(--spacing-component-md)]': gap === 'md',
          'gap-[var(--spacing-component-lg)]': gap === 'lg',
          'gap-[var(--spacing-section-sm)]': gap === 'xl',
        },
        align && `items-${align}`,
        justify && justify === 'between' ? 'justify-between' : justify === 'around' ? 'justify-around' : `justify-${justify}`,
        className
      )}
    >
      {children}
    </Comp>
  );
}
