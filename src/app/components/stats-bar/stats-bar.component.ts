import { Component, input, computed } from '@angular/core';

export interface StatsInput {
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
}

@Component({
  selector: 'app-stats-bar',
  standalone: true,
  template: `
    <div class="stats">
      @for (item of items(); track item.label) {
        <span class="stat-item"><strong>{{ item.label }}:</strong> {{ item.value }}</span>
      }
    </div>
  `,
  styleUrls: ['./stats-bar.component.css'],
})
export class StatsBar {
  stats = input.required<StatsInput>();
  total = input.required<number>();

  items = computed(() => [
    { label: 'Total', value: this.total() },
    { label: 'À faire', value: this.stats().todo },
    { label: 'En cours', value: this.stats().inProgress },
    { label: 'Terminées', value: this.stats().done },
    { label: 'En retard', value: this.stats().overdue },
  ]);
}
