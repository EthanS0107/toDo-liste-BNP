import { Component, input, output } from '@angular/core';
import { TaskStatus, STATUS_LABELS } from '../../models/task.model';

interface StatusOption {
  value: TaskStatus | null;
  label: string;
}

@Component({
  selector: 'app-status-filter',
  standalone: true,
  template: `
    <div class="filter-buttons">
      @for (option of options; track option.label) {
        <button
          class="filter-btn"
          [class.active]="selected() === option.value"
          (click)="selectedChange.emit(option.value)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styleUrls: ['./status-filter.component.css'],
})
export class StatusFilter {
  selected = input<TaskStatus | null>(null);
  selectedChange = output<TaskStatus | null>();

  protected options: StatusOption[] = [
    { value: null, label: 'Toutes' },
    ...( Object.entries(STATUS_LABELS) as [TaskStatus, string][] ).map(
      ([value, label]) => ({ value, label })
    ),
  ];
}
