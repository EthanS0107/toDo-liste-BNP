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
  styleUrl: './category-chip.component.css',
})
export class CategoryChipComponent {
  category = input.required<Category>();

  backgroundColor = computed(() => `${this.category().color}1a`);
}
