import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseService {
    constructor (protected http: HttpClient) {
        //
    }

    public deleteRequestWithBody(url: string, body: any): Observable<boolean> {
         return this.http.request('delete', url, { body }).map((response: boolean) => response);
    }
}
