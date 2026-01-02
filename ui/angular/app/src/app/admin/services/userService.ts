import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { OrderAndPage } from '../../domain/common/orderAndPage';

import { HttpClientWrapper } from '../../common/services/httpClientWrapper';
import { Constants } from '../../common/services/constants';

@Injectable()
export class UserService {
    private httpClient: HttpClientWrapper;
    private constants: Constants;

    constructor() {
        const httpClient = inject<HttpClientWrapper>(HttpClientWrapper);
        const constants = inject<Constants>(Constants);

        this.httpClient = httpClient;
        this.constants = constants;
    }

    public getUsers(orderAndPage: OrderAndPage) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/Account/list', JSON.stringify(orderAndPage));
    }

    public deleteUser(userName: string) {
        return this.httpClient
            .delete(this.constants.getServiceBaseUrl() + 'api/Account/' + userName);
    }
}