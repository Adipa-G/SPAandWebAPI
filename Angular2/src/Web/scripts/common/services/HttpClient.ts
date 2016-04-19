import {Http, Headers} from 'angular2/http';
import {Injectable, Inject} from 'angular2/core';

import {AuthenticationDetails} from "../../domain/auth/AuthenticationDetails";

import {StorageService} from './StorageService';
import {AuthService} from './AuthService';

@Injectable()
export class HttpClient {

    constructor(private http: Http,
        private storageService: StorageService,
        private authService: AuthService) {
        this.http = http;
        this.storageService = storageService;
        this.authService = authService;
    }

    private createHeaders(): Headers {
        var authData = this.authService.getCurrentAuth();
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