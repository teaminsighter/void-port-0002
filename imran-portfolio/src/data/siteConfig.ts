export const siteConfig = {
  name: 'Imran Hossain',
  firstName: 'IMRAN',
  lastName: 'HOSSAIN',
  role: 'AI Systems Engineer & System Architect',
  email: 'imran@insighter.digital',
  url: 'https://imran.insighter.digital',
  eyebrow: 'AI Systems Engineer · System Architect · Builder',
  description:
    'Portfolio of Imran Hossain, AI Systems Engineer & System Architect. Building intelligent systems with cutting-edge technology.',
  heroHeading: [
    { text: 'BUILDING THE', accent: false },
    { text: 'FUTURE WITH', accent: false },
    { text: 'ARTIFICIAL', accent: true },
    { text: 'INTELLIGENCE', accent: false },
  ],
  heroDescription:
    'I design and build AI-powered systems, intelligent agents, and scalable platforms that solve real-world problems.',
  aboutStatement:
    'I craft intelligent systems that bridge the gap between complex AI research and real-world impact.',
  aboutAccentWords: ['intelligent', 'AI'] as string[],
  aboutDescriptions: [
    'With deep expertise in machine learning, natural language processing, and generative AI, I build products that think, adapt, and scale. From fine-tuning large language models to architecting multi-agent systems, I turn ambitious ideas into production-ready solutions.',
    'My approach is rooted in clean engineering, minimal design, and relentless iteration. I believe the best AI products are the ones that feel invisible — seamlessly integrated into the experiences people already love.',
  ],
  stats: [
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 30, suffix: '+', label: 'Projects Shipped' },
    { value: 10, suffix: '+', label: 'AI Models Deployed' },
  ],
  codeCard: {
    fileName: 'profile.json',
    lines: [
      { num: 1, content: '{', type: 'bracket' as const },
      { num: 2, content: '  "name": "Imran Hossain"', type: 'kv' as const, key: '"name"', value: '"Imran Hossain"' },
      { num: 3, content: '  "role": "AI Systems Engineer & System Architect"', type: 'kv' as const, key: '"role"', value: '"AI Systems Engineer & System Architect"' },
      { num: 4, content: '  "focus": [', type: 'bracket' as const },
      { num: 5, content: '    "LLMs"', type: 'string' as const },
      { num: 6, content: '    "Multi-Agent Systems"', type: 'string' as const },
      { num: 7, content: '    "Generative AI"', type: 'string' as const },
      { num: 8, content: '  ]', type: 'bracket' as const },
      { num: 9, content: '  "passion": "Building the future"', type: 'kv' as const, key: '"passion"', value: '"Building the future"' },
      { num: 10, content: '}', type: 'bracket' as const },
    ],
  },
  floatingBadges: ['Python', 'LangChain', 'Next.js'],
  social: {
    github: '#',
    linkedin: '#',
    twitter: '#',
    huggingface: '#',
  },
  contactHeading: [
    { text: "Let's Build", stroke: false },
    { text: 'Something', stroke: false },
    { text: 'Intelligent', stroke: true },
  ],
  contactDescription:
    "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.",
  footerYear: 2026,
  footerTagline: 'Designed & Built with ♡ and AI',
} as const;
