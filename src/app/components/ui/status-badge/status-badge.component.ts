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
  styleUrl: './status-badge.component.css',
})
export class StatusBadgeComponent {
  status = input.required<TaskStatus>();

  constructor(private badgeColorService: BadgeColorService) {}

  label = computed(() => STATUS_LABELS[this.status()]);
  badgeStyle = computed(() => this.badgeColorService.getStatusStyle(this.status()));
}
