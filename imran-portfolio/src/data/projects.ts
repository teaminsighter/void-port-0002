import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'scalabl-io',
    title: 'Scalabl.io',
    category: 'SaaS Platform',
    categoryColor: '#4ADE80',
    status: 'dev',
    statusLabel: 'In Development',
    description:
      'A GoHighLevel-style all-in-one business platform — CRM, funnels, email marketing, automation, and AI-powered workflows. Built to help agencies and businesses scale without juggling 10 different tools.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe', 'AI Workflows'],
    mockupType: 'dashboard',
    gradientColor: 'rgba(74,222,128,0.07)',
  },
  {
    slug: 'ai-calling-agent',
    title: 'AI Calling Agent',
    category: 'AI / Voice',
    categoryColor: '#60A5FA',
    status: 'live',
    statusLabel: 'Live',
    description:
      'An intelligent voice AI system that makes and handles real phone calls. Handles objections, books appointments, and sounds natural. Built for sales teams and customer service automation.',
    tags: ['Python', 'Twilio', 'OpenAI', 'WebRTC', 'Real-time STT/TTS'],
    mockupType: 'waveform',
    gradientColor: 'rgba(96,165,250,0.07)',
  },
  {
    slug: 'copygum',
    title: 'CopyGum',
    category: 'Productivity App',
    categoryColor: '#F472B6',
    status: 'live',
    statusLabel: 'Live',
    description:
      'A smart clipboard manager that remembers everything you copy. Paste anything from your history, organize snippets, sync across devices. Simple, fast, and built for power users.',
    tags: ['Electron', 'React', 'SQLite', 'Cloud Sync'],
    mockupType: 'clipboard',
    gradientColor: 'rgba(244,114,182,0.07)',
  },
  {
    slug: 'ai-screen-monitor',
    title: 'AI Screen Monitor',
    category: 'AI / Monitoring',
    categoryColor: '#FBBF24',
    status: 'beta',
    statusLabel: 'Beta',
    description:
      'Real-time AI-powered screen monitoring for remote teams. Tracks productivity, detects anomalies, generates activity reports — all with privacy-first AI that processes locally.',
    tags: ['Python', 'Computer Vision', 'OCR', 'WebSocket', 'Dashboard'],
    mockupType: 'grid-monitor',
    gradientColor: 'rgba(251,191,36,0.07)',
  },
  {
    slug: 'void',
    title: 'VOID',
    category: 'AI Assistant',
    categoryColor: '#A78BFA',
    status: 'dev',
    statusLabel: 'In Development',
    description:
      'A Jarvis-like personal AI assistant and second brain. Manages your tasks, answers questions from your knowledge base, automates routines, and learns your preferences over time. Your AI-powered digital twin.',
    tags: ['LangChain', 'GPT-4', 'Vector DB', 'Whisper', 'TTS', 'RAG Pipeline'],
    mockupType: 'terminal',
    gradientColor: 'rgba(167,139,250,0.07)',
  },
];
