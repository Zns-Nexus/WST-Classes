import Link from 'next/link';
import { ArrowUpRight, BookOpenText, Files, LockKey, PlayCircle } from '@phosphor-icons/react/dist/ssr';

export const metadata = { title: 'Student Portal' };

export default function StudentPortal() {
  return <main id="main" className="portal-page"><div className="container portal-grid"><div className="portal-intro"><h1>Your notes, recordings <span className="hl">and test papers.</span></h1><p>Enrolled students will sign in here once the portal is ready.</p><div className="portal-capabilities"><div><Files size={22} weight="duotone" /> Study resources by subject and chapter</div><div><PlayCircle size={22} weight="duotone" /> Lecture recordings to revisit</div><div><BookOpenText size={22} weight="duotone" /> Test papers for your course</div></div></div><div className="portal-login-panel"><span className="portal-lock"><LockKey size={24} weight="duotone" /></span><h2>Student login</h2><p>The portal is not open yet.</p><div className="portal-setup-status"><strong>Secure sign-in is not connected yet.</strong>This page does not accept passwords. The institute will tell students how to sign in when it opens.</div><Link className="button button-primary" href="/#contact">Contact the institute <ArrowUpRight size={18} weight="bold" /></Link><a className="portal-back" href="https://www.youtube.com/@WorkSmartSSC" target="_blank" rel="noreferrer">Watch free lessons on YouTube</a></div></div></main>;
}
