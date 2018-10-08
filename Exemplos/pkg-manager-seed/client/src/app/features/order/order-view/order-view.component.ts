import { OrderResolveService } from './../shared/order.service';
import { Subject } from 'rxjs/Subject';
import { Order } from './../shared/order.model';
import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'ndd-order-view',
    templateUrl: './order-view.component.html',
})
export class OrderViewComponent implements OnInit, OnDestroy {
    public order: Order;
    public infoItems: object[];
    public title: string;
    public returnRoute: string = '/ordens';

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private resolver: OrderResolveService) {

    }

    public ngOnInit(): void {
        this.resolver.onChanges.takeUntil(this.ngUnsubscribe)
        .subscribe((order: Order) => { this.order = order; this.createProperty(); });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private createProperty(): void {
        this.title = 'Ordem ' + this.order.id;
        const customerDescription: string = 'Comprador ' + this.order.customer;
        const productDescription: string = 'Produto ' + this.order.productId;
        const quantityDescription: string = 'Quantidade ' + this.order.quantity;

        this.infoItems = [
            {
                value: customerDescription,
                description: customerDescription,
            },
            {
                value: productDescription,
                description: productDescription,
            },
            {
                value: quantityDescription,
                description: quantityDescription,
            },
        ];
    }
}
