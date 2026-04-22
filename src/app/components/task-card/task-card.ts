import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus, PRIORITY_LABELS, STATUS_LABELS } from '../../models/task.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
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

  priorityLabel = computed(() => PRIORITY_LABELS[this.task().priority]);
  statusLabel = computed(() => STATUS_LABELS[this.task().status]);

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
    if (diffDays === 1) return "Demain";
    if (diffDays === -1) return "Hier";
    if (diffDays > 1) return `Dans ${diffDays} jours`;
    return `Il y a ${Math.abs(diffDays)} jours`;
  });

  // Methods pour émettre les événements
  onDelete() {
    this.deleted.emit(this.task().id);
  }

  onEdit() {
    this.edited.emit(this.task());
  }

  onStatusChange(newStatus: TaskStatus) {
    this.statusChanged.emit({ id: this.task().id, status: newStatus });
  }
}
