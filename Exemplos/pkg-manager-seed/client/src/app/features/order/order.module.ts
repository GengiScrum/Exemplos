import { ProductSharedModule } from './../product/shared/product-shared.module';
import { NDDTabsbarModule } from './../../shared/ndd-ng-tabsbar/component/ndd-ng-tabsbar.module';
import { NDDTitlebarModule } from './../../shared/ndd-ng-titlebar/component/ndd-ng-titlebar.module';
import { OrderGridService, OrderService, OrderResolveService } from './shared/order.service';
import { OrderListComponent } from './order-list/order-list.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { GridModule } from '@progress/kendo-angular-grid';
import { OrderRoutingModule } from './order-routing.module';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderDetailComponent } from './order-view/order-detail/order-detail.component';
import { OrderEditFormComponent } from './order-view/order-edit-form/order-edit-form.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { OrderRegisterFormComponent } from './order-register/order-register-form.component';

@NgModule({
    imports: [
        GridModule,
        SharedModule,
        OrderRoutingModule,
        NDDTitlebarModule,
        NDDTabsbarModule,
        ProductSharedModule,
        DropDownsModule,
    ],
    exports: [],
    providers: [ OrderGridService, OrderService, OrderResolveService ],
    declarations: [
        OrderListComponent,
        OrderViewComponent,
        OrderDetailComponent,
        OrderEditFormComponent,
        OrderRegisterFormComponent,
    ],
})
export class OrderModule {
}
