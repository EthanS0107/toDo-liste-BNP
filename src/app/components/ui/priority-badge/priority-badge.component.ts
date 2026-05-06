import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPriority, PRIORITY_LABELS } from '../../../models/task.model';
import { BadgeColorService } from '../../../services/badge-color.service';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [style.backgroundColor]="badgeStyle().bgColor"
      [style.color]="badgeStyle().textColor"
      class="priority-badge"
    >
      <span class="badge-dot" [style.backgroundColor]="badgeStyle().dotColor"></span>
      {{ label() }}
    </span>
  `,
  styleUrl: './priority-badge.component.css',
})
export class PriorityBadgeComponent {
  priority = input.required<TaskPriority>();

  constructor(private badgeColorService: BadgeColorService) {}

  label = computed(() => PRIORITY_LABELS[this.priority()]);
  badgeStyle = computed(() => this.badgeColorService.getPriorityStyle(this.priority()));
}
