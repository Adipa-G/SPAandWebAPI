import {Component} from '@angular/core';

import {AuthenticationDetails} from '../../domain/auth/AuthenticationDetails';

import {AuthService} from '../services/AuthService';

@Component({
    selector: 'common-home',
    templateUrl: './app/common/components/homeComponent.html'
})

export class HomeComponent {
    private currentAuth: AuthenticationDetails;
    private subscription: any;

    constructor(private authService: AuthService) {
        this.subscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authService.getCurrentAuth();
    }

    private onAuthChanged(auth: AuthenticationDetails): void {
        this.currentAuth = auth;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}