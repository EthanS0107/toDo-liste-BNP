import { Component, input, output, computed, viewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { trigger, transition, style, animate } from '@angular/animations';
import { Task, TaskStatus, Priority } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCard, CdkDropList, CdkDrag],
  templateUrl: './task-list.html',
  animations: [
    trigger('taskAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('300ms ease-out'),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class TaskList {
  taskCards = viewChildren(TaskCard);
  tasks = input.required<Task[]>();
  categories = input<Category[]>([]);
  priorities = input<Priority[]>([]);

  taskDeleted = output<string>();
  taskEdited = output<Task>();
  taskStatusChanged = output<{ id: string; status: TaskStatus }>();
  taskReordered = output<{
    taskId: string;
    targetSiblingId: string;
    position: 'before' | 'after';
  }>();

  // Index des catégories par id, recalculé quand la liste change
  private categoryMap = computed(() => {
    const map = new Map<string, Category>();
    for (const c of this.categories()) map.set(c.id, c);
    return map;
  });

  categoryFor(id: string): Category | null {
    return this.categoryMap().get(id) ?? null;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const currentList = this.tasks();
    const draggedTask = currentList[event.previousIndex];
    const targetTask = currentList[event.currentIndex];

    // Calculer la position relative en fonction du sens du drag
    const position: 'before' | 'after' =
      event.previousIndex > event.currentIndex ? 'before' : 'after';

    this.taskReordered.emit({
      taskId: draggedTask.id,
      targetSiblingId: targetTask.id,
      position,
    });
  }
}
