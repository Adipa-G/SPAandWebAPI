import {Injectable, Inject} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';

import {LogService} from './LogService';
import {Constants} from './Constants';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

@Injectable()
export class AuthService {
    private constants: Constants;
    private logService: LogService;

    private currentAuth: AuthenticationInfo;

    public authChanged$: EventEmitter<AuthenticationInfo>;

    constructor(private http: Http, @Inject(Constants) constants: Constants, @Inject(LogService) logService: LogService) {
        this.http = http;
        this.constants = constants;
        this.logService = logService;

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

        return  this.http
            .post(this.constants.getServiceBaseUrl() + 'connect/token', creds, {
                headers: headers
            })
            .map((res: Response) => res.json());
    }

    saveJwt(jwt) {
        if (jwt) {
            localStorage.setItem('id_token', jwt);
        }
    }
}