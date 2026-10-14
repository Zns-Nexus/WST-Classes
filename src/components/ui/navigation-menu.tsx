"use client";

import type { ComponentProps } from 'react';
import { NavigationMenu as Primitive } from 'radix-ui';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export function NavigationMenu({ className, ...props }: ComponentProps<typeof Primitive.Root>) {
  return <Primitive.Root data-slot="navigation-menu" className={cn('ui-navigation', className)} {...props} />;
}
export function NavigationMenuList({ className, ...props }: ComponentProps<typeof Primitive.List>) {
  return <Primitive.List data-slot="navigation-menu-list" className={cn('ui-navigation-list', className)} {...props} />;
}
export function NavigationMenuItem({ className, ...props }: ComponentProps<typeof Primitive.Item>) {
  return <Primitive.Item data-slot="navigation-menu-item" className={cn('ui-navigation-item', className)} {...props} />;
}
export function NavigationMenuTrigger({ className, children, ...props }: ComponentProps<typeof Primitive.Trigger>) {
  return <Primitive.Trigger data-slot="navigation-menu-trigger" className={cn('ui-navigation-trigger', className)} {...props}>{children}<CaretDown size={14} aria-hidden="true" /></Primitive.Trigger>;
}
export function NavigationMenuContent({ className, ...props }: ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Content data-slot="navigation-menu-content" className={cn('ui-navigation-content', className)} {...props} />;
}
export function NavigationMenuLink({ className, ...props }: ComponentProps<typeof Primitive.Link>) {
  return <Primitive.Link data-slot="navigation-menu-link" className={cn('ui-navigation-link', className)} {...props} />;
}
