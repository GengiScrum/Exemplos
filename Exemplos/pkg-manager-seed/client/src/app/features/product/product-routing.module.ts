import { ProductEditFormComponent } from './product-view/product-edit-form/product-edit-form.component';
import { ProductRegisterFormComponent } from './product-form/product-register-form/product-register-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolveService } from './shared/product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-view/product-detail/product-detail.component';
import { ProductViewComponent } from './product-view/product-view.component';

const productRoutes: Routes = [
    {
        path: '',
        component: ProductListComponent,
    },
    {
        path: 'cadastrar',
        data: {
            breadcrumbOptions: {
                breadcrumbLabel: 'Cadastrar',
            },
        },
        children: [
            {
                path: '',
                component: ProductRegisterFormComponent,
            },
        ],
    },
    {
        path: ':productId',
        resolve: {
            product: ProductResolveService,
        },
        data: {
            breadcrumbOptions: {
                breadcrumbId: 'product',
            },
        },
        children: [
            {
                path: '',
                component: ProductViewComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'info',
                        pathMatch: 'full',
                    },
                    {
                        path: 'info',
                        children: [
                            {
                                path: '',
                                component: ProductDetailComponent,
                            },

                            {
                                path: 'editar',
                                component: ProductEditFormComponent,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})

export class ProductRoutingModule {

}
