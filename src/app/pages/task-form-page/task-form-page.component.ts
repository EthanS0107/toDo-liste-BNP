import { Component, input, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { PageHeader } from '../../components/shared/page-header/page-header';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [TaskFormComponent, PageHeader],
  template: `
    <div class="form-page-container">
      <app-page-header>{{ isEditMode() ? 'Modifier' : 'Créer' }} une tâche</app-page-header>
      <app-task-form
        [initialTask]="task()"
        [editMode]="isEditMode()"
        [categories]="taskService.categories()"
        (submitted)="onSubmit($event)"
        (cancelled)="router.navigate(['/tasks'])"
      />
    </div>
  `,
  styleUrls: ['./task-form-page.component.css'],
})
export class TaskFormPage {
  id = input<string>();
  isEditMode = computed(() => !!this.id());
  task = computed(() => (this.id() ? (this.taskService.getTaskById(this.id()!) ?? null) : null));

  protected taskService = inject(TaskService);
  protected router = inject(Router);

  onSubmit(data: Partial<Task>) {
    const currentId = this.id();
    if (currentId && this.isEditMode()) {
      this.taskService.updateTask(currentId, data);
    } else {
      this.taskService.addTask(data as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    }
    this.router.navigate(['/tasks']);
  }
}
