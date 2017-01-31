import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';

import {RegistrationInfo} from '../../domain/common/RegistrationInfo';

import {HttpClient} from '../../common/services/HttpClient';
import {Constants} from '../../common/services/Constants';


@Injectable()
export class RegisterService {

    private httpClient: HttpClient;
    private constants: Constants;

    constructor( @Inject(HttpClient) httpClient: HttpClient,
        @Inject(Constants) constants: Constants) {
        this.httpClient = httpClient;
        this.constants = constants;
    }

    public register(regInfo : RegistrationInfo) {
        return this.httpClient
            .post(this.constants.getServiceBaseUrl() + 'api/account/register', JSON.stringify(regInfo))
            .map((res: Response) => res.json());
    }
}   

    
