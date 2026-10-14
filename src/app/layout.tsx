import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SiteChrome } from '@/components/site-chrome';
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
  return <html lang="en" className={jakarta.variable} suppressHydrationWarning><body>
    <script dangerouslySetInnerHTML={{ __html: `try { const theme = localStorage.getItem('wst-theme'); document.documentElement.classList.toggle('dark', theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)); } catch { document.documentElement.classList.toggle('dark', matchMedia('(prefers-color-scheme: dark)').matches); }` }} />
    <a className="skip-link" href="#main">Skip to content</a><SiteChrome><SiteHeader /></SiteChrome>{children}<SiteChrome><SiteFooter /></SiteChrome></body></html>;
}
