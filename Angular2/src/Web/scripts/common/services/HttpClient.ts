import {Http, Headers} from 'angular2/http';
import {Injectable, Inject} from 'angular2/core';

import {AuthenticationToken} from '../../domain/auth/AuthenticationToken';

import {StorageService} from './StorageService';

@Injectable()
export class HttpClient {
    private http : Http;
    private storageService: StorageService;

    constructor(http: Http,
        @Inject(StorageService) storageService: StorageService) {
        this.http = http;
        this.storageService = storageService;
    }

    private createHeaders(): Headers {
        var authData = this.storageService.getLocalStorage<AuthenticationToken>('authorizationData');
        var accessToken = authData != null ? authData.access_token : null;
        var xsrfToken = this.storageService.getCookie('XSRF-TOKEN');

        return  new Headers({
            'Content-Type' : 'application/json',
            'X-XSRF-TOKEN' : xsrfToken,
            'Authorization' : 'Bearer ' + accessToken
        });
    }

    public get(url) {
        return this.http.get(url, {
            headers: this.createHeaders()
        });
    }

    public post(url, data) {
        return this.http.post(url, data, {
            headers: this.createHeaders()
        });
    }

    public delete(url) {
        return this.http.delete(url, {
            headers: this.createHeaders()
        });
    }
}