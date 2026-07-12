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
          'inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-300 ease-out focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          'rounded-sm',
          {
            'bg-text-primary text-background hover:bg-accent hover:shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.3)]': variant === 'primary',
            'bg-surface text-text-primary border border-border hover:bg-surface-inset hover:border-text-secondary': variant === 'secondary',
            'border border-border text-text-primary hover:border-text-primary hover:bg-surface-inset': variant === 'outline',
            'text-text-secondary hover:text-text-primary hover:bg-surface-inset': variant === 'ghost',
            
            'h-8 px-4 text-[10px]': size === 'sm',
            'h-10 px-6 text-[11px]': size === 'md',
            'h-12 px-8 text-xs': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
