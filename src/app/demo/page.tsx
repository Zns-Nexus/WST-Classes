import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Effect } from 'effect';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { ChannelPlate } from '@/components/demo/channel-plate';
import { CourseFinder } from '@/components/demo/course-finder';
import { DemoNav } from '@/components/demo/demo-nav';
import { getCourses } from '@/lib/catalog';
import './demo.css';

export const metadata = { title: 'Design trial' };

const masthead = [
  { image: '/images/hsc-demo-oar.jpg', position: '50% 12%', alt: 'A Work Smart teacher explaining a calculation at the board during an HSC demo lecture' },
  { tone: 'blue' },
  { image: '/images/scorers-day.jpg', position: '42% 30%', alt: 'A Work Smart teacher with students celebrating the top five in a classes test' },
  { tone: 'maroon' },
  { image: '/images/ssc-lesson-hd.jpg', position: '20% 50%', alt: 'Work Smart SSC Gravitation lesson video thumbnail' },
] as const;

const inside = [
  { title: 'At the board', image: '/images/hsc-demo.jpg', position: '50% 20%', alt: 'A Work Smart teacher at the board during an HSC demo lecture', lines: ['Classroom coaching in Naya Nagar, Mira Road', 'SSC and HSC, Maharashtra State Board', 'NEET, JEE and MHT-CET preparation', 'HSC Computer Science alongside your subjects'] },
  { title: 'Hard work, celebrated', image: '/images/scorers-day.jpg', position: '45% 40%', alt: 'Students and their teacher celebrating the top five in a classes test', lines: ['Our top five in a classes test', 'Celebrated together with a day out', 'Filmed for the Work Smart channel'], link: { href: 'https://www.youtube.com/watch?v=jSsEc1eE5Us', label: 'Watch the day out' } },
  { title: 'Your study space, soon', image: '/images/study.jpg', position: '40% 50%', alt: 'A student studying an open textbook, illustrative photograph', note: 'Illustrative photograph', lines: ['Notes by subject and chapter', 'Lecture recordings to revisit', 'Test papers for your course', 'Private access is being set up'], link: { href: '/student-portal', label: 'About the student portal' } },
] as const;

const exams = [
  { exam: 'SSC', body: 'Maharashtra State Board', source: 'https://www.mahahsscboard.in/', site: 'mahahsscboard.in' },
  { exam: 'HSC', body: 'Maharashtra State Board', source: 'https://www.mahahsscboard.in/', site: 'mahahsscboard.in' },
  { exam: 'NEET (UG)', body: 'National Testing Agency', source: 'https://neet.nta.nic.in/', site: 'neet.nta.nic.in' },
  { exam: 'JEE Main', body: 'National Testing Agency', source: 'https://jeemain.nta.nic.in/', site: 'jeemain.nta.nic.in' },
  { exam: 'MHT-CET', body: 'State CET Cell, Maharashtra', source: 'https://cetcell.mahacet.org/', site: 'cetcell.mahacet.org' },
];

const footerColumns = [
  { title: 'Work Smart Tutorials', links: [{ label: 'Naya Nagar, Mira Road' }] },
  { title: 'Courses', links: [{ label: 'SSC and HSC', href: '/courses/ssc' }, { label: 'NEET and JEE', href: '/courses/neet' }, { label: 'MHT-CET', href: '/courses/mht-cet' }, { label: 'Computer Science', href: '/courses/hsc-computer-science' }] },
  { title: 'Follow', links: [{ label: 'SSC Instagram', href: 'https://www.instagram.com/worksmarttutorial/' }, { label: 'HSC Instagram', href: 'https://www.instagram.com/worksmart.hsc/' }, { label: 'SSC YouTube', href: 'https://www.youtube.com/@WorkSmartSSC' }, { label: 'HSC YouTube', href: 'https://www.youtube.com/@WorkSmartHSC' }] },
  { title: 'Pages', links: [{ label: 'Student portal', href: '/student-portal' }, { label: 'Privacy', href: '/privacy' }, { label: 'Current design', href: '/' }] },
];

const isExternal = (href: string) => href.startsWith('http');

