import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Page affichant la liste des tâches.
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <h1>Mes Tâches</h1>
      <p>Liste des tâches à venir...</p>
      <!-- Utilisation de routerLink pour la navigation SPA sans rechargement -->
      <button routerLink="/tasks/new">Nouvelle Tâche</button>
    </div>
  `,
  styles: []
})
export class TasksPage { }
