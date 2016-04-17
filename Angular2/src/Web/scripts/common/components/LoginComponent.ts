import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';
import {AuthService} from '../services/AuthService';
import {LogService} from '../services/LogService';
import {StorageService} from '../services/StorageService';

@Component({
    selector: 'common-login',
    viewProviders: [AuthService],
    templateUrl: './templates/common/components/LoginComponent.html'
})

export class LoginComponent {
    private loginInfo: AuthenticationInfo;
    private errorMessage : string;

    constructor(private router: Router,
        private authService: AuthService,
        private logService: LogService,
        private storageService: StorageService) {
        this.router = router;
        this.authService = authService;
        this.logService = logService;
        this.storageService = storageService;
        this.loginInfo = new AuthenticationInfo();
        this.errorMessage = '';
    }

    public login() : void {
        this.authService.authenticate(this.loginInfo).subscribe(
            data => {
                this.storageService.setLocalStorage('authorizationData', data);
                this.router.navigate(['UserList']);
            },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.logService.log(JSON.stringify(err));
            }
        );
    }
}