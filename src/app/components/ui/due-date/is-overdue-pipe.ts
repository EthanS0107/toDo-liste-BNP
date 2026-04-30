import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isOverdue',
  standalone: true,
})
export class IsOverduePipe implements PipeTransform {
  transform(dueDate: string | Date | null | undefined, status: string): boolean {
    if (!dueDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dueDate);
    targetDate.setHours(0, 0, 0, 0);

    return targetDate < today && status !== 'done';
  }
}
