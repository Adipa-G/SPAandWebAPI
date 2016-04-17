import {Injectable, Inject} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';

import {LogService} from './LogService';
import {Constants} from './Constants';
import {StorageService} from './StorageService';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

@Injectable()
export class AuthService {
    private constants: Constants;
    private logService: LogService;
    private storageService: StorageService;

    private currentAuth: AuthenticationInfo;

    public authChanged$: EventEmitter<AuthenticationInfo>;

    constructor(private http: Http,
        @Inject(Constants) constants: Constants,
        @Inject(LogService) logService: LogService,
        @Inject(StorageService) storageService: StorageService) {
        this.http = http;
        this.constants = constants;
        this.logService = logService;
        this.storageService = storageService;

        this.authChanged$ = new EventEmitter();
        this.currentAuth = new AuthenticationInfo();
        this.currentAuth.isAuth = false;
        this.currentAuth.userName = '';
        this.authChanged$.emit(this.currentAuth);
    }

    public getCurrentAuth(): AuthenticationInfo {
        return this.currentAuth;
    }

    public authenticate(authData: AuthenticationInfo) {
        var creds = "grant_type=password&username=" + authData.userName + "&password=" + authData.password
            + "&client_id=default&client_secret=no-secret&scope=all";
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('X-XSRF-TOKEN', this.storageService.getCookie('XSRF-TOKEN'));

        return  this.http
            .post(this.constants.getServiceBaseUrl() + 'connect/token', creds, {
                headers: headers
            })
            .map((res: Response) => res.json());
    }
}