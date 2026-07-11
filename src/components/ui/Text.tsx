import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'body' | 'caption' | 'label' | 'metric' | 'title';
  color?: 'primary' | 'secondary' | 'metric' | 'error';
  as?: React.ElementType;
};

export function Text({ children, className, variant = 'body', color = 'primary', as: Component = 'p' }: Props) {
  const Comp = Component as any;
  return (
    <Comp
      className={cn(
        {
          'text-[length:var(--text-body)] font-[family-name:var(--font-sans)] leading-relaxed': variant === 'body',
          'text-[length:var(--text-caption)] font-[family-name:var(--font-sans)] leading-normal': variant === 'caption',
          'text-[length:var(--text-label)] font-[family-name:var(--font-mono)] uppercase tracking-wider': variant === 'label',
          'text-[length:var(--text-metric)] font-[family-name:var(--font-mono)] font-bold tracking-tight': variant === 'metric',
          'text-[length:var(--text-title)] font-[family-name:var(--font-sans)] font-medium': variant === 'title',
          
          'text-[var(--color-text-primary)]': color === 'primary',
          'text-[var(--color-text-secondary)]': color === 'secondary',
          'text-[var(--color-text-metric)]': color === 'metric',
          'text-[var(--color-error)]': color === 'error',
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
