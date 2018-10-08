import { Router, ActivatedRoute } from '@angular/router';
import { OrderResolveService } from './../../shared/order.service';
import { Subject } from 'rxjs/Subject';
import { Order } from './../../shared/order.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'ndd-order-detail',
    templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit, OnDestroy {

    public order: Order;
    public isLoading: boolean = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private resolver: OrderResolveService, private router: Router, private route: ActivatedRoute) {

    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.resolver.onChanges.takeUntil(this.ngUnsubscribe)
            .subscribe((order: Order) => {
                this.order = Object.assign(new Order(), order);
                this.isLoading = false;
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public onEdit(): void {
        this.router.navigate(['./editar'], { relativeTo: this.route, skipLocationChange: true });
    }

    public redirect(): void {
        this.router.navigate(['/ordens']);
    }
}
