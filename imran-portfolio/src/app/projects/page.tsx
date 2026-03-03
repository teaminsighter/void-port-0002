import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { projects } from '@/data/projects';
import ProjectGridCard from '@/components/projects/ProjectGridCard';

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: 'AI-powered products and platforms designed, built, and shipped.',
};

export default function ProjectsPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight tracking-[-0.02em] mb-4">
          All <span className="text-accent">Projects</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-[600px] leading-relaxed mb-16">
          AI-powered products and platforms I&apos;ve designed, built, and shipped.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectGridCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
