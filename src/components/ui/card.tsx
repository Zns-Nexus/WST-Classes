import type { ComponentProps } from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@/lib/utils';

type SurfaceTone = 'default' | 'inverse';

export function Card({ className, asChild = false, tone = 'default', ...props }: ComponentProps<'div'> & { asChild?: boolean; tone?: 'default' | 'muted' | 'primary' }) {
  const Component = asChild ? Slot.Root : 'div';
  return <Component data-slot="card" data-tone={tone} className={cn('ui-card', className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cn('ui-card-header', className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 data-slot="card-title" className={cn('ui-card-title', className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p data-slot="card-description" className={cn('ui-card-description', className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('ui-card-content', className)} {...props} />;
}

export function CardFooter({ className, tone = 'default', ...props }: ComponentProps<'div'> & { tone?: SurfaceTone }) {
  return <div data-slot="card-footer" data-tone={tone} className={cn('ui-card-footer', className)} {...props} />;
}
