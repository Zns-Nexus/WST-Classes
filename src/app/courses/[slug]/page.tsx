import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Effect } from 'effect';
import { ArrowLeft, ArrowRight, CaretRight } from '@phosphor-icons/react/dist/ssr';
import { findCourse, getCourses } from '@/lib/catalog';

export async function generateStaticParams() {
  const courses = await Effect.runPromise(getCourses);
  return courses.map(course => ({ slug: course.slug }));
}

async function loadCourse(slug: string) {
  const course = await Effect.runPromise(findCourse(slug).pipe(Effect.catchTag('CourseNotFound', () => Effect.succeed(null))));
  if (!course) notFound();
  return course;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await loadCourse(slug);
  return { title: `${course.name} Classes in Mira Road`, description: course.description };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await loadCourse(slug);
  return <main id="main"><section className="inner-hero on-dark"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><CaretRight size={13} /><Link href="/#courses">Our courses</Link><CaretRight size={13} /><span aria-current="page">{course.name}</span></nav><h1>{course.name} at <span className="hl">Work Smart.</span></h1><p>{course.description}</p><ul className="inner-hero-tags"><li className="tag">{course.level}</li>{course.subjects.map(subject => <li key={subject}>{subject}</li>)}</ul><Link href="/#contact" className="button button-primary">Enquire about this course <ArrowRight size={18} weight="bold" /></Link></div></section><section className="section container course-detail-grid"><div><h2>What the course covers</h2><ol className="course-focus-list">{course.focus.map(item => <li key={item.title} className="course-focus"><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol><Link className="text-link" href="/#courses"><ArrowLeft size={17} weight="bold" /> Compare all courses</Link></div><aside className="course-facts"><h3>Course at a glance</h3><div><span>Course</span><strong>{course.name}</strong></div><div><span>Level</span><strong>{course.level}</strong></div><div><span>Subjects & focus</span><strong>{course.subjects.join(', ')}</strong></div><div><span>Location</span><strong>Naya Nagar, Mira Road</strong></div><Link href="/#contact" className="button button-primary">Talk to our team <ArrowRight size={17} weight="bold" /></Link><p>Ask the institute about batches, fees and timings before you join.</p></aside></section></main>;
}
