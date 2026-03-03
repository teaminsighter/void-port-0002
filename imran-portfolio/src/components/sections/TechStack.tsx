'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { techCategories, exploringItems } from '@/data/techStack';
import ProficiencyDots from '@/components/ui/ProficiencyDots';

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const labelText = sectionRef.current.querySelector('.ts-label-text');
    const labelLine = sectionRef.current.querySelector('.ts-label-line');
    const heading = sectionRef.current.querySelector('.ts-heading');
    const subtext = sectionRef.current.querySelector('.ts-subtext');
    const categories = sectionRef.current.querySelectorAll('.ts-category');
    const exploreLine = sectionRef.current.querySelector('.ts-explore-line');
    const exploreTitle = sectionRef.current.querySelector('.ts-explore-title');
    const exploreItems = sectionRef.current.querySelectorAll('.ts-explore-item');

    gsap.set(categories, { y: 50, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    });

    tl.fromTo(labelText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    tl.fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.3');
    tl.fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, '-=0.3');
    tl.fromTo(subtext, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    tl.to(categories, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.2');

    // Per-category item animations
    categories.forEach((cat) => {
      const items = cat.querySelectorAll('.ts-item');
      const dots = cat.querySelectorAll('.ts-dot');
      const catTl = gsap.timeline({
        scrollTrigger: { trigger: cat, start: 'top 85%', toggleActions: 'play none none none' },
      });
      catTl.fromTo(items, { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, 0.3);
      catTl.fromTo(dots, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(2)' }, 0.5);
    });

    // Exploring section
    const exploreTl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current.querySelector('.ts-exploring'), start: 'top 85%', toggleActions: 'play none none none' },
    });
    exploreTl.fromTo(exploreLine, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' });
    exploreTl.fromTo(exploreTitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    exploreTl.fromTo(exploreItems, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' }, '-=0.2');
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="pt-[150px] px-[clamp(1.5rem,6vw,8vw)] relative" id="tech-stack">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vh,2.5rem)]">
          <span className="ts-label-text text-xs uppercase tracking-[4px] text-accent font-medium">04 / Tech Stack</span>
          <span className="ts-label-line w-[60px] h-px bg-accent origin-left" />
        </div>

        <h2 className="ts-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-5">
          <span className="block">Tools I Use to</span>
          <span className="block">Build the <span className="text-accent">Future</span></span>
        </h2>

        <p className="ts-subtext text-[17px] text-text-secondary max-w-[550px] leading-relaxed mb-[clamp(4rem,7vh,5rem)]">
          My toolkit spans AI/ML, full-stack development, cloud infrastructure, and product design.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {techCategories.map((cat) => (
            <div key={cat.title} className="ts-category">
              <div className="text-[13px] uppercase tracking-[3px] text-accent font-semibold mb-4">{cat.title}</div>
              <div className="w-full h-px bg-white/[0.08] mb-2" />
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="ts-item hoverable flex items-center justify-between py-3.5 border-b border-white/[0.04] relative transition-[padding-left] duration-300 hover:pl-3 group before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0 before:bg-accent before:transition-[width] before:duration-300 hover:before:w-0.5"
                >
                  <span className="text-[15px] text-text-secondary font-normal transition-colors duration-300 group-hover:text-white">
                    {item.name}
                  </span>
                  <span className="ts-dot">
                    <ProficiencyDots level={item.level} />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Currently Exploring */}
        <div className="ts-exploring mt-20">
          <div className="ts-explore-line w-full h-px bg-white/[0.08] mb-8 origin-center" />
          <div className="ts-explore-title text-[13px] uppercase tracking-[3px] text-accent font-semibold mb-6">
            Currently Exploring
          </div>
          <div className="flex flex-wrap items-center gap-0 animate-explore-pulse max-sm:flex-wrap max-sm:gap-y-2">
            {exploringItems.map((item, i) => (
              <span key={item} className="contents">
                <span className="ts-explore-item text-[15px] text-white whitespace-nowrap px-4">{item}</span>
                {i < exploringItems.length - 1 && (
                  <span className="ts-explore-item text-accent text-[8px] opacity-60">●</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
