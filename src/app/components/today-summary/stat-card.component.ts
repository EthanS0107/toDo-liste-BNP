import { Component, input } from '@angular/core';

export type StatVariant = 'total' | 'todo' | 'in-progress' | 'done';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="stat-card" [attr.data-variant]="variant()">
      <div class="stat-header">
        <span class="stat-indicator" [attr.data-variant]="variant()"></span>
        <span class="stat-label">{{ label() }}</span>
      </div>
      <div class="stat-value">{{ value() }}</div>
    </div>
  `,
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<number>();
  variant = input.required<StatVariant>();
}
