import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, FormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodoText = 'New Todo';
    component.addTodo();
    expect(component.todos().length).toBe(1);
    expect(component.todos()[0].text).toBe('New Todo');
  });

  it('should not add an empty todo', () => {
    component.newTodoText = ' ';
    component.addTodo();
    expect(component.todos().length).toBe(0);
  });

  it('should toggle todo completion', () => {
    component.newTodoText = 'Test Todo';
    component.addTodo();
    const todo = component.todos()[0];
    component.toggleCompletion(todo.id);
    expect(component.todos()[0].isCompleted).toBe(true);
    component.toggleCompletion(todo.id);
    expect(component.todos()[0].isCompleted).toBe(false);
  });

  it('should delete a todo', () => {
    component.newTodoText = 'Test Todo';
    component.addTodo();
    const todo = component.todos()[0];
    component.deleteTodo(todo.id);
    expect(component.todos().length).toBe(0);
  });
});