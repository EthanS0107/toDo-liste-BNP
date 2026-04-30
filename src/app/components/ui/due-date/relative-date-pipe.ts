import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  standalone: true,
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string | null {
    if (!value) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(value);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Demain';
    if (diffDays === -1) return 'Hier';
    
    if (diffDays < 0) {
      return `En retard de ${Math.abs(diffDays)} jours`;
    }
    
    if (diffDays <= 7) {
      return `Dans ${diffDays} jours`;
    }

    // Date longue si > 7 jours
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));
  }
}
