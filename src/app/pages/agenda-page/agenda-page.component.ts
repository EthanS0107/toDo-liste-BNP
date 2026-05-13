import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskCard } from '../../components/task-card/task-card';
import { PageHeader } from '../../components/shared/page-header/page-header';

interface DayTimeline {
  date: Date;
  isToday: boolean;
  tasks: Task[];
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-agenda-page',
  standalone: true,
  imports: [CommonModule, TaskCard, PageHeader],
  templateUrl: './agenda-page.component.html',
  styleUrl: './agenda-page.component.css',
})
export class AgendaPageComponent {
  private taskService = inject(TaskService);
  private router = inject(Router);

  period = signal<'week' | 'month'>((sessionStorage.getItem('agenda-period') as 'week' | 'month') || 'week');

  overdueTasks = computed(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return this.taskService.tasks().filter(
      (t) => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < now
    ).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
  });

  timeline = computed(() => {
    const days: DayTimeline[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const numDays = 7;
    const allTasks = this.taskService.tasks();

    for (let i = 0; i < numDays; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const tasksForDay = allTasks.filter(t => {
        if (!t.dueDate) return false;
        const taskDate = new Date(t.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === d.getTime();
      });

      days.push({
        date: d,
        isToday: i === 0,
        tasks: tasksForDay.sort((a, b) => {
          if (a.status === 'done' && b.status !== 'done') return 1;
          if (a.status !== 'done' && b.status === 'done') return -1;
          return 0;
        })
      });
    }

    return days;
  });

  currentMonthDate = signal<Date>(
    sessionStorage.getItem('agenda-month') 
      ? new Date(sessionStorage.getItem('agenda-month')!) 
      : new Date()
  );
  
  selectedDate = signal<Date | null>(
    sessionStorage.getItem('agenda-date') 
      ? new Date(sessionStorage.getItem('agenda-date')!) 
      : null
  );

  calendarGrid = computed(() => {
    const days: CalendarDay[] = [];
    const current = this.currentMonthDate();
    const year = current.getFullYear();
    const month = current.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    let firstDayIndex = firstDayOfMonth.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;
    
    const allTasks = this.taskService.tasks();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDayIndex; i++) {
      const d = new Date(year, month, -firstDayIndex + i + 1);
      days.push(this.createCalendarDay(d, false, today, allTasks));
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push(this.createCalendarDay(d, true, today, allTasks));
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const d = new Date(year, month + 1, i);
      days.push(this.createCalendarDay(d, false, today, allTasks));
    }

    return days;
  });

  selectedDayTasks = computed(() => {
    const date = this.selectedDate();
    if (!date) return [];
    
    const allTasks = this.taskService.tasks();
    return allTasks.filter(t => {
      if (!t.dueDate) return false;
      const taskDate = new Date(t.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === date.getTime();
    }).sort((a, b) => {
      if (a.status === 'done' && b.status !== 'done') return 1;
      if (a.status !== 'done' && b.status === 'done') return -1;
      return 0;
    });
  });

  private createCalendarDay(date: Date, isCurrentMonth: boolean, today: Date, allTasks: Task[]): CalendarDay {
    const tasksForDay = allTasks.filter(t => {
      if (!t.dueDate) return false;
      const taskDate = new Date(t.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === date.getTime();
    });

    return {
      date,
      isCurrentMonth,
      isToday: date.getTime() === today.getTime(),
      tasks: tasksForDay.sort((a, b) => {
        if (a.status === 'done' && b.status !== 'done') return 1;
        if (a.status !== 'done' && b.status === 'done') return -1;
        return 0;
      })
    };
  }

  setPeriod(p: 'week' | 'month') {
    this.period.set(p);
    sessionStorage.setItem('agenda-period', p);
    if (p === 'month' && !this.selectedDate()) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.selectedDate.set(today);
      sessionStorage.setItem('agenda-date', today.toISOString());
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }

  selectDate(date: Date) {
    this.selectedDate.set(date);
    sessionStorage.setItem('agenda-date', date.toISOString());
  }

  nextMonth() {
    const d = new Date(this.currentMonthDate());
    d.setMonth(d.getMonth() + 1);
    this.currentMonthDate.set(d);
    sessionStorage.setItem('agenda-month', d.toISOString());
  }

  previousMonth() {
    const d = new Date(this.currentMonthDate());
    d.setMonth(d.getMonth() - 1);
    this.currentMonthDate.set(d);
    sessionStorage.setItem('agenda-month', d.toISOString());
  }

  addTaskForDate(date: Date) {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    this.router.navigate(['/tasks/new'], { queryParams: { date: localDate.toISOString().split('T')[0] } });
  }

  getCategory(id: string) {
    return this.taskService.getCategoryById(id) ?? null;
  }

  onTaskEdited(task: Task) {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  onTaskDeleted(taskId: string) {
    this.taskService.deleteTask(taskId);
  }

  onTaskStatusChanged(event: { id: string; status: TaskStatus }) {
    this.taskService.updateStatus(event.id, event.status);
  }
}