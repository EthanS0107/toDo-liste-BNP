import { Component, input, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-page-container">
      <!-- Le titre s'adapte dynamiquement selon le mode (Création vs Édition) -->
      <h1>{{ isEditMode() ? 'Modifier' : 'Créer' }} une tâche</h1>

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
          <!-- Bouton de soumission : désactivé si le titre est vide -->
          <button type="submit" [disabled]="!title()">
            {{ isEditMode() ? 'Enregistrer' : 'Créer la tâche' }}
          </button>
          <!-- Bouton d'annulation : redirige vers la liste -->
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
  // Récupère l'ID de la tâche directement depuis l'URL grâce au withComponentInputBinding()
  id = input<string>();

  // Définit si nous sommes en mode édition en fonction de la présence d'un ID
  isEditMode = computed(() => !!this.id());

  private router = inject(Router);
  private taskService = inject(TaskService);

  // Signaux réactifs pour les données du formulaire
  title = signal('');
  description = signal('');
  priority = signal<TaskPriority>('medium');
  dueDate = signal('');

  constructor() {
    // Surveille les changements d'ID (ex: passage d'une tâche à une autre)
    effect(() => {
      const taskId = this.id();
      // Si un ID est présent, on charge les données de la tâche depuis le service
      if (taskId) {
        const task = this.taskService.getTaskById(taskId);
        if (task) {
          this.title.set(task.title);
          this.description.set(task.description);
          this.priority.set(task.priority);

          // Formatage de la date en YYYY-MM-DD pour l'affichage dans un input HTML5 type="date"
          if (task.dueDate) {
            const d = new Date(task.dueDate);
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const day = d.getDate().toString().padStart(2, '0');
            this.dueDate.set(`${d.getFullYear()}-${month}-${day}`);
          } else {
            this.dueDate.set('');
          }
        }
      }
    });
  }

  // Enregistre les modifications ou crée une nouvelle tâche
  onSubmit() {
    const titleVal = this.title();
    if (!titleVal) return;

    const dueDateVal = this.dueDate();
    const updateData = {
      title: titleVal,
      description: this.description(),
      priority: this.priority(),
      dueDate: dueDateVal ? new Date(dueDateVal) : null,
    };

    const currentId = this.id();
    if (currentId && this.isEditMode()) {
      // Appel du service pour la mise à jour
      this.taskService.updateTask(currentId, updateData);
    } else {
      // Appel du service pour la création
      this.taskService.addTask(updateData);
    }

    // Retour automatique à la liste après l'action
    this.router.navigate(['/tasks']);
  }

  // Annule l'action en cours et retourne à la liste
  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
