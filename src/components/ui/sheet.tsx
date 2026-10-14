"use client";

import type { ComponentProps } from 'react';
import { Dialog as Primitive } from 'radix-ui';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const Sheet = Primitive.Root;
export const SheetTrigger = Primitive.Trigger;
export const SheetClose = Primitive.Close;

export function SheetContent({ className, children, side = 'right', ...props }: ComponentProps<typeof Primitive.Content> & { side?: 'right' | 'left' | 'top' | 'bottom' }) {
  return <Primitive.Portal>
    <Primitive.Overlay className="ui-sheet-overlay" />
    <Primitive.Content data-slot="sheet-content" data-side={side} className={cn('ui-sheet-content', className)} {...props}>
      {children}
      <Primitive.Close asChild><Button variant="ghost" size="icon" className="ui-sheet-close" aria-label="Close menu"><X size={24} /></Button></Primitive.Close>
    </Primitive.Content>
  </Primitive.Portal>;
}
export function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('ui-sheet-header', className)} {...props} />;
}
export function SheetTitle({ className, ...props }: ComponentProps<typeof Primitive.Title>) {
  return <Primitive.Title className={cn('ui-sheet-title', className)} {...props} />;
}
export function SheetDescription({ className, ...props }: ComponentProps<typeof Primitive.Description>) {
  return <Primitive.Description className={cn('ui-sheet-description', className)} {...props} />;
}
