import { Component } from '@angular/core';

@Component({
  selector: 'app-task-skeleton',
  standalone: true,
  template: `
    <div class="task-list-skeleton">
      @for (i of [1, 2, 3]; track i) {
        <div class="skeleton-card">
          <div class="skeleton-header">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line badge"></div>
          </div>
          <div class="skeleton-line text"></div>
          <div class="skeleton-line text short"></div>
          <div class="skeleton-footer">
            <div class="skeleton-line meta"></div>
            <div class="skeleton-line meta"></div>
            <div class="skeleton-line meta"></div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './task-skeleton.component.css',
})
export class TaskSkeletonComponent {}
