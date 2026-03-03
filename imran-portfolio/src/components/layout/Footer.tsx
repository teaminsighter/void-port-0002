'use client';

import { siteConfig } from '@/data/siteConfig';

export default function Footer() {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="px-[clamp(1.5rem,6vw,8vw)] py-10 border-t border-white/[0.06] flex items-center justify-between max-md:flex-col max-md:gap-4 max-md:text-center max-md:py-[30px]">
      <span className="text-xs uppercase tracking-[2px] text-text-secondary">
        &copy; {siteConfig.footerYear} {siteConfig.name}
      </span>
      <span className="text-[11px] uppercase tracking-[2px] text-white/25">
        {siteConfig.footerTagline}
      </span>
      <a
        href="#"
        className="hoverable text-xs uppercase tracking-[2px] text-text-secondary hover:text-white hover:-translate-y-0.5 transition-all duration-300 inline-block"
        onClick={handleBackToTop}
      >
        Back to Top &uarr;
      </a>
    </footer>
  );
}
