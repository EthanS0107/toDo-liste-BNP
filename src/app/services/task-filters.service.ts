import { Injectable, inject, signal, computed, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { TaskService } from './task.service';
import { Task, TaskStatus, TaskFilterState } from '../models/task.model';

export type FilterScope = 'all' | 'today';

@Injectable({ providedIn: 'root' })
export class TaskFiltersService {
  private taskService = inject(TaskService);

  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<TaskStatus | null>(null);
  readonly selectedCategory = signal<string | null>(null);
  readonly selectedPriority = signal<string | null>(null);
  readonly sortField = signal<'date' | 'priority' | 'title' | 'manual'>('manual');
  readonly scope = signal<FilterScope>('all');

  private debouncedSearchQuery = toSignal(toObservable(this.searchQuery).pipe(debounceTime(300)), {
    initialValue: '',
  });

  readonly scopedTasks = computed(() => {
    const tasks = this.taskService.tasks();
    if (this.scope() === 'today') {
      return tasks.filter((t) => isDueTodayOrOverdueUnfinished(t));
    }
    return tasks;
  });

  readonly scopedTotal = computed(() => this.scopedTasks().length);

  readonly scopedStats = computed(() => {
    const list = this.scopedTasks();
    return {
      todo: list.filter((t) => t.status === 'todo').length,
      inProgress: list.filter((t) => t.status === 'in-progress').length,
      done: list.filter((t) => t.status === 'done').length,
    };
  });

  readonly filteredTasks = computed(() => {
    const search = this.debouncedSearchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    const category = this.selectedCategory();
    const priority = this.selectedPriority();

    return this.scopedTasks().filter(
      (task) =>
        (!search ||
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)) &&
        (!status || task.status === status) &&
        (!category || task.categoryId === category) &&
        (!priority || task.priority === priority),
    );
  });

  readonly sortedTasks = linkedSignal({
    source: () => ({ tasks: this.filteredTasks(), sort: this.sortField() }),
    computation: (source) => {
      const tasks = [...source.tasks];
      const priorityWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };

      return tasks.sort((a, b) => {
        switch (source.sort) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'priority':
            const weightA = priorityWeight[a.priority] || 0;
            const weightB = priorityWeight[b.priority] || 0;
            return weightB - weightA;
          case 'date':
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            if (dateA !== dateB) return dateA - dateB;
            // Fallback to createdAt (newest first) if dueDates are same or missing
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'manual':
          default:
            return 0;
        }
      });
    },
  });

  applyFilters(filters: TaskFilterState): void {
    this.searchQuery.set(filters.search);
    this.selectedStatus.set(filters.status);
    this.selectedCategory.set(filters.categoryId);
    this.selectedPriority.set(filters.priority);
    this.sortField.set(filters.sortBy);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedStatus.set(null);
    this.selectedCategory.set(null);
    this.selectedPriority.set(null);
    this.sortField.set('manual');
  }
}

// Une tâche du jour : échéance aujourd'hui OU en retard et non terminée
function isDueTodayOrOverdueUnfinished(task: Task): boolean {
  if (!task.dueDate) return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  if (due >= startOfToday && due < startOfTomorrow) return true;
  if (due < startOfToday && task.status !== 'done') return true;
  return false;
}
