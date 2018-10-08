import { Product, ProductUpdateCommand } from './../../shared/product.model';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, ProductResolveService } from './../../shared/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'ndd-product-edit-form',
    templateUrl: './product-edit-form.component.html',
})
export class ProductEditFormComponent implements OnInit, OnDestroy {
    public product?: Product;
    public isLoading: boolean;
    public productAvailable: string = 'Indisponível';
    public expirationDate: string;
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        sale: ['', Validators.required],
        expense: ['', Validators.required],
        isAvailable: ['', Validators.required],
        manufacture: ['', Validators.required],
        expiration: ['', Validators.required],
    });
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private fb: FormBuilder,
        private service: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private resolver: ProductResolveService) {
    }

    public ngOnInit(): void {
        this.isLoading = true;
        this.resolver.onChanges.takeUntil(this.ngUnsubscribe).subscribe((product: Product) => {
            this.isLoading = false;
            this.product = Object.assign(new Product(), product);
            this.productAvailable = this.product.isAvailable ? 'Disponível' : 'Indisponível';
            this.populateForm(this.form);
        });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public onSave(): void {
        this.isLoading = true;
        const updateCommand: ProductUpdateCommand = new ProductUpdateCommand(this.form.value, this.product.id);
        this.service.put(updateCommand)
            .take(1).subscribe(() => {
                this.isLoading = false;
                this.redirect();
                this.resolver.resolveFromRouteAndNotify();
            });
    }

    public redirect(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    public isAvailable(): void {
        if (this.productAvailable === 'Indisponível') {
            this.productAvailable = 'Disponível';
        } else {
            this.productAvailable = 'Indisponível';
        }
    }

    public populateForm(form: FormGroup): void {
        this.form.patchValue({
            name: this.product.name,
            sale: this.product.sale,
            expense: this.product.expense,
            isAvailable: this.product.isAvailable,
            manufacture: new Date(this.product.manufacture).toISOString().split('T')[0],
            expiration: new Date(this.product.expiration).toISOString().split('T')[0],
        });
    }
}
