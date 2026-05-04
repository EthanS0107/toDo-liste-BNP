import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      @if (icon()) {
        <span class="empty-state__icon">{{ icon() }}</span>
      }
      <h3 class="empty-state__title">{{ title() }}</h3>
      @if (message()) {
        <p class="empty-state__message">{{ message() }}</p>
      }
      <ng-content />
    </div>
  `,
  styleUrl: './empty-state.component.css',
})
export class EmptyStateComponent {
  icon = input<string>('');
  title = input.required<string>();
  message = input<string>('');
}
