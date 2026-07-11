import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
          'rounded-[var(--radius-sm)]',
          {
            'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]': variant === 'primary',
            'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-inset)]': variant === 'secondary',
            'border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-foreground)] hover:bg-[var(--color-surface)]': variant === 'outline',
            'text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]': variant === 'ghost',
            
            'h-8 px-[var(--spacing-component-sm)] text-[length:var(--text-caption)]': size === 'sm',
            'h-10 px-[var(--spacing-component-md)] text-[length:var(--text-body)]': size === 'md',
            'h-12 px-[var(--spacing-component-lg)] text-[length:var(--text-body)]': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
