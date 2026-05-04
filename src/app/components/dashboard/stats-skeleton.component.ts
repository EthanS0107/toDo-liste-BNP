import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-skeleton',
  standalone: true,
  template: `
    <div class="dashboard skeleton">
      <div class="dashboard-cards">
        @for (i of [1, 2, 3]; track i) {
          <div class="card">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line value"></div>
          </div>
        }
      </div>

      <div class="progress-section">
        <div class="status-counts">
          @for (i of [1, 2, 3]; track i) {
            <div class="skeleton-badge"></div>
          }
        </div>
        
        <div class="progress-container">
          <div class="progress-bar-bg skeleton-pulse"></div>
          <div class="skeleton-line text"></div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './stats-skeleton.component.css',
  imports: []
})
export class StatsSkeletonComponent {}
