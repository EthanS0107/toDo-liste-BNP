import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { ToastContainerComponent } from './components/ui/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
