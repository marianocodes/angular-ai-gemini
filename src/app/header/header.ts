import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  private todoService = inject(TodoService);
  private todos = this.todoService.todos;

  public completedTodos = computed(() => this.todos().filter(todo => todo.isCompleted).length);
  public pendingTodos = computed(() => this.todos().filter(todo => !todo.isCompleted).length);
}