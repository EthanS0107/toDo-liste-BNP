import { Component, inject, computed } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskFiltersService } from '../../services/task-filters.service';
import { TaskStatus } from '../../models/task.model';
import { StatCardComponent } from './stat-card.component';

@Component({
  selector: 'app-today-summary',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, StatCardComponent],
  template: `
    <section class="today-summary">
      <p class="today-date">
        {{ today | date: 'EEEE' : undefined : 'fr' | uppercase }}
        <span class="dot">·</span>
        {{ today | date: 'd MMMM y' : undefined : 'fr' | uppercase }}
      </p>

      <h1 class="today-title">
        Tâches du jour
        <span class="today-progress"> {{ stats().done }}/{{ total() }} traitées </span>
      </h1>

      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" [style.width.%]="progressPercentage()"></div>
      </div>

      <div class="stats-scroll">
        <app-stat-card
          label="Total"
          [value]="total()"
          variant="total"
          [active]="filters.selectedStatus() === null"
          (cardClick)="selectStatus(null)"
        />
        <app-stat-card
          label="À faire"
          [value]="stats().todo"
          variant="todo"
          [active]="filters.selectedStatus() === 'todo'"
          (cardClick)="selectStatus('todo')"
        />
        <app-stat-card
          label="En cours"
          [value]="stats().inProgress"
          variant="in-progress"
          [active]="filters.selectedStatus() === 'in-progress'"
          (cardClick)="selectStatus('in-progress')"
        />
        <app-stat-card
          label="Terminées"
          [value]="stats().done"
          variant="done"
          [active]="filters.selectedStatus() === 'done'"
          (cardClick)="selectStatus('done')"
        />
      </div>
    </section>
  `,
  styleUrl: './today-summary.component.css',
})
export class TodaySummaryComponent {
  private taskService = inject(TaskService);
  protected filters = inject(TaskFiltersService);

  today = new Date();
  total = this.taskService.total;
  stats = this.taskService.stats;

  progressPercentage = computed(() => {
    const t = this.total();
    return t === 0 ? 0 : Math.round((this.stats().done / t) * 100);
  });

  protected selectStatus(status: TaskStatus | null) {
    const current = this.filters.selectedStatus();
    this.filters.selectedStatus.set(current === status ? null : status);
  }
}
