import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <app-toast 
          [toast]="toast" 
          (actionClicked)="toastService.remove(toast.id)"
        />
      }
    </div>
  `,
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  protected toastService = inject(ToastService);
}
