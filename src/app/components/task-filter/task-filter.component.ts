import { Component, input, output, signal, effect, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskStatus, TaskFilterState } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { ButtonComponent } from '../ui/button/button.component';
import { FormFieldComponent } from '../ui/form-field/form-field.component';
import { StatusFilter } from '../status-filter/status-filter.component';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, FormFieldComponent, StatusFilter],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent {
  categories = input<Category[]>([]);
  priorities = input<{ id: string; name: string }[]>([]);

  filterChange = output<TaskFilterState>();

  // Signaux internes pour l'état des filtres
  search = signal('');
  status = signal<TaskStatus | null>(null);
  categoryId = signal<string | null>(null);
  priority = signal<string | null>(null);
  sortBy = signal<'date' | 'priority' | 'title' | 'manual'>('manual');

  searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    // Auto-focus au chargement
    effect(() => {
      this.searchInputRef()?.nativeElement.focus();
    });

    // Émettre les changements d'état dès qu'un signal interne change
    effect(() => {
      this.filterChange.emit({
        search: this.search(),
        status: this.status(),
        categoryId: this.categoryId(),
        priority: this.priority(),
        sortBy: this.sortBy(),
      });
    });
  }

  /**
   * Réinitialise tous les filtres à leurs valeurs par défaut
   */
  resetFilters() {
    this.search.set('');
    this.status.set(null);
    this.categoryId.set(null);
    this.priority.set(null);
    this.sortBy.set('manual');
  }
}
