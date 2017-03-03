import { Http, Headers, Response } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorInfo } from '../../domain/ErrorInfo';
import { AuthenticationDetails } from '../../domain/auth/AuthenticationDetails';

import { LogService } from './LogService';
import { ErrorService } from './ErrorService';
import { StorageService } from './StorageService';
import { AuthService } from './AuthService';

@Injectable()
export class HttpClient {

    constructor(private http: Http,
        private logService: LogService,
        private errorService: ErrorService,
        private storageService: StorageService,
        private authService: AuthService) {
        this.http = http;
        this.logService = logService;
        this.errorService = errorService;
        this.storageService = storageService;
        this.authService = authService;
    }

    private createHeaders(): Headers {
        var authData = this.authService.getCurrentAuth();
        var accessToken = authData != null && authData.access_token != null ? authData.access_token : "";
        var xsrfToken = this.storageService.getCookie('XSRF-TOKEN');

        return new Headers({
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
            'Authorization': 'Bearer ' + accessToken
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