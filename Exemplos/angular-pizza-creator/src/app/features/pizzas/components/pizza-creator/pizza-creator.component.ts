import { ViewChild } from '@angular/core';
import { PizzaSizeComponent } from './../pizza-size/pizza-size.component';
import { PizzaToppingsComponent } from './../pizza-toppings/pizza-toppings.component';
import { FormArray, AbstractControl } from '@angular/forms';
import { Component, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';

@Component({
    selector: 'pizza-creator',
    templateUrl: './pizza-creator.component.html',
})

export class PizzaCreatorComponent {
    @Input() public pizzas: FormArray;
    @Output() public add: EventEmitter<void> = new EventEmitter<void>();
    @Output() public remove: EventEmitter<number> = new EventEmitter<number>();
    @Output() public toggle: EventEmitter<number> = new EventEmitter<number>();

    @Input() public activePizza: number = 0;

    private onAdd(): void {
        this.activePizza = this.pizzas.length;
        this.add.emit();
    }

    private onRemove(index: number): void {
        this.remove.emit(index);
    }

    private onToggle(index: number): void {
        this.activePizza = index === this.activePizza ? -1 : index;
        this.toggle.emit(index);
    }
}
