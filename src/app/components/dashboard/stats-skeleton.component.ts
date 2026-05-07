import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-skeleton',
  standalone: true,
  template: `
    <div class="stats-grid skeleton">
      @for (i of [1, 2, 3, 4]; track i) {
        <div class="stat-card">
          <div class="skeleton-marker"></div>
          <div class="skeleton-line label"></div>
          <div class="skeleton-line value"></div>
        </div>
      }
    </div>
  `,
  styleUrl: './stats-skeleton.component.css',
  imports: [],
})
export class StatsSkeletonComponent {}
