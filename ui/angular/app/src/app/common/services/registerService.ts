import { Injectable, inject } from '@angular/core';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { HttpClientWrapper } from './httpClientWrapper';
import { Constants } from '../../common/services/constants';


@Injectable()
export class RegisterService {

    private httpClient: HttpClientWrapper;
    private constants: Constants;

    constructor() {
        const httpClient = inject<HttpClientWrapper>(HttpClientWrapper);
        const constants = inject<Constants>(Constants);

        this.httpClient = httpClient;
        this.constants = constants;
    }

    public register(regInfo: RegistrationInfo) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/account/register', JSON.stringify(regInfo));
    }
}


