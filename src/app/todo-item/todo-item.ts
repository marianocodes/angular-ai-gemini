import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() complete = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}