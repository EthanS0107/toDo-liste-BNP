import { Component, input, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
        (cancelled)="goBack()"
      />
    </div>
  `,
  styleUrls: ['./task-form-page.component.css'],
})
export class TaskFormPage {
  id = input<string>();
  date = input<string>();
  isEditMode = computed(() => !!this.id());
  task = computed(() => {
    if (this.id()) {
      return this.taskService.getTaskById(this.id()!) ?? null;
    }
    if (this.date()) {
      return {
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        categoryId: '',
        dueDate: new Date(this.date()!),
        createdAt: new Date(),
        updatedAt: new Date()
      } as Task;
    }
    return null;
  });

  protected taskService = inject(TaskService);
  protected router = inject(Router);
  protected location = inject(Location);

  goBack() {
    this.location.back();
  }

  onSubmit(data: Partial<Task>) {
    const currentId = this.id();
    if (currentId && this.isEditMode()) {
      this.taskService.updateTask(currentId, data);
    } else {
      this.taskService.addTask(data as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    }
    this.goBack();
  }
}
