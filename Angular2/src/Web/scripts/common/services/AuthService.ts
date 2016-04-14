import {Injectable, Inject} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {LogService} from './LogService';
import {Constants} from './Constants';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

@Injectable()
export class AuthService {
    private constants: Constants;
    private logService: LogService;

    private currentAuth: AuthenticationInfo;

    public authChanged$: EventEmitter<AuthenticationInfo>;

    constructor(private http: Http, @Inject(Constants) constants: Constants, @Inject(LogService) logService : LogService) {
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

        this.http
            .post(this.constants.getServiceBaseUrl() + 'connect/ token', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => this.saveJwt(data.id_token),
                err => this.logService.log('error : ' + err),
                () => this.logService.log('Authentication Complete')
            );
    }

    saveJwt(jwt) {
        if (jwt) {
            localStorage.setItem('id_token', jwt);
        }
    }
}