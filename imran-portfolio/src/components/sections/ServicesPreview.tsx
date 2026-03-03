'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { services, marqueeItems } from '@/data/services';
import Tag from '@/components/ui/Tag';
import Marquee from '@/components/ui/Marquee';

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const labelText = sectionRef.current.querySelector('.srv-label-text');
    const labelLine = sectionRef.current.querySelector('.srv-label-line');
    const heading = sectionRef.current.querySelector('.srv-heading');
    const subtext = sectionRef.current.querySelector('.srv-subtext');
    const items = sectionRef.current.querySelectorAll('.srv-item');
    const marquee = sectionRef.current.querySelector('.srv-marquee');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
    });

    tl.fromTo(labelText, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    tl.fromTo(labelLine, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.3');
    tl.fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, '-=0.3');
    tl.fromTo(subtext, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');

    items.forEach((item, i) => {
      tl.fromTo(item, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, i === 0 ? '-=0.2' : '-=0.5');
    });

    tl.call(() => setActiveIndex(0));
    tl.fromTo(marquee, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
  }, { scope: sectionRef });

  const toggleService = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={sectionRef} className="pt-[150px] px-[clamp(1.5rem,6vw,8vw)] relative" id="services">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vh,2.5rem)]">
          <span className="srv-label-text text-xs uppercase tracking-[4px] text-accent font-medium">02 / What I Do</span>
          <span className="srv-label-line w-[60px] h-px bg-accent origin-left" />
        </div>

        <h2 className="srv-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-5">
          Services &amp; Expertise
        </h2>

        <p className="srv-subtext text-[17px] text-text-secondary max-w-[550px] leading-relaxed mb-[clamp(3rem,6vh,5rem)]">
          I help companies build AI-powered products from zero to production.
        </p>

        <div className="border-b border-white/[0.08]">
          {services.map((service, i) => (
            <div key={service.num} className="srv-item border-t border-white/[0.08] relative group">
              {/* Hover glow */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div
                className="hoverable flex items-center justify-between py-[35px] max-md:py-[25px] cursor-pointer select-none"
                onClick={() => toggleService(i)}
              >
                <div className="flex items-center gap-[30px] max-md:gap-0">
                  <span className="text-sm font-mono text-accent min-w-[28px] max-md:hidden">{service.num}</span>
                  <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-white transition-colors duration-300">
                    {service.title}
                  </span>
                </div>
                <div className="w-7 h-7 relative flex-shrink-0">
                  <span className="absolute w-full h-[1.5px] bg-text-secondary top-1/2 left-0 -translate-y-1/2 transition-colors duration-300 group-hover:bg-white" />
                  <span className={`absolute w-[1.5px] h-full bg-text-secondary left-1/2 top-0 -translate-x-1/2 transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:bg-white ${
                    activeIndex === i ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>

              <div
                className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]"
                style={{ height: activeIndex === i ? 'auto' : 0 }}
              >
                <div className={`pb-[35px] pl-[58px] max-md:pl-0 transition-all duration-400 ${
                  activeIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'
                }`}>
                  <p className="text-base text-text-secondary leading-[1.7] max-w-[600px] mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="srv-marquee">
          <Marquee items={marqueeItems} />
        </div>
      </div>
    </section>
  );
}
