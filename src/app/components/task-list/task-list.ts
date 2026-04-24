import { Component, input, output, computed } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  categories = input<Category[]>([]);

  taskDeleted = output<string>();
  taskEdited = output<Task>();
  taskStatusChanged = output<{ id: string; status: TaskStatus }>();

  // Index des catégories par id, recalculé quand la liste change
  private categoryMap = computed(() => {
    const map = new Map<string, Category>();
    for (const c of this.categories()) map.set(c.id, c);
    return map;
  });

  categoryFor(id: string): Category | null {
    return this.categoryMap().get(id) ?? null;
  }
}
