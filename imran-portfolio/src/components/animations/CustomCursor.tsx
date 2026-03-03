'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(inner, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(outer, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, .hoverable');
      if (target) {
        outer.classList.add('hovering');
        gsap.to(outer, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
        gsap.to(inner, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, .hoverable');
      if (target && !target.contains(e.relatedTarget as Node)) {
        outer.classList.remove('hovering');
        gsap.to(outer, { scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onLeave = () => gsap.to([outer, inner], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([outer, inner], { opacity: 1, duration: 0.2 });

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="cursor-outer fixed top-0 left-0 pointer-events-none z-[9997] rounded-full w-10 h-10 border border-white/30 -translate-x-1/2 -translate-y-1/2 transition-[border-color,background-color] duration-300 mix-blend-difference [&.hovering]:border-accent [&.hovering]:bg-accent/[0.06]"
      />
      <div
        ref={innerRef}
        className="cursor-inner fixed top-0 left-0 pointer-events-none z-[9997] rounded-full w-2 h-2 bg-white -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
