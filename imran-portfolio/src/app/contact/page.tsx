import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { socialLinks } from '@/data/socialLinks';
import AvailabilityBadge from '@/components/ui/AvailabilityBadge';

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: 'Get in touch for new projects, creative ideas, or collaboration opportunities.',
};

export default function ContactPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-[clamp(1.5rem,6vw,8vw)] text-center">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight tracking-[-0.02em] mb-6">
          Let&apos;s <span className="text-accent">Connect</span>
        </h1>

        <p className="text-lg text-text-secondary leading-relaxed mb-10">
          {siteConfig.contactDescription}
        </p>

        <a
          href={`mailto:${siteConfig.email}`}
          className="hoverable text-2xl text-white font-medium hover:text-accent transition-colors duration-300"
        >
          {siteConfig.email}
        </a>

        <div className="flex items-center justify-center gap-6 mt-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hoverable text-xs uppercase tracking-[3px] text-text-secondary hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-10">
          <AvailabilityBadge />
        </div>
      </div>
    </section>
  );
}
