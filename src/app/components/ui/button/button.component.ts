import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [title]="title()"
      [class]="classes()"
    >
      <ng-content />
    </button>
  `,
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'danger' | 'ghost' | 'filter'>('primary');
  size = input<'sm' | 'md'>('md');
  disabled = input(false);
  title = input('');
  type = input<'button' | 'submit' | 'reset'>('button');
  active = input(false);

  classes = computed(() => {
    const base = `btn btn-${this.variant()} btn-${this.size()}`;
    return this.active() ? `${base} active` : base;
  });
}
