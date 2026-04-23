import { Component, input, output } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
})
export class TaskList {
  // API
  tasks = input.required<Task[]>();
  categories = input<Category[]>([]);

  taskDeleted = output<string>();
  taskEdited = output<Task>();
  taskStatusChanged = output<{ id: string; status: TaskStatus }>();
}
