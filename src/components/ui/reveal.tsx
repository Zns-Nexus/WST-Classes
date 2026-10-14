"use client";

import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export function Reveal({ className, delay = 0, ...props }: ComponentProps<'div'> & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    const stopMotion = () => { if (preference.matches) animation?.cancel(); };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (preference.matches) return;
      const tokens = getComputedStyle(document.documentElement);
      animation = element.animate(
        [{ opacity: .65, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: parseFloat(tokens.getPropertyValue('--duration-reveal')), delay: delay * 1000, easing: tokens.getPropertyValue('--ease-out').trim(), fill: 'backwards' },
      );
    }, { threshold: .1 });
    observer.observe(element);
    preference.addEventListener('change', stopMotion);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener('change', stopMotion); };
  }, [delay]);
  return <div ref={ref} className={cn('ui-reveal', className)} {...props} />;
}
