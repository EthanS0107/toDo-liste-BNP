import { Routes } from '@angular/router';

// Définition des routes de l'application.
// Utilise le Lazy Loading via loadComponent pour optimiser le temps de chargement initial.
export const routes: Routes = [
  // Redirection de la racine vers la liste des tâches
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  // Page de liste des tâches
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks-page/tasks-page.component').then(m => m.TasksPage)
  },

  // Page de création d'une nouvelle tâche
  {
    path: 'tasks/new',
    loadComponent: () => import('./pages/task-form-page/task-form-page.component').then(m => m.TaskFormPage)
  },

  // Page d'édition d'une tâche existante via son ID
  {
    path: 'tasks/:id/edit',
    loadComponent: () => import('./pages/task-form-page/task-form-page.component').then(m => m.TaskFormPage)
  },

  // Redirection par défaut pour les routes inconnues
  { path: '**', redirectTo: 'tasks' }
];
