import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../../components/shared/page-header/page-header';
import { TaskService } from '../../services/task.service';
import { ThemeService } from '../../services/theme.service';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../services/toast.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, PageHeader],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  taskService = inject(TaskService);
  themeService = inject(ThemeService);
  storageService = inject(StorageService);
  toastService = inject(ToastService);

  showResetModal = signal(false);
  currentLanguage = signal('Français');

  tasksPerCategory = computed<{ category: Category; count: number }[]>(() => {
    const tasks = this.taskService.tasks();
    const categories = this.taskService.categories();

    const counts: Record<string, number> = {};
    for (const task of tasks) {
      if (task.status === 'done' && task.categoryId) {
        counts[task.categoryId] = (counts[task.categoryId] || 0) + 1;
      }
    }

    return Object.entries(counts)
      .map(([id, count]) => {
        const category = categories.find(c => c.id === id);
        return category ? { category, count } : null;
      })
      .filter((item): item is { category: Category; count: number } => item !== null)
      .sort((a, b) => b.count - a.count);
  });

  changeLanguage() {
    this.toastService.info('D\'autres langues seront bientôt disponibles.');
  }

  openResetModal() {
    this.showResetModal.set(true);
  }

  cancelReset() {
    this.showResetModal.set(false);
  }

  confirmReset() {
    this.storageService.removeItem('bnp-todo-tasks');
    window.location.reload();
  }
}
