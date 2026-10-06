'use client';

import { useState } from 'react';
import { ArrowUpRight, InstagramLogo } from '@phosphor-icons/react';

export function EnquiryPanel() {
  const [course, setCourse] = useState('SSC');
  const channel = course === 'SSC' ? 'https://www.instagram.com/worksmarttutorial/' : 'https://www.instagram.com/worksmart.hsc/';
  return <div className="enquiry-panel"><h3>Let’s find your course.</h3><p>Tell us what you’re preparing for. Ask our team about batches, fees and the next step.</p><label htmlFor="enquiry-course">I’m interested in</label><select id="enquiry-course" value={course} onChange={event => setCourse(event.target.value)}>{['SSC', 'HSC', 'NEET', 'JEE', 'MHT-CET', 'HSC Computer Science'].map(name => <option key={name}>{name}</option>)}</select><a className="button button-primary" href={channel} target="_blank" rel="noreferrer"><InstagramLogo size={21} /> Enquire on Instagram <ArrowUpRight size={18} weight="bold" /></a><span className="enquiry-note">Opens our official account. No personal details are collected on this page.</span></div>;
}
