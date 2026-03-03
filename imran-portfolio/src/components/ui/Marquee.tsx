interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const content = items.map((item, i) => (
    <span key={i} className="contents">
      <span className="text-[clamp(1rem,2vw,1.4rem)] font-semibold uppercase tracking-[3px] text-white/[0.12] whitespace-nowrap px-5">
        {item}
      </span>
      <span className="text-accent text-[clamp(0.6rem,1vw,0.8rem)] flex-shrink-0 opacity-60">●</span>
    </span>
  ));

  return (
    <div className="w-full overflow-hidden py-[30px] border-t border-b border-white/5 mt-[clamp(4rem,8vh,6rem)] group">
      <div className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused]">
        <div className="flex items-center flex-shrink-0">{content}</div>
        <div className="flex items-center flex-shrink-0" aria-hidden="true">{content}</div>
      </div>
    </div>
  );
}