export default async function DemoPage() {
  const courses = await Effect.runPromise(getCourses);
  return <div className="demo">
    <main id="main" className="d-main">
      <section className="d-hero">
        <DemoNav />
        <div className="d-mosaic">
          {masthead.map((cell, index) => 'image' in cell
            ? <div key={index} className="d-mosaic-cell"><Image src={cell.image} alt={cell.alt} fill priority sizes="(max-width: 767px) 50vw, 30vw" style={{ objectPosition: cell.position }} /></div>
            : <div key={index} className={`d-mosaic-cell d-tile-${cell.tone}`} />)}
        </div>
        <div className="d-hero-body d-axis">
          <div className="d-hero-side">
            <p className="d-standfirst">SSC, HSC, NEET, JEE and MHT-CET coaching in Naya Nagar, Mira Road.</p>
            <div className="d-hero-actions"><a className="d-button" href="#d-courses">Find your course <ArrowRight size={18} weight="bold" /></a><a className="d-link" href="#d-classroom">Watch a lesson</a></div>
          </div>
          <h1 className="d-display d-lines"><span className="d-line"><span style={{ '--i': 0 } as CSSProperties}>Don’t just work hard.</span></span><span className="d-line"><span style={{ '--i': 1 } as CSSProperties}>Work smart.</span></span></h1>
        </div>
      </section>

      <section id="d-courses" className="d-section d-courses">
        <CourseFinder courses={courses} />
      </section>

      <section id="d-classroom" className="d-classroom">
        <ChannelPlate />
      </section>

      <section className="d-inside">
        <h2 className="d-display d-inside-head">Inside Work Smart.</h2>
        <div className="d-inside-blocks">
          {inside.map((block, index) => <article key={block.title} className={`d-inside-block d-rise ${index % 2 ? 'is-flipped' : ''}`}>
            <h3 className="d-h3">{block.title}</h3>
            <div className="d-inside-row">
              <figure className="d-portrait"><Image src={block.image} alt={block.alt} fill sizes="220px" style={{ objectPosition: block.position }} />{'note' in block && <figcaption>{block.note}</figcaption>}</figure>
              <ul>{block.lines.map(line => <li key={line}>{line}</li>)}{'link' in block && <li><a className="d-link d-link-light" href={block.link.href} {...(isExternal(block.link.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>{block.link.label} <ArrowUpRight size={16} weight="bold" /></a></li>}</ul>
            </div>
          </article>)}
        </div>
      </section>

      <section id="d-dates" className="d-section d-dates">
        <h2 className="d-h2 d-dates-head d-rise"><span>Exam dates,</span><span className="d-indent">from the source.</span></h2>
        <table className="d-table d-rise">
          <thead><tr><th scope="col">Exam</th><th scope="col">Conducted by</th><th scope="col">Dates</th><th scope="col">Official website</th></tr></thead>
          <tbody>{exams.map(row => <tr key={row.exam}><th scope="row">{row.exam}</th><td>{row.body}</td><td>Not published here yet</td><td><a href={row.source} target="_blank" rel="noreferrer">{row.site} <ArrowUpRight size={14} weight="bold" /></a></td></tr>)}</tbody>
        </table>
        <p className="d-dates-note d-rise">Dates appear here only after the exam authority announces them.</p>
      </section>

      <section id="d-contact" className="d-section d-contact">
        <p className="d-statement d-rise">Ask us about batches, fees and the right course for you. We reply on Instagram.</p>
        <div className="d-contact-photo d-rise"><Image src="/images/hsc-demo-oar.jpg" alt="A Work Smart lesson at the board" fill sizes="170px" style={{ objectPosition: '50% 12%' }} /></div>
        <div className="d-contact-links d-rise">
          <p className="d-contact-q">Which exam are you preparing for?</p>
          <a href="https://www.instagram.com/worksmarttutorial/" target="_blank" rel="noreferrer">SSC: @worksmarttutorial</a>
          <a href="https://www.instagram.com/worksmart.hsc/" target="_blank" rel="noreferrer">HSC and entrance: @worksmart.hsc</a>
          <p className="d-contact-note">Naya Nagar, Mira Road</p>
        </div>
      </section>
    </main>

    <footer className="d-footer">
      <div className="d-footer-cols">{footerColumns.map(column => <div key={column.title}><strong>{column.title}</strong><ul>{column.links.map(link => <li key={link.label}>{'href' in link && link.href ? (isExternal(link.href) ? <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a> : <Link href={link.href}>{link.label}</Link>) : link.label}</li>)}</ul></div>)}</div>
      <svg className="d-wordmark" viewBox="0 0 1000 150" role="img" aria-label="Work Smart"><text x="0" y="122" textLength="1000" lengthAdjust="spacingAndGlyphs">Work Smart</text></svg>
      <p className="d-legal">© {new Date().getFullYear()} Work Smart Tutorials</p>
    </footer>
  </div>;
}
