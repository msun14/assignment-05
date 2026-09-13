export const categories = [
  'Frontend', 'Backend', 'Database', 'Language', 'Styling', 'DevOps', 'Tools',
] as const;

export const difficulties = ['Beginner-Friendly', 'Intermediate', 'Advanced'] as const;

export interface Technology {
  id: string;
  name: string;
  category: (typeof categories)[number];
  description: string;
  icon: string;
  rating: number;
  difficulty: (typeof difficulties)[number];
  badge: string;
}

export type InfoTopic = 'projects' | 'about' | 'contact' | 'signin' |
  'signup' | 'privacy' | 'terms' | 'careers' | 'social';
