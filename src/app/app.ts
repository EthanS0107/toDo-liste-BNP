import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('toDo-liste-BNP');

  private taskService = inject(TaskService);
}
