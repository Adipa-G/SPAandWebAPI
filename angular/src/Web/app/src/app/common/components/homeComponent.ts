import {Component} from '@angular/core';

import {AuthenticationDetails} from '../../domain/auth/authenticationDetails';

import {AuthService} from '../services/authService';

@Component({
    selector: 'common-home',
    templateUrl: './homeComponent.html'
})

export class HomeComponent {
    currentAuth: AuthenticationDetails;
    private subscription: any;

    constructor(private authService: AuthService) {
        this.subscription = authService.authChanged$.subscribe(auth => this.onAuthChanged(auth));
        this.currentAuth = authService.getCurrentAuth();
    }

    onAuthChanged(auth: AuthenticationDetails): void {
        this.currentAuth = auth;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}