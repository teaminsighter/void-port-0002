'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { navLinks } from '@/data/navigation';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 80) setScrolled(true);
      else setScrolled(false);

      if (currentY > lastScrollY.current + 50 && currentY > 200) setHidden(true);
      else if (currentY < lastScrollY.current - 20) setHidden(false);

      lastScrollY.current = currentY;
      ticking = false;
    };

    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] px-[clamp(1.5rem,4vw,4rem)] h-[72px] flex items-center justify-between will-change-transform transition-all duration-300 border-b border-transparent
          ${scrolled ? 'bg-bg/80 backdrop-blur-[20px] border-white/[0.08]' : ''}
          ${hidden ? '-translate-y-full' : ''}
        `}
      >
        <Link href="/" className="hoverable flex items-baseline gap-[0.15em] text-[1.1rem] tracking-[0.04em] z-[101]">
          <span className="font-bold">IMRAN</span>
          <span className="font-light">HOSSAIN</span>
        </Link>

        <ul className="hidden md:flex items-center gap-[clamp(1.5rem,3vw,3rem)] list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="hoverable text-xs font-medium uppercase tracking-[2px] text-text-secondary hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-[width] after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="hoverable flex md:hidden flex-col justify-center items-center w-8 h-8 z-[101] relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-white transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
              menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1'
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
              menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1'
            }`}
          />
        </button>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
