import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { LoginInfo } from '../../domain/auth/loginInfo';

import { AuthService } from '../services/authService';

@Component({
    selector: 'common-login',
    templateUrl: './loginComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class LoginComponent {
    private authService = inject(AuthService);

    loginInfo: LoginInfo;

    constructor() {
        const authService = this.authService;

        this.authService = authService;
        this.loginInfo = new LoginInfo();
    }

    public login(): void {
        this.authService.authenticate(this.loginInfo);
    }
}