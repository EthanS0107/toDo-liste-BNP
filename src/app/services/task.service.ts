import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { Task, TaskStatus, DEFAULT_PRIORITIES, Priority } from '../models/task.model';
import { Category, DEFAULT_CATEGORIES } from '../models/category.model';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'bnp-todo-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private storage = inject(StorageService);
  private tasksSignal = signal<Task[]>(this.loadFromStorage());

  readonly tasks = this.tasksSignal.asReadonly();
  readonly categories = signal<Category[]>(DEFAULT_CATEGORIES).asReadonly();
  readonly priorities = signal<Priority[]>(DEFAULT_PRIORITIES).asReadonly();

  readonly total = computed(() => this.tasks().length);

  readonly stats = computed(() => {
    const list = this.tasks();
    const now = new Date();
    
    // Début de la semaine en cours (Lundi)
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay() || 7; // Dimanche devient 7
    if (day !== 1) {
      startOfWeek.setHours(-24 * (day - 1));
    }
    startOfWeek.setHours(0, 0, 0, 0);

    return {
      todo: list.filter((t) => t.status === 'todo').length,
      inProgress: list.filter((t) => t.status === 'in-progress').length,
      done: list.filter((t) => t.status === 'done').length,
      overdue: list.filter((t) => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < now).length,
      completedThisWeek: list.filter((t) => t.status === 'done' && new Date(t.updatedAt) >= startOfWeek).length,
    };
  });

  constructor() {
    // Persistance automatique dès qu'une tâche change
    effect(() => {
      const list = this.tasksSignal();
      this.storage.setItem(STORAGE_KEY, list);
    });
  }

  getCategoryById(id: string): Category | null {
    return this.categories().find((c) => c.id === id) ?? null;
  }

  addTask(taskData: Partial<Task>) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title?.trim() || 'Sans titre',
      description: taskData.description ?? '',
      status: taskData.status ?? 'todo',
      priority: taskData.priority ?? 'medium',
      categoryId: taskData.categoryId ?? '',
      dueDate: taskData.dueDate ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasksSignal.update((tasks) => [...tasks, newTask]);
  }

  updateTask(id: string, updates: Partial<Task>) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t)),
    );
  }

  deleteTask(id: string) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  updateStatus(id: string, newStatus: TaskStatus) {
    this.updateTask(id, { status: newStatus });
  }

  toggleDone(id: string) {
    const task = this.getTaskById(id);
    if (!task) return;
    this.updateStatus(id, task.status === 'done' ? 'todo' : 'done');
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks().find((t) => t.id === id);
  }

  private loadFromStorage(): Task[] {
    const parsed = this.storage.getItem<Task[]>(STORAGE_KEY);
    if (!parsed) return [];

    return parsed.map((t) => ({
      ...t,
      dueDate: t.dueDate ? new Date(t.dueDate) : null,
      createdAt: new Date(t.createdAt),
      updatedAt: new Date(t.updatedAt),
    }));
  }
}
