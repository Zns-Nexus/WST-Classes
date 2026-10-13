import Link from 'next/link';
import { ArrowUpRight, InstagramLogo, MapPin, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import { Brand } from '@/components/site-header';

const courses = [['SSC', 'ssc'], ['HSC', 'hsc'], ['NEET', 'neet'], ['JEE', 'jee'], ['MHT-CET', 'mht-cet'], ['HSC Computer Science', 'hsc-computer-science']];
const explore = [['About us', '/#about'], ['Our results', '/#results'], ['Dates & updates', '/#updates'], ['Student portal', '/student-portal'], ['Contact us', '/#contact']];
const socials = [
  { href: 'https://www.instagram.com/worksmarttutorial/', label: 'SSC Instagram', icon: InstagramLogo },
  { href: 'https://www.instagram.com/worksmart.hsc/', label: 'HSC Instagram', icon: InstagramLogo },
  { href: 'https://www.youtube.com/@WorkSmartSSC', label: 'SSC YouTube', icon: YoutubeLogo },
  { href: 'https://www.youtube.com/@WorkSmartHSC', label: 'HSC YouTube', icon: YoutubeLogo },
];

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-top">
      <div className="footer-about"><Brand className="footer-brand" /><p className="footer-tagline">Don’t just work hard. <span>Work smart.</span></p><p>School, board and entrance preparation, closer to home.</p><span className="footer-location"><MapPin size={16} weight="fill" /> Naya Nagar, Mira Road</span></div>
      <nav className="footer-nav" aria-label="Footer">
        <div><h3>Courses</h3><ul className="footer-links footer-links-split">{courses.map(([name, slug]) => <li key={slug}><Link href={`/courses/${slug}`}>{name}</Link></li>)}</ul></div>
        <div><h3>Explore</h3><ul className="footer-links">{explore.map(([name, href]) => <li key={href}><Link href={href}>{name}</Link></li>)}</ul></div>
        <div><h3>Follow the classroom</h3><ul className="footer-links">{socials.map(social => <li key={social.href}><a href={social.href} target="_blank" rel="noreferrer"><social.icon size={17} /> {social.label} <ArrowUpRight size={12} /></a></li>)}</ul></div>
      </nav>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Work Smart Tutorials. All rights reserved.</span><span>Stock photography is illustrative, not a depiction of our campus. <Link href="/image-credits">Image credits</Link> · <Link href="/privacy">Privacy</Link></span></div>
  </footer>;
}
