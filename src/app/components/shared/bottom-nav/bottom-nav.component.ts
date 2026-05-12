import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  link: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav" aria-label="Navigation principale">
      @for (item of items; track item.label) {
        <a
          class="bottom-nav-item"
          [routerLink]="item.link"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: !!item.exact }"
        >
          <span class="bottom-nav-icon" aria-hidden="true" [innerHTML]="item.icon"></span>
          <span class="bottom-nav-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styleUrl: './bottom-nav.component.css',
})
export class BottomNavComponent {
  items: NavItem[] = [
    {
      label: "Aujourd'hui",
      link: '/today',
      exact: true,
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14v16H5z M5 9h14"/></svg>',
    },
    {
      label: 'Tâches',
      link: '/tasks',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    },
    {
      label: 'Agenda',
      link: '/agenda',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14v14H5z M5 9h14 M9 3v4 M15 3v4"/></svg>',
    },
    {
      label: 'Profil',
      link: '/profil',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0"/></svg>',
    },
  ];
}
