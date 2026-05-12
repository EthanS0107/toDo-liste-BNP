import { Component, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus, TaskFilterState } from '../../models/task.model';
import { Category } from '../../models/category.model';

type SortBy = 'manual' | 'date' | 'priority' | 'title';

interface PriorityOption {
  id: string;
  label: string;
}

interface SortOption {
  id: SortBy;
  label: string;
}

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent {
  categories = input<Category[]>([]);
  priorities = input<{ id: string; name: string }[]>([]);
  hideDateSort = input(false);

  filterChange = output<TaskFilterState>();

  protected priorityOptions: PriorityOption[] = [
    { id: 'high', label: 'P1' },
    { id: 'medium', label: 'P2' },
    { id: 'low', label: 'P3' },
    { id: 'p4', label: 'P4' },
  ];

  private allSortOptions: SortOption[] = [
    { id: 'manual', label: 'Manuel' },
    { id: 'date', label: 'Date' },
    { id: 'priority', label: 'Priorité' },
    { id: 'title', label: 'A→Z' },
  ];

  protected sortOptions = computed(() =>
    this.hideDateSort()
      ? this.allSortOptions.filter((s) => s.id !== 'date')
      : this.allSortOptions,
  );

  search = signal('');
  status = signal<TaskStatus | null>(null);
  categoryId = signal<string | null>(null);
  priority = signal<string | null>(null);
  sortBy = signal<SortBy>('manual');

  constructor() {
    effect(() => {
      // Si l'option de tri actuelle est masquée, on retombe sur "manual"
      if (this.hideDateSort() && this.sortBy() === 'date') {
        this.sortBy.set('manual');
      }
      this.filterChange.emit({
        search: this.search(),
        status: this.status(),
        categoryId: this.categoryId(),
        priority: this.priority(),
        sortBy: this.sortBy(),
      });
    });
  }

  protected selectPriority(value: string | null) {
    this.priority.set(value);
  }

  protected selectSort(value: SortBy) {
    this.sortBy.set(value);
  }

  resetFilters() {
    this.search.set('');
    this.status.set(null);
    this.categoryId.set(null);
    this.priority.set(null);
    this.sortBy.set('manual');
  }
}
