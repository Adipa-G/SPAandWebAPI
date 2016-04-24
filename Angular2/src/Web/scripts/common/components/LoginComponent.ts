import {Component} from 'angular2/core';

import {LoginInfo} from '../../domain/auth/LoginInfo';

import {AuthService} from '../services/AuthService';

@Component({
    selector: 'common-login',
    templateUrl: './templates/common/components/LoginComponent.html'
})

export class LoginComponent {
    private loginInfo: LoginInfo;

    constructor(private authService: AuthService) {
        this.authService = authService;
        this.loginInfo = new LoginInfo();
    }

    public login() : void {
        this.authService.authenticate(this.loginInfo);
    }
}