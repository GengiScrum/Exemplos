import { Router, ActivatedRoute } from '@angular/router';
import { Product } from './../../shared/product.model';
import { ProductResolveService } from './../../shared/product.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'ndd-product-detail',
    templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit, OnDestroy {

    public product: Product;
    public isLoading: boolean = false;
    public availabilityText: string = '';
    public resultValue: number = 0;
    public expirateDate: number = 0;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private resolver: ProductResolveService, private router: Router, private route: ActivatedRoute) {

    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.resolver.onChanges.takeUntil(this.ngUnsubscribe)
            .subscribe((product: Product) => {
                this.product = Object.assign(new Product(), product);
                this.availabilityText = product.isAvailable ? 'Disponível' : 'Indisponível';
                this.resultValue = this.product.getResult();
                this.expirateDate = this.product.getExpirateDate();
                this.product.setZone();
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
        this.router.navigate(['/produtos']);
    }
}
