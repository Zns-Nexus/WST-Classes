'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, CaretDown, InstagramLogo, List, MapPin, UserCircle, X, YoutubeLogo } from '@phosphor-icons/react';

export function Brand({ className = '' }: { className?: string }) {
  return <Link href="/" className={`brand ${className}`} aria-label="Work Smart Tutorials home"><span className="brand-logo"><Image src="/images/wst-logo.png" alt="" width={320} height={210} priority /></span><span className="brand-text"><strong>Work Smart</strong><span>Tutorials</span></span></Link>;
}

const links = [
  ['About us', '/#about'], ['Our results', '/#results'], ['Updates', '/#updates'], ['Contact us', '/#contact'],
];
const courses = [['SSC', 'ssc', 'Class 10'], ['HSC', 'hsc', 'Classes 11 & 12'], ['NEET', 'neet', 'Medical entrance'], ['JEE', 'jee', 'Engineering entrance'], ['MHT-CET', 'mht-cet', 'Maharashtra CET'], ['HSC Computer Science', 'hsc-computer-science', 'Classes 11 & 12']];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const close = () => { setMenuOpen(false); setCoursesOpen(false); };
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, []);

  return <>
    <div className="utility-bar"><div className="container utility-inner"><span><MapPin size={15} weight="fill" /> Naya Nagar, Mira Road</span><span className="utility-message">Don’t just work hard. <strong>Work smart.</strong></span><div className="utility-socials"><a href="https://www.instagram.com/worksmarttutorial/" target="_blank" rel="noreferrer" aria-label="Work Smart on Instagram"><InstagramLogo size={18} /></a><a href="https://www.youtube.com/@WorkSmartSSC" target="_blank" rel="noreferrer" aria-label="Work Smart on YouTube"><YoutubeLogo size={20} /></a></div></div></div>
    <header className="site-header"><div className="container navigation"><Brand /><nav className="desktop-navigation" aria-label="Main navigation"><Link href="/" className="home-link" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link><div className="course-dropdown" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setCoursesOpen(false); }}><button aria-expanded={coursesOpen} aria-controls="course-menu" onClick={() => setCoursesOpen(!coursesOpen)}>Our courses <CaretDown size={13} weight="bold" /></button>{coursesOpen && <div id="course-menu" className="course-menu">{courses.map(([name, slug, audience]) => <Link key={slug} href={`/courses/${slug}`} onClick={close}><span><strong>{name}</strong><small>{audience}</small></span><ArrowUpRight size={16} /></Link>)}</div>}</div>{links.map(([name, href]) => <Link key={name} href={href}>{name}</Link>)}</nav><div className="header-actions"><Link className="student-login" href="/student-portal" aria-label="Student login"><UserCircle size={22} /> <span>Student login</span></Link><Link className="button button-primary header-enquire" href="/#contact">Enquire now <ArrowUpRight size={16} weight="bold" /></Link><button className="mobile-menu-toggle icon-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={26} /> : <List size={26} />}</button></div></div>{menuOpen && <nav id="mobile-navigation" className="mobile-navigation container" aria-label="Mobile navigation"><Link href="/" onClick={close}>Home</Link><Link href="/#courses" onClick={close}>Our courses</Link>{links.map(([name, href]) => <Link key={name} href={href} onClick={close}>{name}</Link>)}<Link href="/student-portal" onClick={close}>Student login</Link><Link href="/#contact" onClick={close} className="button button-primary">Enquire now <ArrowUpRight size={16} weight="bold" /></Link></nav>}</header>
  </>;
}
