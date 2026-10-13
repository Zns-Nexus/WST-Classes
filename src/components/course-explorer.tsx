'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Atom, BookOpenText, Code, GraduationCap, MathOperations, Stethoscope } from '@phosphor-icons/react';
import type { Course } from '@/lib/catalog';

const icons = { school: BookOpenText, college: GraduationCap, medical: Stethoscope, engineering: Atom, exam: MathOperations, code: Code };
const tones = { 'Board preparation': 'blue', 'Entrance exams': 'maroon', 'Computer science': 'navy' } as const;
const filters = ['All courses', 'Board preparation', 'Entrance exams', 'Computer science'] as const;

export function CourseExplorer({ courses }: { courses: ReadonlyArray<Course> }) {
  const [filter, setFilter] = useState<string>('All courses');
  const filtered = courses.filter(course => filter === 'All courses' || course.group === filter);
  return <div><div className="course-filter-bar" role="group" aria-label="Filter courses">{filters.map(name => <button key={name} aria-pressed={name === filter} onClick={() => setFilter(name)}>{name === filter && <motion.span layoutId="course-filter-pill" className="filter-pill" transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }} />}{name}</button>)}</div><div className="course-grid" aria-live="polite">{filtered.map(course => {
    const Icon = icons[course.icon];
    return <article key={course.slug} className={`course-card tone-${tones[course.group]}`}>
      <div className="course-card-head"><span className="course-icon"><Icon size={22} weight="duotone" aria-hidden="true" /></span><div><h3><Link className="course-link" href={`/courses/${course.slug}`}>{course.name}</Link></h3><span className="course-level">{course.level}</span></div><span className="course-arrow" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span></div>
      <p>{course.description}</p>
      <p className="course-subjects"><span className="sr-only">Subjects: </span>{course.subjects.join(' · ')}</p>
    </article>;
  })}</div></div>;
}
