'use client';

import { useState } from 'react';
import { ArrowUpRight, CalendarBlank, InstagramLogo } from '@phosphor-icons/react';
import { FilterTabs } from '@/components/filter-tabs';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';

const categories = ['All updates', 'Exam notices', 'Classroom'] as const;

const updates = [
  { category: 'Exam notices', icon: CalendarBlank, title: 'MHT-CET notices', text: 'Applications, exam schedules and results from the State CET Cell.', link: 'https://cetcell.mahacet.org/' },
  { category: 'Exam notices', icon: CalendarBlank, title: 'SSC and HSC board notices', text: 'Timetables and circulars from the Maharashtra State Board.', link: 'https://www.mahahsscboard.in/' },
  { category: 'Classroom', icon: InstagramLogo, title: 'News from Work Smart', text: 'Class moments and announcements on our Instagram.', link: 'https://www.instagram.com/worksmarttutorial/' },
] as const;

export function ExamUpdates() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All updates');
  return <>
    <FilterTabs id="updates" label="Filter updates" options={categories} value={category} onChange={setCategory} />
    <ItemGroup className="update-list" aria-live="polite">
      {updates.filter(update => category === 'All updates' || category === update.category).map(update => <Item key={update.title} asChild className="update-item"><a href={update.link} target="_blank" rel="noreferrer">
        <ItemMedia variant="icon"><update.icon size={20} weight="duotone" /></ItemMedia>
        <ItemContent><ItemTitle>{update.title}</ItemTitle><ItemDescription>{update.text}</ItemDescription></ItemContent>
        <ItemActions><ArrowUpRight size={18} weight="bold" /></ItemActions>
      </a></Item>)}
    </ItemGroup>
  </>;
}
