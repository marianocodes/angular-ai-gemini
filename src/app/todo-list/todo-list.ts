import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo';
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
  todos = signal<Todo[]>([]);
  newTodoText = '';

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.update(todos => [
        ...todos,
        { id: Date.now(), text: this.newTodoText.trim(), isCompleted: false },
      ]);
      this.newTodoText = '';
    }
  }

  toggleCompletion(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
}