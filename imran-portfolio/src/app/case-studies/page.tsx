import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { getAllMdxMeta } from '@/lib/mdx';

export const metadata: Metadata = {
  title: `Case Studies — ${siteConfig.name}`,
  description: 'Deep dives into the products and systems I\'ve built.',
};

export default function CaseStudiesPage() {
  const studies = getAllMdxMeta('case-studies');

  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight tracking-[-0.02em] mb-4">
          Case <span className="text-accent">Studies</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-16">
          Deep dives into the products and systems I&apos;ve built.
        </p>

        {studies.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.06]">
            <p className="text-text-secondary">Coming soon. Stay tuned.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {studies.map((study: any) => (
              <a
                key={study.slug}
                href={`/case-studies/${study.slug}/`}
                className="block border border-white/[0.06] p-6 hover:border-white/[0.15] transition-all duration-300 group"
              >
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                  {study.title}
                </h2>
                <p className="text-sm text-text-secondary">{study.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
