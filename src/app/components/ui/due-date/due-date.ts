import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelativeDatePipe } from './relative-date-pipe';

@Component({
  selector: 'app-due-date',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe],
  templateUrl: './due-date.html',
  styleUrl: './due-date.css',
})
export class DueDateComponent {
  date = input<string | Date | null>(null);
  overdue = input<boolean>(false);
}
