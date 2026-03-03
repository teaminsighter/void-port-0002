'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const labelText = sectionRef.current.querySelector('.proj-label-text');
    const labelLine = sectionRef.current.querySelector('.proj-label-line');
    const heading = sectionRef.current.querySelector('.proj-heading');
    const subtext = sectionRef.current.querySelector('.proj-subtext');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    });

    tl.fromTo(labelText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    tl.fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.3');
    tl.fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, '-=0.3');
    tl.fromTo(subtext, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    // Divider animations
    sectionRef.current.querySelectorAll('.proj-divider').forEach((div) => {
      const line = div.querySelector('.divider-line');
      const num = div.querySelector('.divider-num');
      gsap.timeline({
        scrollTrigger: { trigger: div, start: 'top 85%', toggleActions: 'play none none none' },
      })
        .fromTo(line!, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' })
        .fromTo(num!, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2');
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-[150px] px-[clamp(1.5rem,6vw,8vw)] relative" id="projects">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vh,2.5rem)]">
          <span className="proj-label-text text-xs uppercase tracking-[4px] text-accent font-medium">03 / Selected Work</span>
          <span className="proj-label-line w-[60px] h-px bg-accent origin-left" />
        </div>

        <h2 className="proj-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-5">
          Featured Projects
        </h2>

        <p className="proj-subtext text-[17px] text-text-secondary max-w-[550px] leading-relaxed mb-[clamp(4rem,8vh,6rem)]">
          AI-powered products and platforms I&apos;ve designed, built, and shipped.
        </p>

        {projects.map((project, i) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
            {i < projects.length - 1 && (
              <div className="proj-divider flex flex-col items-center gap-3 mb-[120px] max-md:mb-20">
                <div className="divider-line w-[100px] h-px bg-white/10 origin-center" />
                <span className="divider-num text-[11px] font-mono text-text-secondary tracking-[2px]">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
