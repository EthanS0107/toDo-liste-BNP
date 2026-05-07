import { Component, inject, computed } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskFiltersService } from '../../services/task-filters.service';

@Component({
  selector: 'app-category-tabs',
  standalone: true,
  template: `
    <div class="tabs-wrapper">
      <div class="tabs-scroll" role="tablist">
        <button
          type="button"
          role="tab"
          class="tab"
          [class.active]="filters.selectedCategory() === null"
          (click)="select(null)"
        >
          <span class="tab-label">Toutes</span>
          <span class="tab-count">{{ totalCount() }}</span>
        </button>

        @for (cat of taskService.categories(); track cat.id) {
          <button
            type="button"
            role="tab"
            class="tab"
            [class.active]="filters.selectedCategory() === cat.id"
            (click)="select(cat.id)"
          >
            <span class="tab-label">{{ cat.name }}</span>
            <span class="tab-count">{{ countFor(cat.id) }}</span>
          </button>
        }
      </div>
    </div>

    <div class="results-count">
      {{ resultsCount() }} {{ resultsCount() > 1 ? 'résultats' : 'résultat' }}
    </div>
  `,
  styleUrl: './category-tabs.component.css',
})
export class CategoryTabsComponent {
  protected taskService = inject(TaskService);
  protected filters = inject(TaskFiltersService);

  protected totalCount = computed(() => this.taskService.tasks().length);

  protected resultsCount = computed(() => this.filters.filteredTasks().length);

  protected countFor(categoryId: string): number {
    return this.taskService.tasks().filter((t) => t.categoryId === categoryId).length;
  }

  protected select(categoryId: string | null) {
    this.filters.selectedCategory.set(categoryId);
  }
}
