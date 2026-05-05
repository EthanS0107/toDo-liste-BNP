import { Injectable, inject, signal, computed, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { TaskService } from './task.service';
import { TaskStatus, TaskFilterState } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskFiltersService {
  private taskService = inject(TaskService);

  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<TaskStatus | null>(null);
  readonly selectedCategory = signal<string | null>(null);
  readonly selectedPriority = signal<string | null>(null);
  readonly sortField = signal<'date' | 'priority' | 'title' | 'manual'>('manual');

  private debouncedSearchQuery = toSignal(toObservable(this.searchQuery).pipe(debounceTime(300)), {
    initialValue: '',
  });

  readonly filteredTasks = computed(() => {
    const search = this.debouncedSearchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    const category = this.selectedCategory();
    const priority = this.selectedPriority();

    return this.taskService
      .tasks()
      .filter(
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
            return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
          case 'date':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'manual':
          default:
            return 0; // Conserve l'ordre du store (TaskService)
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
}
