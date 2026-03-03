import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { getAllMdxMeta } from '@/lib/mdx';

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description: 'Thoughts on AI, engineering, and building products.',
};

export default function BlogPage() {
  const posts = getAllMdxMeta('blog');

  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-[clamp(3rem,6vw,5rem)] font-bold leading-tight tracking-[-0.02em] mb-4">
          <span className="text-accent">Blog</span>
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-16">
          Thoughts on AI, engineering, and building products.
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.06]">
            <p className="text-text-secondary">Coming soon. Stay tuned.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post: any) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="block border border-white/[0.06] p-6 hover:border-white/[0.15] transition-all duration-300 group"
              >
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary">{post.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
