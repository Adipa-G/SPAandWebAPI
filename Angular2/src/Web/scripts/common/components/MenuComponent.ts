import {Component} from 'angular2/core';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';
import {AuthService} from "../services/AuthService";

@Component({
    selector: 'common-menu',
    viewProviders: [AuthService],
    templateUrl: './templates/common/components/MenuComponent.html'
})

export class MenuComponent {
    private currentAuth: AuthenticationInfo;

    constructor(private authService: AuthService) {
        authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authService.getCurrentAuth();
    }

    private onAuthChanged(auth: AuthenticationInfo): void {
        this.currentAuth = auth;
    }
}