import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a todo', () => {
    service.addTodo('Test Todo');
    expect(service.todos().length).toBe(1);
    expect(service.todos()[0].text).toBe('Test Todo');
  });

  it('should delete a todo', () => {
    service.addTodo('Test Todo');
    const todo = service.todos()[0];
    service.deleteTodo(todo.id);
    expect(service.todos().length).toBe(0);
  });

  it('should toggle todo completion', () => {
    service.addTodo('Test Todo');
    const todo = service.todos()[0];
    service.toggleCompletion(todo.id);
    expect(service.todos()[0].isCompleted).toBe(true);
    service.toggleCompletion(todo.id);
    expect(service.todos()[0].isCompleted).toBe(false);
  });

  it('should have a readonly todos signal', () => {
    expect((service.todos as any).set).toBeUndefined();
    expect((service.todos as any).update).toBeUndefined();
  });
});