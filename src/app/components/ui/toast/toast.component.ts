import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../../../models/toast.model';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'toast toast-' + toast().type" role="alert">
      <div class="toast-content">
        <span class="toast-icon">
          @if (toast().type === 'success') {
            <span class="material-symbols-outlined">check_circle</span>
          } @else if (toast().type === 'error') {
            <span class="material-symbols-outlined">error</span>
          } @else if (toast().type === 'warning') {
            <span class="material-symbols-outlined">warning</span>
          } @else {
            <span class="material-symbols-outlined">info</span>
          }
        </span>
        <span class="toast-message">{{ toast().message }}</span>
        @if (toast().action) {
          <button class="toast-action" (click)="onAction()">
            {{ toast().action?.label }}
          </button>
        }
      </div>
      <div class="toast-progress" [style.animation-duration.ms]="toast().duration || 3000"></div>
    </div>
  `,
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toast = input.required<Toast>();
  actionClicked = output<void>();

  onAction() {
    this.toast().action?.callback();
    this.actionClicked.emit();
  }
}
