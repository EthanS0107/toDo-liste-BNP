import { Component } from '@angular/core';

@Component({
  selector: 'app-task-skeleton',
  standalone: true,
  template: `
    <div class="skeleton-container">
      @for (i of [1, 2, 3]; track i) {
        <div class="task-card-skeleton">
          <div class="skeleton-header">
            <div class="skeleton-title"></div>
            <div class="skeleton-priority"></div>
          </div>
          
          <div class="skeleton-description">
            <div class="skeleton-line full"></div>
            <div class="skeleton-line short"></div>
          </div>

          <div class="skeleton-meta">
            <div class="skeleton-chip"></div>
            <div class="skeleton-chip"></div>
            <div class="skeleton-chip"></div>
          </div>

          <div class="skeleton-actions">
            <div class="skeleton-button"></div>
            <div class="skeleton-button"></div>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './task-skeleton.component.css',
  imports: []
})
export class TaskSkeletonComponent {}
