import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';
import Tag from '@/components/ui/Tag';
import StatusBadge from '@/components/ui/StatusBadge';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm uppercase tracking-[3px] font-medium" style={{ color: project.categoryColor }}>
            {project.category}
          </span>
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>

        <h1 className="text-[clamp(3rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] mb-6">
          {project.title}
        </h1>

        <p className="text-lg text-text-secondary leading-[1.7] mb-8">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-16">
          {project.tags.map((tag) => (
            <Tag key={tag} hoverColor={project.categoryColor}>{tag}</Tag>
          ))}
        </div>

        <div className="border-t border-white/[0.08] pt-10">
          <p className="text-text-secondary text-center">
            Full case study coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
