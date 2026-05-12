import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskFiltersService } from '../../services/task-filters.service';
import { TaskList } from '../../components/task-list/task-list';
import { DailyHeaderComponent } from '../../components/shared/daily-header/daily-header.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { EmptyStateComponent } from '../../components/ui/empty-state/empty-state.component';
import { FabButtonComponent } from '../../components/shared/fab-button/fab-button.component';
import { BottomNavComponent } from '../../components/shared/bottom-nav/bottom-nav.component';
import { TaskSkeletonComponent } from '../../components/task-list/task-skeleton.component';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-today-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TaskList,
    TaskSkeletonComponent,
    DailyHeaderComponent,
    DashboardComponent,
    TaskFilterComponent,
    EmptyStateComponent,
    FabButtonComponent,
    BottomNavComponent,
  ],
  template: `
    @let categories = taskService.categories();
    @let priorities = taskService.priorities();
    <div class="today-page-container">
      <app-daily-header />
      <app-stats-dashboard />

      <app-task-filter
        [priorities]="priorities"
        [hideDateSort]="true"
      />

      @defer (on idle; on interaction) {
        @if (filters.scopedTotal() === 0) {
          <app-empty-state
            type="empty-tasks"
            title="Rien au programme aujourd'hui"
            message="Aucune tâche n'est due aujourd'hui ou en retard. Profitez-en pour planifier la suite."
          >
            <button class="primary" routerLink="/tasks/new">
              Ajouter une tâche
            </button>
          </app-empty-state>
        } @else if (filters.filteredTasks().length === 0) {
          <app-empty-state
            type="no-results"
            title="Aucune tâche dans ce filtre"
            message="Aucune tâche du jour ne correspond au statut sélectionné."
          >
            <button (click)="filters.selectedStatus.set(null)">
              Réinitialiser le filtre
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
  styleUrls: ['./today-page.component.css'],
})
export class TodayPage implements OnInit, OnDestroy {
  protected taskService = inject(TaskService);
  protected filters = inject(TaskFiltersService);
  private router = inject(Router);

  ngOnInit() {
    this.filters.scope.set('today');
  }

  ngOnDestroy() {
    this.filters.scope.set('all');
    this.filters.resetFilters();
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
