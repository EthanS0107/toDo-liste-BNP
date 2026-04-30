import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  standalone: true,
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined, isOverdue: boolean = false): string | null {
    if (!value) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(value);
    const displayDate = new Date(value);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    if (diffDays === -1) return isOverdue ? 'Hier (En retard)' : 'Hier';

    if (diffDays < 0) {
      const label = isOverdue ? 'En retard de' : 'Il y a';
      return `${label} ${Math.abs(diffDays)} jour${Math.abs(diffDays) > 1 ? 's' : ''}`;
    }

    if (diffDays > 7) {
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: diffDays > 365 ? 'numeric' : undefined,
      }).format(displayDate);
    }

    return `Dans ${diffDays} jours`;
  }
}
