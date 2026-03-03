import type { ProjectStatus } from '@/types/project';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ProjectStatus;
  label: string;
}

const statusStyles: Record<ProjectStatus, string> = {
  live: 'border-accent text-accent',
  beta: 'border-[#FBBF24] text-[#FBBF24]',
  dev: 'border-text-secondary text-text-secondary',
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 px-4 py-1.5 rounded-[20px] text-[11px] uppercase tracking-[1.5px] font-medium border',
        statusStyles[status]
      )}
    >
      {status === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      )}
      {label}
    </span>
  );
}
