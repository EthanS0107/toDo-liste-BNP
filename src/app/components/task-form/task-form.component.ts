import { Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { ButtonComponent } from '../ui/button/button.component';
import { FormFieldComponent } from '../ui/form-field/form-field.component';
import { toDateInputValue } from '../../utils/date';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent, FormFieldComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  initialTask = input<Task | null>(null);
  editMode = input<boolean>(false);
  categories = input<Category[]>([]);

  submitted = output<Partial<Task>>();
  cancelled = output<void>();

  title = signal('');
  description = signal('');
  priority = signal<TaskPriority>('medium');
  status = signal<TaskStatus>('todo');
  categoryId = signal<string>('');
  dueDate = signal<string>('');

  constructor() {
    effect(() => {
      const task = this.initialTask();
      if (!task) return;
      this.title.set(task.title);
      this.description.set(task.description);
      this.priority.set(task.priority);
      this.status.set(task.status);
      this.categoryId.set(task.categoryId);
      this.dueDate.set(toDateInputValue(task.dueDate));
    });
  }

  submit() {
    const titleVal = this.title().trim();
    if (!titleVal) return;
    this.submitted.emit({
      title: titleVal,
      description: this.description(),
      priority: this.priority(),
      status: this.status(),
      categoryId: this.categoryId(),
      dueDate: this.dueDate() ? new Date(this.dueDate()) : null,
    });
  }
}
