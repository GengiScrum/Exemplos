import { Order, OrderDeleteCommand, OrderAddCommand, OrderUpdateCommand } from './order.model';
import { Router } from '@angular/router';
import { NDDBreadcrumbService } from './../../../shared/ndd-ng-breadcrumb/component/ndd-ng-breadcrumb.service';
import { BaseService } from './../../../core/utils/base-service';
import { Observable } from 'rxjs/Observable';
import { State, toODataString } from '@progress/kendo-data-query';
import { CORE_CONFIG_TOKEN, ICoreConfig } from './../../../core/core.config';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es2015/data/data.collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, Inject } from '@angular/core';
import { AbstractResolveService } from './../../../core/utils/abstract-resolve.service';

@Injectable()
export class OrderGridService extends BehaviorSubject<GridDataResult> {
    public loading: boolean;

    constructor(private httpClient: HttpClient,
        @Inject(CORE_CONFIG_TOKEN) private config: ICoreConfig) {
        super(null);
    }

    public query(state: State): void {
        this.fetch(state).subscribe((result: GridDataResult) => super.next(result));
    }

    protected fetch(state: any): Observable<GridDataResult> {
        const queryStr: string = `${toODataString(state)}&$count=true`;
        this.loading = true;

        return this.httpClient
            .get(`${this.config.apiEndpoint}api/orders?${queryStr}`)
            .map((response: any): GridDataResult => ({
                data: response.items,
                total: parseInt(response.count, 10),
            }))
            .do(() => this.loading = false);
    }
}

@Injectable()
export class OrderService extends BaseService {
    private api: string;

    constructor(@Inject(CORE_CONFIG_TOKEN) config: ICoreConfig,
        public http: HttpClient) {
        super(http);
        this.api = `${config.apiEndpoint}api/orders`;
    }

    public get(id: number): Observable<Order> {
        return this.http.get(`${this.api}/${id}`).map((response: Order) => response);
    }

    public delete(order: OrderDeleteCommand): Observable<boolean> {
        return this.deleteRequestWithBody(this.api, order);
    }

    public add(order: OrderAddCommand): Observable<Order> {
        return this.http.post(`${this.api}`, order).map((response: Order) => response);
    }

    public put(order: OrderUpdateCommand): Observable<Order> {
        return this.http.put(`${this.api}`, order).map((response: Order) => response);
    }
}

@Injectable()
export class OrderResolveService extends AbstractResolveService<Order> {

    constructor(private service: OrderService,
        private breadcrumService: NDDBreadcrumbService,
        router: Router) {
        super(router);
        this.paramsProperty = 'orderId';
    }
    protected loadEntity(entityId: number): Observable<Order> {
        return this.service.get(entityId).take(1).do((order: Order) => this.breadcrumService.setMetadata({
            id: 'order',
            label: order.id.toString(),
            sizeLimit: true,
        }));
    }

}
