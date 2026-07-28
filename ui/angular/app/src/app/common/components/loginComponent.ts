import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginInfo } from '../../domain/auth/loginInfo';

import { AuthService } from '../services/authService';

@Component({
    selector: 'app-common-login',
    templateUrl: './loginComponent.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule]
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