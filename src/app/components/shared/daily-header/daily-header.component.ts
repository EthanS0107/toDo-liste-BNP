import { Component, inject, computed } from '@angular/core';
import { TaskFiltersService } from '../../../services/task-filters.service';

@Component({
  selector: 'app-daily-header',
  standalone: true,
  template: `
    <section class="daily-header">
      <div class="date-label">{{ formattedDate() }}</div>
      <div class="title-row">
        <h1 class="title">Tâches du jour</h1>
        <span class="counter">{{ stats().done }}<span class="sep">/</span>{{ total() }}<span class="counter-suffix"> traitées</span></span>
      </div>
      <div class="progress-track" role="progressbar"
           [attr.aria-valuenow]="progress()" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-fill" [style.width.%]="progress()"></div>
      </div>
    </section>
  `,
  styleUrl: './daily-header.component.css',
})
export class DailyHeaderComponent {
  private filters = inject(TaskFiltersService);
  protected stats = this.filters.scopedStats;
  protected total = this.filters.scopedTotal;

  protected progress = computed(() => {
    const total = this.total();
    if (!total) return 0;
    return Math.round((this.stats().done / total) * 100);
  });

  protected formattedDate = computed(() => {
    const now = new Date();
    const weekday = now.toLocaleDateString('fr-FR', { weekday: 'long' });
    const day = now.getDate();
    const month = now.toLocaleDateString('fr-FR', { month: 'long' });
    const year = now.getFullYear();
    return `${weekday} · ${day} ${month} ${year}`;
  });
}
