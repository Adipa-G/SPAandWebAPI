import { Injectable, inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ErrorInfo } from '../../domain/errorInfo';
import { LoginInfo } from '../../domain/auth/loginInfo';
import { AuthenticationDetails } from '../../domain/auth/authenticationDetails';

import { Constants } from './constants';
import { LogService } from './logService';
import { ErrorService } from './errorService';
import { StorageService } from './storageService';


@Injectable()
export class AuthService {
    private httpClient = inject(HttpClient);
    private constants = inject(Constants);
    private logService = inject(LogService);
    private errorService = inject(ErrorService);
    private storageService = inject(StorageService);

    currentAuth: AuthenticationDetails | null = null;

    public authChanged$: EventEmitter<AuthenticationDetails>;

    constructor() {
        const httpClient = this.httpClient;
        const constants = this.constants;
        const logService = this.logService;
        const errorService = this.errorService;
        const storageService = this.storageService;

        this.httpClient = httpClient;
        this.constants = constants;
        this.logService = logService;
        this.errorService = errorService;
        this.storageService = storageService;

        this.authChanged$ = new EventEmitter<AuthenticationDetails>();
    }

    public getCurrentAuth(): AuthenticationDetails {
        if (this.currentAuth == null) {
            this.currentAuth = this.storageService.getLocalStorage<AuthenticationDetails>('authorizationData');
            if (this.currentAuth == null) {
                this.currentAuth = new AuthenticationDetails();
                this.currentAuth.userName = '';
                this.currentAuth.isAuth = false;
            }
            this.authChanged$.emit(this.currentAuth);
        }
        return this.currentAuth;
    }

    public authenticate(loginInfo: LoginInfo): void {
        const creds = "grant_type=password&username=" + loginInfo.userName + "&password=" + loginInfo.password
            + "&client_id=default&scope=openid";

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-XSRF-TOKEN': this.storageService.getCookie('XSRF-TOKEN')
        });

        this.httpClient.post(this.constants.getServiceBaseUrl() + 'connect/token', creds, {
            headers: headers
        }).subscribe({
            next: (data: any) => {
                data.userName = loginInfo.userName;
                const authData: AuthenticationDetails = data;
                authData.isAuth = true;
                this.currentAuth = authData;
                this.storageService.setLocalStorage('authorizationData', authData);
                this.authChanged$.emit(authData);
            },
            error: (err) => {
                this.logService.log(JSON.stringify(err));
                this.errorService.logError(new ErrorInfo(JSON.stringify(err)));
            }
        });
    }

    public clearAuthData(): AuthenticationDetails {
        const authData = new AuthenticationDetails();
        authData.userName = '';
        authData.isAuth = false;
        this.currentAuth = authData;
        this.storageService.setLocalStorage('authorizationData', authData);
        return authData;
    }

    public logout(): void {
        const authData = this.clearAuthData();
        this.authChanged$.emit(authData);
    }
}