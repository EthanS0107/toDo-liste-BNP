import { Component, input, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFiltersService } from '../../services/task-filters.service';
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
  protected filters = inject(TaskFiltersService);

  categories = input<Category[]>([]);
  priorities = input<{ id: string; name: string }[]>([]);
  hideDateSort = input(false);

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

  constructor() {
    effect(() => {
      // Si l'option de tri actuelle est masquée, on retombe sur "manual"
      if (this.hideDateSort() && this.filters.sortField() === 'date') {
        this.filters.sortField.set('manual');
      }
    });
  }

  protected onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filters.searchQuery.set(target.value);
  }

  resetFilters() {
    this.filters.resetFilters();
  }
}
