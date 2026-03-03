import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { services } from '@/data/services';
import Tag from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: `Services — ${siteConfig.name}`,
  description: 'AI-powered product development, agent systems, SaaS engineering, and more.',
};

export default function ServicesPage() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight tracking-[-0.02em] mb-4">
          Services & <span className="text-accent">Expertise</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-[600px] leading-relaxed mb-16">
          I help companies build AI-powered products from zero to production.
        </p>

        <div className="space-y-0 border-b border-white/[0.08]">
          {services.map((service) => (
            <div key={service.num} className="border-t border-white/[0.08] py-10">
              <div className="flex items-baseline gap-6 mb-4">
                <span className="text-sm font-mono text-accent">{service.num}</span>
                <h2 className="text-2xl font-semibold">{service.title}</h2>
              </div>
              <p className="text-text-secondary leading-[1.7] max-w-[600px] mb-5 ml-[52px]">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 ml-[52px]">
                {service.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
