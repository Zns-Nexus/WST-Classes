'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import type { Course } from '@/lib/catalog';

const instagram = (slug: string) => slug === 'ssc' ? 'https://www.instagram.com/worksmarttutorial/' : 'https://www.instagram.com/worksmart.hsc/';

/** The trial page's live element: pick an exam and read what the course covers, with the matching enquiry channel. */
export function CourseFinder({ courses }: { courses: ReadonlyArray<Course> }) {
  const [slug, setSlug] = useState(courses[0]?.slug ?? '');
  const course = courses.find(entry => entry.slug === slug) ?? courses[0];
  if (!course) return null;
  return <>
    <div className="d-list-head d-rise">
      <h2 className="d-h2"><span className="d-soft">Pick your exam.</span><span>See what you’ll cover.</span></h2>
      <a className="d-button" href={instagram(course.slug)} target="_blank" rel="noreferrer">Ask about {course.shortName} <ArrowUpRight size={18} weight="bold" /></a>
    </div>
    <div className="d-finder d-rise">
      <div className="d-tabs" role="tablist" aria-label="Courses">
        {courses.map(entry => <button key={entry.slug} type="button" role="tab" id={`d-tab-${entry.slug}`} aria-selected={entry.slug === course.slug} aria-controls="d-course-panel" onClick={() => setSlug(entry.slug)}><strong>{entry.shortName}</strong><span>{entry.audience}</span></button>)}
      </div>
      <div className="d-bands" role="tabpanel" id="d-course-panel" aria-labelledby={`d-tab-${course.slug}`} key={course.slug}>
        <div className="d-band d-band-lead"><strong>{course.level}</strong><p>{course.description}</p></div>
        {course.focus.map(item => <div key={item.title} className="d-band"><strong>{item.title}</strong><p>{item.description}</p></div>)}
        <div className="d-band d-band-foot"><strong>{course.subjects.join(' · ')}</strong><Link href={`/courses/${course.slug}`}>Full course page <ArrowRight size={16} weight="bold" /></Link></div>
      </div>
    </div>
  </>;
}
