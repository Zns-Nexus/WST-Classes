'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Pause, Play } from '@phosphor-icons/react';
import type { Variants } from 'motion/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { ShimmerLink } from '@/components/ui/shimmer-button';
import { TextAnimate } from '@/components/ui/text-animate';

const slides = [
  { image: '/images/hsc-demo-oar.jpg', position: '50% 8%', colour: 'var(--blue)', spark: 'var(--maroon)', alt: 'A Work Smart teacher explaining a calculation at the board during an HSC demo lecture', title: ['Big dreams.', 'Smarter preparation.'], description: 'SSC, HSC and entrance exam coaching that brings your next step closer. Right here in Mira Road.', name: 'Your journey starts here', caption: 'In class at Work Smart', note: 'From our HSC demo lecture' },
  { image: '/images/study.jpg', position: '38% 50%', colour: 'var(--maroon)', spark: 'var(--blue)', alt: 'A student studying an open textbook, illustrative photography', title: ['Build your basics.', 'Back your ambitions.'], description: 'Make sense of the chapter, not just the answer. Explore our school and higher secondary courses.', name: 'School & board preparation', caption: 'SSC & HSC · Maharashtra Board', note: 'Illustrative photography' },
  { image: '/images/computer-science.jpg', position: '62% 45%', colour: 'var(--navy)', spark: 'var(--maroon)', alt: 'Students collaborating on a laptop, illustrative photography', title: ['Think logically.', 'Create what’s next.'], description: 'Make Computer Science part of your HSC journey. Explore programming, computer systems and more.', name: 'HSC Computer Science', caption: 'HSC Computer Science', note: 'Illustrative photography' },
];

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
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

  return <div className="hero-wrap"><section className="hero-carousel" style={{ '--slide': current.colour, '--spark': current.spark } as CSSProperties} aria-roledescription="carousel" aria-label="Work Smart course highlights" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); changeSlide(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
    <div className="hero-content">
      <DotPattern width={22} height={22} cr={1.1} className="-z-10 text-white/20 [mask-image:radial-gradient(ellipse_75%_70%_at_25%_45%,#000_15%,transparent_75%)]" />
      <div className="hero-copy">
        <div className="hero-slides" aria-live={paused || reduced ? 'polite' : 'off'}>{slides.map((slide, index) => <div key={slide.image} className={`hero-slide ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index} inert={active !== index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}>
          {index === 0 ? <h1><HeroTitle key={active === index ? 'on' : 'off'} lines={slide.title} animate={active === index && !reduced} /></h1> : <h2><HeroTitle key={active === index ? 'on' : 'off'} lines={slide.title} animate={active === index && !reduced} /></h2>}
          <p>{slide.description}</p>
        </div>)}</div>
        <div className="hero-buttons"><ShimmerLink href="/#courses" className="button button-primary" background="#fff" shimmerColor="var(--spark)" shimmerSize="2px" shimmerDuration="2.6s">Find your course<ArrowRight size={18} weight="bold" /></ShimmerLink><Link href="/#contact" className="button button-on-dark">Talk to us <ArrowUpRight size={18} /></Link></div>
        <div className="hero-location"><MapPin size={17} weight="fill" /> Your neighbourhood classroom. Naya Nagar, Mira Road.</div>
        <div className="hero-controls"><div className="slide-tabs" role="group" aria-label="Choose a slide">{slides.map((slide, index) => <button key={slide.name} className={active === index ? 'selected' : ''} aria-label={`Show slide ${index + 1}: ${slide.name}`} aria-pressed={active === index} onClick={() => changeSlide(index)}><span /></button>)}<span className="slide-count">{String(active + 1).padStart(2, '0')} / 03</span></div><div className="carousel-buttons"><button aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(!paused)} disabled={reduced}>{paused ? <Play size={16} weight="fill" /> : <Pause size={16} weight="fill" />}</button><button aria-label="Previous slide" onClick={() => changeSlide(active - 1)}><ArrowLeft size={19} weight="bold" /></button><button aria-label="Next slide" onClick={() => changeSlide(active + 1)}><ArrowRight size={19} weight="bold" /></button></div></div>
      </div>
    </div>
    <div className="hero-media">{slides.map((slide, index) => <figure key={slide.image} className={`hero-figure ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index}><Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 767px) 100vw, 50vw" priority={index === 0} quality={85} style={{ objectPosition: slide.position }} /><figcaption><strong>{slide.caption}</strong><small>{slide.note}</small></figcaption></figure>)}</div>
  </section></div>;
}
