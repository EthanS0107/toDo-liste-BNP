import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';
import { TaskStatus, Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskList],
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

      <app-task-list
        [tasks]="taskService.tasks()"
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
  private router = inject(Router);

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
