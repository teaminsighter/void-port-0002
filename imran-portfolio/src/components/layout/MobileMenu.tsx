'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { mobileNavLinks } from '@/data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!menuRef.current) return;
    const links = linksRef.current.filter(Boolean);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(links, { opacity: 0, y: -20, duration: 0.3, stagger: 0.04, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-[99] bg-bg flex flex-col items-center justify-center gap-10 transition-[opacity,visibility] duration-400 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {mobileNavLinks.map((link, i) => (
        <Link
          key={link.label}
          href={link.href}
          ref={(el) => { if (el) linksRef.current[i] = el; }}
          className="hoverable text-[clamp(1.8rem,5vw,3rem)] font-semibold uppercase tracking-[0.1em] text-white opacity-0"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
