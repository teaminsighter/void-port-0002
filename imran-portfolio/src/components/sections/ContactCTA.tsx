'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { siteConfig } from '@/data/siteConfig';
import { socialLinks } from '@/data/socialLinks';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [strokeFilled, setStrokeFilled] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const dividerLine = sectionRef.current.querySelector('.ct-divider-line');
    const dividerText = sectionRef.current.querySelector('.ct-divider-text');
    const labelLineL = sectionRef.current.querySelector('.ct-label-line-l');
    const labelLineR = sectionRef.current.querySelector('.ct-label-line-r');
    const labelText = sectionRef.current.querySelector('.ct-label-text');
    const headingLines = sectionRef.current.querySelectorAll('.ct-heading-line');
    const desc = sectionRef.current.querySelector('.ct-desc');
    const email = sectionRef.current.querySelector('.ct-email');
    const socials = sectionRef.current.querySelectorAll('.ct-social');
    const avail = sectionRef.current.querySelector('.ct-avail');
    const shimmer = sectionRef.current.querySelector('.ct-shimmer');

    // Divider timeline
    const divTl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current.querySelector('.ct-divider'), start: 'top 85%', toggleActions: 'play none none none' },
    });
    divTl.fromTo(dividerLine, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' });
    divTl.fromTo(dividerText, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');

    // Main contact timeline
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current.querySelector('.ct-section'), start: 'top 70%', toggleActions: 'play none none none' },
    });

    tl.fromTo(labelLineL, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' });
    tl.fromTo(labelLineR, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }, '<');
    tl.fromTo(labelText, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.3');

    headingLines.forEach((line, i) => {
      const chars = line.querySelectorAll('.ct-char');
      tl.fromTo(chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: 'power4.out' },
        i === 0 ? '-=0.1' : `-=${0.8 - 0.15}`
      );
    });

    // Shimmer
    tl.call(() => {
      gsap.to(shimmer, { x: '200%', duration: 0.8, ease: 'power2.inOut', delay: 0.2 });
    });

    tl.fromTo(desc, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3');
    tl.fromTo(email, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    tl.fromTo(socials, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' }, '-=0.2');
    tl.fromTo(avail, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.1');
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef}>
      {/* Top divider */}
      <div className="ct-divider py-[60px] px-[clamp(1.5rem,6vw,8vw)] text-center">
        <div className="ct-divider-text text-xs uppercase tracking-[5px] text-text-secondary mb-[30px]">
          <span className="text-accent text-[8px] align-middle mx-3">●</span>
          Got a project in mind?
          <span className="text-accent text-[8px] align-middle mx-3">●</span>
        </div>
        <div className="ct-divider-line w-full h-px bg-white/[0.08] origin-center" />
      </div>

      {/* Contact section */}
      <section className="ct-section min-h-screen flex items-center justify-center py-20 px-[clamp(1.5rem,6vw,8vw)] text-center relative" id="contact">
        <div className="flex flex-col items-center max-w-[1000px] w-full">
          {/* Label */}
          <div className="flex items-center gap-5 mb-[clamp(2.5rem,5vh,4rem)]">
            <span className="ct-label-line-l w-[50px] h-px bg-accent origin-right" />
            <span className="ct-label-text text-xs uppercase tracking-[4px] text-accent font-medium whitespace-nowrap">
              06 / Let&apos;s Connect
            </span>
            <span className="ct-label-line-r w-[50px] h-px bg-accent origin-left" />
          </div>

          {/* Heading */}
          <h2 className="leading-[0.95] text-center mb-0">
            {siteConfig.contactHeading.map((line, i) => (
              <span
                key={i}
                className={`ct-heading-line block text-[clamp(3rem,9vw,10rem)] max-md:text-[clamp(2.5rem,12vw,5rem)] font-black uppercase tracking-[-0.02em] overflow-hidden relative ${
                  line.stroke
                    ? `text-transparent [-webkit-text-stroke:1.5px_var(--text-primary)] max-md:[-webkit-text-stroke:1px_var(--text-primary)] transition-all duration-500 ${strokeFilled ? '[color:var(--accent)] [-webkit-text-stroke-color:var(--accent)]' : ''}`
                    : ''
                }`}
                style={{ perspective: '600px' }}
                onMouseEnter={line.stroke ? () => setStrokeFilled(true) : undefined}
                onMouseLeave={line.stroke ? () => setStrokeFilled(false) : undefined}
              >
                {line.text.split('').map((char, j) => (
                  <span key={j} className="ct-char inline-block will-change-transform">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
                {line.stroke && (
                  <span className="ct-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full pointer-events-none" />
                )}
              </span>
            ))}
          </h2>

          {/* Description */}
          <p className="ct-desc text-lg text-text-secondary max-w-[550px] text-center leading-[1.7] mt-10">
            {siteConfig.contactDescription}
          </p>

          {/* Email */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="ct-email hoverable text-[clamp(1.2rem,3vw,2rem)] text-white font-medium mt-[50px] relative inline-block transition-colors duration-300 hover:text-accent after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-400 hover:after:scale-x-100"
          >
            {siteConfig.email}
          </a>

          {/* Social links */}
          <div className="flex items-center flex-wrap justify-center mt-[50px]">
            {socialLinks.map((link, i) => (
              <span key={link.label} className="contents">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ct-social hoverable text-xs uppercase tracking-[3px] text-text-secondary px-4 py-1.5 transition-all duration-300 hover:text-white hover:-translate-y-0.5 inline-block"
                >
                  {link.label}
                </a>
                {i < socialLinks.length - 1 && (
                  <span className="ct-social text-accent text-[8px] opacity-50">●</span>
                )}
              </span>
            ))}
          </div>

          {/* Availability */}
          <div className="ct-avail mt-10">
            <AvailabilityBadge />
          </div>
        </div>
      </section>
    </div>
  );
}
