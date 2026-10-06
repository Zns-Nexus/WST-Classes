'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Pause, Play } from '@phosphor-icons/react';
import { DotPattern } from '@/components/ui/dot-pattern';
import { ShimmerLink } from '@/components/ui/shimmer-button';
import { TextAnimate } from '@/components/ui/text-animate';

const slides = [
  { image: '/images/hsc-demo-oar.jpg', position: '50% 6%', alt: 'A Work Smart teacher explaining a calculation at the board during an HSC demo lecture', title: ['Big dreams.', 'Smarter preparation.'], description: 'SSC, HSC and entrance exam coaching that brings your next step closer. Right here in Mira Road.', label: 'Find your course', href: '/#courses', name: 'Your journey starts here', caption: 'In class at Work Smart', note: 'From our HSC demo lecture' },
  { image: '/images/study.jpg', position: '38% 50%', alt: 'A student studying an open textbook, illustrative photography', title: ['Build your basics.', 'Back your ambitions.'], description: 'Make sense of the chapter, not just the answer. Explore our school and higher secondary courses.', label: 'Explore board courses', href: '/#courses', name: 'School & board preparation', caption: 'SSC & HSC · Maharashtra Board', note: 'Illustrative photography' },
  { image: '/images/computer-science.jpg', position: '62% 45%', alt: 'Students collaborating on a laptop, illustrative photography', title: ['Think logically.', 'Create what’s next.'], description: 'Make Computer Science part of your HSC journey. Explore programming, computer systems and more.', label: 'Explore Computer Science', href: '/courses/hsc-computer-science', name: 'HSC Computer Science', caption: 'HSC Computer Science', note: 'Illustrative photography' },
];

function HeroTitle({ lines, animate }: { lines: string[]; animate: boolean }) {
  const [first, second] = lines;
  if (!animate) return <>{first}<br /><span className="hero-accent">{second}</span></>;
  return <><span className="sr-only">{lines.join(' ')}</span><TextAnimate as="span" aria-hidden="true" accessible={false} startOnView={false} animation="blurInUp" by="word" duration={0.4}>{first}</TextAnimate><br /><TextAnimate as="span" aria-hidden="true" accessible={false} startOnView={false} animation="blurInUp" by="word" delay={0.25} duration={0.5} className="hero-accent">{second}</TextAnimate></>;
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

  return <div className="hero-wrap"><section className="hero-carousel container" aria-roledescription="carousel" aria-label="Work Smart course highlights" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); changeSlide(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}>
    <div className="hero-slides" aria-live={paused || reduced ? 'polite' : 'off'}>{slides.map((slide, index) => <div key={slide.image} className={`hero-slide hero-slide-${index + 1} ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index} inert={active !== index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.name}`}>
      <div className="hero-content"><DotPattern width={22} height={22} cr={1.1} className="-z-10 text-white/20 [mask-image:radial-gradient(ellipse_75%_70%_at_25%_45%,#000_15%,transparent_75%)]" /><div className="hero-copy">{index === 0 ? <h1><HeroTitle key={active === index ? 'on' : 'off'} lines={slide.title} animate={active === index && !reduced} /></h1> : <h2><HeroTitle key={active === index ? 'on' : 'off'} lines={slide.title} animate={active === index && !reduced} /></h2>}<p>{slide.description}</p><div className="hero-buttons"><ShimmerLink href={slide.href} className="button button-primary" background="#fff" shimmerColor={index === 1 ? "var(--blue)" : "var(--maroon)"} shimmerSize="2px" shimmerDuration="2.6s">{slide.label}<ArrowRight size={18} weight="bold" /></ShimmerLink><Link href="/#contact" className="button button-on-dark">Talk to us <ArrowUpRight size={18} /></Link></div><div className="hero-location"><MapPin size={17} weight="fill" /> Your neighbourhood classroom. Naya Nagar, Mira Road.</div></div></div>
      <figure className="hero-figure"><Image src={slide.image} alt={slide.alt} fill sizes="(max-width: 767px) 100vw, 640px" priority={index === 0} quality={85} style={{ objectPosition: slide.position }} /><figcaption><strong>{slide.caption}</strong><small>{slide.note}</small></figcaption></figure>
    </div>)}</div>
    <div className="hero-controls"><div className="slide-tabs" role="group" aria-label="Choose a slide">{slides.map((slide, index) => <button key={slide.name} className={active === index ? 'selected' : ''} aria-label={`Show slide ${index + 1}: ${slide.name}`} aria-pressed={active === index} onClick={() => changeSlide(index)}><span /></button>)}<span className="slide-count">{String(active + 1).padStart(2, '0')} / 03</span></div><div className="carousel-buttons"><button aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused} onClick={() => setPaused(!paused)} disabled={reduced}>{paused ? <Play size={16} weight="fill" /> : <Pause size={16} weight="fill" />}</button><button aria-label="Previous slide" onClick={() => changeSlide(active - 1)}><ArrowLeft size={19} weight="bold" /></button><button aria-label="Next slide" onClick={() => changeSlide(active + 1)}><ArrowRight size={19} weight="bold" /></button></div></div>
  </section></div>;
}
