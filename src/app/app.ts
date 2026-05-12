import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { ToastContainerComponent } from './components/ui/toast/toast-container.component';
import { TabBarComponent } from './components/shared/tab-bar/tab-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToastContainerComponent, TabBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
