import { Component, computed, input } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-chip',
  standalone: true,
  template: `
    <span
      class="category-chip"
      [style.backgroundColor]="backgroundColor()"
      [style.color]="category().color"
    >
      <span class="category-dot" [style.backgroundColor]="category().color"></span>
      {{ category().name }}
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .category-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.65rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .category-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `,
})
export class CategoryChipComponent {
  category = input.required<Category>();

  backgroundColor = computed(() => `${this.category().color}1a`);
}
