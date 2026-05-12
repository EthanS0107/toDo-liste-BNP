import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="fab" [routerLink]="link()" [attr.aria-label]="label()">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M7 2v10M2 7h10" />
      </svg>
      <span class="fab-label">{{ label() }}</span>
    </a>
  `,
  styleUrl: './fab-button.component.css',
})
export class FabButtonComponent {
  label = input<string>('Nouvelle tâche');
  link = input<string>('/tasks/new');
}
