import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.aboutStatement,
};

export default function AboutPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight tracking-[-0.02em] mb-8">
          About <span className="text-accent">Me</span>
        </h1>

        <div className="space-y-6 text-text-secondary leading-[1.8] text-lg">
          {siteConfig.aboutDescriptions.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="border-t border-white/10 pt-6">
              <div className="text-4xl font-extrabold mb-2">
                {stat.value}<span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="text-xs uppercase tracking-[2px] text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
