import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { CategoryChipComponent } from '../ui/category-chip/category-chip.component';
import { PriorityBadgeComponent } from '../ui/priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../ui/status-badge/status-badge.component';
import { TaskActionsComponent } from './task-actions.component';
import { DueDateComponent } from '../ui/due-date/due-date';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    CategoryChipComponent,
    PriorityBadgeComponent,
    StatusBadgeComponent,
    TaskActionsComponent,
    DueDateComponent,
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

  // Computed properties
  isOverdue = computed(() => {
    const dueDate = this.task().dueDate;
    if (!dueDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dueDate);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate < today && this.task().status !== 'done';
  });

}
