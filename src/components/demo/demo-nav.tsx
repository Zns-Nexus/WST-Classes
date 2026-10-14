'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';

const links = [['Courses', '#d-courses'], ['Classroom', '#d-classroom'], ['Exam dates', '#d-dates']] as const;

/** Trial page navigation. On phones the links and the enquiry action fold behind a Menu button. */
export function DemoNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const close = () => setOpen(false);
  return <nav className={`d-nav d-axis ${open ? 'is-open' : ''}`} aria-label="Main navigation">
    <Link href="/demo" className="d-brand" aria-label="Work Smart Tutorials home"><Image src="/images/wst-logo.png" alt="" width={320} height={210} priority /><span>Work Smart Tutorials</span></Link>
    <div className="d-nav-links">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
    <a className="d-button d-button-small d-nav-enquire" href="#d-contact">Enquire</a>
    <button type="button" className="d-menu-toggle" aria-expanded={open} aria-controls="d-menu" onClick={() => setOpen(!open)}>{open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}{open ? 'Close' : 'Menu'}</button>
    <div id="d-menu" className="d-menu" hidden={!open}>
      {links.map(([label, href]) => <a key={href} href={href} onClick={close}>{label}</a>)}
      <a className="d-button" href="#d-contact" onClick={close}>Enquire</a>
    </div>
  </nav>;
}
