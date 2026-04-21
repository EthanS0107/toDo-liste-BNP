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
}
