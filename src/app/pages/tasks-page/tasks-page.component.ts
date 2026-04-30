import { Component, inject, signal, computed, linkedSignal, viewChild, ElementRef, effect } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { TaskStatus, Task, TaskFilterState } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskList, DashboardComponent, TaskFilterComponent, CommonModule],
  template: `
    @let categories = taskService.categories();
    @let priorities = taskService.priorities();
    <div class="tasks-page-container">
      <div class="tasks-page-header">
        <h1>Mes Tâches</h1>
      </div>

      <app-dashboard />

      <app-task-filter
        [categories]="categories"
        [priorities]="priorities"
        (filterChange)="onFilterChange($event)"
      />

      <app-task-list
        [tasks]="sortedTasks()"
        [categories]="categories"
        [priorities]="priorities"
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

  onFilterChange(filters: TaskFilterState) {
    this.searchQuery.set(filters.search);
    this.selectedStatus.set(filters.status);
    this.selectedCategory.set(filters.categoryId);
    this.selectedPriority.set(filters.priority);
    this.sortField.set(filters.sortBy);
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
