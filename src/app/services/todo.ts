import { Injectable, signal } from '@angular/core';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSignal = signal<Todo[]>([]);

  public readonly todos = this.todosSignal.asReadonly();

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      isCompleted: false
    };
    this.todosSignal.update(todos => [...todos, newTodo]);
  }

  deleteTodo(id: number) {
    this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
  }

  toggleCompletion(id: number) {
    this.todosSignal.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }
}