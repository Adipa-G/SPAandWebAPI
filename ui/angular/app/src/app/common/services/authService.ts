import {Injectable, Inject} from '@angular/core';
import {EventEmitter} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { map } from 'rxjs/operators';

import {ErrorInfo} from '../../domain/errorInfo';
import {LoginInfo} from '../../domain/auth/loginInfo';
import {AuthenticationDetails} from '../../domain/auth/authenticationDetails';

import {Constants} from './constants';
import {LogService} from './logService';
import {ErrorService} from './errorService';
import {StorageService} from './storageService';


@Injectable()
export class AuthService {
    currentAuth: AuthenticationDetails;

    public authChanged$: EventEmitter<AuthenticationDetails>;

    constructor(private http: Http,
        private constants: Constants,
        private logService: LogService,
        private errorService: ErrorService,
        private storageService: StorageService) {
        this.http = http;
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
        var creds = "grant_type=password&username=" + loginInfo.userName + "&password=" + loginInfo.password
            + "&client_id=default&client_secret=no-secret&scope=all";

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-XSRF-TOKEN', this.storageService.getCookie('XSRF-TOKEN'));

        this.http.post(this.constants.getServiceBaseUrl() + 'connect/token', creds, {
            headers: headers
        })
            .pipe(map((res: Response) => res.json()))
            .subscribe(
                data => {
                    data.userName = loginInfo.userName;
                    this.currentAuth = data;
                    this.currentAuth.isAuth = true;
                    this.storageService.setLocalStorage('authorizationData', this.currentAuth);
                    this.authChanged$.emit(this.currentAuth);
                },
                err => {
                    this.logService.log(JSON.stringify(err));
                    this.errorService.logError(new ErrorInfo(JSON.stringify(err)));
                });
    }

    public clearAuthData(): void {
        this.currentAuth = new AuthenticationDetails();
        this.currentAuth.userName = '';
        this.currentAuth.isAuth = false;
        this.storageService.setLocalStorage('authorizationData', this.currentAuth);
    }

    public logout(): void {
        this.clearAuthData();
        this.authChanged$.emit(this.currentAuth);
    }
}