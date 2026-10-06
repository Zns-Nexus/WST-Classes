import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export default function NotFound() {
  return <main id="main" className="container not-found"><span className="not-found-code" aria-hidden="true">404</span><h1>Let’s get you back on track.</h1><p>This page isn’t available. You can explore our courses from the homepage.</p><Link href="/" className="button button-primary"><ArrowLeft size={18} weight="bold" /> Back to Work Smart</Link></main>;
}
