import { Injectable, signal } from '@angular/core';
import { Toast, ToastType, ToastAction } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  show(message: string, type: ToastType = 'success', options?: { duration?: number; action?: ToastAction }) {
    const id = crypto.randomUUID();
    const duration = options?.duration ?? 3000;

    const newToast: Toast = {
      id,
      message,
      type,
      duration,
      action: options?.action,
    };

    this.toastsSignal.update((toasts) => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  success(message: string, options?: { duration?: number; action?: ToastAction }) {
    return this.show(message, 'success', options);
  }

  error(message: string, options?: { duration?: number; action?: ToastAction }) {
    return this.show(message, 'error', options);
  }

  info(message: string, options?: { duration?: number; action?: ToastAction }) {
    return this.show(message, 'info', options);
  }

  warning(message: string, options?: { duration?: number; action?: ToastAction }) {
    return this.show(message, 'warning', options);
  }

  remove(id: string) {
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
