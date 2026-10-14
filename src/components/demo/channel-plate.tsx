'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Play } from '@phosphor-icons/react';

const channels = [
  { id: 'ssc', label: 'SSC channel', image: '/images/ssc-lesson-hd.jpg', position: '30% 50%', alt: 'Work Smart SSC Gravitation lesson video thumbnail', title: 'One chapter, made clear.', text: 'Watch the Class 10 Gravitation lesson, then work through the rest of the Class 10 lessons on the Work Smart SSC channel.', video: 'https://www.youtube.com/watch?v=ZGw0iXOqd4U', channel: 'https://www.youtube.com/@WorkSmartSSC' },
  { id: 'hsc', label: 'HSC channel', image: '/images/hsc-demo-hd.jpg', position: '50% 40%', alt: 'Work Smart HSC teacher explaining a lesson at the board', title: 'Sirf padho nahi. Experience karo.', text: 'Step inside an HSC demo lecture at the board, then browse the Classes 11 and 12 lessons on the Work Smart HSC channel.', video: 'https://www.youtube.com/watch?v=h4JfjIbtSCI', channel: 'https://www.youtube.com/@WorkSmartHSC' },
] as const;

/** Square lesson plate that switches between the institute's two YouTube channels. */
export function ChannelPlate() {
  const [active, setActive] = useState<(typeof channels)[number]['id']>('hsc');
  const current = channels.find(channel => channel.id === active) ?? channels[0];
  return <div className="d-plate">
    <a className="d-plate-photo d-rise" href={current.video} target="_blank" rel="noreferrer" aria-label={`Watch: ${current.title}`}>
      {channels.map(channel => <Image key={channel.id} src={channel.image} alt={channel.id === active ? channel.alt : ''} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectPosition: channel.position }} className={channel.id === active ? 'is-active' : ''} />)}
      <span className="d-play"><Play size={22} weight="fill" /></span>
    </a>
    <div className="d-plate-copy d-rise">
      <div className="d-plate-tabs" role="tablist" aria-label="YouTube channels">{channels.map(channel => <button key={channel.id} type="button" role="tab" aria-selected={channel.id === active} onClick={() => setActive(channel.id)}>{channel.label}</button>)}</div>
      <div className="d-plate-text" key={current.id}><h2 className="d-h3">{current.title}</h2><p>{current.text}</p></div>
      <div className="d-cells"><a className="d-cell d-cell-ink" href={current.video} target="_blank" rel="noreferrer">Watch the lesson <ArrowUpRight size={18} weight="bold" /></a><a className="d-cell" href={current.channel} target="_blank" rel="noreferrer">Open the channel <ArrowUpRight size={18} weight="bold" /></a></div>
    </div>
  </div>;
}
