import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'pizza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'pizza-form.component.html',
})
export class PizzaFormComponent {
  @Input() public formModel: FormGroup;

  @Input() public total: string;

  @Input() public prices: any;

  @Output() public add: EventEmitter<any> = new EventEmitter<any>();

  @Output() public remove: EventEmitter<any> = new EventEmitter<any>();

  @Output() public toggle: EventEmitter<any> = new EventEmitter<number>();

  @Output() public submit: EventEmitter<any> = new EventEmitter<any>();

  public onAddPizza(event: any): void {
    this.add.emit(event);
  }

  public onRemovePizza(event: any): void {
    this.remove.emit(event);
  }

  public onToggle(event: any): void {
    this.toggle.emit(event);
  }

  public onSubmit(event: any): void {
    event.stopPropagation();
    this.submit.emit(this.formModel);
  }
}
