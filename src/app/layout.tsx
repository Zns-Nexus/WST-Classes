import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const jakarta = localFont({
  src: [{ path: '../../public/fonts/plus-jakarta-sans-latin.woff2', weight: '200 800', style: 'normal' }],
  variable: '--font-jakarta', display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Work Smart Tutorials | SSC, HSC & Entrance Coaching in Mira Road', template: '%s | Work Smart Tutorials' },
  description: 'Explore SSC, HSC, NEET, JEE, MHT-CET and HSC Computer Science at Work Smart Tutorials, Naya Nagar, Mira Road.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={jakarta.variable}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
