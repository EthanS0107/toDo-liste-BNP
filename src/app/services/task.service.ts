import { Injectable, signal, computed, effect } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { Category, DEFAULT_CATEGORIES } from '../models/category.model';

const STORAGE_KEY = 'bnp-todo-tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSignal = signal<Task[]>(this.loadFromStorage());

  readonly tasks = this.tasksSignal.asReadonly();
  readonly categories = signal<Category[]>(DEFAULT_CATEGORIES).asReadonly();

  readonly total = computed(() => this.tasks().length);

  readonly stats = computed(() => {
    const list = this.tasks();
    const now = new Date();
    return {
      todo: list.filter((t) => t.status === 'todo').length,
      inProgress: list.filter((t) => t.status === 'in-progress').length,
      done: list.filter((t) => t.status === 'done').length,
      overdue: list.filter((t) => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < now)
        .length,
    };
  });

  constructor() {
    // Persistance automatique dès qu'une tâche change
    effect(() => {
      const list = this.tasksSignal();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch {
        // stockage indisponible, on ignore
      }
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
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Task[];
      return parsed.map((t) => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : null,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
      }));
    } catch {
      return [];
    }
  }
}
