import { cn } from '@/lib/utils';

interface FloatingBadgeProps {
  label: string;
  position: 1 | 2 | 3;
}

const positions = {
  1: 'top-[-14px] right-[-10px] animate-float-badge',
  2: 'bottom-[20%] left-[-20px] animate-float-badge [animation-delay:-1.2s] max-md:left-auto max-md:right-[-10px] max-md:bottom-[30%]',
  3: 'bottom-[-14px] right-[15%] animate-float-badge [animation-delay:-2.5s]',
};

export default function FloatingBadge({ label, position }: FloatingBadgeProps) {
  return (
    <span
      className={cn(
        'absolute text-[10px] uppercase tracking-[1.5px] text-text-secondary border border-white/[0.12] px-3.5 py-1.5 bg-bg/80 backdrop-blur-[8px] whitespace-nowrap',
        positions[position]
      )}
    >
      {label}
    </span>
  );
}
