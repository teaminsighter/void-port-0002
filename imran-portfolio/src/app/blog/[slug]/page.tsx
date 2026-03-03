import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';
import { getMdxBySlug, getMdxFiles } from '@/lib/mdx';

export function generateStaticParams() {
  const files = getMdxFiles('blog');
  return files.map((f) => ({ slug: f.replace('.mdx', '') }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getMdxBySlug('blog', params.slug);
  if (!post) return {};
  return {
    title: `${post.frontmatter.title} — ${siteConfig.name}`,
    description: post.frontmatter.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getMdxBySlug('blog', params.slug);
  if (!post) notFound();

  return (
    <section className="min-h-screen pt-32 pb-20 px-[clamp(1.5rem,6vw,8vw)]">
      <article className="max-w-[700px] mx-auto">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-[-0.02em] mb-4">
          {post.frontmatter.title}
        </h1>
        <p className="text-sm text-text-secondary mb-10">{post.frontmatter.date}</p>
        <div className="prose prose-invert prose-green max-w-none">
          <p className="text-text-secondary leading-[1.8]">{post.content}</p>
        </div>
      </article>
    </section>
  );
}
