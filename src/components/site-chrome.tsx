'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Hides the shared header and footer on routes that bring their own, such as the `/demo` design trial. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return usePathname().startsWith('/demo') ? null : children;
}
