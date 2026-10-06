'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Atom, BookOpenText, Code, GraduationCap, MathOperations, Stethoscope } from '@phosphor-icons/react';
import type { Course } from '@/lib/catalog';

const icons = { school: BookOpenText, college: GraduationCap, medical: Stethoscope, engineering: Atom, exam: MathOperations, code: Code };
const tones = { 'Board preparation': 'blue', 'Entrance exams': 'maroon', 'Computer science': 'navy' } as const;
const filters = ['All courses', 'Board preparation', 'Entrance exams', 'Computer science'] as const;

export function CourseExplorer({ courses }: { courses: ReadonlyArray<Course> }) {
  const [filter, setFilter] = useState<string>('All courses');
  const filtered = courses.filter(course => filter === 'All courses' || course.group === filter);
  return <div><div className="course-filter-bar" role="group" aria-label="Filter courses">{filters.map(name => <button key={name} aria-pressed={name === filter} onClick={() => setFilter(name)}>{name}</button>)}</div><div className="course-grid" aria-live="polite">{filtered.map(course => {
    const Icon = icons[course.icon];
    return <article key={course.slug} className={`course-card tone-${tones[course.group]}`}><div className="course-card-top"><span className="course-icon"><Icon size={28} weight="duotone" aria-hidden="true" /></span><span className="course-group">{course.group}</span></div><h3>{course.name}</h3><span className="course-level">{course.level}</span><p>{course.description}</p><ul className="course-subjects" aria-label={`${course.name} subjects`}>{course.subjects.map(subject => <li key={subject}>{subject}</li>)}</ul><Link className="course-link" href={`/courses/${course.slug}`}>Explore {course.shortName}<ArrowRight size={20} weight="bold" /></Link></article>;
  })}</div></div>;
}
