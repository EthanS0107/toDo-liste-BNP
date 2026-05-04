import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-stats-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-cards">
        <div class="card">
          <div class="card-title">Total des tâches</div>
          <div class="card-value">{{ total() }}</div>
        </div>
        <div class="card">
          <div class="card-title">Complétées cette semaine</div>
          <div class="card-value highlight">{{ stats().completedThisWeek }}</div>
        </div>
        
        @if (stats().overdue > 0) {
          <div class="card alert-card">
            <div class="card-title">Tâches en retard</div>
            <div class="card-value error">{{ stats().overdue }}</div>
          </div>
        }
      </div>

      <!-- Status & Progression -->
      <div class="progress-section">
        <div class="status-counts">
          <span class="status-badge todo">À faire : {{ stats().todo }}</span>
          <span class="status-badge in-progress">En cours : {{ stats().inProgress }}</span>
          <span class="status-badge done">Terminées : {{ stats().done }}</span>
        </div>
        
        <div class="progress-container">
          <div class="progress-bar-bg">
            <div 
              class="progress-bar-fill" 
              [style.width.%]="progressPercentage()">
            </div>
          </div>
          <div class="progress-text">{{ progressPercentage() }}% complété</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  taskService = inject(TaskService);

  total = this.taskService.total;
  stats = this.taskService.stats;

  progressPercentage = computed(() => {
    const t = this.total();
    if (t === 0) return 0;
    return Math.round((this.stats().done / t) * 100);
  });
}
