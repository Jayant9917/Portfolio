export interface Technology {
  name: string;
  icon?: string; // Can be a URL or icon name
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'other';
}

export interface Project {
  title: string;
  description: string;
  src: string;
  link: string;
  slug?: string;
  technologies: Technology[];
  overview: string;
  process?: string[];
  date: string;
  githubUrl?: string;
  features?: string[];
  challenges?: string[];
  learnings?: string[];
  designTools?: Technology[]; // Changed from string[] to Technology[]
  developmentTools?: Technology[]; // Changed from string[] to Technology[]
  deployment?: {
    platform: string;
    url: string;
  };
}
