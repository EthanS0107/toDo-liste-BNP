import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root', // Rend le service disponible partout (Singleton)
})
export class ThemeService {
  isDarkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

  constructor() {
    effect(() => {
      const mode = this.isDarkMode();
      localStorage.setItem('theme', mode ? 'dark' : 'light');

      if (mode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((prev) => !prev);
  }
}
