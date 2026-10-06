'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className="container error-panel"><h1>We couldn’t load this page.</h1><p>Please try again, or return to the homepage.</p><button className="button button-primary" onClick={reset}>Try again</button><Link className="button button-outline" href="/">Back to home</Link></main>;
}
