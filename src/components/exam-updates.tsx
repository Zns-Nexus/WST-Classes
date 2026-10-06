'use client';

import { useState } from 'react';
import { ArrowUpRight, CalendarBlank, Megaphone, PlayCircle } from '@phosphor-icons/react';

const updates = [
  { category: 'Exam notices', icon: CalendarBlank, title: 'MHT-CET official notices', text: 'Application information, exam schedules and announcements from the Maharashtra CET Cell.', link: 'https://cetcell.mahacet.org/', label: 'Visit CET Cell', tag: 'Official source' },
  { category: 'From the classroom', icon: PlayCircle, title: 'A closer look at HSC classes', text: 'Watch our demo lecture introduction and get a feel for the Work Smart classroom.', link: 'https://www.youtube.com/watch?v=h4JfjIbtSCI', label: 'Watch on YouTube', tag: 'HSC' },
  { category: 'From the classroom', icon: Megaphone, title: 'What’s happening at Work Smart?', text: 'Classroom moments and institute announcements, straight from our official Instagram account.', link: 'https://www.instagram.com/worksmarttutorial/', label: 'Visit Instagram', tag: 'Work Smart' },
];

export function ExamUpdates() {
  const [category, setCategory] = useState('All updates');
  return <><div className="update-filters" role="group" aria-label="Filter updates">{['All updates', 'Exam notices', 'From the classroom'].map(name => <button key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}</div><div className="update-list" aria-live="polite">{updates.filter(update => category === 'All updates' || category === update.category).map(update => <article key={update.title} className="update-row"><span className="update-icon"><update.icon size={24} weight="duotone" /></span><div><span className="update-category">{update.tag}</span><h3>{update.title}</h3><p>{update.text}</p></div><a href={update.link} target="_blank" rel="noreferrer" className="update-link"><span>{update.label}</span><ArrowUpRight size={20} weight="bold" /></a></article>)}</div></>;
}
