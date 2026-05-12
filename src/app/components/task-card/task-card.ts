import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { PriorityBadgeComponent } from '../ui/priority-badge/priority-badge.component';
import { StatusBadgeComponent } from '../ui/status-badge/status-badge.component';
import { BadgeColorService } from '../../services/badge-color.service';

const CATEGORY_REF_MAP: Record<string, string> = {
  cat1: 'TRV',
  cat2: 'PER',
  cat3: 'FIN',
  cat4: 'SAN',
};

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, PriorityBadgeComponent, StatusBadgeComponent],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  task = input.required<Task>();
  category = input<Category | null>(null);

  deleted = output<string>();
  edited = output<Task>();
  statusChanged = output<{ id: string; status: TaskStatus }>();

  private badgeColorService = inject(BadgeColorService);

  protected badgeStyle = computed(() =>
    this.badgeColorService.getStatusStyle(this.task().status),
  );

  protected checkboxBorder = computed(() => {
    const status = this.task().status;
    if (status === 'done') return 'rgb(15, 107, 74)';
    if (status === 'in-progress') return 'rgb(160, 106, 20)';
    return 'rgb(221, 225, 220)';
  });

  protected formattedTime = computed(() => {
    const d = this.task().dueDate;
    if (!d) return '';
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  });

  protected taskRef = computed(() => {
    const t = this.task();
    const prefix = CATEGORY_REF_MAP[t.categoryId] ?? 'TSK';
    const numeric = t.id.replace(/[^0-9]/g, '').slice(-4).padStart(4, '0') || '0001';
    return `${prefix}-${numeric}`;
  });

  protected onToggleStatus(event: MouseEvent) {
    event.stopPropagation();
    const current = this.task().status;
    const next: TaskStatus =
      current === 'todo' ? 'in-progress' : current === 'in-progress' ? 'done' : 'todo';
    this.statusChanged.emit({ id: this.task().id, status: next });
  }

  protected onCardClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('.checkbox')) return;
    this.edited.emit(this.task());
  }
}
