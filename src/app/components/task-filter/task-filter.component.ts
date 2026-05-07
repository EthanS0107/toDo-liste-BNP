import { Component, input, output, signal, effect } from '@angular/core';
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

  filterChange = output<TaskFilterState>();

  protected priorityOptions: PriorityOption[] = [
    { id: 'high', label: 'P1' },
    { id: 'medium', label: 'P2' },
    { id: 'low', label: 'P3' },
    { id: 'p4', label: 'P4' },
  ];

  protected sortOptions: SortOption[] = [
    { id: 'manual', label: 'Manuel' },
    { id: 'date', label: 'Date' },
    { id: 'priority', label: 'Priorité' },
    { id: 'title', label: 'A→Z' },
  ];

  search = signal('');
  status = signal<TaskStatus | null>(null);
  categoryId = signal<string | null>(null);
  priority = signal<string | null>(null);
  sortBy = signal<SortBy>('manual');

  constructor() {
    effect(() => {
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
