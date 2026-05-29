import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'outline' | 'solid';
}

export function Badge({ children, className = '', variant }: BadgeProps) {
  const baseStyles = 'rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em]';
  const variantStyles = variant === 'outline'
    ? 'border border-current bg-transparent'
    : 'bg-gold/15 text-gold';

  return <span className={`${baseStyles} ${variantStyles} ${className}`.trim()}>{children}</span>;
}
