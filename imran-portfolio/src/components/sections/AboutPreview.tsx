'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { siteConfig } from '@/data/siteConfig';
import CodeCard from '@/components/about/CodeCard';
import StatCounter from '@/components/about/StatCounter';
import FloatingBadge from '@/components/about/FloatingBadge';

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const labelLine = sectionRef.current.querySelector('.about-label-line');
    const labelText = sectionRef.current.querySelector('.about-label-text');
    const words = sectionRef.current.querySelectorAll('.about-word');
    const descPs = sectionRef.current.querySelectorAll('.about-desc-p');
    const stats = sectionRef.current.querySelectorAll('.about-stat');
    const card = sectionRef.current.querySelector('.about-card');
    const codeLines = sectionRef.current.querySelectorAll('.code-line');
    const badges = sectionRef.current.querySelectorAll('.about-badge');
    const rightCol = sectionRef.current.querySelector('.about-right');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
    });

    tl.fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' });
    tl.fromTo(labelText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    tl.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.05, ease: 'power4.out' }, '-=0.2');
    tl.fromTo(descPs, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(stats, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(card, { y: 60, opacity: 0, rotateY: 5 }, { y: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' }, '-=1.5');
    tl.to(codeLines, { opacity: 1, duration: 0.15, stagger: 0.1, ease: 'none' }, '-=0.4');
    tl.to(badges, { opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, '-=0.3');

    // Parallax on right column
    gsap.to(rightCol, {
      y: -40, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }, { scope: sectionRef });

  const statementWords = siteConfig.aboutStatement.split(/\s+/);

  return (
    <section ref={sectionRef} className="min-h-screen py-[clamp(6rem,12vh,10rem)] px-[clamp(1.5rem,6vw,8vw)] relative" id="about">
      <div className="max-w-[1200px] mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-[clamp(3rem,6vh,5rem)]">
          <span className="about-label-line w-10 h-px bg-accent origin-left" />
          <span className="about-label-text text-xs uppercase tracking-[4px] text-text-secondary font-medium">About Me</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,6vw,6rem)] items-start">
          {/* Left */}
          <div className="flex flex-col gap-[clamp(2rem,4vh,3rem)]">
            <h2 className="text-[clamp(1.8rem,3.2vw,3rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              {statementWords.map((word, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden align-bottom pb-[0.05em]">
                    <span className={`about-word inline-block will-change-transform ${siteConfig.aboutAccentWords.includes(word) ? 'text-accent' : ''}`}>
                      {word}
                    </span>
                  </span>
                  {i < statementWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>

            <div className="flex flex-col gap-5">
              {siteConfig.aboutDescriptions.map((p, i) => (
                <p key={i} className="about-desc-p text-[clamp(0.95rem,1.1vw,1.05rem)] text-text-secondary leading-[1.7]">{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8 max-md:gap-4 mt-4">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="about-right relative mt-8 md:mt-0" style={{ perspective: '1000px' }}>
            <div className="about-card">
              <CodeCard />
            </div>
            {siteConfig.floatingBadges.map((badge, i) => (
              <span key={badge} className="about-badge opacity-0">
                <FloatingBadge label={badge} position={(i + 1) as 1 | 2 | 3} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
