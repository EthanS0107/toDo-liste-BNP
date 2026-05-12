import { Component, inject, computed } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected taskService = inject(TaskService);
  protected themeService = inject(ThemeService);

  readonly userName = 'Léa Martin';
  readonly agency = 'Agence Lyon Part-Dieu';

  readonly initials = this.userName
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
