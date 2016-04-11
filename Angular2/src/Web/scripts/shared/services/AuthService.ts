import {Injectable} from 'angular2/core';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

@Injectable()
export class AuthService {
    currentAuth : AuthenticationInfo;

    constructor() {
        this.currentAuth = new AuthenticationInfo();
        this.currentAuth.isAuth = true;
        this.currentAuth.userName = 'Test';
    }

    getCurrentAuth(): AuthenticationInfo {
        return this.currentAuth;
    }
}