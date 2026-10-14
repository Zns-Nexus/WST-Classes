'use client';

import { useState } from 'react';
import { ArrowUpRight, InstagramLogo } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

const courses = ['SSC', 'HSC', 'NEET', 'JEE', 'MHT-CET', 'HSC Computer Science'] as const;

/** Course picker that opens the matching Instagram account: SSC enquiries go to the SSC account, the rest to HSC. */
export function EnquiryPanel() {
  const [course, setCourse] = useState<string>('SSC');
  const channel = course === 'SSC' ? 'https://www.instagram.com/worksmarttutorial/' : 'https://www.instagram.com/worksmart.hsc/';
  return <div className="enquiry-panel">
    <Label htmlFor="enquiry-course" className="enquiry-label">Course</Label>
    <NativeSelect id="enquiry-course" value={course} onChange={event => setCourse(event.target.value)}>{courses.map(name => <NativeSelectOption key={name}>{name}</NativeSelectOption>)}</NativeSelect>
    <Button asChild variant="light"><a href={channel} target="_blank" rel="noreferrer"><InstagramLogo size={20} /> Message us on Instagram <ArrowUpRight size={16} weight="bold" /></a></Button>
    <p className="enquiry-note">Opens Instagram. This page does not collect your details.</p>
  </div>;
}
