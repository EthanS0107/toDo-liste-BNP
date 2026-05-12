import { Injectable } from '@angular/core';
import { TaskPriority, TaskStatus } from '../models/task.model';

export interface BadgeStyle {
  bgColor: string;
  textColor: string;
  dotColor: string;
  borderColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class BadgeColorService {
  private readonly priorityColors: Record<TaskPriority, BadgeStyle> = {
    high: {
      bgColor: 'rgba(155, 47, 42, 0.063)',
      textColor: 'rgb(155, 47, 42)',
      dotColor: 'rgb(155, 47, 42)',
      borderColor: 'rgba(155, 47, 42, 0.2)',
    },
    medium: {
      bgColor: 'rgba(160, 106, 20, 0.063)',
      textColor: 'rgb(160, 106, 20)',
      dotColor: 'rgb(160, 106, 20)',
      borderColor: 'rgba(160, 106, 20, 0.2)',
    },
    low: {
      bgColor: 'rgba(42, 74, 122, 0.063)',
      textColor: 'rgb(42, 74, 122)',
      dotColor: 'rgb(42, 74, 122)',
      borderColor: 'rgba(42, 74, 122, 0.2)',
    },
  };

  private readonly statusColors: Record<TaskStatus, BadgeStyle> = {
    todo: {
      bgColor: 'rgb(236, 239, 233)',
      textColor: 'rgb(66, 81, 74)',
      dotColor: 'rgb(66, 81, 74)',
      borderColor: 'rgba(66, 81, 74, 0.2)',
    },
    'in-progress': {
      bgColor: 'rgb(247, 237, 220)',
      textColor: 'rgb(160, 106, 20)',
      dotColor: 'rgb(160, 106, 20)',
      borderColor: 'rgba(160, 106, 20, 0.2)',
    },
    done: {
      bgColor: 'rgb(230, 240, 235)',
      textColor: 'rgb(15, 107, 74)',
      dotColor: 'rgb(15, 107, 74)',
      borderColor: 'rgba(15, 107, 74, 0.2)',
    },
  };

  getPriorityStyle(priority: TaskPriority): BadgeStyle {
    return this.priorityColors[priority];
  }

  getStatusStyle(status: TaskStatus): BadgeStyle {
    return this.statusColors[status];
  }
}
