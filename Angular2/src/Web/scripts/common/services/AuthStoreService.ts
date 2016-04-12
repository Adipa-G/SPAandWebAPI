import {Injectable} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

@Injectable()
export class AuthStoreService {
    private currentAuth: AuthenticationInfo;

    public authChanged$: EventEmitter<AuthenticationInfo>;
    
    constructor() {
        this.authChanged$ = new EventEmitter();
        this.currentAuth = new AuthenticationInfo();
        this.currentAuth.isAuth = false;
        this.currentAuth.userName = '';
        this.authChanged$.emit(this.currentAuth);
    }

    public getCurrentAuth(): AuthenticationInfo {
        return this.currentAuth;
    }
}