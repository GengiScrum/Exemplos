import { FormArray } from '@angular/forms';
import { Pizza, PizzaPrices, IPizzaPrice } from './../../shared/pizza.model';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'pizza-summary',
    templateUrl: './pizza-summary.component.html',
})

export class PizzaSummaryComponent{
    @Input() public total: string;
    @Input() public pizzas: FormArray;

    private getPizzaSizePrice(size: string): IPizzaPrice {
        return PizzaPrices.ALL_PRICES[size];
    }
}
