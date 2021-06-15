import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { HttpClientWrapper } from './httpClientWrapper';
import { Constants } from '../../common/services/constants';


@Injectable()
export class RegisterService {

    private httpClient: HttpClientWrapper;
    private constants: Constants;

    constructor(@Inject(HttpClientWrapper) httpClient: HttpClientWrapper,
        @Inject(Constants) constants: Constants) {
        this.httpClient = httpClient;
        this.constants = constants;
    }

    public register(regInfo: RegistrationInfo) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/account/register', JSON.stringify(regInfo));
    }
}


