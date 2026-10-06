import Image from 'next/image';
import Link from 'next/link';
import { Effect } from 'effect';
import { ArrowRight, ArrowUpRight, BookOpenText, CalendarBlank, ChalkboardTeacher, CheckCircle, Exam, Files, LockKey, MapPin, Medal, Play, PlayCircle, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import { HeroCarousel } from '@/components/hero-carousel';
import { CourseExplorer } from '@/components/course-explorer';
import { EnquiryPanel } from '@/components/enquiry-panel';
import { ExamUpdates } from '@/components/exam-updates';
import { getCourses, getResults, resultExams } from '@/lib/catalog';

const highlights = [
  { icon: ChalkboardTeacher, title: 'Classroom coaching', text: 'Naya Nagar, Mira Road' },
  { icon: BookOpenText, title: 'SSC & HSC boards', text: 'Maharashtra State Board' },
  { icon: Exam, title: 'Entrance preparation', text: 'NEET, JEE & MHT-CET' },
  { icon: YoutubeLogo, title: 'Lessons on YouTube', text: 'Work Smart SSC & HSC channels' },
];

const videos = [
  { href: 'https://www.youtube.com/watch?v=h4JfjIbtSCI', image: '/images/hsc-demo-hd.jpg', alt: 'Work Smart HSC teacher explaining a lesson at the board', tag: 'HSC demo', title: 'Sirf padho nahi. Experience karo.', text: 'Step inside an HSC demo lecture.' },
  { href: 'https://www.youtube.com/watch?v=ZGw0iXOqd4U', image: '/images/ssc-lesson-hd.jpg', alt: 'Work Smart SSC Gravitation lesson video thumbnail', tag: 'SSC science', title: 'One chapter. A clearer understanding.', text: 'Watch the Class 10 Gravitation lesson.' },
];

const channels = [
  { href: 'https://www.youtube.com/@WorkSmartSSC', name: 'Work Smart SSC', text: 'Class 10 lessons' },
  { href: 'https://www.youtube.com/@WorkSmartHSC', name: 'Work Smart HSC', text: 'Classes 11 & 12 lessons' },
];

const portalItems = [{ icon: Files, title: 'Study resources', text: 'Notes by subject and chapter.' }, { icon: PlayCircle, title: 'Lecture recordings', text: 'Revisit a concept at your own pace.' }, { icon: BookOpenText, title: 'Test papers', text: 'Your practice materials together.' }];

export default async function Home() {
  const [courses, results] = await Effect.runPromise(Effect.all([getCourses, getResults]));
  return <main id="main">
    <HeroCarousel />
    <div className="container"><ul className="highlights" aria-label="Why Work Smart">{highlights.map(item => <li key={item.title}><span><item.icon size={26} weight="duotone" /></span><div><strong>{item.title}</strong><small>{item.text}</small></div></li>)}</ul></div>

    <section id="courses" className="section container">
      <div className="section-head centered"><h2>Different goals. <span>The right preparation.</span></h2><p>From your first board exam to your next big ambition. Explore a course that meets you where you are.</p></div>
      <CourseExplorer courses={courses} />
      <p className="course-help">Not sure which course is right for you? <Link className="text-link" href="#contact">Let’s figure it out together <ArrowRight size={16} weight="bold" /></Link></p>
    </section>

    <section id="about" className="classroom-section section">
      <div className="container">
        <div className="section-head split"><div><h2>Get a feel for <span>Work Smart.</span></h2><p>Choosing a class is about more than a syllabus. It’s about finding a place where you can ask questions, understand what you’re learning, and take your next step.</p></div><a className="button button-outline" href="https://www.youtube.com/@WorkSmartSSC" target="_blank" rel="noreferrer"><YoutubeLogo size={20} weight="fill" /> Visit our YouTube</a></div>
        <div id="classroom" className="video-grid">
          {videos.map(video => <a key={video.href} className="video-card" href={video.href} target="_blank" rel="noreferrer"><div className="video-thumbnail"><Image src={video.image} alt={video.alt} fill sizes="(max-width: 767px) 100vw, 50vw" /><span className="video-play"><Play size={22} weight="fill" /></span><span className="tag">{video.tag}</span></div><div className="video-info"><div><h3>{video.title}</h3><p>{video.text}</p></div><ArrowUpRight size={22} weight="bold" /></div></a>)}
        </div>
        <div className="classroom-foot">
          <ul className="classroom-points"><li><CheckCircle size={20} weight="fill" /> School, college and entrance preparation</li><li><CheckCircle size={20} weight="fill" /> HSC Computer Science offered too</li><li><CheckCircle size={20} weight="fill" /> Explore real lessons on our YouTube channels</li></ul>
          <div className="channel-list">{channels.map(channel => <a key={channel.href} className="channel-link" href={channel.href} target="_blank" rel="noreferrer"><YoutubeLogo size={28} weight="fill" /><span><strong>{channel.name}</strong><small>{channel.text}</small></span><ArrowUpRight size={18} weight="bold" /></a>)}</div>
        </div>
      </div>
    </section>

    <section id="results" className="results-section section">
      <div className="container">
        <div className="section-head centered"><h2>Every result <span>starts with a student.</span></h2><p>There’s a story behind every milestone. This is where we’ll celebrate our students’ board and entrance-exam results.</p></div>
        <div className="results-grid">
          <a className="results-feature" href="https://www.youtube.com/watch?v=jSsEc1eE5Us" target="_blank" rel="noreferrer">
            <div className="results-photo"><Image src="/images/scorers-day.jpg" alt="A Work Smart teacher with five students celebrating the top five in a classes test" fill sizes="(max-width: 900px) 100vw, 60vw" /><span className="video-play"><Play size={22} weight="fill" /></span></div>
            <div className="results-caption"><div><h3>Hard work deserves its moment.</h3><p>Our top five in a classes test, celebrated with a day out.</p></div><span className="text-link on-dark-link">Watch our scorers’ day out <ArrowUpRight size={16} weight="bold" /></span></div>
          </a>
          <div className="results-board">
            <div className="results-board-head"><span className="results-medal"><Medal size={26} weight="duotone" /></span><div><strong>Work Smart achievers</strong><small>{results.length ? 'Verified results' : 'Awaiting verification'}</small></div></div>
            <ul>{resultExams.map(exam => {
              const entries = results.filter(result => result.exam === exam);
              return <li key={exam}><span className="results-exam">{exam}</span>{entries.length ? <span className="results-entries">{entries.map(entry => <span key={`${entry.student}-${entry.year}`}><strong>{entry.student}</strong> {entry.score} · {entry.year}</span>)}</span> : <span className="results-pending">To be published</span>}</li>;
            })}</ul>
            <p>Student names, scores and the exam year are published only after the institute confirms them. No rankings are estimated.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="updates" className="updates-section section">
      <div className="container">
        <div className="section-head split"><div><h2>Keep your next step <span>in sight.</span></h2><p>Exam information and the latest from our classroom.</p></div><span className="source-note"><CheckCircle size={19} weight="fill" /> Official links. No guessed dates.</span></div>
        <div className="noticeboard-grid">
          <div className="notice-main"><ExamUpdates /></div>
          <div className="notice-side">
            <aside className="exam-calendar"><h3><CalendarBlank size={24} weight="duotone" /> Planning for an exam?</h3><p>Always check the final timetable and eligibility with the exam authority.</p><div className="exam-status"><span>SSC & HSC</span><span>Dates not published here yet</span></div><div className="exam-status"><span>NEET & JEE</span><span>Dates not published here yet</span></div><div className="exam-status"><span>MHT-CET</span><a href="https://cetcell.mahacet.org/" target="_blank" rel="noreferrer">Visit official website <ArrowUpRight size={14} weight="bold" /></a></div><small>This website’s calendar is awaiting verified schedules, not predicting whether an authority has announced them.</small></aside>
            <div className="portal-card"><h3>Your classroom. Beyond the classroom.</h3><p>One place for your course resources, lecture recordings and test papers.</p><ul>{portalItems.map(item => <li key={item.title}><item.icon size={22} weight="duotone" /><span><strong>{item.title}</strong>{item.text}</span><LockKey size={16} /></li>)}</ul><Link className="button button-light" href="/student-portal">Explore student portal <ArrowRight size={18} weight="bold" /></Link><span className="portal-status"><LockKey size={14} /> Private access is being set up.</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="contact-section section">
      <div className="container contact-grid">
        <div className="contact-copy"><h2>Your ambition. <span>Let’s work on it.</span></h2><p>Whether you’re choosing subjects, preparing for boards, or thinking about an entrance exam, start with a conversation.</p><div className="contact-location"><MapPin size={26} weight="fill" /><div><strong>Come find us in Mira Road.</strong><span>Work Smart Tutorials<br />Naya Nagar, Mira Road</span></div></div><p className="contact-small">Message the team for the current batch schedule, exact location and admission details.</p></div>
        <EnquiryPanel />
      </div>
    </section>
  </main>;
}
