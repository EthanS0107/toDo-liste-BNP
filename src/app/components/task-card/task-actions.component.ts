import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-actions',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.css'],
})
export class TaskActionsComponent {
  status = input.required<TaskStatus>();

  markDone = output<void>();
  reopen = output<void>();
  start = output<void>();
  edit = output<void>();
  delete = output<void>();

  onMarkDone() {
    this.markDone.emit();
  }

  onReopen() {
    this.reopen.emit();
  }

  onStart() {
    this.start.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
