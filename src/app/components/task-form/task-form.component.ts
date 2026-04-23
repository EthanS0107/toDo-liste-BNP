import { Component, input, output, signal, effect, model } from '@angular/core';
import { Task } from '../../models/task.model';
import { PriorityPickerComponent } from '../priority-picker/priority-picker.component';
import { TaskPriority, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [PriorityPickerComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  // On reçoit éventuellement une tâche à modifier
  initialTask = input<Task | null>(null);

  // On envoie un signal quand on a fini ou annulé
  saved = output<any>();
  cancelled = output<void>();

  // Chaque signal correspond à une case vide au début
  title = signal('');
  description = signal('');
  priority = signal<TaskPriority>('medium');
  status = signal<TaskStatus>('todo');
  categoryId = signal<string>('');
  dueDate = signal<string>('');

  constructor() {
    // Cette fonction 'effect' surveille si on nous donne une 'initialTask'
    // Si oui, elle remplit automatiquement les tiroirs avec les infos de la tâche
    effect(() => {
      const task = this.initialTask();
      if (task) {
        this.title.set(task.title);
        this.description.set(task.description);
        this.priority.set(task.priority);
        this.status.set(task.status);
        this.categoryId.set(task.categoryId);
        if (task.dueDate) {
          this.dueDate.set(new Date(task.dueDate).toISOString().split('T')[0]);
        }
      }
    });
  }

  submit() {
    // Si le titre est vide, on s'arrête là
    if (!this.title()) return;

    // On prépare le paquet de données
    const data = {
      title: this.title(),
      description: this.description(),
      priority: this.priority(),
      status: this.status(),
      categoryId: this.categoryId(),
      dueDate: this.dueDate() ? new Date(this.dueDate()) : null,
    };

    // On envoie le paquet vers le reste de l'application
    this.saved.emit(data);
  }
}
