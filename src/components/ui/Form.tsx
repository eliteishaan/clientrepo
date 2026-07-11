import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-[length:var(--text-label)] font-[family-name:var(--font-mono)] font-medium uppercase text-[var(--color-text-secondary)] mb-1 block', className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn('input-semantic w-full h-10 focus-ring', className)}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn('input-semantic w-full min-h-[80px] focus-ring', className)}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
