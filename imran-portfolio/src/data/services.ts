import type { Service } from '@/types/service';

export const services: Service[] = [
  {
    num: '01',
    title: 'AI Agent Development',
    description:
      'I design and build autonomous AI agents that can reason, plan, and execute complex tasks — from customer service bots to AI calling systems that handle real conversations.',
    tags: ['LangChain', 'CrewAI', 'AutoGen', 'OpenAI', 'Voice AI'],
  },
  {
    num: '02',
    title: 'SaaS Product Engineering',
    description:
      'Full-stack development of scalable SaaS platforms. From database architecture to payment systems to user dashboards — I build products that are ready to scale to thousands of users.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
  },
  {
    num: '03',
    title: 'LLM Integration & Fine-tuning',
    description:
      'I integrate large language models into existing products and fine-tune them for specific use cases. Custom RAG pipelines, prompt engineering, and model optimization.',
    tags: ['GPT-4', 'Claude', 'Llama', 'RAG', 'Vector DBs', 'Embeddings'],
  },
  {
    num: '04',
    title: 'AI-Powered Automation',
    description:
      'Building intelligent automation systems that replace manual workflows — screen monitoring, data processing, content generation, and smart notification systems.',
    tags: ['Python', 'Selenium', 'Computer Vision', 'OCR', 'n8n'],
  },
  {
    num: '05',
    title: 'Product Design & Strategy',
    description:
      'From ideation to launch — I help shape product vision, design intuitive interfaces, and build MVPs that validate ideas fast. Combining technical depth with product thinking.',
    tags: ['Figma', 'UI/UX', 'MVP Development', 'Product Strategy'],
  },
];

export const marqueeItems = [
  'AI Agents', 'Full Stack', 'SaaS', 'LLM Integration', 'Voice AI',
  'Automation', 'Product Design', 'Next.js', 'Python', 'React',
];
