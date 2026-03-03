export interface TechItem {
  name: string;
  level: number; // 1-5
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}
