import { ProductUpdateCommand, ProductAddCommand } from './product.model';
import { AbstractResolveService } from './../../../core/utils/abstract-resolve.service';
import { NDDBreadcrumbService } from './../../../shared/ndd-ng-breadcrumb/component/ndd-ng-breadcrumb.service';
import { Router } from '@angular/router';
import { BaseService } from './../../../core/utils/base-service';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ICoreConfig, CORE_CONFIG_TOKEN } from './../../../core/core.config';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { State } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid/dist/es2015/data/data.collection';
import { toODataString } from '@progress/kendo-data-query/dist/es/odata.operators';
import { ProductDeleteCommand, Product } from 'src/app/features/product/shared/product.model';

import { map } from 'rxjs/operators';

@Injectable()
export class ProductGridService extends BehaviorSubject<GridDataResult>{
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
            .get(`${this.config.apiEndpoint}api/products?${queryStr}`)
            .map((response: any): GridDataResult => ({
                data: response.items,
                total: parseInt(response.count, 10),
            }))
            .do(() => this.loading = false);
    }
}

@Injectable()
export class ProductService extends BaseService {
    private api: string;

    constructor( @Inject(CORE_CONFIG_TOKEN) config: ICoreConfig,
        public http: HttpClient) {
        super(http);
        this.api = `${config.apiEndpoint}api/products`;
    }

    public get(id: number): Observable<Product> {
        return this.http.get(`${this.api}/${id}`).map((response: Product) => response);
    }

    public getAll(): Observable<Product[]> {
        return this.http.get(`${this.api}`).map((response: Product[]) => response);
    }

    public getByName(filterValue: string): any {
        const queryStr: string = `$skip=0&$count=true&$filter=contains(tolower(Name),tolower('${filterValue}'))`;

        return this.http
            .get(`${this.api}?${queryStr}`)
            .pipe(map((response: any) => response.items));
    }

    public delete(product: ProductDeleteCommand): Observable<boolean> {
        return this.deleteRequestWithBody(this.api, product);
    }

    public add(product: ProductAddCommand): Observable<Product> {
        return this.http.post(`${this.api}`, product).map((response: Product) => response);
    }

    public put(product: ProductUpdateCommand): Observable<Product> {
        return this.http.put(`${this.api}`, product).map((response: Product) => response);
    }
}

@Injectable()
export class ProductResolveService extends AbstractResolveService<Product> {

    constructor(private service: ProductService,
        private breadcrumService: NDDBreadcrumbService,
        router: Router) {
        super(router);
        this.paramsProperty = 'productId';
    }
    protected loadEntity(entityId: number): Observable<Product> {
        return this.service.get(entityId).take(1).do((product: Product) => this.breadcrumService.setMetadata({
            id: 'product',
            label: product.name,
            sizeLimit: true,
        }));
    }

}
