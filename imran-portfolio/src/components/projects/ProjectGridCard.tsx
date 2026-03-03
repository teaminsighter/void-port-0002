import Link from 'next/link';
import type { Project } from '@/types/project';
import Tag from '@/components/ui/Tag';
import StatusBadge from '@/components/ui/StatusBadge';

export default function ProjectGridCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}/`}
      className="hoverable group block border border-white/[0.06] p-6 hover:border-white/[0.15] transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] uppercase tracking-[3px] font-medium" style={{ color: project.categoryColor }}>
          {project.category}
        </span>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <h3 className="text-2xl font-bold uppercase mb-3 group-hover:text-accent transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
