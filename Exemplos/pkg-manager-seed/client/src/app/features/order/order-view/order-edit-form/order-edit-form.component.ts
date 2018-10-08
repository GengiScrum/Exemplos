import { Product } from './../../../product/shared/product.model';
import { ProductService } from './../../../product/shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService, OrderResolveService } from './../../shared/order.service';
import { Subject } from 'rxjs/Subject';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order, OrderUpdateCommand } from './../../shared/order.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'ndd-order-edit',
    templateUrl: './order-edit-form.component.html',
})
export class OrderEditFormComponent implements OnInit, OnDestroy {
    public order?: Order;
    public isLoading: boolean;
    public form: FormGroup;
    public data: Product[];
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private onFilterChange: Subject<string> = new Subject<string>();

    constructor(private fb: FormBuilder,
        private service: OrderService,
        private router: Router,
        private route: ActivatedRoute,
        private resolver: OrderResolveService,
        private productService: ProductService) {

        this.form = this.fb.group({
            customer: ['', Validators.required],
            quantity: ['', Validators.required],
            product: [null, Validators.required],
        });
    }

    public ngOnInit(): void {
        this.isLoading = true;
        const time: number = 300;
        this.resolver.onChanges.takeUntil(this.ngUnsubscribe).subscribe((order: Order) => {
            this.isLoading = false;
            this.order = Object.assign(new Order(), order);
            this.populateForm(this.form);
            this.onFilterChange.debounceTime(time)
            .switchMap((value: any, index: number) => this.productService.getByName(value))
            .subscribe((response: any) => {
                this.data = response;
            });
        });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public onSave(): void {
        this.isLoading = true;
        const updateCommand: OrderUpdateCommand = new OrderUpdateCommand(this.form.value, this.order.id);
        this.service.put(updateCommand)
            .take(1).subscribe(() => {
                this.isLoading = false;
                this.resolver.resolveFromRouteAndNotify();
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
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    public populateForm(form: FormGroup): void {
        const product: any = {
            id: this.order.productId,
            name: this.order.productName,
        };
        this.form.patchValue({
            customer: this.order.customer,
            product,
            quantity: this.order.quantity,
        });
    }
}
