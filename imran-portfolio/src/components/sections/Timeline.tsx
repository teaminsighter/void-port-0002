'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import { timelineEntries } from '@/data/timeline';

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const labelText = sectionRef.current.querySelector('.tl-label-text');
    const labelLine = sectionRef.current.querySelector('.tl-label-line');
    const heading = sectionRef.current.querySelector('.tl-heading');
    const subtext = sectionRef.current.querySelector('.tl-subtext');
    const progress = sectionRef.current.querySelector('.tl-progress');
    const dots = sectionRef.current.querySelectorAll('.tl-dot');
    const entries = sectionRef.current.querySelectorAll('.tl-entry');

    // Header entrance
    const headerTl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    });
    headerTl.fromTo(labelText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    headerTl.fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.3');
    headerTl.fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, '-=0.3');
    headerTl.fromTo(subtext, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    // Progress line
    gsap.fromTo(progress, { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current.querySelector('.tl-track'), start: 'top 60%', end: 'bottom 80%', scrub: 1 },
    });

    // Dot activation
    dots.forEach((dot) => {
      const pulseEl = dot.querySelector('.tl-dot-pulse');
      ScrollTrigger.create({
        trigger: dot, start: 'top 65%',
        onEnter: () => {
          dot.classList.add('active');
          gsap.fromTo(pulseEl, { scale: 1, opacity: 0.8 }, { scale: 3.5, opacity: 0, duration: 0.7, ease: 'power2.out' });
        },
      });
    });

    // Card entry animations
    entries.forEach((entry) => {
      const side = entry.getAttribute('data-side');
      const card = entry.querySelector('.tl-card');
      const year = entry.querySelector('.tl-year');
      const tag = entry.querySelector('.tl-tag');
      const connector = entry.querySelector('.tl-connector');
      const xFrom = side === 'left' ? -60 : 60;

      const cardTl = gsap.timeline({
        scrollTrigger: { trigger: entry, start: 'top 75%', toggleActions: 'play none none none' },
      });

      cardTl.fromTo(year!, { opacity: 0 }, { opacity: 0.06, duration: 0.6, ease: 'power2.out' });
      if (connector) cardTl.fromTo(connector, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, '-=0.3');
      cardTl.fromTo(card!, { x: xFrom, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
      cardTl.fromTo(tag!, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.4');
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-[150px] pb-20 px-[clamp(1.5rem,6vw,8vw)] relative" id="timeline">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vh,2.5rem)]">
          <span className="tl-label-text text-xs uppercase tracking-[4px] text-accent font-medium">05 / Journey</span>
          <span className="tl-label-line w-[60px] h-px bg-accent origin-left" />
        </div>

        <h2 className="tl-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-5">
          <span className="block">The Path That</span>
          <span className="block">Led Me <span className="text-accent">Here</span></span>
        </h2>

        <p className="tl-subtext text-[17px] text-text-secondary max-w-[550px] leading-relaxed mb-[clamp(4rem,8vh,6rem)]">
          From writing my first line of code to building AI systems — every step shaped how I think and build today.
        </p>

        <div className="tl-track relative pb-10">
          {/* Center lines */}
          <div className="absolute left-1/2 max-md:left-4 top-0 bottom-0 w-px -translate-x-1/2 max-md:translate-x-0 bg-white/[0.07]" />
          <div className="tl-progress absolute left-1/2 max-md:left-4 top-0 bottom-0 w-px -translate-x-1/2 max-md:translate-x-0 bg-accent origin-top z-[1]" style={{ transform: 'scaleY(0)' }} />

          {timelineEntries.map((entry, i) => (
            <div
              key={entry.year}
              className={`tl-entry flex items-start relative pb-20 max-md:pb-[50px] last:pb-0 ${
                entry.side === 'left' ? 'flex-row' : 'flex-row'
              }`}
              data-side={entry.side}
            >
              {/* Left half */}
              <div className={`w-1/2 max-md:hidden relative ${
                entry.side === 'left' ? 'pr-[60px] text-right flex flex-col items-end' : ''
              }`}>
                {entry.side === 'left' && (
                  <>
                    <div className="tl-connector absolute top-[13px] right-[-40px] w-10 h-px bg-white/10 origin-left" />
                    <div className="tl-card relative py-[30px]">
                      {entry.isPresent ? (
                        <div className="border-r-2 border-accent pr-6">
                          <TimelineCardContent entry={entry} />
                        </div>
                      ) : (
                        <TimelineCardContent entry={entry} />
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Dot */}
              <div className="tl-dot absolute left-1/2 max-md:left-4 top-2 -translate-x-1/2 max-md:translate-x-0 z-[2] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border-2 border-white/20 bg-bg relative flex items-center justify-center transition-all duration-400 [&.active]:border-accent [&.active]:bg-accent">
                  <span className="w-1 h-1 rounded-full bg-bg scale-0 transition-transform duration-400 [.active_&]:scale-100" style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }} />
                  <span className="tl-dot-pulse absolute w-3 h-3 rounded-full border border-accent opacity-0 pointer-events-none" />
                </div>
              </div>

              {/* Right half */}
              <div className={`w-1/2 max-md:w-full max-md:pl-[50px] relative ${
                entry.side === 'right' ? 'pl-[60px] max-md:pl-[50px]' : ''
              }`}>
                {entry.side === 'right' && (
                  <>
                    <div className="tl-connector absolute top-[13px] left-[-40px] max-md:hidden w-10 h-px bg-white/10 origin-right" />
                    <div className="tl-card relative py-[30px]">
                      {entry.isPresent ? (
                        <div className="border-l-2 border-accent pl-6">
                          <TimelineCardContent entry={entry} />
                        </div>
                      ) : (
                        <TimelineCardContent entry={entry} />
                      )}
                    </div>
                  </>
                )}
                {/* Mobile: show left-side entries on right */}
                {entry.side === 'left' && (
                  <div className="hidden max-md:block">
                    <div className="tl-card relative py-[30px]">
                      {entry.isPresent ? (
                        <div className="border-l-2 border-accent pl-6">
                          <TimelineCardContent entry={entry} />
                        </div>
                      ) : (
                        <TimelineCardContent entry={entry} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCardContent({ entry }: { entry: (typeof timelineEntries)[0] }) {
  return (
    <>
      <div className="tl-year text-[clamp(3rem,5vw,4.5rem)] max-md:text-[clamp(2.5rem,10vw,3.5rem)] font-extrabold text-white/[0.06] leading-none tracking-[-0.02em] -mb-2.5 relative z-0">
        {entry.year}
      </div>
      <span className={`tl-tag inline-block border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-accent mb-3 relative z-[1] ${
        entry.isPresent ? 'border-accent shadow-[0_0_15px_rgba(74,222,128,0.15)]' : ''
      }`}>
        {entry.tag}
      </span>
      <h3 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold text-white mb-2.5 relative z-[1]">
        {entry.title}
      </h3>
      <p className="text-[15px] text-text-secondary leading-[1.7] relative z-[1] max-w-[420px]">
        {entry.description}
      </p>
    </>
  );
}
