import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelativeDatePipe } from './relative-date-pipe';

@Component({
  selector: 'app-due-date',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './due-date.html',
  styleUrl: './due-date.css',
})
export class DueDateComponent {
  date = input<string | Date | null>(null);
  overdue = input<boolean>(false);
  isCompleted = input<boolean>(false);

  urgency = computed(() => {
    if (this.isCompleted()) return 'none';
    if (this.overdue()) return 'red';

    const d = this.date();
    if (!d) return 'none';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(d);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'orange';
    if (diffDays === 1) return 'yellow';
    return 'none';
  });
}
