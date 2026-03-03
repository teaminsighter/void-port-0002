'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/gsap';
import type { Project } from '@/types/project';
import Tag from '@/components/ui/Tag';
import StatusBadge from '@/components/ui/StatusBadge';
import DashboardMockup from './mockups/DashboardMockup';
import WaveformMockup from './mockups/WaveformMockup';
import ClipboardMockup from './mockups/ClipboardMockup';
import GridMonitorMockup from './mockups/GridMonitorMockup';
import TerminalMockup from './mockups/TerminalMockup';

const mockupComponents = {
  dashboard: DashboardMockup,
  waveform: WaveformMockup,
  clipboard: ClipboardMockup,
  'grid-monitor': GridMonitorMockup,
  terminal: TerminalMockup,
};

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const MockupComponent = mockupComponents[project.mockupType];

  useGSAP(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(cardRef.current.querySelector('.card-top'), { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    tl.fromTo(cardRef.current.querySelector('.card-title'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' }, '-=0.2');
    tl.fromTo(cardRef.current.querySelector('.card-desc'), { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
    tl.fromTo(cardRef.current.querySelectorAll('.card-tag'), { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }, '-=0.3');
    tl.fromTo(cardRef.current.querySelector('.card-visual'), { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.2');
    tl.fromTo(cardRef.current.querySelector('.card-link'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }, '-=0.5');

    // Parallax on visual inner
    const visualInner = cardRef.current.querySelector('.card-visual-inner');
    if (visualInner) {
      gsap.to(visualInner, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current.querySelector('.card-visual'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="mb-[120px] max-md:mb-20 relative">
      <div className="card-top flex items-center justify-between mb-5 max-md:flex-col max-md:items-start max-md:gap-2.5">
        <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[3px] font-medium" style={{ color: project.categoryColor }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: project.categoryColor }} />
          {project.category}
        </span>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <h3 className="card-title hoverable text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] mb-[clamp(1rem,2vh,1.5rem)]">
        {project.title}
      </h3>

      <p className="card-desc text-[17px] text-text-secondary leading-[1.7] max-w-[650px] mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-[clamp(2rem,4vh,3rem)]">
        {project.tags.map((tag) => (
          <span key={tag} className="card-tag">
            <Tag hoverColor={project.categoryColor}>{tag}</Tag>
          </span>
        ))}
      </div>

      <div
        className="card-visual w-full aspect-video max-md:aspect-[4/3] border border-white/5 relative overflow-hidden mb-6"
        style={{
          background: `linear-gradient(135deg, ${project.gradientColor} 0%, transparent 60%), linear-gradient(to bottom, #111, #1a1a1a)`,
        }}
      >
        <div className="card-visual-inner absolute inset-0 will-change-transform flex items-center justify-center">
          <MockupComponent />
        </div>
      </div>

      <a href={project.link || '#'} className="card-link hoverable inline-flex items-center gap-2 text-xs uppercase tracking-[3px] text-white font-medium relative float-right max-md:float-none group">
        View Project{' '}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
      </a>
      <div className="clear-both" />
    </div>
  );
}
