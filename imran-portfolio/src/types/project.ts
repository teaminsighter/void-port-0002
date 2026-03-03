export type MockupType = 'dashboard' | 'waveform' | 'clipboard' | 'grid-monitor' | 'terminal';

export type ProjectStatus = 'live' | 'beta' | 'dev';

export interface Project {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  status: ProjectStatus;
  statusLabel: string;
  description: string;
  tags: string[];
  mockupType: MockupType;
  gradientColor: string;
  link?: string;
}
