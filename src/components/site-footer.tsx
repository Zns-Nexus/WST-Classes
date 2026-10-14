import Link from 'next/link';

type FooterLink = { label: string; href?: string };

const columns: ReadonlyArray<{ title: string; links: ReadonlyArray<FooterLink> }> = [
  { title: 'Work Smart Tutorials', links: [{ label: 'Naya Nagar, Mira Road' }, { label: 'Ask us on Instagram', href: '/#contact' }] },
  { title: 'Courses', links: [{ label: 'SSC', href: '/courses/ssc' }, { label: 'HSC', href: '/courses/hsc' }, { label: 'HSC Computer Science', href: '/courses/hsc-computer-science' }, { label: 'NEET', href: '/courses/neet' }, { label: 'JEE', href: '/courses/jee' }, { label: 'MHT-CET', href: '/courses/mht-cet' }] },
  { title: 'Follow', links: [{ label: 'SSC Instagram', href: 'https://www.instagram.com/worksmarttutorial/' }, { label: 'HSC Instagram', href: 'https://www.instagram.com/worksmart.hsc/' }, { label: 'SSC YouTube', href: 'https://www.youtube.com/@WorkSmartSSC' }, { label: 'HSC YouTube', href: 'https://www.youtube.com/@WorkSmartHSC' }] },
  { title: 'Pages', links: [{ label: 'Lessons', href: '/#about' }, { label: 'Results', href: '/#results' }, { label: 'Exam updates', href: '/#updates' }, { label: 'Student portal', href: '/student-portal' }, { label: 'Privacy', href: '/privacy' }] },
];

/** Closing footer: four link columns, the copyright line, then the name set into the background. On desktop it is uncovered as the page scrolls away. */
export function SiteFooter() {
  return <footer className="site-footer">
    <nav className="footer-columns" aria-label="Footer">{columns.map(column => <div key={column.title}>
      <h3>{column.title}</h3>
      <ul>{column.links.map(link => <li key={link.label}>{link.href ? (link.href.startsWith('http') ? <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a> : <Link href={link.href}>{link.label}</Link>) : link.label}</li>)}</ul>
    </div>)}</nav>
    <p className="footer-legal">© {new Date().getFullYear()} Work Smart Tutorials</p>
    <svg className="footer-wordmark" viewBox="0 0 1000 150" aria-hidden="true"><text x="0" y="122" textLength="1000" lengthAdjust="spacingAndGlyphs">Work Smart</text></svg>
  </footer>;
}
