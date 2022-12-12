import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageService } from './storageService';
import { AuthService } from './authService';

@Injectable()
export class HttpClientWrapper {
    constructor(private httpClient: HttpClient,
        private storageService: StorageService,
        private authService: AuthService) {
        this.httpClient = httpClient;
        this.storageService = storageService;
        this.authService = authService;
    }

    private createHeaders(): HttpHeaders {
        var authData = this.authService.getCurrentAuth();
        var accessToken = authData != null && authData.access_token != null ? authData.access_token : "";
        var xsrfToken = this.storageService.getCookie('XSRF-TOKEN');

        const headers = {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrfToken || '',
        }
        if (accessToken) {
            headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return new HttpHeaders(headers);
    }

    public get(url) {
        return this.httpClient.get(url, {
            headers: this.createHeaders()
        });
    }

    public post(url, data) {
        return this.httpClient.post(url, data, {
            headers: this.createHeaders()
        });
    }

    public delete(url) {
        return this.httpClient.delete(url, {
            headers: this.createHeaders()
        });
    }


}