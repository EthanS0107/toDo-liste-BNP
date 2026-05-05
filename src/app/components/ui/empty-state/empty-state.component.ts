import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty-state" [class]="'empty-state--' + type()">
      <div class="empty-state__illustration">
        @if (type() === 'empty-tasks') {
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Fond avec le vert BNP -->
            <rect x="40" y="60" width="120" height="100" rx="16" fill="url(#bnp-grad)" />
            <path d="M65 95H135M65 115H115M65 135H95" stroke="white" stroke-width="5" stroke-linecap="round" />
            
            <defs>
              <linearGradient id="bnp-grad" x1="40" y1="60" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00965E" />
                <stop offset="1" stop-color="#007A4D" />
              </linearGradient>
            </defs>
          </svg>
        } @else if (type() === 'no-results') {
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" r="60" stroke="#00965E" stroke-width="6" />
            <line x1="135" y1="135" x2="175" y2="175" stroke="#00965E" stroke-width="10" stroke-linecap="round" />
            
            <!-- Petites étoiles autour de la loupe -->
            <path d="M150 40L153 48L161 48L155 53L157 61L150 56L143 61L145 53L139 48L147 48Z" fill="#00965E" opacity="0.5" />
            <path d="M40 140L42 145L47 145L43 148L44 153L40 151L36 153L37 148L33 145L38 145Z" fill="#00965E" opacity="0.3" />
            
            <circle cx="70" cy="80" r="6" fill="#00965E" opacity="0.4" />
            <circle cx="110" cy="80" r="6" fill="#00965E" opacity="0.4" />
            <path d="M70 110C80 105 100 105 110 110" stroke="#00965E" stroke-width="4" stroke-linecap="round" opacity="0.6" />
          </svg>
        }
      </div>
      
      <h3 class="empty-state__title">{{ title() }}</h3>
      @if (message()) {
        <p class="empty-state__message">{{ message() }}</p>
      }
      
      <div class="empty-state__actions">
        <ng-content />
      </div>
    </div>
  `,
  styleUrl: './empty-state.component.css',
})
export class EmptyStateComponent {
  type = input<'empty-tasks' | 'no-results'>('empty-tasks');
  title = input.required<string>();
  message = input<string>('');
}
