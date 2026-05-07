import { Component, input, output } from '@angular/core';

export type StatVariant = 'total' | 'todo' | 'in-progress' | 'done';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <button
      type="button"
      class="stat-card"
      [attr.data-variant]="variant()"
      [class.active]="active()"
      (click)="cardClick.emit()"
    >
      <span class="stat-label">{{ label() }}</span>
      <span class="stat-value">{{ value() }}</span>
    </button>
  `,
  styleUrl: './stat-card.component.css',
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<number>();
  variant = input.required<StatVariant>();
  active = input<boolean>(false);
  cardClick = output<void>();
}
