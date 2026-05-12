import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskFiltersService } from '../../services/task-filters.service';
import { TaskList } from '../../components/task-list/task-list';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { CategoryTabsComponent } from '../../components/category-tabs/category-tabs.component';
import { EmptyStateComponent } from '../../components/ui/empty-state/empty-state.component';
import { FabButtonComponent } from '../../components/shared/fab-button/fab-button.component';
import { BottomNavComponent } from '../../components/shared/bottom-nav/bottom-nav.component';
import { TaskStatus, Task } from '../../models/task.model';
import { StatsSkeletonComponent } from '../../components/dashboard/stats-skeleton.component';
import { TaskSkeletonComponent } from '../../components/task-list/task-skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    TaskList,
    DashboardComponent,
    StatsSkeletonComponent,
    TaskSkeletonComponent,
    TaskFilterComponent,
    CommonModule,
    CategoryTabsComponent,
    EmptyStateComponent,
    FabButtonComponent,
    BottomNavComponent,
    RouterLink,
  ],
  template: `
    @let categories = taskService.categories();
    @let priorities = taskService.priorities();
    <div class="tasks-page-container">
      @defer (on viewport) {
        <app-stats-dashboard></app-stats-dashboard>
      } @placeholder {
        <app-stats-skeleton></app-stats-skeleton>
      } @loading {
        <div>Chargement...</div>
      }

      <app-task-filter
        [categories]="categories"
        [priorities]="priorities"
      />

      <app-category-tabs />

      @defer (on idle; on interaction) {
        @if (taskService.tasks().length === 0) {
          <app-empty-state
            type="empty-tasks"
            title="Prêt à être productif ?"
            message="Commencez par ajouter votre première tâche pour organiser votre journée."
          >
            <button class="primary" routerLink="/tasks/new">
              Créer ma première tâche
            </button>
          </app-empty-state>
        } @else if (filters.filteredTasks().length === 0) {
          <app-empty-state
            type="no-results"
            title="Aucun résultat trouvé"
            message="Nous n'avons trouvé aucune tâche correspondant à vos critères de recherche."
          >
            <button (click)="filters.resetFilters()">
              Réinitialiser les filtres
            </button>
          </app-empty-state>
        } @else {
          <app-task-list
            [tasks]="filters.sortedTasks()"
            [categories]="categories"
            [priorities]="priorities"
            (taskDeleted)="onTaskDeleted($event)"
            (taskEdited)="onTaskEdited($event)"
            (taskStatusChanged)="onTaskStatusChanged($event)"
            (taskReordered)="onTaskReordered($event)"
          />
        }
      } @placeholder {
        <app-task-skeleton />
      }
    </div>

    <app-fab-button />
    <app-bottom-nav />
  `,
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPage implements OnInit {
  protected taskService = inject(TaskService);
  protected filters = inject(TaskFiltersService);
  private router = inject(Router);

  ngOnInit() {
    this.filters.scope.set('all');
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

  onTaskReordered(data: { taskId: string; targetSiblingId: string; position: 'before' | 'after' }) {
    this.taskService.reorderTask(data.taskId, data.targetSiblingId, data.position);
  }
}
