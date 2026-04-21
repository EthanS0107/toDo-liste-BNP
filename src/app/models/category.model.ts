export interface Category {
  id: number;
  name: string;
  color: string;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Travail', color: 'red' },
  { id: 2, name: 'Personnel', color: 'yellow' },
  { id: 3, name: 'Financie', color: 'blue' },
  { id: 4, name: 'Santé', color: 'green' },
];
