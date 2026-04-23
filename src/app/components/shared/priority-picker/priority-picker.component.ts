import { Component, model } from '@angular/core';
import { TaskPriority } from '../../../models/task.model';

@Component({
  selector: 'app-priority-picker',
  imports: [],
  templateUrl: './priority-picker.component.html',
  styleUrl: './priority-picker.component.css',
})
export class PriorityPickerComponent {
  // C'est notre "Signal" spécial qui permet l'aller-retour avec le parent
  // Par défaut, on met la priorité sur 'medium'
  value = model<TaskPriority>('medium');

  // Une simple liste pour créer nos boutons dans le HTML
  priorities: TaskPriority[] = ['low', 'medium', 'high'];
}
