import { InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`premium-input w-full rounded-xl px-4 py-3 outline-none transition focus:ring-4 focus:ring-[var(--focus-ring)] ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
