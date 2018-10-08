import { ProductAddCommand } from './../../shared/product.model';
import { Router } from '@angular/router';
import { ProductService } from './../../shared/product.service';
import { Product } from 'src/app/features/product/shared/product.model';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'ndd-product-register-form',
    templateUrl: './product-register-form.component.html',
})
export class ProductRegisterFormComponent {
    public product: Product;
    public isLoading: boolean;
    public productAvailable: string = 'Indisponível';
    public returnRoute: string = '/produtos';

    public form: FormGroup = this.fb.group({
            name: ['', Validators.required],
            sale: ['', Validators.required],
            expense: ['', Validators.required],
            isAvailable: ['', Validators.required],
            manufacture: ['', Validators.required],
            expiration: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private service: ProductService, private router: Router) {
    }

    public onSave(): void {
        this.isLoading = true;
        const productCommand: ProductAddCommand = new ProductAddCommand(this.form.value);
        this.service.add(productCommand)
            .take(1).subscribe(() => {
                this.isLoading = false;
                this.redirect();
            });
    }

    public redirect(): void {
        this.router.navigate(['/produtos']);
    }

    public isAvailable(): void {
        if (this.productAvailable === 'Indisponível') {
            this.productAvailable = 'Disponível';
        } else {
            this.productAvailable = 'Indisponível';
        }
    }
}
