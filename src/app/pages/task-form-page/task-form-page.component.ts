import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-page-container">
      <h1>{{ id ? 'Modifier' : 'Créer' }} une tâche</h1>

      <form (ngSubmit)="onSubmit()" class="task-form">
        <div class="form-group">
          <label for="title">Titre *</label>
          <input
            id="title"
            type="text"
            [(ngModel)]="title"
            name="title"
            placeholder="Nom de la tâche"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            [(ngModel)]="description"
            name="description"
            placeholder="Détails de la tâche..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="priority">Priorité</label>
          <select id="priority" [(ngModel)]="priority" name="priority">
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>

        <div class="form-group">
          <label for="dueDate">Date d'échéance</label>
          <input
            id="dueDate"
            type="date"
            [(ngModel)]="dueDate"
            name="dueDate"
          />
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="!title()">
            {{ id ? 'Enregistrer' : 'Créer la tâche' }}
          </button>
          <button type="button" class="secondary" (click)="onCancel()">
            Annuler
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./task-form-page.component.css']
})
export class TaskFormPage {
  @Input() id?: string;

  private router = inject(Router);
  private taskService = inject(TaskService);

  title = signal('');
  description = signal('');
  priority = signal('medium');
  dueDate = signal('');

  onSubmit() {
    const titleVal = this.title();
    if (!titleVal) return;

    const dueDateVal = this.dueDate();
    const updateData = {
      title: titleVal,
      description: this.description(),
      priority: this.priority() as any,
      dueDate: dueDateVal ? new Date(dueDateVal) : null,
    };

    if (this.id) {
      this.taskService.updateTask(this.id, updateData);
    } else {
      this.taskService.addTask(updateData);
    }

    this.router.navigate(['/tasks']);
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
