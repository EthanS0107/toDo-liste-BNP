import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fab-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a class="fab" [routerLink]="link()" [attr.aria-label]="label()">
      <span class="fab-icon" aria-hidden="true">+</span>
      <span class="fab-label">{{ label() }}</span>
    </a>
  `,
  styleUrl: './fab-button.component.css',
})
export class FabButtonComponent {
  label = input<string>('Nouvelle tâche');
  link = input<string>('/tasks/new');
}
