import Image from 'next/image';
import Link from 'next/link';
import { Effect } from 'effect';
import { ArrowRight, ArrowUpRight, BookOpenText, CalendarBlank, ChalkboardTeacher, CheckCircle, Exam, Files, LockKey, MapPin, Play, PlayCircle, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import { HeroCarousel } from '@/components/hero-carousel';
import { CourseExplorer } from '@/components/course-explorer';
import { EnquiryPanel } from '@/components/enquiry-panel';
import { ExamUpdates } from '@/components/exam-updates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Reveal } from '@/components/ui/reveal';
import { getCourses, getResults, resultExams } from '@/lib/catalog';

const highlights = [
  { icon: ChalkboardTeacher, title: 'Classroom coaching', text: 'Naya Nagar, Mira Road' },
  { icon: BookOpenText, title: 'SSC and HSC', text: 'Maharashtra State Board' },
  { icon: Exam, title: 'Entrance exams', text: 'NEET, JEE and MHT-CET' },
  { icon: YoutubeLogo, title: 'Free lessons', text: 'On our YouTube channels' },
];

const channels = [
  { href: 'https://www.youtube.com/@WorkSmartSSC', name: 'Work Smart SSC', text: 'Class 10 lessons' },
  { href: 'https://www.youtube.com/@WorkSmartHSC', name: 'Work Smart HSC', text: 'Class 11 and 12 lessons' },
];

const examDates = [
  { exam: 'SSC and HSC', status: 'Not announced here yet' },
  { exam: 'NEET and JEE', status: 'Not announced here yet' },
];

const portalItems = [{ icon: Files, title: 'Notes', text: 'By subject and chapter' }, { icon: PlayCircle, title: 'Recordings', text: 'Watch a lecture again' }, { icon: BookOpenText, title: 'Test papers', text: 'For your course' }];

/** Shared section opening: heading on the left, one supporting line on the right. */
function SectionHead({ title, text }: { title: string; text: string }) {
  return <Reveal className="section-head"><h2>{title}</h2><p>{text}</p></Reveal>;
}

export default async function Home() {
  const [courses, results] = await Effect.runPromise(Effect.all([getCourses, getResults]));
  return <main id="main">
    <HeroCarousel />
    <div className="container"><Card className="highlights" aria-label="About Work Smart"><ItemGroup>{highlights.map(item => <Item key={item.title} size="sm"><ItemMedia variant="icon"><item.icon size={22} weight="duotone" /></ItemMedia><ItemContent><ItemTitle>{item.title}</ItemTitle><ItemDescription>{item.text}</ItemDescription></ItemContent></Item>)}</ItemGroup></Card></div>

    <section id="courses" className="section container">
      <SectionHead title="Find your course" text="Board classes for Class 10 to 12, and preparation for NEET, JEE and MHT-CET." />
      <Reveal delay={0.1}><CourseExplorer courses={courses} /></Reveal>
      <p className="course-help">Not sure which course fits? <Link className="text-link" href="#contact">Ask us <ArrowRight size={16} weight="bold" /></Link></p>
    </section>

    <section id="about" className="section container">
      <SectionHead title="See a class first" text="Watch a real lesson from our classroom before you choose." />
      <Reveal delay={0.1} className="split-grid">
        <Card asChild className="lesson-card"><a id="classroom" href="https://www.youtube.com/watch?v=h4JfjIbtSCI" target="_blank" rel="noreferrer">
          <div className="video-thumbnail"><Image src="/images/hsc-demo-hd.jpg" alt="A Work Smart HSC teacher explaining a lesson at the board" fill sizes="(max-width: 900px) 100vw, 700px" /><span className="play-badge"><Play size={20} weight="fill" /></span></div>
          <div className="lesson-body"><div><h3>HSC demo lecture</h3><p>A full lesson at the board, recorded in class.</p></div><ArrowUpRight size={18} weight="bold" /></div>
        </a></Card>
        <Card className="side-card">
          <h3 className="card-title">More lessons on YouTube</h3>
          <p className="card-text">Both channels are free to watch.</p>
          <ItemGroup className="side-list">{channels.map(channel => <Item key={channel.href} asChild variant="muted"><a href={channel.href} target="_blank" rel="noreferrer"><ItemMedia variant="icon" className="youtube-icon"><YoutubeLogo size={22} weight="fill" /></ItemMedia><ItemContent><ItemTitle>{channel.name}</ItemTitle><ItemDescription>{channel.text}</ItemDescription></ItemContent><ItemActions><ArrowUpRight size={16} weight="bold" /></ItemActions></a></Item>)}</ItemGroup>
        </Card>
      </Reveal>
    </section>

    <section id="results" className="section container">
      <SectionHead title="Student results" text="We publish names and marks only after the institute confirms them." />
      <Reveal delay={0.1} className="split-grid">
        <Card className="photo-card">
          <div className="photo-card-image"><Image src="/images/scorers-day.jpg" alt="A Work Smart teacher with five students celebrating the top five in a class test" fill sizes="(max-width: 900px) 100vw, 700px" /></div>
          <div className="lesson-body"><div><h3>Our top five in a class test</h3><p>We took them out for the day to celebrate.</p></div><a className="text-link" href="https://www.youtube.com/watch?v=jSsEc1eE5Us" target="_blank" rel="noreferrer">Watch <ArrowUpRight size={16} weight="bold" /></a></div>
        </Card>
        <Card className="side-card results-board">
          <h3 className="card-title">Board and entrance results</h3>
          <p className="card-text">{results.length ? 'Confirmed by the institute.' : 'Waiting for confirmed results.'}</p>
          <ItemGroup className="side-list">{resultExams.map(exam => {
            const entries = results.filter(result => result.exam === exam);
            return <Item key={exam} size="sm" variant="muted"><ItemContent><ItemTitle>{exam}</ItemTitle></ItemContent><ItemActions>{entries.length ? <span className="results-entries">{entries.map(entry => <span key={`${entry.student}-${entry.year}`}><strong>{entry.student}</strong> {entry.score}, {entry.year}</span>)}</span> : <span className="pending">To be published</span>}</ItemActions></Item>;
          })}</ItemGroup>
        </Card>
      </Reveal>
    </section>

    <section id="updates" className="section container">
      <SectionHead title="Exam updates" text="Official notices and news from the classroom." />
      <Reveal delay={0.1} className="split-grid">
        <Card className="updates-card"><ExamUpdates /></Card>
        <Card className="side-card">
          <h3 className="card-title"><CalendarBlank size={20} weight="duotone" /> Exam dates</h3>
          <p className="card-text">Always check final dates with the exam authority.</p>
          <ItemGroup className="side-list">
            {examDates.map(row => <Item key={row.exam} size="sm" variant="muted"><ItemContent><ItemTitle>{row.exam}</ItemTitle></ItemContent><ItemActions><span className="pending">{row.status}</span></ItemActions></Item>)}
            <Item size="sm" variant="muted"><ItemContent><ItemTitle>MHT-CET</ItemTitle></ItemContent><ItemActions><a className="text-link" href="https://cetcell.mahacet.org/" target="_blank" rel="noreferrer">Official site <ArrowUpRight size={14} weight="bold" /></a></ItemActions></Item>
          </ItemGroup>
          <p className="card-note"><CheckCircle size={16} weight="fill" /> We link to official sources and never guess dates.</p>
        </Card>
      </Reveal>
      <Reveal delay={0.1}><Card tone="primary" className="portal-card">
        <div className="portal-card-intro"><h3>Student portal</h3><p>Notes, recordings and test papers in one place. Sign-in is not set up yet.</p><Button asChild variant="light"><Link href="/student-portal">About the portal <ArrowRight size={18} weight="bold" /></Link></Button></div>
        <ItemGroup className="portal-list">{portalItems.map(item => <Item key={item.title} size="sm"><ItemMedia variant="icon"><item.icon size={20} weight="duotone" /></ItemMedia><ItemContent><ItemTitle>{item.title}</ItemTitle><ItemDescription>{item.text}</ItemDescription></ItemContent><ItemActions><LockKey size={16} aria-label="Locked" /></ItemActions></Item>)}</ItemGroup>
      </Card></Reveal>
    </section>

    <section id="contact" className="section container">
      <Reveal><Card tone="primary" className="contact-card">
        <div className="contact-copy"><h2>Ask about a course</h2><p>Message us for batch timings, fees and the exact address.</p><p className="contact-location"><MapPin size={18} weight="fill" /> Naya Nagar, Mira Road</p></div>
        <EnquiryPanel />
      </Card></Reveal>
    </section>
  </main>;
}
