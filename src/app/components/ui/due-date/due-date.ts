import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelativeDatePipe } from './relative-date-pipe';

@Component({
  selector: 'app-due-date',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './due-date.html',
})
export class DueDateComponent {
  date = input<string | Date | null>(null);
  overdue = input<boolean>(false);

  urgencyClass = computed(() => {
    const d = this.date();
    if (!d) return 'text-slate-500';

    if (this.overdue()) {
      return 'text-red-600 font-medium';
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(d);
    targetDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'text-orange-600 font-medium';
    if (diffDays === 1) return 'text-yellow-600 font-medium';
    
    return 'text-slate-500';
  });
}
