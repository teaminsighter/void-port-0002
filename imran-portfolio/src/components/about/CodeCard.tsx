'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { siteConfig } from '@/data/siteConfig';

export default function CodeCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    const lines = cardRef.current.querySelectorAll('.code-line');
    gsap.set(lines, { opacity: 0 });
  }, { scope: cardRef });

  return (
    <div ref={cardRef} className="bg-white/[0.03] border border-white/[0.08] p-[clamp(1.5rem,2.5vw,2.5rem)] relative shadow-[0_0_60px_rgba(74,222,128,0.06),0_0_120px_rgba(74,222,128,0.03)]">
      {/* macOS bar */}
      <div className="flex items-center gap-1.5 mb-6 pb-4 border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[11px] text-text-secondary font-mono tracking-[0.5px]">
          {siteConfig.codeCard.fileName}
        </span>
      </div>

      {/* Code content */}
      <div className="font-mono text-[clamp(0.72rem,0.85vw,0.85rem)] leading-[1.8]">
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">1</span>
          <span className="text-text-secondary">{'{'}</span>
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">2</span>
          {'  '}<span className="text-white">&quot;name&quot;</span>: <span className="text-accent">&quot;{siteConfig.name}&quot;</span>,
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">3</span>
          {'  '}<span className="text-white">&quot;role&quot;</span>: <span className="text-accent">&quot;{siteConfig.role}&quot;</span>,
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">4</span>
          {'  '}<span className="text-white">&quot;focus&quot;</span>: <span className="text-text-secondary">[</span>
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">5</span>
          {'    '}<span className="text-accent">&quot;LLMs&quot;</span>,
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">6</span>
          {'    '}<span className="text-accent">&quot;Multi-Agent Systems&quot;</span>,
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">7</span>
          {'    '}<span className="text-accent">&quot;Generative AI&quot;</span>
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">8</span>
          {'  '}<span className="text-text-secondary">]</span>,
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">9</span>
          {'  '}<span className="text-white">&quot;passion&quot;</span>: <span className="text-accent">&quot;Building the future&quot;</span>
        </span>
        <span className="code-line block whitespace-nowrap overflow-hidden">
          <span className="inline-block w-[2em] text-white/15 select-none">10</span>
          <span className="text-text-secondary">{'}'}</span>
          <span className="inline-block w-2 h-[1.1em] bg-accent align-text-bottom animate-blink" />
        </span>
      </div>
    </div>
  );
}
