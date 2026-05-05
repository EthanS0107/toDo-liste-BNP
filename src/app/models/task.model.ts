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

// Libellés pour les priorités
export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Haute',
};

// Libellés pour les statuts
export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'À faire',
  'in-progress': 'En cours',
  done: 'Terminé',
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
