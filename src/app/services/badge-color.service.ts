import { Injectable } from '@angular/core';
import { TaskPriority, TaskStatus } from '../models/task.model';

export interface BadgeStyle {
  bgColor: string;
  textColor: string;
  dotColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class BadgeColorService {
  private readonly priorityColors: Record<TaskPriority, BadgeStyle> = {
    low: {
      bgColor: '#e0f2fe',
      textColor: '#0369a1',
      dotColor: '#0369a1',
    },
    medium: {
      bgColor: '#fef3c7',
      textColor: '#b45309',
      dotColor: '#b45309',
    },
    high: {
      bgColor: '#fee2e2',
      textColor: '#991b1b',
      dotColor: '#991b1b',
    },
  };

  private readonly statusColors: Record<TaskStatus, BadgeStyle> = {
    todo: {
      bgColor: '#f3f4f6',
      textColor: '#374151',
      dotColor: '#9ca3af',
    },
    'in-progress': {
      bgColor: '#dbeafe',
      textColor: '#1e40af',
      dotColor: '#1e40af',
    },
    done: {
      bgColor: '#dcfce7',
      textColor: '#166534',
      dotColor: '#16a34a',
    },
  };

  getPriorityStyle(priority: TaskPriority): BadgeStyle {
    return this.priorityColors[priority];
  }

  getStatusStyle(status: TaskStatus): BadgeStyle {
    return this.statusColors[status];
  }
}
