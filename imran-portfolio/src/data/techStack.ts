import type { TechCategory } from '@/types/techStack';

export const techCategories: TechCategory[] = [
  {
    title: 'AI & Machine Learning',
    items: [
      { name: 'Python', level: 5 },
      { name: 'LangChain', level: 5 },
      { name: 'OpenAI / GPT-4', level: 5 },
      { name: 'Claude API', level: 4 },
      { name: 'Hugging Face', level: 4 },
      { name: 'TensorFlow', level: 3 },
      { name: 'Vector DBs', level: 4 },
      { name: 'RAG Pipelines', level: 5 },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React / Next.js', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'GSAP', level: 4 },
      { name: 'Framer Motion', level: 3 },
      { name: 'HTML5 / CSS3', level: 5 },
    ],
  },
  {
    title: 'Backend & Infrastructure',
    items: [
      { name: 'Node.js', level: 5 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'MongoDB', level: 4 },
      { name: 'Redis', level: 3 },
      { name: 'AWS', level: 4 },
      { name: 'Docker', level: 4 },
      { name: 'Supabase', level: 4 },
      { name: 'REST / GraphQL', level: 5 },
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      { name: 'Git / GitHub', level: 5 },
      { name: 'Figma', level: 4 },
      { name: 'VS Code', level: 5 },
      { name: 'Vercel', level: 5 },
      { name: 'Stripe', level: 4 },
      { name: 'n8n', level: 4 },
      { name: 'Linux', level: 4 },
      { name: 'Cursor AI', level: 5 },
    ],
  },
];

export const exploringItems = [
  'Claude MCP / Tool Use',
  'Multi-Agent Systems',
  'AI Hardware',
  'Edge AI',
  'Quantum ML',
];
