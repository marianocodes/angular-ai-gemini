import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list';
import { TodoService } from '../services/todo';
import { signal } from '@angular/core';
import { Todo } from '../todo';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;
  let todosSignal: any;

  beforeEach(async () => {
    todosSignal = signal<Todo[]>([]);
    mockTodoService = jasmine.createSpyObj('TodoService', ['addTodo', 'deleteTodo', 'toggleCompletion'], { todos: todosSignal });

    await TestBed.configureTestingModule({
      imports: [TodoListComponent, FormsModule, NoopAnimationsModule],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTodo from the service when adding a new todo', () => {
    component.newTodoText = 'New Todo';
    component.addTodo();
    expect(mockTodoService.addTodo).toHaveBeenCalledWith('New Todo');
  });

  it('should not call addTodo from the service when the new todo text is empty', () => {
    component.newTodoText = ' ';
    component.addTodo();
    expect(mockTodoService.addTodo).not.toHaveBeenCalled();
  });

  it('should call toggleCompletion from the service', () => {
    const todoId = 1;
    component.toggleCompletion(todoId);
    expect(mockTodoService.toggleCompletion).toHaveBeenCalledWith(todoId);
  });

  it('should call deleteTodo from the service', () => {
    const todoId = 1;
    component.deleteTodo(todoId);
    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(todoId);
  });
});
