import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subject } from 'rxjs/Subject';
import { ProductService } from './../../product/shared/product.service';
import { OrderService } from './../shared/order.service';
import { Product } from './../../product/shared/product.model';
import { Order, OrderAddCommand } from './../shared/order.model';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ndd-order-register',
    templateUrl: './order-register-form.component.html',
})
export class OrderRegisterFormComponent implements OnInit, OnDestroy {
    public order?: Order;
    public isLoading: boolean;
    public form: FormGroup;
    public data: Product[];
    private onFilterChange: Subject<string> = new Subject<string>();

    constructor(private fb: FormBuilder,
        private service: OrderService,
        private router: Router,
        private productService: ProductService) {

        this.form = this.fb.group({
            customer: ['', Validators.required],
            quantity: ['', Validators.required],
            product: [null, Validators.required],
        });
    }

    public ngOnInit(): void {
        const time: number = 300;
        this.onFilterChange
            .debounceTime(time)
            .switchMap((value: any, index: number) => this.productService.getByName(value))
            .subscribe((response: any) => {
                this.data = response;
            });
    }

    public ngOnDestroy(): void {
        this.onFilterChange.next();
        this.onFilterChange.complete();
    }

    public onSave(): void {
        this.isLoading = true;
        const addCommand: OrderAddCommand = new OrderAddCommand(this.form.value);
        this.service.add(addCommand)
            .take(1).subscribe(() => {
                this.isLoading = false;
                this.redirect();
            });
    }

    public onAutoCompleteChange(value: string): void {
        /*const delay: number = 300;
        Observable.of(value)
            .delay(delay)
            .switchMap((value: string, index: number) => this.productService.getByName(value))
            .subscribe((response: Product[]) => {
                this.data = response;
            });*/
        this.onFilterChange.next(value);
    }

    public redirect(): void {
        this.router.navigate(['/ordens']);
    }
}
