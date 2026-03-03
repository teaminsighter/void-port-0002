'use client';

interface TagProps {
  children: React.ReactNode;
  hoverColor?: string;
}

export default function Tag({ children, hoverColor }: TagProps) {
  return (
    <span
      className="text-[11px] uppercase tracking-[1.5px] text-text-secondary border border-white/10 px-3.5 py-[5px] transition-all duration-300 hover:border-white/30 hover:text-white"
      onMouseEnter={hoverColor ? (e) => {
        (e.target as HTMLElement).style.borderColor = hoverColor;
        (e.target as HTMLElement).style.color = hoverColor;
      } : undefined}
      onMouseLeave={hoverColor ? (e) => {
        (e.target as HTMLElement).style.borderColor = '';
        (e.target as HTMLElement).style.color = '';
      } : undefined}
    >
      {children}
    </span>
  );
}
