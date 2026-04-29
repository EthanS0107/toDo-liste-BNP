import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { ButtonComponent } from '../ui/button/button.component';
import { CategoryChipComponent } from '../ui/category-chip/category-chip.component';
import { PriorityBadgeComponent } from '../ui/priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../ui/status-badge/status-badge.component';
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

  relativeDueDate = computed(() => {
    const dueDate = this.task().dueDate;
    if (!dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(dueDate);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    if (diffDays === -1) return 'Hier';
    if (diffDays > 1) return `Dans ${diffDays} jours`;
    return `Il y a ${Math.abs(diffDays)} jours`;
  });
}
