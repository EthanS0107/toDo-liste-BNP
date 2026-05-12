// Types pour le statut et la priorité d'une tâche
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

// Interface pour une tâche
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  categoryId: string;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour une priorité
export interface Priority {
  id: TaskPriority;
  name: string;
}

export const DEFAULT_PRIORITIES: Priority[] = [
  { id: 'low', name: 'Faible' },
  { id: 'medium', name: 'Moyenne' },
  { id: 'high', name: 'Haute' },
];

// Libellés pour les priorités (forme complète)
export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Haute',
};

// Libellés courts (P1/P2/P3) — utilisés dans les badges
export const PRIORITY_SHORT_LABELS: Record<TaskPriority, string> = {
  high: 'P1',
  medium: 'P2',
  low: 'P3',
};

// Libellés pour les statuts
export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'À faire',
  'in-progress': 'En cours',
  done: 'Terminée',
};

// Icônes ASCII de statut
export const STATUS_ICONS: Record<TaskStatus, string> = {
  todo: '○',
  'in-progress': '◐',
  done: '●',
};

// Statut suivant pour chaque statut
export const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: 'done',
};

// Interface pour l'état des filtres
export interface TaskFilterState {
  search: string;
  status: TaskStatus | null;
  categoryId: string | null;
  priority: string | null;
  sortBy: 'date' | 'priority' | 'title' | 'manual';
}
