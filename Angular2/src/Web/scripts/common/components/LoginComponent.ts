import {Component} from 'angular2/core';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';
import {AuthService} from '../services/AuthService';
import {LogService} from '../services/LogService';

@Component({
    selector: 'common-login',
    viewProviders: [AuthService],
    templateUrl: './templates/common/components/LoginComponent.html'
})

export class LoginComponent {
    private loginInfo: AuthenticationInfo;
    private errorMessage : string;

    constructor(private authService: AuthService, private logService: LogService) {
        this.authService = authService;
        this.logService = logService;
        this.loginInfo = new AuthenticationInfo();
        this.errorMessage = '';
    }

    public login() : void {
        this.authService.authenticate(this.loginInfo).subscribe(
            data => {  },
            err => {
                this.errorMessage = JSON.stringify(err);
                this.logService.log(JSON.stringify(err));
            }
        );
    }
}