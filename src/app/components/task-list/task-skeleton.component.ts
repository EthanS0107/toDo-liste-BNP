import { Component } from '@angular/core';

@Component({
  selector: 'app-task-skeleton',
  standalone: true,
  template: `
    <div class="task-list-skeleton">
      @for (i of [1, 2, 3, 4]; track i) {
        <div class="skeleton-row">
          <div class="skeleton-check"></div>
          <div class="skeleton-content">
            <div class="skeleton-line head"></div>
            <div class="skeleton-line title"></div>
            <div class="skeleton-line meta"></div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './task-skeleton.component.css',
})
export class TaskSkeletonComponent {}
