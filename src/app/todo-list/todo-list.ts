import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo';
import { TodoItemComponent } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, TodoItemComponent],
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  public todos = this.todoService.todos;
  newTodoText = '';

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todoService.addTodo(this.newTodoText.trim());
      this.newTodoText = '';
    }
  }

  toggleCompletion(id: number) {
    this.todoService.toggleCompletion(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
