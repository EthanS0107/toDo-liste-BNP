import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskFiltersService } from '../../services/task-filters.service';
import { TaskList } from '../../components/task-list/task-list';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { PageHeader } from '../../components/shared/page-header/page-header';
import { EmptyStateComponent } from '../../components/ui/empty-state/empty-state.component';
import { TaskStatus, Task, TaskFilterState } from '../../models/task.model';
import { StatsSkeletonComponent } from '../../components/dashboard/stats-skeleton.component';
import { TaskSkeletonComponent } from '../../components/task-list/task-skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TaskList, DashboardComponent, StatsSkeletonComponent, TaskSkeletonComponent, TaskFilterComponent, CommonModule, PageHeader, EmptyStateComponent],
  template: `
    @let categories = taskService.categories();
    @let priorities = taskService.priorities();
    <div class="tasks-page-container">
      <app-page-header> Mes Tâches </app-page-header>

      @defer (on viewport) {
        <app-stats-dashboard />
      } @placeholder {
        <app-stats-skeleton />
      } @loading {
        <div>Chargement...</div>
      }

      <app-task-filter
        [categories]="categories"
        [priorities]="priorities"
        (filterChange)="onFilterChange($event)"
      />

      @defer (on idle; on interaction) {
        <div class="fade-in">
          @if (filters.filteredTasks().length === 0) {
            <app-empty-state
              icon="📭"
              title="Aucune tâche trouvée"
              message="Aucune tâche ne correspond aux filtres sélectionnés."
            />
          } @else {
            <app-task-list
              [tasks]="filters.sortedTasks()"
              [categories]="categories"
              [priorities]="priorities"
              (taskDeleted)="onTaskDeleted($event)"
              (taskEdited)="onTaskEdited($event)"
              (taskStatusChanged)="onTaskStatusChanged($event)"
            />
          }
        </div>
      } @placeholder {
        <app-task-skeleton />
      }
    </div>
  `,
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPage {
  protected taskService = inject(TaskService);
  protected filters = inject(TaskFiltersService);
  private router = inject(Router);

  onFilterChange(filters: TaskFilterState) {
    this.filters.applyFilters(filters);
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
