import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content');

export function getMdxFiles(dir: string) {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((f) => f.endsWith('.mdx'));
}

export function getMdxBySlug(dir: string, slug: string) {
  const fullPath = path.join(contentDir, dir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export function getAllMdxMeta(dir: string) {
  const files = getMdxFiles(dir);
  return files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const fullPath = path.join(contentDir, dir, filename);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(raw);
    return { slug, ...data };
  });
}
