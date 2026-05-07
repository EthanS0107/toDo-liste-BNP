import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.css',
})
export class TabBarComponent {
  activeTab: string = '';

  constructor(private router: Router) {
    this.syncActiveTab();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.syncActiveTab();
    });
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }

  private syncActiveTab() {
    const url = this.router.url;
    if (url.includes('/today')) {
      this.activeTab = 'today';
    } else if (url.includes('/tasks')) {
      this.activeTab = 'tasks';
    } else if (url.includes('/agenda')) {
      this.activeTab = 'agenda';
    } else if (url.includes('/profile')) {
      this.activeTab = 'profile';
    }
  }
}
