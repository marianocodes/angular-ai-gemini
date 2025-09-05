import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = { id: 1, text: 'Test Todo', isCompleted: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit complete event on checkbox change', () => {
    spyOn(component.complete, 'emit');
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();
    expect(component.complete.emit).toHaveBeenCalled();
  });

  it('should emit delete event on button click', () => {
    spyOn(component.delete, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should display the todo text', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain('Test Todo');
  });

  it('should apply line-through style when todo is completed', () => {
    component.todo = { ...component.todo, isCompleted: true };
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.classList).toContain('line-through');
  });
});