import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks-page/tasks-page.component').then(m => m.TasksPage)
  },

  {
    path: 'today',
    loadComponent: () => import('./pages/today-page/today-page.component').then(m => m.TodayPage)
  },

  {
    path: 'agenda',
    loadComponent: () => import('./pages/agenda-page/agenda-page.component').then(m => m.AgendaPageComponent)
  },

  {
    path: 'profile',
    loadComponent: () => import('./pages/tasks-page/tasks-page.component').then(m => m.TasksPage)
  },

  {
    path: 'tasks/new',
    loadComponent: () => import('./pages/task-form-page/task-form-page.component').then(m => m.TaskFormPage)
  },

  {
    path: 'tasks/:id/edit',
    loadComponent: () => import('./pages/task-form-page/task-form-page.component').then(m => m.TaskFormPage)
  },

  { path: '**', redirectTo: 'tasks' }
];
