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
  ({ className, size = 'md', variant: _variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center justify-center font-mono tracking-widest uppercase transition-all duration-300 ease-out focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          'bg-transparent border border-border-subtle text-text-primary rounded-none overflow-hidden',
          'hover:border-accent hover:text-accent-highlight',
          {
            'h-8 px-4 text-mono-micro': size === 'sm',
            'h-10 px-6 text-mono-label': size === 'md',
            'h-12 px-8 text-mono-label': size === 'lg',
          },
          className
        )}
        {...props}
      >
        <span className="relative z-10">{props.children}</span>
        {/* Steel-blue machined underline on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
      </button>
    );
  }
);
Button.displayName = 'Button';
