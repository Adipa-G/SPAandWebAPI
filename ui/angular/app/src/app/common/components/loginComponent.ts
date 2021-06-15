import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginInfo } from '../../domain/auth/loginInfo';

import { AuthService } from '../services/authService';

@Component({
    selector: 'common-login',
    templateUrl: './loginComponent.html'
})

export class LoginComponent {
    loginInfo: LoginInfo;

    constructor(private authService: AuthService) {
        this.authService = authService;
        this.loginInfo = new LoginInfo();
    }

    public login(): void {
        this.authService.authenticate(this.loginInfo);
    }
}