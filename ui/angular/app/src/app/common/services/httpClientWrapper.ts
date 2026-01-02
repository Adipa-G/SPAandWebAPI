import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { StorageService } from './storageService';
import { AuthService } from './authService';

@Injectable()
export class HttpClientWrapper {
    private httpClient = inject(HttpClient);
    private storageService = inject(StorageService);
    private authService = inject(AuthService);

    constructor() {
        const httpClient = this.httpClient;
        const storageService = this.storageService;
        const authService = this.authService;

        this.httpClient = httpClient;
        this.storageService = storageService;
        this.authService = authService;
    }

    private createHeaders(): HttpHeaders {
        const authData = this.authService.getCurrentAuth();
        const accessToken = authData != null && authData.access_token != null ? authData.access_token : "";
        const xsrfToken = this.storageService.getCookie('XSRF-TOKEN');

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