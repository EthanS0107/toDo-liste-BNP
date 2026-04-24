export interface Category {
  id: string;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Travail', color: '#ef4444' },
  { id: 'cat2', name: 'Personnel', color: '#eab308' },
  { id: 'cat3', name: 'Finance', color: '#3b82f6' },
  { id: 'cat4', name: 'Santé', color: '#22c55e' },
];
