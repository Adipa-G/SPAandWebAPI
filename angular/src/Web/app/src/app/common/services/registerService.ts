import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RegistrationInfo } from '../../domain/common/registrationInfo';

import { HttpClient } from '../../common/services/httpClient';
import { Constants } from '../../common/services/constants';


@Injectable()
export class RegisterService {

    private httpClient: HttpClient;
    private constants: Constants;

    constructor( @Inject(HttpClient) httpClient: HttpClient,
        @Inject(Constants) constants: Constants) {
        this.httpClient = httpClient;
        this.constants = constants;
    }

    public register(regInfo: RegistrationInfo) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/account/register', JSON.stringify(regInfo))
            .pipe(map((res: Response) => res.json()));
    }
}


