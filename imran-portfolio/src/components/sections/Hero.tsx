'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { siteConfig } from '@/data/siteConfig';
import Button from '@/components/ui/Button';
import { useLoaded } from '@/components/animations/ClientProviders';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const loaded = useLoaded();
  const hasAnimated = useRef(false);

  // Run entrance animation AFTER preloader completes
  useEffect(() => {
    if (!loaded || hasAnimated.current || !sectionRef.current) return;
    hasAnimated.current = true;

    const section = sectionRef.current;
    const lines = section.querySelectorAll('.hero-line');
    const eyebrowLine = section.querySelector('.eyebrow-line') as HTMLElement;
    const eyebrowText = section.querySelector('.eyebrow-text') as HTMLElement;
    const descWords = section.querySelectorAll('.desc-word');
    const btns = section.querySelectorAll('.hero-btn');
    const scrollIndicator = section.querySelector('.scroll-indicator') as HTMLElement;
    const scrollDot = section.querySelector('.scroll-dot') as HTMLElement;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1. Eyebrow: line draws in, then text fades up
    tl.fromTo(eyebrowLine,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }
    );
    tl.fromTo(eyebrowText,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // 2. Heading letters per line, overlapping start
    lines.forEach((line, i) => {
      const chars = line.querySelectorAll('.hero-char');
      tl.fromTo(chars,
        { y: '120%', opacity: 0, rotateX: 90 },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power4.out',
        },
        i === 0 ? '-=0.2' : `-=${0.8 - 0.15}`
      );
    });

    // 3. Description words
    tl.fromTo(descWords,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.02, ease: 'power3.out' },
      '-=0.5'
    );

    // 4. CTA Buttons
    tl.fromTo(btns,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    );

    // 5. Scroll indicator
    tl.fromTo(scrollIndicator,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Scroll dot looping animation
    tl.call(() => {
      gsap.to(scrollDot, {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.in',
        repeat: -1,
        repeatDelay: 0.4,
      });
    });

    // ---- Parallax on scroll ----
    const heading = section.querySelector('.hero-heading');
    gsap.to(heading, {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to([section.querySelector('.hero-desc'), section.querySelector('.hero-ctas')], {
      y: -60,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: '20% top',
        end: '60% top',
        scrub: true,
      },
    });

    // Fade scroll indicator on scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '15% top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(scrollIndicator, { opacity: 1 - self.progress * 3 });
      },
    });

    return () => {
      tl.kill();
    };
  }, [loaded]);

  const descWords = siteConfig.heroDescription.split(' ');

  // Before preloader finishes, hide hero content via CSS opacity
  // GSAP fromTo will handle the animation from hidden → visible
  const hiddenStyle = !loaded ? { opacity: 0 } : undefined;

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-[clamp(1.5rem,6vw,8vw)] relative overflow-hidden" id="hero">
      <div className="flex flex-col items-center text-center max-w-[1200px] w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-[clamp(2rem,4vh,3.5rem)]">
          <span className="eyebrow-line w-10 h-px bg-accent origin-left will-change-transform" style={hiddenStyle} />
          <span className="eyebrow-text text-xs uppercase tracking-[4px] text-text-secondary font-medium will-change-[transform,opacity]" style={hiddenStyle}>
            {siteConfig.eyebrow}
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-heading mb-[clamp(1.5rem,3vh,2.5rem)] will-change-transform" aria-label="Building the future with artificial intelligence">
          {siteConfig.heroHeading.map((line, i) => (
            <span
              key={i}
              className={`hero-line block overflow-hidden text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] max-md:tracking-[-0.01em] ${line.accent ? 'text-accent' : ''}`}
              style={{ perspective: '600px' }}
            >
              {line.text.split('').map((char, j) => (
                <span
                  key={j}
                  className="hero-char inline-block will-change-[transform,opacity]"
                  style={{ opacity: 0, transform: 'translateY(120%) rotateX(90deg)' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="hero-desc max-w-[500px] mb-[clamp(2rem,4vh,3rem)] overflow-hidden">
          {descWords.map((word, i) => (
            <span key={i} className="desc-word inline-block text-[clamp(1rem,1.2vw,1.125rem)] text-text-secondary leading-relaxed will-change-[transform,opacity] mr-[0.3em]" style={{ opacity: 0 }}>
              {word}
            </span>
          ))}
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas flex items-center gap-4 flex-wrap justify-center mb-[clamp(3rem,6vh,5rem)] max-md:flex-col max-md:w-full">
          <span className="hero-btn" style={{ opacity: 0 }}><Button href="/#projects">View My Work</Button></span>
          <span className="hero-btn" style={{ opacity: 0 }}><Button href="/#contact" variant="secondary">Get In Touch</Button></span>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-[clamp(1.5rem,3vh,2.5rem)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <div className="w-px h-[60px] bg-white/15 relative overflow-hidden">
            <div className="scroll-dot absolute top-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white will-change-[transform,opacity]" />
          </div>
          <span className="text-[10px] uppercase tracking-[3px] text-text-secondary">Scroll</span>
        </div>
      </div>
    </section>
  );
}
