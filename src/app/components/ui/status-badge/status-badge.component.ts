import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus, STATUS_LABELS, STATUS_ICONS } from '../../../models/task.model';
import { BadgeColorService } from '../../../services/badge-color.service';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="status-badge"
      [style.backgroundColor]="badgeStyle().bgColor"
      [style.color]="badgeStyle().textColor"
      [style.borderColor]="badgeStyle().borderColor"
    >
      <span class="badge-icon" aria-hidden="true">{{ icon() }}</span>
      {{ label() }}
    </span>
  `,
  styleUrl: './status-badge.component.css',
})
export class StatusBadgeComponent {
  status = input.required<TaskStatus>();

  constructor(private badgeColorService: BadgeColorService) {}

  label = computed(() => STATUS_LABELS[this.status()]);
  icon = computed(() => STATUS_ICONS[this.status()]);
  badgeStyle = computed(() => this.badgeColorService.getStatusStyle(this.status()));
}
