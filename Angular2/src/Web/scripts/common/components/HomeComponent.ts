import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {AuthenticationToken} from '../../domain/auth/AuthenticationToken';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

import {AuthService} from "../services/AuthService";
import {StorageService} from '../services/StorageService';

@Component({
    selector: 'common-home',
    viewProviders: [AuthService],
    templateUrl: './templates/common/components/HomeComponent.html'
})

export class HomeComponent {
    private currentAuth: AuthenticationInfo;

    constructor(private router: Router,
        private authService: AuthService,
        private storageService: StorageService) {
        this.router = router;
        this.storageService = storageService;

        authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authService.getCurrentAuth();

        var authData = this.storageService.getLocalStorage<AuthenticationToken>('authorizationData');
        if (authData.userName) {
            this.currentAuth.isAuth = true;
            this.currentAuth.userName = authData.userName;
            this.onAuthChanged(this.currentAuth);
        }

        if (this.currentAuth.isAuth) {
            this.router.navigate(['UserList']);
        }
    }

    private onAuthChanged(auth: AuthenticationInfo): void {
        this.currentAuth = auth;
    }
}