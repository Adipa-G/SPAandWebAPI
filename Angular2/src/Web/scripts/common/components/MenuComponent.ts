import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router'

import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';

import {AuthService} from "../services/AuthService";
import {StorageService} from '../services/StorageService';

@Component({
    selector: 'common-menu',
    viewProviders: [AuthService],
    directives: [ROUTER_DIRECTIVES],
    templateUrl: './templates/common/components/MenuComponent.html'
})

export class MenuComponent {
    private currentAuth: AuthenticationInfo;

    constructor(private authService: AuthService,
        private storageService: StorageService) {
        authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authService.getCurrentAuth();
    }

    private onAuthChanged(auth: AuthenticationInfo): void {
        this.currentAuth = auth;
    }

    public logOut(): void {
        this.storageService.setLocalStorage('authorizationData',{});
    }
}