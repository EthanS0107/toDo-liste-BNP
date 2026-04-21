import { Injectable, signal, computed } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

// Le décorateur @Injectable indique que cette classe est un service pouvant être injecté dans d'autres composants ou services.
@Injectable({ providedIn: 'root' })
export class TaskService {
  // Signal privé pour stocker la liste des tâches. Les Signals sont utilisés pour gérer l'état réactif dans Angular.
  private tasksSignal = signal<Task[]>([
    {
      id: '1',
      title: 'Ma première tâche',
      description: 'Découvrir les Signals',
      status: 'todo',
      priority: 'medium',
      categoryId: 'cat1',
      dueDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // Signal en lecture seule exposant les tâches à d'autres parties de l'application.
  readonly tasks = this.tasksSignal.asReadonly();

  // Signal calculé pour obtenir le nombre total de tâches.
  readonly total = computed(() => this.tasks().length);

  // Signal calculé pour obtenir diverses statistiques sur les tâches.
  readonly stats = computed(() => {
    const list = this.tasks(); // Récupère la liste actuelle des tâches
    const now = new Date(); // Date et heure actuelles

    return {
      todo: list.filter((t) => t.status === 'todo').length, // Nombre de tâches avec le statut 'todo'
      inProgress: list.filter((t) => t.status === 'in-progress').length, // Nombre de tâches en cours
      done: list.filter((t) => t.status === 'done').length, // Nombre de tâches terminées
      overdue: list.filter((t) => t.status !== 'done' && t.dueDate && t.dueDate < now).length, // Nombre de tâches en retard
    };
  });
}
