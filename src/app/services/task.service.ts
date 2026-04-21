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

  // Méthode pour ajouter une nouvelle tâche à la liste.
  addTask(taskData: Partial<Task>) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title || 'Sans titre',
      description: taskData.description || '',
      status: 'todo',
      priority: taskData.priority || 'medium',
      categoryId: taskData.categoryId || 'default',
      dueDate: taskData.dueDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...taskData,
    };

    // Met à jour le signal des tâches en ajoutant la nouvelle tâche à la liste.
    this.tasksSignal.update((currentTasks) => [...currentTasks, newTask]);
  }

  // Méthode pour mettre à jour une tâche existante par son ID.
  updateTask(id: string, updates: Partial<Task>) {
    this.tasksSignal.update((currentTasks) =>
      currentTasks.map(
        (task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task), // Met à jour la tâche si l'ID correspond
      ),
    );
  }

  // Méthode pour supprimer une tâche par son ID.
  deleteTask(id: string) {
    this.tasksSignal.update((currentTasks) => currentTasks.filter((task) => task.id !== id)); // Supprime la tâche avec l'ID donné
  }

  // Méthode pour mettre à jour le statut d'une tâche par son ID.
  updateStatus(id: string, newStatus: TaskStatus) {
    this.updateTask(id, { status: newStatus }); // Réutilise la méthode updateTask pour changer le statut
  }

  // Méthode pour récupérer une tâche par son ID.
  getTaskById(id: string) {
    return this.tasks().find((t) => t.id === id); // Trouve et retourne la tâche avec l'ID donné
  }
}
