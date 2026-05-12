import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFiltersService } from '../../services/task-filters.service';
import { TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-grid">
      <button
        type="button"
        class="stat-card"
        data-variant="total"
        [class.active]="filters.selectedStatus() === null"
        (click)="selectStatus(null)"
      >
        <span class="stat-label">Total</span>
        <span class="stat-value">{{ total() }}</span>
      </button>

      <button
        type="button"
        class="stat-card"
        data-variant="todo"
        [class.active]="filters.selectedStatus() === 'todo'"
        (click)="selectStatus('todo')"
      >
        <span class="stat-label">
          <span class="stat-icon" aria-hidden="true">○</span>À faire
        </span>
        <span class="stat-value">{{ stats().todo }}</span>
      </button>

      <button
        type="button"
        class="stat-card"
        data-variant="in-progress"
        [class.active]="filters.selectedStatus() === 'in-progress'"
        (click)="selectStatus('in-progress')"
      >
        <span class="stat-label">
          <span class="stat-icon" aria-hidden="true">◐</span>En cours
        </span>
        <span class="stat-value">{{ stats().inProgress }}</span>
      </button>

      <button
        type="button"
        class="stat-card"
        data-variant="done"
        [class.active]="filters.selectedStatus() === 'done'"
        (click)="selectStatus('done')"
      >
        <span class="stat-label">
          <span class="stat-icon" aria-hidden="true">●</span>Terminées
        </span>
        <span class="stat-value">{{ stats().done }}</span>
      </button>
    </div>
  `,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  protected filters = inject(TaskFiltersService);

  protected total = this.filters.scopedTotal;
  protected stats = this.filters.scopedStats;

  protected selectStatus(status: TaskStatus | null) {
    this.filters.selectedStatus.set(status);
  }
}
