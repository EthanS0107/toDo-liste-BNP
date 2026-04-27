import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';
import { TaskStatus, Task, STATUS_LABELS } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskList, CommonModule],
  template: `
    <div class="tasks-page-container">
      <div class="tasks-page-header">
        <h1>Mes Tâches</h1>
        <div class="stats">
          <span class="stat-item"><strong>Total:</strong> {{ taskService.total() }}</span>
          <span class="stat-item"><strong>À faire:</strong> {{ taskService.stats().todo }}</span>
          <span class="stat-item"
            ><strong>En cours:</strong> {{ taskService.stats().inProgress }}</span
          >
          <span class="stat-item"><strong>Terminées:</strong> {{ taskService.stats().done }}</span>
          <span class="stat-item"
            ><strong>En retard:</strong> {{ taskService.stats().overdue }}</span
          >
        </div>
      </div>

      <!-- Filtres par statut -->
      <div class="filter-buttons">
        <button
          class="filter-btn"
          [class.active]="selectedStatus() === null"
          (click)="setStatusFilter(null)"
        >
          Toutes
        </button>
        <button
          class="filter-btn"
          [class.active]="selectedStatus() === 'todo'"
          (click)="setStatusFilter('todo')"
        >
          {{ STATUS_LABELS['todo'] }}
        </button>
        <button
          class="filter-btn"
          [class.active]="selectedStatus() === 'in-progress'"
          (click)="setStatusFilter('in-progress')"
        >
          {{ STATUS_LABELS['in-progress'] }}
        </button>
        <button
          class="filter-btn"
          [class.active]="selectedStatus() === 'done'"
          (click)="setStatusFilter('done')"
        >
          {{ STATUS_LABELS['done'] }}
        </button>
      </div>

      <app-task-list
        [tasks]="filteredTasks()"
        [categories]="taskService.categories()"
        (taskDeleted)="onTaskDeleted($event)"
        (taskEdited)="onTaskEdited($event)"
        (taskStatusChanged)="onTaskStatusChanged($event)"
      />
    </div>
  `,
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPage {
  protected taskService = inject(TaskService);
  protected STATUS_LABELS = STATUS_LABELS;
  private router = inject(Router);

  // Signal pour l'état du filtre
  selectedStatus = signal<TaskStatus | null>(null);

  // Computed pour les tâches filtrées
  filteredTasks = computed(() => {
    const status = this.selectedStatus();
    const allTasks = this.taskService.tasks();
    return status === null ? allTasks : allTasks.filter((task) => task.status === status);
  });

  setStatusFilter(status: TaskStatus | null) {
    this.selectedStatus.set(status);
  }

  onTaskDeleted(id: string) {
    this.taskService.deleteTask(id);
  }

  onTaskEdited(task: Task) {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  onTaskStatusChanged(data: { id: string; status: TaskStatus }) {
    this.taskService.updateStatus(data.id, data.status);
  }
}
