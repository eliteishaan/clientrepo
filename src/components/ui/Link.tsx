import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface LinkProps extends NextLinkProps {
  className?: string;
  children: React.ReactNode;
  isExternal?: boolean;
  variant?: 'nav' | 'inline' | 'button';
}

export function Link({ className, children, isExternal, variant = 'inline', href, ...props }: LinkProps) {
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  
  return (
    <NextLink
      href={href}
      className={cn(
        'focus-ring transition-colors cursor-pointer',
        {
          'text-[var(--color-text-primary)] hover:text-[var(--color-foreground)] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]': variant === 'inline',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-foreground)] font-medium': variant === 'nav',
          'inline-flex items-center justify-center font-medium bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] px-[var(--spacing-component-md)] py-[var(--spacing-component-sm)] hover:border-[var(--color-foreground)]': variant === 'button',
        },
        className
      )}
      {...externalProps}
      {...props}
    >
      {children}
    </NextLink>
  );
}
