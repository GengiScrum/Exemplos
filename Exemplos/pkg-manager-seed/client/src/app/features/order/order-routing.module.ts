import { OrderRegisterFormComponent } from './order-register/order-register-form.component';
import { OrderResolveService } from './shared/order.service';
import { OrderEditFormComponent } from './order-view/order-edit-form/order-edit-form.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderListComponent } from './order-list/order-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-view/order-detail/order-detail.component';

const orderRoutes: Routes = [
    {
        path: '',
        component: OrderListComponent,
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
                component: OrderRegisterFormComponent,
            },
        ],
    },
    {
        path: ':orderId',
        component: OrderViewComponent,
        resolve: {
            order: OrderResolveService,
        },
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
                        component: OrderDetailComponent,
                    },
                    {
                        path: 'editar',
                        component: OrderEditFormComponent,
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(orderRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class OrderRoutingModule {

}
