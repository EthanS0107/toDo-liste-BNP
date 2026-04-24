import { Component, input, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-page-container">
      <h1>{{ isEditMode() ? 'Modifier' : 'Créer' }} une tâche</h1>

      <form (ngSubmit)="onSubmit()" class="task-form">
        <div class="form-group">
          <label for="title">Titre *</label>
          <input
            id="title"
            type="text"
            [ngModel]="title()"
            (ngModelChange)="title.set($event)"
            name="title"
            placeholder="Nom de la tâche"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            [ngModel]="description()"
            (ngModelChange)="description.set($event)"
            name="description"
            placeholder="Détails de la tâche..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="priority">Priorité</label>
          <select
            id="priority"
            [ngModel]="priority()"
            (ngModelChange)="priority.set($event)"
            name="priority"
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>

        @if (isEditMode()) {
          <div class="form-group">
            <label for="status">Statut</label>
            <select
              id="status"
              [ngModel]="status()"
              (ngModelChange)="status.set($event)"
              name="status"
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          </div>
        }

        <div class="form-group">
          <label for="categoryId">Catégorie</label>
          <select
            id="categoryId"
            [ngModel]="categoryId()"
            (ngModelChange)="categoryId.set($event)"
            name="categoryId"
          >
            <option value="">— Aucune —</option>
            @for (cat of taskService.categories(); track cat.id) {
              <option [value]="cat.id">{{ cat.name }}</option>
            }
          </select>
        </div>

        <div class="form-group">
          <label for="dueDate">Date d'échéance</label>
          <input
            id="dueDate"
            type="date"
            [ngModel]="dueDate()"
            (ngModelChange)="dueDate.set($event)"
            name="dueDate"
          />
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="!title().trim()">
            {{ isEditMode() ? 'Enregistrer' : 'Créer la tâche' }}
          </button>
          <button type="button" class="secondary" (click)="onCancel()">Annuler</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./task-form-page.component.css'],
})
export class TaskFormPage {
  id = input<string>();
  isEditMode = computed(() => !!this.id());

  private router = inject(Router);
  protected taskService = inject(TaskService);

  title = signal('');
  description = signal('');
  priority = signal<TaskPriority>('medium');
  status = signal<TaskStatus>('todo');
  categoryId = signal<string>('');
  dueDate = signal('');

  constructor() {
    effect(() => {
      const taskId = this.id();
      if (!taskId) return;
      const task = this.taskService.getTaskById(taskId);
      if (!task) return;

      this.title.set(task.title);
      this.description.set(task.description);
      this.priority.set(task.priority);
      this.status.set(task.status);
      this.categoryId.set(task.categoryId);

      if (task.dueDate) {
        const d = new Date(task.dueDate);
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        this.dueDate.set(`${d.getFullYear()}-${month}-${day}`);
      } else {
        this.dueDate.set('');
      }
    });
  }

  onSubmit() {
    const titleVal = this.title().trim();
    if (!titleVal) return;

    const dueDateVal = this.dueDate();
    const data = {
      title: titleVal,
      description: this.description(),
      priority: this.priority(),
      categoryId: this.categoryId(),
      dueDate: dueDateVal ? new Date(dueDateVal) : null,
    };

    const currentId = this.id();
    if (currentId && this.isEditMode()) {
      this.taskService.updateTask(currentId, { ...data, status: this.status() });
    } else {
      this.taskService.addTask(data);
    }

    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
