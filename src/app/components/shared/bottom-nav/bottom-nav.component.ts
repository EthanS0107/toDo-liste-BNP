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
      link: '/tasks',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></svg>',
    },
    {
      label: 'Tâches',
      link: '/tasks',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    },
    {
      label: 'Agenda',
      link: '/agenda',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16"/></svg>',
    },
    {
      label: 'Profil',
      link: '/profil',
      icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    },
  ];
}
