import { ProductSharedModule } from './shared/product-shared.module';
import { ProductEditFormComponent } from './product-view/product-edit-form/product-edit-form.component';
import { ProductRegisterFormComponent } from './product-form/product-register-form/product-register-form.component';
import { NDDTabsbarModule } from './../../shared/ndd-ng-tabsbar/component/ndd-ng-tabsbar.module';
import { NDDTitlebarModule } from './../../shared/ndd-ng-titlebar/component/ndd-ng-titlebar.module';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductDetailComponent } from './product-view/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { ProductGridService, ProductResolveService } from './shared/product.service';
import { SharedModule } from './../../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { GridModule } from '@progress/kendo-angular-grid/dist/es2015/grid.module';
import { UiSwitchModule } from 'angular2-ui-switch';

@NgModule({
    imports: [
        ProductRoutingModule,
        GridModule,
        SharedModule,
        NDDTitlebarModule,
        NDDTabsbarModule,
        UiSwitchModule,
        ProductSharedModule,
    ],
    exports: [ ],
    declarations:[
        ProductListComponent,
        ProductDetailComponent,
        ProductViewComponent,
        ProductRegisterFormComponent,
        ProductEditFormComponent,
    ],
    providers: [ ProductGridService, ProductResolveService ],
})

export class ProductModule{

}
