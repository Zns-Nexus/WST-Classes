'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Pause, Play } from '@phosphor-icons/react';
import type { Variants } from 'motion/react';
import { TextAnimate } from '@/components/ui/text-animate';

const slides = [
  { image: '/images/hsc-demo-oar.jpg', position: '50% 8%', colour: 'var(--brand-blue)', alt: 'A Work Smart teacher explaining a calculation at the board during an HSC demo lecture', title: ['Coaching for SSC, HSC', 'and entrance exams.'], description: 'Classes in Naya Nagar, Mira Road, with the teachers from our YouTube lessons.', name: 'Coaching in Mira Road', caption: 'In class at Work Smart', note: 'From our HSC demo lecture' },
  { image: '/images/study.jpg', position: '38% 50%', colour: 'var(--brand-maroon)', alt: 'A student studying an open textbook, illustrative photography', title: ['SSC and HSC', 'board preparation.'], description: 'Chapter by chapter, with the question practice the Maharashtra Board expects.', name: 'Board preparation', caption: 'SSC and HSC, Maharashtra Board', note: 'Illustrative photography' },
  { image: '/images/computer-science.jpg', position: '62% 45%', colour: 'var(--brand-navy)', alt: 'Students collaborating on a laptop, illustrative photography', title: ['Computer Science', 'for HSC students.'], description: 'Programming and computer systems, taught alongside your other HSC subjects.', name: 'HSC Computer Science', caption: 'HSC Computer Science', note: 'Illustrative photography' },
];

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0 },
};

function HeroTitle({ lines, animate }: { lines: string[]; animate: boolean }) {
  const [first, second] = lines;
  if (!animate) return <>{first}<br /><span className="hero-accent">{second}</span></>;
  return <><span className="sr-only">{lines.join(' ')}</span><TextAnimate as="span" aria-hidden="true" accessible={false} startOnView={false} variants={wordReveal} by="word" delay={0.2} duration={0.3}>{first}</TextAnimate><br /><TextAnimate as="span" aria-hidden="true" accessible={false} startOnView={false} variants={wordReveal} by="word" delay={0.45} duration={0.3} className="hero-accent">{second}</TextAnimate></>;
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(preference.matches);
    const updateVisibility = () => setVisible(document.visibilityState === 'visible');
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { preference.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);
  useEffect(() => {
    if (paused || hovered || focused || reduced || !visible) return;
    const interval = window.setInterval(() => setActive(index => (index + 1) % slides.length), 7000);
    return () => window.clearInterval(interval);
  }, [paused, hovered, focused, reduced, visible]);
  const changeSlide = (index: number) => { setActive((index + slides.length) % slides.length); setPaused(true); };
  const current = slides[active];

  return <div className="hero-wrap"><section className="hero-carousel" style={{ '--slide': current.colour } as CSSProperties} aria-roledescription="carousel" aria-label="Work Smart course highlights" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); changeSlide(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
    <div className="hero-content">
      <div className="hero-copy">
        <div className="hero-slides" aria-live={paused || reduced ? 'polite' : 'off'}>{slides.map((slide, index) => <div key={slide.image} className={`hero-slide ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index} inert={active !== index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}>
          {index === 0 ? <h1><HeroTitle key={active === index ? 'on' : 'off'} lines={slide.title} animate={active === index && !reduced} /></h1> : <h2><HeroTitle key={active === index ? 'on' : 'off'} lines={slide.title} animate={active === index && !reduced} /></h2>}
          <p>{slide.description}</p>
        </div>)}</div>
        <div className="hero-buttons"><Link href="/#courses" className="button button-light hero-primary">Find your course <ArrowRight size={18} weight="bold" /></Link><Link href="/#contact" className="button button-on-dark">Ask us <ArrowUpRight size={18} /></Link></div>
        <div className="hero-location"><MapPin size={17} weight="fill" /> Naya Nagar, Mira Road</div>
        <div className="hero-controls"><div className="slide-tabs" role="group" aria-label="Choose a slide">{slides.map((slide, index) => <button key={slide.name} className={active === index ? 'selected' : ''} aria-label={`Show slide ${index + 1}: ${slide.name}`} aria-pressed={active === index} onClick={() => changeSlide(index)}><span /></button>)}<span className="slide-count">{String(active + 1).padStart(2, '0')} / 03</span></div><div className="carousel-buttons"><button aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(!paused)} disabled={reduced}>{paused ? <Play size={16} weight="fill" /> : <Pause size={16} weight="fill" />}</button><button aria-label="Previous slide" onClick={() => changeSlide(active - 1)}><ArrowLeft size={19} weight="bold" /></button><button aria-label="Next slide" onClick={() => changeSlide(active + 1)}><ArrowRight size={19} weight="bold" /></button></div></div>
      </div>
    </div>
    <div className="hero-media">{slides.map((slide, index) => <figure key={slide.image} className={`hero-figure ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index}><Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 767px) 100vw, 50vw" priority={index === 0} quality={85} style={{ objectPosition: slide.position }} /><figcaption><strong>{slide.caption}</strong><small>{slide.note}</small></figcaption></figure>)}</div>
  </section></div>;
}
