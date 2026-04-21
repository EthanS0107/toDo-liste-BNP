import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

// Page de formulaire pour créer ou modifier une tâche.
@Component({
  selector: 'app-task-form-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <h1>{{ id ? 'Modifier' : 'Créer' }} une tâche</h1>
      
      <!-- Affichage conditionnel de l'ID si nous sommes en mode édition -->
      @if (id) {
        <p>ID de la tâche : {{ id }}</p>
      }
      
      <form>
        <div>
          <label>Titre</label>
          <input type="text" placeholder="Nom de la tâche">
        </div>
        <div>
          <button type="submit">
            {{ id ? 'Enregistrer' : 'Ajouter' }}
          </button>
          <button type="button" routerLink="/tasks">Annuler</button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class TaskFormPage {
  // Identifiant de la tâche, récupéré automatiquement de l'URL (:id)
  // grâce à withComponentInputBinding() dans app.config.ts
  @Input() id?: string;
}
