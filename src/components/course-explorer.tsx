'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Atom, BookOpenText, Code, GraduationCap, MathOperations, Stethoscope } from '@phosphor-icons/react';
import { FilterTabs } from '@/components/filter-tabs';
import { Card } from '@/components/ui/card';
import type { Course } from '@/lib/catalog';

const icons = { school: BookOpenText, college: GraduationCap, medical: Stethoscope, engineering: Atom, exam: MathOperations, code: Code };

/** Filter labels and the catalog groups each one shows. HSC Computer Science sits with the board courses. */
const filters = {
  'All courses': ['Board preparation', 'Entrance exams', 'Computer science'],
  'Board exams': ['Board preparation', 'Computer science'],
  'Entrance exams': ['Entrance exams'],
} as const satisfies Record<string, ReadonlyArray<Course['group']>>;
type Filter = keyof typeof filters;
const filterNames = Object.keys(filters) as ReadonlyArray<Filter>;

export function CourseExplorer({ courses }: { courses: ReadonlyArray<Course> }) {
  const [filter, setFilter] = useState<Filter>('All courses');
  const groups: ReadonlyArray<Course['group']> = filters[filter];
  const filtered = courses.filter(course => groups.includes(course.group));
  return <>
    <FilterTabs id="courses" label="Filter courses" options={filterNames} value={filter} onChange={setFilter} />
    <div className="course-grid" aria-live="polite">{filtered.map(course => {
      const Icon = icons[course.icon];
      return <Card key={course.slug} className="course-card">
        <div className="course-card-head"><span className="icon-tile"><Icon size={22} weight="duotone" aria-hidden="true" /></span><span className="course-arrow" aria-hidden="true"><ArrowUpRight size={16} weight="bold" /></span></div>
        <h3><Link className="course-link" href={`/courses/${course.slug}`}>{course.name}</Link></h3>
        <span className="course-level">{course.level}</span>
        <p>{course.description}</p>
        <p className="course-subjects"><span className="sr-only">Subjects: </span>{course.subjects.join(' · ')}</p>
      </Card>;
    })}</div>
  </>;
}
