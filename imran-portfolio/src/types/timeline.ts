export interface TimelineEntry {
  year: string;
  tag: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  isPresent?: boolean;
}
