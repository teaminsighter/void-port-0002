import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="hoverable block border border-white/[0.06] p-6 hover:border-white/[0.15] transition-all duration-300 group"
    >
      <div className="flex items-center gap-4 mb-3">
        <span className="text-xs text-text-secondary">{post.date}</span>
        <span className="text-xs text-text-secondary">{post.readTime}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-300">
        {post.title}
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed">{post.description}</p>
    </Link>
  );
}
