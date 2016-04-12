import {Component} from 'angular2/core';
import {AuthenticationInfo} from '../../domain/auth/AuthenticationInfo';
import {AuthStoreService} from "../services/AuthStoreService";

@Component({
    selector: 'common-menu',
    viewProviders: [AuthStoreService],
    templateUrl: './templates/common/components/MenuComponent.html'
})

export class MenuComponent {
    private currentAuth: AuthenticationInfo;

    constructor(private authStoreService: AuthStoreService) {
        authStoreService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authStoreService.getCurrentAuth();
    }

    private onAuthChanged(auth: AuthenticationInfo): void {
        this.currentAuth = auth;
    }
}