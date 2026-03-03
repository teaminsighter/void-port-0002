'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { siteConfig } from '@/data/siteConfig';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const textContainer = textRef.current;
    if (!container || !textContainer) return;

    const name = `${siteConfig.firstName} ${siteConfig.lastName}`;
    textContainer.innerHTML = '';

    const letterSpans: HTMLSpanElement[] = [];

    name.split('').forEach((char) => {
      const span = document.createElement('span');
      if (char === ' ') {
        span.className = 'inline-block';
        span.style.width = '0.5em';
        span.innerHTML = '&nbsp;';
      } else {
        span.className = 'preloader-letter inline-block';
        span.textContent = char;
        letterSpans.push(span);
      }
      textContainer.appendChild(span);
    });

    const top = container.querySelector('.preloader-top') as HTMLElement;
    const bottom = container.querySelector('.preloader-bottom') as HTMLElement;

    // Set initial state
    gsap.set(letterSpans, { y: 40, opacity: 0 });

    const tl = gsap.timeline();

    // Letters stagger in
    tl.to(letterSpans, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' });
    // Pause
    tl.to({}, { duration: 0.5 });
    // Letters stagger out
    tl.to(letterSpans, { y: -40, opacity: 0, duration: 0.5, stagger: 0.03, ease: 'power3.in' });
    // Split curtain
    tl.to(top, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.1');
    tl.to(bottom, { yPercent: 100, duration: 0.8, ease: 'power4.inOut' }, '<');
    // Done
    tl.call(() => {
      document.body.classList.add('loaded');
      setVisible(false);
      onComplete();
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg">
      <div className="preloader-top absolute left-0 right-0 top-0 h-1/2 bg-bg will-change-transform" />
      <div className="preloader-bottom absolute left-0 right-0 bottom-0 h-1/2 bg-bg will-change-transform" />
      <div
        ref={textRef}
        className="relative z-[2] flex gap-0 text-[clamp(1.5rem,3vw,3rem)] font-extrabold uppercase tracking-[0.3em] text-white"
        aria-label={`${siteConfig.firstName} ${siteConfig.lastName}`}
      />
    </div>
  );
}
