import { Order } from './../shared/pizza.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { PizzaValidators } from '../shared/pizza.validator';
import { PizzaPrices, IPizzaPrices, Pizza } from '../shared/pizza.model';
import { PizzaSizes } from '../shared/pizza.enum';

@Component({
  selector: 'pizza-app',
  templateUrl: './pizza-list.component.html',
})
export class PizzaAppComponent implements OnInit {
  private static MIN_LENGTH: number = 3;

  public activePizza: number = 0;
  public total: string = '0';
  public prices: IPizzaPrices = PizzaPrices.ALL_PRICES;
  public form: FormGroup = this.fb.group({
    details: this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      confirm: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(PizzaAppComponent.MIN_LENGTH)]],
      postcode: ['', [Validators.required, Validators.minLength(PizzaAppComponent.MIN_LENGTH)]],
    }, { validator: PizzaValidators.checkEmailsMatch }),
    pizzas: this.fb.array([
      this.createPizza(),
    ]),
  });

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.calculateTotal(this.form.get('pizzas').value);
    this.form.get('pizzas')
      .valueChanges
      .subscribe((value: any) => this.calculateTotal(value));
  }

  public createPizza(): FormGroup {
    return this.fb.group({
      size: [PizzaSizes.Small, Validators.required],
      toppings: [[]],
    });
  }

  public addPizza(): void {
    const control: FormArray = this.form.get('pizzas') as FormArray;
    control.push(this.createPizza());
  }

  public removePizza(index: number): void {
    const control: FormArray = this.form.get('pizzas') as FormArray;
    control.removeAt(index);
  }

  public togglePizza(index: number): void {
    this.activePizza = index;
  }

  public calculateTotal(pizzas: Pizza[]): void {
    this.total = Pizza.calculateTotalSet(pizzas).toString();
  }

  public createOrder(orderFormModel: FormGroup): void {
    const order: Order = orderFormModel.value;
    // tslint:disable-next-line:no-console
    console.log(order);
  }
}
