import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Product } from './../shared/product.model';
import { ProductResolveService } from './../shared/product.service';

@Component({
    selector: 'ndd-product-view',
    templateUrl: './product-view.component.html',
})
export class ProductViewComponent implements OnInit, OnDestroy {

    public product: Product;
    public infoItems: object[];
    public title: string;
    public returnRoute: string = '/produtos';

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private resolver: ProductResolveService) {

    }

    public ngOnInit(): void {
        this.resolver.onChanges.takeUntil(this.ngUnsubscribe)
        .subscribe((product: Product) => { this.product = product; this.createProperty(); });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private createProperty(): void {
        this.title = this.product.name;
        const availableDescription: string = this.product.isAvailable ? 'Disponível' : 'Indisponível';
        const expDescription: string = 'Expira em ' + new Date(this.product.expiration).toLocaleDateString();
        const manufactureDescription: string = 'Fabricado em ' + new Date(this.product.manufacture).toLocaleDateString();

        this.infoItems = [
            {
                value: expDescription,
                description: expDescription,
            },
            {
                value: manufactureDescription,
                description: manufactureDescription,
            },
            {
                value: availableDescription,
                description: availableDescription,
            },
        ];
    }
}
