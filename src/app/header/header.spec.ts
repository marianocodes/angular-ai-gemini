import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { TodoService } from '../services/todo';
import { signal } from '@angular/core';
import { Todo } from '../todo';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockTodoService: Partial<TodoService>;
  let todosSignal: any;

  beforeEach(async () => {
    todosSignal = signal<Todo[]>([]);
    mockTodoService = {
      todos: todosSignal.asReadonly(),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the correct initial counts', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span:nth-child(1)')?.textContent).toContain('To Do: 0');
    expect(compiled.querySelector('span:nth-child(2)')?.textContent).toContain('Done: 0');
  });

  it('should update the counts when todos change', () => {
    todosSignal.set([
      { id: 1, text: 'Todo 1', isCompleted: false },
      { id: 2, text: 'Todo 2', isCompleted: true },
      { id: 3, text: 'Todo 3', isCompleted: false },
    ]);
    fixture.detectChanges();

    expect(component.pendingTodos()).toBe(2);
    expect(component.completedTodos()).toBe(1);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span:nth-child(1)')?.textContent).toContain('To Do: 2');
    expect(compiled.querySelector('span:nth-child(2)')?.textContent).toContain('Done: 1');
  });

  it('should update the counts when a todo is completed', () => {
    const initialTodos = [
      { id: 1, text: 'Todo 1', isCompleted: false },
      { id: 2, text: 'Todo 2', isCompleted: false },
    ];
    todosSignal.set(initialTodos);
    fixture.detectChanges();

    expect(component.pendingTodos()).toBe(2);
    expect(component.completedTodos()).toBe(0);

    const updatedTodos = [
      { id: 1, text: 'Todo 1', isCompleted: true },
      { id: 2, text: 'Todo 2', isCompleted: false },
    ];
    todosSignal.set(updatedTodos);
    fixture.detectChanges();

    expect(component.pendingTodos()).toBe(1);
    expect(component.completedTodos()).toBe(1);
  });
});