import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  template: `
    <div class="form-group">
      <label [for]="fieldId()">{{ label() }}</label>
      <ng-content />
    </div>
  `,
  styles: [`
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    label { font-weight: 600; color: var(--color-gray-800); font-size: 0.95rem; }
  `],
})
export class FormFieldComponent {
  label = input.required<string>();
  fieldId = input<string>('');
}
