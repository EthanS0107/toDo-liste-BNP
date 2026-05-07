import { Component, inject, computed } from '@angular/core';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-daily-header',
  standalone: true,
  template: `
    <section class="daily-header">
      <div class="date-label">{{ formattedDate() }}</div>
      <div class="title-row">
        <h1 class="title">Tâches du jour</h1>
        <span class="counter">{{ stats().done }}/{{ total() }} traitées</span>
      </div>
      <div class="title-underline"></div>
    </section>
  `,
  styleUrl: './daily-header.component.css',
})
export class DailyHeaderComponent {
  private taskService = inject(TaskService);
  protected stats = this.taskService.stats;
  protected total = this.taskService.total;

  protected formattedDate = computed(() => {
    const now = new Date();
    const weekday = now.toLocaleDateString('fr-FR', { weekday: 'long' });
    const day = now.getDate();
    const month = now.toLocaleDateString('fr-FR', { month: 'long' });
    const year = now.getFullYear();
    return `${weekday} · ${day} ${month} ${year}`.toUpperCase();
  });
}
