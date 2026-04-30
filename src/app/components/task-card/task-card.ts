import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { ButtonComponent } from '../ui/button/button.component';
import { CategoryChipComponent } from '../ui/category-chip/category-chip.component';
import { PriorityBadgeComponent } from '../ui/priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../ui/status-badge/status-badge.component';
import { DueDateComponent } from '../ui/due-date/due-date';
import { IsOverduePipe } from '../ui/due-date/is-overdue-pipe';
import { TaskActionsComponent } from './task-actions.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CategoryChipComponent,
    PriorityBadgeComponent,
    StatusBadgeComponent,
    DueDateComponent,
    IsOverduePipe,
    TaskActionsComponent,
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  // Inputs (Signals)
  task = input.required<Task>();
  category = input<Category | null>(null);

  // Outputs (Signals)
  deleted = output<string>();
  edited = output<Task>();
  statusChanged = output<{ id: string; status: TaskStatus }>();
}
