import { OrderDeleteCommand } from './../shared/order.model';
import { OrderGridService, OrderService } from './../shared/order.service';
import { DataStateChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { Router, ActivatedRoute } from '@angular/router';
import { GridUtilsComponent } from './../../../shared/grid-utils/grid-utils-component';
import { Component } from '@angular/core';

@Component({
    selector: 'ndd-order-list',
    templateUrl: './order-list.component.html',
})
export class OrderListComponent extends GridUtilsComponent {
    constructor(private gridService: OrderGridService,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute) {
        super();
        this.gridService.query(this.createFormattedState());
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridService.query(this.createFormattedState());
        this.selectedRows = [];
    }

    public onSelectionChange(event: SelectionEvent): void {
        this.updateSelectedRows(event.selectedRows, true);
        this.updateSelectedRows(event.deselectedRows, false);
    }

    public deleteOrder(): void {
        this.gridService.loading = true;
        const orderDeleteCommand: OrderDeleteCommand = new OrderDeleteCommand(this.getSelectedEntities());
        this.orderService.delete(orderDeleteCommand).take(1).do(() => this.gridService.loading = false).subscribe(() => {
            this.selectedRows = [];
            this.gridService.query(this.createFormattedState());
        });
    }

    public redirectOpenOrder(): void {
        this.router.navigate(['./', `${this.getSelectedEntities()[0].id}`], { relativeTo: this.route });
    }

    public onClick(): void {
        this.router.navigate(['./cadastrar'], { relativeTo: this.route });
    }
}
