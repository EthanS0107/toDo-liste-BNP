import { Component, inject, signal, computed, linkedSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';
import { StatsBar } from '../../components/stats-bar/stats-bar.component';
import { StatusFilter } from '../../components/status-filter/status-filter.component';
import { TaskStatus, Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskList, StatsBar, StatusFilter, CommonModule],
  template: `
    <div class="tasks-page-container">
      <div class="tasks-page-header">
        <h1>Mes Tâches</h1>
        <app-stats-bar [stats]="taskService.stats()" [total]="taskService.total()" />
      </div>

      <div>
        <input
          type="search"
          #searchInput
          placeholder="Rechercher une tâche..."
          (input)="searchQuery.set(searchInput.value)"
        />
      </div>

      <!-- Filtres par statut -->
      <app-status-filter
        [selected]="selectedStatus()"
        (selectedChange)="selectedStatus.set($event)"
      />

      <!-- Filtres par catégorie -->
      <div class="category-filter">
        <select
          class="category-select"
          #catSelect
          (change)="selectedCategory.set(catSelect.value || null)"
        >
          <option value="">Toutes les catégories</option>
          @for (cat of taskService.categories(); track cat.id) {
            <option [value]="cat.id" [selected]="selectedCategory() === cat.id">
              {{ cat.name }}
            </option>
          }
        </select>
      </div>

      <!-- Filtres par priorité -->
      <div class="priority-filter">
        <select
          class="priority-select"
          #prioritySelect
          (change)="selectedPriority.set(prioritySelect.value || null)"
        >
          <option value="">Toutes les priorités</option>
          @for (priority of taskService.priorities(); track priority.id) {
            <option [value]="priority.id" [selected]="selectedPriority() === priority.id">
              {{ priority.name }}
            </option>
          }
        </select>
      </div>

      <!-- Filtre de tri -->
      <div class="sort-filter">
        <select
          class="sort-select"
          [value]="sortField()"
          (change)="sortField.set($any($event.target).value)"
        >
          <option value="date">Trier par Date</option>
          <option value="priority">Trier par Priorité</option>
          <option value="title">Trier par Titre</option>
        </select>
      </div>

      <app-task-list
        [tasks]="sortedTasks()"
        [categories]="taskService.categories()"
        [priorities]="taskService.priorities()"
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

  // Signaux pour l'état des filtres
  searchQuery = signal<string>('');
  debouncedSearchQuery = toSignal(
    toObservable(this.searchQuery).pipe(debounceTime(300)),
    { initialValue: '' }
  );
  selectedStatus = signal<TaskStatus | null>(null);
  selectedCategory = signal<string | null>(null);
  selectedPriority = signal<string | null>(null);
  sortField = signal<'date' | 'priority' | 'title'>('date');

  // Computed pour les tâches filtrées (plus compact)
  filteredTasks = computed(() => {
    const search = this.debouncedSearchQuery().toLowerCase().trim();
    const status = this.selectedStatus();
    const category = this.selectedCategory();
    const priority = this.selectedPriority();

    return this.taskService
      .tasks()
      .filter(
        (task) =>
          (!search || task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) &&
          (!status || task.status === status) &&
          (!category || task.categoryId === category) &&
          (!priority || task.priority === priority),
      );
  });

  sortedTasks = linkedSignal({
    source: () => ({ tasks: this.filteredTasks(), sort: this.sortField() }),
    computation: (source) => {
      const tasks = [...source.tasks];
      const priorityWeight: Record<string, number> = { high: 3, medium: 2, low: 1 };

      return tasks.sort((a, b) => {
        switch (source.sort) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'priority':
            return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
          case 'date':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
    }
  });

  setStatusFilter(status: TaskStatus | null) {
    this.selectedStatus.set(status);
  }

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
