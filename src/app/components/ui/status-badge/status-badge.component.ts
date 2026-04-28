import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus, STATUS_LABELS } from '../../../models/task.model';
import { BadgeColorService } from '../../../services/badge-color.service';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [style.backgroundColor]="badgeStyle().bgColor"
      [style.color]="badgeStyle().textColor"
      class="status-badge"
    >
      <span class="badge-dot" [style.backgroundColor]="badgeStyle().dotColor"></span>
      {{ label() }}
    </span>
  `,
  styles: `
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.65rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .badge-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  `,
})
export class StatusBadgeComponent {
  status = input.required<TaskStatus>();

  constructor(private badgeColorService: BadgeColorService) {}

  label = computed(() => STATUS_LABELS[this.status()]);
  badgeStyle = computed(() => this.badgeColorService.getStatusStyle(this.status()));
}
